/**
 * Client-side API wrapper for the public onboarding funnel (/start). Posts to a
 * same-origin Next API route (src/pages/api/public/*) that forwards to the
 * Raisedash backend, injecting the real client IP/UA server-side. Throws a typed
 * ApiError carrying the backend's consistent error JSON envelope.
 *
 * Ported from the dashboard's lib/api.ts; the only change is the request target
 * (`/api/${path}` here vs the dashboard's `/api/backend/${path}` BFF proxy).
 */
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
  const res = await fetch(`/api/${path.replace(/^\//, "")}`, {
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
    if (e.status === 401) return "Your session expired — please sign in again.";
    if (e.status >= 500) return fallback;
    return e.message || fallback;
  }
  return fallback;
}
