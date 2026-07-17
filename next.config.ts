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
    optimizePackageImports: ["lucide-react", "motion", "d3-geo"],
  },
};

export default withBundleAnalyzer(nextConfig);
