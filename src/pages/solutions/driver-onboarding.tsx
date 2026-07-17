import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  FileDown,
  ListChecks,
  MessageSquareText,
  MonitorCheck,
  Smartphone,
  Users,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
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
    title: "Invite by text or email",
    description: "Send approved new hires a direct link to the orientation you assign.",
    icon: MessageSquareText,
  },
  {
    title: "No app download",
    description: "Drivers open training in the phone browser they already use.",
    icon: Smartphone,
  },
  {
    title: "No password to remember",
    description: "A one-time code gives the driver simple, controlled access.",
    icon: CheckCircle2,
  },
  {
    title: "Videos, readings, and quizzes",
    description: "Turn the material your fleet already uses into a clear online sequence.",
    icon: ClipboardList,
  },
  {
    title: "Progress at a glance",
    description: "See who has not started, who is in progress, and who is complete.",
    icon: ListChecks,
  },
  {
    title: "Results in context",
    description: "Review quiz activity and results beside each driver's assignments.",
    icon: MonitorCheck,
  },
  {
    title: "One driver or a group",
    description: "Prepare an individual hire or an incoming class from the same workflow.",
    icon: Users,
  },
  {
    title: "A report you can keep",
    description: "Download the Raisedash training details available for each driver.",
    icon: FileDown,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Assign the right orientation",
    description:
      "Choose the videos, readings, and knowledge checks an approved new hire should complete.",
  },
  {
    title: "Send one clear invitation",
    description:
      "Invite the driver by SMS or email as soon as the hire is approved—before terminal day.",
  },
  {
    title: "Follow the drivers who need help",
    description:
      "See progress and results in one place instead of chasing updates through calls and spreadsheets.",
  },
  {
    title: "Arrive with a better plan",
    description:
      "Use in-person time for road tests, equipment, questions, and the work that belongs at the terminal.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is truck driver onboarding software?",
    answer:
      "It helps a carrier deliver company orientation and assigned training to approved new hires, track progress, review results, and keep the resulting training record together.",
  },
  {
    question: "Does Raisedash replace our applicant tracking or DQF system?",
    answer:
      "No. Raisedash begins after you approve the hire. It does not replace recruiting, driver qualification files, Clearinghouse work, medical records, or license verification.",
  },
  {
    question: "Do drivers need an app or account password?",
    answer:
      "No. Drivers open an SMS or email invitation in a phone browser and use a one-time access code. There is no app-store download or reusable password to remember.",
  },
  {
    question: "Does online onboarding replace terminal orientation?",
    answer:
      "No. Use Raisedash for the repeatable parts that work well as video, reading, and quizzes. Your fleet still handles road tests, equipment, qualification decisions, and hands-on work through its normal process.",
  },
  {
    question: "What record does Raisedash provide today?",
    answer:
      "The current PDF report includes a driver summary, assigned training, completion details, quiz attempts and scores, recorded activity, and certificates available in Raisedash. Policy signatures and road-test evidence are not included today.",
  },
  {
    question: "Is Raisedash an ELDT provider?",
    answer:
      "No. Raisedash is for a carrier's company orientation and online training workflow. It is not an FMCSA-registered Entry-Level Driver Training provider.",
  },
];

export default function DriverOnboardingSolution() {
  return (
    <PageLayout
      title="Truck Driver Onboarding Software for Modern Fleets"
      description="Start truck driver onboarding before terminal day with phone-first orientation, progress tracking, quizzes, and a clear training record."
      keywords={[
        "truck driver onboarding software",
        "driver onboarding software for trucking",
        "trucking onboarding platform",
        "online driver orientation",
        "fleet driver onboarding",
      ]}
    >
      <PlatformHero
        eyebrow="Truck driver onboarding software"
        eyebrowIcon={ClipboardList}
        title="A modern start for every new driver."
        subhead="Move repeatable orientation work before terminal day, give drivers a simple phone-first experience, and know where everyone stands before they arrive."
        vignette={<PipelineVignette />}
      />

      <PlatformSection
        eyebrow="Why fleets change"
        title="Onboarding should not be a terminal-day scramble"
        lede="A new driver's first experience with your fleet is often a chain of repeated calls, emailed files, paper packets, and presentations that begin only after arrival."
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: "Before Raisedash",
              body: "The team sends material through several channels, follows up manually, and waits until orientation day to discover what is missing.",
            },
            {
              title: "With Raisedash",
              body: "The driver receives one clear invitation, completes assigned work in a phone browser, and the team follows progress from one view.",
            },
            {
              title: "At the terminal",
              body: "Your team already knows what is complete and can spend the day on road tests, equipment, questions, and hands-on work.",
            },
          ].map((item) => (
            <div key={item.title} className="border-border bg-card rounded-xs border p-6 sm:p-8">
              <h3 className="text-foreground text-lg font-normal">{item.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </PlatformSection>

      <PlatformSection
        id="how-it-works"
        eyebrow="The workflow"
        title="From approved hire to a more useful day one"
        lede="Raisedash handles the online preparation. Your fleet stays in control of qualification and every hands-on decision."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection
        eyebrow="Available today"
        title="The essentials, without the old-software friction"
        lede="The modern experience is not an abstract AI claim. It is fewer steps for the driver and a clearer operating view for the fleet."
      >
        <FeatureGrid features={FEATURES} columns={4} accent="blue" />
      </PlatformSection>

      <PlatformSection
        eyebrow="Connected records"
        title="The work is easier to trust when the record builds with it"
      >
        <div className="border-border bg-card flex flex-col gap-6 rounded-xs border p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Raisedash keeps assignments, completion details, quiz attempts and scores, recorded
              activity, and available certificates together under the driver. Your team can review
              the details and download the current training report when it needs a copy.
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              The current report does not include policy signatures, road-test evidence, or a
              complete version-locked evidence packet.
            </p>
          </div>
          <Link
            href="/platform/training-evidence"
            className="bg-primary text-primary-foreground border-primary group inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm transition-[background-color,border-color,transform] duration-150 hover:border-[#3b3a33] hover:bg-[#3b3a33] active:scale-[0.97] motion-reduce:active:scale-100"
          >
            See the training record
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </PlatformSection>

      <FaqSection faqs={FAQS} />

      <PlatformCTA
        title="Bring one real orientation workflow."
        subtitle="See the invitation a driver receives, the progress your team can follow, and the training report available at the end."
        footnote="Raisedash supports online orientation and training records. Your fleet remains responsible for qualification, required training, and hands-on work."
      />
    </PageLayout>
  );
}
