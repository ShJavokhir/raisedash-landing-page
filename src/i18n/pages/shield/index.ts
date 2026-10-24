import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for /products/shield. The extension's own UI is English, so its
 * "Enable protection" label stays English inside the Uzbek text. The linked
 * privacy notice (/products/shield/privacy) is English only.
 */
export const shieldCopy: Localized<Copy> = { en, uz, ru, es };
