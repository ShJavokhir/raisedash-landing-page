import { useEffect } from "react";
import { useRouter } from "next/router";
import { noteEngagedVisitPage, startEngagedVisitTracking } from "@/lib/engaged-visit";
import { captureClickId, ensureFbp, stripSensitiveParams } from "@/lib/meta-pixel";
import {
  captureAdAttributionCookies,
  initFleetPixel,
  trackFleetPageView,
} from "@/lib/meta-fleet-pixel";

/**
 * Mounts the site-wide FLEET Meta Pixel (see src/lib/meta-fleet-pixel.ts) on
 * every marketing page. _app.tsx excludes the /start* ad funnels, which run
 * their own pixel/dataset.
 *
 * Order matters on first mount: scrub any PII from the URL before anything
 * sends it to Meta, persist the ad click id + UTM attribution (the FB/IG in-app
 * browser may suppress the Pixel, so cookies are our durable copy), synthesize
 * _fbp for CAPI matching, then boot the pixel. Route changes get their own
 * PageView — the Pages Router triggers no natural page loads. Also runs the
 * EngagedVisit tracker (src/lib/engaged-visit.ts), so it stops on /start* too.
 */
export function FleetMetaPixel() {
  const router = useRouter();

  useEffect(() => {
    stripSensitiveParams();
    captureClickId();
    ensureFbp();
    captureAdAttributionCookies();
    // Re-mount with the pixel already inited (back from a funnel detour) means
    // init fires no PageView for this view — fire it ourselves.
    if (!initFleetPixel()) trackFleetPageView();
    return startEngagedVisitTracking();
  }, []);

  useEffect(() => {
    const onRouteChange = () => {
      // A client-side nav can still carry ad params (internal links preserve
      // query strings); both helpers no-op when the params aren't there.
      captureClickId();
      captureAdAttributionCookies();
      trackFleetPageView();
      noteEngagedVisitPage(window.location.pathname);
    };
    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [router.events]);

  return null;
}
