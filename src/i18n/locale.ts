/**
 * Site languages for the product landing pages that are translated (the one-page
 * product sites and /get-a-demo). Everything else is English only.
 *
 * English lives at the normal URL (/products/pti-telegram-bot); every other
 * language has its own crawlable URL under a prefix (/uz/products/pti-telegram-bot),
 * served by the thin pages in src/pages/[locale]/ and tied together with hreflang.
 * The language reaches React as the `locale` page prop (src/i18n/server.ts), which
 * _app.tsx hands to LocaleProvider. Pages without that prop render English.
 *
 * Pure data (no React, no Node) so it is safe to import anywhere.
 */

export const LOCALES = ["en", "uz", "ru", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** The languages with a URL prefix (every locale but English). */
export const PREFIXED_LOCALES = LOCALES.filter((l) => l !== DEFAULT_LOCALE);

/** Remembers the visitor's language: set by the switcher, `?lang=`, a Meta ad click or a visit. */
export const LOCALE_COOKIE = "rd_lang";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Native names, shown in the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  uz: "Oʻzbekcha",
  ru: "Русский",
  es: "Español",
};

/** Open Graph locale per language. */
export const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  uz: "uz_UZ",
  ru: "ru_RU",
  es: "es_US",
};

/**
 * English paths of the pages that exist in every language. Drives the
 * [locale] pages' 404s, hreflang, the sitemap, IndexNow and localizePath.
 */
export const TRANSLATED_PATHS = [
  "/products/pti-telegram-bot",
  "/products/feedback-telegram-bot",
  "/products/receipts-telegram-bot",
  "/products/ringcentral-telegram",
  "/products/driver-paperwork",
  "/products/driver-coaching",
  "/products/driver-announcements",
  "/products/freight-payroll",
  "/products/shield",
  "/tools/samsara-alerts",
  "/tools/elp-practice",
  "/get-a-demo",
] as const;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function isTranslatedPath(path: string): boolean {
  return (TRANSLATED_PATHS as readonly string[]).includes(path);
}

const PREFIX = new RegExp(`^/(${PREFIXED_LOCALES.join("|")})(?=/|$)`);

/** "/uz/products/x" → "/products/x"; anything else unchanged. For path-based analytics. */
export function stripLocalePrefix(path: string): string {
  return path.replace(PREFIX, "") || "/";
}

/**
 * The URL of `href` in `locale`: prefixes paths of translated pages (keeping any
 * query/hash), leaves every other link alone. English drops the prefix.
 */
export function localizePath(href: string, locale: Locale): string {
  const match = /^([^?#]*)(.*)$/.exec(href);
  const path = stripLocalePrefix(match?.[1] ?? href);
  const rest = match?.[2] ?? "";
  if (locale === DEFAULT_LOCALE || !isTranslatedPath(path)) return path + rest;
  return `/${locale}${path}${rest}`;
}

/**
 * One copy object per language. `en.ts` holds the English source and exports
 * `type Copy = typeof en`; each other language is typed `Copy`, so a missing or
 * renamed key fails `tsc`.
 */
export type Localized<T> = Record<Locale, T>;
