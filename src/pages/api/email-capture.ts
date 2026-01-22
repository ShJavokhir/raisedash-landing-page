import { NextApiRequest, NextApiResponse } from "next";
import {
  sendToTelegram,
  formatEmailCaptureMessage,
  validateEmail,
  EmailCaptureData,
} from "@/lib/telegram";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, source } = req.body as EmailCaptureData;

    // Validate email
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Send to Telegram
    const telegramMessage = formatEmailCaptureMessage({
      email: email.trim().toLowerCase(),
      source: source || "Homepage",
    });

    const telegramResponse = await sendToTelegram(telegramMessage);

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
