import type { Locale } from "@/i18n/locale";

/**
 * The right word form for a count, by the language's plural rules (Russian has
 * one / few / many: 1 день, 2 дня, 5 дней). Missing forms fall back to `other`.
 *
 *   plural("ru", days, { one: "день", few: "дня", many: "дней", other: "дня" })
 */
export function plural(
  locale: Locale,
  count: number,
  forms: Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }
): string {
  return forms[new Intl.PluralRules(locale).select(count)] ?? forms.other;
}
