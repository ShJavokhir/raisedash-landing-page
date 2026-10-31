import { useRouter } from "next/router";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/cn";
import { capture } from "@/lib/site-analytics";
import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  LOCALE_LABELS,
  localizePath,
  type Locale,
} from "@/i18n/locale";
import { sharedCopy } from "@/i18n/shared";
import { useCopy, useLocale, useTranslatedPage } from "./LocaleProvider";

/**
 * Language picker, rendered only on translated pages. A styled chip with a
 * transparent native <select> on top (the same pattern as /start-v2): a real
 * <select> is the most reliable dropdown in the FB/IG in-app browser.
 *
 * Choosing a language stores it in the rd_lang cookie (so English URLs of other
 * translated pages follow it) and opens this page's URL in that language.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const locale = useLocale();
  const translated = useTranslatedPage();
  const t = useCopy(sharedCopy);

  if (!translated) return null;

  const choose = (next: Locale) => {
    if (next === locale) return;
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
    capture("language_changed", { from: locale, to: next });
    // Same page and query in the other language, minus a `?lang=` (it would
    // override the choice).
    const url = new URL(router.asPath, window.location.origin);
    url.searchParams.delete("lang");
    void router.push(`${localizePath(url.pathname, next)}${url.search}${url.hash}`, undefined, {
      scroll: false,
    });
  };

  return (
    <div
      className={cn(
        "border-border bg-card text-muted-foreground focus-within:ring-ring/40 hover:text-foreground relative inline-flex min-h-9 items-center gap-1.5 rounded-full border py-1.5 pr-2 pl-3 text-sm focus-within:ring-2",
        className
      )}
    >
      <Globe className="size-4 shrink-0" aria-hidden="true" />
      <span aria-hidden="true">{LOCALE_LABELS[locale]}</span>
      <ChevronDown className="size-4 shrink-0" aria-hidden="true" />
      {/* Transparent native select fills the chip, so a tap anywhere opens the
          OS picker. */}
      <select
        aria-label={t.language}
        value={locale}
        onChange={(event) => choose(event.target.value as Locale)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l} lang={l}>
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
    </div>
  );
}
