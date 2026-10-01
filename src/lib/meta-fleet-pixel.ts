/**
 * Browser-side helpers for the FLEET Meta Pixel — the only dataset this site's
 * Meta campaigns optimize against. Its conversion ladder, lowest to highest:
 *
 *   EngagedVisit  custom; engaged time + an intent signal (src/lib/engaged-visit.ts).
 *                 The early, high-volume event to optimize on while the ad set
 *                 is in the learning phase.
 *   Lead          an email capture (EmailCapture, the /demo email gate).
 *   Schedule      a demo request / Cal.com booking on /demo.
 *
 * Move the ad set up a rung once the next one clears ~50 events/week.
 *
 * Mounted site-wide via FleetMetaPixel in _app.tsx (never on /start*). Every call
 * goes through fbq('trackSingle'/'trackSingleCustom', …) so fleet events land
 * ONLY in this dataset even when a session also initializes the legacy pixel
 * (homepage → /start-v3 client-side navigation).
 *
 * Every event is a Pixel + CAPI pair: the browser event here is the best-effort
 * half; the durable server twin (/api/email-capture, /api/demo-lead,
 * /api/visit-quality) shares its eventId so Meta dedupes the pair. Everything
 * no-ops when NEXT_PUBLIC_META_FLEET_PIXEL_ID is unset.
 */
import { bootstrapFbq, newEventId } from "@/lib/meta-pixel";

export const FLEET_PIXEL_ID = process.env.NEXT_PUBLIC_META_FLEET_PIXEL_ID;

export type FleetPixelEvent = "PageView" | "EngagedVisit" | "Lead" | "Schedule";

/** Non-standard Meta event names — sent with trackSingleCustom. */
const CUSTOM_EVENTS: ReadonlySet<FleetPixelEvent> = new Set(["EngagedVisit"]);

// Whether the fleet pixel id has been fbq('init')-ed this page load. Module
// state survives client-side navigation, so the _app-mounted component can
// re-mount (funnel detour and back) without double-initializing.
let fleetInited = false;

/**
 * Bootstrap fbq if needed, init the fleet pixel, fire the first PageView.
 * Returns true when it initialized just now (the caller then skips its own
 * PageView — init already fired one), false when already inited or unconfigured.
 */
export function initFleetPixel(): boolean {
  if (!FLEET_PIXEL_ID || typeof window === "undefined" || fleetInited) return false;

  const fbq = bootstrapFbq();
  // Limited Data Use, matching the server CAPI payloads. country/state 0 lets
  // Meta geolocate from IP. Applies to pixels initialized after this call.
  fbq("dataProcessingOptions", ["LDU"], 0, 0);
  // external_id = our first-party visitor id; the server twins send the same
  // value (hashed) from the rd_vid cookie, so browser + server events match the
  // same visitor. The Pixel hashes it before sending.
  const visitorId = ensureVisitorId();
  fbq("init", FLEET_PIXEL_ID, visitorId ? { external_id: visitorId } : {});
  fleetInited = true;
  trackFleetPageView();
  return true;
}

/** PageView for SPA route changes (Pages Router fires no natural page loads). */
export function trackFleetPageView(): void {
  trackFleetPixel("PageView");
}

/**
 * Fire a fleet-pixel event. Pass `eventId` for events also sent server-side so
 * Meta dedupes the Pixel + CAPI pair. No-ops until initFleetPixel has run.
 */
export function trackFleetPixel(
  event: FleetPixelEvent,
  params: Record<string, unknown> = {},
  eventId?: string
): void {
  if (!FLEET_PIXEL_ID || !fleetInited || typeof window === "undefined" || !window.fbq) return;
  const method = CUSTOM_EVENTS.has(event) ? "trackSingleCustom" : "trackSingle";
  if (eventId) window.fbq(method, FLEET_PIXEL_ID, event, params, { eventID: eventId });
  else window.fbq(method, FLEET_PIXEL_ID, event, params);
}

const ONE_YEAR = 365 * 24 * 60 * 60;
const NINETY_DAYS = 90 * 24 * 60 * 60;
const THIRTY_DAYS = 30 * 24 * 60 * 60;
const VISITOR_ID = /^[a-z0-9-]{8,64}$/;

/**
 * The rd_vid first-party visitor id (random, not personal data), created on the
 * first visit and kept a year. Sent to Meta as external_id by both the Pixel and
 * the server routes, which read the same cookie. Undefined if cookies are blocked.
 */
export function ensureVisitorId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const existing = document.cookie.match(/(?:^|; )rd_vid=([^;]*)/)?.[1];
  if (existing && VISITOR_ID.test(existing)) return existing;
  const id = newEventId();
  setCookie("rd_vid", id, ONE_YEAR);
  return document.cookie.includes(`rd_vid=${id}`) ? id : undefined;
}

function setCookie(name: string, value: string, maxAgeSeconds: number): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAgeSeconds}; path=/; samesite=lax`;
}

/**
 * Persist ad attribution in our own first-party cookies, independent of the
 * Pixel (which the FB/IG in-app browser routinely suppresses):
 *
 *  - rd_fbclid — the raw click id, so the server CAPI can synthesize _fbc for
 *    an email captured pages after the landing (90 days, matching _fbc).
 *  - rd_utm — the UTM set from the landing URL, so lead notifications can say
 *    which campaign produced the email (30 days).
 *
 * Mirrors the academy app's AttributionCapture. Safe to call on every route
 * change — it only (re)writes when the URL actually carries the params.
 */
export function captureAdAttributionCookies(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);

  const fbclid = params.get("fbclid");
  if (fbclid) setCookie("rd_fbclid", fbclid.slice(0, 500), NINETY_DAYS);

  const utm: Record<string, string> = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const value = params.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }
  if (Object.keys(utm).length > 0) setCookie("rd_utm", JSON.stringify(utm), THIRTY_DAYS);
}
