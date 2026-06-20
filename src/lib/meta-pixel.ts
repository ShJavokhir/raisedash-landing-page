/**
 * Browser-side Meta (Facebook/Instagram) Pixel helpers for the public onboarding
 * funnel. The Pixel is the best-effort half of a Pixel + Conversions-API pair: in
 * the FB/IG in-app browser it's routinely suppressed (sandboxed cookies, ATT
 * opt-out, ad blockers), so the server CAPI Lead — sharing an event id with the
 * Pixel for deduplication — is the durable signal. Everything here no-ops when
 * NEXT_PUBLIC_META_PIXEL_ID is unset.
 *
 * Scoped to the funnel on purpose: nothing loads the Pixel app-wide.
 */

export const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: unknown;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export type PixelEvent = "PageView" | "ViewContent" | "Lead";

/** Ad-click attribution captured at first load, forwarded to the server CAPI. */
export interface Attribution {
  fbclid?: string;
  fbp?: string;
  fbc?: string;
  landingUrl?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Capture the ad click id and persist `_fbc` ourselves. The in-app browser may
 * never set this cookie (or may lose it across the multi-step flow), so we write
 * it on first load from the URL's `fbclid`. fbclid is case-sensitive — store it
 * verbatim. Format: fb.{subdomainIndex}.{creationTimeMs}.{fbclid} (index 1 when
 * we generate it; timestamp in milliseconds).
 */
export function captureClickId(): void {
  if (typeof window === "undefined") return;
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (!fbclid) return;
  const existing = readCookie("_fbc");
  // Only (re)write if missing or the click id changed (the id is the last dotted
  // segment of the stored value).
  if (existing && existing.endsWith(`.${fbclid}`)) return;
  const fbc = `fb.1.${Date.now()}.${fbclid}`;
  document.cookie = `_fbc=${fbc}; max-age=${90 * 24 * 60 * 60}; path=/; samesite=lax`;
}

/** Bootstrap fbq (the standard Meta snippet) and fire PageView. Idempotent. */
export function initPixel(): void {
  if (!PIXEL_ID || typeof window === "undefined" || window.fbq) return;

  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  if (!window._fbq) window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  // Limited Data Use must match the server CAPI (which sends LDU on every
  // event). country/state 0 => Meta geolocates from IP. Set before init so it
  // applies to PageView, ViewContent, and the deduped Lead alike.
  fbq("dataProcessingOptions", ["LDU"], 0, 0);
  fbq("init", PIXEL_ID);
  fbq("track", "PageView");
}

/**
 * Fire a Pixel event. Pass `eventId` for events also sent server-side (Lead) so
 * Meta deduplicates the pair. No-ops when the Pixel isn't loaded.
 */
export function trackPixel(
  event: PixelEvent,
  params: Record<string, unknown> = {},
  eventId?: string
): void {
  if (!PIXEL_ID || typeof window === "undefined" || !window.fbq) return;
  if (eventId) window.fbq("track", event, params, { eventID: eventId });
  else window.fbq("track", event, params);
}

/** Collect attribution from the URL + cookies at submit time. */
export function collectAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const trim = (v: string | null) => (v ? v.slice(0, 500) : undefined);
  return {
    fbclid: trim(params.get("fbclid")),
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
    landingUrl: window.location.href.slice(0, 2048),
    referrer: document.referrer ? document.referrer.slice(0, 2048) : undefined,
    utmSource: trim(params.get("utm_source")),
    utmMedium: trim(params.get("utm_medium")),
    utmCampaign: trim(params.get("utm_campaign")),
    utmContent: trim(params.get("utm_content")),
    utmTerm: trim(params.get("utm_term")),
  };
}

/**
 * A unique id used to deduplicate the browser Pixel Lead against the server CAPI
 * Lead. crypto.randomUUID needs a secure context (fine on https / the in-app
 * browser); fall back for older webviews.
 */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Drop empty/undefined values so we don't send a bag of nulls to the API. */
export function compactAttribution(a: Attribution): Attribution {
  return Object.fromEntries(
    Object.entries(a).filter(([, v]) => v != null && v !== "")
  ) as Attribution;
}
