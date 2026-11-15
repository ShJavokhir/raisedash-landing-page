import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Smartphone, Truck, UserCheck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  BrowserFrame,
  CrossLinks,
  FaqSection,
  PlatformCTA,
  PlatformHero,
  PlatformSection,
  type PlatformFaq,
} from "@/components/platform";

const FAQS: PlatformFaq[] = [
  {
    question: "What is truck driver onboarding software?",
    answer:
      "Software that prepares approved new hires for work at your fleet. It delivers company orientation online, tracks assigned training, shows progress, and keeps the training record together.",
  },
  {
    question: "Where does Raisedash fit in the onboarding process?",
    answer:
      "After your fleet approves the hire. Raisedash handles the repeatable online part before arrival: invitations, videos, readings, quizzes, progress tracking, and the training record created in Raisedash.",
  },
  {
    question: "Does Raisedash replace an ATS or DQF system?",
    answer:
      "No. Your recruiting or applicant tracking system manages candidates. Your DQF process manages qualification records. Raisedash prepares approved hires for your fleet's orientation and keeps their online training activity together.",
  },
  {
    question: "Does online onboarding replace in-person orientation?",
    answer: "No. Hands-on work still happens in person at the terminal.",
  },
  {
    question: "Do drivers need an app or a password?",
    answer:
      "No. Drivers open an SMS or email invitation in a phone browser and use a one-time access code. There is no app download or reusable password.",
  },
  {
    question: "Is Raisedash an ELDT provider?",
    answer:
      "No. Raisedash supports a carrier's company orientation and online training workflow. It is not an FMCSA-registered Entry-Level Driver Training provider.",
  },
];

const JOURNEY_STEPS = [
  {
    title: "Approve the hire",
    owner: "Recruiting and qualification systems",
    detail: "Applications, qualification documents, and the hiring decision",
    icon: UserCheck,
    active: false,
  },
  {
    title: "Prepare before arrival",
    owner: "Raisedash",
    detail: "Invitation, online orientation, progress, and training results",
    icon: Smartphone,
    active: true,
  },
  {
    title: "Complete orientation day",
    owner: "Your fleet",
    detail: "Road tests, equipment, questions, and hands-on work",
    icon: Truck,
    active: false,
  },
];

function OnboardingScopeVignette() {
  return (
    <BrowserFrame url="New-driver onboarding">
      <div className="mb-4">
        <p className="text-foreground text-sm font-normal">One journey, clear responsibilities</p>
        <p className="text-muted-foreground mt-0.5 text-xs">
          Raisedash starts after the hiring decision
        </p>
      </div>

      <div className="space-y-2">
        {JOURNEY_STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title}>
              <div
                className={
                  step.active
                    ? "border-accent-blue/40 bg-accent-blue-soft rounded-xs border p-3"
                    : "border-border bg-surface-2 rounded-xs border p-3"
                }
              >
                <div className="flex items-start gap-3">
                  <span
                    className={
                      step.active
                        ? "bg-accent-blue flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xs text-white"
                        : "border-border bg-card text-muted-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xs border"
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <p className="text-foreground text-xs font-normal">{step.title}</p>
                      <span
                        className={
                          step.active
                            ? "bg-accent-blue/10 text-accent-blue rounded-full px-2 py-0.5 text-[10px]"
                            : "text-muted-foreground text-[10px]"
                        }
                      >
                        {step.owner}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1 text-[10px] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
              {index < JOURNEY_STEPS.length - 1 ? (
                <div className="bg-border mx-7 h-2 w-px" aria-hidden="true" />
              ) : null}
            </div>
          );
        })}
      </div>
    </BrowserFrame>
  );
}

export default function DriverOnboardingSolution() {
  return (
    <PageLayout
      title="Truck driver onboarding software"
      description="Online orientation for approved hires before they arrive. Progress tracking, quiz results, and a training record per driver. No app for drivers."
      keywords={[
        "truck driver onboarding software",
        "driver onboarding software for trucking",
        "trucking onboarding platform",
        "online driver orientation",
        "fleet driver onboarding",
      ]}
    >
      <PlatformHero
        eyebrow="Driver onboarding software"
        eyebrowIcon={ClipboardCheck}
        title="Truck driver onboarding software"
        subhead="Raisedash delivers your fleet's orientation online after a hire is approved. Drivers prepare on their phone before they arrive. Your team sees who finished and what's left for terminal day."
        vignette={<OnboardingScopeVignette />}
        howItWorksHref="#where-it-fits"
      />

      <PlatformSection
        id="where-it-fits"
        eyebrow="Where Raisedash fits"
        title="After the hire, before the terminal"
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            {
              step: "Before Raisedash",
              title: "Your ATS and DQF",
              body: "Your recruiting system and safety team handle applications, qualification documents, and the decision to hire.",
              icon: UserCheck,
            },
            {
              step: "Raisedash today",
              title: "Online orientation",
              body: "Send company orientation by SMS or email. Follow progress, review quiz results, and keep the training record per driver.",
              icon: Smartphone,
              active: true,
            },
            {
              step: "At the terminal",
              title: "Your fleet",
              body: "Road tests, equipment checks, qualification decisions, and other work that must happen face to face.",
              icon: Truck,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={
                  item.active
                    ? "border-accent-blue/40 bg-accent-blue-soft rounded-xs border p-6 sm:p-8"
                    : "border-border bg-card rounded-xs border p-6 sm:p-8"
                }
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span
                    className={
                      item.active
                        ? "bg-accent-blue flex h-10 w-10 items-center justify-center rounded-xs text-white"
                        : "border-border bg-surface-2 text-foreground flex h-10 w-10 items-center justify-center rounded-xs border"
                    }
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-muted-foreground text-xs tracking-wide uppercase">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-foreground text-lg font-normal">{item.title}</h3>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </PlatformSection>

      <PlatformSection eyebrow="What to look for" title="Four questions for any onboarding demo">
        <div className="border-border bg-card overflow-hidden rounded-xs border">
          {[
            "Can a driver open the invitation on a normal phone without downloading an app?",
            "Can your team quickly see who has not started, who is working, and who is complete?",
            "Can a manager review a driver's quiz results and activity without searching across tools?",
            "Can you download the training record for one driver when you need a copy?",
          ].map((question, index) => (
            <div
              key={question}
              className="border-border flex items-start gap-4 border-b px-5 py-4 last:border-b-0 sm:px-6"
            >
              <span className="bg-success/10 text-success mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                <Check className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-foreground text-base leading-relaxed">{question}</p>
                <p className="text-muted-foreground mt-1 text-xs">Question {index + 1} of 4</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <Link
            href="/blog/driver-onboarding-software-trucking"
            className="text-foreground group inline-flex items-center gap-1.5 text-sm"
          >
            Read the truck driver onboarding software buyer&apos;s guide
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </PlatformSection>

      <CrossLinks currentSlug="driver-onboarding" />

      <FaqSection faqs={FAQS} title="Driver onboarding questions" />

      <PlatformCTA
        title="Bring one real onboarding program."
        subtitle="See the invitation a driver gets, the progress your team follows, and the training record at the end."
        footnote="Raisedash supports online orientation and training records. Your fleet remains responsible for qualification, required training, and hands-on work."
      />
    </PageLayout>
  );
}
