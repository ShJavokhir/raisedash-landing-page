import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for /products/ringcentral-telegram.
 *
 * The privacy and consent copy is the customer's legal duty: translate it with the
 * same strength (written consent, "many states", not legal advice), never softer.
 * "Missed" / "Voicemail" are the labels the product posts, so they stay English.
 */
export const ringcentralCopy: Localized<Copy> = { en, uz, ru, es };
