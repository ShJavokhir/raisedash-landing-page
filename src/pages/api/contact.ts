import { NextApiRequest, NextApiResponse } from "next";
import {
  sendToTelegram,
  formatContactMessage,
  validateEmail,
  validateRequiredFields,
  ContactFormData,
} from "@/lib/telegram";
import {
  verifyTurnstileToken,
  getClientIp,
  getTurnstileErrorMessage,
  TurnstileVerificationError,
  TurnstileConfigError,
  validateTurnstileConfig,
} from "@/lib/turnstile";

interface RequestBody extends ContactFormData {
  turnstileToken?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body: RequestBody = req.body;
    const { turnstileToken, ...data } = body;

    // Verify Turnstile CAPTCHA (if configured)
    const turnstileConfig = validateTurnstileConfig();
    if (turnstileConfig.valid) {
      if (!turnstileToken) {
        return res.status(400).json({
          error: "Please complete the verification challenge",
          code: "TURNSTILE_REQUIRED",
        });
      }

      try {
        const clientIp = getClientIp(req.headers as Record<string, string>);
        await verifyTurnstileToken({
          token: turnstileToken,
          remoteIp: clientIp,
        });
      } catch (error) {
        if (error instanceof TurnstileVerificationError) {
          console.warn("[contact] Turnstile verification failed:", {
            errorCodes: error.errorCodes,
          });
          return res.status(400).json({
            error: getTurnstileErrorMessage(error.errorCodes),
            code: "TURNSTILE_FAILED",
          });
        }
        if (error instanceof TurnstileConfigError) {
          console.error("[contact] Turnstile config error:", error.message);
        } else {
          throw error;
        }
      }
    }

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message"];
    const missingFields = validateRequiredFields(
      data as unknown as Record<string, unknown>,
      requiredFields
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: "Missing required fields",
        missingFields,
      });
    }

    // Validate email format
    if (!validateEmail(data.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Send to Telegram
    const telegramMessage = formatContactMessage(data);
    const telegramResponse = await sendToTelegram(telegramMessage);

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", await telegramResponse.text());
      return res.status(500).json({ error: "Failed to send notification" });
    }

    // Log the contact form submission (optional - for debugging)
    console.log("Contact form submission received:", {
      name: data.name,
      email: data.email,
      company: data.company,
      inquiryType: data.inquiryType,
      subject: data.subject,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error processing contact form:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
