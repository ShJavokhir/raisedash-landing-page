import { useEffect } from "react";
import {
  captureClickId,
  ensureFbp,
  initPixel,
  stripSensitiveParams,
  trackPixel,
} from "@/lib/meta-pixel";

/**
 * Mounts the Meta Pixel for the onboarding funnel only. Scrubs any PII from the
 * URL first (a stale /get-started?email=… link redirects here), captures the ad
 * click id into the _fbc cookie (before anything can lose it), ensures an _fbp
 * browser id exists for CAPI matching even when the Pixel is suppressed, boots
 * fbq + PageView, then marks "entered onboarding" with ViewContent. Renders
 * nothing. Copied from the dashboard's app/(public)/start/meta-pixel.tsx.
 */
export function MetaPixel() {
  useEffect(() => {
    stripSensitiveParams();
    captureClickId();
    ensureFbp();
    initPixel();
    trackPixel("ViewContent", { content_name: "onboarding_start" });
  }, []);

  return null;
}
