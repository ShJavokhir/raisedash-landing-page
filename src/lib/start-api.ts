/**
 * Client-side API wrapper for the public onboarding funnel (/start). Posts the
 * lead DIRECTLY to the Raisedash backend's public endpoint
 * (https://api.raisedash.com/v1/public/onboarding), not through a same-origin
 * proxy.
 *
 * Why direct: the landing page runs on Vercel and has no private path to the
 * EC2 backend, so a proxy hop would reach the backend through Cloudflare and
 * overwrite CF-Connecting-IP with Vercel's egress IP. The backend keys its
 * per-visitor rate limit AND the Meta CAPI client_ip_address off that header, so
 * proxying would (1) make every lead share one throttle bucket and (2) attribute
 * the wrong IP. Going browser -> Cloudflare -> backend preserves the real client
 * IP. Requires the backend to allow this origin via CORS_ALLOWED_ORIGINS.
 *
 * Ported from the dashboard's lib/api.ts; throws a typed ApiError carrying the
 * backend's consistent error JSON envelope.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.raisedash.com";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiErrorBody {
  statusCode: number;
  error: string;
  message: string | string[];
  requestId?: string;
}

async function parseError(res: Response): Promise<ApiError> {
  let body: ApiErrorBody | undefined;
  try {
    body = (await res.json()) as ApiErrorBody;
  } catch {
    /* non-JSON error */
  }
  const message = body
    ? Array.isArray(body.message)
      ? body.message.join(", ")
      : body.message || body.error
    : `Request failed (${res.status})`;
  return new ApiError(res.status, message, body);
}

export async function apiPost<T = unknown>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}/v1/${path.replace(/^\//, "")}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: body == null ? undefined : JSON.stringify(body),
  });

  if (!res.ok) throw await parseError(res);
  if (res.status === 204) return undefined as T;

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) return res.json() as Promise<T>;
  return res as unknown as T;
}

/**
 * The single source of user-facing error copy. Surfaces the backend's clean 4xx
 * string directly, but never leaks 5xx internals and maps 401/unknown failures
 * to the caller's contextual fallback.
 */
export function errorMessage(
  e: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (e instanceof ApiError) {
    if (e.status === 401) return "Your session expired. Please sign in again.";
    if (e.status >= 500) return fallback;
    return e.message || fallback;
  }
  return fallback;
}
