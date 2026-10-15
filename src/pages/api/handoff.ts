import type { NextApiRequest, NextApiResponse } from "next";
import { BOT_UA, cleanSourceUrl, clientIp, createIpRateLimiter } from "@/lib/capi-request";
import { sendFleetCapiEvent } from "@/lib/meta-capi";

/**
 * Server twin of the fleet pixel's Telegram bot tap — the standard
 * "CompleteRegistration" with content_name telegram_bot_tap (fired by
 * src/lib/bot-tap.ts, once per browser session). The durable half of the pair:
 * the FB/IG in-app browser often drops the Pixel, and a tap usually leaves the
 * page for Telegram right away, but this keepalive same-origin request still
 * lands. The shared eventId lets Meta dedupe the two.
 *
 * Matching and abuse guards mirror /api/visit-quality: first-party _fbp/_fbc,
 * rd_fbclid and rd_vid cookies plus IP/UA; bot user agents, requests with no Meta
 * identifier and a per-IP cap are dropped silently (always 204). The path is
 * deliberately neutral so filter lists leave it alone.
 */

const EVENT_ID = /^[\w-]{8,200}$/;
const PLACEMENT = /^[a-z_]{1,32}$/;

// One tap event per session; a few per IP per hour covers shared networks.
const rateLimited = createIpRateLimiter(5, 60 * 60 * 1000);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  await sendBotTap(req);
  res.status(204).end();
}

/** Validate + guard, then send the CAPI twin. Never throws. */
async function sendBotTap(req: NextApiRequest): Promise<void> {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const eventId = typeof body.eventId === "string" ? body.eventId : "";
    if (!EVENT_ID.test(eventId)) return;
    const placement =
      typeof body.placement === "string" && PLACEMENT.test(body.placement)
        ? body.placement
        : undefined;

    const userAgent = req.headers["user-agent"];
    if (!userAgent || BOT_UA.test(userAgent)) return;

    const { _fbp: fbp, _fbc: fbc, rd_fbclid: fbclid, rd_vid: externalId } = req.cookies;
    if (!fbp && !fbc && !fbclid) return;

    const ip = clientIp(req);
    if (ip && rateLimited(ip)) return;

    // Awaited before responding: a serverless function may freeze after the
    // response is sent.
    const result = await sendFleetCapiEvent({
      eventName: "CompleteRegistration",
      contentName: "telegram_bot_tap",
      eventId,
      eventSourceUrl: cleanSourceUrl(req.headers.referer),
      clientIp: ip,
      clientUserAgent: userAgent,
      fbp,
      fbc,
      fbclid,
      externalId,
      customData: placement ? { placement } : undefined,
    });
    if (result.error) {
      console.warn("Bot-tap Meta CAPI CompleteRegistration not sent:", result.error);
    }
  } catch (error) {
    console.error("Error processing bot tap:", error);
  }
}
