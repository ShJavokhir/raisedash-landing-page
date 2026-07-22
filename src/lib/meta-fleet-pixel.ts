/**
 * Browser-side helpers for the FLEET Meta Pixel — the dataset the fleet (B2B)
 * Meta campaigns optimize against. This is a SEPARATE pixel from the /start*
 * funnels' driver-training pixel (NEXT_PUBLIC_META_PIXEL_ID) so "Lead" on the
 * fleet dataset means exactly one thing: a fleet-side email capture.
 *
 * Mounted site-wide via FleetMetaPixel in _app.tsx (never on /start*, which run
 * their own pixel). Every call goes through fbq('trackSingle', …) so fleet events
 * land ONLY in the fleet dataset even when one session initializes both pixels
 * (e.g. /tools/elp-practice → /start-v2 client-side navigation).
 *
 * Same Pixel + CAPI discipline as the funnels: the browser event here is the
 * best-effort half; the durable server twin fires from the API route that
 * receives the email (/api/email-capture, /api/demo-lead) under a shared
 * eventId for deduplication. Everything no-ops when
 * NEXT_PUBLIC_META_FLEET_PIXEL_ID is unset.
 */
import { bootstrapFbq } from "@/lib/meta-pixel";

export const FLEET_PIXEL_ID = process.env.NEXT_PUBLIC_META_FLEET_PIXEL_ID;

/** Lead = email captured (the ad-set optimization event). Schedule = demo requested. */
export type FleetPixelEvent = "PageView" | "Lead" | "Schedule";

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
  fbq("init", FLEET_PIXEL_ID);
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
  if (eventId) window.fbq("trackSingle", FLEET_PIXEL_ID, event, params, { eventID: eventId });
  else window.fbq("trackSingle", FLEET_PIXEL_ID, event, params);
}

const NINETY_DAYS = 90 * 24 * 60 * 60;
const THIRTY_DAYS = 30 * 24 * 60 * 60;

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
