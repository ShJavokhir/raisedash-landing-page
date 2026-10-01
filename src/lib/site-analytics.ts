/**
 * Thin, always-safe wrapper over the PostHog browser singleton (initialised in
 * src/instrumentation-client.ts) for the named "money-moment" events we fire
 * alongside their Meta twins (src/lib/meta-fleet-pixel.ts).
 *
 * Autocapture + $pageview/$pageleave already record the ambient behaviour
 * (clicks, scroll depth, page flow, campaign utm_* + fbclid attribution), and
 * every event carries `page_group` + `product` (src/lib/analytics-context.ts).
 * These give us the clean, Meta-reconcilable conversion funnels:
 *
 *   product_card_clicked (homepage) → product page
 *     → outbound_link_clicked (Telegram bot / sales chat / booking / app)
 *
 *   email_capture_submitted (Meta "Lead" twin)
 *     → demo_path_chosen → demo_step_viewed × N
 *     → demo_request_submitted (Meta "Schedule" twin) → scheduling_link_clicked
 *
 * plus engagement signals (video_*, embed_clicked, intercom_opened, roi_*).
 * outbound/video/embed events are fired by the document-level listeners in
 * src/lib/site-autotrack.ts, not by individual pages.
 *
 * Server-side twins (lead_*) are sent by the API routes via
 * src/lib/posthog-server.ts, so conversions still count when a blocker kills
 * this SDK; send `analyticsContext()` in those request bodies to tie them to the
 * visitor's session replay.
 *
 * Every call no-ops when PostHog isn't live (SSR, init failed), so call sites
 * never need to guard. The legacy /start* funnels keep their separate /api/ev
 * beacon (funnel-analytics.ts).
 */
import posthog from "posthog-js";
import { POSTHOG_TOKEN, POSTHOG_UI_HOST } from "@/lib/posthog-config";

export type SiteAnalyticsEvent =
  | "email_capture_submitted"
  | "demo_path_chosen"
  | "demo_step_viewed"
  | "demo_request_submitted"
  | "demo_request_error"
  | "scheduling_link_clicked"
  | "roi_calculator_used"
  | "roi_calculator_link_copied"
  | "product_card_clicked"
  | "outbound_link_clicked"
  | "video_started"
  | "video_progress"
  | "video_completed"
  | "embed_clicked"
  | "intercom_opened"
  | "contact_form_submitted"
  | "contact_form_error"
  | "job_application_submitted";

/** True once instrumentation-client has initialised the singleton. */
function live(): boolean {
  return typeof window !== "undefined" && posthog.__loaded;
}

export function capture(
  event: SiteAnalyticsEvent,
  properties?: Record<string, unknown>,
  options?: { beacon?: boolean }
): void {
  if (!live()) return;
  try {
    if (options?.beacon) {
      // A same-tab click that leaves the page. On a phone a t.me link hands off to the
      // Telegram app with no pagehide, so PostHog's own unload flush never runs
      // and the batch queue (this page's $pageview, the card click that led
      // here) would be stranded. shutdown() is the public "drain the queues by
      // beacon" call (the same drain the SDK runs on pagehide); despite the
      // name, capture and batching keep working afterwards — its only other
      // effect is dropping the feature-flag "online" refetch listener.
      void posthog.shutdown();
      posthog.capture(event, properties, { transport: "sendBeacon" });
      return;
    }
    posthog.capture(event, properties);
  } catch {
    // Analytics must never throw into the page.
  }
}

/**
 * Tie the anonymous session (and its replay) to a lead the moment we learn who
 * they are — email capture, demo request, contact form. Email is the same join
 * key Telegram, the backend and the server-side lead_* events use. Idempotent —
 * safe to call on every submit.
 */
export function identify(email: string | null | undefined): void {
  if (!live() || !email) return;
  try {
    const normalized = email.trim().toLowerCase();
    posthog.identify(normalized, { email: normalized });
  } catch {
    // ignore
  }
}

/**
 * The visitor's PostHog ids, sent in API request bodies so the server-side
 * lead_* event lands on the same session replay. Empty when the SDK is blocked —
 * the server records that as `client_tracked: false`.
 */
export function analyticsContext(): { distinctId?: string; sessionId?: string } {
  if (!live()) return {};
  try {
    return { distinctId: posthog.get_distinct_id(), sessionId: posthog.get_session_id() };
  } catch {
    return {};
  }
}

/**
 * Calls `onLinks` with this visitor's replay + person URLs now and again whenever
 * the PostHog session rotates — used to stamp them on the Intercom lead so a
 * support chat opens straight into "what were they looking at".
 */
export function onSessionLinks(
  onLinks: (links: { replayUrl: string; personUrl: string }) => void
): void {
  if (!live()) return;
  try {
    let lastSession = "";
    posthog.onSessionId((sessionId) => {
      if (sessionId === lastSession) return;
      lastSession = sessionId;
      onLinks({
        replayUrl: posthog.get_session_replay_url({ withTimestamp: true }),
        personUrl: `${POSTHOG_UI_HOST}/project/${POSTHOG_TOKEN}/person/${encodeURIComponent(
          posthog.get_distinct_id()
        )}`,
      });
    });
  } catch {
    // ignore
  }
}
