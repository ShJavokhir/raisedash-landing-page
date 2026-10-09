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

/**
 * Fixed effective date of the current Terms. Bump it (and the sitemap lastmod) whenever the
 * Terms change. Never derive it from `new Date()`: we must be able to prove which version was
 * in force on a given day.
 */
export const TERMS_EFFECTIVE_DATE = "October 9, 2026";

/** Same rule for the Privacy Policy. */
export const PRIVACY_EFFECTIVE_DATE = "October 9, 2026";
