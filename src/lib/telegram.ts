/**
 * Centralized Telegram service for sending notifications
 * This eliminates code duplication across different form endpoints
 */

import { validateEmail, validateRequiredFields } from "./validation";
import { displayIntlPhone } from "./phone";
import {
  fleetLabel,
  roleLabel,
  problemLabels,
  type LeadAttribution,
  type StartV2Lead,
} from "./start-v2";

// Re-export validation functions for backward compatibility
export { validateEmail, validateRequiredFields };

export interface TelegramMessageData {
  type: "contact" | "demo" | "job-application";
  timestamp: string;
  [key: string]: string | number | boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  inquiryType: string;
}

export interface DemoRequestData {
  email: string;
  companyName: string;
  companySize: string;
  fullName: string;
  role: string;
  phone?: string;
}

export interface AccountDeletionRequestData {
  product: "raisedash" | "raisedash_vertex";
  fullName: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface JobApplicationData {
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  experience: string;
  coverLetter: string;
}

export interface UnsubscribeEventData {
  email: string;
  ip?: string;
  userAgent?: string;
}

export interface EmailCaptureData {
  email: string;
  source: string;
  /** Which campaign produced this email (from the rd_utm cookie) — optional. */
  attribution?: LeadAttribution;
}

/**
 * Send a message to Telegram.
 *
 * `overrideChatId` lets a caller route to a different chat than the default
 * (e.g. the /start-v2 lead funnel can send to TELEGRAM_LEADS_CHAT_ID); when it's
 * omitted or unset we fall back to TELEGRAM_CHAT_ID, so existing callers are
 * unaffected.
 */
export async function sendToTelegram(message: string, overrideChatId?: string): Promise<Response> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = overrideChatId || process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error(
      "Telegram configuration missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables."
    );
  }

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown",
    disable_web_page_preview: true,
  };

  return fetch(telegramApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

/**
 * Format contact form data for Telegram message
 */
export function formatContactMessage(data: ContactFormData): string {
  const timestamp = new Date().toLocaleString();

  return `🔔 *New Contact Form Submission*

📅 *Date:* ${timestamp}
👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
🏢 *Company:* ${data.company || "Not provided"}
📋 *Inquiry Type:* ${data.inquiryType}
📝 *Subject:* ${data.subject}

💬 *Message:*
${data.message}

---
*Form Type:* Contact Form`;
}

/**
 * Format demo request data for Telegram message
 */
export function formatDemoMessage(data: DemoRequestData): string {
  const timestamp = new Date().toLocaleString();

  return `🔔 *New Demo Request*

📅 *Date:* ${timestamp}
👤 *Name:* ${data.fullName}
📧 *Email:* ${data.email}
🏢 *Company:* ${data.companyName}
🚚 *Fleet Size:* ${data.companySize}
💼 *Role:* ${data.role}
📞 *Phone:* ${data.phone || "Not provided"}

---
*Form Type:* Demo Request`;
}

/**
 * Format account deletion request data for Telegram message
 */
export function formatAccountDeletionMessage(data: AccountDeletionRequestData): string {
  const timestamp = new Date().toLocaleString();
  const productLabel =
    data.product === "raisedash" ? "Raisedash (PTI inspections)" : "Raisedash Vertex";

  const contactLine =
    data.product === "raisedash"
      ? `📧 *Account Email:* ${data.email || "Not provided"}`
      : `📞 *Account Phone:* ${data.phone || "Not provided"}`;

  const optionalEmail =
    data.email && data.product === "raisedash_vertex"
      ? `\n📧 *Email (optional):* ${data.email}`
      : "";
  const optionalPhone =
    data.phone && data.product === "raisedash" ? `\n📞 *Phone (optional):* ${data.phone}` : "";

  return `🗑️ *Account Deletion Request*

📅 *Date:* ${timestamp}
👤 *Name:* ${data.fullName}
🛠️ *Product:* ${productLabel}
${contactLine}${optionalEmail}${optionalPhone}

📝 *Notes:*
${data.notes || "Not provided"}

---
*Form Type:* Account Deletion Request`;
}

/**
 * Format job application data for Telegram message
 */
export function formatJobApplicationMessage(data: JobApplicationData): string {
  const timestamp = new Date().toLocaleString();

  return `🔔 *New Job Application*

📅 *Date:* ${timestamp}
💼 *Position:* ${data.jobTitle}
👤 *Name:* ${data.firstName} ${data.lastName}
📧 *Email:* ${data.email}
📞 *Phone:* ${data.phone}
🔗 *LinkedIn:* ${data.linkedinUrl || "Not provided"}
💼 *Experience:* ${data.experience}

📝 *Cover Letter:*
${data.coverLetter}

---
*Form Type:* Job Application`;
}

/**
 * Format unsubscribe event for Telegram message
 */
export function formatUnsubscribeMessage(data: UnsubscribeEventData): string {
  const timestamp = new Date().toLocaleString();
  return `🔕 *Unsubscribe Request*

📅 *Date:* ${timestamp}
📧 *Email:* ${data.email}
🌐 *IP:* ${data.ip || "Unknown"}
🖥️ *User Agent:* ${data.userAgent || "Unknown"}

---
*Event:* Unsubscribe`;
}

/**
 * Format email capture for Telegram message
 */
export function formatEmailCaptureMessage(data: EmailCaptureData): string {
  const timestamp = new Date().toLocaleString();
  return `📧 *New Email Capture*

📅 *Date:* ${timestamp}
📧 *Email:* ${data.email}
📍 *Source:* ${data.source}${formatLeadAttribution(data.attribution)}

---
*Event:* Email Capture`;
}

/**
 * Escape the handful of characters Telegram's legacy Markdown treats as
 * formatting, so user-supplied values (emails containing "_", names with "*",
 * etc.) can't break the message's entity parsing — an unescaped pair would 400
 * the entire send. Applied only to untrusted values; our own static labels are safe.
 */
function escapeMd(value: string): string {
  return String(value ?? "").replace(/([_*`[\]])/g, "\\$1");
}

/** Compact "which ad sent this lead" footer; empty when no attribution is present. */
function formatLeadAttribution(attribution?: LeadAttribution): string {
  if (!attribution) return "";
  const lines: string[] = [];
  const add = (label: string, value?: string) => {
    if (value) lines.push(`${label}: ${escapeMd(value)}`);
  };
  add("Campaign", attribution.utmCampaign);
  add("Source", attribution.utmSource);
  add("Medium", attribution.utmMedium);
  add("Content", attribution.utmContent);
  add("Term", attribution.utmTerm);
  // Only fall back to the referrer when no UTM tags are present.
  if (lines.length === 0) add("Referrer", attribution.referrer);
  if (lines.length === 0) return "";
  return `\n\n📈 *Source:*\n${lines.join("\n")}`;
}

/**
 * Format a /start-v2 lead-funnel submission for Telegram. Resolves the stored
 * option values to their human labels (kept in lib/start-v2.ts alongside the
 * funnel UI) and shows USDOT when given, otherwise the company name from the
 * "I don't know my USDOT" branch.
 */
export function formatStartV2LeadMessage(data: StartV2Lead): string {
  const timestamp = new Date().toLocaleString();

  const problems = data.driverProblems?.length
    ? problemLabels(data.driverProblems)
        .map((label) => `• ${label}`)
        .join("\n")
    : "Not provided";

  const carrierLine = data.usDot
    ? `🆔 *USDOT:* ${escapeMd(data.usDot)}`
    : `🏢 *Company:* ${escapeMd(data.companyName || "Not provided")}`;

  const attribution = formatLeadAttribution(data.attribution);

  return `🚛 *New Lead — Driver Training (/start-v2)*

📅 *Date:* ${timestamp}
🚚 *Fleet size:* ${fleetLabel(data.fleetSize)}
💼 *Role:* ${roleLabel(data.role)}
👤 *Name:* ${escapeMd(data.fullName)}
📧 *Email:* ${escapeMd(data.email)}
📞 *Phone:* ${escapeMd(displayIntlPhone(data.phone))}
${carrierLine}

🧩 *Drivers need help with:*
${problems}${attribution}

---
*Form Type:* /start-v2 Lead`;
}
