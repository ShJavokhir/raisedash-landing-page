/**
 * Shared option sets for the /demo "book a demo" funnel.
 *
 * Kept beside the funnel UI but deliberately dependency-free (plain data, no React)
 * so /api/demo-lead can import the exact same values and labels the funnel renders.
 * The client and the server validate against one source of truth, and the Telegram
 * notification resolves stored option values back to their human labels.
 */

export interface Choice {
  value: string;
  label: string;
}

/** Step 1 — fleet size (how many drivers). */
export const FLEET_OPTIONS: Choice[] = [
  { value: "1-10", label: "1–10 drivers" },
  { value: "11-25", label: "11–25 drivers" },
  { value: "26-100", label: "26–100 drivers" },
  { value: "101-250", label: "101–250 drivers" },
  { value: "250+", label: "250+ drivers" },
];

/** Step 2 — the person's role. */
export const ROLE_OPTIONS: Choice[] = [
  { value: "safety-director", label: "Safety director" },
  { value: "owner-cfo", label: "Owner / CFO" },
  { value: "operations", label: "Operations" },
  { value: "hr-recruiting", label: "HR / Recruiting" },
  { value: "other", label: "Other" },
];

/** Step 3 — biggest headache right now (multi-select). */
export const HEADACHE_OPTIONS: Choice[] = [
  { value: "orientation-noshows", label: "Orientation no-shows & unprepared new hires" },
  { value: "scattered-records", label: "Training records scattered everywhere" },
  {
    value: "proof-after-incident",
    label: "Proving what a driver was trained on after an incident",
  },
  { value: "first-90-days", label: "Keeping new drivers on track in their first 90 days" },
  { value: "something-else", label: "Something else" },
];

export const FLEET_VALUES = new Set(FLEET_OPTIONS.map((o) => o.value));
export const ROLE_VALUES = new Set(ROLE_OPTIONS.map((o) => o.value));
export const HEADACHE_VALUES = new Set(HEADACHE_OPTIONS.map((o) => o.value));

/** Resolve a stored option value back to its human label (used by the Telegram message). */
export function labelFor(options: Choice[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}
