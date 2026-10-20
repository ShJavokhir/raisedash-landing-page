import type { NextApiRequest, NextApiResponse } from "next";
import { BOT_UA, cleanSourceUrl, clientIp, createIpRateLimiter } from "@/lib/capi-request";
import { sendFleetCapiEvent } from "@/lib/meta-capi";

/**
 * Server twin of the fleet pixel's Telegram tap — the standard
 * "CompleteRegistration" with content_name telegram_bot_tap (@raisedashbot) or
 * telegram_sales_tap (@raisedash, our team), fired by src/lib/telegram-tap.ts
 * once per browser session per kind. The durable half of the pair: the FB/IG
 * in-app browser often drops the Pixel, and a tap usually leaves the page for
 * Telegram right away, but this keepalive same-origin request still lands. The
 * shared eventId lets Meta dedupe the two.
 *
 * Matching and abuse guards mirror /api/visit-quality: first-party _fbp/_fbc,
 * rd_fbclid and rd_vid cookies plus IP/UA; bot user agents, requests with no Meta
 * identifier and a per-IP cap are dropped silently (always 204). The path is
 * deliberately neutral so filter lists leave it alone. The client only picks a
 * kind from the allowlist below; it never names the content_name itself.
 */

const EVENT_ID = /^[\w-]{8,200}$/;
const PLACEMENT = /^[a-z_]{1,32}$/;
const PRODUCT = /^[a-z0-9-]{1,64}$/;
/** Missing kind = "bot": the PTI page's taps from before kinds existed. */
const CONTENT_NAME_BY_KIND = new Map([
  ["bot", "telegram_bot_tap"],
  ["sales", "telegram_sales_tap"],
]);

// One tap event per session and kind; a few per IP per hour covers shared networks.
const rateLimited = createIpRateLimiter(5, 60 * 60 * 1000);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  await sendTelegramTap(req);
  res.status(204).end();
}

/** Validate + guard, then send the CAPI twin. Never throws. */
async function sendTelegramTap(req: NextApiRequest): Promise<void> {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const eventId = typeof body.eventId === "string" ? body.eventId : "";
    if (!EVENT_ID.test(eventId)) return;
    const placement =
      typeof body.placement === "string" && PLACEMENT.test(body.placement)
        ? body.placement
        : undefined;
    const product =
      typeof body.product === "string" && PRODUCT.test(body.product) ? body.product : undefined;
    const kind = typeof body.kind === "string" ? body.kind : "bot";
    const contentName = CONTENT_NAME_BY_KIND.get(kind);
    if (!contentName) return;

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
      contentName,
      eventId,
      eventSourceUrl: cleanSourceUrl(req.headers.referer),
      clientIp: ip,
      clientUserAgent: userAgent,
      fbp,
      fbc,
      fbclid,
      externalId,
      customData: {
        ...(placement ? { placement } : {}),
        ...(product ? { product } : {}),
      },
    });
    if (result.error) {
      console.warn("Telegram-tap Meta CAPI CompleteRegistration not sent:", result.error);
    }
  } catch (error) {
    console.error("Error processing Telegram tap:", error);
  }
}
