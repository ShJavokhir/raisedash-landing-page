import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ClipboardList,
  HardHat,
  Headset,
  Link2,
  Lock,
  Search,
  ShieldCheck,
  Truck,
  UserPlus,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { plateStyle } from "@/components/receipts/figures";

/**
 * Figures for /products/feedback-telegram-bot, on the same graphite plate as
 * the receipts page (`.graphite-plate` in globals.css).
 *
 * Wording is copied from the product, not paraphrased: the bot's post
 * (backend survey-delivery.worker.ts surveyMessage), the driver's form
 * (learner-web components/feedback/feedback-form.tsx), the templates and the
 * results (dashboard components/feedback). When one of those changes, change
 * it here too. The fleet and the numbers are made up; Ridgeline Freight is the
 * same fleet as on the receipts page.
 *
 * The plate is dark in both themes, so everything on it uses literal colors.
 */

const surface =
  "rounded-lg border border-black/10 bg-white text-[#26251e] shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]";
const muted = "text-[#26251e]/55";
const accent = "#365c93";

/* ── Hero ────────────────────────────────────────────────────────────────── */

/** The survey post as the bot sends it. The link token hides behind a chip. */
function TelegramPost({ className }: { className?: string }) {
  return (
    <div className={cn("tg-wallpaper rounded-lg p-3 sm:p-4", className)}>
      <div className="max-w-[280px] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[13px] leading-snug text-black shadow-sm">
        <p className="text-[12.5px] font-semibold text-[#3a8fd6]">Raisedash Helper</p>
        <p className="mt-1">💬 Pay and home time</p>
        <p className="mt-2">Honest answers help us keep good drivers.</p>
        <p className="mt-2">Anonymous feedback</p>
        <p className="mt-0.5 inline-flex items-center gap-1 text-[#2f7bbf]">
          <Link2 className="h-3 w-3" aria-hidden="true" />
          on.raisedash.com/feedback/…
        </p>
        <p className="mt-1 text-right text-[10.5px] text-black/40">9:41 AM</p>
      </div>
    </div>
  );
}

const LEAVING = ["No", "Maybe", "Yes"];

/**
 * The hero: the bot's post, then the form it opens. A local demo; it never
 * collects or sends anything.
 */
export function HeroDemo() {
  const [rating, setRating] = useState<number | null>(null);
  const [leaving, setLeaving] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  return (
    <div
      style={plateStyle({ pos: "30% 40%" })}
      className="graphite-plate border-border grid items-center gap-4 rounded-xs border p-4 sm:grid-cols-[1fr_1.15fr] sm:gap-6 sm:p-8"
    >
      <TelegramPost className="self-start sm:mt-10" />
      <div className={cn(surface, "w-full overflow-hidden")}>
        <div className={cn("border-b border-black/10 px-5 py-3 text-[11px]", muted)}>
          Ridgeline Freight
        </div>
        {sent ? (
          <div className="space-y-3 px-5 py-12 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-[#16a34a]" aria-hidden="true" />
            <p className="text-xl font-semibold">Thank you</p>
            <p className={cn("text-sm", muted)}>Your feedback was sent to Ridgeline Freight.</p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setRating(null);
                setLeaving(null);
              }}
              className="min-h-11 text-sm underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="space-y-4 p-5">
            <div>
              <p className="text-xl leading-snug font-semibold">Pay and home time</p>
              <p className={cn("mt-1 text-[13px]", muted)}>
                Honest answers help us keep good drivers.
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-[13px]">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Anonymous feedback
              </p>
            </div>
            <fieldset>
              <legend className="mb-2.5 text-[13.5px] font-medium">
                1. How satisfied are you with your home time?
              </legend>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Choice
                    key={value}
                    name="demo-home-time"
                    label={String(value)}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                ))}
              </div>
              <div className={cn("mt-1.5 flex justify-between text-[11px]", muted)}>
                <span>Lowest</span>
                <span>Highest</span>
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2.5 text-[13.5px] font-medium">
                2. Are you thinking about leaving in the next 3 months?
              </legend>
              <div className="grid grid-cols-3 gap-1.5">
                {LEAVING.map((value) => (
                  <Choice
                    key={value}
                    name="demo-leaving"
                    label={value}
                    checked={leaving === value}
                    onChange={() => setLeaving(value)}
                  />
                ))}
              </div>
            </fieldset>
            <button
              type="button"
              disabled={rating === null || leaving === null}
              onClick={() => setSent(true)}
              className="flex min-h-11 w-full items-center justify-center rounded-full bg-[#26251e] px-4 text-sm text-white transition-opacity disabled:opacity-40"
            >
              Submit
            </button>
            <p className={cn("text-center text-[11px]", muted)}>Example only. Nothing is sent.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Choice({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "relative grid min-h-11 cursor-pointer place-items-center rounded-md border text-sm transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#365c93]",
        checked
          ? "border-[#365c93] bg-[#365c93] text-white"
          : "border-black/15 hover:bg-black/[0.03]"
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
      {label}
    </label>
  );
}

/* ── How it works ────────────────────────────────────────────────────────── */

/** Responses per day since publishing; 38 in all, like the stats above it. */
const DAILY = [9, 12, 6, 4, 3, 2, 2];
const DAYS = ["Sep 22", "", "", "", "", "", "Sep 28"];

function RatingRow({
  title,
  average,
  answered,
}: {
  title: string;
  average: number;
  answered: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-black/10 px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-[12px] leading-snug font-medium">{title}</p>
        <div className="mt-1.5 h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-black/[0.07]">
          <div
            className="h-full rounded-full"
            style={{
              width: `${(average / 5) * 100}%`,
              background: average < 3 ? "#c2410c" : accent,
            }}
          />
        </div>
        <p className={cn("mt-1 text-[10.5px]", muted)}>{answered} answered</p>
      </div>
      <p className="shrink-0 text-right">
        <span className="text-[20px] font-semibold tabular-nums">{average.toFixed(1)}</span>
        <span className={cn("text-[11px]", muted)}> / 5</span>
      </p>
    </div>
  );
}

/** The office's results page for one survey, cut down to what fits. */
export function ResultsFigure() {
  const max = Math.max(...DAILY);
  return (
    <div className={cn(surface, "w-full max-w-[560px] overflow-hidden")}>
      <div className="flex h-10 items-center gap-2 border-b border-black/10 px-4">
        <Image src="/logo.webp" alt="" width={18} height={18} className="rounded-[4px]" />
        <span className="text-[12px] font-semibold">Raisedash</span>
        <span className={cn("ml-auto text-[11px]", muted)}>Ridgeline Freight</span>
      </div>
      <div className="space-y-4 p-4">
        <p className="text-[15px] font-semibold">Pay and home time</p>
        <div className="flex flex-wrap gap-x-7 gap-y-2">
          {[
            ["38", "Responses"],
            ["24", "Groups reached"],
            ["Sep 28", "Last response"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-[22px] leading-tight font-semibold tabular-nums">{value}</p>
              <p className={cn("text-[11px]", muted)}>{label}</p>
            </div>
          ))}
        </div>
        <div className="hidden rounded-md border border-black/10 p-3 sm:block">
          <p className="text-[12px] font-medium">Responses over time</p>
          <div className="mt-2 flex h-16 items-end gap-2">
            {DAILY.map((count, i) => (
              <div key={i} className="flex h-full flex-1 flex-col justify-end">
                <div
                  className="rounded-t-[3px]"
                  style={{ height: `${(count / max) * 100}%`, background: accent }}
                />
              </div>
            ))}
          </div>
          <div className={cn("mt-1 flex justify-between text-[10px]", muted)}>
            {DAYS.filter(Boolean).map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <RatingRow title="1. How satisfied are you with your pay?" average={3.4} answered={38} />
          <RatingRow
            title="2. How satisfied are you with your home time?"
            average={2.6}
            answered={38}
          />
        </div>
      </div>
    </div>
  );
}

/* ── What you get ────────────────────────────────────────────────────────── */

/** 38 answers: 21 No, 11 Maybe, 6 Yes. */
const LEAVING_RESULTS = [
  { label: "No", pct: 55 },
  { label: "Maybe", pct: 29 },
  { label: "Yes", pct: 16 },
];

export function LeavingFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[272px] p-3.5")}>
      <p className="text-[12px] leading-snug font-medium">
        3. Are you thinking about leaving in the next 3 months?
      </p>
      <p className={cn("mt-1 text-[10.5px]", muted)}>38 answered</p>
      <ul className="mt-2.5 space-y-2">
        {LEAVING_RESULTS.map((row) => (
          <li key={row.label} className="text-[11.5px]">
            <div className="flex justify-between">
              <span>{row.label}</span>
              <span className="tabular-nums">{row.pct}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${row.pct}%`,
                  background: row.label === "No" ? accent : "#c2410c",
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const WRITTEN = [
  "More home time. I’ve been out 3 weeks straight.",
  "Loads never match what dispatch tells me.",
];

export function AnonymousFigure() {
  return (
    <div className="flex w-full max-w-[272px] flex-col items-center gap-2.5">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] text-white">
        <ShieldCheck className="h-3 w-3" />
        Anonymous feedback
      </span>
      <div className={cn(surface, "w-full space-y-2.5 p-3")}>
        <p className="text-[11.5px] font-medium">4. What would make you stay longer?</p>
        {WRITTEN.map((text) => (
          <p key={text} className="border-l-2 border-black/15 pl-2.5 text-[11.5px] leading-snug">
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

const TEMPLATES = [
  { icon: ClipboardList, name: "Weekly check-in" },
  { icon: Wallet, name: "Pay and home time" },
  { icon: Headset, name: "Dispatch feedback" },
  { icon: Truck, name: "Truck and equipment" },
  { icon: UserPlus, name: "New driver, first month" },
  { icon: HardHat, name: "Safety concerns" },
];

export function TemplatesFigure() {
  return (
    <div className={cn(surface, "grid w-full max-w-[288px] grid-cols-2 gap-1.5 p-2")}>
      {TEMPLATES.map(({ icon: Icon, name }) => (
        <span
          key={name}
          className={cn(
            "flex min-h-[46px] items-center gap-2 rounded-md border border-black/10 px-2 text-[11px] leading-tight",
            name === "Pay and home time" && "border-[#365c93] bg-[#365c93]/[0.06]"
          )}
        >
          <Icon className="h-3.5 w-3.5 shrink-0 text-[#26251e]/60" />
          {name}
        </span>
      ))}
    </div>
  );
}

const GROUPS = [
  { title: "Ridgeline 104", detail: "Mike Ruiz · Truck 104" },
  { title: "Ridgeline 118", detail: "Dan Novak · Truck 118" },
];

export function GroupsFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[272px] p-2.5")}>
      <div className="flex h-8 items-center gap-2 rounded-md border border-black/15 px-2.5 text-[11px]">
        <Search className="h-3.5 w-3.5 text-[#26251e]/45" />
        <span className={muted}>Search groups, drivers or trucks</span>
      </div>
      <div className="flex items-center justify-between px-1 pt-2 pb-1 text-[11px]">
        <span className="flex items-center gap-2 font-medium">
          <Checkbox /> Select all
        </span>
      </div>
      <ul className="space-y-1">
        {GROUPS.map((g) => (
          <li
            key={g.title}
            className="flex items-center gap-2 rounded-md border border-black/10 px-2 py-1 text-[11px]"
          >
            <Checkbox />
            <span className="min-w-0">
              <span className="block truncate font-medium">{g.title}</span>
              <span className={cn("block truncate text-[10px]", muted)}>{g.detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-2 px-1">
        <div className="flex justify-between text-[10.5px]">
          <span className="font-medium">Sending…</span>
          <span className={cn("tabular-nums", muted)}>86 of 214</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
          <div className="h-full w-[40%] rounded-full" style={{ background: accent }} />
        </div>
      </div>
    </div>
  );
}

function Checkbox() {
  return (
    <span className="grid size-3.5 shrink-0 place-items-center rounded-[3px] bg-[#365c93] text-white">
      <svg
        viewBox="0 0 12 12"
        className="size-2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2.5 6.2 5 8.5l4.5-5" />
      </svg>
    </span>
  );
}

export function NoAppFigure() {
  return (
    <div className="flex w-full max-w-[256px] flex-col items-center gap-2.5">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] text-white">
        <Lock className="h-3 w-3" />
        on.raisedash.com
      </span>
      <div className={cn(surface, "w-full p-3")}>
        <p className="text-[11.5px] font-medium">1. How was your week on the road?</p>
        <div className="mt-2 grid grid-cols-5 gap-1">
          {[1, 2, 3, 4, 5].map((v) => (
            <span
              key={v}
              className={cn(
                "grid h-8 place-items-center rounded-md border text-[11.5px]",
                v === 4 ? "border-[#365c93] bg-[#365c93] text-white" : "border-black/15"
              )}
            >
              {v}
            </span>
          ))}
        </div>
        <span className="mt-2.5 flex h-8 items-center justify-center rounded-full bg-[#26251e] text-[11.5px] text-white">
          Submit
        </span>
      </div>
    </div>
  );
}

export function NewDriverFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[272px] space-y-2 p-3")}>
      <p className="text-[12.5px] font-semibold">New driver, first month</p>
      {[
        { q: "How was your first month with us?", avg: 4.2 },
        { q: "How supported do you feel by the office?", avg: 3.1 },
      ].map(({ q, avg }) => (
        <div
          key={q}
          className="flex items-center justify-between gap-3 rounded-md border border-black/10 px-2.5 py-2"
        >
          <p className="text-[11px] leading-snug">{q}</p>
          <p className="shrink-0">
            <span className="text-[16px] font-semibold tabular-nums">{avg.toFixed(1)}</span>
            <span className={cn("text-[10px]", muted)}> / 5</span>
          </p>
        </div>
      ))}
    </div>
  );
}
