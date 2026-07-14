import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

interface PlatformCTAProps {
  title: string;
  subtitle: string;
  /** Text for the small line under the buttons (optional reassurance). */
  footnote?: string;
}

/**
 * Closing call-to-action card that points to the /demo lead funnel. Shared so
 * every platform page ends on the same note and visual.
 */
export function PlatformCTA({ title, subtitle, footnote }: PlatformCTAProps) {
  return (
    <Container className="pb-16 md:px-0">
      <div className="bg-card border-border rounded-xs border p-8 text-center sm:p-12">
        <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
          {title}
        </h2>
        <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg leading-relaxed">
          {subtitle}
        </p>
        <div className="flex justify-center">
          <Link href="/demo">
            <Button size="lg" className="group gap-2">
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
        {footnote ? <p className="text-muted-foreground mt-5 text-sm">{footnote}</p> : null}
      </div>
    </Container>
  );
}
