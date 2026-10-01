/**
 * Server-side Meta (Facebook/Instagram) Conversions API. This is the DURABLE half
 * of the Pixel + CAPI pair: Meta ads open in the FB/IG in-app browser where the
 * Pixel is routinely suppressed (sandboxed cookies, ATT opt-out, ad blockers), so
 * the server event — sharing an `event_id` with the browser Pixel for
 * deduplication — is the source of truth for each conversion.
 *
 * Serves ONE dataset: the site-wide FLEET pixel (META_FLEET_PIXEL_ID +
 * META_FLEET_CAPI_ACCESS_TOKEN) via sendFleetCapiEvent, called from
 * /api/email-capture ("Lead"), /api/demo-lead ("Schedule") and
 * /api/visit-quality ("EngagedVisit"). The old /start* driver-training CAPI was
 * removed 2026-10-01; /start-v3 still runs that pixel browser-only.
 *
 * Node-only (reads secret access tokens + hashes PII with node:crypto); never
 * bundled to the client. No-ops when the env pair is unset. Never throws: a
 * failed send must not fail the capture (the Telegram notification already fired).
 */
import { createHash } from "node:crypto";

const GRAPH_API_VERSION = process.env.META_GRAPH_API_VERSION || "v25.0";

/** Everything needed to send a high-match-quality server event. */
export interface CapiEventInput {
  /** Raw contact info — hashed here, never stored hashed. */
  email?: string;
  phone?: string; // E.164 ("+1512…") or national digits
  name?: string; // full name; split into fn/ln
  /** First-party visitor id (the rd_vid cookie). The browser Pixel gets the
   *  same value at init, so Meta can tie one visitor's EngagedVisit, Lead and
   *  Schedule together. Hashed here, as Meta recommends. */
  externalId?: string;
  /** Dedup key shared with the browser Pixel's twin event. */
  eventId?: string;
  eventSourceUrl?: string;
  /** Not hashed. */
  clientIp?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
  fbclid?: string; // used to synthesize fbc if the cookie wasn't captured
  /** Matches the browser Pixel twin's content_name so reporting reads
   *  consistently (e.g. "fleet_email_capture"). */
  contentName?: string;
  /** Meta event name, standard ("Lead", "Schedule") or custom ("EngagedVisit").
   *  Defaults to "Lead". */
  eventName?: string;
  /** Extra custom_data fields (e.g. EngagedVisit's engaged_seconds). */
  customData?: Record<string, string | number>;
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
function buildUserData(input: CapiEventInput): Record<string, unknown> {
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
  const externalId = input.externalId?.trim().toLowerCase();
  if (externalId) ud.external_id = [sha256(externalId)];

  // Never hashed.
  if (input.clientIp) ud.client_ip_address = input.clientIp;
  if (input.clientUserAgent) ud.client_user_agent = input.clientUserAgent;
  if (input.fbp) ud.fbp = input.fbp;

  const fbc = input.fbc || synthesizeFbc(input.fbclid);
  if (fbc) ud.fbc = fbc;

  return ud;
}

/** One pixel/dataset's server-side credentials. */
interface CapiDataset {
  pixelId: string;
  accessToken: string;
  testEventCode?: string;
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
 * Send a server-side event to the FLEET dataset. Best-effort: returns
 * { sent: false } (never throws) on any failure or when unconfigured, so the
 * caller can fire-and-forget without risking the user's submission.
 */
export async function sendFleetCapiEvent(
  input: CapiEventInput
): Promise<{ sent: boolean; error?: string }> {
  const dataset = fleetDataset();
  if (!dataset) return { sent: false };

  const userData = buildUserData(input);
  // An event with only weak/no identifiers is rejected by Meta's baseline-match
  // rule. EngagedVisit has no email, so it lives on fbp/fbc/external_id.
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
    // content_name (when given) matches the browser Pixel twin so reporting reads
    // consistently across browser and server.
    custom_data: {
      currency: "USD",
      value: 0,
      ...(input.contentName ? { content_name: input.contentName } : {}),
      ...input.customData,
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
