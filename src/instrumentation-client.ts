/**
 * PostHog product analytics — the BEHAVIOURAL half of the site's telemetry.
 *
 * The Meta layer (src/lib/meta-fleet-pixel.ts) optimises AD DELIVERY and reports
 * conversions to Facebook. PostHog answers a different question: what real people
 * DO on the site — which pages they read, how far they scroll, where /demo leaks,
 * and session replays of every visit. Reports into the SAME PostHog project as
 * the academy app and the legacy /start funnel beacon (/api/ev), so all Raisedash
 * web behaviour lives in one place.
 *
 * Runs before React hydration (Next.js `instrumentation-client` convention), so
 * the first pageview is captured reliably. No-ops when the project token is
 * absent — builds without the env stay silent.
 *
 * AD-BLOCKER RESILIENCE (mirrors the academy app):
 *  1. posthog-js ships inside our own /_next/static bundle (npm module, not the
 *     CDN snippet), so "block posthog.com" rules can't match the library itself.
 *  2. `api_host` points at the same-origin /rdx proxy (next.config.ts rewrites)
 *     — events, the session-recorder chunk, and remote config all fetch from
 *     www.raisedash.com, never from a posthog.com domain a blocker recognises.
 *     Deliberately "/rdx", not PostHog's well-known "/ingest", which some filter
 *     lists now catch.
 *
 * The token (`phc_…`) is a PUBLISHABLE key, safe to inline in client JS. Session
 * replay also needs "Record user sessions" enabled in PostHog project settings —
 * the client config here only governs masking/console capture.
 */

import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (typeof window !== "undefined" && token) {
  try {
    posthog.init(token, {
      // Same-origin proxy (see next.config.ts rewrites). Relative path keeps
      // every request first-party so domain-based blockers can't drop data.
      api_host: "/rdx",
      // Links back to the PostHog app (toolbar); not used for data transport.
      ui_host: "https://us.posthog.com",
      // Versioned bundle of current best-practice defaults: automatic $pageview
      // on client-side route changes (history_change) + $pageleave with scroll
      // depth + autocapture of clicks/inputs. One knob instead of a dozen.
      defaults: "2026-05-30",
      // Anonymous visitors still power funnels/replays/trends; a person profile
      // is only minted once we identify them (email capture / demo request).
      person_profiles: "identified_only",
      session_recording: {
        // Mask everything a visitor TYPES (their email — we get it as a proper
        // event + identify() at capture time anyway). Page TEXT stays visible on
        // purpose: watching which copy people read or skip is the point of
        // recording a marketing site.
        maskAllInputs: true,
      },
      // Console output inside replays — turns "the form did nothing" recordings
      // into debuggable JS-error reports.
      enable_recording_console_log: true,
    });
  } catch {
    // Telemetry must never take the page down.
  }
}
