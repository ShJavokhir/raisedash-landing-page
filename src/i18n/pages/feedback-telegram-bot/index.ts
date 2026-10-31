import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for /products/feedback-telegram-bot. The figures (src/components/feedback/
 * figures.tsx) depict the English product UI and stay English.
 */
export const feedbackCopy: Localized<Copy> = { en, uz, ru, es };
