import type { Localized } from "@/i18n/locale";
import { en, type Copy } from "./en";
import { uz } from "./uz";
import { ru } from "./ru";
import { es } from "./es";

/**
 * Copy for /products/freight-payroll. The figures (src/components/payroll/
 * figures.tsx) depict the English product UI and the Telegram payslip, so
 * they stay English.
 */
export const payrollCopy: Localized<Copy> = { en, uz, ru, es };
