import Link from "next/link";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileDown,
  ListChecks,
  MessageSquareText,
  Smartphone,
  Truck,
  UserCheck,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  BrowserFrame,
  CrossLinks,
  FaqSection,
  FeatureGrid,
  PlatformCTA,
  PlatformHero,
  PlatformSection,
  type PlatformFaq,
  type PlatformFeature,
} from "@/components/platform";

const OUTCOMES: PlatformFeature[] = [
  {
    title: "Less manual follow-up",
    description: "See who needs help instead of calling every incoming driver for an update.",
    icon: MessageSquareText,
  },
  {
    title: "A clearer arrival-day plan",
    description:
      "Know what is complete before the class starts and plan the day around what remains.",
    icon: ListChecks,
  },
  {
    title: "A simpler start for drivers",
    description:
      "Give each driver one direct invitation that opens in the phone browser they already use.",
    icon: Smartphone,
  },
  {
    title: "A record that stays together",
    description:
      "Keep assignments, completion details, quiz results, activity, and certificates under the driver.",
    icon: FileDown,
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is truck driver onboarding software?",
    answer:
      "Truck driver onboarding software helps a carrier prepare approved new hires for work with that fleet. It can deliver company orientation, track assigned training, show progress, review results, and keep the resulting training record together.",
  },
  {
    question: "Where does Raisedash fit in the onboarding process?",
    answer:
      "Raisedash begins after your fleet approves the hire. It handles the repeatable online part before arrival: invitations, videos, readings, quizzes, progress tracking, and the training record created in Raisedash.",
  },
  {
    question: "Does Raisedash replace an ATS or DQF system?",
    answer:
      "No. Your recruiting or applicant tracking system manages candidates, and your DQF process manages qualification records. Raisedash prepares approved hires for your fleet's orientation and keeps their online training activity together.",
  },
  {
    question: "Does online onboarding replace in-person orientation?",
    answer:
      "No. Online onboarding is for repeatable material that works well as video, reading, and quizzes. Your fleet still handles road tests, equipment checks, qualification decisions, and other hands-on work in person.",
  },
  {
    question: "Do drivers need an app or a password?",
    answer:
      "No. Drivers open an SMS or email invitation in a phone browser and use a one-time access code. There is no app-store download or reusable password to remember.",
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
      title="Truck Driver Onboarding Software for Modern Fleets"
      description="Prepare approved drivers before they arrive, give your safety team a clear view of progress, and keep each driver's online training record together."
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
        title="Truck driver onboarding, without the day-one scramble."
        subhead="Raisedash handles the repeatable online work after a hire is approved. Drivers prepare before they arrive, your team sees what is complete, and terminal time stays focused on hands-on work."
        vignette={<OnboardingScopeVignette />}
        howItWorksHref="#where-it-fits"
      />

      <PlatformSection
        id="where-it-fits"
        eyebrow="Where Raisedash fits"
        title="Raisedash starts after the hiring decision"
        lede="Recruiting systems help you hire. Qualification systems hold driver documents. Raisedash prepares the approved driver for your fleet's orientation."
      >
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            {
              step: "Before Raisedash",
              title: "Recruit and qualify",
              body: "Your ATS, DQF process, and safety team handle applications, qualification documents, and the decision to hire.",
              icon: UserCheck,
            },
            {
              step: "Raisedash today",
              title: "Prepare before arrival",
              body: "Send company orientation by SMS or email, follow progress, review results, and keep the online training record together.",
              icon: Smartphone,
              active: true,
            },
            {
              step: "At the terminal",
              title: "Finish the hands-on work",
              body: "Your fleet completes road tests, equipment checks, qualification decisions, and the work that must happen face to face.",
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

      <PlatformSection
        eyebrow="Why fleets use it"
        title="A better handoff from hiring to orientation day"
        lede="The goal is not to put every part of onboarding online. It is to move the repeatable work earlier and give everyone a clearer next step."
      >
        <FeatureGrid features={OUTCOMES} columns={4} accent="blue" />
      </PlatformSection>

      <PlatformSection
        eyebrow="What to look for"
        title="A useful product demo should answer four simple questions"
        lede="Skip the long feature checklist. Test the moments that create work for drivers and safety teams."
      >
        <div className="border-border bg-card overflow-hidden rounded-xs border">
          {[
            "Can a driver open the invitation on a normal phone without downloading an app?",
            "Can your team quickly see who has not started, who is working, and who is complete?",
            "Can a manager review the driver's quiz activity and results without searching across tools?",
            "Can you download the training information available for one driver when you need a copy?",
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
        title="Bring one real onboarding workflow."
        subtitle="See the invitation a driver receives, the progress your team can follow, and the training report available at the end."
        footnote="Raisedash supports online orientation and training records. Your fleet remains responsible for qualification, required training, and hands-on work."
      />
    </PageLayout>
  );
}
