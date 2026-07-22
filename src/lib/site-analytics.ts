/**
 * Thin, always-safe wrapper over the PostHog browser singleton (initialised in
 * src/instrumentation-client.ts) for the named "money-moment" events we fire
 * alongside their Meta twins (src/lib/meta-fleet-pixel.ts).
 *
 * Autocapture + $pageview/$pageleave already record the ambient behaviour
 * (clicks, scroll depth, page flow, campaign utm_* + fbclid attribution); these
 * give us the clean, Meta-reconcilable conversion funnel:
 *
 *   email_capture_submitted (Meta "Lead" twin)
 *     → demo_path_chosen → demo_step_viewed × N
 *     → demo_request_submitted (Meta "Schedule" twin) → scheduling_link_clicked
 *
 * plus the high-intent side signals (roi_calculator_*).
 *
 * Every call no-ops when PostHog isn't live (token unset, SSR, blocked), so
 * call sites never need to guard. This is the marketing site's wrapper — the
 * legacy /start* funnels keep their separate /api/ev beacon (funnel-analytics.ts).
 */
import posthog from "posthog-js";

// Build-inlined constant; also gates instrumentation-client's init, so when it's
// set the singleton is initialised by the time any handler runs.
const enabled =
  typeof window !== "undefined" && Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);

export type SiteAnalyticsEvent =
  | "email_capture_submitted"
  | "demo_path_chosen"
  | "demo_step_viewed"
  | "demo_request_submitted"
  | "demo_request_error"
  | "scheduling_link_clicked"
  | "roi_calculator_used"
  | "roi_calculator_link_copied";

export function capture(event: SiteAnalyticsEvent, properties?: Record<string, unknown>): void {
  if (!enabled) return;
  try {
    posthog.capture(event, properties);
  } catch {
    // Analytics must never throw into the page.
  }
}

/**
 * Tie the anonymous session (and its replay) to a lead the moment we learn who
 * they are — email capture, demo request. Email is the same join key Telegram
 * and the backend use. Idempotent — safe to call on every submit.
 */
export function identify(email: string | null | undefined): void {
  if (!enabled || !email) return;
  try {
    posthog.identify(email.trim().toLowerCase(), { email: email.trim().toLowerCase() });
  } catch {
    // ignore
  }
}
