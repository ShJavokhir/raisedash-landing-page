import type { Localized } from "@/i18n/locale";

/**
 * The skip link's label. Kept out of src/i18n/shared/ on purpose: SkipLink renders
 * from _app.tsx on every page (the /start ad funnels too), so importing the whole
 * shared copy there would ship every language's header/footer text site-wide.
 */
export const skipLinkLabel: Localized<string> = {
  en: "Skip to main content",
  uz: "Asosiy mazmunga oʻtish",
  ru: "Перейти к основному содержимому",
  es: "Saltar al contenido principal",
};
