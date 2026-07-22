/**
 * Server-side Meta (Facebook/Instagram) Conversions API. This is the DURABLE half
 * of the Pixel + CAPI pair: Meta ads open in the FB/IG in-app browser where the
 * Pixel is routinely suppressed (sandboxed cookies, ATT opt-out, ad blockers), so
 * the server event — sharing an `event_id` with the browser Pixel for
 * deduplication — is the source of truth for each conversion.
 *
 * Serves two separate pixels/datasets:
 *  - sendCapiLead — the /start* driver-training funnels' pixel
 *    (META_PIXEL_ID + META_CAPI_ACCESS_TOKEN), called from
 *    /api/start-capi and /api/start-v2-lead.
 *  - sendFleetCapiLead — the site-wide FLEET pixel the B2B email-capture
 *    campaigns optimize against (META_FLEET_PIXEL_ID + META_FLEET_CAPI_ACCESS_TOKEN),
 *    called from /api/email-capture and /api/demo-lead. A separate dataset so
 *    "Lead" there means only fleet email captures, never driver-training leads.
 *
 * Node-only (reads secret access tokens + hashes PII with node:crypto); never
 * bundled to the client. Each entry point no-ops when its own env pair is unset,
 * so every funnel works before its pixel is provisioned. Never throws: a failed
 * send must not fail the capture (the Telegram notification already fired).
 */
import { createHash } from "node:crypto";

const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v25.0";

/** Everything needed to send a high-match-quality Lead event. */
export interface CapiLeadInput {
  /** Raw contact info — hashed here, never stored hashed. */
  email?: string;
  phone?: string; // E.164 ("+1512…") or national digits
  name?: string; // full name; split into fn/ln
  usDot?: string; // sent as a hashed external_id (optional on this funnel)
  /** Dedup key shared with the browser Pixel's Lead event. */
  eventId?: string;
  eventSourceUrl?: string;
  /** Not hashed. */
  clientIp?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string; // used to synthesize fbc if the cookie wasn't captured
  /** Matches the browser Pixel Lead's content_name so reporting reads consistently
   *  (e.g. "start_v2_lead"). Omit to send no content_name (the /start funnel). */
  contentName?: string;
  /** Standard Meta event name. Defaults to "Lead". The /start-v2 full submission
   *  passes "CompleteRegistration" so it stays a distinct, higher-value conversion
   *  from the early name-step Lead the ad set optimizes against. */
  eventName?: string;
}

/** SHA-256 → lowercase hex, per Meta's customer-information hashing spec. */
function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Email: trim + lowercase, then hash. */
function hashEmail(email: string): string | undefined {
  const norm = email.trim().toLowerCase();
  return norm ? sha256(norm) : undefined;
}

/**
 * Phone: digits only, with country code, no '+'. Our inputs are E.164 (+1…) so
 * stripping non-digits yields "1XXXXXXXXXX". If a bare 10-digit US number slips
 * through, prepend the NANP country code.
 */
function hashPhone(phone: string): string | undefined {
  let d = phone.replace(/\D/g, "").replace(/^0+/, "");
  if (d.length === 10) d = `1${d}`;
  return d.length >= 10 ? sha256(d) : undefined;
}

/** Names: lowercase, letters only (drop punctuation/whitespace), then hash. */
function hashName(part: string): string | undefined {
  const norm = part.toLowerCase().replace(/[^a-zÀ-ɏ]/g, "");
  return norm ? sha256(norm) : undefined;
}

function splitName(name: string): { first?: string; last?: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { first: parts[0] };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

/**
 * If the browser never stored an _fbc cookie but we have the click id, build fbc
 * ourselves: fb.{subdomainIndex}.{creationTimeMs}.{fbclid}. Use subdomainIndex 1
 * (Meta's documented value when generating server-side) and milliseconds for the
 * timestamp. fbclid is case-sensitive — never altered.
 */
function synthesizeFbc(fbclid?: string): string | undefined {
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

/** Build the user_data object — hashed PII + un-hashed match signals. */
function buildUserData(input: CapiLeadInput): Record<string, unknown> {
  const ud: Record<string, unknown> = {};

  if (input.email) {
    const em = hashEmail(input.email);
    if (em) ud.em = [em];
  }
  if (input.phone) {
    const ph = hashPhone(input.phone);
    if (ph) ud.ph = [ph];
  }
  if (input.name) {
    const { first, last } = splitName(input.name);
    const fn = first ? hashName(first) : undefined;
    const ln = last ? hashName(last) : undefined;
    if (fn) ud.fn = [fn];
    if (ln) ud.ln = [ln];
  }
  // The DOT number is a stable, dedup-friendly id for the carrier (optional here).
  const dot = input.usDot?.replace(/\D/g, "");
  if (dot) ud.external_id = [sha256(dot)];

  // Never hashed.
  if (input.clientIp) ud.client_ip_address = input.clientIp;
  if (input.clientUserAgent) ud.client_user_agent = input.clientUserAgent;
  if (input.fbp) ud.fbp = input.fbp;

  const fbc = input.fbc || synthesizeFbc(input.fbclid);
  if (fbc) ud.fbc = fbc;

  return ud;
}

/** True once both the pixel id and a CAPI access token are present. */
export function metaCapiConfigured(): boolean {
  return Boolean(process.env.META_PIXEL_ID && process.env.META_CAPI_ACCESS_TOKEN);
}

/** One pixel/dataset's server-side credentials. */
interface CapiDataset {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
}

/** The /start* driver-training funnels' dataset. */
function startDataset(): CapiDataset | undefined {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return undefined;
  return { pixelId, accessToken, testEventCode: process.env.META_CAPI_TEST_EVENT_CODE };
}

/**
 * The fleet (B2B email-capture) dataset. The pixel id falls back to the
 * NEXT_PUBLIC_ var so one Vercel env serves both the client snippet and CAPI.
 */
function fleetDataset(): CapiDataset | undefined {
  const pixelId = process.env.META_FLEET_PIXEL_ID || process.env.NEXT_PUBLIC_META_FLEET_PIXEL_ID;
  const accessToken = process.env.META_FLEET_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) return undefined;
  return { pixelId, accessToken, testEventCode: process.env.META_FLEET_CAPI_TEST_EVENT_CODE };
}

/**
 * Send the server-side Lead to the /start* funnels' dataset. Best-effort:
 * returns { sent: false } (never throws) on any failure or when unconfigured,
 * so the caller can fire-and-forget without risking the user's submission.
 */
export async function sendCapiLead(
  input: CapiLeadInput
): Promise<{ sent: boolean; error?: string }> {
  const dataset = startDataset();
  if (!dataset) return { sent: false };
  return sendCapiLeadTo(dataset, input);
}

/**
 * Send the server-side event to the FLEET dataset (email captures / demo
 * requests). Same best-effort contract as sendCapiLead. Deliberately a separate
 * entry point: when the fleet env is unset it must no-op, never fall back to
 * the driver-training dataset.
 */
export async function sendFleetCapiLead(
  input: CapiLeadInput
): Promise<{ sent: boolean; error?: string }> {
  const dataset = fleetDataset();
  if (!dataset) return { sent: false };
  return sendCapiLeadTo(dataset, input);
}

async function sendCapiLeadTo(
  dataset: CapiDataset,
  input: CapiLeadInput
): Promise<{ sent: boolean; error?: string }> {
  const userData = buildUserData(input);
  // A Lead with only weak/no identifiers is rejected by Meta's baseline-match
  // rule. This funnel always collects email + phone, but guard anyway.
  const hasStrongId = Boolean(
    userData.em || userData.ph || userData.external_id || userData.fbp || userData.fbc
  );
  if (!hasStrongId) return { sent: false, error: "no usable identifier for matching" };

  const event: Record<string, unknown> = {
    event_name: input.eventName || "Lead",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: input.eventSourceUrl || "https://www.raisedash.com",
    user_data: userData,
    // content_name (when given) matches the browser Pixel's Lead so reporting reads
    // consistently across the two funnels.
    custom_data: {
      currency: "USD",
      value: 0,
      ...(input.contentName ? { content_name: input.contentName } : {}),
    },
    // US state-privacy compliance (Limited Data Use), matching the browser Pixel.
    // country/state 0 lets Meta geolocate from client_ip_address.
    data_processing_options: ["LDU"],
    data_processing_options_country: 0,
    data_processing_options_state: 0,
  };
  if (input.eventId) event.event_id = input.eventId;

  // access_token goes in the POST body, NOT the query string, so a URL-borne token
  // can't leak into logs/proxies. The Graph API accepts it as a body parameter.
  const payload: Record<string, unknown> = {
    data: [event],
    access_token: dataset.accessToken,
  };
  if (dataset.testEventCode) {
    payload.test_event_code = dataset.testEventCode;
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${dataset.pixelId}/events`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, error: `Meta CAPI ${res.status}: ${body.slice(0, 300)}` };
    }
    return { sent: true };
  } catch (err) {
    return { sent: false, error: `Meta CAPI request failed: ${(err as Error).message}` };
  }
}
