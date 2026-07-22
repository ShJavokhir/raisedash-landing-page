import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // SEO: Enforce consistent URL format (no trailing slashes)
  trailingSlash: false,
  // PostHog API paths end in a trailing slash (/rdx/e/ etc.); Next's automatic
  // trailing-slash 308 would bounce them before the /rdx rewrites below could
  // proxy them. So the built-in redirect is off, and src/middleware.ts re-adds
  // the exact same no-trailing-slash 308 for every NON-/rdx path — external SEO
  // behavior is unchanged.
  skipTrailingSlashRedirect: true,
  // Reverse-proxy PostHog through our OWN origin so ad/tracking blockers can't
  // drop events or session replay. The browser only ever talks to
  // www.raisedash.com/rdx/* (see src/instrumentation-client.ts, api_host:
  // "/rdx"); Next forwards to PostHog. Deliberately an obscure "/rdx" base
  // rather than PostHog's well-known "/ingest", which some filter lists now
  // catch. Order matters — the two asset rules must precede the catch-all.
  // (The /tools/* proxies live in vercel.json, a disjoint path set.)
  async rewrites() {
    return [
      {
        source: "/rdx/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/rdx/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/rdx/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // The old /get-started demo-request flow is retired; the self-serve onboarding
  // funnel at /start replaces it. Permanent (308) so old/indexed/bookmarked links
  // move to the new funnel. NOTE: Next forwards query strings on redirect, so a
  // stale /get-started?email=… would arrive as /start?email=… — /start strips PII
  // params from its URL before the Pixel captures event_source_url (see
  // lib/meta-pixel.ts → stripSensitiveParams) so no raw email reaches Meta.
  async redirects() {
    return [
      {
        source: "/get-started",
        destination: "/start",
        permanent: true,
      },
      {
        source: "/products/raisedash-shift",
        destination: "/platform/pre-arrival-readiness",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.raisedash.com",
      },
      {
        protocol: "https",
        hostname: "pti.raisedash.com",
      },
    ],
  },
  // Optimize production builds
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Enable modern JavaScript output (reduces polyfills)
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default withBundleAnalyzer(nextConfig);
