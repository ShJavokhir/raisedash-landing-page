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
