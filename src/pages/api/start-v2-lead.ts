import { NextApiRequest, NextApiResponse } from "next";
import { sendToTelegram, formatStartV2LeadMessage } from "@/lib/telegram";
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
 * backend and triggers a welcome email), this is purely a notification flow:
 * validate, then send the answers to Telegram so the team can reach out. No
 * account, no email. Routes to TELEGRAM_LEADS_CHAT_ID when set, else the default
 * chat (see sendToTelegram).
 */

const MAX_ATTRIBUTION_LEN = 500;

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

    const telegramResponse = await sendToTelegram(message, process.env.TELEGRAM_LEADS_CHAT_ID);

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
