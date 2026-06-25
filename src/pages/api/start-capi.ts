import { NextApiRequest, NextApiResponse } from "next";
import { sendCapiLead } from "@/lib/meta-capi";

/**
 * Server-side Meta Conversions API Lead for the /start onboarding funnel.
 *
 * /start posts its lead DIRECTLY to the backend (browser → Cloudflare → backend)
 * to preserve the real client IP for per-visitor rate-limiting — so it can't be
 * proxied through Vercel. The backend is intentionally Meta-free, so the CAPI event
 * fires here instead: same-origin on Vercel, this route sees the real client IP and
 * holds the secret access token. Deduplicated with the browser Pixel via the shared
 * eventId. ALL Meta tracking lives in this project (src/lib/meta-capi.ts), none in
 * the backend.
 *
 * The browser calls this fire-and-forget alongside its backend post, so it always
 * 204s (even on a CAPI failure) and can never affect the funnel UX. No-ops unless
 * META_PIXEL_ID + META_CAPI_ACCESS_TOKEN are set.
 */

/**
 * The public client IP for Meta CAPI matching/geolocation. On Vercel the real
 * client IP is the first hop of x-forwarded-for (x-real-ip as a fallback).
 */
function clientIp(req: NextApiRequest): string | undefined {
  const xff = req.headers["x-forwarded-for"];
  const first = (Array.isArray(xff) ? xff[0] : xff)?.split(",")[0]?.trim();
  if (first) return first;
  const xrip = req.headers["x-real-ip"];
  return (Array.isArray(xrip) ? xrip[0] : xrip)?.trim() || undefined;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
    const attr = (body.attribution ?? {}) as Record<string, unknown>;

    const email = str(body.email);
    const phone = str(body.phone);
    // Need at least one usable identifier; the funnel always collects an email.
    if (!email && !phone) {
      res.status(204).end();
      return;
    }

    const result = await sendCapiLead({
      email,
      phone,
      name: str(body.name),
      usDot: str(body.usDot),
      eventId: str(body.eventId),
      eventSourceUrl: str(attr.landingUrl),
      clientIp: clientIp(req),
      clientUserAgent: req.headers["user-agent"],
      fbp: str(attr.fbp),
      fbc: str(attr.fbc),
      fbclid: str(attr.fbclid),
    });
    if (result.error) {
      console.warn("Start CAPI Lead not sent:", result.error);
    }
    res.status(204).end();
  } catch (error) {
    // Never surface to the funnel UX — it's best-effort.
    console.error("Error firing start CAPI lead:", error);
    res.status(204).end();
  }
}
