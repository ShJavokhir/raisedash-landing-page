import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for /get-a-demo. Product names (`product.name` from src/data/products.ts)
 * are brand names and stay English inside the Uzbek sentences. The mailto subject,
 * the request body and analytics stay English: they go to our team, not the visitor.
 */
export const getADemoCopy: Localized<Copy> = { en, uz, ru, es };
