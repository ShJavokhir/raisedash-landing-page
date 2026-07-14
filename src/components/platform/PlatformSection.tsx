import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

interface PlatformSectionProps {
  id?: string;
  eyebrow?: string;
  eyebrowIcon?: LucideIcon;
  title?: string;
  /** Optional intro paragraph under the title. */
  lede?: string;
  align?: "left" | "center";
  className?: string;
  /** Extra classes for the heading block (spacing tweaks). */
  headingClassName?: string;
  children?: React.ReactNode;
}

/**
 * Standard titled section used across every platform page: an uppercase
 * eyebrow, an H2, an optional lede, then arbitrary content. Keeps section
 * rhythm and heading treatment identical on all four pages.
 */
export function PlatformSection({
  id,
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  lede,
  align = "left",
  className,
  headingClassName,
  children,
}: PlatformSectionProps) {
  const hasHeading = eyebrow || title || lede;
  return (
    <Container id={id} className={cn("scroll-mt-24 py-12 md:px-0", className)}>
      {hasHeading ? (
        <div
          className={cn(
            "mb-10",
            align === "center" && "mx-auto max-w-3xl text-center",
            headingClassName
          )}
        >
          {eyebrow ? (
            <p
              className={cn(
                "text-muted-foreground mb-3 flex items-center gap-2 text-xs tracking-wide uppercase",
                align === "center" && "justify-center"
              )}
            >
              {EyebrowIcon ? <EyebrowIcon className="h-3.5 w-3.5" /> : null}
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl md:text-4xl">
              {title}
            </h2>
          ) : null}
          {lede ? (
            <p
              className={cn(
                "text-muted-foreground mt-3 max-w-2xl text-lg leading-relaxed font-normal",
                align === "center" && "mx-auto"
              )}
            >
              {lede}
            </p>
          ) : null}
        </div>
      ) : null}
      {children}
    </Container>
  );
}
