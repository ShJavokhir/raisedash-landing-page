import {
  BellRing,
  Languages,
  ListChecks,
  RotateCcw,
  Send,
  Smartphone,
  Users,
  WifiOff,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  CrossLinks,
  FaqSection,
  FeatureGrid,
  PipelineVignette,
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
    title: "Reach drivers directly",
    description: "Send each approved new hire a clear orientation invite by text or email.",
    icon: Send,
  },
  {
    title: "Make it easy to begin",
    description: "Drivers open orientation in their phone browser, with no app to download.",
    icon: Smartphone,
  },
  {
    title: "Know who is ready",
    description: "See who has not started, who is working, and who finished before arrival.",
    icon: ListChecks,
  },
  {
    title: "Keep your orientation consistent",
    description:
      "Give every new hire the same videos, policy material, and checks for understanding.",
    icon: Languages,
  },
  {
    title: "Let drivers finish in stages",
    description: "Progress saves, so drivers can stop and return without starting over.",
    icon: RotateCcw,
  },
  {
    title: "Remove password trouble",
    description: "A one-time code gets drivers in without another password to create or remember.",
    icon: WifiOff,
  },
  {
    title: "Handle one hire or a class",
    description: "Prepare one driver or a group of incoming drivers from the same place.",
    icon: Users,
  },
  {
    title: "Keep the training record",
    description:
      "Keep assignments, results, dates, activity, and certificates together for each driver.",
    icon: BellRing,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Prepare one clear orientation",
    description:
      "Organize the policy material, videos, and knowledge checks every approved new hire should complete.",
  },
  {
    title: "Start before terminal day",
    description:
      "Assign orientation as soon as the hire is approved, then send a direct link by text or email.",
  },
  {
    title: "See who needs attention",
    description:
      "Follow progress before arrival so your team can help the drivers who are behind instead of chasing everyone.",
  },
  {
    title: "Use terminal time where it matters",
    description:
      "Walk into orientation knowing what is complete, then focus on road tests, equipment, and hands-on work.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "Do drivers need to download an app?",
    answer:
      "No. Training opens in the phone's web browser. Drivers sign in with a one-time code instead of creating a password.",
  },
  {
    question: "Can we invite drivers by text?",
    answer:
      "Yes. You can send an invite by SMS or email, depending on the contact information you have for the driver.",
  },
  {
    question: "Where does the training content come from?",
    answer:
      "Bring the videos and policy text your fleet already uses. You can organize that material into phone-friendly lessons and quizzes in Raisedash.",
  },
  {
    question: "How do we know a driver is ready for terminal day?",
    answer:
      "Your team can see what was assigned, what is still in progress, what was completed, and the driver's quiz results. You decide what must be finished before the driver arrives.",
  },
  {
    question: "Does this replace hands-on orientation at the terminal?",
    answer:
      "No. Use it for the parts of orientation that work well as video, reading, and quizzes. Road tests, equipment checks, and other hands-on work still happen through your normal process.",
  },
];

export default function PreArrivalReadiness() {
  return (
    <PageLayout
      title="Driver Orientation Software for Trucking Fleets"
      description="Prepare approved new hires before terminal day, see who is ready, and keep each driver's orientation record in one place."
      keywords={[
        "driver orientation software",
        "pre-hire onboarding for trucking",
        "new driver orientation checklist",
        "trucking driver onboarding",
        "pre-arrival driver readiness",
      ]}
    >
      <PlatformHero
        eyebrow="Pre-arrival readiness"
        eyebrowIcon={Send}
        title="Start orientation before terminal day."
        subhead="Prepare new drivers before they travel, so your team knows who is ready and can use terminal time for road tests, equipment, and hands-on work."
        vignette={<PipelineVignette />}
      />

      {/* Problem — the safety director's Monday */}
      <PlatformSection eyebrow="The problem" title="Orientation should not start from zero">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              When a new driver arrives unprepared, the whole day slows down. Your safety team
              repeats basic policies, rearranges the schedule, and tries to work out what the driver
              has already seen.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed font-normal">
              For a small or midsize fleet, that lost time adds up quickly. A simple view of who is
              ready lets your team plan the day, follow up earlier, and spend in-person time on the
              work that must happen at the terminal.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              What that costs you
            </p>
            <ul className="space-y-3">
              {[
                "Terminal time lost to material that could be covered earlier",
                "Late surprises when a driver has not finished",
                "Extra calls, emails, and spreadsheet checks",
                "No shared answer to who is ready for orientation day",
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
        title="From approved hire to a more useful orientation day"
        lede="Raisedash moves the repeatable parts of orientation earlier and gives your team a clear view before the driver arrives."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* Feature grid */}
      <PlatformSection eyebrow="What supports it" title="Simple for drivers. Clear for your team.">
        <FeatureGrid features={FEATURES} columns={4} accent="blue" />
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="pre-arrival-readiness" />

      {/* CTA */}
      <PlatformCTA
        title="See what changes before orientation day."
        subtitle="Book a short demo to follow the workflow from approved hire to terminal arrival."
        footnote="Raisedash supports the online part of orientation. Your fleet still decides qualification and completes all hands-on work."
      />
    </PageLayout>
  );
}
