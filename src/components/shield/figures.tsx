import type * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Figures for /products/shield: real captures of the extension (version
 * 0.1.2, captured by cargo-security/scripts/store-assets.mjs on inert local
 * pages with made-up scam hosts), each on the Shield plate. The extension's
 * UI is English, so the images stay English in every locale.
 */

/** The Shield card's plate on the homepage (src/data/products.ts). */
export const SHIELD_PLATE = "#315b50";

/** Rotates the plate's light source so neighbouring plates don't look stamped (as on the homepage). */
const PLATE_LIGHT = ["", "product-plate-light-b", "product-plate-light-c"];

export function ShieldPlate({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{ "--plate-bg": SHIELD_PLATE } as React.CSSProperties}
      className={cn("product-plate rounded-xs", PLATE_LIGHT[index % PLATE_LIGHT.length], className)}
    >
      {children}
    </div>
  );
}

/**
 * One guard: the extension's warning card at a size you can read, under the
 * made-up scam address it appeared on. (The hero film shows whole pages; at
 * half the page width a full capture shrinks the card's text past reading.)
 */
export function GuardFigure({
  name,
  url,
  alt,
  index,
}: {
  /** File stem in public/images/shield: <name>-card.webp (872 wide, transparent around the card's shadow). */
  name: string;
  /** The made-up scam address: host, then path. */
  url: [string, string];
  alt: string;
  index: number;
}) {
  return (
    <ShieldPlate
      index={index}
      className="flex flex-col items-center justify-center gap-3 px-5 py-8 sm:min-h-[460px] sm:py-10"
    >
      <span className="max-w-full truncate rounded-full bg-white/90 px-3.5 py-1 font-mono text-xs text-[#59636e] shadow-sm ring-1 ring-black/10">
        <span className="text-[#1f2328]">{url[0]}</span>
        {url[1]}
      </span>
      <Image
        src={`/images/shield/${name}-card.webp`}
        alt={alt}
        width={872}
        height={CARD_HEIGHTS[name] ?? 868}
        sizes="(min-width: 640px) 436px, 90vw"
        className="h-auto w-full max-w-[436px]"
      />
    </ShieldPlate>
  );
}

/** Pixel heights of the card-only captures (all 872 wide). */
const CARD_HEIGHTS: Record<string, number> = {
  phishing: 826,
  documents: 826,
  download: 868,
  clickfix: 966,
};
