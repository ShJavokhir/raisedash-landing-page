import { useEffect, useState } from "react";
import { Check, Forward, Music, Pause, Search, Eye } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Figures for /products/ringcentral-telegram: RingCentral call recordings
 * posted to a Telegram chat (raisedash-apps/ringcentral-recordings).
 *
 * Wording is copied from the product, not paraphrased: the caption is
 * formatCaption in main.go ("From: Name (number)", "To: …", "Called at:" with
 * RingCentral's raw UTC startTime), an empty name becomes "NO NAME", a call
 * without a recording adds RingCentral's action and result ("Phone Call
 * Missed"), and the audio file is named recording-<sessionId>.mp3. When the
 * bot changes, change it here too.
 *
 * The hero is rebuilt from a real customer's channel, in Telegram's dark
 * theme. Names, numbers and the company are NOT the real ones: they are made
 * up and then blurred, so nothing real is in the page source either. The card
 * figures use a made-up fleet with 555 numbers.
 */

const tg = {
  bg: "bg-[#0e1621]",
  bar: "bg-[#17212b]",
  bubble: "bg-[#182533] text-[#f5f5f5]",
  link: "text-[#6ab3f3]",
  meta: "text-[#6c7883]",
  play: "bg-[#3e99e6]",
};

/** Made-up text, blurred. Screen readers hear "hidden" instead. */
function Blur({ children }: { children: string }) {
  return (
    <>
      <span aria-hidden="true" className="inline-block blur-[4.5px] select-none">
        {children}
      </span>
      <span className="sr-only">hidden</span>
    </>
  );
}

interface Call {
  id: string;
  from: React.ReactNode;
  fromNo: string;
  to: React.ReactNode;
  toNo: string;
  at: string;
  /** RingCentral's action + result, posted when there is no recording. */
  status?: string;
  recording?: { file: string; seconds: number };
  /** Telegram's own post time, in the reader's local time. */
  time: string;
  blurNumbers?: boolean;
}

function Party({
  label,
  name,
  number,
  blur,
}: {
  label: string;
  name: React.ReactNode;
  number: string;
  blur?: boolean;
}) {
  return (
    <p>
      {label}: {name} (<span className={tg.link}>{blur ? <Blur>{number}</Blur> : number}</span>)
    </p>
  );
}

function Caption({ call }: { call: Call }) {
  return (
    <>
      <Party label="From" name={call.from} number={call.fromNo} blur={call.blurNumbers} />
      <Party label="To" name={call.to} number={call.toNo} blur={call.blurNumbers} />
      <p>Called at: {call.at}</p>
    </>
  );
}

function PostMeta({ time, className }: { time: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11px] whitespace-nowrap",
        tg.meta,
        className
      )}
    >
      <Eye className="h-3 w-3" aria-hidden="true" />2 {time}
    </span>
  );
}

const clock = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

/** Telegram's audio row: a round button, the file name, and the length. */
function AudioRow({
  file,
  seconds,
  elapsed,
  playing,
  onToggle,
}: {
  file: string;
  seconds: number;
  elapsed?: number;
  playing?: boolean;
  onToggle?: () => void;
}) {
  const started = elapsed !== undefined && (playing || elapsed > 0);
  const Icon = playing ? Pause : Music;
  const button = (
    <span
      className={cn("grid size-11 shrink-0 place-items-center rounded-full text-white", tg.play)}
    >
      <Icon className="h-5 w-5" fill={playing ? "currentColor" : "none"} aria-hidden="true" />
    </span>
  );
  return (
    <div className="flex items-center gap-3">
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          aria-label={playing ? "Pause the example call" : "Play the example call (no sound)"}
          className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6ab3f3]"
        >
          {button}
        </button>
      ) : (
        button
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium">{file}</p>
        {started ? (
          <div className="mt-1.5 flex items-center gap-2">
            <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
              <span
                className="block h-full rounded-full bg-[#6ab3f3] transition-[width] duration-1000 ease-linear motion-reduce:transition-none"
                style={{ width: `${(elapsed / seconds) * 100}%` }}
              />
            </span>
            <span className={cn("text-[12px] tabular-nums", tg.meta)}>
              {clock(elapsed)} / {clock(seconds)}
            </span>
          </div>
        ) : (
          <p className={cn("mt-0.5 text-[13px] tabular-nums", tg.meta)}>{clock(seconds)}</p>
        )}
      </div>
    </div>
  );
}

function Bubble({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative w-fit max-w-[94%] rounded-2xl rounded-bl-md px-3.5 py-2.5 text-[13px] leading-[1.45] sm:text-[13.5px]",
        tg.bubble,
        className
      )}
    >
      {children}
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

const HERO_CALLS: Call[] = [
  {
    id: "missed",
    from: <Blur>R HALVERSON</Blur>,
    fromNo: "+15550148822",
    to: "NO NAME",
    toNo: "+15550190374",
    at: "2026-09-30T13:45:40.632Z",
    status: "Phone Call Missed",
    time: "6:49 AM",
  },
  {
    id: "safety",
    from: "Safety Manager",
    fromNo: "+15550190374",
    to: <Blur>Dale Hutchins</Blur>,
    toNo: "+15550127716",
    at: "2026-09-30T14:55:07.642Z",
    recording: { file: "recording-3104475210008.mp3", seconds: 46 },
    time: "7:59 AM",
  },
  {
    id: "vendor",
    from: <Blur>NORTHPOINT PARTS</Blur>,
    fromNo: "+15550163095",
    to: "NO NAME",
    toNo: "+15550190374",
    at: "2026-09-30T15:12:31.782Z",
    recording: { file: "recording-3104529870008.mp3", seconds: 100 },
    time: "8:14 AM",
  },
  {
    id: "accepted",
    from: <Blur>JT</Blur>,
    fromNo: "+15550152281",
    to: "NO NAME",
    toNo: "+15550193344",
    at: "2026-09-30T16:00:33.730Z",
    status: "Phone Call Accepted",
    time: "9:04 AM",
  },
].map((call) => ({ ...call, blurNumbers: true }));

/** Posts a moment after the page loads, the way a new call would. */
const ARRIVING: Call = {
  id: "voicemail",
  from: <Blur>MARISOL ORTEGA</Blur>,
  fromNo: "+15550171260",
  to: "NO NAME",
  toNo: "+15550190374",
  at: "2026-09-30T18:25:56.921Z",
  status: "Phone Call Voicemail",
  time: "11:29 AM",
  blurNumbers: true,
};

const lengthOf = (id: string) => HERO_CALLS.find((c) => c.id === id)?.recording?.seconds ?? 0;

/**
 * The customer's channel, rebuilt. A local demo: the play buttons move a
 * progress bar and play no sound.
 */
export function ChannelDemo() {
  const [player, setPlayer] = useState<{ id: string; t: number; on: boolean } | null>(null);
  const [arrived, setArrived] = useState(false);
  const activeId = player?.on ? player.id : null;

  useEffect(() => {
    const timer = setTimeout(() => setArrived(true), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!activeId) return;
    const total = lengthOf(activeId);
    const timer = setInterval(() => {
      setPlayer((p) => {
        if (!p || !p.on) return p;
        return p.t + 1 >= total ? { ...p, t: 0, on: false } : { ...p, t: p.t + 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeId]);

  const toggle = (id: string) =>
    setPlayer((p) => (p && p.id === id ? { ...p, on: !p.on } : { id, t: 0, on: true }));

  const calls = arrived ? [...HERO_CALLS, ARRIVING] : HERO_CALLS;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xs border border-black/20 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_24px_48px_-20px_rgba(0,0,0,0.45)]",
        tg.bg
      )}
    >
      <div className={cn("flex items-center gap-3 border-b border-black/30 px-4 py-2.5", tg.bar)}>
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#f39bd6] to-[#c45cf0] text-[15px] font-medium text-white"
        >
          C
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium text-white">
            Call Recordings (<Blur>Halvorsen Lines</Blur>) - Quality Control and Training
          </p>
          <p className={cn("text-[12px]", tg.meta)}>5 subscribers</p>
        </div>
        <Search className={cn("h-5 w-5 shrink-0", tg.meta)} aria-hidden="true" />
      </div>

      <div className="relative flex h-[440px] flex-col justify-end gap-2 overflow-hidden px-3 pt-6 pb-3 sm:h-[500px] sm:px-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#0e1621] to-transparent"
        />
        {calls.map((call) => (
          <Bubble
            key={call.id}
            className={cn(
              call.id === ARRIVING.id && "animate-fade-in-up motion-reduce:animate-none"
            )}
          >
            {call.recording ? (
              <>
                <AudioRow
                  {...call.recording}
                  elapsed={player?.id === call.id ? player.t : 0}
                  playing={activeId === call.id}
                  onToggle={() => toggle(call.id)}
                />
                <div className="mt-2">
                  <Caption call={call} />
                </div>
                <PostMeta time={call.time} className="float-right -mt-1 ml-3" />
              </>
            ) : (
              <>
                <Caption call={call} />
                <p className="mt-3 flex items-end justify-between gap-4">
                  <span>{call.status}</span>
                  <PostMeta time={call.time} />
                </p>
              </>
            )}
          </Bubble>
        ))}
      </div>

      <div className={cn("flex justify-center border-t border-black/30 py-2.5", tg.bar)}>
        <span className="rounded-full px-6 py-1.5 text-[13px] text-[#6ab3f3]">Mute</span>
      </div>
    </div>
  );
}

/* ── One call, two ways ──────────────────────────────────────────────────── */

const RC_STEPS = [
  "Open your laptop",
  "Log in to RingCentral",
  "Open the call log",
  "Pick the person and the day",
  "Scroll to the right call",
  "Press play",
];

const TG_STEPS = ["Open Telegram", "Tap play"];

export function TwoWays() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-card border-border rounded-xs border p-6 sm:p-8">
        <p className="text-muted-foreground font-mono text-xs tracking-[0.14em] uppercase">
          Before Raisedash
        </p>
        <ol className="mt-5 grid gap-2">
          {RC_STEPS.map((step, i) => (
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
      <div className="border-accent/30 bg-accent/[0.04] rounded-xs border p-6 sm:p-8">
        <p className="text-accent font-mono text-xs tracking-[0.14em] uppercase">With Raisedash</p>
        <ol className="mt-5 grid gap-2">
          {TG_STEPS.map((step, i) => (
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

/* ── How it works: what one message says ─────────────────────────────────── */

function Marker({ n, className }: { n: number; className?: string }) {
  return (
    <span
      className={cn(
        "absolute grid size-5 place-items-center rounded-full bg-[#f54e00] text-[11px] font-medium text-white ring-2 ring-[#0e1621]",
        className
      )}
    >
      {n}
    </span>
  );
}

const ANATOMY = [
  "Who called, with their number.",
  "Who it went to. NO NAME means RingCentral had no name for that number.",
  "When the call started. RingCentral gives this time in UTC.",
  "The recording. If there isn’t one, you see what happened instead, like Missed or Voicemail.",
];

export function MessageAnatomy() {
  return (
    <div className="w-full max-w-[460px] min-w-0">
      <div className="relative pr-9">
        <Bubble className="max-w-full [overflow-wrap:anywhere]">
          <div className="relative">
            <AudioRow file="recording-3104529870008.mp3" seconds={100} />
            <Marker n={4} className="top-3 -right-[50px]" />
          </div>
          <div className="mt-2 space-y-0">
            <div className="relative">
              <Party label="From" name="Dispatch 2" number="+15550142210" />
              <Marker n={1} className="top-0 -right-[50px]" />
            </div>
            <div className="relative">
              <Party label="To" name="COASTLINE LOGISTICS" number="+15550186403" />
              <Marker n={2} className="top-0 -right-[50px]" />
            </div>
            <div className="relative">
              <p>Called at: 2026-09-30T15:12:31.782Z</p>
              <Marker n={3} className="top-0 -right-[50px]" />
            </div>
          </div>
          <PostMeta time="8:14 AM" className="float-right -mt-1 ml-3" />
          <span className="clear-both block" />
        </Bubble>
      </div>
      <ol className="mt-6 space-y-2.5">
        {ANATOMY.map((text, i) => (
          <li key={text} className="flex gap-3 text-[13px] leading-snug text-white/85">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#f54e00] text-[11px] font-medium text-white">
              {i + 1}
            </span>
            {text}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── What you get ────────────────────────────────────────────────────────── */

export function SearchFigure() {
  return (
    <div className={cn("w-full max-w-[290px] overflow-hidden rounded-xl", tg.bg)}>
      <div className={cn("flex items-center gap-2 px-3 py-2.5 text-[12px]", tg.bar)}>
        <Search className={cn("h-3.5 w-3.5", tg.meta)} />
        <span className="text-white">coastline</span>
        <span className={cn("ml-auto", tg.meta)}>3 results</span>
      </div>
      <div className="p-2.5">
        <Bubble className="max-w-full text-[11.5px] leading-snug sm:text-[11.5px]">
          <div className="flex items-center gap-2">
            <span className={cn("grid size-8 place-items-center rounded-full text-white", tg.play)}>
              <Music className="h-4 w-4" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-medium">recording-3104…mp3</span>
              <span className={cn("block text-[10.5px]", tg.meta)}>04:12</span>
            </span>
          </div>
          <p className="mt-1.5">
            From: Dispatch 2 (<span className={tg.link}>+15550142210</span>)
          </p>
          <p>
            To: <mark className="rounded-[3px] bg-[#6ab3f3]/30 px-0.5 text-inherit">COASTLINE</mark>{" "}
            LOGISTICS
          </p>
        </Bubble>
      </div>
    </div>
  );
}

const BARS = [5, 9, 14, 8, 12, 18, 11, 7, 15, 20, 13, 9, 16, 10, 6, 12, 17, 9, 5, 11];

export function CoachFigure() {
  return (
    <div className="w-full max-w-[280px]">
      <Bubble className="max-w-full text-[11.5px] sm:text-[11.5px]">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full text-white",
              tg.play
            )}
          >
            <Pause className="h-4 w-4" fill="currentColor" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex h-6 items-end gap-[3px]">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className={cn("w-[3px] rounded-full", i < 8 ? "bg-[#6ab3f3]" : "bg-white/25")}
                  style={{ height: `${h + 4}px` }}
                />
              ))}
            </div>
            <p className={cn("mt-1 text-[10.5px] tabular-nums", tg.meta)}>00:41 / 01:40</p>
          </div>
        </div>
        <p className="mt-2">
          From: Dispatch 3 (new) (<span className={tg.link}>+15550142213</span>)
        </p>
        <p>
          To: Mike Ruiz (<span className={tg.link}>+15550127716</span>)
        </p>
      </Bubble>
    </div>
  );
}

const MISSED = [
  { status: "Phone Call Missed", time: "6:44 AM" },
  { status: "Phone Call Missed", time: "6:49 AM" },
  { status: "Phone Call Voicemail", time: "7:02 AM" },
];

export function MissedFigure() {
  return (
    <div className="flex w-full max-w-[260px] flex-col gap-1.5">
      {MISSED.map((m, i) => (
        <Bubble key={i} className="w-full max-w-full py-2 text-[11.5px] sm:text-[11.5px]">
          <p className="truncate">
            From: COASTLINE LOGISTICS (<span className={tg.link}>+15550186403</span>)
          </p>
          <p className="mt-1 flex justify-between gap-3">
            <span className={i === 2 ? "" : "text-[#ff8a80]"}>{m.status}</span>
            <span className={cn("text-[10px]", tg.meta)}>{m.time}</span>
          </p>
        </Bubble>
      ))}
    </div>
  );
}

export function AnywhereFigure() {
  return (
    <div className="w-full max-w-[290px] rounded-2xl border border-white/20 bg-white/80 p-3 text-[#111] shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)] backdrop-blur-md">
      <div className="flex items-center gap-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-[9px] bg-[#2aabee]">
          <svg viewBox="0 0 24 24" className="size-4 text-white" fill="currentColor">
            <path d="M21.5 4.3 18.4 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.2-.5.5-1 .5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.6 13 2 11.6c-1-.3-1-1 .2-1.5L20.2 3.2c.8-.3 1.6.2 1.3 1.1z" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex justify-between text-[11.5px] font-semibold">
            Call Recordings <span className="font-normal text-black/45">now</span>
          </p>
          <p className="truncate text-[11.5px]">🎵 recording-3104611820008.mp3</p>
          <p className="truncate text-[11px] text-black/60">From: Dispatch 1 (+15550142209)</p>
        </div>
      </div>
    </div>
  );
}

const CHATS = [
  { name: "Safety team", picked: true },
  { name: "Ops managers", picked: false },
  { name: "Dispatch 3 (new)", picked: true },
];

export function ShareFigure() {
  return (
    <div className={cn("w-full max-w-[260px] overflow-hidden rounded-xl", tg.bar)}>
      <p className="flex items-center gap-2 border-b border-black/30 px-3 py-2.5 text-[12px] font-medium text-white">
        <Forward className="h-3.5 w-3.5" /> Forward to…
      </p>
      <ul className="p-1.5">
        {CHATS.map((c) => (
          <li
            key={c.name}
            className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] text-white"
          >
            <span className="grid size-7 place-items-center rounded-full bg-white/10 text-[11px]">
              {c.name[0]}
            </span>
            <span className="flex-1">{c.name}</span>
            <span
              className={cn(
                "grid size-4 place-items-center rounded-full border",
                c.picked ? "border-[#3e99e6] bg-[#3e99e6]" : "border-white/30"
              )}
            >
              {c.picked ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const PEOPLE = [
  { name: "Dispatch 1", skip: false },
  { name: "Dispatch 2", skip: false },
  { name: "Owner", skip: true },
  { name: "Safety Manager", skip: false },
  { name: "HR line", skip: true },
];

export function SkipFigure() {
  return (
    <div className="w-full max-w-[272px] rounded-lg border border-black/10 bg-white p-3 text-[#26251e] shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]">
      <p className="text-[12px] font-medium">Posted to the chat</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {PEOPLE.map((p) => (
          <li
            key={p.name}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[11px]",
              p.skip
                ? "border-dashed border-black/20 text-black/40 line-through"
                : "border-[#3e99e6]/40 bg-[#3e99e6]/10"
            )}
          >
            {p.name}
          </li>
        ))}
      </ul>
      <p className="mt-2.5 text-[10.5px] text-black/50">Crossed out: never posted.</p>
    </div>
  );
}
