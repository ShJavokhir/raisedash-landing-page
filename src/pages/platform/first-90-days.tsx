import {
  BookOpen,
  CalendarClock,
  CalendarDays,
  ClipboardCheck,
  FileCheck,
  RefreshCw,
  Route,
  TriangleAlert,
  Users,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  CorrectiveLoopVignette,
  CrossLinks,
  FaqSection,
  FeatureGrid,
  JourneyTrackVignette,
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
