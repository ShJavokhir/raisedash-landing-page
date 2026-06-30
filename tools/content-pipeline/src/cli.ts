import { config, type ContentType } from "./config";
import { log } from "./log";
import { probeModel } from "./bedrock";
import { ping as firecrawlPing } from "./firecrawl";
import { getExistingPosts } from "./blog";
import { run } from "./pipeline";

const TYPES: ContentType[] = ["evergreen", "news", "checklist"];

function parseFlags(argv: string[]): Record<string, string | boolean> {
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith("--")) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith("--")) {
      flags[key] = next;
      i++;
    } else {
      flags[key] = true;
    }
  }
  return flags;
}

function modelHint(): void {
  log.info(
    "Hint: the exact Bedrock model id varies by account and region. In us-east-1 on-demand it is"
  );
  log.info(
    "usually an inference profile like `us.anthropic.claude-opus-4-8`. Open the Bedrock console"
  );
  log.info(
    "(Model access) to see the ids your account can call, then set BEDROCK_WRITER_MODEL and"
  );
  log.info("BEDROCK_CRITIC_MODEL in tools/content-pipeline/.env.");
}

async function check(): Promise<void> {
  log.resetSteps();
  log.step("Config");
  log.info(`AWS region:   ${config.awsRegion}`);
  log.info(`Writer model: ${config.writerModel}`);
  log.info(`Critic model: ${config.criticModel}`);
  log.info(`Firecrawl:    ${config.firecrawlKey ? "key set" : "NOT set"}`);

  log.step("Blog");
  log.ok(`Found ${getExistingPosts().length} existing posts in content/blog`);

  log.step("Bedrock writer model");
  const w = await probeModel(config.writerModel);
  if (w.ok) log.ok(`${config.writerModel} reachable`);
  else {
    log.fail(`${config.writerModel}: ${w.error}`);
    modelHint();
  }

  log.step("Bedrock critic model");
  const c = await probeModel(config.criticModel);
  if (c.ok) log.ok(`${config.criticModel} reachable`);
  else {
    log.fail(`${config.criticModel}: ${c.error}`);
    if (w.ok) modelHint();
  }

  log.step("Firecrawl");
  if (!config.firecrawlKey) {
    log.warn("FIRECRAWL_API_KEY not set (research will be skipped until you add it)");
  } else {
    const f = await firecrawlPing();
    if (f.ok) log.ok("Firecrawl reachable");
    else log.fail(`Firecrawl: ${f.error}`);
  }

  log.blank();
  const ready = w.ok && c.ok;
  log.info(
    ready
      ? 'Ready. Try: npm run generate -- --topic "..."'
      : "Fix the failures above, then run check again."
  );
  if (!ready) process.exitCode = 1;
}

async function main(): Promise<void> {
  const [cmd, ...rest] = process.argv.slice(2);

  if (cmd === "check") {
    await check();
    return;
  }

  if (cmd === "generate") {
    const flags = parseFlags(rest);
    const type = (typeof flags.type === "string" ? flags.type : "evergreen") as ContentType;
    if (!TYPES.includes(type)) {
      log.fail(`Unknown --type "${type}". Use one of: ${TYPES.join(", ")}.`);
      process.exitCode = 1;
      return;
    }
    await run({
      topic: typeof flags.topic === "string" ? flags.topic : undefined,
      angle: typeof flags.angle === "string" ? flags.angle : undefined,
      type,
      dryRun: flags["dry-run"] === true,
      noResearch: flags["no-research"] === true,
      ship: "none",
      notify: flags.notify === true,
    });
    return;
  }

  if (cmd === "auto") {
    // Autonomous mode (for the scheduled runner): propose a topic, research,
    // gate, open a PR, and notify Telegram. Never publishes directly.
    const flags = parseFlags(rest);
    const type = (typeof flags.type === "string" ? flags.type : "evergreen") as ContentType;
    if (!TYPES.includes(type)) {
      log.fail(`Unknown --type "${type}". Use one of: ${TYPES.join(", ")}.`);
      process.exitCode = 1;
      return;
    }
    const dryRun = flags["dry-run"] === true;
    await run({
      topic: typeof flags.topic === "string" ? flags.topic : undefined,
      angle: undefined,
      type,
      dryRun,
      noResearch: false,
      ship: dryRun ? "none" : "pr",
      notify: true,
    });
    return;
  }

  log.info("Raisedash content pipeline");
  log.info("Usage:");
  log.info("  npm run check");
  log.info(
    '  npm run generate -- [--topic "..."] [--angle "..."] [--type evergreen|news|checklist] [--dry-run] [--no-research] [--notify]'
  );
  log.info(
    "  npx tsx src/cli.ts auto [--type evergreen|news|checklist] [--dry-run]   (autonomous: propose, research, gate, open PR, notify)"
  );
}

main().catch((err) => {
  log.fail(String(err?.stack || err));
  process.exitCode = 1;
});
