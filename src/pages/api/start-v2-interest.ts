import { NextApiRequest, NextApiResponse } from "next";
import { sendCapiLead } from "@/lib/meta-capi";

/**
 * Early, high-volume Meta optimization signal for the /start-v2 funnel. The browser
 * calls this the moment the user finishes the name step — long before the full lead
 * submission. It sends ONLY a server-side Meta CAPI "Lead" (deduplicated with the
 * browser Pixel via the shared eventId), giving Meta a conversion that enough people
 * reach to exit the learning phase (~50/week). The ad set should optimize for this
 * "Lead"; the full submission (/api/start-v2-lead) fires the higher-value
 * "CompleteRegistration".
 *
 * We don't have email/phone yet, but the synthesized _fbp/_fbc (see meta-pixel.ts's
 * ensureFbp/captureClickId) satisfy Meta's match-quality minimum — that's the
 * quality trade-off of optimizing on an earlier step.
 *
 * Best-effort: no Telegram, no storage, never throws, no-ops unless Meta is
 * configured. Always answers 200 so a failure here can never disrupt the funnel.
 */

/** Public client IP for Meta CAPI matching/geolocation (first x-forwarded-for hop). */
function clientIp(req: NextApiRequest): string | undefined {
  const xff = req.headers["x-forwarded-for"];
  const first = (Array.isArray(xff) ? xff[0] : xff)?.split(",")[0]?.trim();
  if (first) return first;
  const xrip = req.headers["x-real-ip"];
  return (Array.isArray(xrip) ? xrip[0] : xrip)?.trim() || undefined;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
    const rawAttr = (body.attribution ?? {}) as Record<string, unknown>;

    const result = await sendCapiLead({
      name: str(body.fullName),
      eventId: str(body.eventId),
      eventSourceUrl: str(rawAttr.landingUrl),
      clientIp: clientIp(req),
      clientUserAgent: req.headers["user-agent"],
      fbp: str(rawAttr.fbp),
      fbc: str(rawAttr.fbc),
      fbclid: str(rawAttr.fbclid),
      contentName: "start_v2_lead",
      // eventName omitted → defaults to "Lead" (the optimization event).
    });
    if (result.error) {
      console.warn("Start-v2 early Meta CAPI Lead not sent:", result.error);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error firing start-v2 interest lead:", error);
    // Never disrupt the funnel — acknowledge regardless.
    return res.status(200).json({ success: true });
  }
}
