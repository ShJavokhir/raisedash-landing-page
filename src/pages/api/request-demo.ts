import { NextApiRequest, NextApiResponse } from "next";
import {
  sendToTelegram,
  formatDemoMessage,
  validateEmail,
  validateRequiredFields,
  DemoRequestData,
} from "@/lib/telegram";
import { sendInvitation, validateWorkOSConfig } from "@/lib/workos";
import {
  verifyTurnstileToken,
  getClientIp,
  getTurnstileErrorMessage,
  TurnstileVerificationError,
  TurnstileConfigError,
  validateTurnstileConfig,
} from "@/lib/turnstile";

interface RequestBody extends DemoRequestData {
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
          console.warn("[request-demo] Turnstile verification failed:", {
            errorCodes: error.errorCodes,
          });
          return res.status(400).json({
            error: getTurnstileErrorMessage(error.errorCodes),
            code: "TURNSTILE_FAILED",
          });
        }
        if (error instanceof TurnstileConfigError) {
          console.error("[request-demo] Turnstile config error:", error.message);
          // Don't block request on config errors - log and continue
        } else {
          throw error;
        }
      }
    }

    // Validate required fields
    const requiredFields = ["email", "companyName", "companySize", "fullName", "role"];
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

    // Validate fleet size option - must match frontend fleetSizeOptions values
    // Supports both old format (EnterpriseDemoForm) and new format (get-started page)
    const allowedFleetSizes = [
      // Old format (EnterpriseDemoForm)
      "1-25",
      "26-100",
      "101-500",
      "501-1000",
      "1000+",
      // New format (get-started qualification page)
      "1-10",
      "11-50",
      "51-100",
      "101-250",
      "251+",
    ];
    if (!allowedFleetSizes.includes(data.companySize)) {
      return res.status(400).json({
        error: "Invalid fleet size selection",
        allowedValues: allowedFleetSizes,
      });
    }

    // Send to Telegram
    const telegramMessage = formatDemoMessage(data);
    const telegramResponse = await sendToTelegram(telegramMessage);

    if (!telegramResponse.ok) {
      console.error("Telegram API error:", await telegramResponse.text());
      return res.status(500).json({ error: "Failed to send notification" });
    }

    // Log the request (optional - for debugging)
    console.log("Demo request received:", {
      name: data.fullName,
      email: data.email,
      companyName: data.companyName,
      companySize: data.companySize,
      role: data.role,
      phone: data.phone,
      timestamp: new Date().toISOString(),
    });

    // Send WorkOS invitation email
    // If WorkOS is not configured, skip silently
    let inviteSent = false;
    const workosConfig = validateWorkOSConfig();

    if (workosConfig.valid) {
      try {
        await sendInvitation({ email: data.email.trim().toLowerCase() });
        inviteSent = true;
        console.log("[request-demo] WorkOS invitation sent:", {
          email: data.email.replace(/(.{2}).*@/, "$1***@"),
        });
      } catch (error) {
        // Log but don't fail the request - Telegram notification is primary
        console.error("[request-demo] Failed to send WorkOS invitation:", error);
      }
    } else {
      console.log("[request-demo] WorkOS not configured, skipping invitation:", {
        missing: workosConfig.missing,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Demo request submitted successfully",
      inviteSent,
    });
  } catch (error) {
    console.error("Error processing demo request:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
