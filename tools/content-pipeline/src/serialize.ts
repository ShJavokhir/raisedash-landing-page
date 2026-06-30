import { AUTHOR } from "./config";
import type { Draft } from "./types";

/** Parse the writer's delimited draft block into a Draft. Throws if malformed. */
export function parseDraftBlock(text: string): Draft {
  let s = text.trim();
  const fence = s.match(/```[a-z]*\s*([\s\S]*?)```/i);
  if (fence && /---BODY---/.test(fence[1])) s = fence[1].trim();

  const bodySplit = s.split(/^---BODY---\s*$/m);
  if (bodySplit.length < 2) throw new Error("Draft is missing the ---BODY--- delimiter.");
  const header = bodySplit[0];
  const body = bodySplit.slice(1).join("\n---BODY---\n").trim();

  const field = (name: string): string => {
    const m = header.match(new RegExp(`^${name}:\\s*(.+)$`, "im"));
    return m ? m[1].trim() : "";
  };

  const title = field("TITLE");
  const excerpt = field("EXCERPT").replace(/^["']|["']$/g, "");
  const category = field("CATEGORY") || "Compliance";
  const tags = field("TAGS")
    .split("|")
    .map((t) => t.trim())
    .filter(Boolean);

  if (!title) throw new Error("Draft is missing TITLE.");
  if (!body) throw new Error("Draft body is empty.");

  return { title, excerpt, category, tags, body: stripLeadingH1(body) };
}

/** The title renders as the page H1; a body H1 is redundant. */
function stripLeadingH1(body: string): string {
  const lines = body.split("\n");
  while (lines.length && lines[0].trim() === "") lines.shift();
  if (lines.length && /^#\s+/.test(lines[0])) lines.shift();
  while (lines.length && lines[0].trim() === "") lines.shift();
  return lines.join("\n").trim();
}

export function slugify(title: string): string {
  // Use the first clause of a possibly two-sentence title, capped to keep it short.
  const firstClause = title.split(/[.?!]/)[0] || title;
  const slug = firstClause
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.split("-").filter(Boolean).slice(0, 9).join("-");
}

/** Build the final .mdx text. JSON.stringify gives valid YAML double-quoted scalars. */
export function assembleMdx(draft: Draft, opts: { publishedAt: string }): string {
  const q = (v: string) => JSON.stringify(v);
  const tagLines = draft.tags.map((t) => `  - ${q(t)}`).join("\n");
  const frontmatter = [
    "---",
    `title: ${q(draft.title)}`,
    `excerpt: ${q(draft.excerpt)}`,
    `author: ${q(AUTHOR.name)}`,
    `authorRole: ${q(AUTHOR.role)}`,
    `publishedAt: ${q(opts.publishedAt)}`,
    `category: ${q(draft.category)}`,
    "tags:",
    tagLines,
    "featured: false",
    "---",
  ].join("\n");
  return `${frontmatter}\n\n${draft.body.trim()}\n`;
}

export function draftToBlock(draft: Draft): string {
  return [
    `TITLE: ${draft.title}`,
    `EXCERPT: ${draft.excerpt}`,
    `CATEGORY: ${draft.category}`,
    `TAGS: ${draft.tags.join(" | ")}`,
    "---BODY---",
    draft.body,
  ].join("\n");
}
