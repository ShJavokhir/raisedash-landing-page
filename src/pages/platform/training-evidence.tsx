import { ShieldCheck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  CrossLinks,
  EvidencePacketVignette,
  FaqSection,
  LedgerVignette,
  PlatformCTA,
  PlatformHero,
  PlatformSection,
  StepList,
  type PlatformFaq,
  type PlatformStep,
} from "@/components/platform";

const STEPS: PlatformStep[] = [
  {
    title: "Assign training to the driver",
    description: "Pick the programs or lessons the driver needs to complete.",
  },
  {
    title: "Raisedash records as the driver works",
    description:
      "Progress, active time, quiz results, and completion dates are saved automatically.",
  },
  {
    title: "Open the driver's record anytime",
    description:
      "Everything is under one driver: assignments, status, completion dates, quiz scores, active time, and certificates.",
  },
  {
    title: "Download a PDF when you need it",
    description:
      "Export that driver's training record as a single PDF for your files, an insurer, or another authorized reviewer.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What's in the PDF training report?",
    answer:
      "A driver summary, every assigned training with its status and completion date, quiz attempts and scores, recorded active time, and certificates issued in Raisedash.",
  },
  {
    question: "Does the report cover our full driver file?",
    answer:
      "No. It covers online training recorded in Raisedash. It does not replace your driver qualification file, Clearinghouse process, medical records, road tests, or other carrier records.",
  },
  {
    question: "Can we download a report for one driver?",
    answer: "Yes. Open the driver's record and download the Raisedash training report as a PDF.",
  },
  {
    question: "Is this a legal or compliance guarantee?",
    answer:
      "No. Raisedash organizes training records. Your carrier remains responsible for driver qualification, required records, training decisions, and compliance with applicable laws and rules.",
  },
  {
    question: "Are policy e-signatures and road-test records in this report?",
    answer:
      "No. This report covers online training activity, quiz results, and certificates. Policy e-signatures are handled in Driver Paperwork, a separate Raisedash product, and are not part of this report. Road-test records are not recorded in Raisedash.",
  },
];

export default function TrainingEvidence() {
  return (
    <PageLayout
      title="Driver training records, one PDF"
      description="Each driver's online training assignments, completion dates, quiz scores, and certificates in one place. Download a PDF training report per driver."
      keywords={[
        "driver training records",
        "training documentation for trucking",
        "DOT audit training records",
        "driver training reports",
        "trucking training evidence",
      ]}
    >
      <PlatformHero
        eyebrow="Training records"
        eyebrowIcon={ShieldCheck}
        title="Every driver's training record in one PDF."
        subhead="Raisedash records what was assigned, when it was completed, quiz scores, active time, and certificates as drivers do their online training. Open a driver's record or download it as a PDF."
        vignette={<LedgerVignette />}
      />

      {/* Problem */}
      <PlatformSection
        eyebrow="The problem"
        title="Training records scattered across folders, email, and spreadsheets"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              When training details live in paper folders, email threads, spreadsheets, and separate
              course tools, answering &ldquo;did this driver finish that training?&rdquo; turns into
              a search. Raisedash builds the record while the driver does the work, so the answer is
              already there when your team, an insurer, or another authorized reviewer asks.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              What the record answers
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
        title="The record builds while the driver works"
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* Evidence packet showcase */}
      <PlatformSection
        eyebrow="PDF report"
        title="One driver. One PDF training report."
        align="center"
      >
        <div className="mx-auto max-w-xl">
          <EvidencePacketVignette />
        </div>
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="training-evidence" />

      {/* CTA */}
      <PlatformCTA
        title="See what a driver's training report looks like."
        subtitle="Book a demo to follow one driver from assignment to PDF."
        footnote="The report covers training information recorded in Raisedash."
      />
    </PageLayout>
  );
}
