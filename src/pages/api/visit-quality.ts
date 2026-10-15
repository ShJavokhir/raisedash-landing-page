import type { NextApiRequest, NextApiResponse } from "next";
import { BOT_UA, cleanSourceUrl, clientIp, createIpRateLimiter } from "@/lib/capi-request";
import { sendFleetCapiEvent } from "@/lib/meta-capi";

/**
 * Server twin of the fleet pixel's engaged-visit event — the standard "Contact"
 * with content_name engaged_visit (fired by src/lib/engaged-visit.ts). The durable half of the pair: ad blockers and the
 * FB/IG in-app browser drop the browser Pixel, but this same-origin request still
 * lands, and the shared eventId lets Meta dedupe the two.
 *
 * There's no email at this stage, so matching rides on the first-party _fbp/_fbc
 * cookies (FleetMetaPixel synthesizes both, and rd_fbclid rebuilds _fbc), the
 * rd_vid visitor id (external_id, same value the Pixel sends), plus request IP/UA. Paid clicks always carry fbclid, so attribution survives a
 * blocked Pixel. The path is deliberately neutral — filter lists match words like
 * "pixel", "capi", "track", "collect".
 *
 * Abuse guards, cheap and silent (always 204, so a prober learns nothing): bot
 * user agents, no Meta identifiers, a per-IP cap per warm instance, and a strictly
 * shaped body. Best-effort: no-ops until the META_FLEET_* env is set.
 */

const EVENT_ID = /^[\w-]{8,200}$/;
const SIGNAL = /^[a-z_]{1,32}$/;
const MAX_SIGNALS = 12;

// One engaged visit per session is the norm; a handful per IP per hour covers
// shared office/carrier networks.
const rateLimited = createIpRateLimiter(5, 60 * 60 * 1000);

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

    const { _fbp: fbp, _fbc: fbc, rd_fbclid: fbclid, rd_vid: externalId } = req.cookies;
    if (!fbp && !fbc && !fbclid) return;

    const ip = clientIp(req);
    if (ip && rateLimited(ip)) return;

    // Awaited before responding: a serverless function may freeze after the
    // response is sent.
    const result = await sendFleetCapiEvent({
      eventName: "Contact",
      contentName: "engaged_visit",
      eventId,
      eventSourceUrl: cleanSourceUrl(req.headers.referer),
      clientIp: ip,
      clientUserAgent: userAgent,
      fbp,
      fbc,
      fbclid,
      externalId,
      customData: { engaged_seconds: engagedSeconds, signals: signals.join(",") },
    });
    if (result.error) {
      console.warn("Engaged-visit Meta CAPI Contact not sent:", result.error);
    }
  } catch (error) {
    console.error("Error processing engaged visit:", error);
  }
}
