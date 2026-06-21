/**
 * Tiny, JSX-free metadata for the legal documents. Kept separate from the heavy
 * `legal-content.tsx` prose ON PURPOSE: the /start funnel needs only the title +
 * type statically (for the sheet header and the open-state union), while the
 * actual copy is lazy-loaded. If this lived in legal-content.tsx, importing the
 * title would pull the whole policy into the funnel's first-load bundle.
 */
export type LegalDoc = "privacy" | "terms";

export const LEGAL_TITLES: Record<LegalDoc, string> = {
  privacy: "Privacy Policy",
  terms: "Terms of Use",
};
