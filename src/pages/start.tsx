import { useState } from "react";
import Head from "next/head";
import { SEO } from "@/components/seo/SEO";
import { Logo } from "@/components/start/logo";
import { MetaPixel } from "@/components/start/meta-pixel";
import { OnboardingFunnel } from "@/components/start/onboarding-funnel";
import { LegalSheet } from "@/components/start/legal-sheet";
import type { LegalDoc } from "@/components/legal/legal-docs";

/**
 * Public Meta-ad landing + onboarding funnel (the ad's destination URL: /start).
 * Migrated from the dashboard app. Anonymous — no auth, no login mid-funnel —
 * and kept deliberately light for the FB/IG in-app browser. _app.tsx hides the
 * marketing header and Intercom widget on this route so it's a distraction-free
 * flow.
 *
 * noindex/nofollow: this is a paid-traffic entry point, not an organic landing
 * page, so it is intentionally NOT in sitemap.xml.tsx / api/indexnow.ts.
 */
export default function StartPage() {
  // Which legal doc is open in the in-page sheet (null = closed). We show these in
  // a bottom sheet rather than navigating, so a tap never discards the funnel.
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);

  return (
    <>
      <SEO
        title="Get your DOT file audit-ready"
        description="A virtual safety manager for small carriers. Answer a few quick questions and we’ll set up a DOT file that’s always ready."
        noindex
        nofollow
      />
      {/* Warm up the two cross-origin connections this funnel makes on a slow
          mobile/in-app-browser link: the Meta Pixel script and the lead-capture
          API (posted to directly — see lib/start-api.ts). */}
      <Head>
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://api.raisedash.com" crossOrigin="anonymous" />
      </Head>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5">
        <header className="flex items-center justify-center py-6">
          <Logo size={30} priority />
        </header>
        <div className="flex flex-1 flex-col pb-8">
          <OnboardingFunnel />
        </div>
        {/* Legal links: required by Meta's advertising standards for a page that
            collects personal info, and good practice (CCPA). Opened in an in-page
            bottom sheet (not a new tab/navigation) so tapping them never discards
            the user's in-progress funnel answers in the in-app browser. */}
        <footer className="text-muted-foreground pb-6 text-center text-xs">
          <button
            type="button"
            onClick={() => setLegalDoc("privacy")}
            className="hover:text-foreground underline underline-offset-2"
          >
            Privacy Policy
          </button>
          <span className="px-2" aria-hidden>
            ·
          </span>
          <button
            type="button"
            onClick={() => setLegalDoc("terms")}
            className="hover:text-foreground underline underline-offset-2"
          >
            Terms of Use
          </button>
        </footer>
        <MetaPixel />
      </div>
      <LegalSheet doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </>
  );
}
