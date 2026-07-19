import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { otherFeaturePages } from "./pages";

interface FeatureCrossLinksProps {
  currentSlug: string;
}

export function FeatureCrossLinks({ currentSlug }: FeatureCrossLinksProps) {
  const pages = otherFeaturePages(currentSlug);
  return (
    <Container className="py-12 md:px-0">
      <div className="mb-8">
        <p className="text-muted-foreground mb-3 text-xs tracking-wide uppercase">
          Explore the generators
        </p>
        <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
          Four ways Raisedash generates training
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {pages.map((page) => {
          const Icon = page.icon;
          return (
            <Link key={page.slug} href={page.path} className="group block">
              <div className="bg-card border-border hover:bg-surface-2 flex h-full flex-col rounded-xs border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5">
                <div className="bg-surface-2 border-border text-foreground mb-4 flex h-10 w-10 items-center justify-center rounded-xs border">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-normal tracking-[-0.02em]">
                  {page.label}
                </h3>
                <p className="text-muted-foreground mb-5 flex-1 text-sm leading-relaxed font-normal">
                  {page.tagline}
                </p>
                <span className="text-foreground group-hover:text-foreground/80 mt-auto inline-flex items-center gap-1 text-sm transition-colors">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="text-muted-foreground mt-6 text-sm">
        Everything generated here is assigned, tracked, and recorded like any other Raisedash
        training. See{" "}
        <Link
          href="/platform/training-evidence"
          className="text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
        >
          training evidence
        </Link>{" "}
        and{" "}
        <Link
          href="/platform/driver-experience"
          className="text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]"
        >
          driver experience
        </Link>
        .
      </p>
    </Container>
  );
}
