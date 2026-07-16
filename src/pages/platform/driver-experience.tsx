import {
  BadgeInfo,
  KeyRound,
  Languages,
  MailX,
  MessageSquare,
  PlayCircle,
  Smartphone,
  Timer,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useVignetteLoop } from "@/hooks/useVignetteLoop";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  CrossLinks,
  FaqSection,
  FeatureGrid,
  PhoneFrame,
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
    title: "A direct invitation",
    description: "The driver gets a clear link to the orientation assigned by your fleet.",
    icon: MessageSquare,
  },
  {
    title: "A simple sign-in",
    description: "A one-time code replaces another password to create, remember, or reset.",
    icon: KeyRound,
  },
  {
    title: "Nothing to install",
    description:
      "It runs in the phone's browser. There's no app to download, no update to install, and no storage to free up.",
    icon: Smartphone,
  },
  {
    title: "Built around the phone",
    description: "Pages, lessons, and questions are designed for the screen drivers already use.",
    icon: MailX,
  },
  {
    title: "Everything in one place",
    description:
      "Drivers can move through video, reading, and quiz lessons in the same experience.",
    icon: Timer,
  },
  {
    title: "A clear next step",
    description: "Drivers can see what was assigned, what is complete, and what comes next.",
    icon: Languages,
  },
  {
    title: "Progress that saves",
    description: "Completed work stays recorded when a driver leaves and returns later.",
    icon: BadgeInfo,
  },
  {
    title: "Progress your team can see",
    description:
      "The safety team can see whether the driver's assignment has started, is moving, or is done.",
    icon: Truck,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Receive a clear invitation",
    description:
      "The driver gets an SMS or email from your fleet with a direct link to the assigned training.",
  },
  {
    title: "Get in without setup trouble",
    description:
      "The link opens in the phone browser. A one-time code confirms the driver's identity without a saved password.",
  },
  {
    title: "Know what to do next",
    description:
      "A simple assignment list guides the driver through videos, readings, and quizzes in order.",
  },
  {
    title: "Stop and return when needed",
    description:
      "Completed work stays recorded, so the driver can return without starting the whole assignment again.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "Do drivers need to download an app?",
    answer:
      "No. Everything runs in the phone's web browser from an SMS or email link. There is nothing to install or keep updated.",
  },
  {
    question: "Do drivers need an email address?",
    answer:
      "Not if you invite them by SMS. Drivers sign in with a one-time code instead of creating a password.",
  },
  {
    question: "What can drivers complete on a phone?",
    answer: "Drivers can complete video, reading, and quiz lessons in the mobile browser.",
  },
  {
    question: "Does Raisedash replace hands-on training?",
    answer:
      "No. Raisedash handles online lessons and quizzes. Your fleet still runs road tests, equipment checks, and other hands-on work through its normal process.",
  },
  {
    question: "What happens when a driver leaves and comes back?",
    answer:
      "Completed work stays recorded, so the driver can return to the assignment without starting the whole training again.",
  },
];

/**
 * A live SMS thread: typing dots, the invite text, a lesson card that flips to
 * Spanish when the driver taps ES, and the driver's reply. Violet accent —
 * the driver's side of the product, told at message pace.
 */
function DriverPhoneVignette() {
  const step = useVignetteLoop(6, 1400);
  const spanish = step >= 3;
  const progressDone = step >= 4;

  return (
    <PhoneFrame caption="Text from Springfield Fleet">
      <div className="min-h-[21rem]">
        {/* Typing indicator, then the invite */}
        {step === 0 ? (
          <div className="animate-vignette-in bg-surface-2 mb-4 flex w-14 items-center justify-center gap-1 rounded-xs rounded-tl-none px-3 py-2.5">
            {[0, 1, 2].map((dot) => (
              <span
                key={dot}
                className="animate-typing-dot bg-muted-foreground h-1.5 w-1.5 rounded-full"
                style={{ animationDelay: `${dot * 150}ms` }}
              />
            ))}
          </div>
        ) : (
          <div className="animate-vignette-in bg-surface-2 text-foreground mb-4 max-w-[85%] rounded-xs rounded-tl-none px-3 py-2 text-xs leading-relaxed">
            You&apos;re set to start Monday. Tap to open your orientation:{" "}
            <span className="text-accent-violet">rd.sh/a1b2</span>
          </div>
        )}

        {/* Lesson card */}
        {step >= 2 ? (
          <div
            key={spanish ? "es" : "en"}
            className="animate-vignette-in border-border bg-card rounded-xs border p-3"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-muted-foreground text-[10px]">
                {spanish ? "Orientation · quiz" : "Orientation · video"}
              </span>
              <div className="flex gap-1">
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] transition-colors duration-300",
                    spanish ? "bg-surface-3 text-muted-foreground" : "bg-accent-violet text-white"
                  )}
                >
                  VIDEO
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] transition-colors duration-300",
                    spanish ? "bg-accent-violet text-white" : "bg-surface-3 text-muted-foreground"
                  )}
                >
                  QUIZ
                </span>
              </div>
            </div>
            <div className="bg-surface-3 relative mb-3 flex aspect-video items-center justify-center overflow-hidden rounded-xs">
              <PlayCircle className="text-foreground/70 h-8 w-8" />
              <span className="text-muted-foreground absolute bottom-1.5 left-2 text-[9px]">
                {spanish ? "Knowledge check" : "Video lesson"}
              </span>
            </div>
            <p className="text-foreground text-xs font-normal">
              {spanish ? "Backing at customer sites" : "Pre-trip inspection basics"}
            </p>
            <p className="text-muted-foreground mt-0.5 text-[10px]">
              {spanish ? "Quiz · 5 questions" : "Assigned lesson"}
            </p>
            <div className="bg-surface-3 mt-2.5 h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-accent-violet h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: progressDone ? "100%" : "33%" }}
              />
            </div>
            <div className="bg-primary text-primary-foreground mt-3 flex items-center justify-center rounded-xs px-3 py-2 text-xs">
              Continue
            </div>
          </div>
        ) : null}

        {/* Driver's reply */}
        {step >= 5 ? (
          <div className="animate-vignette-in mt-3 flex justify-end">
            <div className="bg-accent-violet max-w-[75%] rounded-xs rounded-br-none px-3 py-2 text-xs leading-relaxed text-white">
              Finished. See you Monday.
            </div>
          </div>
        ) : null}

        {step >= 2 && step < 5 ? (
          <p className="text-muted-foreground mt-3 flex items-center gap-1.5 text-[10px]">
            <BadgeInfo className="h-3 w-3" />
            Why this? Part of your orientation.
          </p>
        ) : null}
      </div>
    </PhoneFrame>
  );
}

export default function DriverExperience() {
  return (
    <PageLayout
      title="Mobile Driver Training for Trucking Fleets"
      description="Give drivers a clear, phone-friendly path through orientation without an app download or another password to remember."
      keywords={[
        "mobile driver training experience",
        "SMS driver onboarding",
        "passwordless driver training",
        "phone-first trucking training",
        "easy driver training software",
      ]}
    >
      <PlatformHero
        eyebrow="The driver experience"
        eyebrowIcon={Smartphone}
        title="Training should be easy to start and easy to finish."
        subhead="Raisedash gives drivers a clear path from the first invite to completed orientation, built around the phone they already use so getting into training does not become another task."
        vignette={<DriverPhoneVignette />}
      />

      {/* Problem */}
      <PlatformSection
        eyebrow="The problem"
        title="Every extra step gives a driver another reason to stop"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              Drivers are not desk workers. When training expects a desktop, another password, or an
              app download, a simple assignment can quickly turn into a support call or another
              incomplete task.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed font-normal">
              Raisedash keeps the path clear from the first message to the final lesson. Drivers
              spend their time on the orientation itself, while your team spends less time helping
              people get into it.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              Where drivers drop off
            </p>
            <ul className="space-y-3">
              {[
                "Passwords to create, forget, and reset",
                "An email-only invitation",
                "An app to find, download, and update",
                "A desktop-only training page",
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
        title="A clear path from invite to completion"
        lede="Each step is designed to answer the driver's next question without adding more work for your office."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* Feature grid */}
      <PlatformSection
        eyebrow="Built for the driver"
        title="Less friction for the driver. Less chasing for your team."
      >
        <FeatureGrid features={FEATURES} columns={4} accent="violet" />
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="driver-experience" />

      {/* CTA */}
      <PlatformCTA
        title="See orientation from the driver's side."
        subtitle="Book a demo and follow the same path a new driver would take."
        footnote="Raisedash runs in a mobile browser. No app download is required."
      />
    </PageLayout>
  );
}
