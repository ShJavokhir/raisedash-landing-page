import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  // Content-Security-Policy
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://*.intercom.io https://*.intercomcdn.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://cdn.raisedash.com https://pti.raisedash.com https://www.google-analytics.com https://*.intercomcdn.com https://*.intercom.io https://*.intercomassets.com",
    "font-src 'self' https://fonts.gstatic.com data: https://*.intercomcdn.com",
    "connect-src 'self' https://www.google-analytics.com https://api.telegram.org https://raw.githubusercontent.com https://cloudflareinsights.com https://*.intercom.io https://*.intercomcdn.com https://*.intercom-messenger.com https://*.intercom-reporting.com wss://*.intercom.io wss://*.intercom-messenger.com wss://nexus-websocket-a.intercom.io wss://nexus-websocket-b.intercom.io wss://primary-realtime.intercom-messenger.com wss://a-realtime.intercom-messenger.com wss://b-realtime.intercom-messenger.com wss://c-realtime.intercom-messenger.com wss://d-realtime.intercom-messenger.com wss://e-realtime.intercom-messenger.com",
    "frame-src https://intercom-sheets.com https://www.intercom-reporting.com https://www.youtube.com https://player.vimeo.com https://fast.wistia.net",
    "media-src https://*.intercomcdn.com",
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "form-action 'self' https://intercom.help https://*.intercom.io",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  response.headers.set("Content-Security-Policy", cspDirectives);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
