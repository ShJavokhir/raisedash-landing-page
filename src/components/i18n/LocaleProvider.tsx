import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { DEFAULT_LOCALE, localizePath, type Locale, type Localized } from "@/i18n/locale";

/**
 * The active language for the whole tree (mounted once in _app.tsx). `locale` is
 * the page's `locale` prop from src/i18n/server.ts, and undefined on every page
 * that isn't translated, which then renders English exactly as before.
 */

interface LocaleState {
  locale: Locale;
  /** True on translated pages (shows the language switcher, adds hreflang). */
  translated: boolean;
}

const LocaleContext = createContext<LocaleState>({ locale: DEFAULT_LOCALE, translated: false });

export function LocaleProvider({ locale, children }: { locale?: Locale; children: ReactNode }) {
  const value = useMemo<LocaleState>(
    () => ({ locale: locale ?? DEFAULT_LOCALE, translated: locale !== undefined }),
    [locale]
  );

  // _document renders <html lang> for the first load; keep it right across
  // client-side navigation. Pages without a locale (e.g. /start-v2, which sets
  // its own) are left alone.
  useEffect(() => {
    if (!locale) return;
    document.documentElement.lang = locale;
    return () => {
      document.documentElement.lang = DEFAULT_LOCALE;
    };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext).locale;
}

export function useTranslatedPage(): boolean {
  return useContext(LocaleContext).translated;
}

/** Maps an internal href to the active language's URL (only translated pages change). */
export function useLocalizePath(): (href: string) => string {
  const locale = useLocale();
  return (href) => localizePath(href, locale);
}

/** The copy object for the active language. */
export function useCopy<T>(copy: Localized<T>): T {
  return copy[useLocale()];
}
