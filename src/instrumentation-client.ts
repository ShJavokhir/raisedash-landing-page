/**
 * PostHog product analytics — the BEHAVIOURAL half of the site's telemetry.
 *
 * The Meta layer (src/lib/meta-fleet-pixel.ts) optimises AD DELIVERY and reports
 * conversions to Facebook. PostHog answers a different question: what real people
 * DO on the site — which products they open, which CTA sends them to Telegram,
 * where /demo leaks, what breaks, and session replays of every visit.
 *
 * Runs before React hydration (Next.js `instrumentation-client` convention), so
 * the first pageview is captured reliably.
 *
 * AD-BLOCKER RESILIENCE (checked against EasyPrivacy, uBlock "privacy" and the
 * AdGuard tracking lists, 2026-10):
 *  1. posthog-js ships inside our own /_next/static bundle (npm module, not the
 *     CDN snippet), so "block posthog.com" rules can't match the library itself.
 *  2. `api_host` points at the same-origin /rdx proxy (next.config.ts rewrites)
 *     — events, replays, flags, remote config and lazy extension chunks all
 *     fetch from www.raisedash.com, never a posthog.com domain. Filter lists
 *     target the well-known proxy prefixes (/ingest, /ingress, /hog, /s/…), so
 *     "/rdx" is deliberately obscure; don't rename it to one of those.
 *  3. Conversions are ALSO recorded server-side (lead_* events from the API
 *     routes, src/lib/posthog-server.ts) — those count even when a blocker kills
 *     this SDK outright.
 *
 * Session replay, heatmaps and exception capture are forced on here, but the
 * PostHog project must still have "Record user sessions" enabled in its settings
 * before recordings start.
 */

import posthog from "posthog-js";
import { pageContext } from "@/lib/analytics-context";
import { POSTHOG_PROXY_PATH, POSTHOG_TOKEN, POSTHOG_UI_HOST } from "@/lib/posthog-config";
import { installSiteAutotrack } from "@/lib/site-autotrack";

// URL-ish properties that could carry a prefilled email (the /demo self-serve
// link adds ?email=). Scrubbed before anything leaves the browser.
const URL_PROPS = ["$current_url", "$referrer", "$elements_chain", "$external_click_url"];
const EMAIL_PARAM = /([?&]email=)[^&"#;\s]*/gi;

/**
 * Visit any page with ?rd_internal=1 to flag this browser as team traffic
 * (persisted as the `is_internal` super property); ?rd_internal=0 clears it.
 * Exclude it under Project settings → "Filter out internal and test users".
 */
function applyInternalFlag(): void {
  const flag = new URLSearchParams(window.location.search).get("rd_internal");
  if (flag === "1") posthog.register({ is_internal: true });
  else if (flag === "0") posthog.unregister("is_internal");
}

if (typeof window !== "undefined") {
  try {
    posthog.init(POSTHOG_TOKEN, {
      // Same-origin proxy (see next.config.ts rewrites). Relative path keeps
      // every request first-party so domain-based blockers can't drop data.
      api_host: POSTHOG_PROXY_PATH,
      // Links back to the PostHog app (toolbar); not used for data transport.
      ui_host: POSTHOG_UI_HOST,
      // Versioned bundle of current best-practice defaults: automatic $pageview
      // on client-side route changes (history_change) + $pageleave with scroll
      // depth + autocapture + rageclicks, localhost flagged as a test user.
      defaults: "2026-05-30",
      // Anonymous visitors still power funnels/replays/trends; a person profile
      // is only minted once we identify them (email capture / demo / contact).
      person_profiles: "identified_only",
      session_recording: {
        // Mask everything a visitor TYPES (their email — we get it as a proper
        // event + identify() at capture time anyway). Page TEXT stays visible on
        // purpose: watching which copy people read or skip is the point of
        // recording a marketing site. Merged onto the defaults' replay config.
        maskAllInputs: true,
      },
      // Console output inside replays — turns "the form did nothing" recordings
      // into debuggable JS-error reports.
      enable_recording_console_log: true,
      // Error tracking: unhandled errors + promise rejections as $exception.
      capture_exceptions: true,
      // Clicks on things that look clickable but aren't (copy that reads like a
      // link, a card without a href) — direct UX fixes.
      capture_dead_clicks: true,
      // Click/scroll heatmaps per page in the toolbar.
      enable_heatmaps: true,
      // Core Web Vitals per page + network timing inside replays.
      capture_performance: { web_vitals: true, network_timing: true },
      autocapture: {
        // People copying our sales email, a price, a phone number = intent.
        capture_copied_text: true,
      },
      before_send: (event) => {
        if (!event) return event;
        const props = event.properties;
        for (const key of URL_PROPS) {
          if (typeof props[key] === "string") {
            props[key] = (props[key] as string).replace(EMAIL_PARAM, "$1[redacted]");
          }
        }
        // Replay chunks don't need page classification.
        if (event.event !== "$snapshot") {
          const ctx = pageContext(window.location.pathname);
          props.page_group ??= ctx.page_group;
          if (ctx.product) props.product ??= ctx.product;
        }
        return event;
      },
      loaded: (ph) => {
        // Preview deploys and local dev stay separable from production traffic.
        ph.register({ deployment_env: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "development" });
        applyInternalFlag();
      },
    });
    installSiteAutotrack();
  } catch {
    // Telemetry must never take the page down.
  }
}
