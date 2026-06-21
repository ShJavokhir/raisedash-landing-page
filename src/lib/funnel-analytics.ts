/**
 * Same-origin funnel telemetry for the public /start onboarding flow.
 *
 * The funnel runs almost entirely inside the Facebook/Instagram in-app browser,
 * where third-party analytics scripts and cookies are routinely suppressed — the
 * same sandboxing that forces the Meta Pixel to lean on the server CAPI (see
 * meta-pixel.ts). So rather than ship a client analytics SDK that would be both
 * heavy and lossy in that webview, we POST a tiny event to our own /api/ev route,
 * which forwards it to PostHog server-side.
 *
 * navigator.sendBeacon is the right primitive here: it's fire-and-forget and the
 * browser flushes it even as the page is unloading — exactly the moment a user
 * bounces off a step. fetch(..., { keepalive: true }) covers the rare webview
 * without sendBeacon. Either way, telemetry must never throw into the funnel.
 *
 * No PII leaves the funnel: only the step, a per-session id, and non-identifying
 * categorical answers (fleet size, selected worries). Never name/email/phone/DOT.
 */

export interface FunnelEvent {
  /** Per-session id (a UUID) — stable across the steps of one funnel run. */
  sid: string;
  /** Event name, e.g. "funnel_step_viewed". */
  event: string;
  /** Arbitrary non-PII properties (step index, step name, fleet size, …). */
  props?: Record<string, unknown>;
}

/** Fire-and-forget a funnel event to the same-origin sink. Best-effort. */
export function trackFunnel({ sid, event, props }: FunnelEvent): void {
  if (typeof window === "undefined" || !sid || !event) return;
  try {
    const payload = JSON.stringify({ sid, event, props, ts: Date.now() });

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      // The Blob's type sets the request Content-Type; same-origin, so there's
      // no CORS preflight and Next's body parser reads it as JSON.
      navigator.sendBeacon("/api/ev", new Blob([payload], { type: "application/json" }));
      return;
    }

    // keepalive lets the request outlive the page unload, just like sendBeacon.
    void fetch("/api/ev", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true,
    });
  } catch {
    // A telemetry failure must never break the funnel.
  }
}
