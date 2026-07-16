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
    title: "They arrive trained and signed.",
    body: "Hire approved, and the driver gets a text. They finish lessons, quizzes, and signatures on their phone before day one. You watch a ready board fill in and know exactly who is prepared for orientation, before anyone books a hotel room.",
    href: "/platform/pre-arrival-readiness",
    linkLabel: "See pre-arrival readiness",
    vignette: PipelineVignette,
  },
  {
    eyebrow: "The evidence engine",
    title: "The packet, before the lawyer hangs up.",
    body: "Every lesson version, timestamp, quiz attempt, score, and signature is preserved for good. When an auditor, insurer, or attorney asks what a driver was trained on, you assemble a complete, organized record in one click. We never rewrite a driver's history when content changes.",
    href: "/platform/training-evidence",
    linkLabel: "See training evidence",
    vignette: LedgerVignette,
  },
  {
    eyebrow: "First 90 days",
    title: "The riskiest 90 days, managed.",
    body: "Pre-built day-1, week-1, and day-30 / 60 / 90 programs keep reinforcing what matters while a new driver settles in. The stretch where most problems start stops being left to chance.",
    href: "/platform/first-90-days",
    linkLabel: "See the first 90 days",
    vignette: JourneyTrackVignette,
  },
  {
    eyebrow: "Corrective action",
    title: "Something happens? Close the loop.",
    body: "Record an event, whether a crash, a citation, an inspection issue, or a failed road test, and assign targeted refresher training. Completion flows straight into the evidence record your insurer and auditors see.",
    href: "/platform/training-evidence",
    linkLabel: "See how it's documented",
    vignette: CorrectiveLoopVignette,
  },
];

export function CoreLoops() {
  return (
    <Container className="pb-12 md:px-0">
      <div className="mb-8 max-w-2xl">
        <p className="text-muted-foreground mb-3 text-sm font-normal tracking-wide uppercase">
          The platform
        </p>
        <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
          One system, from applicant-approved to day 90.
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          Four loops that get drivers ready, prove it, and keep it that way.
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
