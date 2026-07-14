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
    title: "A text message, that's it",
    description:
      "The driver gets an SMS with a link. Tapping it opens everything they need — no account to set up, no form to fill out first.",
    icon: MessageSquare,
  },
  {
    title: "No passwords",
    description:
      "Nothing to remember and nothing to reset. The link is the sign-in, so a driver is never locked out of their own training.",
    icon: KeyRound,
  },
  {
    title: "No app store",
    description:
      "It runs in the phone's browser. There's no app to download, no update to install, and no storage to free up.",
    icon: Smartphone,
  },
  {
    title: "No email required",
    description:
      "Plenty of drivers don't use email. Invitations, reminders, and sign-in all work over SMS, so no one is left out.",
    icon: MailX,
  },
  {
    title: "Short, plain-language lessons",
    description:
      "Lessons run a few minutes each, written in plain language, so they fit into the gaps of a real driving day.",
    icon: Timer,
  },
  {
    title: "English and Spanish, with captions",
    description:
      "The driver picks their language and the video is captioned. There's nothing for your team to configure.",
    icon: Languages,
  },
  {
    title: "A clear reason for every assignment",
    description:
      "Each lesson shows why it was assigned. The driver isn't treated as a suspect — they know what they're doing and why.",
    icon: BadgeInfo,
  },
  {
    title: "Works for owner-operators too",
    description:
      "An owner-operator contracting with your fleet gets the same simple, passwordless experience as a company driver.",
    icon: Truck,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "A text lands",
    description:
      "The driver gets an SMS from your fleet with a single link. No app prompt, no signup wall, no welcome email to dig for.",
  },
  {
    title: "They tap and start",
    description:
      "The link opens their assignments right in the browser. No password to create, no email to verify, nothing to install.",
  },
  {
    title: "They finish on their own time",
    description:
      "Short lessons in English or Spanish, with captions, that save progress — so they can stop for a load and resume right where they were.",
  },
  {
    title: "They always know why",
    description:
      "Every assignment shows the reason it was given, so training reads as part of the job rather than a gotcha.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "Do drivers need to download an app?",
    answer:
      "No. Everything runs in the phone's web browser from a text-message link. There's no app store, and nothing to install or keep updated.",
  },
  {
    question: "Do drivers need an email address or a password?",
    answer:
      "Neither. The SMS link is the sign-in. Invitations and reminders come by text, so a driver who doesn't use email is never blocked from finishing their training.",
  },
  {
    question: "Is it available in Spanish?",
    answer:
      "Yes. The lessons and the whole experience work in English and Spanish, and the video is captioned. The driver chooses their language; your team doesn't have to manage it.",
  },
  {
    question: "Does it work for owner-operators?",
    answer:
      "Yes. An owner-operator who contracts with your fleet gets the same passwordless, phone-first experience as a company driver.",
  },
  {
    question: "Will older phones or weak signal be a problem?",
    answer:
      "The experience is built to be light. Lessons are short, pages load on modest connections, and progress saves as the driver goes — so a dropped signal at a truck stop doesn't cost them their work.",
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
            You&apos;re set to start Monday. Tap to begin your orientation — no login needed:{" "}
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
                {spanish ? "Orientación · 2 de 6" : "Orientation · 2 of 6"}
              </span>
              <div className="flex gap-1">
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] transition-colors duration-300",
                    spanish ? "bg-surface-3 text-muted-foreground" : "bg-accent-violet text-white"
                  )}
                >
                  EN
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] transition-colors duration-300",
                    spanish ? "bg-accent-violet text-white" : "bg-surface-3 text-muted-foreground"
                  )}
                >
                  ES
                </span>
              </div>
            </div>
            <div className="bg-surface-3 relative mb-3 flex aspect-video items-center justify-center overflow-hidden rounded-xs">
              <PlayCircle className="text-foreground/70 h-8 w-8" />
              <span className="text-muted-foreground absolute bottom-1.5 left-2 text-[9px]">
                {spanish ? "subtítulos" : "captions on"}
              </span>
            </div>
            <p className="text-foreground text-xs font-normal">
              {spanish ? "Inspección antes del viaje" : "Pre-trip inspection basics"}
            </p>
            <p className="text-muted-foreground mt-0.5 text-[10px]">
              {spanish ? "4 min · lenguaje sencillo" : "4 min · plain language"}
            </p>
            <div className="bg-surface-3 mt-2.5 h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-accent-violet h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: progressDone ? "100%" : "33%" }}
              />
            </div>
            <div className="bg-primary text-primary-foreground mt-3 flex items-center justify-center rounded-xs px-3 py-2 text-xs">
              {spanish ? "Continuar" : "Continue"}
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
      title="Mobile Driver Training Experience — SMS Onboarding"
      description="No passwords. No app store. No email. Raisedash sends driver training by text and opens it in the phone's browser — short lessons in English and Spanish, with captions and a clear reason for every assignment. Owner-operators included."
      keywords={[
        "mobile driver training experience",
        "SMS driver onboarding",
        "passwordless driver training",
        "phone-first trucking training",
        "bilingual driver training app",
      ]}
    >
      <PlatformHero
        eyebrow="The driver experience"
        eyebrowIcon={Smartphone}
        title="No passwords. No app store. No email. A text and a phone — that's it."
        subhead="Drivers live on their phones, not at desks. Raisedash meets them there: a text message opens their training in the browser, in English or Spanish, with short lessons and a clear reason for every one. Nothing to download, nothing to remember."
        vignette={<DriverPhoneVignette />}
      />

      {/* Problem */}
      <PlatformSection eyebrow="The problem" title="Why drivers quit on training software">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              Most training tools were built for someone at a desk. They hand a driver a
              password-protected desktop portal, ask for an email address the driver doesn't use,
              and push them to an app store to download something that eats their storage. Every one
              of those is a place to give up — and drivers do.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed font-normal">
              A driver who can't get in doesn't get trained. And a fleet that can't get drivers
              through training doesn't have a record to show for it. The interface is the whole
              problem.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              Where drivers drop off
            </p>
            <ul className="space-y-3">
              {[
                "Passwords to create, forget, and reset",
                "An email address they may not have",
                "An app to find, download, and update",
                "No idea why a lesson was even assigned",
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
        title="From a text to a finished lesson, with nothing in the way"
        lede="Remove every step that gives a driver a reason to quit, and what's left is a text and a phone."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* Feature grid */}
      <PlatformSection
        eyebrow="Built for the driver"
        title="Everything a driver needs, nothing they don't"
      >
        <FeatureGrid features={FEATURES} columns={4} accent="violet" />
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="driver-experience" />

      {/* CTA */}
      <PlatformCTA
        title="Try the driver experience the way a driver would."
        subtitle="Book a demo and open a real lesson from a text message — no passwords, no app, no email."
        footnote="English and Spanish, with captions, on the phone drivers already carry."
      />
    </PageLayout>
  );
}
