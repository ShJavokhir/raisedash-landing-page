import { NextApiRequest, NextApiResponse } from "next";
import { sendToTelegram, formatStartV2LeadMessage } from "@/lib/telegram";
import { sendCapiLead } from "@/lib/meta-capi";
import { validateEmail } from "@/lib/validation";
import { isValidIntlPhone } from "@/lib/phone";
import {
  FLEET_VALUES,
  PROBLEM_VALUES,
  ROLE_VALUES,
  isUsDot,
  type LeadAttribution,
} from "@/lib/start-v2";

/**
 * Lead capture for the /start-v2 funnel. Unlike /start (which posts to the
 * backend and triggers a welcome email), this is a notification flow: validate,
 * then send the answers to Telegram so the team can reach out. No account, no
 * email. Routes to TELEGRAM_LEADS_CHAT_ID when set, else the default chat (see
 * sendToTelegram).
 *
 * Also fires the server-side Meta Conversions API "CompleteRegistration"
 * (best-effort), deduplicated with the browser Pixel via the shared eventId — the
 * durable, higher-value conversion for completed submissions. (The ad set optimizes
 * for the earlier, higher-volume "Lead" fired at the name step via
 * /api/start-v2-interest.) Meta-ad traffic lands in the FB/IG in-app browser where
 * the Pixel is routinely suppressed, so the CAPI send is the source of truth.
 * No-ops unless META_PIXEL_ID + META_CAPI_ACCESS_TOKEN are set; never blocks or
 * fails the lead capture (see src/lib/meta-capi.ts).
 */

const MAX_ATTRIBUTION_LEN = 500;

/**
 * The public client IP for Meta CAPI matching/geolocation. On Vercel the real
 * client IP is the first hop of x-forwarded-for (x-real-ip as a fallback);
 * req.socket.remoteAddress would be Vercel's internal proxy.
 */
function clientIp(req: NextApiRequest): string | undefined {
  const xff = req.headers["x-forwarded-for"];
  const first = (Array.isArray(xff) ? xff[0] : xff)?.split(",")[0]?.trim();
  if (first) return first;
  const xrip = req.headers["x-real-ip"];
  return (Array.isArray(xrip) ? xrip[0] : xrip)?.trim() || undefined;
}

/** Keep only known attribution keys, as trimmed short strings — never trust client sizes. */
function sanitizeAttribution(raw: unknown): LeadAttribution | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const input = raw as Record<string, unknown>;
  const clean = (v: unknown): string | undefined =>
    typeof v === "string" && v.trim() ? v.trim().slice(0, MAX_ATTRIBUTION_LEN) : undefined;
  const out: LeadAttribution = {
    utmSource: clean(input.utmSource),
    utmMedium: clean(input.utmMedium),
    utmCampaign: clean(input.utmCampaign),
    utmContent: clean(input.utmContent),
    utmTerm: clean(input.utmTerm),
    fbclid: clean(input.fbclid),
    referrer: clean(input.referrer),
    landingUrl: clean(input.landingUrl),
  };
  // Drop entirely if nothing useful survived.
  return Object.values(out).some(Boolean) ? out : undefined;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = (req.body ?? {}) as Record<string, unknown>;

    // Honeypot: a filled hidden field means a bot. Acknowledge with success so it
    // doesn't retry, but notify no one.
    if (typeof body.companyWebsite === "string" && body.companyWebsite.trim() !== "") {
      return res.status(200).json({ success: true });
    }

    const fleetSize = String(body.fleetSize ?? "").trim();
    const role = String(body.role ?? "").trim();
    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const usDot = String(body.usDot ?? "").trim();
    const companyName = String(body.companyName ?? "").trim();
    const driverProblems = Array.isArray(body.driverProblems)
      ? body.driverProblems.map((p) => String(p))
      : [];

    // Validate against the same option sets the funnel renders (lib/start-v2.ts).
    const invalid: string[] = [];
    if (!FLEET_VALUES.has(fleetSize)) invalid.push("fleetSize");
    if (!ROLE_VALUES.has(role)) invalid.push("role");
    if (fullName.length < 2) invalid.push("fullName");
    if (!validateEmail(email)) invalid.push("email");
    if (!isValidIntlPhone(phone)) invalid.push("phone");
    if (driverProblems.length === 0 || !driverProblems.every((p) => PROBLEM_VALUES.has(p))) {
      invalid.push("driverProblems");
    }
    // USDOT is optional; only reject a non-empty, malformed value.
    if (usDot && !isUsDot(usDot)) invalid.push("usDot");

    if (invalid.length > 0) {
      return res.status(400).json({ error: "Invalid or missing fields", fields: invalid });
    }

    const message = formatStartV2LeadMessage({
      fleetSize,
      driverProblems,
      role,
      fullName,
      email,
      phone,
      usDot: usDot || undefined,
      companyName: companyName || undefined,
      attribution: sanitizeAttribution(body.attribution),
    });

    // Raw Meta match signals. sanitizeAttribution (above) intentionally drops
    // fbp/fbc before Telegram; CAPI needs them for match quality, so read them
    // straight from the body here.
    const rawAttr = (body.attribution ?? {}) as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);

    // Fire the server-side CAPI CompleteRegistration (best-effort) CONCURRENTLY with the Telegram
    // notification so neither adds the other's latency. sendCapiLead never throws
    // and no-ops unless Meta is configured. Awaited before responding because a
    // serverless function may freeze after the response is sent.
    const capiPromise = sendCapiLead({
      email,
      phone,
      name: fullName,
      usDot: usDot || undefined,
      eventId: str(body.eventId),
      eventSourceUrl: str(rawAttr.landingUrl),
      clientIp: clientIp(req),
      clientUserAgent: req.headers["user-agent"],
      fbp: str(rawAttr.fbp),
      fbc: str(rawAttr.fbc),
      fbclid: str(rawAttr.fbclid),
      contentName: "start_v2_complete",
      eventName: "CompleteRegistration",
    });

    const telegramResponse = await sendToTelegram(message, process.env.TELEGRAM_LEADS_CHAT_ID);
    const capiResult = await capiPromise;
    if (capiResult.error) {
      console.warn("Start-v2 Meta CAPI Lead not sent:", capiResult.error);
    }

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", await telegramResponse.text());
      return res.status(500).json({ error: "Failed to send notification" });
    }

    console.log("Start-v2 lead received:", {
      name: fullName,
      email,
      fleetSize,
      role,
      problems: driverProblems,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing start-v2 lead:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
