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

export type Fbq = ((...args: unknown[]) => void) & {
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

export type PixelEvent = "PageView" | "ViewContent" | "Lead" | "CompleteRegistration";

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

/**
 * Strip personal data (e.g. a forwarded `?email=`) from the funnel URL before the
 * Pixel reads it. The Pixel's PageView and the CAPI Lead both send
 * `event_source_url` — the full page URL — to Meta, which must never carry raw
 * PII. A stale `/get-started?email=…` link redirects here as `/start?email=…`
 * (Next forwards query strings), so we scrub it in place via replaceState (no
 * reload) as the very first thing on mount, before initPixel fires PageView.
 */
export function stripSensitiveParams(): void {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  let changed = false;
  for (const key of ["email", "phone", "name"]) {
    if (url.searchParams.has(key)) {
      url.searchParams.delete(key);
      changed = true;
    }
  }
  if (changed) window.history.replaceState(window.history.state, "", url.toString());
}

/**
 * Ensure an `_fbp` browser id exists. The Pixel normally sets this, but in the
 * FB/IG in-app browser the Pixel is routinely suppressed, so `_fbp` is never
 * created and the server CAPI loses a matching signal. When it's missing we
 * synthesize one ourselves — fb.{subdomainIndex}.{creationTimeMs}.{random} — and
 * persist it, exactly as the Pixel would. If the real Pixel later loads it adopts
 * our cookie, so the browser Pixel and server CAPI stay on one consistent id.
 */
export function ensureFbp(): void {
  if (typeof document === "undefined") return;
  if (readCookie("_fbp")) return;
  const fbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 1e10)}`;
  document.cookie = `_fbp=${fbp}; max-age=${90 * 24 * 60 * 60}; path=/; samesite=lax`;
}

/**
 * Create the fbq command queue + inject fbevents.js if no pixel has done so yet.
 * Shared by this funnel pixel and the site-wide fleet pixel (meta-fleet-pixel.ts):
 * whichever initializes first bootstraps the stub, the other reuses it — the
 * standard Meta snippet is one-per-page, however many pixel ids it serves.
 * Browser-only: callers guard `typeof window` before calling.
 */
export function bootstrapFbq(): Fbq {
  if (!window.fbq) {
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
  }
  return window.fbq;
}

// Whether THIS pixel id has been fbq('init')-ed. Deliberately not "window.fbq
// exists": the site-wide fleet pixel may have bootstrapped fbq before the visitor
// reaches a /start* funnel (e.g. /tools/elp-practice → /start-v2), and this pixel
// still needs its own init.
let pixelInited = false;

/** Bootstrap fbq (the standard Meta snippet) and fire PageView. Idempotent. */
export function initPixel(): void {
  if (!PIXEL_ID || typeof window === "undefined" || pixelInited) return;

  const fbq = bootstrapFbq();

  // Limited Data Use must match the server CAPI (which sends LDU on every
  // event). country/state 0 => Meta geolocates from IP. Set before init so it
  // applies to PageView, ViewContent, and the deduped Lead alike.
  fbq("dataProcessingOptions", ["LDU"], 0, 0);
  fbq("init", PIXEL_ID);
  pixelInited = true;
  fbq("trackSingle", PIXEL_ID, "PageView");
}

/**
 * Fire a Pixel event. Pass `eventId` for events also sent server-side (Lead) so
 * Meta deduplicates the pair. No-ops when the Pixel isn't loaded.
 *
 * trackSingle, not track: a session can hold this funnel pixel AND the site-wide
 * fleet pixel (separate dataset), and a broadcast fbq('track') would double every
 * funnel event into the fleet dataset.
 */
export function trackPixel(
  event: PixelEvent,
  params: Record<string, unknown> = {},
  eventId?: string
): void {
  if (!PIXEL_ID || typeof window === "undefined" || !window.fbq) return;
  if (eventId) window.fbq("trackSingle", PIXEL_ID, event, params, { eventID: eventId });
  else window.fbq("trackSingle", PIXEL_ID, event, params);
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
 * Ad attribution for PostHog funnel telemetry, already keyed with PostHog's
 * canonical property names so the sink can attach it verbatim. Deliberately a
 * NON-PII, URL-only subset of {@link Attribution}: utm_* + fbclid + referrer.
 *
 * We intentionally omit `landingUrl` and the `_fbp`/`_fbc` cookies. The funnel's
 * first telemetry event fires on mount, before MetaPixel's stripSensitiveParams()
 * runs, so the live URL can still carry a forwarded `?email=` — capturing it would
 * leak PII into PostHog. The query params we DO read (utm_*, fbclid) and
 * document.referrer (the ad/Facebook page, not our URL) are safe at any moment.
 */
export type CampaignAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  $referrer?: string;
  $referring_domain?: string;
};

/**
 * Collect non-PII ad attribution for PostHog, in canonical property names. Wrapped
 * in a catch-all returning {} so it can be called inline on the funnel's hot path
 * (including before submit) without any chance of throwing into the funnel.
 */
export function campaignAttribution(): CampaignAttribution {
  if (typeof window === "undefined") return {};
  try {
    const params = new URLSearchParams(window.location.search);
    const trim = (v: string | null) => (v ? v.slice(0, 500) : undefined);
    const referrer =
      typeof document !== "undefined" && document.referrer
        ? document.referrer.slice(0, 2048)
        : undefined;
    let referringDomain: string | undefined;
    if (referrer) {
      try {
        referringDomain = new URL(referrer).hostname;
      } catch {
        // Malformed referrer — skip the derived domain, keep the raw value.
      }
    }
    const out: CampaignAttribution = {
      utm_source: trim(params.get("utm_source")),
      utm_medium: trim(params.get("utm_medium")),
      utm_campaign: trim(params.get("utm_campaign")),
      utm_content: trim(params.get("utm_content")),
      utm_term: trim(params.get("utm_term")),
      fbclid: trim(params.get("fbclid")),
      $referrer: referrer,
      $referring_domain: referringDomain,
    };
    // Drop empties so we never send a bag of nulls (and never set_once an empty).
    return Object.fromEntries(
      Object.entries(out).filter(([, v]) => v != null && v !== "")
    ) as CampaignAttribution;
  } catch {
    return {};
  }
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
