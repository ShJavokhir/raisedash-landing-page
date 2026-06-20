import { SEO } from "@/components/seo/SEO";
import { Logo } from "@/components/start/logo";
import { MetaPixel } from "@/components/start/meta-pixel";
import { OnboardingFunnel } from "@/components/start/onboarding-funnel";

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
  return (
    <>
      <SEO
        title="Get your DOT file audit-ready"
        description="A virtual safety manager for small carriers. Answer a few quick questions and we’ll set up a DOT file that’s always ready."
        noindex
        nofollow
      />
      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4">
        <header className="flex items-center justify-center py-5">
          <Logo size={26} priority />
        </header>
        <div className="flex flex-1 flex-col pb-8">
          <OnboardingFunnel />
        </div>
        <MetaPixel />
      </div>
    </>
  );
}
