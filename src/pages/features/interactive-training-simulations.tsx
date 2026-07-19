import Link from "next/link";
import {
  BadgeCheck,
  Flag,
  Hand,
  Lightbulb,
  MousePointerClick,
  Route,
  ShieldCheck,
  Smartphone,
  TabletSmartphone,
  Video,
} from "lucide-react";
import { FeatureCrossLinks } from "@/components/features/FeatureCrossLinks";
import { MediaFrame } from "@/components/features/MediaFrame";
import { SimVignette } from "@/components/features/vignettes-practice";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  FaqSection,
  FeatureGrid,
  PlatformCTA,
  PlatformHero,
  PlatformSection,
  StepList,
  type PlatformFaq,
  type PlatformFeature,
  type PlatformStep,
} from "@/components/platform";
import { BreadcrumbJsonLd } from "@/components/seo/SEO";

const FEATURES: PlatformFeature[] = [
  {
    title: "Create it from one recording",
    description: "Record and narrate a walkthrough. No separate authoring tool is required.",
    icon: Video,
  },
  {
    title: "A real replica, not a slideshow",
    description: "Live tap targets and typed fields, not screenshots with arrows.",
    icon: MousePointerClick,
  },
  {
    title: "Mistap coaching",
    description: "Wrong taps show a coaching message and let the driver try again.",
    icon: Hand,
  },
  {
    title: "Hints on demand",
    description: "A driver who's stuck gets a nudge, not a dead end.",
    icon: Lightbulb,
  },
  {
    title: "Runs in the phone browser",
    description: "Drivers practice in the same phone browser they already use for training.",
    icon: Smartphone,
  },
  {
    title: "Sandboxed and safe",
    description: "Practice cannot change your live systems, logs, or company data.",
    icon: ShieldCheck,
  },
  {
    title: "Auto-tested before publish",
    description: "Automated checks verify correct and incorrect taps before publishing.",
    icon: BadgeCheck,
  },
  {
    title: "Completion is the walkthrough",
    description: "No skip button. Finishing the practice is what completes the content.",
    icon: Flag,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Record a walkthrough once",
    description:
      "Screen-record the app while narrating what you're doing and why. That one video is the entire authoring effort.",
  },
  {
    title: "Raisedash builds the practice version",
    description:
      "The recording becomes an interactive version with the same screens, order, and required actions.",
  },
  {
    title: "It's tested before drivers see it",
    description:
      "Automated checks complete the full walkthrough and test incorrect taps before the simulation can be published.",
  },
  {
    title: "Drivers practice on their phones",
    description:
      "Drivers tap buttons, enter information, and move through realistic wait states. A hint is always available.",
  },
  {
    title: "Completion requires the full flow",
    description:
      "The content is marked complete only after the driver finishes every step in the workflow.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is an interactive training simulation?",
    answer:
      "It is a tap-through practice version of a real app or workflow. Drivers practice the screens and steps on their own phones and receive coaching when they tap the wrong item. Your team creates one by recording a narrated walkthrough of the app.",
  },
  {
    question: "Is this a truck driving simulator?",
    answer:
      "No. It does not teach steering or backing. It provides browser-based practice for the software drivers use, including ELDs, fleet apps, and dispatch workflows. There is nothing to install.",
  },
  {
    question: "How do we create one?",
    answer:
      "Record a screen walkthrough of the app while narrating, upload it, and compiling typically takes about 10–15 minutes. There is no storyboarding and no authoring tool to learn.",
  },
  {
    question: "What happens when a driver taps the wrong thing?",
    answer:
      "The wrong element shakes, a coaching message explains what to look for, and the step does not advance. A hint is always one tap away. It behaves like a patient trainer, not a quiz.",
  },
  {
    question: "Can a broken simulation reach drivers?",
    answer:
      "No. Automated checks verify the complete walkthrough, including correct and incorrect taps, before the simulation can be published.",
  },
  {
    question: "What counts as completing a simulation?",
    answer:
      "Walking the real flow to the end on their own phone. There is no skip; completion only fires when the practice is actually finished, and it is recorded like any other training completion.",
  },
];

const IN_CAB_ITEMS = [
  "ELD status changes and log certification",
  "DVIR and inspection-mode screens",
  "Malfunction and data-transfer flows",
  "The screens an officer asks a driver to pull up",
];

const WORKFLOW_ITEMS = [
  "Fuel card and receipt-capture apps",
  "Document scanning and load paperwork",
  "Load acceptance in your dispatch app",
  "Anything you can record, drivers can practice",
];

export default function InteractiveTrainingSimulations() {
  return (
    <PageLayout
      title="Interactive Training Simulations"
      description="Record a walkthrough of your ELD or fleet app once. Raisedash compiles an interactive practice replica drivers tap through in the browser. No hardware."
      keywords={[
        "interactive training simulations for truck drivers",
        "ELD training for drivers",
        "practice fleet apps without the truck",
        "hands-on driver training software",
        "browser-based driver training",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Features", url: "/features" },
          { name: "Interactive simulations", url: "/features/interactive-training-simulations" },
        ]}
      />

      <PlatformHero
        eyebrow="Interactive simulations"
        eyebrowIcon={TabletSmartphone}
        title="Let drivers practice your fleet apps before day one."
        subhead="Record a walkthrough of your ELD or fleet app. Raisedash turns it into an interactive phone-based exercise where drivers practice each step and get help when they make a mistake."
        vignette={<SimVignette />}
      />

      <PlatformSection
        eyebrow="The problem"
        title="Let drivers practice without touching the live system"
        lede="Drivers learn faster when they can repeat a workflow without affecting real logs, loads, or records."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <p className="text-foreground text-lg leading-relaxed">
              New drivers may need to learn an ELD, dispatch app, inspection workflow, and document
              process at the same time. A demonstration shows where to tap, but it does not give
              every driver a chance to practice.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              When practice happens in the live system, a wrong tap can create a log error, delay a
              load, or require an administrator to clean up the record. Drivers may also avoid
              asking for another demonstration because they do not want to slow the group down.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Raisedash gives each driver a safe practice version on their phone. They can repeat
              the workflow, receive guidance after a wrong tap, and finish orientation already
              familiar with the tools they will use on the job.
            </p>
          </div>
          <MediaFrame
            kind="loop"
            src="https://cdn.raisedash.com/media/landing/features/simulation-eld-tablet.mp4"
            poster="https://cdn.raisedash.com/media/landing/features/simulation-eld-tablet.jpg"
            caption="Drivers can practice logs, status changes, certifications, and malfunction flows before using the live device."
            ariaLabel="A hand tapping an ELD tablet mounted in a truck dashboard"
          />
        </div>
      </PlatformSection>

      <PlatformSection
        id="how-it-works"
        eyebrow="How it works"
        title="One recording becomes a practice replica"
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection
        eyebrow="Clear scope"
        title="This is not a driving simulator"
        lede="These simulations teach software and operational workflows. They do not replace hands-on vehicle training."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border-success/30 bg-success/10 rounded-xs border p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="bg-success text-success-foreground flex h-10 w-10 items-center justify-center rounded-xs">
                <TabletSmartphone className="h-5 w-5" />
              </span>
              <h3 className="text-foreground text-xl font-normal">In-cab technology</h3>
            </div>
            <ul className="space-y-3">
              {IN_CAB_ITEMS.map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                >
                  <span className="bg-success mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="border-border bg-surface-2 text-foreground flex h-10 w-10 items-center justify-center rounded-xs border">
                <Route className="h-5 w-5" />
              </span>
              <h3 className="text-foreground text-xl font-normal">Company workflows</h3>
            </div>
            <ul className="space-y-3">
              {WORKFLOW_ITEMS.map((item) => (
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

      <PlatformSection eyebrow="Built in" title="Practice that behaves like a patient trainer">
        <FeatureGrid features={FEATURES} columns={4} accent="green" />
      </PlatformSection>

      <PlatformSection eyebrow="Repeatable practice" title="Give every driver time to practice">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* A plain image is intentional: this is an externally hosted marketing asset. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.raisedash.com/media/landing/features/simulation-ink-record-to-replica.webp"
            alt="One phone recording an app walkthrough, an arrow flowing into a second phone where the same screen is a practice replica with the tap target ringed in orange."
            className="border-border h-auto w-full rounded-xs border"
          />
          <div>
            <p className="text-muted-foreground leading-relaxed">
              A demonstration shows the workflow once. A simulation lets each driver repeat it at
              their own pace and get help whenever they choose the wrong step.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Simulations run in the same phone browser as the rest of Raisedash training. Drivers
              sign in with a{" "}
              <Link
                href="/platform/driver-experience"
                className="text-foreground underline-offset-2 hover:underline"
              >
                one-time code
              </Link>{" "}
              and do not need to install an app. Sending a driver back through the ELD practice
              takes a link instead of another meeting. Completion is recorded like any other
              training activity.
            </p>
          </div>
        </div>
      </PlatformSection>

      <FaqSection title="Interactive simulation questions" faqs={FAQS} />

      <FeatureCrossLinks currentSlug="interactive-training-simulations" />

      <PlatformCTA
        title="Give every driver hands-on practice before day one."
        subtitle="Book a demo and complete a live practice simulation on your phone."
        footnote="Simulations are practice replicas for training. They record completion, not scores, and they never touch your real systems."
      />
    </PageLayout>
  );
}
