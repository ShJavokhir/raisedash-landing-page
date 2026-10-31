import type * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Screenshots of the real app on /products/freight-payroll, each a white card
 * on the Freight Payroll plate (the homepage card's color, light and grain,
 * `.product-plate`). They show the Ridgeline Freight demo company, the same
 * people and numbers as the hero film and the Telegram figure; the seed and
 * the capture script are in raisedash-new/marketing/landing-shots/payroll.
 * The product UI is English, so the images stay English in every locale.
 */

/** The Freight Payroll card's plate on the homepage (src/data/products.ts). */
export const PAYROLL_PLATE = "#8c6a1c";

/** Rotates the plate's light source so neighbouring plates don't look stamped (as on the homepage). */
const PLATE_LIGHT = ["", "product-plate-light-b", "product-plate-light-c"];

export function ScreenPlate({
  src,
  width,
  height,
  alt,
  index,
  plateClass,
  cardClass,
  sizes,
}: {
  src: string;
  /** The file's pixels (2x the app's CSS pixels). */
  width: number;
  height: number;
  alt: string;
  /** Position in the section, for the light rotation. */
  index: number;
  /** The plate's shape at each breakpoint. */
  plateClass: string;
  /** Where the card sits on the plate: centered, or a zoomed crop that runs off the edges on phones. */
  cardClass: string;
  sizes: string;
}) {
  return (
    <div
      style={{ "--plate-bg": PAYROLL_PLATE } as React.CSSProperties}
      className={cn(
        "product-plate rounded-xs",
        PLATE_LIGHT[index % PLATE_LIGHT.length],
        plateClass
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={cn(
          "h-auto max-w-none rounded-md bg-white shadow-[0_24px_48px_-20px_rgb(0_0_0/0.5)] ring-1 ring-black/10",
          cardClass
        )}
      />
    </div>
  );
}
