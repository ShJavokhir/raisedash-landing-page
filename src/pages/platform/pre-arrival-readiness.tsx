import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  FileText,
  ListChecks,
  MessageSquareText,
  MonitorCheck,
  PlayCircle,
  RotateCcw,
  Send,
  Smartphone,
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
    title: "Use your fleet's material",
    description: "Organize the videos, readings, and quizzes your approved hires should complete.",
    icon: FileText,
  },
  {
    title: "Invite drivers directly",
    description: "Send a clear orientation link by SMS or email as soon as the hire is approved.",
    icon: MessageSquareText,
  },
  {
    title: "Start without an app",
    description: "Drivers open orientation in a phone browser and use a one-time access code.",
    icon: Smartphone,
  },
  {
    title: "Follow each status",
    description: "See who has not started, who is in progress, and who has completed the work.",
    icon: ListChecks,
  },
  {
    title: "Review quiz results",
    description: "Check recorded quiz activity and results beside each driver's assignment.",
    icon: MonitorCheck,
  },
  {
    title: "Prepare one driver or a class",
    description: "Use the same workflow for an individual hire or a group arriving together.",
    icon: Users,
  },
  {
    title: "Let drivers return later",
    description: "Completed work stays recorded when a driver stops and comes back to finish.",
    icon: RotateCcw,
  },
  {
    title: "Keep the training details",
    description:
      "Keep assignments, results, activity, and available certificates under the driver.",
    icon: ClipboardCheck,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Assign orientation after the hire is approved",
    description:
      "Choose the videos, readings, and knowledge checks the driver should complete before arrival.",
  },
  {
    title: "Send one direct invitation",
    description:
      "Invite the driver by SMS or email. The link opens in a phone browser with no app to install.",
  },
  {
    title: "Let the driver work in stages",
    description:
      "The driver can complete the assignment in one sitting or return later without losing finished work.",
  },
  {
    title: "Review progress before the driver travels",
    description:
      "See who has not started, who is working, who is complete, and which quiz results need a closer look.",
  },
  {
    title: "Plan orientation day around what remains",
    description:
      "Use terminal time for road tests, equipment, questions, and other work that belongs face to face.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is pre-arrival driver orientation?",
    answer:
      "Pre-arrival orientation moves repeatable company material before terminal day. Approved hires can complete videos, readings, and quizzes before they travel, while the fleet keeps hands-on work for the terminal.",
  },
  {
    question: "What does 'ready' mean in Raisedash?",
    answer:
      "It means the driver completed the online work your fleet assigned in Raisedash. Your fleet still decides whether the driver is qualified and whether any other work must be completed before driving.",
  },
  {
    question: "Do drivers need to download an app?",
    answer:
      "No. Orientation opens in the phone's web browser. Drivers use a one-time access code instead of creating another password.",
  },
  {
    question: "Can we invite drivers by text?",
    answer:
      "Yes. You can send an invitation by SMS or email, depending on the contact information you have for the driver.",
  },
  {
    question: "Where does the orientation content come from?",
    answer:
      "Bring the videos and written material your fleet already uses. You can organize that material into online lessons and quizzes in Raisedash.",
  },
  {
    question: "Does this replace hands-on orientation?",
    answer:
      "No. Use it for repeatable material that works well as video, reading, and quizzes. Road tests, equipment checks, qualification decisions, and other hands-on work still happen through your normal process.",
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
      title="Driver Orientation Software for Trucking Fleets"
      description="Send orientation before drivers arrive, follow each driver's progress, and plan terminal time around the hands-on work that remains."
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
        title="Know who is ready before orientation day."
        subhead="Send repeatable orientation work by SMS or email, let drivers complete it in their phone browser, and see what is done before they travel."
        vignette={<PipelineVignette />}
      />

      <PlatformSection
        eyebrow="Pre-arrival readiness"
        title="Ready should mean more than invited"
        lede="A sent link tells you very little. Raisedash gives your team a shared view of the online work each incoming driver has actually completed."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Without a clear status, incomplete work often surfaces after the driver has already
              traveled. The safety team starts making calls, repeating material, and changing the
              day&apos;s plan.
            </p>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Raisedash shows the online preparation completed in the platform. It does not make a
              qualification decision for your fleet.
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
        title="From approved hire to a better-planned orientation day"
        lede="The workflow is simple enough for one driver and clear enough for a full incoming class."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection
        eyebrow="Divide the work"
        title="Move the repeatable material earlier. Keep hands-on work hands-on."
        lede="Pre-arrival orientation works best when each activity happens in the setting where it is most useful."
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
                <h3 className="text-foreground mt-1 text-xl font-normal">Prepare online</h3>
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
                <h3 className="text-foreground mt-1 text-xl font-normal">Work face to face</h3>
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

      <PlatformSection
        eyebrow="Available today"
        title="The tools behind the pre-arrival workflow"
        lede="Each capability supports one clear goal: help the driver finish and help your team see where things stand."
      >
        <FeatureGrid features={FEATURES} columns={4} accent="blue" />
      </PlatformSection>

      <PlatformSection
        eyebrow="Planning resources"
        title="Start with the process, then choose the software"
        lede="A clear orientation plan makes the product easier to evaluate and the rollout easier to explain."
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
              See where Raisedash fits in driver onboarding
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Understand the handoff from recruiting and qualification to pre-arrival preparation
              and terminal day.
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
              Build a truck driver orientation checklist
            </h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Separate pre-arrival material from the road tests, equipment work, and conversations
              that belong at the terminal.
            </p>
            <span className="text-foreground mt-5 inline-flex items-center gap-1.5 text-sm">
              Read the orientation checklist
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </PlatformSection>

      <FaqSection faqs={FAQS} title="Pre-arrival orientation questions" />

      <CrossLinks currentSlug="pre-arrival-readiness" />

      <PlatformCTA
        title="See who is ready before orientation day."
        subtitle="Book a short demo to follow one driver from invitation to completed online orientation."
        footnote="Raisedash shows the online work completed in the platform. Your fleet still decides qualification and completes all hands-on work."
      />
    </PageLayout>
  );
}
