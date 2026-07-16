import {
  Clock,
  Download,
  FileCheck,
  History,
  Layers,
  Lock,
  PenLine,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  CrossLinks,
  EvidencePacketVignette,
  FaqSection,
  FeatureGrid,
  LedgerVignette,
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
    title: "What was assigned",
    description: "See the training assigned to a driver and the current status of each assignment.",
    icon: Lock,
  },
  {
    title: "When it was completed",
    description: "Keep a clear date for every training the driver completed.",
    icon: History,
  },
  {
    title: "One report to review",
    description: "Bring the driver's Raisedash training details together in one PDF.",
    icon: FileCheck,
  },
  {
    title: "A copy you can share",
    description:
      "Use the report for an internal review or send it to the people your fleet chooses.",
    icon: Scale,
  },
  {
    title: "How the driver did",
    description: "Review recorded quiz attempts and scores next to the training assignment.",
    icon: Download,
  },
  {
    title: "Recorded activity",
    description: "See the active time recorded while the driver worked through the training.",
    icon: PenLine,
  },
  {
    title: "One driver history",
    description:
      "Keep trainings, quiz results, activity, and certificates together under one driver.",
    icon: Layers,
  },
  {
    title: "Available certificates",
    description: "Include certificates issued through Raisedash in the driver's PDF report.",
    icon: Clock,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Assign the work",
    description: "Choose the training the driver needs to complete.",
  },
  {
    title: "The record builds as they work",
    description:
      "Raisedash records progress, activity, quiz results, and completion details along the way.",
  },
  {
    title: "Review everything under the driver",
    description:
      "Review training status, completion dates, quiz attempts, activity, and certificates in one place.",
  },
  {
    title: "Save a copy when you need it",
    description:
      "Export the Raisedash training information for that driver as a PDF when you need a copy.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What's in the PDF training report?",
    answer:
      "The report includes a driver summary, assigned trainings, completion details, quiz attempts and scores, recorded activity, and certificates available in Raisedash.",
  },
  {
    question: "Does the report include every document in our driver file?",
    answer:
      "No. It covers training information recorded in Raisedash. It does not replace your driver qualification file, Clearinghouse process, medical records, road tests, or other carrier records.",
  },
  {
    question: "Can we download a report for one driver?",
    answer:
      "Yes. Open the driver's record and download the available Raisedash training information as a PDF.",
  },
  {
    question: "Is this a legal or compliance guarantee?",
    answer:
      "No. Raisedash helps organize training records. Your carrier remains responsible for driver qualification, required records, training decisions, and compliance with applicable laws and rules.",
  },
  {
    question: "Does Raisedash record policy signatures or road tests?",
    answer:
      "Not today. The current product records online training activity, quiz results, and certificates. Policy e-signatures and road-test records are not part of the current report.",
  },
];

export default function TrainingEvidence() {
  return (
    <PageLayout
      title="Driver Training Records for Trucking Fleets"
      description="Keep each driver's online training activity together, quickly see what they completed and when, and download a clear PDF report."
      keywords={[
        "driver training records",
        "training documentation for trucking",
        "DOT audit training records",
        "driver training reports",
        "trucking training evidence",
      ]}
    >
      <PlatformHero
        eyebrow="Training evidence"
        eyebrowIcon={ShieldCheck}
        title="Know what happened without rebuilding the story."
        subhead="Raisedash keeps each driver's online training activity together as it happens, so your safety team can answer what was completed, when it happened, and how the driver did."
        vignette={<LedgerVignette />}
      />

      {/* Problem */}
      <PlatformSection
        eyebrow="The problem"
        title="The record should not be harder to find than the training"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              When training details sit in paper folders, email threads, spreadsheets, and separate
              course tools, even a simple question can turn into a search. Your team loses time
              piecing together what was assigned, what was finished, and when it happened.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed font-normal">
              Raisedash builds the online training record while the driver does the work. When your
              team, an insurer, or another authorized reviewer asks for the details, you have a
              clear place to start.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              What a useful record should answer
            </p>
            <ul className="space-y-3">
              {[
                "What was assigned to this driver?",
                "What was completed, and when?",
                "What result or activity was recorded?",
                "Where can we get a copy?",
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
        title="The record builds while the work happens"
        lede="The driver completes training once. Raisedash organizes the details your team may need later."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* Evidence packet showcase */}
      <PlatformSection
        eyebrow="PDF report"
        title="One driver. One organized training report."
        lede="Review the online training recorded in Raisedash and save the available details as a PDF."
        align="center"
      >
        <div className="mx-auto max-w-xl">
          <EvidencePacketVignette />
        </div>
      </PlatformSection>

      {/* Feature grid */}
      <PlatformSection eyebrow="What's inside" title="A record your team can actually use">
        <FeatureGrid features={FEATURES} columns={4} accent="amber" />
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="training-evidence" />

      {/* CTA */}
      <PlatformCTA
        title="See the record your team would work with."
        subtitle="Book a demo to follow one driver's training from assignment to PDF report."
        footnote="The report covers training information recorded in Raisedash."
      />
    </PageLayout>
  );
}
