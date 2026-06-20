import type { NextApiRequest, NextApiResponse } from "next";

/**
 * BFF proxy for the public onboarding funnel (/start). Forwards the lead to the
 * Raisedash backend's public endpoint (POST /v1/public/onboarding), injecting the
 * real client IP + User-Agent so the backend can attribute the Meta Conversions
 * API Lead. No auth — this is a public, pre-account funnel.
 *
 * Mirrors the dashboard's /api/backend/[...path] header-forwarding for this one
 * route. Calling the backend server-to-server (rather than browser-direct) means
 * the request never crosses CORS, so no backend CORS change is needed for this
 * new domain. The backend's response (the {ok:true} success body or its error
 * envelope) is streamed back verbatim so the client's typed ApiError still works.
 */
const BACKEND_URL = process.env.RAISEDASH_BACKEND_URL ?? "http://localhost:4000";

// The backend derives the conversion IP from these (cf-connecting-ip → XFF →
// x-real-ip); the UA is also sent in the body, but forward the header too.
const FORWARD_HEADERS = ["user-agent", "x-forwarded-for", "x-real-ip", "cf-connecting-ip"];

function errorEnvelope(res: NextApiResponse, status: number, error: string, message: string) {
  return res.status(status).json({
    statusCode: status,
    error,
    message,
    timestamp: new Date().toISOString(),
    path: "/api/public/onboarding",
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return errorEnvelope(res, 405, "MethodNotAllowed", "Method not allowed");
  }

  const headers: Record<string, string> = { "content-type": "application/json" };
  for (const name of FORWARD_HEADERS) {
    const value = req.headers[name];
    if (typeof value === "string") headers[name] = value;
    else if (Array.isArray(value) && value.length) headers[name] = value.join(", ");
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${BACKEND_URL}/v1/public/onboarding`, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body ?? {}),
    });
  } catch (err) {
    console.error("[api/public/onboarding] backend unreachable:", err);
    return errorEnvelope(res, 502, "BadGateway", "Could not reach the API. Please try again.");
  }

  // Pass the backend's status + body straight through (success or error
  // envelope) so the funnel's typed error handling keeps working.
  const text = await upstream.text();
  const contentType = upstream.headers.get("content-type");
  if (contentType) res.setHeader("content-type", contentType);
  return res.status(upstream.status).send(text);
}
