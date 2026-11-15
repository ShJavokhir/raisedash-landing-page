import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  MonitorCheck,
  PlayCircle,
  Send,
  Truck,
  Users,
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
    title: "Your fleet's own material",
    description:
      "Organize the videos, readings, and quizzes your approved hires should finish before they arrive.",
    icon: FileText,
  },
  {
    title: "Quiz results per driver",
    description: "Check quiz scores and activity next to each driver's assignment.",
    icon: MonitorCheck,
  },
  {
    title: "One driver or a full class",
    description: "Works the same for a single hire or a group arriving together.",
    icon: Users,
  },
  {
    title: "Training records in one place",
    description: "Assignments, results, activity, and certificates stay under the driver's record.",
    icon: ClipboardCheck,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Pick what the driver should finish before arrival",
    description:
      "Choose the videos, readings, and quizzes the driver needs to complete before orientation day.",
  },
  {
    title: "Send one direct invitation",
    description:
      "Invite the driver by SMS or email. The link opens in a phone browser with no app to install.",
  },
  {
    title: "The driver works at their own pace",
    description: "They can finish in one sitting or come back later without losing progress.",
  },
  {
    title: "Check progress before they travel",
    description:
      "See who has not started, who is working, and who is done. Review quiz results that need a closer look.",
  },
  {
    title: "Spend terminal time on hands-on work",
    description:
      "Use orientation day for road tests, equipment, questions, and everything that belongs face to face.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is pre-arrival driver orientation?",
    answer:
      "It moves repeatable company material (videos, readings, quizzes) before terminal day. Approved hires finish that work on their phone before they travel, and hands-on work stays at the terminal.",
  },
  {
    question: "What does 'complete' mean in Raisedash?",
    answer:
      "It means the driver finished the online work your fleet assigned in Raisedash. Your fleet still decides whether the driver is qualified and whether any other work must be completed before driving.",
  },
  {
    question: "Do drivers need to download an app?",
    answer:
      "No. Orientation opens in the phone's web browser. Drivers use a one-time code instead of creating a password.",
  },
  {
    question: "Where does the orientation content come from?",
    answer:
      "You bring the videos and written material your fleet already uses. You organize that material into online lessons and quizzes in Raisedash.",
  },
  {
    question: "Does this replace hands-on orientation?",
    answer:
      "No. Use it for repeatable material that works well as video, reading, and quizzes. Road tests, equipment checks, and other hands-on work still happen at the terminal.",
  },
];

const READINESS_STATES = [
  {
    label: "Not started",
    description: "The invitation was sent, but the driver has not begun the assigned work.",
    className: "border-border bg-surface-2",
    dotClassName: "bg-muted-foreground/50",
  },
  {
    label: "In progress",
    description: "The driver started and still has assigned work left to complete.",
    className: "border-accent-blue/30 bg-accent-blue-soft",
    dotClassName: "bg-accent-blue",
  },
  {
    label: "Complete",
    description: "The driver finished the online work your fleet assigned in Raisedash.",
    className: "border-success/30 bg-success/10",
    dotClassName: "bg-success",
  },
];

export default function PreArrivalReadiness() {
  return (
    <PageLayout
      title="Pre-arrival driver orientation software"
      description="Send orientation by SMS or email before drivers arrive. Track each driver as not started, in progress, or complete. No app for drivers."
      keywords={[
        "driver orientation software",
        "pre-hire onboarding for trucking",
        "new driver orientation checklist",
        "trucking driver onboarding",
        "pre-arrival driver readiness",
      ]}
    >
      <PlatformHero
        eyebrow="Pre-arrival driver orientation"
        eyebrowIcon={Send}
        title="Send orientation before drivers arrive. See who finished."
        subhead="Invite approved hires by SMS or email. They finish videos, readings, and quizzes in their phone browser. You see who is done before they travel."
        vignette={<PipelineVignette />}
      />

      <PlatformSection
        eyebrow="Three statuses per driver"
        title="Not started, in progress, or complete"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Raisedash shows whether each incoming driver finished their assigned online work, so
              you know before orientation day what still needs to happen.
            </p>
          </div>
          <div className="space-y-3 lg:col-span-3">
            {READINESS_STATES.map((state) => (
              <div key={state.label} className={`${state.className} rounded-xs border p-4 sm:p-5`}>
                <div className="flex items-start gap-3">
                  <span
                    className={`${state.dotClassName} mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full`}
                  />
                  <div>
                    <h3 className="text-foreground text-base font-normal">{state.label}</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                      {state.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PlatformSection>

      <PlatformSection
        id="how-it-works"
        eyebrow="How it works"
        title="From approved hire to orientation day"
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection
        eyebrow="What goes where"
        title="Online before arrival. Hands-on at the terminal."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border-accent-blue/30 bg-accent-blue-soft rounded-xs border p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="bg-accent-blue flex h-10 w-10 items-center justify-center rounded-xs text-white">
                <PlayCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Before arrival
                </p>
                <h3 className="text-foreground mt-1 text-xl font-normal">Online on their phone</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Company policies and procedures",
                "Safety topics that can be taught by video or reading",
                "Facility and operating expectations",
                "Knowledge checks and quizzes",
              ].map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                >
                  <span className="bg-accent-blue mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="border-border bg-surface-2 text-foreground flex h-10 w-10 items-center justify-center rounded-xs border">
                <Truck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  At the terminal
                </p>
                <h3 className="text-foreground mt-1 text-xl font-normal">Face to face</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "Road tests and behind-the-wheel evaluation",
                "Equipment checks and physical demonstrations",
                "Hands-on practice and observation",
                "Questions, judgment, and qualification decisions",
              ].map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                >
                  <span className="bg-foreground/40 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PlatformSection>

      <PlatformSection eyebrow="What you get" title="What the pre-arrival workflow includes">
        <FeatureGrid features={FEATURES} columns={4} accent="blue" />
      </PlatformSection>

      <PlatformSection
        eyebrow="Planning resources"
        title="Start with the process, then pick the software"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Link
            href="/solutions/driver-onboarding"
            className="border-border bg-card hover:bg-surface-2 group rounded-xs border p-6 transition-colors duration-150"
          >
            <p className="text-muted-foreground text-xs tracking-wide uppercase">
              Solution overview
            </p>
            <h3 className="text-foreground mt-3 text-lg font-normal">
              Where Raisedash fits in driver onboarding
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              The handoff from recruiting and qualification to pre-arrival preparation and terminal
              day.
            </p>
            <span className="text-foreground mt-5 inline-flex items-center gap-1.5 text-sm">
              Explore driver onboarding
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/blog/truck-driver-orientation-checklist"
            className="border-border bg-card hover:bg-surface-2 group rounded-xs border p-6 transition-colors duration-150"
          >
            <p className="text-muted-foreground text-xs tracking-wide uppercase">Practical guide</p>
            <h3 className="text-foreground mt-3 text-lg font-normal">
              Truck driver orientation checklist
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Separate pre-arrival material from the road tests, equipment work, and conversations
              that belong at the terminal.
            </p>
            <span className="text-foreground mt-5 inline-flex items-center gap-1.5 text-sm">
              Read the checklist
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </PlatformSection>

      <FaqSection faqs={FAQS} title="Pre-arrival orientation questions" />

      <CrossLinks currentSlug="pre-arrival-readiness" />

      <PlatformCTA
        title="See who finished before orientation day."
        subtitle="Book a short demo to follow one driver from invitation to completed online orientation."
      />
    </PageLayout>
  );
}
