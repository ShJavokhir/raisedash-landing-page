import { BadgeInfo, PlayCircle, Smartphone } from "lucide-react";
import { cn } from "@/lib/cn";
import { useVignetteLoop } from "@/hooks/useVignetteLoop";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  CrossLinks,
  FaqSection,
  PhoneFrame,
  PlatformCTA,
  PlatformHero,
  PlatformSection,
  StepList,
  type PlatformFaq,
  type PlatformStep,
} from "@/components/platform";

const STEPS: PlatformStep[] = [
  {
    title: "Driver gets an SMS or email link",
    description:
      "Your fleet sends the driver a text or email with a direct link to the assigned orientation.",
  },
  {
    title: "Sign in with a one-time code",
    description:
      "The link opens in the phone browser. A one-time code confirms the driver's identity. No password to create or remember.",
  },
  {
    title: "Work through assigned lessons",
    description:
      "A simple list shows videos, readings, and quizzes in order. The driver sees what is done and what comes next.",
  },
  {
    title: "Stop and come back without losing work",
    description:
      "Finished lessons stay recorded. The driver can close the browser and pick up where they left off.",
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
    answer: "Video, reading, and quiz lessons, all in the mobile browser.",
  },
  {
    question: "Does Raisedash replace hands-on training?",
    answer:
      "No. Raisedash handles online lessons and quizzes. Your fleet still runs road tests, equipment checks, and other hands-on work through its normal process.",
  },
  {
    question: "What happens when a driver closes the browser and comes back?",
    answer:
      "Finished lessons stay recorded. The driver picks up where they left off without restarting.",
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
      title="Driver orientation on the phone"
      description="Drivers open orientation from an SMS or email, sign in with a one-time code, and finish video, reading, and quiz lessons in the phone's browser. No password."
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
        title="Driver orientation on the phone, no app and no password"
        subhead="Drivers get an SMS or email link, sign in with a one-time code, and work through video, reading, and quiz lessons in the phone's browser."
        vignette={<DriverPhoneVignette />}
      />

      {/* Problem */}
      <PlatformSection
        eyebrow="The problem"
        title="Every extra step gives a driver a reason to stop"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              Drivers are not at a desk. When orientation needs a desktop, a new password, or an app
              download, a simple assignment turns into a support call or sits incomplete.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              Where drivers drop off
            </p>
            <ul className="space-y-3">
              {[
                "A password to create, forget, and reset",
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
        title="From invite to finished, four steps"
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="driver-experience" />

      {/* CTA */}
      <PlatformCTA
        title="See orientation from the driver's side"
        subtitle="Book a demo and follow the same path a new driver would take."
      />
    </PageLayout>
  );
}
