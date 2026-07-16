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
    title: "Version-locked records",
    description:
      "Every lesson version, acknowledgment text, quiz attempt, score, signature, and timestamp is captured and preserved. What a driver saw is exactly what stays on file.",
    icon: Lock,
  },
  {
    title: "Editing never rewrites history",
    description:
      "Improve a course tomorrow and a driver who finished last year keeps the exact version they completed. A completed record is never silently changed.",
    icon: History,
  },
  {
    title: "One-click evidence packet",
    description:
      "Assemble a complete, organized record for any driver in seconds — the thing that used to take days of digging through folders and inboxes.",
    icon: FileCheck,
  },
  {
    title: "Built for the people who ask",
    description:
      "Auditors, insurers, and attorneys in discovery all ask the same question: what was this driver trained on, and when? The packet answers it.",
    icon: Scale,
  },
  {
    title: "Exports in every plan",
    description:
      "PDF and CSV exports are included on every plan. Your completion records are yours — we never hold them hostage behind a higher tier.",
    icon: Download,
  },
  {
    title: "Signatures with the real text",
    description:
      "Policy acknowledgments and e-signatures are stored with the exact language the driver agreed to, not just a checked box.",
    icon: PenLine,
  },
  {
    title: "Everything under one driver",
    description:
      "Lessons, quizzes, signatures, and road-test checklists live together on each driver's record.",
    icon: Layers,
  },
  {
    title: "A timeline with timestamps",
    description:
      "Each record carries its own date and time, assembled into a chronological history you can hand over as generated.",
    icon: Clock,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Every action is recorded as it happens",
    description:
      "As a driver watches a lesson, passes a quiz, or signs a policy, the record is written with its version and timestamp — automatically, in the background.",
  },
  {
    title: "Content edits create versions, not overwrites",
    description:
      "When you improve a course, the new version applies to future assignments. Drivers who already finished keep their original record, exactly as it was.",
  },
  {
    title: "Pull a complete packet in seconds",
    description:
      "Open any driver, click once, and get an organized record of everything they completed — ready to export as PDF or CSV.",
  },
  {
    title: "Hand it to whoever is asking",
    description:
      "Give the packet to an auditor, an insurer at renewal, or your attorney in discovery, exactly as it was generated.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What's actually in an evidence packet?",
    answer:
      "For a given driver: which lessons they completed and the exact version, the acknowledgment text they signed, quiz attempts and scores, e-signatures, and a timestamp for each — organized into one record you can export as PDF or CSV.",
  },
  {
    question: "If we edit a course, does it change what past drivers completed?",
    answer:
      "No. Editing a course creates a new version that applies to future assignments. A driver who completed the earlier version keeps that exact record. We never rewrite a completed driver's history.",
  },
  {
    question: "Can we export our data, or is it locked in?",
    answer:
      "You can export at any time. PDF and CSV exports are included on every plan. Your completion records belong to you, and we will not hold them hostage.",
  },
  {
    question: "Is this a legal or compliance guarantee?",
    answer:
      "No. Raisedash organizes and preserves the records of what training was delivered and acknowledged. What those records demonstrate in an audit or a lawsuit is a question for your auditor, insurer, or attorney — we provide the documentation, not legal advice.",
  },
  {
    question: "How long are records kept?",
    answer:
      "Records are preserved for the life of your account, so you can produce history for a driver hired years ago. Exports let you keep your own copies as well.",
  },
];

export default function TrainingEvidence() {
  return (
    <PageLayout
      title="Driver Training Records & Litigation-Ready Proof"
      description="Raisedash preserves every lesson version, acknowledgment, quiz score, signature, and timestamp permanently — and assembles a complete, litigation-ready training packet for any driver in one click. PDF and CSV exports in every plan."
      keywords={[
        "driver training records",
        "training documentation for trucking",
        "DOT audit training records",
        "litigation-ready training proof",
        "trucking training evidence",
      ]}
    >
      <PlatformHero
        eyebrow="The evidence engine"
        eyebrowIcon={ShieldCheck}
        title="Every signature and score. Preserved forever. Assembled in one click."
        subhead="When an auditor, insurer, or attorney asks what a driver was trained on two years ago, most fleets spend days reconstructing it. Raisedash keeps a permanent, version-locked record of everything — and produces the complete packet before they've finished asking."
        vignette={<LedgerVignette />}
      />

      {/* Problem */}
      <PlatformSection eyebrow="The problem" title="The question nobody can answer fast">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              A crash happens. Months later, a discovery request lands: prove exactly what this
              driver was trained on, and when. The records are in paper folders, a spreadsheet, an
              old email thread, and a filing cabinet — and the course was edited twice since then,
              so nobody's even sure which version the driver actually saw.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed font-normal">
              In an industry where a single verdict can run into the millions, that gap isn't an
              inconvenience. It's exposure. And it's the same gap an insurer probes at renewal and
              an auditor opens a file to check.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              Who asks, and why it matters
            </p>
            <ul className="space-y-3">
              {[
                "Auditors checking that training happened and was documented",
                "Insurers weighing your safety process at renewal",
                "Attorneys in discovery after a serious event",
                "You — trying to reconstruct a record from two years ago",
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
        title="Recorded as it happens. Never rewritten."
        lede="The record builds itself while drivers work, and stays true to what each driver actually saw."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* Evidence packet showcase */}
      <PlatformSection
        eyebrow="The demo weapon"
        title="The one-click evidence packet"
        lede="Open a driver, click once, and hand over a complete, organized, exportable record — in seconds, not days."
        align="center"
      >
        <div className="mx-auto max-w-xl">
          <EvidencePacketVignette />
        </div>
      </PlatformSection>

      {/* Feature grid */}
      <PlatformSection eyebrow="What's inside" title="Proof, built into the platform">
        <FeatureGrid features={FEATURES} columns={4} accent="amber" />
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="training-evidence" />

      {/* CTA */}
      <PlatformCTA
        title="Watch a full evidence packet come together in seconds."
        subtitle="Book a demo and see the record an auditor, insurer, or attorney would actually receive."
        footnote="Exports included in every plan. Your records are always yours."
      />
    </PageLayout>
  );
}
