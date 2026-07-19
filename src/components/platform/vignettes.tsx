import {
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileCheck,
  History,
  Loader2,
  Lock,
  MessageSquareText,
  PenLine,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useVignetteLoop } from "@/hooks/useVignetteLoop";
import { BrowserFrame } from "./frames";

/**
 * The animated product vignettes that headline each platform page's hero — the
 * living, looping CSS mockups (no screenshots, no real data; initials-only
 * placeholder names). Extracted here so the homepage's "One system…" section
 * can reuse the exact same figures the platform pages show.
 */

/**
 * Looping pipeline vignette: a just-hired driver ("R. Malik") advances
 * Invited → In progress → Ready while the columns keep count. Blue is this
 * page's accent. Placeholder names only — obviously generic, not real data.
 */
export function PipelineVignette() {
  const step = useVignetteLoop(5, 1400);

  const malikColumn = step === 0 ? 0 : step <= 2 ? 1 : 2;
  const malikProgress = step === 0 ? 0 : step === 1 ? 30 : step === 2 ? 80 : 100;
  const columns = [
    { title: "Invited", count: 1 + (malikColumn === 0 ? 1 : 0), chips: ["D. Alvarez"] },
    { title: "In progress", count: 1 + (malikColumn === 1 ? 1 : 0), chips: ["J. Okafor"] },
    {
      title: "Complete",
      count: 2 + (malikColumn === 2 ? 1 : 0),
      chips: ["M. Rodriguez", "T. Nguyen"],
    },
  ];

  return (
    <div className="relative">
      <BrowserFrame url="app.raisedash.com/readiness">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-foreground text-sm font-normal">Orientation — Mon, Jul 20</p>
            <p className="text-muted-foreground mt-0.5 text-xs">Springfield location</p>
          </div>
          <span className="bg-accent-blue-soft text-accent-blue inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs">
            <Smartphone className="h-3 w-3" />
            SMS or email
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {columns.map((col, colIndex) => (
            <div key={col.title} className="bg-surface-2 rounded-xs p-2">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
                  {col.title}
                </span>
                <span
                  className={cn(
                    "rounded-full px-1.5 text-[10px] transition-colors duration-300",
                    colIndex === 2 ? "bg-success/10 text-success" : "bg-surface-3 text-foreground"
                  )}
                >
                  {col.count}
                </span>
              </div>
              <div className="space-y-1.5">
                {col.chips.map((chip) => (
                  <div
                    key={chip}
                    className="border-border bg-card text-foreground rounded-xs border px-2 py-1.5 text-[11px]"
                  >
                    {chip}
                    {colIndex === 2 ? (
                      <CheckCircle2 className="text-success ml-1 inline h-3 w-3" />
                    ) : null}
                  </div>
                ))}

                {/* The Ready column always reserves R. Malik's landing slot, so
                    the board keeps a single height as he moves (Ready is the
                    tallest column at 3 cards) — no layout shift under the copy on
                    the homepage. The slot is invisible until he actually lands. */}
                {colIndex === 2 ? (
                  <div
                    key="malik-ready"
                    aria-hidden={malikColumn !== 2}
                    className={cn(
                      "border-success/40 bg-success/10 text-success rounded-xs border px-2 py-1.5 text-[11px]",
                      malikColumn === 2 ? "animate-vignette-in animate-pulse-soft" : "invisible"
                    )}
                  >
                    R. Malik
                    <CheckCircle2 className="ml-1 inline h-3 w-3" />
                  </div>
                ) : malikColumn === colIndex ? (
                  <div
                    key={`malik-${malikColumn}`}
                    className="animate-vignette-in border-accent-blue/40 bg-accent-blue-soft text-foreground rounded-xs border px-2 py-1.5 text-[11px]"
                  >
                    R. Malik
                    {malikColumn === 1 ? (
                      <div className="bg-surface-3 mt-1.5 h-1 overflow-hidden rounded-full">
                        <div
                          className="bg-accent-blue h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${malikProgress}%` }}
                        />
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </BrowserFrame>

      {/* Floating SMS chip — the moment the invite goes out */}
      {step <= 1 ? (
        <div className="animate-vignette-in border-border bg-card absolute right-6 -bottom-4 flex items-center gap-2 rounded-xs border px-3 py-2 shadow-lg">
          <span className="bg-accent-blue-soft text-accent-blue flex h-6 w-6 items-center justify-center rounded-full">
            <MessageSquareText className="h-3.5 w-3.5" />
          </span>
          <span className="text-foreground text-xs">Orientation invite sent to R. Malik</span>
        </div>
      ) : null}
    </div>
  );
}

const LEDGER_ENTRIES = [
  {
    icon: Send,
    label: "Orientation assigned · invite texted",
    meta: "Opened on phone",
    date: "Mar 13 · 9:41 AM",
  },
  {
    icon: FileCheck,
    label: "HOS & ELD basics · lesson completed",
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
    label: "Accident procedures · reading completed",
    meta: "Completed on phone",
    date: "Mar 14 · 8:24 AM",
  },
];

/**
 * The evidence engine as a ledger that writes itself: entries land one at a
 * time on an amber timeline, each locking as it lands — history is only ever
 * appended, never rewritten. Amber is this page's accent.
 */
export function LedgerVignette() {
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
          Sample data
        </span>
      </div>

      {/* Timeline rail — every row (and the seal) is always present so the rail
          keeps one height under the homepage copy; rows reveal in sequence by
          fading in rather than mounting, which would change the height. */}
      <div className="border-accent-amber/25 ml-3 space-y-3 border-l pb-1 pl-4">
        {LEDGER_ENTRIES.map((row, i) => {
          const Icon = row.icon;
          const shown = i < visibleCount;
          const isNewest = i === visibleCount - 1 && !sealed;
          return (
            <div
              key={row.label}
              className={cn(
                "relative transition-opacity duration-500",
                shown ? "opacity-100" : "opacity-0"
              )}
            >
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
                  <p className="text-muted-foreground truncate text-[10px]">{row.meta}</p>
                </div>
                <div className="flex flex-shrink-0 flex-col items-end gap-0.5">
                  <span className="text-muted-foreground text-[10px]">{row.date}</span>
                  <Lock className="text-accent-amber/70 h-2.5 w-2.5" />
                </div>
              </div>
            </div>
          );
        })}

        <div
          className={cn(
            "relative transition-opacity duration-500",
            sealed ? "opacity-100" : "opacity-0"
          )}
        >
          <span className="bg-accent-amber absolute top-2 -left-[1.4rem] h-2 w-2 rounded-full" />
          <div className="border-accent-amber/40 bg-accent-amber-soft flex items-center gap-2 rounded-xs border px-3 py-2">
            <Lock className="text-accent-amber h-3.5 w-3.5 flex-shrink-0" />
            <p className="text-foreground text-xs">Training activity recorded under the driver</p>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

const PACKET_PARTS = [
  "Assigned trainings and completion dates",
  "Quiz attempts and scores",
  "Recorded training activity",
  "Completion certificates",
];

/**
 * The one-click packet, animated: "Generate" fires, the record assembles piece
 * by piece, and the packet lands ready to export — the demo-weapon moment.
 */
export function EvidencePacketVignette() {
  const step = useVignetteLoop(7, 1100);
  const assembling = step >= 1 && step <= 4;
  const done = step >= 5;
  const partsDone = step <= 0 ? 0 : Math.min(step, PACKET_PARTS.length);

  return (
    <BrowserFrame url="app.raisedash.com/drivers/packet">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-foreground text-sm font-normal">Training report — M. Rodriguez</p>
          <p className="text-muted-foreground mt-0.5 text-xs">Raisedash training activity</p>
        </div>
        {done ? (
          <span className="animate-vignette-in bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
            <FileCheck className="h-3 w-3" />
            PDF ready
          </span>
        ) : assembling ? (
          <span className="bg-accent-amber-soft text-accent-amber inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
            <Loader2 className="h-3 w-3 animate-spin" />
            Preparing report
          </span>
        ) : (
          <span className="border-border bg-surface-2 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px]">
            PDF report
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
            { value: "9", label: "Activities" },
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
          {done ? "Download PDF" : "Prepare report"}
        </span>
        <span
          className={cn(
            "border-border bg-card text-foreground flex flex-1 items-center justify-center gap-1.5 rounded-xs border px-3 py-2 text-xs transition-opacity duration-300",
            done ? "opacity-100" : "opacity-40"
          )}
        >
          <Download className="h-3.5 w-3.5" />
          Report preview
        </span>
      </div>
    </BrowserFrame>
  );
}

const MILESTONES = [
  { label: "Day 1", title: "Orientation wrap-up", meta: "Facility walkthrough · 3 short lessons" },
  { label: "Week 1", title: "Policy check-in", meta: "Backing & docking refresher" },
  { label: "Day 30", title: "Reinforcement + check-in", meta: "Manager check-in · short quiz" },
  { label: "Day 60", title: "Reinforcement", meta: "Route & fuel habits lesson" },
  { label: "Day 90", title: "Program review", meta: "Follow-up training complete" },
];

/**
 * The 90-day journey as a milestone track that fills in as the loop plays —
 * the riskiest period of a driver's career, visibly managed. Green accent.
 */
export function JourneyTrackVignette() {
  const step = useVignetteLoop(6, 1400);
  const current = Math.min(step, MILESTONES.length - 1);
  const complete = step >= MILESTONES.length;
  const milestone = MILESTONES[current];

  return (
    <BrowserFrame url="Concept preview · in development">
      <div className="mb-5 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-foreground truncate text-sm font-normal">Planned driver program</p>
          <p className="text-muted-foreground mt-0.5 truncate text-xs">
            J. Okafor · started Jun 30
          </p>
        </div>
        <span
          className={cn(
            "inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] whitespace-nowrap transition-colors duration-300",
            complete ? "bg-success/10 text-success" : "bg-surface-3 text-foreground"
          )}
        >
          <CalendarClock className="h-3 w-3" />
          {complete ? "Program complete" : milestone.label}
        </span>
      </div>

      {/* Milestone track */}
      <div className="mb-4 flex items-center px-1">
        {MILESTONES.map((m, i) => {
          const done = complete || i < current;
          const active = !complete && i === current;
          return (
            <div key={m.label} className={cn("flex items-center", i > 0 && "flex-1")}>
              {i > 0 ? (
                <div
                  className={cn(
                    "h-px flex-1 transition-colors duration-500",
                    done || active ? "bg-success/60" : "bg-border"
                  )}
                />
              ) : null}
              <div className="flex flex-col items-center gap-1 px-0.5">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300",
                    done
                      ? "border-success bg-success text-success-foreground"
                      : active
                        ? "border-success bg-success/10 text-success animate-pulse-soft"
                        : "border-border bg-surface-2 text-muted-foreground"
                  )}
                >
                  {done ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
                <span
                  className={cn(
                    "text-[9px] whitespace-nowrap",
                    done || active ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {m.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Current milestone detail */}
      <div
        key={complete ? "complete" : milestone.label}
        className="animate-vignette-in border-border bg-surface-2 rounded-xs border px-3 py-2.5"
      >
        {complete ? (
          <div className="flex items-center gap-2.5">
            <span className="bg-success/10 text-success flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xs">
              <FileCheck className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-xs font-normal">
                Planned 90-day program complete
              </p>
              <p className="text-muted-foreground truncate text-[10px]">
                Concept preview with sample data
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <span className="bg-success/10 text-success flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-xs">
              <ClipboardCheck className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-foreground truncate text-xs font-normal">
                {milestone.label} · {milestone.title}
              </p>
              <p className="text-muted-foreground truncate text-[10px]">{milestone.meta}</p>
            </div>
          </div>
        )}
      </div>
    </BrowserFrame>
  );
}

const LOOP_STAGES = [
  {
    icon: TriangleAlert,
    title: "Event recorded",
    meta: "Roadside inspection issue · Tue 2:14 PM",
    tone: "border-destructive/40 bg-destructive/10 text-destructive",
    iconTone: "bg-destructive/10 text-destructive",
  },
  {
    icon: RefreshCw,
    title: "Refresher assigned",
    meta: "Targeted lesson texted to driver",
    tone: "border-accent-blue/40 bg-accent-blue-soft text-accent-blue",
    iconTone: "bg-accent-blue-soft text-accent-blue",
  },
  {
    icon: FileCheck,
    title: "Completed · quiz passed",
    meta: "Done on the driver's phone",
    tone: "border-success/40 bg-success/10 text-success",
    iconTone: "bg-success/10 text-success",
  },
];

/**
 * The corrective-action loop, played in sequence: a red event becomes a blue
 * assignment, a green completion, and an amber entry in the evidence record.
 */
export function CorrectiveLoopVignette() {
  const step = useVignetteLoop(5, 1300);
  const activeStage = Math.min(step, LOOP_STAGES.length - 1);
  const sealed = step >= 3;

  return (
    <BrowserFrame url="Concept preview · in development">
      <div className="mb-4">
        <p className="text-foreground text-sm font-normal">Planned corrective action — S. Patel</p>
        <p className="text-muted-foreground mt-0.5 text-xs">Concept preview with sample data</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {LOOP_STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const reached = index <= activeStage;
          const isActive = index === activeStage && !sealed;
          return (
            <div key={stage.title} className="flex flex-1 items-stretch gap-2">
              <div
                className={cn(
                  "flex flex-1 flex-col rounded-xs border p-3 transition-all duration-500",
                  reached
                    ? "border-border bg-surface-2 opacity-100"
                    : "border-border/50 opacity-40",
                  isActive && "animate-vignette-in"
                )}
              >
                <span
                  className={cn(
                    "mb-2 flex h-7 w-7 items-center justify-center rounded-xs transition-colors duration-300",
                    reached ? stage.iconTone : "bg-surface-3 text-muted-foreground",
                    isActive && "animate-pulse-soft"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <p className="text-foreground text-xs font-normal">{stage.title}</p>
                <p className="text-muted-foreground mt-0.5 text-[10px] leading-snug">
                  {stage.meta}
                </p>
              </div>
              {index < LOOP_STAGES.length - 1 ? (
                <div className="hidden items-center sm:flex">
                  <ArrowRight
                    className={cn(
                      "h-4 w-4 transition-colors duration-300",
                      index < activeStage ? "text-foreground" : "text-muted-foreground/50"
                    )}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* The loop's landing place: the evidence record. Always rendered so its
          height is reserved at any width, and revealed when the loop closes. */}
      <div className="mt-3">
        <div
          className={cn(
            "border-accent-amber/40 bg-accent-amber-soft flex items-center gap-2 rounded-xs border px-3 py-2 transition-opacity duration-500",
            sealed ? "opacity-100" : "opacity-0"
          )}
        >
          <Lock className="text-accent-amber h-3.5 w-3.5 flex-shrink-0" />
          <p className="text-foreground text-xs">
            Planned: follow-up completion appears with the driver&apos;s training activity
          </p>
        </div>
      </div>
    </BrowserFrame>
  );
}
