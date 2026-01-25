/**
 * API endpoint for sending WorkOS user invitations
 * POST /api/invite
 *
 * Sends an invitation email to the provided address,
 * allowing users to sign up for the application.
 */

import type { NextApiRequest, NextApiResponse } from "next";
import { validateEmail } from "@/lib/validation";
import { sendInvitation, WorkOSConfigError, WorkOSAPIError } from "@/lib/workos";
import {
  verifyTurnstileToken,
  getClientIp,
  getTurnstileErrorMessage,
  TurnstileVerificationError,
  TurnstileConfigError,
  validateTurnstileConfig,
} from "@/lib/turnstile";

interface InviteRequestBody {
  email: string;
  turnstileToken?: string;
}

interface SuccessResponse {
  success: true;
  message: string;
  email: string;
}

interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
}

type InviteResponse = SuccessResponse | ErrorResponse;

// Rate limiting: simple in-memory store (use Redis in production for distributed systems)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // max 3 requests per minute per email

function isRateLimited(email: string): boolean {
  const now = Date.now();
  const normalizedEmail = email.toLowerCase().trim();
  const record = rateLimitStore.get(normalizedEmail);

  if (!record || now > record.resetAt) {
    rateLimitStore.set(normalizedEmail, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

// Cleanup old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [email, record] of rateLimitStore.entries()) {
    if (now > record.resetAt) {
      rateLimitStore.delete(email);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

export default async function handler(req: NextApiRequest, res: NextApiResponse<InviteResponse>) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      error: "Method not allowed",
    });
  }

  try {
    const body = req.body as InviteRequestBody;

    // Verify Turnstile CAPTCHA (if configured)
    const turnstileConfig = validateTurnstileConfig();
    if (turnstileConfig.valid) {
      if (!body.turnstileToken) {
        return res.status(400).json({
          success: false,
          error: "Please complete the verification challenge",
          code: "TURNSTILE_REQUIRED",
        });
      }

      try {
        const clientIp = getClientIp(req.headers as Record<string, string>);
        await verifyTurnstileToken({
          token: body.turnstileToken,
          remoteIp: clientIp,
        });
      } catch (error) {
        if (error instanceof TurnstileVerificationError) {
          console.warn("[invite] Turnstile verification failed:", {
            errorCodes: error.errorCodes,
          });
          return res.status(400).json({
            success: false,
            error: getTurnstileErrorMessage(error.errorCodes),
            code: "TURNSTILE_FAILED",
          });
        }
        if (error instanceof TurnstileConfigError) {
          console.error("[invite] Turnstile config error:", error.message);
        } else {
          throw error;
        }
      }
    }

    // Validate email is provided
    if (!body.email || typeof body.email !== "string") {
      return res.status(400).json({
        success: false,
        error: "Email is required",
        code: "MISSING_EMAIL",
      });
    }

    const email = body.email.trim().toLowerCase();

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email format",
        code: "INVALID_EMAIL",
      });
    }

    // Check rate limit
    if (isRateLimited(email)) {
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please try again later.",
        code: "RATE_LIMITED",
      });
    }

    // Send the invitation
    await sendInvitation({ email });

    // Log successful invitation (omit sensitive data in production)
    console.log("[invite] Invitation sent:", {
      email: email.replace(/(.{2}).*@/, "$1***@"),
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: "Invitation sent successfully. Please check your email.",
      email,
    });
  } catch (error) {
    // Handle configuration errors (missing env vars)
    if (error instanceof WorkOSConfigError) {
      console.error("[invite] Configuration error:", error.message);
      return res.status(500).json({
        success: false,
        error: "Service temporarily unavailable",
        code: "CONFIG_ERROR",
      });
    }

    // Handle WorkOS API errors
    if (error instanceof WorkOSAPIError) {
      console.error("[invite] WorkOS API error:", {
        message: error.message,
        statusCode: error.statusCode,
        code: error.code,
      });

      // Map specific WorkOS errors to user-friendly messages
      if (error.statusCode === 422) {
        return res.status(400).json({
          success: false,
          error: "Invalid email address",
          code: "VALIDATION_ERROR",
        });
      }

      return res.status(500).json({
        success: false,
        error: "Failed to send invitation. Please try again.",
        code: "API_ERROR",
      });
    }

    // Handle unexpected errors
    console.error("[invite] Unexpected error:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred",
      code: "INTERNAL_ERROR",
    });
  }
}
