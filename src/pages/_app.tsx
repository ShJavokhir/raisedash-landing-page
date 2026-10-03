import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { SkipLink } from "@/components/layout/SkipLink";
import { HomepageProductNavigation } from "@/components/layout/HomepageProductNavigation";
import { FleetMetaPixel } from "@/components/meta/FleetMetaPixel";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/SEO";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Code-split the marketing header and Intercom out of the shared _app bundle so
// the /start ad funnel never downloads them — Header pulls in the Radix
// navigation menu and Intercom pulls in the messenger SDK, neither of which the
// paid-traffic funnel renders. They still server-render on every other page
// (Header keeps ssr so there's no nav flash); Intercom is client-only anyway.
const Header = dynamic(() => import("@/components/layout/Header").then((m) => m.Header));
const IntercomProvider = dynamic(
  () => import("@/components/Intercom").then((m) => m.IntercomProvider),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // The /start and /start-v2 ad funnels (Meta ads) are distraction-free,
  // full-screen flows for the FB/IG in-app browser — no marketing header, no
  // Intercom widget.
  const isFunnel =
    router.pathname === "/start" ||
    router.pathname === "/start-v2" ||
    router.pathname === "/start-v3";
  // Keep these focused contact experiences free of an additional chat widget.
  const hideIntercom =
    isFunnel || router.pathname === "/tools/samsara-alerts" || router.pathname === "/get-a-demo";

  return (
    <>
      {/* Global Head - viewport and base meta */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* Blog feed auto-discovery for readers/aggregators */}
        <link rel="alternate" type="application/rss+xml" title="Raisedash Blog" href="/rss.xml" />
      </Head>

      {/* Global Organization & Website structured data */}
      <OrganizationJsonLd />
      <WebsiteJsonLd />

      <SkipLink />
      {/* Site-wide FLEET Meta Pixel + engaged-visit tracker. The /start* funnels are
          excluded (/start-v3 mounts the legacy pixel on a separate dataset). */}
      {!isFunnel && <FleetMetaPixel />}
      {!isFunnel && <Header />}
      <HomepageProductNavigation>
        <main id="main-content">
          <Component {...pageProps} />
        </main>
      </HomepageProductNavigation>
      {!hideIntercom && <IntercomProvider />}
      <SpeedInsights />
    </>
  );
}
