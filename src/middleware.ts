import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Next's built-in trailing-slash 308 is disabled (skipTrailingSlashRedirect in
  // next.config.ts) so PostHog's /rdx/e/-style API paths reach the proxy
  // rewrites intact. Re-create the exact same redirect here for every other
  // path, keeping the site's canonical no-trailing-slash URLs (SEO) unchanged.
  // Plain URL, not request.nextUrl.clone(): NextURL re-applies the original
  // trailing slash when serialized, which would make this redirect loop.
  const { pathname } = request.nextUrl;
  if (pathname.length > 1 && pathname.endsWith("/") && !pathname.startsWith("/rdx/")) {
    const url = new URL(request.url);
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();

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
