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
  // The /tools/* proxies (a disjoint path set) serve tools.raisedash.com pages
  // under our domain; /tools/elp-practice itself is a real page here.
  async rewrites() {
    return [
      {
        source: "/tools/road-signs",
        destination: "https://tools.raisedash.com/tools/road-signs",
      },
      {
        source: "/tools/road-signs/:path+",
        destination: "https://tools.raisedash.com/tools/road-signs/:path+",
      },
      {
        source: "/tools/elp-practice/:path+",
        destination: "https://tools.raisedash.com/tools/elp-practice/:path+",
      },
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
      // Bare and legacy domains -> the canonical www host.
      ...["raisedash.com", "raisedash.org", "www.raisedash.org"].map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://www.raisedash.com/:path*",
        permanent: true,
      })),
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
      // Old WordPress-era URLs (raisedash.com and pti.raisedash.com, before this
      // site) that Google still shows in search. Each goes to the page that
      // replaced it instead of a 404. pti.raisedash.com itself is redirected to
      // this host, path kept, by a Cloudflare redirect rule, so its old paths
      // land here too. Each matches with or without a trailing slash (one hop).
      ...[
        ["/contact-us", "/contact"],
        ["/request-demo", "/get-a-demo"],
        ["/privacy-policy-2", "/privacy-policy"],
        [
          "/key-features-of-raisedash-app-for-drivers",
          "/products/raisedash-pti-inspections/driver-features",
        ],
        [
          "/solutions-for-safety-and-fleet-managers-with-dvir-pti-features",
          "/products/raisedash-pti-inspections/fleet-safety-managers",
        ],
        [
          "/understanding-customizable-checklists-how-they-work",
          "/products/raisedash-pti-inspections/fleet-safety-managers",
        ],
      ].map(([source, destination]) => ({ source, destination, permanent: true })),
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
