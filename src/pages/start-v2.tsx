import { useState } from "react";
import Head from "next/head";
import { SEO } from "@/components/seo/SEO";
import { Logo } from "@/components/start/logo";
import { MetaPixel } from "@/components/start/meta-pixel";
import { LegalSheet } from "@/components/start/legal-sheet";
import { LeadFunnel } from "@/components/start-v2/lead-funnel";
import { LanguageSwitcher, StartV2I18nProvider, useStartV2T } from "@/components/start-v2/i18n";
import { DEFAULT_LOCALE, MESSAGES } from "@/lib/start-v2-i18n";
import type { LegalDoc } from "@/components/legal/legal-docs";

/**
 * Public Meta-ad landing + lead funnel for driver-training campaigns (the ad's
 * destination URL: /start-v2). A sibling of /start, but lead-capture only — no
 * account, no scan, no email. On submit the answers go to Telegram and the team
 * reaches out. Anonymous and kept deliberately light for the FB/IG in-app browser;
 * _app.tsx hides the marketing header and Intercom widget on this route.
 *
 * The audience is largely Uzbek-speaking carriers, so the page defaults to Uzbek
 * (StartV2I18nProvider) with a dropdown to switch to English. Only the visible
 * copy is translated — the lead payload, Meta Pixel/CAPI events, and the Telegram
 * notification are all language-independent (see src/lib/start-v2-i18n.ts).
 *
 * noindex/nofollow: a paid-traffic entry point, not an organic landing page, so it
 * is intentionally NOT in sitemap.xml.tsx / api/indexnow.ts.
 */
export default function StartV2Page() {
  // SEO copy lives in <head> (rendered once, server-side), so it uses the default
  // locale rather than the live dropdown selection.
  const seo = MESSAGES[DEFAULT_LOCALE].seo;

  return (
    <>
      <SEO title={seo.title} description={seo.description} noindex nofollow />
      {/* Warm up the Meta Pixel connection on a slow mobile/in-app-browser link.
          The lead itself is posted to this site's own /api route (same origin),
          so no cross-origin preconnect is needed for it. */}
      <Head>
        <link rel="preconnect" href="https://connect.facebook.net" />
      </Head>
      <StartV2I18nProvider>
        <StartV2Funnel />
      </StartV2I18nProvider>
    </>
  );
}

/** Inner shell — inside the i18n provider so the chrome can read translations. */
function StartV2Funnel() {
  const t = useStartV2T();
  // Which legal doc is open in the in-page sheet (null = closed). Shown in a bottom
  // sheet rather than navigating, so a tap never discards the funnel's answers.
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);

  return (
    <>
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5">
        {/* Logo stays centered (unchanged); the language switcher floats at the
            right edge so it never shifts the brand. */}
        <header className="relative flex items-center justify-center py-6">
          <Logo size={30} priority />
          <div className="absolute right-0">
            <LanguageSwitcher />
          </div>
        </header>
        <div className="flex flex-1 flex-col pb-8">
          <LeadFunnel />
        </div>
        {/* Legal links: required by Meta's advertising standards for a page that
            collects personal info. Opened in an in-page bottom sheet (not a new
            tab/navigation) so tapping them never discards in-progress answers. */}
        <footer className="text-muted-foreground pb-6 text-center text-xs">
          <button
            type="button"
            onClick={() => setLegalDoc("privacy")}
            className="hover:text-foreground underline underline-offset-2"
          >
            {t.footer.privacy}
          </button>
          <span className="px-2" aria-hidden>
            ·
          </span>
          <button
            type="button"
            onClick={() => setLegalDoc("terms")}
            className="hover:text-foreground underline underline-offset-2"
          >
            {t.footer.terms}
          </button>
        </footer>
        <MetaPixel contentName="start_v2" />
      </div>
      <LegalSheet doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </>
  );
}
