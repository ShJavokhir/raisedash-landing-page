/**
 * Centralized Telegram service for sending notifications
 * This eliminates code duplication across different form endpoints
 */

export interface TelegramMessageData {
  type: 'contact' | 'demo' | 'job-application';
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
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
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

/**
 * Send a message to Telegram
 */
export async function sendToTelegram(message: string): Promise<Response> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error('Telegram configuration missing. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.');
  }

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const payload = {
    chat_id: chatId,
    text: message,
    parse_mode: 'Markdown',
    disable_web_page_preview: true
  };

  return fetch(telegramApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
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
🏢 *Company:* ${data.company || 'Not provided'}
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
👤 *Name:* ${data.firstName} ${data.lastName}
📧 *Email:* ${data.email}
📞 *Phone:* ${data.phone}
🏢 *Company:* ${data.company || 'Not provided'}

---
*Form Type:* Demo Request`;
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
🔗 *LinkedIn:* ${data.linkedinUrl || 'Not provided'}
💼 *Experience:* ${data.experience}

📝 *Cover Letter:*
${data.coverLetter}

---
*Form Type:* Job Application`;
}

/**
 * Generic form validation utility
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generic required fields validation
 */
export function validateRequiredFields(data: Record<string, any>, requiredFields: string[]): string[] {
  return requiredFields.filter(field => !data[field] || data[field]?.toString().trim() === '');
}
