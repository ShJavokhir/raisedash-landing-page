import type { NextApiRequest } from "next";
import { pageContext } from "@/lib/analytics-context";
import { POSTHOG_INGEST_HOST, POSTHOG_TOKEN } from "@/lib/posthog-config";

/**
 * Server-side PostHog capture for conversions — the ad-blocker-proof half of
 * the lead funnel. The browser twin (email_capture_submitted, …) gives the
 * funnel/replay context but dies with the SDK when a blocker or a strict in-app
 * browser kills it; these are sent from our API routes, so every real lead is
 * counted. Comparing the two counts (or `client_tracked: false`) is how blocked
 * traffic shows up.
 *
 * `distinct_id` is the lead's normalized email — the same id the browser
 * identify()s with — so both twins land on one person. When the client sends
 * its `analyticsContext()` (src/lib/site-analytics.ts), the event also carries
 * `$session_id`, linking it to that visit's session replay.
 *
 * Best-effort and time-boxed: a PostHog outage must never fail or slow a lead.
 * Await it before responding (Vercel may freeze the function after res.end).
 */

export type ServerAnalyticsEvent =
  | "lead_email_captured"
  | "lead_demo_requested"
  | "lead_contact_submitted";

const TIMEOUT_MS = 2500;

function header(req: NextApiRequest, name: string): string | undefined {
  const value = req.headers[name];
  return (Array.isArray(value) ? value[0] : value) || undefined;
}

function clientIp(req: NextApiRequest): string | undefined {
  return (
    header(req, "x-forwarded-for")?.split(",")[0]?.trim() ||
    header(req, "x-real-ip")?.trim() ||
    undefined
  );
}

function shortString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim().slice(0, 200) : undefined;
}

/** page_group/product of the page the form was on, like browser events get. */
function refererContext(referer: string | undefined): Record<string, string> {
  if (!referer) return {};
  try {
    return { ...pageContext(new URL(referer).pathname) };
  } catch {
    return {};
  }
}

/** utm_* from the rd_utm cookie FleetMetaPixel sets (30d, last campaign touch). */
function campaignProps(req: NextApiRequest): Record<string, string> {
  const raw = req.cookies.rd_utm;
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: Record<string, string> = {};
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      const value = shortString(parsed[key]);
      if (value) out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

export async function captureServerEvent({
  req,
  event,
  email,
  properties = {},
  personProperties = {},
}: {
  req: NextApiRequest;
  event: ServerAnalyticsEvent;
  email: string;
  properties?: Record<string, unknown>;
  /** Extra `$set` person properties (never free text or phone numbers). */
  personProperties?: Record<string, unknown>;
}): Promise<void> {
  const distinctId = email.trim().toLowerCase();
  if (!distinctId) return;

  // The browser's ids, when its SDK was alive (see analyticsContext()).
  const context = (req.body as { analytics?: unknown } | undefined)?.analytics;
  const sessionId = shortString((context as { sessionId?: unknown } | undefined)?.sessionId);
  const clientDistinctId = shortString(
    (context as { distinctId?: unknown } | undefined)?.distinctId
  );

  const referer = header(req, "referer");

  try {
    await fetch(`${POSTHOG_INGEST_HOST}/i/v0/e/`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      body: JSON.stringify({
        api_key: POSTHOG_TOKEN,
        event,
        distinct_id: distinctId,
        timestamp: new Date().toISOString(),
        properties: {
          ...refererContext(referer),
          ...campaignProps(req),
          ...properties,
          ...(sessionId ? { $session_id: sessionId } : {}),
          client_distinct_id: clientDistinctId,
          client_tracked: Boolean(clientDistinctId),
          $current_url: referer,
          $ip: clientIp(req), // GeoIP for server-sent events
          $raw_user_agent: header(req, "user-agent"),
          $lib: "raisedash-server",
          $set: { email: distinctId, ...personProperties },
        },
      }),
    });
  } catch (error) {
    console.warn(`PostHog ${event} not sent:`, error instanceof Error ? error.message : error);
  }
}
