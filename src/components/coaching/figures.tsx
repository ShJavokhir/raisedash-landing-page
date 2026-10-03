import { useId } from "react";
import Image from "next/image";
import {
  ArrowDown,
  Check,
  ChevronRight,
  Download,
  GraduationCap,
  Lock,
  Play,
  Smartphone,
  Sparkles,
  Video,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { GraphitePlate } from "@/components/receipts/figures";

/**
 * Figures for /products/driver-coaching: the office's side (safety events,
 * coaching rules, the driver's record) and the driver portal where drivers
 * watch their clip and take the lesson.
 *
 * Verified in code (2026-10-02): Samsara safety events and dashcam clips sync
 * into the dashboard's Safety section; event states "Needs coaching",
 * "Coached" and "Dismissed" are the dashboard's own badges
 * (raisedash-dashboard components/safety/status.ts); behavior labels are
 * Samsara's, split into words the way behaviorLabelText does; drivers are
 * ranked by events per 1,000 miles over 30 days (backend
 * src/integrations/schemas/driver-exposure.schema.ts); the portal sign-in is
 * a 6-digit code (same as the paperwork page).
 *
 * Asserted by the product owner 2026-10-02, not visible in these repos at the
 * time: the clip attached to a coaching lesson, rule-based automatic and
 * approve-first assignment, and the Motive integration. These panels are
 * drawn for this page, not copied from a screen, so they show the idea only:
 * no menu names or settings beyond "behavior, how many times, how many days,
 * which lesson, send now or ask first". Re-check against the product when it
 * ships in a repo we can read.
 *
 * The plate is dark in both themes, so everything on it uses literal colors.
 * People and the fleet are made up and match the paperwork and receipts pages
 * (Ridgeline Freight, Mike Ruiz, truck 104). Phone numbers are 555-01xx.
 */

const INK = "#26251e";
const surface =
  "rounded-lg border border-black/10 bg-white text-[#26251e] shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]";
const muted = "text-[#26251e]/55";

/* ── Shared bits ─────────────────────────────────────────────────────────── */

type Status = "Needs coaching" | "Sent" | "In progress" | "Coached" | "Dismissed" | "Complete";

/** The dashboard's badge colors, as literals (the plate ignores theme tokens). */
const BADGE: Record<Status, string> = {
  "Needs coaching": "bg-[#fee2e2] text-[#991b1b]",
  Sent: "bg-[#fef3c7] text-[#92400e]",
  "In progress": "bg-[#e0f2fe] text-[#075985]",
  Coached: "bg-[#d1fae5] text-[#065f46]",
  Complete: "bg-[#d1fae5] text-[#065f46]",
  Dismissed: "bg-black/[0.06] text-[#26251e]/60",
};

function Badge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md px-1.5 py-px text-[10.5px] font-medium whitespace-nowrap",
        BADGE[status],
        className
      )}
    >
      {status}
    </span>
  );
}

/** A label floating above a panel: who is looking at it. */
function Tag({ icon: Icon, children }: { icon: typeof Lock; children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] whitespace-nowrap text-white">
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

function InkButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-8 items-center justify-center gap-1.5 rounded-md bg-[#26251e] px-3 text-[11.5px] font-medium text-white",
        className
      )}
    >
      {children}
    </span>
  );
}

function OutlineButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-8 items-center justify-center gap-1.5 rounded-md border border-black/15 px-3 text-[11.5px] font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

/** A value picked in a sentence-style rule, drawn as a select. */
function Pick({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 rounded-md border border-black/15 bg-white px-1.5 py-px font-medium whitespace-nowrap">
      {children}
      <ChevronRight className="h-2.5 w-2.5 rotate-90 text-[#26251e]/45" />
    </span>
  );
}

/**
 * A road-facing dashcam frame at dusk, closing in on a trailer: the
 * following-distance event every page here coaches on. Pure SVG, so it stays
 * sharp at any size and needs no video file.
 */
function DashcamFrame({
  className,
  label = "Following Distance",
  time = "Oct 1, 4:12 PM",
  play = true,
}: {
  className?: string;
  label?: string;
  time?: string;
  play?: boolean;
}) {
  // Several frames share a page, and some are display:none on phones, so each
  // needs its own gradient ids (a hidden SVG's <defs> don't paint for others).
  const id = `cc${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-[#11161d]", className)}>
      <svg
        viewBox="0 0 320 180"
        className="block h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2b3a52" />
            <stop offset="1" stopColor="#c9875a" />
          </linearGradient>
          <linearGradient id={`${id}-road`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3a3d42" />
            <stop offset="1" stopColor="#1d1f22" />
          </linearGradient>
        </defs>
        <rect width="320" height="92" fill={`url(#${id}-sky)`} />
        <path d="M0 92 L320 92 L320 180 L0 180 Z" fill="#232a22" />
        <path d="M138 92 L182 92 L300 180 L20 180 Z" fill={`url(#${id}-road)`} />
        <path d="M159 96 L161 96 L163 108 L157 108 Z" fill="#e8e2c8" opacity="0.8" />
        <path d="M156 118 L164 118 L168 138 L152 138 Z" fill="#e8e2c8" opacity="0.8" />
        <path d="M150 152 L170 152 L176 180 L144 180 Z" fill="#e8e2c8" opacity="0.8" />
        {/* The trailer ahead, close. */}
        <rect x="118" y="58" width="84" height="62" rx="2" fill="#d9d6cc" />
        <rect x="118" y="58" width="84" height="62" rx="2" fill="none" stroke="#9c988c" />
        <line x1="160" y1="60" x2="160" y2="118" stroke="#9c988c" />
        <rect x="114" y="118" width="92" height="6" fill="#4a4a48" />
        <rect x="120" y="111" width="10" height="4" rx="1" fill="#e2482b" />
        <rect x="190" y="111" width="10" height="4" rx="1" fill="#e2482b" />
        <rect x="124" y="124" width="12" height="10" rx="2" fill="#151515" />
        <rect x="184" y="124" width="12" height="10" rx="2" fill="#151515" />
        {/* Hood edge. */}
        <path d="M0 168 Q160 150 320 168 L320 180 L0 180 Z" fill="#0d0f12" />
      </svg>
      {label ? (
        <span className="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-[4px] bg-[#dc2626] px-1.5 py-px text-[9px] font-semibold text-white">
          {label}
        </span>
      ) : null}
      <span className="absolute right-1.5 bottom-1.5 rounded-[4px] bg-black/55 px-1 py-px font-mono text-[8.5px] text-white/90">
        {time}
      </span>
      {play ? (
        <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/45 ring-1 ring-white/40 backdrop-blur-[2px]">
          <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
        </span>
      ) : null}
    </div>
  );
}

/** Office window chrome, as on the paperwork and receipts pages. */
function DashboardChrome({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(surface, "overflow-hidden", className)}>
      <div className="flex h-9 items-center gap-2 border-b border-black/10 px-3.5">
        <Image src="/logo.webp" alt="" width={16} height={16} className="rounded-[4px]" />
        <span className="text-[11.5px] font-semibold">Raisedash</span>
        <span className={cn("ml-auto text-[10.5px]", muted)}>Ridgeline Freight</span>
      </div>
      {children}
    </div>
  );
}

const PHONE_W = 248;
const PHONE_H = 492;

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-[40px] bg-[#1b1b1d] p-[6px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_60px_-24px_rgba(0,0,0,0.75)]",
        className
      )}
      style={{ width: PHONE_W, height: PHONE_H }}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[34px] bg-[#f7f7f4] antialiased"
        style={{
          color: INK,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div className="relative flex h-[30px] shrink-0 items-center justify-between px-[22px] pt-[2px] text-[11px] font-semibold">
          <span>9:41</span>
          <span className="absolute top-[7px] left-1/2 h-[18px] w-[62px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-[3px]">
            <i className="h-[7px] w-[3px] rounded-[1px] bg-current" />
            <i className="h-[8px] w-[3px] rounded-[1px] bg-current" />
            <i className="h-[9px] w-[3px] rounded-[1px] bg-current" />
            <i className="ml-1 h-[9px] w-[18px] rounded-[3px] border border-current p-[1px]">
              <i className="block h-full w-[70%] rounded-[1px] bg-current" />
            </i>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function PortalHeader() {
  return (
    <div className="flex h-10 shrink-0 items-center gap-2 border-b border-black/10 bg-white px-4">
      <Image src="/logo.webp" alt="" width={16} height={16} className="rounded-[4px]" />
      <span className="text-[12px] font-semibold">Ridgeline Freight</span>
      <span className="ml-auto grid size-6 place-items-center rounded-full bg-[#26251e]/10 text-[10px] font-semibold">
        MR
      </span>
    </div>
  );
}

/** The three parts of one coaching, as the driver moves through them. */
function LessonSteps({
  done,
  steps = ["Your clip", "Lesson", "3 questions"],
}: {
  done: number;
  /** Coaching sent by hand for a non-camera event has no clip step. */
  steps?: string[];
}) {
  return (
    <ol className="flex items-center gap-1.5 text-[10px]">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-1.5 py-px whitespace-nowrap",
              i < done
                ? "bg-[#26251e] text-white"
                : i === done
                  ? "border border-[#26251e] font-medium"
                  : "border border-black/15 text-[#26251e]/55"
            )}
          >
            {i < done ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
            {step}
          </span>
          {i < steps.length - 1 ? <i className="h-px w-2 bg-black/20" /> : null}
        </li>
      ))}
    </ol>
  );
}

/* ── Hero: the driver's coaching, and the office's list ──────────────────── */

/** The driver portal with one coaching open at the top. */
function PortalCoaching() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PortalHeader />
      <div className="relative min-h-0 flex-1 space-y-3 overflow-hidden px-3 pt-4">
        <p className="flex items-center gap-1.5 text-[12px] font-semibold">
          <GraduationCap className="h-3.5 w-3.5 text-[#26251e]/55" />
          Coaching for you
        </p>
        <div className="rounded-lg border border-[#26251e]/40 bg-white p-2.5">
          <DashcamFrame className="aspect-video w-full" />
          <p className="mt-2.5 text-[13px] leading-tight font-semibold">
            Keeping a safe following distance
          </p>
          <p className={cn("mt-1 text-[10.5px] leading-snug", muted)}>
            Watch your clip from Oct 1, then a short lesson. About 5 minutes.
          </p>
          <div className="mt-2.5">
            <LessonSteps done={0} />
          </div>
          <InkButton className="mt-3 h-8 text-[11.5px]">Watch your clip</InkButton>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white p-2">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#26251e]/[0.06]">
            <Check className="h-3.5 w-3.5 text-[#26251e]/60" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[11.5px] font-semibold">
              Hours of Service basics
            </span>
            <span className={cn("block text-[10px]", muted)}>Completed Sep 12</span>
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#f7f7f4] to-transparent" />
      </div>
    </div>
  );
}

const HERO_ROWS: { driver: string; event: string; source: string; status: Status }[] = [
  { driver: "Mike Ruiz", event: "Following Distance", source: "Samsara", status: "Sent" },
  { driver: "Anna Kim", event: "Mobile Usage", source: "Motive", status: "Coached" },
  { driver: "Dan Novak", event: "Rolling Stop", source: "Samsara", status: "Needs coaching" },
  {
    driver: "Luis Ortega",
    event: "Roadside inspection",
    source: "Added by you",
    status: "Coached",
  },
  { driver: "Sam Patel", event: "Speeding", source: "Motive", status: "In progress" },
  { driver: "Anna Kim", event: "Harsh Turn", source: "Samsara", status: "Dismissed" },
];

/** The office's coaching list: every event, where it came from, and where it stands. */
function OfficeList({ className }: { className?: string }) {
  return (
    <DashboardChrome className={className}>
      <div className="px-3.5 pt-3 pb-2">
        <p className="text-[14px] font-semibold">Coaching</p>
        <p className={cn("text-[10.5px]", muted)}>
          Every event that needs a follow-up, and who’s done.
        </p>
        <ul className="mt-2">
          {HERO_ROWS.map((row) => (
            <li
              key={`${row.driver}-${row.event}`}
              className="flex items-center gap-2 border-t border-black/[0.07] py-1.5"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-medium">{row.driver}</span>
                <span className={cn("block truncate text-[10px]", muted)}>
                  {row.event} · {row.source}
                </span>
              </span>
              <Badge status={row.status} />
            </li>
          ))}
        </ul>
      </div>
    </DashboardChrome>
  );
}

/**
 * The hero: the driver's phone, and the office's list beside it, tucked just
 * behind the phone's edge. On phones the office list drops out so the phone
 * stays readable. Same layout as the paperwork hero.
 */
export function HeroFigure() {
  return (
    <GraphitePlate
      crop={{ pos: "60% 35%", flip: true }}
      className="relative h-[540px] overflow-hidden"
    >
      <div className="relative mx-auto flex h-full w-full max-w-[720px] items-center justify-center sm:justify-start sm:pl-6">
        <OfficeList className="absolute top-1/2 right-5 left-[276px] hidden max-w-[400px] -translate-y-1/2 sm:block" />
        <Phone className="relative z-10">
          <PortalCoaching />
        </Phone>
      </div>
    </GraphitePlate>
  );
}

/* ── The three parts ─────────────────────────────────────────────────────── */

/**
 * A pair of panels side by side, each under a tag saying whose screen it is.
 * Phones only have room for one: the one named by `mobile`.
 */
function Pair({
  left,
  right,
  leftTag,
  rightTag,
  mobile = "right",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  leftTag: React.ReactNode;
  rightTag: React.ReactNode;
  mobile?: "left" | "right";
}) {
  const side = "min-w-0 flex-col items-center gap-2.5";
  return (
    <div className="flex w-full items-start justify-center gap-4 sm:gap-5">
      <div className={cn(side, mobile === "left" ? "flex" : "hidden sm:flex")}>
        {leftTag}
        {left}
      </div>
      <div className={cn(side, mobile === "right" ? "flex" : "hidden sm:flex")}>
        {rightTag}
        {right}
      </div>
    </div>
  );
}

/** One safety event in the office: the clip, the facts, and the button. */
function EventCard() {
  return (
    <DashboardChrome className="w-[252px]">
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold">Following Distance</p>
          <Badge status="Needs coaching" />
        </div>
        <p className={cn("text-[10.5px]", muted)}>Mike Ruiz · Truck 104 · Oct 1, 4:12 PM</p>
        <DashcamFrame className="mt-2 aspect-video w-full" play={false} />
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[10px]">
          <dt className={muted}>Speed</dt>
          <dd>58 mph</dd>
          <dt className={muted}>This month</dt>
          <dd>3rd Following Distance event</dd>
        </dl>
        <InkButton className="mt-2.5">
          <GraduationCap className="h-3.5 w-3.5" /> Send coaching
        </InkButton>
      </div>
    </DashboardChrome>
  );
}

const QUESTION_OPTIONS = [
  { label: "About 2 seconds, like a car", on: false },
  { label: "7 seconds or more", on: true },
  { label: "One truck length", on: false },
];

/** The driver's third step: a question about their own event. */
function QuestionCard() {
  return (
    <div className={cn(surface, "w-[252px] p-3.5")}>
      <div className="flex items-center justify-between text-[10.5px]">
        <span className={muted}>Question 2 of 3</span>
        <span className={muted}>Ridgeline Freight</span>
      </div>
      <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-black/10">
        <span className="block h-full w-[66%] rounded-full bg-[#26251e]" />
      </span>
      <p className="mt-3 text-[13.5px] leading-snug font-semibold">
        At 58 mph in a loaded tractor-trailer, how much space should you keep?
      </p>
      <ul className="mt-2.5 space-y-1.5">
        {QUESTION_OPTIONS.map((option) => (
          <li
            key={option.label}
            className={cn(
              "flex items-center gap-2 rounded-md border px-2.5 py-2 text-[11px] leading-snug",
              option.on ? "border-[#26251e] bg-[#26251e]/[0.04] font-medium" : "border-black/10"
            )}
          >
            <span
              className={cn(
                "grid size-3.5 shrink-0 place-items-center rounded-full border",
                option.on ? "border-[#26251e] bg-[#26251e]" : "border-black/25"
              )}
            >
              {option.on ? <i className="size-1.5 rounded-full bg-white" /> : null}
            </span>
            {option.label}
          </li>
        ))}
      </ul>
      <InkButton className="mt-3">Next</InkButton>
    </div>
  );
}

export function FromTheClipFigure() {
  return (
    <Pair
      leftTag={<Tag icon={Video}>Your dashboard</Tag>}
      left={<EventCard />}
      rightTag={<Tag icon={Smartphone}>Driver’s phone</Tag>}
      right={<QuestionCard />}
    />
  );
}

/** A rule, read as a sentence: behavior, how often, which lesson, how it goes out. */
function RuleCard({ className }: { className?: string }) {
  return (
    <div className={cn(surface, "w-[264px] p-3.5", className)}>
      <p className="flex items-center gap-1.5 text-[12.5px] font-semibold">
        <Zap className="h-3.5 w-3.5 text-[#f54e00]" /> Coaching rule
      </p>
      <div className="mt-2.5 space-y-2 text-[11px] leading-[1.9]">
        <p>
          <span className={muted}>When </span>
          <Pick>Following Distance</Pick>
          <span className={muted}> happens </span>
          <Pick>3 times</Pick>
          <span className={muted}> in </span>
          <Pick>7 days</Pick>
        </p>
        <p>
          <span className={muted}>Assign </span>
          <Pick>Keeping a safe following distance</Pick>
        </p>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-1 rounded-md bg-black/[0.05] p-0.5 text-[10.5px]">
        <span className="rounded-[5px] bg-white py-1 text-center font-medium shadow-sm">
          Ask me first
        </span>
        <span className={cn("py-1 text-center", muted)}>Send right away</span>
      </div>
      <p className={cn("mt-2 flex items-center gap-1.5 text-[10px]", muted)}>
        <span className="rounded-[4px] bg-black/[0.06] px-1 py-px">Samsara</span>
        <span className="rounded-[4px] bg-black/[0.06] px-1 py-px">Motive</span>
        events count toward this rule
      </p>
    </div>
  );
}

/** What the rule above produces when it's set to ask first. */
function ApprovalCard({ className }: { className?: string }) {
  return (
    <div className={cn(surface, "w-[252px] p-3", className)}>
      <p className="text-[12.5px] font-semibold">Waiting for you</p>
      <div className="mt-2 rounded-md border border-black/10 p-2.5">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full bg-[#26251e]/10 text-[9.5px] font-semibold">
            MR
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11.5px] font-semibold">Mike Ruiz</span>
            <span className={cn("block text-[10px]", muted)}>
              3 Following Distance events this week
            </span>
          </span>
        </div>
        <div className="mt-2 flex gap-1">
          {["Sep 27", "Sep 30", "Oct 1"].map((day) => (
            <DashcamFrame key={day} className="h-9 flex-1" label="" time={day} play={false} />
          ))}
        </div>
        <p className="mt-2 text-[10.5px] leading-snug">
          <span className={muted}>Lesson: </span>Keeping a safe following distance
        </p>
        <div className="mt-2 grid grid-cols-[auto_1fr] gap-1.5">
          <OutlineButton className="h-7 text-[11px]">Skip</OutlineButton>
          <InkButton className="h-7 text-[11px]">Send coaching</InkButton>
        </div>
      </div>
    </div>
  );
}

export function AutomaticFigure() {
  return (
    <Pair
      mobile="left"
      leftTag={<Tag icon={Zap}>Set once</Tag>}
      left={<RuleCard />}
      rightTag={<Tag icon={Check}>When it fires</Tag>}
      right={<ApprovalCard />}
    />
  );
}

const REASONS = ["Accident", "Roadside inspection", "Customer complaint", "Cargo claim", "Backing"];

function AssignDialog() {
  return (
    <DashboardChrome className="w-[252px]">
      <div className="p-3">
        <p className="text-[13px] font-semibold">Send coaching</p>
        <p className="mt-2 text-[10.5px] font-medium">What happened</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {REASONS.map((reason, i) => (
            <span
              key={reason}
              className={cn(
                "rounded-full border px-1.5 py-px text-[9.5px]",
                i === 1
                  ? "border-[#26251e] bg-[#26251e] text-white"
                  : "border-black/15 text-[#26251e]/65"
              )}
            >
              {reason}
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-[10.5px] font-medium">Lesson</p>
        <div className="mt-1 flex h-7 items-center rounded-md border border-black/15 px-2 text-[11px]">
          Pre-trip: lights and reflectors
        </div>
        <p className="mt-2.5 text-[10.5px] font-medium">Driver</p>
        <div className="mt-1 flex h-7 items-center rounded-md border border-black/15 px-2 text-[11px]">
          Dan Novak
        </div>
        <InkButton className="mt-3">Send coaching</InkButton>
      </div>
    </DashboardChrome>
  );
}

/** The text a driver gets, then the lesson it opens. */
function CoachingText({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-[240px] flex-col items-stretch gap-2.5", className)}>
      <div className="max-w-[94%] rounded-[18px] rounded-bl-[5px] bg-[#e9e9eb] px-3.5 py-2.5 text-[12px] leading-snug text-black shadow-[0_12px_24px_-14px_rgba(0,0,0,0.6)]">
        Ridgeline Freight sent you a short lesson: “Pre-trip: lights and reflectors”. Open it here:{" "}
        <span className="text-[#0a6cff] underline">https://on.raisedash.com</span>
      </div>
      <ArrowDown className="h-4 w-4 self-center text-white/70" />
      <div className={cn(surface, "p-3")}>
        <p className={cn("text-[10.5px]", muted)}>Coaching · About 4 minutes</p>
        <p className="text-[13px] leading-tight font-semibold">Pre-trip: lights and reflectors</p>
        <div className="mt-2">
          <LessonSteps done={0} steps={["Lesson", "3 questions"]} />
        </div>
      </div>
    </div>
  );
}

export function AnyEventFigure() {
  return (
    <Pair
      leftTag={<Tag icon={GraduationCap}>Your dashboard</Tag>}
      left={<AssignDialog />}
      rightTag={<Tag icon={Smartphone}>Driver’s phone</Tag>}
      right={<CoachingText />}
    />
  );
}

/* ── The record ──────────────────────────────────────────────────────────── */

const TIMELINE: { when: string; what: string; detail: string; dot: "event" | "step" | "done" }[] = [
  {
    when: "Oct 1, 4:12 PM",
    what: "Following Distance",
    detail: "Samsara event with dashcam clip",
    dot: "event",
  },
  {
    when: "Oct 1, 4:31 PM",
    what: "Coaching sent",
    detail: "Keeping a safe following distance",
    dot: "step",
  },
  { when: "Oct 2, 6:52 AM", what: "Driver opened it", detail: "Watched the clip", dot: "step" },
  { when: "Oct 2, 6:58 AM", what: "Completed", detail: "3 of 3 questions correct", dot: "done" },
];

/** One driver's record: the event, what you did about it, and when. */
export function RecordFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[340px] p-4")}>
      <div className="flex items-center gap-2">
        <span className="grid size-7 place-items-center rounded-full bg-[#26251e]/10 text-[10px] font-semibold">
          MR
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-semibold">Mike Ruiz</span>
          <span className={cn("block text-[10.5px]", muted)}>Coaching history</span>
        </span>
        <Badge status="Coached" />
      </div>
      <ol className="mt-3.5">
        {TIMELINE.map((item, i) => (
          <li key={item.what} className="relative flex gap-3 pb-3.5 last:pb-0">
            {i < TIMELINE.length - 1 ? (
              <span className="absolute top-3 bottom-0 left-[5px] w-px bg-black/15" />
            ) : null}
            <span
              className={cn(
                "relative mt-1 grid size-[11px] shrink-0 place-items-center rounded-full",
                item.dot === "event" && "bg-[#dc2626]",
                item.dot === "step" && "border-2 border-[#26251e] bg-white",
                item.dot === "done" && "bg-[#059669]"
              )}
            />
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-[11.5px] font-semibold">{item.what}</span>
                <span className={cn("shrink-0 font-mono text-[9.5px]", muted)}>{item.when}</span>
              </span>
              <span className={cn("block text-[10.5px]", muted)}>{item.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <OutlineButton className="mt-3.5">
        <Download className="h-3.5 w-3.5" /> Download PDF
      </OutlineButton>
    </div>
  );
}

/* ── What you get ────────────────────────────────────────────────────────── */

/** A brief turns into a lesson draft you review. */
export function BuildLessonFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[256px] p-3")}>
      <p className="flex items-center gap-1.5 text-[12px] font-semibold">
        <Sparkles className="h-3.5 w-3.5 text-[#f54e00]" /> New lesson
      </p>
      <div className="mt-2 rounded-md border border-black/15 p-2 text-[10.5px] leading-snug text-[#26251e]/80">
        Following distance for our drivers: 7 seconds or more at highway speed, and more in rain or
        at night.
      </div>
      <ul className="mt-2 space-y-1 text-[10.5px]">
        {["Video: Why 7 seconds", "What your clip shows", "3 questions"].map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <Check className="h-3 w-3 text-[#059669]" strokeWidth={3} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

const RANKED: { driver: string; rate: string; width: string }[] = [
  { driver: "Dan Novak", rate: "4.1", width: "88%" },
  { driver: "Mike Ruiz", rate: "2.7", width: "58%" },
  { driver: "Sam Patel", rate: "1.2", width: "26%" },
];

/** Drivers ranked by events per 1,000 miles, so long haul isn't punished for driving more. */
export function RankFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[256px] p-3")}>
      <p className="text-[12px] font-semibold">Events per 1,000 miles</p>
      <p className={cn("text-[10px]", muted)}>Last 30 days</p>
      <ul className="mt-2.5 space-y-2">
        {RANKED.map((row) => (
          <li key={row.driver} className="text-[10.5px]">
            <span className="flex justify-between">
              <span>{row.driver}</span>
              <span className="font-medium tabular-nums">{row.rate}</span>
            </span>
            <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
              <span
                className="block h-full rounded-full bg-[#26251e]"
                style={{ width: row.width }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const TASKS: { title: string; kind: string; status: Status }[] = [
  { title: "Driver orientation", kind: "Training", status: "Complete" },
  { title: "Keeping a safe following distance", kind: "Coaching", status: "Complete" },
  { title: "Pre-trip: lights and reflectors", kind: "Coaching", status: "In progress" },
];

/** One driver's page: orientation and coaching in the same list. */
export function DriverPageFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[268px] p-3")}>
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-[#26251e]/10 text-[9.5px] font-semibold">
          MR
        </span>
        <span className="text-[12.5px] font-semibold">Mike Ruiz</span>
      </div>
      <p className={cn("mt-2 text-[10.5px] font-medium", muted)}>Training &amp; coaching</p>
      <ul className="mt-1">
        {TASKS.map((task) => (
          <li
            key={task.title}
            className="flex items-center gap-2 border-t border-black/[0.07] py-1.5 text-[11px]"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate">{task.title}</span>
              <span className={cn("block text-[9.5px]", muted)}>{task.kind}</span>
            </span>
            <Badge status={task.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Today vs. with Raisedash ────────────────────────────────────────────── */

const TODAY = [
  "Watch the clip",
  "Call the driver. Voicemail.",
  "Wait a week for them to get back",
  "Talk it over in the office",
  "Nothing gets written down",
];

const WITH_US = [
  "The lesson goes out with the clip",
  "The driver finishes it on their phone",
  "It’s on their record",
];

export function TwoWays() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-card border-border rounded-xs border p-6 sm:p-8">
        <p className="text-muted-foreground font-mono text-xs tracking-[0.14em] uppercase">
          Before Raisedash
        </p>
        <ol className="mt-5 grid gap-2">
          {TODAY.map((step, i) => (
            <li
              key={step}
              className="border-border text-muted-foreground flex min-h-11 items-center gap-3 rounded-xs border px-3 py-2 text-sm"
            >
              <span className="text-muted-foreground/70 w-4 shrink-0 text-right font-mono text-xs tabular-nums">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <div className="border-accent/30 bg-accent/[0.04] flex flex-col rounded-xs border p-6 sm:p-8">
        <p className="text-accent font-mono text-xs tracking-[0.14em] uppercase">With Raisedash</p>
        <ol className="mt-5 grid gap-2">
          {WITH_US.map((step, i) => (
            <li
              key={step}
              className="border-accent/30 bg-card text-foreground flex min-h-11 items-center gap-3 rounded-xs border px-3 py-2 text-sm"
            >
              <span className="text-accent w-4 shrink-0 text-right font-mono text-xs tabular-nums">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
