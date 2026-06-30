import fs from "node:fs";
import path from "node:path";
import { BLOG_DIR, REPO_ROOT, RUNS_DIR, config, type ContentType } from "./config";
import { log } from "./log";
import { callJSON, callText } from "./bedrock";
import { getExistingPosts, internalLinkMenu, slugExists } from "./blog";
import { research } from "./research";
import {
  CRITIC_SYSTEM,
  REVISE_SYSTEM,
  TOPIC_SYSTEM,
  WRITER_SYSTEM,
  buildCriticUser,
  buildReviseUser,
  buildTopicUser,
  buildWriterUser,
} from "./prompts";
import { lint, type StyleResult } from "./gates/styleLint";
import { checkMdx } from "./gates/mdxCheck";
import { checkSeo } from "./gates/seo";
import { checkSafety } from "./gates/safety";
import { assembleMdx, draftToBlock, parseDraftBlock, slugify } from "./serialize";
import { shipPr } from "./ship";
import { escapeHtml, sendTelegram } from "./notify";
import type { Critique, CritiqueFinding, Draft, TopicProposal } from "./types";

export interface RunOpts {
  topic?: string;
  angle?: string;
  type: ContentType;
  dryRun: boolean;
  noResearch: boolean;
  ship: "none" | "pr";
  notify: boolean;
}

const today = () => new Date().toISOString().slice(0, 10);

function uniqueSlug(title: string): string {
  const base = slugify(title) || "post";
  let slug = base;
  let n = 2;
  while (slugExists(slug)) slug = `${base}-${n++}`;
  return slug;
}

const lintAll = (d: Draft): StyleResult => lint(`${d.title}\n${d.excerpt}\n${d.body}`);

async function writeDraftWithRetry(user: string): Promise<Draft> {
  let lastErr: unknown;
  let prompt = user;
  for (let i = 0; i < 2; i++) {
    const text = await callText({ model: config.writerModel, system: WRITER_SYSTEM, user: prompt });
    try {
      return parseDraftBlock(text);
    } catch (err) {
      lastErr = err;
      prompt = `${user}\n\nYour previous output could not be parsed (${(err as Error).message}). Return the EXACT delimited format, nothing else.`;
    }
  }
  throw new Error(`Writer output could not be parsed: ${(lastErr as Error)?.message}`);
}

async function reviseOnce(
  draft: Draft,
  findings: CritiqueFinding[],
  styleViolations: string[]
): Promise<Draft> {
  const text = await callText({
    model: config.writerModel,
    system: REVISE_SYSTEM,
    user: buildReviseUser({ draftBlock: draftToBlock(draft), findings, styleViolations }),
  });
  try {
    return parseDraftBlock(text);
  } catch {
    return draft; // keep the prior draft if the revision came back malformed
  }
}

export async function run(opts: RunOpts): Promise<void> {
  log.resetSteps();
  const existing = getExistingPosts();
  const linkMenu = internalLinkMenu(existing);

  // 1. Topic
  log.step("Topic");
  let topic = opts.topic;
  let angle = opts.angle;
  if (!topic) {
    log.info("No --topic given; proposing one from gaps in your coverage...");
    const existingList = existing.map((p) => `- [${p.category}] ${p.title}`).join("\n");
    const proposal = await callJSON<TopicProposal>({
      model: config.criticModel,
      system: TOPIC_SYSTEM,
      user: buildTopicUser({ existing: existingList, type: opts.type }),
    });
    topic = proposal.topic;
    angle = proposal.angle;
    log.info(`Proposed: ${topic}`);
    log.info(`Why: ${proposal.reason}`);
  }
  log.ok(`Topic: ${topic}`);

  // 2. Research
  log.step("Research");
  let notes = "";
  let sources: { url: string; title: string }[] = [];
  if (opts.noResearch) {
    log.warn("--no-research set: writing without live sources. Do not publish unverified facts.");
  } else if (!config.firecrawlKey) {
    log.warn("FIRECRAWL_API_KEY not set: skipping research. Set it for grounded facts.");
  } else {
    const r = await research(topic);
    notes = r.notes;
    sources = r.sources;
    log.ok(`Gathered ${sources.length} sources`);
    sources.forEach((s) => log.info(`  ${s.url}`));
  }

  // 3. Draft
  log.step(`Draft (writer: ${config.writerModel})`);
  let draft = await writeDraftWithRetry(
    buildWriterUser({ topic, angle, type: opts.type, sourceNotes: notes, linkMenu })
  );
  log.ok(`Draft: "${draft.title}"`);

  // 4. Cross-model fact-check + edit
  log.step(`Fact-check + edit (critic: ${config.criticModel})`);
  let critique: Critique;
  try {
    critique = await callJSON<Critique>({
      model: config.criticModel,
      system: CRITIC_SYSTEM,
      user: buildCriticUser({ draftBlock: draftToBlock(draft), sourceNotes: notes }),
    });
  } catch (err) {
    log.warn(`Critic output unparseable (${(err as Error).message}); treating as no findings.`);
    critique = { verdict: "MINOR_FIXES", summary: "critic parse failed", findings: [] };
  }
  log.info(`Verdict: ${critique.verdict}; ${critique.findings.length} findings`);

  // 5. Revise on findings or style issues
  let style = lintAll(draft);
  if (critique.findings.length || !style.ok) {
    log.step("Revise");
    draft = await reviseOnce(draft, critique.findings, style.hard);
    style = lintAll(draft);
    log.ok("Applied fixes");
  }

  // 6. Deterministic style fix loop (safety net)
  for (let pass = 1; !style.ok && pass <= 2; pass++) {
    log.step(`Strip style tells (pass ${pass})`);
    draft = await reviseOnce(draft, [], style.hard);
    style = lintAll(draft);
  }

  // 7. Gates
  log.step("Gates");
  const mdx = assembleMdx(draft, { publishedAt: today() });
  const mdxResult = await checkMdx(mdx);
  const seo = checkSeo(draft, opts.type);
  const safety = checkSafety(draft.body);
  gate("style", style.ok, style.hard);
  style.soft.forEach((s) => log.warn(`style: ${s}`));
  gate("safety", safety.ok, safety.issues);
  gate("mdx compile", mdxResult.ok, mdxResult.errors);
  seo.errors.forEach((e) => log.fail(`seo: ${e}`));
  seo.warnings.forEach((w) => log.warn(`seo: ${w}`));

  const hardOk = style.ok && safety.ok && mdxResult.ok && seo.errors.length === 0;

  // 8. Audit artifacts (always) + the draft (only if safe)
  const slug = uniqueSlug(draft.title);
  const runDir = path.join(RUNS_DIR, `${today()}-${slug}`);
  writeFile(path.join(runDir, "draft.mdx"), mdx);
  writeFile(path.join(runDir, "draft-block.txt"), draftToBlock(draft));
  writeFile(path.join(runDir, "sources.json"), JSON.stringify(sources, null, 2));
  writeFile(path.join(runDir, "source-notes.txt"), notes);
  writeFile(path.join(runDir, "critique.json"), JSON.stringify(critique, null, 2));
  writeFile(
    path.join(runDir, "report.txt"),
    report({ topic, slug, type: opts.type, style, safety, mdxResult, seo, critique, sources })
  );

  log.step("Result");
  log.info(`Run folder: ${path.relative(process.cwd(), runDir)}`);

  if (opts.dryRun) {
    log.ok("Dry run: nothing written to content/blog. Review the run folder above.");
    if (opts.notify) {
      await sendTelegram(
        `🧪 <b>Dry run</b>: "${escapeHtml(draft.title)}". Gates ${hardOk ? "pass" : "FAIL"}. Nothing published.`
      );
    }
    return;
  }

  if (!hardOk) {
    log.fail(
      "Hard gate failed. Draft NOT written to content/blog. See report.txt in the run folder."
    );
    if (opts.notify) {
      const why = [
        ...(!style.ok ? ["style"] : []),
        ...(!safety.ok ? ["safety"] : []),
        ...(!mdxResult.ok ? ["mdx"] : []),
        ...(seo.errors.length ? ["seo"] : []),
      ].join(", ");
      await sendTelegram(
        `⚠️ <b>Content run failed gates</b> (${why}) for "${escapeHtml(draft.title)}". No post created.`
      );
    }
    if (opts.ship === "pr") process.exitCode = 1; // mark the scheduled run as failed
    return;
  }

  const dest = path.join(BLOG_DIR, `${slug}.mdx`);
  writeFile(dest, mdx);
  log.ok(`Wrote ${path.relative(REPO_ROOT, dest)}`);

  if (opts.ship === "pr") {
    log.step("Open pull request");
    const pr = await shipPr({
      slug,
      title: draft.title,
      mdxRelPath: path.relative(REPO_ROOT, dest),
      body: prBody({ slug, critique, seo, sources }),
      date: today(),
    });
    log.ok(`PR: ${pr.url}`);
    if (opts.notify) {
      await sendTelegram(
        `📝 <b>New blog draft ready to review</b>\n\n<b>${escapeHtml(draft.title)}</b>\n\nReviewer verdict: ${critique.verdict} (${critique.findings.length} findings)\n\nReview and merge:\n${escapeHtml(pr.url)}`
      );
    }
    return;
  }

  log.blank();
  log.info("Next: from the repo root run `npm run dev`, then open");
  log.info(`  http://localhost:3000/blog/${slug}`);
  log.info("Review it. When happy, commit the new file and push. Vercel deploys from your push.");
  if (opts.notify) {
    await sendTelegram(`📝 Draft ready locally: "${escapeHtml(draft.title)}" (slug ${slug}).`);
  }
}

function gate(name: string, ok: boolean, problems: string[]): void {
  if (ok) {
    log.ok(`${name}: pass`);
  } else {
    log.fail(`${name}: FAIL`);
    problems.forEach((p) => log.fail(`  ${p}`));
  }
}

function writeFile(p: string, content: string): void {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, "utf8");
}

function prBody(a: {
  slug: string;
  critique: Critique;
  seo: { warnings: string[] };
  sources: { url: string; title: string }[];
}): string {
  const findings = a.critique.findings.length
    ? a.critique.findings.map((f) => `- [${f.severity}/${f.kind}] ${f.problem}`).join("\n")
    : "- none";
  const sources = a.sources.length
    ? a.sources.map((s) => `- ${s.url}`).join("\n")
    : "- (no external sources were gathered)";
  const warnings = a.seo.warnings.length
    ? a.seo.warnings.map((w) => `- ${w}`).join("\n")
    : "- none";

  return [
    `Autogenerated draft. Preview locally at \`/blog/${a.slug}\` (\`npm run dev\` from the repo root).`,
    "",
    `**Reviewer verdict:** ${a.critique.verdict}`,
    `**Reviewer summary:** ${a.critique.summary}`,
    "",
    "**Findings (addressed or flagged):**",
    findings,
    "",
    "**Sources used (verify the claims against these):**",
    sources,
    "",
    "**SEO notes:**",
    warnings,
    "",
    "---",
    "Review checklist: every fact traces to a source above, no invented numbers or rule citations, the voice reads human, internal links make sense. Merge to publish (Vercel deploys on merge).",
  ].join("\n");
}

function report(a: {
  topic: string;
  slug: string;
  type: ContentType;
  style: StyleResult;
  safety: { ok: boolean; issues: string[] };
  mdxResult: { ok: boolean; errors: string[] };
  seo: { errors: string[]; warnings: string[] };
  critique: Critique;
  sources: { url: string; title: string }[];
}): string {
  return [
    `Topic: ${a.topic}`,
    `Slug: ${a.slug}`,
    `Type: ${a.type}`,
    "",
    `Critic verdict: ${a.critique.verdict}`,
    `Critic summary: ${a.critique.summary}`,
    `Findings: ${a.critique.findings.length}`,
    ...a.critique.findings.map((f) => `  [${f.severity}/${f.kind}] ${f.problem} -> ${f.fix}`),
    "",
    `Style: ${a.style.ok ? "pass" : "FAIL"}`,
    ...a.style.hard.map((h) => `  hard: ${h}`),
    ...a.style.soft.map((s) => `  soft: ${s}`),
    "",
    `Safety: ${a.safety.ok ? "pass" : "FAIL"}`,
    ...a.safety.issues.map((s) => `  ${s}`),
    "",
    `MDX compile: ${a.mdxResult.ok ? "pass" : "FAIL"}`,
    ...a.mdxResult.errors.map((e) => `  ${e}`),
    "",
    "SEO:",
    ...a.seo.errors.map((e) => `  error: ${e}`),
    ...a.seo.warnings.map((w) => `  warn: ${w}`),
    "",
    "Sources:",
    ...a.sources.map((s) => `  ${s.url}`),
    "",
  ].join("\n");
}
