import type { NextApiRequest } from "next";

/**
 * Shared request guards for the browser-triggered CAPI twins (/api/visit-quality,
 * /api/handoff). Both are public, unauthenticated endpoints, so each drops bot
 * user agents, rate-limits per IP and only forwards a cleaned page URL.
 */

export const BOT_UA =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|facebookexternalhit|python|curl|wget/i;

/**
 * A per-IP sliding-window cap. In-memory, so per warm instance only: cheap
 * protection against a looping client, not a hard quota.
 */
export function createIpRateLimiter(max: number, windowMs: number): (ip: string) => boolean {
  const hitsByIp = new Map<string, number[]>();
  return (ip) => {
    const now = Date.now();
    const recent = (hitsByIp.get(ip) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      hitsByIp.set(ip, recent);
      return true;
    }
    recent.push(now);
    hitsByIp.set(ip, recent);
    if (hitsByIp.size > 5000) hitsByIp.clear(); // bound memory on a long-lived instance
    return false;
  };
}

/**
 * The public client IP for Meta CAPI matching/geolocation. On Vercel the real
 * client IP is the first hop of x-forwarded-for (x-real-ip as a fallback).
 */
export function clientIp(req: NextApiRequest): string | undefined {
  const xff = req.headers["x-forwarded-for"];
  const first = (Array.isArray(xff) ? xff[0] : xff)?.split(",")[0]?.trim();
  if (first) return first;
  const xrip = req.headers["x-real-ip"];
  return (Array.isArray(xrip) ? xrip[0] : xrip)?.trim() || undefined;
}

/** The page URL without any PII params (/demo links can carry ?email=). */
export function cleanSourceUrl(referer: string | undefined): string | undefined {
  if (!referer) return undefined;
  try {
    const url = new URL(referer);
    for (const key of ["email", "phone", "name"]) url.searchParams.delete(key);
    return url.toString();
  } catch {
    return undefined;
  }
}
