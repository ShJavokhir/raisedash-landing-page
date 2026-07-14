import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  CalendarDays,
  Check,
  ClipboardCheck,
  FileCheck,
  Lock,
  RefreshCw,
  Route,
  TriangleAlert,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useVignetteLoop } from "@/hooks/useVignetteLoop";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  BrowserFrame,
  CrossLinks,
  FaqSection,
  FeatureGrid,
  PlatformCTA,
  PlatformHero,
  PlatformSection,
  StepList,
  type PlatformFaq,
  type PlatformFeature,
  type PlatformStep,
} from "@/components/platform";

const FEATURES: PlatformFeature[] = [
  {
    title: "Pre-built programs",
    description:
      "Day 1, week 1, day 30, day 60, and day 90 come ready to run. You customize from a template instead of building a curriculum from a blank page.",
    icon: CalendarDays,
  },
  {
    title: "Scheduled check-ins",
    description:
      "Structured check-ins release on schedule, so a new driver's early weeks are actively managed — not left to whenever someone remembers.",
    icon: ClipboardCheck,
  },
  {
    title: "Reinforcement lessons",
    description:
      "Short refreshers reinforce the topics that matter most in the weeks after a driver actually starts running loads.",
    icon: BookOpen,
  },
  {
    title: "Early remedial training",
    description:
      "When a quiz or a check-in surfaces a gap, a targeted lesson goes out early — before a rough habit sets in.",
    icon: RefreshCw,
  },
  {
    title: "The corrective-action loop",
    description:
      "Record a crash, citation, inspection issue, or failed road test, assign a matching refresher, and completion flows straight into the evidence record.",
    icon: TriangleAlert,
  },
  {
    title: "Milestone visibility",
    description:
      "See where every new driver stands against the day-1-to-90 program from a single view.",
    icon: Route,
  },
  {
    title: "Completion flows to the record",
    description:
      "Everything a driver finishes in their first 90 days lands in the same permanent, exportable record as the rest of their history.",
    icon: FileCheck,
  },
  {
    title: "Assign by role or terminal",
    description:
      "Programs apply by role, terminal, equipment, or start date, so the right drivers get the right sequence automatically.",
    icon: Users,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Pick a program template",
    description:
      "Start from a pre-built day-1-through-90 program and adjust it to your policies and routes. There's no blank LMS to fill — the opinionated starting point is the point.",
  },
  {
    title: "It runs on a schedule",
    description:
      "Check-ins, reinforcement lessons, and milestone tasks release on day 1, week 1, day 30, day 60, and day 90 — automatically, without anyone tracking dates on a whiteboard.",
  },
  {
    title: "Gaps trigger training early",
    description:
      "When a check-in or a quiz shows a weak spot, a targeted refresher goes out while it's still early in the driver's tenure.",
  },
  {
    title: "Completion lands in the record",
    description:
      "Every finished lesson, refresher, and corrective assignment flows into the driver's permanent, exportable evidence record.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What's in a first-90-days program?",
    answer:
      "Pre-built sequences for day 1, week 1, day 30, day 60, and day 90 — check-ins, reinforcement lessons, and early remedial training. You start from a template and customize it, rather than building from an empty course list.",
  },
  {
    question: "What is the corrective-action loop?",
    answer:
      "When something happens on the road — a crash, a citation, a roadside inspection issue, a failed road test — you record the event, assign a matching refresher, and the driver completes it on their phone. The completion lands in their evidence record automatically.",
  },
  {
    question: "Can we change the programs, or are they fixed?",
    answer:
      "You customize them. The templates give a one-person safety department an opinionated starting point instead of a blank curriculum, but every program is yours to adjust.",
  },
  {
    question: "Does the corrective loop decide fault or predict risk?",
    answer:
      "No. It's a clean, documented workflow: you record the event and choose the training. Raisedash doesn't assign blame or run a predictive risk score — it makes the intervention consistent and the documentation complete.",
  },
  {
    question: "How does this connect to the evidence record?",
    answer:
      "Everything completed in the first 90 days — and every corrective assignment after — flows into the same permanent, version-locked record you can export for any driver.",
  },
];

const MILESTONES = [
  { label: "Day 1", title: "Orientation wrap-up", meta: "Facility walkthrough · 3 short lessons" },
  { label: "Week 1", title: "Policy check-in", meta: "Backing & docking refresher" },
  { label: "Day 30", title: "Reinforcement + check-in", meta: "Manager check-in · short quiz" },
  { label: "Day 60", title: "Reinforcement", meta: "Route & fuel habits lesson" },
  { label: "Day 90", title: "Review + graduation", meta: "Full record archived to evidence" },
];

/**
 * The 90-day journey as a milestone track that fills in as the loop plays —
 * the riskiest period of a driver's career, visibly managed. Green accent.
 */
function JourneyTrackVignette() {
  const step = useVignetteLoop(6, 1400);
  const current = Math.min(step, MILESTONES.length - 1);
  const complete = step >= MILESTONES.length;
  const milestone = MILESTONES[current];

  return (
    <BrowserFrame url="app.raisedash.com/programs">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-foreground text-sm font-normal">New driver program</p>
          <p className="text-muted-foreground mt-0.5 text-xs">J. Okafor · started Jun 30</p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] transition-colors duration-300",
            complete ? "bg-success/10 text-success" : "bg-surface-3 text-foreground"
          )}
        >
          <CalendarClock className="h-3 w-3" />
          {complete ? "Program complete" : milestone.label}
        </span>
      </div>

      {/* Milestone track */}
      <div className="mb-4 flex items-center px-1">
        {MILESTONES.map((m, i) => {
          const done = complete || i < current;
          const active = !complete && i === current;
          return (
            <div key={m.label} className={cn("flex items-center", i > 0 && "flex-1")}>
              {i > 0 ? (
                <div
                  className={cn(
                    "h-px flex-1 transition-colors duration-500",
                    done || active ? "bg-success/60" : "bg-border"
                  )}
                />
              ) : null}
              <div className="flex flex-col items-center gap-1 px-0.5">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300",
                    done
                      ? "border-success bg-success text-success-foreground"
                      : active
                        ? "border-success bg-success/10 text-success animate-pulse-soft"
                        : "border-border bg-surface-2 text-muted-foreground"
                  )}
                >
                  {done ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
                <span
                  className={cn(
                    "text-[9px] whitespace-nowrap",
                    done || active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {m.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current milestone detail */}
      <div
        key={complete ? "complete" : milestone.label}
        className="animate-vignette-in border-border bg-surface-2 rounded-xs border px-3 py-2.5"
      >
        {complete ? (
          <div className="flex items-center gap-2.5">
            <span className="bg-success/10 text-success flex h-7 w-7 items-center justify-center rounded-xs">
              <FileCheck className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-foreground text-xs font-normal">90 days, fully documented</p>
              <p className="text-muted-foreground text-[10px]">
                Every check-in and lesson is in the evidence record
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="bg-success/10 text-success flex h-7 w-7 items-center justify-center rounded-xs">
              <ClipboardCheck className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-foreground text-xs font-normal">
                {milestone.label} · {milestone.title}
              </p>
              <p className="text-muted-foreground text-[10px]">{milestone.meta}</p>
            </div>
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}

const LOOP_STAGES = [
  {
    icon: TriangleAlert,
    title: "Event recorded",
    meta: "Roadside inspection issue · Tue 2:14 PM",
    tone: "border-destructive/40 bg-destructive/10 text-destructive",
    iconTone: "bg-destructive/10 text-destructive",
  },
  {
    icon: RefreshCw,
    title: "Refresher assigned",
    meta: "Targeted lesson texted to driver",
    tone: "border-accent-blue/40 bg-accent-blue-soft text-accent-blue",
    iconTone: "bg-accent-blue-soft text-accent-blue",
  },
  {
    icon: FileCheck,
    title: "Completed · quiz passed",
    meta: "Done on the driver's phone",
    tone: "border-success/40 bg-success/10 text-success",
    iconTone: "bg-success/10 text-success",
  },
];

/**
 * The corrective-action loop, played in sequence: a red event becomes a blue
 * assignment, a green completion, and an amber entry in the evidence record.
 */
function CorrectiveLoopVignette() {
  const step = useVignetteLoop(5, 1300);
  const activeStage = Math.min(step, LOOP_STAGES.length - 1);
  const sealed = step >= 3;

  return (
    <BrowserFrame url="app.raisedash.com/corrective-action">
      <div className="mb-4">
        <p className="text-foreground text-sm font-normal">Corrective action — S. Patel</p>
        <p className="text-muted-foreground mt-0.5 text-xs">Close the loop, and document it</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {LOOP_STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const reached = index <= activeStage;
          const isActive = index === activeStage && !sealed;
          return (
            <div key={stage.title} className="flex flex-1 items-stretch gap-2">
              <div
                className={cn(
                  "flex flex-1 flex-col rounded-xs border p-3 transition-all duration-500",
                  reached
                    ? "border-border bg-surface-2 opacity-100"
                    : "border-border/50 opacity-40",
                  isActive && "animate-vignette-in"
                )}
              >
                <span
                  className={cn(
                    "mb-2 flex h-7 w-7 items-center justify-center rounded-xs transition-colors duration-300",
                    reached ? stage.iconTone : "bg-surface-3 text-muted-foreground",
                    isActive && "animate-pulse-soft"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <p className="text-foreground text-xs font-normal">{stage.title}</p>
                <p className="text-muted-foreground mt-0.5 text-[10px] leading-snug">
                  {stage.meta}
                </p>
              </div>
              {index < LOOP_STAGES.length - 1 ? (
                <div className="hidden items-center sm:flex">
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-colors duration-300",
                      index < activeStage ? "text-foreground" : "text-muted-foreground/50"
                    )}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* The loop's landing place: the evidence record (slot height reserved) */}
      <div className="mt-3 min-h-[2.25rem]">
        {sealed ? (
          <div className="animate-vignette-in border-accent-amber/40 bg-accent-amber-soft flex items-center gap-2 rounded-xs border px-3 py-2">
            <Lock className="text-accent-amber h-3.5 w-3.5 flex-shrink-0" />
            <p className="text-foreground text-xs">
              Sealed into the evidence record — the insurer sees the whole loop at renewal
            </p>
          </div>
        ) : null}
      </div>
    </BrowserFrame>
  );
}

export default function First90Days() {
  return (
    <PageLayout
      title="First 90 Days — New Driver Onboarding Program"
      description="Pre-built day-1, week-1, and day-30/60/90 programs that actively manage a new driver's riskiest stretch — plus a corrective-action loop that turns any road event into targeted refresher training, documented in the evidence record."
      keywords={[
        "new driver onboarding program trucking",
        "first 90 days driver program",
        "corrective action training fleet",
        "new driver training program",
        "driver onboarding lifecycle",
      ]}
    >
      <PlatformHero
        eyebrow="First 90 days"
        eyebrowIcon={CalendarClock}
        title="The riskiest 90 days of a driver's career, actively managed."
        subhead="A new driver's first months are where problems start — and where most fleets go quiet until something goes wrong. Raisedash runs pre-built day-1-through-90 programs, and turns any road event into targeted refresher training that lands in the record."
        vignette={<JourneyTrackVignette />}
      />

      {/* Problem */}
      <PlatformSection eyebrow="The problem" title="Orientation ends. Then what?">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              A driver finishes orientation and heads out. For most fleets, the structured attention
              stops right there. The next real touchpoint is often an incident — a citation, a hard
              roadside inspection, a preventable accident — in the exact window when a new driver is
              still learning your equipment, your routes, and your customers.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed font-normal">
              The riskiest period is the least managed. Not because anyone means to ignore it, but
              because nobody has time to hand-run a 90-day plan for every new hire.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              Where the gap shows up
            </p>
            <ul className="space-y-3">
              {[
                "No structured follow-up after day one",
                "Refreshers that depend on someone remembering to send them",
                "Road events handled ad hoc, then forgotten",
                "Nothing tying the response back to a documented record",
              ].map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                >
                  <span className="bg-foreground/40 mt-2 h-1 w-1 flex-shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PlatformSection>

      {/* How it works */}
      <PlatformSection
        id="how-it-works"
        eyebrow="How it works"
        title="A program that runs itself, from day 1 to day 90"
        lede="Start from a template, let the schedule do the work, and close the loop when something happens on the road."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* Corrective action showcase */}
      <PlatformSection
        eyebrow="Corrective action"
        title="Something happens on the road? Close the loop — and document it."
        lede="Record the event, assign the matching refresher, and the completion flows into the same evidence record an insurer sees at renewal."
        align="center"
      >
        <div className="mx-auto max-w-2xl">
          <CorrectiveLoopVignette />
        </div>
      </PlatformSection>

      {/* Feature grid */}
      <PlatformSection
        eyebrow="What's inside"
        title="Structure for the first months, not just the first day"
      >
        <FeatureGrid features={FEATURES} columns={4} accent="green" />
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="first-90-days" />

      {/* CTA */}
      <PlatformCTA
        title="See a first-90-days program and the corrective loop in action."
        subtitle="Book a demo and walk through a new driver's journey from day 1 to day 90 — including what happens after a road event."
        footnote="Opinionated templates you customize. No blank curriculum to build."
      />
    </PageLayout>
  );
}
