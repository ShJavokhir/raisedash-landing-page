import type { NextApiRequest, NextApiResponse } from "next";
import { sendToTelegram } from "@/lib/telegram";
import { isValidEmail } from "@/lib/validation";
import { sanitizeString } from "@/lib/sanitize";
import {
  FLEET_OPTIONS,
  ROLE_OPTIONS,
  HEADACHE_OPTIONS,
  FLEET_VALUES,
  ROLE_VALUES,
  HEADACHE_VALUES,
  labelFor,
} from "@/components/demo-funnel/options";

/**
 * Lead capture for the /demo "book a demo" funnel (the site's primary CTA).
 *
 * A pure notification flow: validate + sanitize the answers, then send them to
 * Telegram so the team can reach out. No account, no welcome email, no Meta Pixel,
 * no backend — the deliberate opposite of the /start ad funnels. Routes to
 * TELEGRAM_LEADS_CHAT_ID when set, else the default TELEGRAM_CHAT_ID (see
 * sendToTelegram), reusing the exact env vars/lib the other lead routes use.
 *
 * Kept cheap and rate-limit-friendly: a filled honeypot short-circuits before any
 * work, every field is length-capped so payloads stay small, and the handler makes
 * exactly one outbound Telegram call.
 */

const MAX_LEN = 200;

/** Trim and cap an untrusted string value; non-strings become "". */
function clip(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, MAX_LEN) : "";
}

/**
 * Escape the characters Telegram's legacy Markdown treats as formatting so a
 * user-supplied value (an email with "_", a company with "*") can't break the
 * message's entity parsing and 400 the whole send. Applied only to untrusted
 * values; our own static labels are safe.
 */
function escapeMd(value: string): string {
  return String(value ?? "").replace(/([_*`[\]])/g, "\\$1");
}

interface DemoLead {
  fleetSize: string;
  role: string;
  headaches: string[];
  fullName: string;
  company: string;
  email: string;
  phone?: string;
}

function formatDemoLeadMessage(data: DemoLead): string {
  const timestamp = new Date().toLocaleString();
  const headaches = data.headaches
    .map((h) => `• ${escapeMd(labelFor(HEADACHE_OPTIONS, h))}`)
    .join("\n");

  return `🚛 *Demo request (readiness)*

📅 *Date:* ${timestamp}
🚚 *Fleet size:* ${escapeMd(labelFor(FLEET_OPTIONS, data.fleetSize))}
💼 *Role:* ${escapeMd(labelFor(ROLE_OPTIONS, data.role))}
👤 *Name:* ${escapeMd(data.fullName)}
🏢 *Company:* ${escapeMd(data.company)}
📧 *Email:* ${escapeMd(data.email)}
📞 *Phone:* ${data.phone ? escapeMd(data.phone) : "Not provided"}

🧩 *Biggest headache:*
${headaches}

---
*Form Type:* /demo Lead`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = (req.body ?? {}) as Record<string, unknown>;

    // Honeypot: a filled hidden field means a bot. Acknowledge with success so it
    // doesn't retry, but notify no one and do no work.
    if (typeof body.companyWebsite === "string" && body.companyWebsite.trim() !== "") {
      return res.status(200).json({ success: true });
    }

    const fleetSize = clip(body.fleetSize);
    const role = clip(body.role);
    const fullName = sanitizeString(clip(body.fullName));
    const company = sanitizeString(clip(body.company));
    const email = clip(body.email).toLowerCase();
    const phone = sanitizeString(clip(body.phone));
    const headaches = Array.isArray(body.headaches) ? body.headaches.map((h) => String(h)) : [];

    // Validate against the same option sets the funnel renders (options.ts).
    const invalid: string[] = [];
    if (!FLEET_VALUES.has(fleetSize)) invalid.push("fleetSize");
    if (!ROLE_VALUES.has(role)) invalid.push("role");
    if (headaches.length === 0 || !headaches.every((h) => HEADACHE_VALUES.has(h))) {
      invalid.push("headaches");
    }
    if (fullName.length < 2) invalid.push("fullName");
    if (company.length < 2) invalid.push("company");
    if (!isValidEmail(email)) invalid.push("email");
    // Phone is optional; reject only a present-but-implausible value (E.164 bounds).
    const phoneDigits = phone.replace(/\D/g, "");
    if (phone && (phoneDigits.length < 7 || phoneDigits.length > 15)) invalid.push("phone");

    if (invalid.length > 0) {
      return res.status(400).json({ error: "Invalid or missing fields", fields: invalid });
    }

    const message = formatDemoLeadMessage({
      fleetSize,
      role,
      headaches,
      fullName,
      company,
      email,
      phone: phone || undefined,
    });

    const telegramResponse = await sendToTelegram(message, process.env.TELEGRAM_LEADS_CHAT_ID);

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", await telegramResponse.text());
      return res.status(500).json({ error: "Failed to send notification" });
    }

    console.log("Demo lead received:", {
      name: fullName,
      email,
      company,
      fleetSize,
      role,
      headaches,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing demo lead:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
