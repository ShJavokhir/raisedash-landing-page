import { NextApiRequest, NextApiResponse } from "next";
import {
  sendToTelegram,
  formatEmailCaptureMessage,
  validateEmail,
  EmailCaptureData,
} from "@/lib/telegram";
import { sendFleetCapiLead } from "@/lib/meta-capi";
import type { LeadAttribution } from "@/lib/start-v2";

/**
 * Email capture — the conversion the FLEET Meta campaigns optimize for.
 *
 * Two jobs, run concurrently so neither adds the other's latency:
 *  - Telegram notification (the original behavior), now with a campaign-source
 *    footer read from the rd_utm cookie.
 *  - The server-side Meta CAPI "Lead" on the fleet dataset — the durable half of
 *    the Pixel + CAPI pair (the browser pixel fires the same eventId; Meta ads
 *    open in the FB/IG in-app browser where the Pixel is routinely suppressed).
 *    Match signals come from here, not the client: the raw email is hashed in
 *    sendFleetCapiLead, IP/UA from the request, _fbp/_fbc from first-party
 *    cookies, rd_fbclid as the fallback to synthesize _fbc. Best-effort — a CAPI
 *    failure never fails the capture. No-ops until the META_FLEET_* env is set.
 */

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

/** Campaign attribution from the rd_utm cookie (set by FleetMetaPixel). */
function utmFromCookie(req: NextApiRequest): LeadAttribution | undefined {
  const raw = req.cookies.rd_utm;
  if (!raw) return undefined;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const clean = (v: unknown): string | undefined =>
      typeof v === "string" && v.trim() ? v.trim().slice(0, 200) : undefined;
    const out: LeadAttribution = {
      utmSource: clean(parsed.utm_source),
      utmMedium: clean(parsed.utm_medium),
      utmCampaign: clean(parsed.utm_campaign),
      utmContent: clean(parsed.utm_content),
      utmTerm: clean(parsed.utm_term),
    };
    return Object.values(out).some(Boolean) ? out : undefined;
  } catch {
    // Malformed cookie — attribution is a bonus, never a blocker.
    return undefined;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, source, eventId } = req.body as EmailCaptureData & { eventId?: unknown };

    // Validate email
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // The durable CAPI Lead, concurrent with Telegram. Awaited before responding
    // because a serverless function may freeze after the response is sent.
    const capiPromise = sendFleetCapiLead({
      email: normalizedEmail,
      eventId:
        typeof eventId === "string" && eventId.trim() ? eventId.trim().slice(0, 200) : undefined,
      eventSourceUrl: req.headers.referer,
      clientIp: clientIp(req),
      clientUserAgent: req.headers["user-agent"],
      fbp: req.cookies._fbp,
      fbc: req.cookies._fbc,
      fbclid: req.cookies.rd_fbclid,
      contentName: "fleet_email_capture",
    });

    // Send to Telegram
    const telegramMessage = formatEmailCaptureMessage({
      email: normalizedEmail,
      source: typeof source === "string" && source ? source : "Homepage",
      attribution: utmFromCookie(req),
    });

    const telegramResponse = await sendToTelegram(telegramMessage);

    const capiResult = await capiPromise;
    if (capiResult.error) {
      console.warn("Email-capture Meta CAPI Lead not sent:", capiResult.error);
    }

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", await telegramResponse.text());
      // Don't fail the request if Telegram fails - email capture is logged
      console.log("Email captured (Telegram failed):", email);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing email capture:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
