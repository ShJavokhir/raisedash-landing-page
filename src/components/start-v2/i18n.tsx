import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { DRIVER_PROBLEMS, FLEET_SIZES, ROLES, type Choice } from "@/lib/start-v2";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LABELS,
  MESSAGES,
  OPTION_LABELS,
  localizedChoices,
  type Locale,
  type StartV2Messages,
} from "@/lib/start-v2-i18n";

/**
 * Language state for the /start-v2 lead funnel. Holds the active locale, persists
 * the user's choice, and exposes the active translations + localized option lists
 * so no component has to thread `locale` through props. Scoped to /start-v2 — it
 * does not touch the rest of the site or the live /start funnel.
 */

const STORAGE_KEY = "rd_start_v2_locale";

interface LocalizedOptions {
  fleet: Choice[];
  problems: Choice[];
  roles: Choice[];
}

interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: StartV2Messages;
  options: LocalizedOptions;
}

const I18nContext = createContext<I18nValue | null>(null);

export function StartV2I18nProvider({ children }: { children: ReactNode }) {
  // Default to Uzbek for everyone. The first render is ALWAYS DEFAULT_LOCALE on
  // both server and client, so there is no hydration mismatch; a stored
  // preference (rare) is applied right after mount in the effect below.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // Intentional post-mount sync: localStorage is client-only, so reading it in
      // an effect (not a lazy useState initializer) is what keeps the first render
      // identical on server and client and avoids a hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "uz" || stored === "en") setLocaleState(stored);
    } catch {
      // Storage can be blocked (private mode / in-app browser) — default stands.
    }
  }, []);

  // Reflect the active language on <html lang> for accessibility while this page
  // is mounted; restore the site default ("en") when leaving.
  useEffect(() => {
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = "en";
    };
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // Non-fatal — the choice just won't persist across reloads.
    }
  };

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: MESSAGES[locale],
      options: {
        fleet: localizedChoices(FLEET_SIZES, OPTION_LABELS[locale].fleet),
        problems: localizedChoices(DRIVER_PROBLEMS, OPTION_LABELS[locale].problems),
        roles: localizedChoices(ROLES, OPTION_LABELS[locale].roles),
      },
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx)
    throw new Error("useStartV2T/useStartV2Locale must be used within <StartV2I18nProvider>");
  return ctx;
}

/** The active translations dictionary. */
export const useStartV2T = (): StartV2Messages => useI18n().t;

/** The active locale + setter (for the language switcher). */
export function useStartV2Locale(): { locale: Locale; setLocale: (l: Locale) => void } {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}

/** Canonical option lists with labels in the active language (values unchanged). */
export const useStartV2Options = (): LocalizedOptions => useI18n().options;

/**
 * Language picker: a styled chip with a transparent native <select> on top. A
 * real <select> is the most reliable dropdown inside the FB/IG in-app browser
 * (no portals, no JS popovers), and the chip keeps it on-brand.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useStartV2Locale();
  const t = useStartV2T();

  return (
    <div
      className={cn(
        "border-border bg-card text-muted-foreground focus-within:ring-ring/40 relative flex items-center gap-1.5 rounded-full border py-1.5 pr-2 pl-3 text-sm font-medium shadow-sm focus-within:ring-2",
        className
      )}
    >
      <Globe className="size-4 shrink-0" aria-hidden />
      <span aria-hidden>{LOCALE_LABELS[locale]}</span>
      <ChevronDown className="size-4 shrink-0" aria-hidden />
      {/* Transparent native select fills the chip so a tap anywhere opens the
          OS language picker. */}
      <select
        aria-label={t.nav.language}
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l]}
          </option>
        ))}
      </select>
    </div>
  );
}
