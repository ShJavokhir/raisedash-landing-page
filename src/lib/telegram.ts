/**
 * Centralized Telegram service for sending notifications
 * This eliminates code duplication across different form endpoints
 */

import { validateEmail, validateRequiredFields } from "./validation";

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
}

/**
 * Send a message to Telegram
 */
export async function sendToTelegram(message: string): Promise<Response> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

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
📍 *Source:* ${data.source}

---
*Event:* Email Capture`;
}
