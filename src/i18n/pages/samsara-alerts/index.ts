import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for /tools/samsara-alerts. The screenshot window titles depict the product
 * and stay English in the page; the weekly-board tabs and notes live inside
 * src/components/samsara/BoardTabs.tsx and are English only.
 */
export const samsaraCopy: Localized<Copy> = { en, uz, ru, es };
