import type { ContentType } from "../config";
import { CONTENT_TYPES } from "../config";
import type { Draft } from "../types";

export interface SeoResult {
  errors: string[];
  warnings: string[];
}

/** Soft on-page SEO and structure checks. Errors block; warnings inform. */
export function checkSeo(draft: Draft, type: ContentType): SeoResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const body = draft.body;

  if (!draft.title) errors.push("missing title");
  if (!draft.excerpt) errors.push("missing excerpt");
  if (draft.tags.length < 4) warnings.push(`only ${draft.tags.length} tags (aim for 8 to 10)`);

  if (draft.excerpt.length > 160)
    warnings.push(`excerpt is ${draft.excerpt.length} chars (aim for under 160)`);
  if (draft.title.length > 110) warnings.push(`title is ${draft.title.length} chars (quite long)`);

  const internalLinks = (
    body.match(/\]\((\/blog\/[a-z0-9-]+|https?:\/\/(?:www\.)?raisedash\.com[^)]*)\)/g) || []
  ).length;
  if (internalLinks < 2) warnings.push(`only ${internalLinks} internal links (aim for 3 to 5)`);

  const h2 = (body.match(/^##\s+/gm) || []).length;
  if (h2 < 2) warnings.push(`only ${h2} H2 sections`);

  if (!/##\s+Frequently Asked Questions/i.test(body))
    warnings.push("no FAQ section (loses FAQ rich snippets)");

  const words = body.split(/\s+/).filter(Boolean).length;
  const [lo, hi] = CONTENT_TYPES[type].words;
  if (words < lo * 0.6) warnings.push(`only ${words} words (target ${lo} to ${hi})`);
  if (words > hi * 1.5) warnings.push(`${words} words (longer than the ${lo} to ${hi} target)`);

  return { errors, warnings };
}
