/**
 * Phone helpers for US/Canada numbers (the only regions Raisedash supports for
 * SMS). Both share the +1 North American Numbering Plan (NANP), so we collect a
 * 10-digit number and store it in E.164 (`+1XXXXXXXXXX`) — the exact format AWS
 * SNS needs to deliver SMS. Keep this in lock-step with the backend's
 * normalizeUsPhone() so what we store always sends.
 *
 * The *Intl helpers below are a separate, permissive variant used only by the
 * /start-v2 lead funnel, where a human calls the lead back rather than SMSing
 * them — so the contact may be anywhere in the world. They don't force +1.
 */

/** Strip to digits and drop a leading country-code `1` if present. */
function nationalDigits(raw: string): string {
  let d = (raw ?? "").replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  return d.slice(0, 10);
}

/**
 * Pretty-print as the user types: "(555) 123-4567". Partial input formats
 * progressively so the field never fights the user.
 */
export function formatPhone(raw: string): string {
  const d = nationalDigits(raw);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

/** A complete NANP number is exactly 10 national digits. */
export function isValidPhone(raw: string): boolean {
  return nationalDigits(raw).length === 10;
}

/**
 * E.164 for storage/SMS, e.g. "(555) 123-4567" → "+15551234567". Returns null
 * for incomplete input so callers can omit the field instead of saving junk.
 */
export function toE164(raw: string): string | null {
  const d = nationalDigits(raw);
  return d.length === 10 ? `+1${d}` : null;
}

/** Render a stored value (E.164 or raw) back to "(555) 123-4567" for display. */
export function displayPhone(stored?: string | null): string {
  if (!stored) return "";
  const pretty = formatPhone(stored);
  return pretty || stored;
}

// --- International variant (used by the /start-v2 lead funnel) ----------------
// We can't know the caller's country, so we stay permissive: keep the full
// country-code-plus-number as digits, store "+" followed by 7–15 of them (the
// E.164 length bounds), and group only for legibility. A teammate reads these
// off Telegram and calls back, so loose-but-clean beats strict-but-rejecting.

/**
 * Digits only, capped at E.164's 15-digit maximum. A leading "00" (the IDD/
 * international-call prefix some people type instead of "+") is dropped so it
 * doesn't get mistaken for part of the country code.
 */
function intlDigits(raw: string): string {
  let d = (raw ?? "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  return d.slice(0, 15);
}

/**
 * Light, country-agnostic formatting as the user types: the digits space-grouped
 * in threes from the right ("442012345678" → "442 012 345 678"). The fixed "+"
 * prefix lives in the input chrome, so this returns the digits only.
 */
export function formatIntlPhone(raw: string): string {
  const d = intlDigits(raw);
  if (!d) return "";
  return d.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** A plausible international number: between 7 and 15 digits. */
export function isValidIntlPhone(raw: string): boolean {
  const n = intlDigits(raw).length;
  return n >= 7 && n <= 15;
}

/**
 * E.164 for storage, e.g. "1 (555) 123-4567" → "+15551234567". Returns null for
 * too-short/too-long input so callers can omit the field instead of saving junk.
 */
export function toIntlE164(raw: string): string | null {
  const d = intlDigits(raw);
  return d.length >= 7 && d.length <= 15 ? `+${d}` : null;
}

/** Render a stored international value ("+15551234567") back to "+1 555 123 4567". */
export function displayIntlPhone(stored?: string | null): string {
  if (!stored) return "";
  const pretty = formatIntlPhone(stored);
  return pretty ? `+${pretty}` : stored;
}
