/**
 * A single source of truth for "has this visitor already given us their email?".
 *
 * The homepage capture forms (EmailCapture) write it before sending the visitor
 * to /demo; the /demo funnel reads it to skip its own email gate and prefill the
 * contact step. We persist to BOTH localStorage (durable across sessions/tabs, so
 * a returning visitor is never asked twice) and sessionStorage (kept for anything
 * stored earlier this session). The email rides in storage — never a query param —
 * so it never lands in URLs, history, or analytics.
 */
import { isValidEmail } from "@/lib/validation";

const KEY = "rd_captured_email";

/**
 * The email this visitor already gave us, or "" if none/invalid. Reads
 * localStorage first (durable), then sessionStorage. Safe on the server and when
 * storage is unavailable (private mode) — returns "".
 */
export function getCapturedEmail(): string {
  if (typeof window === "undefined") return "";
  for (const store of [window.localStorage, window.sessionStorage]) {
    try {
      const value = store?.getItem(KEY)?.trim().toLowerCase() ?? "";
      if (value && isValidEmail(value)) return value;
    } catch {
      // Storage blocked (private mode etc.) — try the next store.
    }
  }
  return "";
}

/**
 * Remember a captured email so later pages (e.g. /demo) never ask again.
 * Best-effort and no-op for an invalid address; writes to both stores.
 */
export function setCapturedEmail(email: string): void {
  if (typeof window === "undefined") return;
  const normalized = email.trim().toLowerCase();
  if (!isValidEmail(normalized)) return;
  for (const store of [window.localStorage, window.sessionStorage]) {
    try {
      store?.setItem(KEY, normalized);
    } catch {
      // Storage unavailable — the /demo gate will just ask once.
    }
  }
}
