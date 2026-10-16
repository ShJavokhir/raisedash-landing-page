/**
 * PostHog project wiring, shared by the browser SDK (src/instrumentation-client.ts),
 * the client wrapper (src/lib/site-analytics.ts) and the server-side capture
 * (src/lib/posthog-server.ts, /api/ev).
 *
 * The token is a PUBLISHABLE project key (PostHog's own snippet inlines it), so it
 * lives in code rather than env on purpose: an env var left behind in Vercel kept
 * prod reporting into an old project once already. Switching projects is a
 * one-line change here, reviewed like any other.
 */

export const POSTHOG_TOKEN = "phc_mdJzStXPcmGviSvEywU4nJJoefZjgEv2QyRP77nqPu4m";

/** Same-origin reverse proxy for the browser SDK (next.config.ts rewrites). */
export const POSTHOG_PROXY_PATH = "/rdx";

/** Direct ingestion host, used server-side only (servers aren't ad-blocked). */
export const POSTHOG_INGEST_HOST = "https://us.i.posthog.com";

/** The PostHog app (toolbar, replay/person links). */
export const POSTHOG_UI_HOST = "https://us.posthog.com";

/**
 * Local development (localhost, loopback, *.localhost) must never reach PostHog:
 * no browser SDK, no session replay, no server-side events. Accepts a bare
 * hostname or a Host header value (optional port).
 */
export function isLocalHost(host: string | undefined | null): boolean {
  if (!host) return false;
  const name = host
    .trim()
    .toLowerCase()
    .replace(/^\[([^\]]+)\](:\d+)?$/, "$1")
    .replace(/:\d+$/, "");
  return (
    name === "localhost" ||
    name.endsWith(".localhost") ||
    name === "127.0.0.1" ||
    name === "0.0.0.0" ||
    name === "::1"
  );
}
