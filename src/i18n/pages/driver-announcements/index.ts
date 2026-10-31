import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for /products/driver-announcements. The figures (src/components/
 * announcements/figures.tsx) depict the English product UI and the example
 * Telegram messages, so they stay English.
 */
export const announcementsCopy: Localized<Copy> = { en, uz, ru, es };
