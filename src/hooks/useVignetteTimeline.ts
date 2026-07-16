import { useEffect, useState } from "react";

/**
 * Drives a looping product vignette whose beats have *different* lengths —
 * a signature takes longer to draw than a chip takes to fly. Pass one
 * duration per step; the hook advances through them and wraps.
 *
 * Respects prefers-reduced-motion (rests on the final, complete step) and is
 * SSR-safe (the server renders step 0). Optionally starts only once the
 * scene has scrolled into view, so off-screen scenes don't churn.
 */
export function useVignetteTimeline(
  stepDurationsMs: number[],
  options: { startInView?: React.RefObject<Element | null> } = {}
): number {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const startInView = options.startInView;

  // The durations array is a fresh literal each render; its serialized form
  // is stable, so effects key on (and parse from) the signature instead.
  const signature = stepDurationsMs.join(",");

  useEffect(() => {
    if (started) return;
    const el = startInView?.current;
    if (el && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }
    // Nothing to observe — start immediately (next tick keeps React happy).
    const id = window.setTimeout(() => setStarted(true), 0);
    return () => window.clearTimeout(id);
  }, [started, startInView]);

  useEffect(() => {
    if (!started) return;
    const durations = signature.split(",").map(Number);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(durations.length - 1);
      return;
    }
    let index = 0;
    let timer = 0;
    const advance = () => {
      timer = window.setTimeout(() => {
        index = (index + 1) % durations.length;
        setStep(index);
        advance();
      }, durations[index]);
    };
    setStep(0);
    advance();
    return () => window.clearTimeout(timer);
  }, [started, signature]);

  return step;
}

export default useVignetteTimeline;
