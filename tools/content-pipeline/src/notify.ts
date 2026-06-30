/* Telegram run notifications. Reuses your existing bot. No-op if unconfigured. */

const token = process.env.TELEGRAM_BOT_TOKEN || "";
// Prefer a dedicated content channel if set; fall back to the main chat id.
const chatId = process.env.TELEGRAM_CONTENT_CHAT_ID || process.env.TELEGRAM_CHAT_ID || "";

export function notifyConfigured(): boolean {
  return Boolean(token && chatId);
}

export async function sendTelegram(text: string): Promise<void> {
  if (!notifyConfigured()) return;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      process.stderr.write(`    !!  telegram notify failed: HTTP ${res.status}\n`);
    }
  } catch (err) {
    // A failed notification must never fail the run.
    process.stderr.write(`    !!  telegram notify error: ${(err as Error).message}\n`);
  }
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
