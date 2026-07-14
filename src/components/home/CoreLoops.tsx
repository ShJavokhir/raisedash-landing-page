import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  ShieldCheck,
  CalendarClock,
  RotateCcw,
  LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";

interface Loop {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  icon: LucideIcon;
  /** Icon-chip tint — each loop keeps its own accent across the site. */
  tint: string;
}

const loops: Loop[] = [
  {
    eyebrow: "Pre-arrival readiness",
    title: "They arrive trained and signed.",
    body: "Hire approved, and the driver gets a text. They finish lessons, quizzes, and signatures on their phone before day one. You watch a ready board fill in and know exactly who is prepared for orientation, before anyone books a hotel room.",
    href: "/platform/pre-arrival-readiness",
    linkLabel: "See pre-arrival readiness",
    icon: ClipboardCheck,
    tint: "bg-accent-blue-soft text-accent-blue",
  },
  {
    eyebrow: "The evidence engine",
    title: "The packet, before the lawyer hangs up.",
    body: "Every lesson version, timestamp, quiz attempt, score, and signature is preserved for good. When an auditor, insurer, or attorney asks what a driver was trained on, you assemble a complete, organized record in one click. We never rewrite a driver's history when content changes.",
    href: "/platform/training-evidence",
    linkLabel: "See training evidence",
    icon: ShieldCheck,
    tint: "bg-accent-amber-soft text-accent-amber",
  },
  {
    eyebrow: "First 90 days",
    title: "The riskiest 90 days, managed.",
    body: "Pre-built day-1, week-1, and day-30 / 60 / 90 programs keep reinforcing what matters while a new driver settles in. The stretch where most problems start stops being left to chance.",
    href: "/platform/first-90-days",
    linkLabel: "See the first 90 days",
    icon: CalendarClock,
    tint: "bg-success/10 text-success",
  },
  {
    eyebrow: "Corrective action",
    title: "Something happens? Close the loop.",
    body: "Record an event, whether a crash, a citation, an inspection issue, or a failed road test, and assign targeted refresher training. Completion flows straight into the evidence record your insurer and auditors see.",
    href: "/platform/training-evidence",
    linkLabel: "See how it's documented",
    icon: RotateCcw,
    tint: "bg-destructive/10 text-destructive",
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
          const Icon = loop.icon;
          return (
            <div
              key={loop.eyebrow}
              className="border-border bg-card flex flex-col rounded-xs border p-6 sm:p-8"
            >
              <div
                className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xs ${loop.tint}`}
              >
                <Icon className="h-5 w-5" />
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
                className="text-foreground hover:text-foreground/80 group mt-auto inline-flex items-center gap-1 text-sm transition-colors"
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
