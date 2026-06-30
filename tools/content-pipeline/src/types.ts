import type { ContentType } from "./config";

export interface Draft {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  body: string;
}

export interface TopicProposal {
  topic: string;
  angle: string;
  contentType: ContentType;
  primaryKeyword: string;
  reason: string;
}

export interface CritiqueFinding {
  severity: "high" | "medium" | "low";
  kind: "accuracy" | "voice" | "specificity" | "style";
  quote: string;
  problem: string;
  fix: string;
}

export interface Critique {
  verdict: "PUBLISH_READY" | "MINOR_FIXES" | "NEEDS_WORK";
  summary: string;
  findings: CritiqueFinding[];
}
