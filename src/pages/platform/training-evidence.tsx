import {
  Clock,
  Download,
  FileCheck,
  History,
  Layers,
  Loader2,
  Lock,
  PenLine,
  Scale,
  Send,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useVignetteLoop } from "@/hooks/useVignetteLoop";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  BrowserFrame,
  CrossLinks,
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

const LEDGER_ENTRIES = [
  {
    icon: Send,
    label: "Orientation assigned · invite texted",
    meta: "Opened on phone",
    date: "Mar 13 · 9:41 AM",
  },
  {
    icon: FileCheck,
    label: "Hazmat handling · Lesson v3 completed",
    meta: "12 min on lesson",
    date: "Mar 14 · 8:02 AM",
  },
  {
    icon: ShieldCheck,
    label: "Knowledge check passed · 92%",
    meta: "Attempt 1 of 3",
    date: "Mar 14 · 8:19 AM",
  },
  {
    icon: PenLine,
    label: "Safety policy acknowledged",
    meta: "Signed on phone",
    date: "Mar 14 · 8:24 AM",
  },
];

/**
 * The evidence engine as a ledger that writes itself: entries land one at a
 * time on an amber timeline, each locking as it lands — history is only ever
 * appended, never rewritten. Amber is this page's accent.
 */
function LedgerVignette() {
  const step = useVignetteLoop(6, 1300);
  const visibleCount = Math.min(step + 1, LEDGER_ENTRIES.length);
  const sealed = step >= LEDGER_ENTRIES.length;

  return (
    <BrowserFrame url="app.raisedash.com/drivers/records">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-foreground text-sm font-normal">M. Rodriguez</p>
          <p className="text-muted-foreground mt-0.5 text-xs">Driver record · hired Mar 2024</p>
        </div>
        <span className="bg-accent-amber-soft text-accent-amber inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
          <History className="h-3 w-3" />
          Append-only
        </span>
      </div>

      {/* Timeline rail */}
      <div className="border-accent-amber/25 ml-3 min-h-[16.5rem] space-y-3 border-l pb-1 pl-4">
        {LEDGER_ENTRIES.slice(0, visibleCount).map((row, i) => {
          const Icon = row.icon;
          const isNewest = i === visibleCount - 1 && !sealed;
          return (
            <div key={row.label} className="animate-vignette-in relative">
              <span
                className={cn(
                  "absolute top-2 -left-[1.4rem] h-2 w-2 rounded-full",
                  isNewest
                    ? "bg-accent-amber animate-pulse-soft text-accent-amber"
                    : "bg-accent-amber/50"
                )}
              />
              <div className="border-border bg-surface-2 flex items-center gap-3 rounded-xs border px-3 py-2">
                <span className="bg-accent-amber-soft text-accent-amber flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xs">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground truncate text-xs font-normal">{row.label}</p>
                  <p className="text-muted-foreground text-[10px]">{row.meta}</p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-0.5">
                  <span className="text-muted-foreground text-[10px]">{row.date}</span>
                  <Lock className="text-accent-amber/70 h-2.5 w-2.5" />
                </div>
              </div>
            </div>
          );
        })}

        {sealed ? (
          <div className="animate-vignette-in relative">
            <span className="bg-accent-amber absolute top-2 -left-[1.4rem] h-2 w-2 rounded-full" />
            <div className="border-accent-amber/40 bg-accent-amber-soft flex items-center gap-2 rounded-xs border px-3 py-2">
              <Lock className="text-accent-amber h-3.5 w-3.5 flex-shrink-0" />
              <p className="text-foreground text-xs">
                Version-locked — editing a course never rewrites this history
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </BrowserFrame>
  );
}

const PACKET_PARTS = [
  "Training history & content versions",
  "Quiz scores and every attempt",
  "Signatures & acknowledgment text",
  "Completion certificates",
];

/**
 * The one-click packet, animated: "Generate" fires, the record assembles piece
 * by piece, and the packet lands ready to export — the demo-weapon moment.
 */
function EvidencePacketVignette() {
  const step = useVignetteLoop(7, 1100);
  const assembling = step >= 1 && step <= 4;
  const done = step >= 5;
  const partsDone = step <= 0 ? 0 : Math.min(step, PACKET_PARTS.length);

  return (
    <BrowserFrame url="app.raisedash.com/drivers/packet">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-foreground text-sm font-normal">Evidence packet — M. Rodriguez</p>
          <p className="text-muted-foreground mt-0.5 text-xs">Complete training record</p>
        </div>
        {done ? (
          <span className="animate-vignette-in bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
            <FileCheck className="h-3 w-3" />
            Ready in seconds
          </span>
        ) : assembling ? (
          <span className="bg-accent-amber-soft text-accent-amber inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
            <Loader2 className="h-3 w-3 animate-spin" />
            Assembling
          </span>
        ) : (
          <span className="border-border bg-surface-2 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px]">
            One click
          </span>
        )}
      </div>

      <div className="mb-3 space-y-1.5">
        {PACKET_PARTS.map((part, i) => {
          const collected = i < partsDone;
          return (
            <div
              key={part}
              className={cn(
                "flex items-center gap-2.5 rounded-xs border px-3 py-2 transition-all duration-500",
                collected
                  ? "border-border bg-surface-2 opacity-100"
                  : "border-border/50 bg-transparent opacity-40"
              )}
            >
              {collected ? (
                <FileCheck className="text-success h-3.5 w-3.5 flex-shrink-0" />
              ) : (
                <span className="border-border h-3.5 w-3.5 flex-shrink-0 rounded-full border" />
              )}
              <span className="text-foreground text-[11px]">{part}</span>
            </div>
          );
        })}
      </div>

      {done ? (
        <div className="animate-vignette-in border-border bg-surface-2 mb-3 grid grid-cols-3 gap-2 rounded-xs border p-3 text-center">
          {[
            { value: "14", label: "Lessons" },
            { value: "9", label: "Signatures" },
            { value: "6", label: "Quizzes" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-foreground text-lg font-normal">{stat.value}</p>
              <p className="text-muted-foreground text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="flex gap-2">
        <span
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-xs border px-3 py-2 text-xs transition-all duration-300",
            done
              ? "border-border bg-primary text-primary-foreground"
              : "border-accent-amber/40 bg-accent-amber-soft text-foreground",
            step === 0 && "animate-pulse-soft text-accent-amber"
          )}
        >
          <Download className="h-3.5 w-3.5" />
          {done ? "Export PDF" : "Generate packet"}
        </span>
        <span
          className={cn(
            "border-border bg-card text-foreground flex flex-1 items-center justify-center gap-1.5 rounded-xs border px-3 py-2 text-xs transition-opacity duration-300",
            done ? "opacity-100" : "opacity-40"
          )}
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </span>
      </div>
    </BrowserFrame>
  );
}

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
