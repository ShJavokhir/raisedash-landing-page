import { cn } from "@/lib/cn";

/**
 * The brand motif: a scanline-dithered semi truck (public/brand/
 * truck-halftone.png, generated from silhouette art and dithered into
 * horizontal speed-line dashes). The PNG is pure alpha and painted with
 * currentColor via CSS mask, so it follows the theme in light and dark.
 *
 * Decorative only — always aria-hidden, always behind content. Use sparingly:
 * one per page, low opacity.
 */
export function HalftoneTruck({
  className,
  flip = false,
}: {
  className?: string;
  /** Mirror horizontally so the truck faces right (source art faces left). */
  flip?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      style={{
        aspectRatio: "1200 / 675",
        WebkitMaskImage: "url(/brand/truck-halftone.png)",
        maskImage: "url(/brand/truck-halftone.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        backgroundColor: "currentColor",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    />
  );
}

export default HalftoneTruck;
