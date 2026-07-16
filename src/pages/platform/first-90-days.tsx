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
    title: "A starting program",
    description:
      "Start with a day 1, week 1, day 30, day 60, and day 90 structure that your fleet can adjust.",
    icon: CalendarDays,
  },
  {
    title: "Regular check-ins",
    description: "Give follow-up work a clear place in the driver's first months with the fleet.",
    icon: ClipboardCheck,
  },
  {
    title: "Follow-up lessons",
    description: "Send short refresher lessons after orientation instead of waiting for a problem.",
    icon: BookOpen,
  },
  {
    title: "Help where it is needed",
    description:
      "Choose follow-up training when a check-in shows that a driver needs more help with a topic.",
    icon: RefreshCw,
  },
  {
    title: "A consistent response",
    description: "Connect a carrier-recorded event with the follow-up training your team chooses.",
    icon: TriangleAlert,
  },
  {
    title: "Progress through 90 days",
    description: "See where a driver stands in your fleet's day-1-to-90 program.",
    icon: Route,
  },
  {
    title: "One connected record",
    description:
      "Keep completed follow-up training with the driver's other Raisedash training activity.",
    icon: FileCheck,
  },
  {
    title: "Programs that fit the driver",
    description: "Adjust the program around a driver's role, terminal, equipment, or start date.",
    icon: Users,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Start with a clear plan",
    description:
      "Build a day-1-through-90 program around the milestones that matter to your fleet.",
  },
  {
    title: "Set a steady rhythm",
    description:
      "Choose when check-ins and refresher lessons should be assigned during the first 90 days.",
  },
  {
    title: "Follow up where needed",
    description:
      "Choose a targeted refresher when a check-in or quiz shows that a driver needs more help.",
  },
  {
    title: "Keep the follow-up record",
    description:
      "Completed follow-up training will stay with the driver's other Raisedash activity.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What's in a first-90-days program?",
    answer:
      "This workflow is still in development. We are designing milestones for day 1, week 1, day 30, day 60, and day 90, with check-ins and refresher lessons your fleet can adjust.",
  },
  {
    question: "What is the corrective-action loop?",
    answer:
      "We are designing it to connect a carrier-recorded event with a refresher chosen by your team. This workflow is still in development.",
  },
  {
    question: "Can we change the programs, or are they fixed?",
    answer:
      "That is the plan. Fleets will start from a template and adjust it to their own policies and needs.",
  },
  {
    question: "Does the corrective loop decide fault or predict risk?",
    answer:
      "No. The planned workflow does not decide fault or legal responsibility. Your team records the event and chooses any follow-up training.",
  },
  {
    question: "How does this connect to the evidence record?",
    answer:
      "The planned workflow will connect completed follow-up training with the driver's other Raisedash training activity.",
  },
];

export default function First90Days() {
  return (
    <PageLayout
      title="First 90 Days Driver Training — In Development"
      description="A planned workflow for scheduled check-ins and refresher training during a driver's first 90 days with your fleet."
      keywords={[
        "new driver onboarding program trucking",
        "first 90 days driver program",
        "corrective action training fleet",
        "new driver training program",
        "driver onboarding lifecycle",
      ]}
    >
      <PlatformHero
        eyebrow="In development · first 90 days"
        eyebrowIcon={CalendarClock}
        title="Orientation is day one—not the whole journey."
        subhead="Raisedash is building a structured follow-up workflow for the months when a driver is learning your equipment, routes, customers, and expectations."
        vignette={<JourneyTrackVignette />}
      />

      {/* Problem */}
      <PlatformSection eyebrow="The problem" title="The structure often disappears after day one">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              A driver can finish orientation and still need help learning your equipment, routes,
              customers, and expectations. But once the driver is on the road, check-ins often
              depend on someone remembering to make them happen.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed font-normal">
              The gap is usually not a lack of care. It is the lack of a repeatable workflow. We are
              designing a simple way to give follow-up a steady rhythm and keep the work connected
              to the driver's training record.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              Where the gap shows up
            </p>
            <ul className="space-y-3">
              {[
                "No shared plan for the first months",
                "Check-ins that depend on memory",
                "Small concerns that go quiet until they become bigger",
                "Follow-up work separated from the driver's training record",
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
        title="A steady rhythm through the first 90 days"
        lede="This product preview shows the repeatable workflow we are building for follow-up after orientation."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* Corrective action showcase */}
      <PlatformSection
        eyebrow="In development · corrective action"
        title="When something happens, make the response consistent."
        lede="The workflow will connect an event recorded by your carrier with the follow-up training your team chooses."
        align="center"
      >
        <div className="mx-auto max-w-2xl">
          <CorrectiveLoopVignette />
        </div>
      </PlatformSection>

      {/* Feature grid */}
      <PlatformSection
        eyebrow="What we're building"
        title="A simple structure for meaningful follow-up"
      >
        <FeatureGrid features={FEATURES} columns={4} accent="green" />
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="first-90-days" />

      {/* CTA */}
      <PlatformCTA
        title="Show us how your fleet handles the first 90 days."
        subtitle="Book a demo to see Raisedash today and help shape the follow-up workflow we are building."
        footnote="First-90-day programs and corrective-action workflows are still in development."
      />
    </PageLayout>
  );
}
