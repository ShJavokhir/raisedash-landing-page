import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import {
  CorrectiveLoopVignette,
  JourneyTrackVignette,
  LedgerVignette,
  PipelineVignette,
} from "@/components/platform";

/**
 * The four core loops, each headed by the same living product vignette that
 * headlines its platform page — the readiness pipeline, the self-writing
 * evidence ledger, the 90-day journey track, and the corrective loop closing.
 * The vignettes are reused straight from @/components/platform/vignettes so the
 * homepage and the platform pages never drift apart. They're pure CSS/token
 * mockups (no images), loop on their own, and rest on their final frame under
 * prefers-reduced-motion.
 */

interface Loop {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  vignette: ComponentType;
}

const loops: Loop[] = [
  {
    eyebrow: "Pre-arrival readiness",
    title: "Start orientation before terminal day.",
    body: "Give new hires the information they need before they arrive, so in-person time can focus on road tests, equipment, and the work that belongs at the terminal.",
    href: "/platform/pre-arrival-readiness",
    linkLabel: "See pre-arrival readiness",
    vignette: PipelineVignette,
  },
  {
    eyebrow: "Training evidence",
    title: "Know what happened—and keep the record.",
    body: "Keep training activity and results together under each driver, so your team can answer what was completed and when without rebuilding the story.",
    href: "/platform/training-evidence",
    linkLabel: "See training evidence",
    vignette: LedgerVignette,
  },
  {
    eyebrow: "First 90 days · in development",
    title: "Keep new drivers supported after day one.",
    body: "Plan check-ins and follow-up training while drivers are learning your routes, equipment, customers, and expectations.",
    href: "/platform/first-90-days",
    linkLabel: "See the first 90 days",
    vignette: JourneyTrackVignette,
  },
  {
    eyebrow: "Corrective action · in development",
    title: "Turn a safety issue into a documented response.",
    body: "Connect an event with the right follow-up and keep the response with the driver's training history.",
    href: "/platform/training-evidence",
    linkLabel: "See how it's documented",
    vignette: CorrectiveLoopVignette,
  },
];

export function CoreLoops() {
  return (
    <Container className="pt-6 pb-12 md:px-0">
      <div className="mb-8 max-w-2xl">
        <p className="text-muted-foreground mb-3 text-sm font-normal tracking-wide uppercase">
          The driver readiness platform
        </p>
        <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
          From approved hire to a record you can stand behind.
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          Raisedash connects the work before orientation, during a driver&apos;s first months, and
          after a safety issue—so readiness does not depend on memory, paperwork, or scattered
          systems.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {loops.map((loop) => {
          const Vignette = loop.vignette;
          return (
            <div
              key={loop.eyebrow}
              className="border-border bg-card hover:border-foreground/20 flex flex-col rounded-xs border p-6 transition-colors duration-200 sm:p-8"
            >
              {/* The living product vignette — reused from its platform page.
                  Extra bottom room clears the pipeline card's floating SMS chip. */}
              <div className="mb-9">
                <Vignette />
              </div>
              <p className="text-muted-foreground mb-2 text-xs font-normal tracking-wide uppercase">
                {loop.eyebrow}
              </p>
              <h3 className="text-foreground mb-3 text-xl font-normal tracking-[-0.01em]">
                {loop.title}
              </h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{loop.body}</p>
              <Link
                href={loop.href}
                className="bg-primary text-primary-foreground border-primary group mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm transition-[background-color,border-color,transform] duration-150 hover:border-[#3b3a33] hover:bg-[#3b3a33] active:scale-[0.97] motion-reduce:active:scale-100"
              >
                {loop.linkLabel}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default CoreLoops;
