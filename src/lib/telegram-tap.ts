/**
 * A Telegram tap — a visitor tapping one of our t.me links:
 *  - "bot":   @raisedashbot (the PTI page's "Add @raisedashbot" / "Start free in
 *             Telegram"), content_name telegram_bot_tap.
 *  - "sales": @raisedash, our team (the /get-a-demo "Contact us on Telegram"
 *             choice, where the Samsara page's demo buttons lead),
 *             content_name telegram_sales_tap.
 * Sent to the fleet pixel as the STANDARD event "CompleteRegistration", one rung
 * above the engaged visit ("Contact"): the visitor asked for the product, not
 * just read about it. Standard on purpose, like Contact, so the Leads objective
 * offers it as a conversion event; content_name keeps the two apart in a custom
 * conversion.
 *
 * Fires ONCE per browser session per kind. Android Instagram visitors whose tap
 * does nothing hammer the button (one person tapped 418 times in 90 seconds), and
 * repeat taps must not teach Meta that a frustrated visitor is a great one.
 *
 * A deduped pair like the engaged visit: the browser Pixel event and its server
 * CAPI twin via /api/handoff (shared eventId; keepalive, since the tap usually
 * leaves for Telegram at once), plus a PostHog event (telegram_bot_tapped /
 * telegram_sales_tapped). Also qualifies the engaged visit ("Contact") on the
 * spot, since the visitor is usually gone before its time requirement is met.
 * Called from TelegramLink, so it only ever runs on pages that link to Telegram.
 */
import { qualifyEngagedVisitNow } from "@/lib/engaged-visit";
import { newEventId } from "@/lib/meta-pixel";
import { FLEET_PIXEL_ID, trackFleetPixel } from "@/lib/meta-fleet-pixel";
import { capture } from "@/lib/site-analytics";

export type TelegramKind = "bot" | "sales";

const KINDS = {
  bot: {
    storageKey: "rd_bot_tap",
    contentName: "telegram_bot_tap",
    event: "telegram_bot_tapped",
    signal: "bot_tap",
  },
  sales: {
    storageKey: "rd_sales_tap",
    contentName: "telegram_sales_tap",
    event: "telegram_sales_tapped",
    signal: "sales_tap",
  },
} as const;

// Backs up the sessionStorage flag when storage is blocked (per page load only).
const firedThisLoad = new Set<TelegramKind>();

function alreadyFired(kind: TelegramKind): boolean {
  if (firedThisLoad.has(kind)) return true;
  try {
    return window.sessionStorage.getItem(KINDS[kind].storageKey) === "1";
  } catch {
    return false;
  }
}

function markFired(kind: TelegramKind): void {
  firedThisLoad.add(kind);
  try {
    window.sessionStorage.setItem(KINDS[kind].storageKey, "1");
  } catch {
    // Best-effort.
  }
}

/**
 * Record a tap on a Telegram link. `placement` names the link (hero, free_plan,
 * get_a_demo, help); `product` is the product slug the visitor came for, if any.
 */
export function noteTelegramTap(kind: TelegramKind, placement: string, product?: string): void {
  if (typeof window === "undefined" || navigator.webdriver || alreadyFired(kind)) return;
  markFired(kind);

  const { contentName, event, signal } = KINDS[kind];
  const eventId = newEventId();
  trackFleetPixel(
    "CompleteRegistration",
    { content_name: contentName, placement, ...(product ? { product } : {}) },
    eventId
  );
  if (FLEET_PIXEL_ID) {
    void fetch("/api/handoff", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ eventId, kind, placement, product }),
      keepalive: true,
    }).catch(() => {});
  }
  capture(event, { placement, product, meta_event_id: eventId });
  // The tap leaves for Telegram at once, so it also counts as the engaged visit.
  qualifyEngagedVisitNow(signal);
}
