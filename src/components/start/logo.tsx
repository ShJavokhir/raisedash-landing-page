import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Hosted Raisedash brand mark — metallic shield on a black tile with transparent corners. */
const LOGO_SRC = "https://cdn.raisedash.com/media/landing/logo.webp";

interface LogoProps {
  /** Square px size of the mark. Defaults to 28 (the primary header/sidebar size). */
  size?: number;
  /**
   * Wordmark rendered next to the mark. Defaults to "Raisedash"; pass a node to
   * customize (e.g. an "Internal" suffix) or `false` for the mark on its own.
   */
  wordmark?: ReactNode;
  /** Classes for the outer wrapper (layout, spacing). */
  className?: string;
  /** Classes for the wordmark text. */
  wordmarkClassName?: string;
  /** Preload and skip lazy-loading — use for above-the-fold chrome. */
  priority?: boolean;
}

/**
 * The Raisedash logo lockup: the hosted mark (via next/image) plus an optional
 * wordmark. When the wordmark is visible the image is decorative (empty alt) so
 * assistive tech announces the brand name once, not twice. Copied from the
 * dashboard's components/app/logo.tsx.
 */
export function Logo({
  size = 28,
  wordmark = "Raisedash",
  className,
  wordmarkClassName,
  priority = false,
}: LogoProps) {
  const showWordmark = wordmark !== false && wordmark !== null && wordmark !== "";
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <Image
        src={LOGO_SRC}
        alt={showWordmark ? "" : "Raisedash"}
        width={size}
        height={size}
        priority={priority}
        className="shrink-0"
      />
      {showWordmark ? (
        <span className={cn("text-base font-semibold tracking-tight", wordmarkClassName)}>
          {wordmark}
        </span>
      ) : null}
    </span>
  );
}
