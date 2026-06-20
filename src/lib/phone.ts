/**
 * Phone helpers for US/Canada numbers (the only regions Raisedash supports).
 * Both share the +1 North American Numbering Plan (NANP), so we collect a
 * 10-digit number and store it in E.164 (`+1XXXXXXXXXX`) — the exact format AWS
 * SNS needs to deliver SMS. Keep this in lock-step with the backend's
 * normalizeUsPhone() so what we store always sends.
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
