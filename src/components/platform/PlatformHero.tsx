import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

interface PlatformHeroProps {
  /** Small pillar label shown above the H1, e.g. "Pre-arrival readiness". */
  eyebrow: string;
  eyebrowIcon?: LucideIcon;
  /** The page H1. */
  title: string;
  subhead: string;
  /** Optional CSS-built product vignette rendered to the right on desktop. */
  vignette?: React.ReactNode;
  /** Anchor id the secondary "See how it works" button scrolls to. */
  howItWorksHref?: string;
}

export function PlatformHero({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  subhead,
  vignette,
  howItWorksHref = "#how-it-works",
}: PlatformHeroProps) {
  return (
    <div className="pt-8 pb-8">
      <Container className="bg-card border-border animate-fade-in-scale relative overflow-hidden rounded-xs border px-6 py-10 delay-0 sm:px-12 sm:py-16">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
          <div className="w-full max-w-2xl flex-1">
            <div className="text-muted-foreground border-border bg-background animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide uppercase delay-75">
              {EyebrowIcon ? <EyebrowIcon className="h-3.5 w-3.5" /> : null}
              {eyebrow}
            </div>
            <h1 className="text-foreground animate-fade-in-up text-3xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-4xl md:text-[46px]">
              {title}
            </h1>
            <p className="text-muted-foreground animate-fade-in-up mt-6 max-w-xl text-lg leading-relaxed font-normal delay-150 sm:text-xl">
              {subhead}
            </p>
            <div className="animate-fade-in-up mt-9 flex flex-col gap-3 delay-200 sm:flex-row">
              <Link href="/demo">
                <Button size="lg" className="group w-full gap-2 sm:w-auto">
                  Book a demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </Link>
              <a href={howItWorksHref}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  See how it works
                </Button>
              </a>
            </div>
          </div>

          {vignette ? (
            <div className="animate-fade-in-up w-full flex-1 delay-300">{vignette}</div>
          ) : null}
        </div>
      </Container>
    </div>
  );
}
