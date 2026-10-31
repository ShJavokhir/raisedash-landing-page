import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for /products/driver-paperwork. The figures (src/components/paperwork/figures.tsx)
 * depict the English product UI and stay as they are.
 */
export const paperworkCopy: Localized<Copy> = { en, uz, ru, es };
