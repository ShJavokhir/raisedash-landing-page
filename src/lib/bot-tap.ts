/**
 * The Telegram bot tap — a visitor tapping a link to @raisedashbot (the PTI
 * page's "Add @raisedashbot" / "Start free in Telegram"). Sent to the fleet pixel
 * as the STANDARD event "CompleteRegistration" (content_name: telegram_bot_tap),
 * one rung above the engaged visit ("Contact"): the visitor asked for the
 * product, not just read about it. Standard on purpose, like Contact, so the
 * Leads objective offers it as a conversion event.
 *
 * Fires ONCE per browser session. Android Instagram visitors whose tap does
 * nothing hammer the button (one person tapped 418 times in 90 seconds), and
 * repeat taps must not teach Meta that a frustrated visitor is a great one.
 *
 * A deduped pair like the engaged visit: the browser Pixel event and its server
 * CAPI twin via /api/handoff (shared eventId; keepalive, since the tap usually
 * leaves for Telegram at once), plus the PostHog event telegram_bot_tapped.
 * Also qualifies the engaged visit ("Contact") on the spot, since the visitor
 * is usually gone before its time requirement is met.
 * Called from TelegramBotLink, so it only ever runs on pages that link the bot.
 */
import { qualifyEngagedVisitNow } from "@/lib/engaged-visit";
import { newEventId } from "@/lib/meta-pixel";
import { FLEET_PIXEL_ID, trackFleetPixel } from "@/lib/meta-fleet-pixel";
import { capture } from "@/lib/site-analytics";

const STORAGE_KEY = "rd_bot_tap";

// Backs up the sessionStorage flag when storage is blocked (per page load only).
let firedThisLoad = false;

function alreadyFired(): boolean {
  if (firedThisLoad) return true;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markFired(): void {
  firedThisLoad = true;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Best-effort.
  }
}

/** Record a tap on a bot link. `placement` names the link (hero, free_plan, help). */
export function noteBotTap(placement: string): void {
  if (typeof window === "undefined" || navigator.webdriver || alreadyFired()) return;
  markFired();

  const eventId = newEventId();
  trackFleetPixel("CompleteRegistration", { content_name: "telegram_bot_tap", placement }, eventId);
  if (FLEET_PIXEL_ID) {
    void fetch("/api/handoff", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ eventId, placement }),
      keepalive: true,
    }).catch(() => {});
  }
  capture("telegram_bot_tapped", { placement, meta_event_id: eventId });
  // The tap leaves for Telegram at once, so it also counts as the engaged visit.
  qualifyEngagedVisitNow("bot_tap");
}
