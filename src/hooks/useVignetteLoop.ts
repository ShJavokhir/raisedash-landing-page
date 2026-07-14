import { useEffect, useState } from "react";

/**
 * Drives a looping, multi-step product vignette (Ramp-style "living figure").
 * Returns the current step index, advancing every `msPerStep` and wrapping.
 *
 * Respects prefers-reduced-motion: the loop never starts and the vignette
 * rests on its final (complete) state. SSR-safe — the server renders step 0.
 */
export function useVignetteLoop(stepCount: number, msPerStep = 1600): number {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(stepCount - 1);
      return;
    }
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % stepCount);
    }, msPerStep);
    return () => window.clearInterval(id);
  }, [stepCount, msPerStep]);

  return step;
}

export default useVignetteLoop;
