import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/SEO";
import { IntercomProvider } from "@/components/Intercom";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Re-export Web Vitals reporting for Next.js performance monitoring
export { reportWebVitals } from "@/lib/vitals";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // The /start onboarding funnel (Meta ads) is a distraction-free, full-screen
  // flow for the FB/IG in-app browser — no marketing header, no Intercom widget.
  const isFunnel = router.pathname === "/start";
  const hideHeader = isFunnel;

  return (
    <>
      {/* Global Head - viewport and base meta */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Global Organization & Website structured data */}
      <OrganizationJsonLd />
      <WebsiteJsonLd />

      <SkipLink />
      {!hideHeader && <Header />}
      <main id="main-content">
        <Component {...pageProps} />
      </main>
      {!isFunnel && <IntercomProvider />}
      <SpeedInsights />
    </>
  );
}
