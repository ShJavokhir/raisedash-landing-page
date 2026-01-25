/**
 * WorkOS service for authentication and user management
 * Handles user invitations for onboarding
 */

import { WorkOS } from "@workos-inc/node";

// Singleton WorkOS client instance
let workosClient: WorkOS | null = null;

/**
 * Get or create the WorkOS client instance
 * Validates API key is present before returning client
 */
export function getWorkOSClient(): WorkOS {
  if (workosClient) {
    return workosClient;
  }

  const apiKey = process.env.WORKOS_API_KEY;

  if (!apiKey) {
    throw new WorkOSConfigError("WORKOS_API_KEY environment variable is not set");
  }

  workosClient = new WorkOS(apiKey);
  return workosClient;
}

/**
 * Custom error class for WorkOS configuration issues
 */
export class WorkOSConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WorkOSConfigError";
  }
}

/**
 * Custom error class for WorkOS API errors
 */
export class WorkOSAPIError extends Error {
  public readonly statusCode?: number;
  public readonly code?: string;

  constructor(message: string, statusCode?: number, code?: string) {
    super(message);
    this.name = "WorkOSAPIError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export interface InvitationOptions {
  email: string;
  organizationId?: string;
  expiresInDays?: number;
}

export interface InvitationResult {
  id: string;
  email: string;
  state: string;
  expiresAt: string;
  createdAt: string;
}

/**
 * Send an invitation email to the specified address
 * User will receive an email with a link to sign up for the application
 *
 * If organizationId is omitted, it's a general app invitation (user signs up without joining a specific org)
 */
export async function sendInvitation(options: InvitationOptions): Promise<InvitationResult> {
  const workos = getWorkOSClient();

  try {
    const invitation = await workos.userManagement.sendInvitation({
      email: options.email,
      organizationId: options.organizationId,
      expiresInDays: options.expiresInDays || 7,
    });

    return {
      id: invitation.id,
      email: invitation.email,
      state: invitation.state,
      expiresAt: invitation.expiresAt,
      createdAt: invitation.createdAt,
    };
  } catch (error) {
    // Handle WorkOS-specific errors
    if (error instanceof Error) {
      const workosError = error as { status?: number; code?: string };
      throw new WorkOSAPIError(error.message, workosError.status, workosError.code);
    }
    throw new WorkOSAPIError("Failed to send invitation");
  }
}

/**
 * Validate that all required WorkOS environment variables are set
 * Useful for startup checks or health endpoints
 */
export function validateWorkOSConfig(): {
  valid: boolean;
  missing: string[];
} {
  const requiredVars = ["WORKOS_API_KEY"];
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  return {
    valid: missing.length === 0,
    missing,
  };
}
