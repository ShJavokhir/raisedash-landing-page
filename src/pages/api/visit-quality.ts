import type { NextApiRequest, NextApiResponse } from "next";
import { sendFleetCapiEvent } from "@/lib/meta-capi";

/**
 * Server twin of the fleet pixel's custom "EngagedVisit" event (fired by
 * src/lib/engaged-visit.ts). The durable half of the pair: ad blockers and the
 * FB/IG in-app browser drop the browser Pixel, but this same-origin request still
 * lands, and the shared eventId lets Meta dedupe the two.
 *
 * There's no email at this stage, so matching rides on the first-party _fbp/_fbc
 * cookies (FleetMetaPixel synthesizes both, and rd_fbclid rebuilds _fbc), plus
 * request IP/UA. Paid clicks always carry fbclid, so attribution survives a
 * blocked Pixel. The path is deliberately neutral — filter lists match words like
 * "pixel", "capi", "track", "collect".
 *
 * Abuse guards, cheap and silent (always 204, so a prober learns nothing): bot
 * user agents, no Meta identifiers, a per-IP cap per warm instance, and a strictly
 * shaped body. Best-effort: no-ops until the META_FLEET_* env is set.
 */

const BOT_UA =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|python|curl|wget/i;
const EVENT_ID = /^[\w-]{8,200}$/;
const SIGNAL = /^[a-z_]{1,32}$/;
const MAX_SIGNALS = 12;

// One engaged visit per session is the norm; a handful per IP per hour covers
// shared office/carrier networks. In-memory, so per warm instance only.
const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 5;
const hitsByIp = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hitsByIp.set(ip, recent);
    return true;
  }
  recent.push(now);
  hitsByIp.set(ip, recent);
  if (hitsByIp.size > 5000) hitsByIp.clear(); // bound memory on a long-lived instance
  return false;
}

/**
 * The public client IP for Meta CAPI matching/geolocation. On Vercel the real
 * client IP is the first hop of x-forwarded-for (x-real-ip as a fallback).
 */
function clientIp(req: NextApiRequest): string | undefined {
  const xff = req.headers["x-forwarded-for"];
  const first = (Array.isArray(xff) ? xff[0] : xff)?.split(",")[0]?.trim();
  if (first) return first;
  const xrip = req.headers["x-real-ip"];
  return (Array.isArray(xrip) ? xrip[0] : xrip)?.trim() || undefined;
}

/** The page URL without any PII params (/demo links can carry ?email=). */
function cleanSourceUrl(referer: string | undefined): string | undefined {
  if (!referer) return undefined;
  try {
    const url = new URL(referer);
    for (const key of ["email", "phone", "name"]) url.searchParams.delete(key);
    return url.toString();
  } catch {
    return undefined;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  await sendEngagedVisit(req);
  res.status(204).end();
}

/** Validate + guard, then send the CAPI twin. Never throws. */
async function sendEngagedVisit(req: NextApiRequest): Promise<void> {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const eventId = typeof body.eventId === "string" ? body.eventId : "";
    const engagedSeconds =
      typeof body.engagedSeconds === "number" && Number.isFinite(body.engagedSeconds)
        ? Math.min(Math.max(Math.round(body.engagedSeconds), 0), 86_400)
        : 0;
    const signals = Array.isArray(body.signals)
      ? body.signals
          .filter((s): s is string => typeof s === "string" && SIGNAL.test(s))
          .slice(0, MAX_SIGNALS)
      : [];
    if (!EVENT_ID.test(eventId) || signals.length === 0) return;

    const userAgent = req.headers["user-agent"];
    if (!userAgent || BOT_UA.test(userAgent)) return;

    const { _fbp: fbp, _fbc: fbc, rd_fbclid: fbclid } = req.cookies;
    if (!fbp && !fbc && !fbclid) return;

    const ip = clientIp(req);
    if (ip && rateLimited(ip)) return;

    // Awaited before responding: a serverless function may freeze after the
    // response is sent.
    const result = await sendFleetCapiEvent({
      eventName: "EngagedVisit",
      contentName: "engaged_visit",
      eventId,
      eventSourceUrl: cleanSourceUrl(req.headers.referer),
      clientIp: ip,
      clientUserAgent: userAgent,
      fbp,
      fbc,
      fbclid,
      customData: { engaged_seconds: engagedSeconds, signals: signals.join(",") },
    });
    if (result.error) {
      console.warn("EngagedVisit Meta CAPI not sent:", result.error);
    }
  } catch (error) {
    console.error("Error processing engaged visit:", error);
  }
}
