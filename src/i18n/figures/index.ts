import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * The explanatory copy inside the product figures: the caption tags above the
 * mockups ("Your dashboard", "Driver’s phone"), the "Before / With Raisedash"
 * comparisons, the receipts animation's labels, the RingCentral legends, the
 * Samsara weekly-board tabs and the feedback demo's notes. The mockups themselves show
 * the real (English) product UI and stay English.
 */
export const figuresCopy: Localized<Copy> = { en, uz, ru, es };
