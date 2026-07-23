import type { ComponentType } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { TrainingToolsCard } from "@/components/home/TrainingTools";
import { CorrectiveLoopVignette, LedgerVignette, PipelineVignette } from "@/components/platform";

/**
 * The current readiness and evidence loops, plus one rotating card for the
 * platform's creation and practice tools. The platform vignettes are reused
 * straight from @/components/platform/vignettes so the homepage and platform
 * pages never drift apart.
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
    title: "Start before day one.",
    body: "Send orientation before drivers arrive, so terminal time stays hands-on.",
    href: "/platform/pre-arrival-readiness",
    linkLabel: "Pre-arrival readiness",
    vignette: PipelineVignette,
  },
  {
    eyebrow: "Training records",
    title: "Keep every record together.",
    body: "See what each driver completed and when.",
    href: "/platform/training-evidence",
    linkLabel: "Training records",
    vignette: LedgerVignette,
  },
  {
    eyebrow: "Corrective action in development",
    title: "Follow up after a safety issue.",
    body: "Assign the right training and save the response to the driver record.",
    href: "/platform/training-evidence",
    linkLabel: "Corrective action",
    vignette: CorrectiveLoopVignette,
  },
];

function LoopCard({ loop }: { loop: Loop }) {
  const Vignette = loop.vignette;

  return (
    <div className="border-border bg-card hover:border-foreground/20 flex flex-col rounded-xs border p-6 transition-colors duration-200 sm:p-8">
      {/* The living product vignette — reused from its platform page.
          Extra bottom room clears the pipeline card's floating SMS chip. */}
      <div className="mb-9">
        <Vignette />
      </div>
      <p className="text-muted-foreground mb-2 text-xs font-normal tracking-wide uppercase">
        {loop.eyebrow}
      </p>
      <h3 className="text-foreground mb-3 text-xl font-normal tracking-[-0.01em]">{loop.title}</h3>
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
}

export function CoreLoops() {
  return (
    <Container className="pt-6 pb-12 md:px-0">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
          Prepare drivers. Keep the record.
        </h2>
        <p className="text-muted-foreground mt-3 text-lg">
          Start before day one, keep training on track, and see what each driver completed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <LoopCard loop={loops[0]} />
        <TrainingToolsCard />
        <LoopCard loop={loops[2]} />
        <LoopCard loop={loops[1]} />
      </div>
    </Container>
  );
}

export default CoreLoops;
