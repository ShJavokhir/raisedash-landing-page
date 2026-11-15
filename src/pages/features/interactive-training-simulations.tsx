import Link from "next/link";
import {
  Hand,
  Lightbulb,
  MousePointerClick,
  Route,
  Smartphone,
  TabletSmartphone,
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
    title: "Live tap targets, not screenshots",
    description: "Drivers tap real buttons and type into fields. Not a slideshow with arrows.",
    icon: MousePointerClick,
  },
  {
    title: "Mistap coaching",
    description: "A wrong tap shakes, shows what to look for, and lets the driver try again.",
    icon: Hand,
  },
  {
    title: "Hints on demand",
    description: "Stuck drivers get a nudge, not a dead end.",
    icon: Lightbulb,
  },
  {
    title: "Runs in the phone browser",
    description: "No app to install. Same browser drivers already use for orientation.",
    icon: Smartphone,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Record one walkthrough",
    description:
      "Screen-record the app while narrating what you're doing and why. That single video is the entire authoring effort.",
  },
  {
    title: "Raisedash builds the practice version",
    description:
      "The recording becomes a practice version with the same screens, order, and required actions. Automated checks verify correct and incorrect taps before your team can publish it.",
  },
  {
    title: "Drivers practice on their phones",
    description:
      "Drivers tap buttons, enter information, and move through realistic wait states. A hint is always available. The practice is complete only after the driver finishes every step.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is an interactive training simulation?",
    answer:
      "A tap-through practice version of a real app. Drivers follow every screen and step on their own phone and get coaching when they tap the wrong thing. You create one by recording a narrated walkthrough of the app.",
  },
  {
    question: "Is this a truck driving simulator?",
    answer:
      "No. It does not teach steering, backing, or vehicle handling. It is browser-based practice for the software drivers use: ELDs, fleet apps, dispatch workflows. Nothing to install.",
  },
  {
    question: "How do we create one?",
    answer:
      "Record a screen walkthrough of the app while narrating, then upload it. Compiling typically takes about 10 to 15 minutes. No storyboarding and no authoring tool to learn.",
  },
  {
    question: "What happens when a driver taps the wrong thing?",
    answer:
      "The wrong element shakes, a coaching message explains what to look for, and the step does not advance. A hint is always one tap away.",
  },
  {
    question: "Can a broken simulation reach drivers?",
    answer:
      "No. Automated checks walk the full flow, testing correct and incorrect taps, before your team can publish it.",
  },
  {
    question: "What counts as completing a simulation?",
    answer:
      "Finishing the entire flow on the driver's own phone. There is no skip button. Completion is recorded like any other training activity.",
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
      title="Interactive training simulations"
      description="Drivers tap through a practice copy of your ELD or fleet app in the phone browser. Record one walkthrough, and Raisedash builds it. No hardware."
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
        title="Drivers practice your ELD and fleet apps on their phone, before they touch the real thing."
        subhead="Record one walkthrough of the app. Raisedash turns it into a practice version drivers tap through in the browser, with coaching when they make a mistake."
        vignette={<SimVignette />}
      />

      <PlatformSection
        eyebrow="Why practice matters"
        title="Wrong taps in a live system cause real problems"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <p className="text-foreground text-lg leading-relaxed">
              A new driver may need to learn your ELD, dispatch app, inspection screens, and
              document process at the same time. A demonstration shows where to tap once, but it
              doesn&apos;t let every driver practice.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              When practice happens in the live system, a wrong tap can create a log error, delay a
              load, or require an admin to clean up the record. Drivers avoid asking for another
              demo because they don&apos;t want to slow the group down.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Raisedash gives each driver a safe practice version on their phone. They repeat the
              workflow, get guidance after a wrong tap, and arrive on the job already familiar with
              the tools. Practice can&apos;t change your live systems, logs, or company data.
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
        title="One recording becomes a practice version"
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection
        eyebrow="What it covers"
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

      <PlatformSection eyebrow="Details" title="How practice works for the driver">
        <FeatureGrid features={FEATURES} columns={4} accent="green" />
      </PlatformSection>

      <PlatformSection
        eyebrow="Repeatable practice"
        title="Send a driver back with a link, not another meeting"
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* A plain image is intentional: this is an externally hosted marketing asset. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.raisedash.com/media/landing/features/simulation-ink-record-to-replica.webp"
            alt="One phone recording an app walkthrough, an arrow flowing into a second phone where the same screen is a practice version with the tap target ringed in orange."
            className="border-border h-auto w-full rounded-xs border"
          />
          <div>
            <p className="text-muted-foreground leading-relaxed">
              A demo shows the workflow once. A simulation lets each driver repeat it at their own
              pace and get coaching whenever they pick the wrong step.
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
              and don&apos;t need to install anything. Completion is recorded like any other
              training activity.
            </p>
          </div>
        </div>
      </PlatformSection>

      <FaqSection title="Common questions" faqs={FAQS} />

      <FeatureCrossLinks currentSlug="interactive-training-simulations" />

      <PlatformCTA
        title="Give every driver hands-on practice before day one."
        subtitle="Book a demo and try a live simulation on your phone."
        footnote="Simulations record completion, not scores, and never touch your real systems."
      />
    </PageLayout>
  );
}
