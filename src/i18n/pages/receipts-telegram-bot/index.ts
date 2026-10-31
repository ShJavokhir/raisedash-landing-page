import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for /products/receipts-telegram-bot.
 *
 * The bot only reacts to the English word "receipt", so the Uzbek copy keeps that
 * word (and the example request) in English wherever it tells people what to type.
 */
export const receiptsCopy: Localized<Copy> = { en, uz, ru, es };
