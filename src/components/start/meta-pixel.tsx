import { useEffect } from "react";
import { captureClickId, initPixel, trackPixel } from "@/lib/meta-pixel";

/**
 * Mounts the Meta Pixel for the onboarding funnel only. Captures the ad click id
 * into the _fbc cookie first (before anything can lose it), boots fbq + PageView,
 * then marks "entered onboarding" with ViewContent. Renders nothing. Copied from
 * the dashboard's app/(public)/start/meta-pixel.tsx.
 */
export function MetaPixel() {
  useEffect(() => {
    captureClickId();
    initPixel();
    trackPixel("ViewContent", { content_name: "onboarding_start" });
  }, []);

  return null;
}
