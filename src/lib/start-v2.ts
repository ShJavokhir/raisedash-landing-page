/**
 * Shared option sets, types, and validators for the /start-v2 lead funnel.
 *
 * Imported by BOTH the client funnel (src/components/start-v2/lead-funnel.tsx)
 * and the server API route (src/pages/api/start-v2-lead.ts) + the Telegram
 * formatter — so the human-readable labels and the allowed-value lists can never
 * drift between what the browser shows and what the server validates/notifies on.
 *
 * Pure data: no React, no client-only globals, so it is safe to import in the
 * Node.js API route. The /start-v2 funnel is a lead-capture flow — unlike /start
 * it creates no account and sends no email; submissions go to Telegram and the
 * team reaches out.
 */

export interface Choice {
  value: string;
  label: string;
}

/** "How many trucks does your company run?" — single choice. */
export const FLEET_SIZES: Choice[] = [
  { value: "1", label: "Just 1 (owner-operator)" },
  { value: "2-5", label: "2–5 trucks" },
  { value: "6-20", label: "6–20 trucks" },
  { value: "21-50", label: "21–50 trucks" },
  { value: "50+", label: "50 or more trucks" },
];

/**
 * "What do your drivers need help with?" — multi-select. Training-focused, led by
 * the FMCSA hot buttons (English Language Proficiency is an out-of-service item as
 * of 2025). Edit this list freely; the API route validates against these values
 * and the Telegram message resolves the labels, so both stay in sync automatically.
 */
export const DRIVER_PROBLEMS: Choice[] = [
  { value: "english", label: "English language proficiency" },
  { value: "road_signs", label: "Road signs" },
  { value: "general_training", label: "General driver training" },
  { value: "safety", label: "Safety & defensive driving" },
  { value: "hos", label: "Hours of Service (HOS) rules" },
  { value: "onboarding", label: "New-driver onboarding" },
  { value: "drug_alcohol", label: "Drug & alcohol awareness" },
];

/** "What's your role in the company?" — single choice. */
export const ROLES: Choice[] = [
  { value: "owner", label: "Owner" },
  { value: "manager", label: "Manager" },
  { value: "decision_maker", label: "Decision maker" },
  { value: "employee", label: "Employee" },
  { value: "other", label: "Other" },
];

/** Ad attribution passed through to the Telegram notification (which ad/campaign). */
export interface LeadAttribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  fbclid?: string;
  referrer?: string;
  landingUrl?: string;
}

/** The lead payload posted to /api/start-v2-lead and forwarded to Telegram. */
export interface StartV2Lead {
  fleetSize: string;
  driverProblems: string[];
  role: string;
  fullName: string;
  email: string;
  /** Canonical E.164, e.g. "+15551234567". */
  phone: string;
  /** Either usDot OR companyName is collected (USDOT optional / "I don't know"). */
  usDot?: string;
  companyName?: string;
  /** Honeypot — must stay "" for humans; a filled value means a bot. */
  companyWebsite?: string;
  attribution?: LeadAttribution;
}

// ── Label lookups (value → human label), used by the Telegram formatter ──────

const byValue = (choices: Choice[]) => new Map(choices.map((c) => [c.value, c.label]));

const FLEET_LABELS = byValue(FLEET_SIZES);
const PROBLEM_LABELS = byValue(DRIVER_PROBLEMS);
const ROLE_LABELS = byValue(ROLES);

/** Resolve a stored value to its label, falling back to the raw value. */
export const fleetLabel = (value: string): string => FLEET_LABELS.get(value) ?? value;
export const roleLabel = (value: string): string => ROLE_LABELS.get(value) ?? value;
export const problemLabels = (values: string[]): string[] =>
  values.map((v) => PROBLEM_LABELS.get(v) ?? v);

// ── Allowed-value sets for server-side validation ────────────────────────────

export const FLEET_VALUES = new Set(FLEET_SIZES.map((c) => c.value));
export const PROBLEM_VALUES = new Set(DRIVER_PROBLEMS.map((c) => c.value));
export const ROLE_VALUES = new Set(ROLES.map((c) => c.value));

/** USDOT numbers are 5–8 digits (mirrors the /start funnel + backend). */
export const isUsDot = (value: string): boolean => /^\d{5,8}$/.test(value.trim());
