import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for the site chrome and shared components that render on the translated
 * pages: the header, footer, language switcher, "Get a risk-free demo" button and
 * the Telegram help dialog. On English-only pages these resolve to EN, which is
 * the original copy, so nothing changes there.
 */
export const sharedCopy: Localized<Copy> = { en, uz, ru, es };
