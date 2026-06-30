import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));

// tools/content-pipeline/src/config.ts -> the repo root is three levels up.
export const REPO_ROOT = path.resolve(here, "..", "..", "..");
export const PIPELINE_ROOT = path.resolve(here, "..");
export const BLOG_DIR = path.join(REPO_ROOT, "content", "blog");
export const RUNS_DIR = path.join(PIPELINE_ROOT, ".runs");

export const config = {
  awsRegion: process.env.AWS_REGION || "us-east-1",
  writerModel: process.env.BEDROCK_WRITER_MODEL || "us.anthropic.claude-opus-4-8",
  criticModel: process.env.BEDROCK_CRITIC_MODEL || "us.anthropic.claude-sonnet-4-6",
  firecrawlKey: process.env.FIRECRAWL_API_KEY || "",
  firecrawlUrl: (process.env.FIRECRAWL_API_URL || "https://api.firecrawl.dev").replace(/\/+$/, ""),
  siteUrl: "https://www.raisedash.com",
} as const;

export type ContentType = "evergreen" | "news" | "checklist";

// Length follows the content type. These are guidance for the writer and a soft
// SEO check, never a hard pad-to-this target.
export const CONTENT_TYPES: Record<
  ContentType,
  { label: string; words: [number, number]; guidance: string }
> = {
  evergreen: {
    label: "Evergreen guide",
    words: [1100, 1800],
    guidance:
      "A how-to or what-is explainer with real search demand. Comprehensive, an internal-link hub, grounded in stable primary sources (eCFR, FMCSA). Category: Compliance.",
  },
  news: {
    label: "News analysis",
    words: [500, 900],
    guidance:
      "Something actually happened (a rule, enforcement action, ruling). Short and fast, current primary sources, clearly dated. Category: News.",
  },
  checklist: {
    label: "Checklist / quick how-to",
    words: [700, 1100],
    guidance: "A practical, scannable task. Steps and short tables, light. Category: Compliance.",
  },
};

export const AUTHOR = { name: "Raisedash", role: "Editorial Team" } as const;
