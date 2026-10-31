import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  isLocale,
  isTranslatedPath,
  localizePath,
  stripLocalePrefix,
  type Locale,
} from "@/i18n/locale";

/**
 * getServerSideProps for the translated pages. Every language has its own URL
 * (English unprefixed, the rest under /uz, /ru, /es), and each URL always renders
 * its own language, so search engines can index all of them.
 *
 * English URL (the page file itself):
 *   export const getServerSideProps = localeServerSideProps;
 * It renders English unless the visitor should get another language, then
 * 307-redirects to that language's URL (query kept, so fbclid survives):
 *   1. `?lang=uz|ru|es|en` in the URL (an explicit link)
 *   2. the rd_lang cookie (the visitor's choice or an earlier visit)
 *   3. a Meta (Facebook / Instagram) ad click → Uzbek: our Meta ads run in
 *      Uzbekistan
 *   4. the visitor's country (Cloudflare's CF-IPCountry header): Uzbekistan →
 *      Uzbek, which also covers ad clicks whose fbclid got stripped
 * Crawlers send none of these and crawl from the US, so they always get the
 * English page. Picking English in the switcher (cookie) beats 3 and 4.
 *
 * Prefixed URL (src/pages/[locale]/…): localizedServerSideProps renders the
 * URL's language for everyone, never redirecting on the cookie.
 *
 * Only the CURRENT request's URL counts as an ad click. The long-lived
 * rd_fbclid cookie is deliberately ignored: the English-audience fleet campaign
 * lands on the homepage and sets it too, and those visitors must not flip to
 * Uzbek when they open a product card.
 */

/** utm_source values Meta traffic is tagged with. */
const META_SOURCES = new Set(["facebook", "fb", "instagram", "ig", "meta", "messenger"]);

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Meta appends fbclid to every ad click; utm_source covers a stripped fbclid. */
function isMetaAdClick(url: URL): boolean {
  if (url.searchParams.get("fbclid")) return true;
  const source = url.searchParams.get("utm_source")?.trim().toLowerCase();
  return source !== undefined && META_SOURCES.has(source);
}

/** Countries whose visitors get a language other than English by default. */
const COUNTRY_LOCALES: Partial<Record<string, Locale>> = { UZ: "uz" };

/**
 * The default language for the visitor's country. Cloudflare sets CF-IPCountry
 * (and the box only accepts Cloudflare, so it can't be spoofed); without the
 * header (local dev) this is undefined.
 */
function countryLocale(context: GetServerSidePropsContext): Locale | undefined {
  const country = firstValue(context.req.headers["cf-ipcountry"])?.toUpperCase();
  return country ? COUNTRY_LOCALES[country] : undefined;
}

/** The visitor-facing URL (resolvedUrl drops the _next/data wrapper of client navigations). */
function requestUrl(context: GetServerSidePropsContext): URL {
  return new URL(context.resolvedUrl, "http://localhost");
}

function remember(context: GetServerSidePropsContext, locale: Locale): void {
  if (context.req.cookies[LOCALE_COOKIE] === locale) return;
  context.res.setHeader(
    "Set-Cookie",
    `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax; Secure`
  );
}

/** Same path and query in another language, minus a `?lang=` that asked for it. */
function redirectTo(url: URL, locale: Locale) {
  const search = new URLSearchParams(url.searchParams);
  search.delete("lang");
  const query = search.toString();
  const path = localizePath(stripLocalePrefix(url.pathname), locale);
  return { redirect: { destination: query ? `${path}?${query}` : path, permanent: false } };
}

function noSharedCache(context: GetServerSidePropsContext): void {
  // English URLs answer per visitor (cookie / ad click), so shared caches
  // (Cloudflare) must never store them. `private, no-cache` rather than Next's
  // default `no-store` keeps the back/forward cache working, as for static pages.
  context.res.setHeader("Cache-Control", "private, no-cache");
}

/** getServerSideProps for the English URL of a translated page. */
export const localeServerSideProps: GetServerSideProps<{ locale: Locale }> = async (context) => {
  noSharedCache(context);
  const url = requestUrl(context);

  const fromQuery = url.searchParams.get("lang");
  const fromCookie = context.req.cookies[LOCALE_COOKIE];
  const locale: Locale = isLocale(fromQuery)
    ? fromQuery
    : isLocale(fromCookie)
      ? fromCookie
      : isMetaAdClick(url)
        ? "uz"
        : (countryLocale(context) ?? DEFAULT_LOCALE);

  // Remember an explicit `?lang=`, an ad click or the country default so the
  // next page follows suit.
  if (isLocale(fromQuery) || (!isLocale(fromCookie) && locale !== DEFAULT_LOCALE)) {
    remember(context, locale);
  }

  if (locale !== DEFAULT_LOCALE) return redirectTo(url, locale);
  return { props: { locale } };
};

/** getServerSideProps for /[locale]/<translated page>. */
export const localizedServerSideProps: GetServerSideProps<{ locale: Locale }> = async (context) => {
  const locale = firstValue(context.params?.locale);
  const url = requestUrl(context);
  // Only real languages, only pages that are translated, never /en/… (English
  // has the unprefixed URL).
  if (
    !isLocale(locale) ||
    locale === DEFAULT_LOCALE ||
    !isTranslatedPath(stripLocalePrefix(url.pathname))
  ) {
    return { notFound: true };
  }

  noSharedCache(context);
  const fromQuery = url.searchParams.get("lang");
  if (isLocale(fromQuery) && fromQuery !== locale) {
    remember(context, fromQuery);
    return redirectTo(url, fromQuery);
  }

  remember(context, locale);
  return { props: { locale } };
};
