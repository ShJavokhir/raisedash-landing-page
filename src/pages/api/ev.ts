import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Funnel telemetry sink for /start. The browser posts tiny events here via
 * navigator.sendBeacon (see lib/funnel-analytics.ts) and we forward them to
 * PostHog server-side — so no analytics SDK or third-party cookie has to survive
 * the FB/IG in-app browser. It still 204s when PostHog isn't configured, so the
 * client never needs to know whether telemetry is switched on.
 *
 * Env (set in Vercel + .env.local) — same names as PostHog's own Next.js guide:
 *   NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN  the publishable `phc_…` project token
 *   NEXT_PUBLIC_POSTHOG_HOST           ingestion host; defaults to https://us.i.posthog.com
 *
 * These are referenced only here (server-side), so despite the NEXT_PUBLIC_ prefix
 * the token is NOT inlined into the client bundle — yet the shared names mean one
 * env pair keeps working if PostHog is later added to the marketing pages too.
 */

const POSTHOG_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const POSTHOG_HOST = (process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com").replace(
  /\/+$/,
  ""
);

// Only events the funnel actually emits get forwarded — a small allowlist stops
// this open endpoint from becoming an arbitrary relay into our PostHog project.
const ALLOWED_EVENTS = new Set([
  "funnel_step_viewed",
  "funnel_submit_started",
  "funnel_lead_captured",
  "funnel_submit_error",
]);

function clientIp(req: NextApiRequest): string | undefined {
  const fwd = req.headers["x-forwarded-for"];
  const raw = Array.isArray(fwd) ? fwd[0] : fwd;
  return raw?.split(",")[0]?.trim() || undefined;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end();
    return;
  }

  // Forward before responding: on Vercel a serverless function can freeze the
  // moment the response is sent, so we can't fire-and-forget after res.end().
  // The client used sendBeacon and isn't awaiting us, so the extra round-trip
  // costs the user nothing.
  if (POSTHOG_TOKEN) {
    try {
      const body = (req.body ?? {}) as {
        sid?: unknown;
        event?: unknown;
        props?: unknown;
        ts?: unknown;
      };
      const sid = typeof body.sid === "string" ? body.sid : "";
      const event = typeof body.event === "string" ? body.event : "";

      if (sid && ALLOWED_EVENTS.has(event)) {
        const props =
          body.props && typeof body.props === "object"
            ? (body.props as Record<string, unknown>)
            : {};
        const timestamp = typeof body.ts === "number" ? new Date(body.ts).toISOString() : undefined;

        await fetch(`${POSTHOG_HOST}/capture/`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            api_key: POSTHOG_TOKEN,
            event,
            distinct_id: sid,
            timestamp,
            properties: {
              ...props,
              $ip: clientIp(req), // lets PostHog resolve GeoIP for server-sent events
              user_agent: req.headers["user-agent"],
              $lib: "raisedash-funnel-beacon",
              source: "start-funnel",
            },
          }),
        });
      }
    } catch {
      // Best-effort: a telemetry failure must never surface to the funnel.
    }
  }

  res.status(204).end();
}
