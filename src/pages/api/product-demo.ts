import { getDemoProduct } from "@/data/demo";
import type { NextApiRequest, NextApiResponse } from "next";
import { demoRequestApiSchema, formatProductDemoMessage } from "@/lib/demo-request";
import { sendToTelegram } from "@/lib/telegram";
import { getClientIp, verifyTurnstileToken } from "@/lib/turnstile";
import { captureServerEvent } from "@/lib/posthog-server";
import { sendFleetCapiEvent } from "@/lib/meta-capi";

export const config = { api: { bodyParser: { sizeLimit: "16kb" } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!req.headers["content-type"]?.toLowerCase().startsWith("application/json")) {
    return res.status(415).json({ error: "Send a JSON request." });
  }

  const body: unknown = req.body;
  if (
    body &&
    typeof body === "object" &&
    "companyWebsite" in body &&
    typeof body.companyWebsite === "string" &&
    body.companyWebsite.trim()
  ) {
    // Do not send notifications or record conversions for honeypot submissions.
    return res.status(200).json({ success: true });
  }
  const parsed = demoRequestApiSchema.safeParse(body);
  if (!parsed.success) {
    const fields = Object.fromEntries(
      parsed.error.issues.map((issue) => [issue.path[0], issue.message])
    );
    return res.status(400).json({ error: "Please check the highlighted fields.", fields });
  }
  const data = parsed.data;
  const clientIp = getClientIp(req.headers as Record<string, string>);
  const hasSecret = Boolean(process.env.TURNSTILE_SECRET_KEY);
  const hasSiteKey = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  if (hasSecret !== hasSiteKey) {
    console.error("[product-demo] Incomplete verification configuration");
    return res.status(503).json({
      error: "The form is temporarily unavailable. Please email us or contact us on Telegram.",
    });
  }
  if (hasSecret) {
    if (!data.turnstileToken) {
      return res.status(400).json({ error: "Please complete the verification and try again." });
    }
    try {
      await verifyTurnstileToken({
        token: data.turnstileToken,
        remoteIp: clientIp,
        signal: AbortSignal.timeout(10000),
      });
    } catch {
      return res.status(400).json({ error: "Verification expired or failed. Please try again." });
    }
  }

  try {
    const response = await sendToTelegram(
      formatProductDemoMessage(data, data.product),
      process.env.TELEGRAM_LEADS_CHAT_ID,
      { plainText: true, signal: AbortSignal.timeout(10000) }
    );
    const result: unknown = await response.json();
    if (
      !response.ok ||
      !result ||
      typeof result !== "object" ||
      !("ok" in result) ||
      result.ok !== true
    ) {
      throw new Error("Delivery not confirmed");
    }
  } catch {
    // Never log the request, response body, or a provider error containing credentials/PII.
    console.error("[product-demo] Lead delivery could not be confirmed");
    return res.status(502).json({
      error:
        "We couldn’t confirm your request was received. Please try again, email us, or contact us on Telegram.",
    });
  }

  // Count a conversion only after delivery; analytics failure must not fail a received lead.
  const product = getDemoProduct(data.product) ? data.product : undefined;
  await Promise.allSettled([
    captureServerEvent({
      req,
      event: "lead_demo_requested",
      email: data.email,
      properties: { form: "get_a_demo", product, has_phone: Boolean(data.phone) },
    }),
    sendFleetCapiEvent({
      email: data.email,
      name: data.fullName,
      phone: data.phone || undefined,
      eventId: data.eventId,
      eventSourceUrl: req.headers.referer,
      clientIp,
      clientUserAgent: req.headers["user-agent"],
      fbp: req.cookies._fbp,
      fbc: req.cookies._fbc,
      fbclid: req.cookies.rd_fbclid,
      externalId: req.cookies.rd_vid,
      contentName: "product_demo_request",
      eventName: "Schedule",
    }),
  ]);
  return res.status(200).json({ success: true });
}
