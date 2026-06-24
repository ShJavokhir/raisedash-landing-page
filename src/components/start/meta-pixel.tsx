import { useEffect } from "react";
import {
  captureClickId,
  ensureFbp,
  initPixel,
  stripSensitiveParams,
  trackPixel,
} from "@/lib/meta-pixel";

/**
 * Mounts the Meta Pixel for an ad funnel. Scrubs any PII from the URL first (a
 * stale /get-started?email=… link redirects here), captures the ad click id into
 * the _fbc cookie (before anything can lose it), ensures an _fbp browser id exists
 * for CAPI matching even when the Pixel is suppressed, boots fbq + PageView, then
 * marks "entered funnel" with ViewContent. Renders nothing. Copied from the
 * dashboard's app/(public)/start/meta-pixel.tsx.
 *
 * `contentName` distinguishes funnels in Meta reporting (defaults to the original
 * /start value so that page is unchanged); /start-v2 passes its own.
 */
export function MetaPixel({ contentName = "onboarding_start" }: { contentName?: string } = {}) {
  useEffect(() => {
    stripSensitiveParams();
    captureClickId();
    ensureFbp();
    initPixel();
    trackPixel("ViewContent", { content_name: contentName });
  }, [contentName]);

  return null;
}
