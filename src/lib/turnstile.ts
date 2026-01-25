/**
 * Cloudflare Turnstile server-side verification
 * Validates CAPTCHA tokens to prevent bot abuse
 */

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileVerifyOptions {
  token: string;
  remoteIp?: string;
  idempotencyKey?: string;
}

export interface TurnstileVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes": string[];
  action?: string;
  cdata?: string;
}

export class TurnstileConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TurnstileConfigError";
  }
}

export class TurnstileVerificationError extends Error {
  public readonly errorCodes: string[];

  constructor(message: string, errorCodes: string[] = []) {
    super(message);
    this.name = "TurnstileVerificationError";
    this.errorCodes = errorCodes;
  }
}

/**
 * Verify a Turnstile token with Cloudflare's API
 * Returns the full response for logging/debugging purposes
 */
export async function verifyTurnstileToken(
  options: TurnstileVerifyOptions
): Promise<TurnstileVerifyResponse> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    throw new TurnstileConfigError("TURNSTILE_SECRET_KEY environment variable is not set");
  }

  if (!options.token) {
    throw new TurnstileVerificationError("Turnstile token is required", ["missing-input-response"]);
  }

  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", options.token);

  if (options.remoteIp) {
    formData.append("remoteip", options.remoteIp);
  }

  if (options.idempotencyKey) {
    formData.append("idempotency_key", options.idempotencyKey);
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      throw new TurnstileVerificationError(`Turnstile API returned status ${response.status}`, [
        "internal-error",
      ]);
    }

    const result = (await response.json()) as TurnstileVerifyResponse;

    if (!result.success) {
      throw new TurnstileVerificationError(
        "Turnstile verification failed",
        result["error-codes"] || []
      );
    }

    return result;
  } catch (error) {
    if (error instanceof TurnstileVerificationError) {
      throw error;
    }

    console.error("[turnstile] Verification request failed:", error);
    throw new TurnstileVerificationError("Failed to verify Turnstile token", ["internal-error"]);
  }
}

/**
 * Extract client IP from request headers
 * Supports Cloudflare, Vercel, and standard proxies
 */
export function getClientIp(headers: {
  get?: (name: string) => string | null;
  [key: string]: string | null | undefined | ((name: string) => string | null);
}): string | undefined {
  // Function-based header access (Next.js API routes)
  if (typeof headers.get === "function") {
    return (
      headers.get("cf-connecting-ip") ||
      headers.get("x-real-ip") ||
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      undefined
    );
  }

  // Object-based header access
  const cfIp = headers["cf-connecting-ip"];
  const realIp = headers["x-real-ip"];
  const forwardedFor = headers["x-forwarded-for"];

  if (typeof cfIp === "string") return cfIp;
  if (typeof realIp === "string") return realIp;
  if (typeof forwardedFor === "string") {
    return forwardedFor.split(",")[0]?.trim();
  }

  return undefined;
}

/**
 * Validate Turnstile configuration
 * Useful for health checks and startup validation
 */
export function validateTurnstileConfig(): {
  valid: boolean;
  missing: string[];
} {
  const requiredVars = ["TURNSTILE_SECRET_KEY"];
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Get user-friendly error message from Turnstile error codes
 */
export function getTurnstileErrorMessage(errorCodes: string[]): string {
  if (errorCodes.includes("timeout-or-duplicate")) {
    return "Verification expired. Please try again.";
  }
  if (errorCodes.includes("invalid-input-response")) {
    return "Invalid verification. Please complete the challenge again.";
  }
  if (
    errorCodes.includes("missing-input-response") ||
    errorCodes.includes("missing-input-secret")
  ) {
    return "Verification required. Please complete the challenge.";
  }
  if (errorCodes.includes("bad-request")) {
    return "Invalid request. Please refresh and try again.";
  }
  return "Verification failed. Please try again.";
}
