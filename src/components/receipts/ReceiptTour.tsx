import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import {
  ArrowUp,
  ArrowUpRight,
  Camera,
  CheckCheck,
  ChevronLeft,
  CircleCheckBig,
  Ellipsis,
  ImagePlus,
  LoaderCircle,
  Lock,
  Mic,
  Paperclip,
  Pause,
  Play,
  Trash2,
  Video,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { plateStyle } from "./figures";

/**
 * The hero on /products/receipts-telegram-bot, after the product tour on the
 * Bookr homepage: two phones in one Telegram group, drawn at a fixed design
 * size and scaled to fit, playing one receipt from ask to answer.
 *
 * The office asks "Mike, could you share your receipt?". Any message with the
 * word receipt makes the bot post a capture link (receipts.service.ts
 * requestFromGroup; chatter is limited to one link per 10 minutes). Mike opens
 * it in Telegram's browser, fills in the real capture page (learner-web
 * app/pti/receipts/[token]/receipt-capture.tsx) and submits. The group
 * remembers its driver, truck and trailer (receipts.service.ts publicView), so
 * the page opens with them filled in and Mike only adds the amount and a photo.
 * The bot posts the confirmation at submit time, so the office sees it while
 * Mike is still looking at "Receipt saved".
 *
 * One liberty, on the user's request: the capture link is drawn as a Telegram
 * button. The bot sends it as a text link today.
 *
 * Plays only while on screen in a visible tab, and can be paused. Reduced
 * motion starts paused on the finished conversation.
 */

type Tap = "open" | "amount" | "photo" | "submit";

interface TourFrame {
  dur: number;
  /** What the office has typed but not sent. */
  draft: string;
  /** Mike's header reads "Sarah is typing…". */
  typing: boolean;
  asked: boolean;
  linked: boolean;
  /** Where Mike's finger lands this frame. Never carries over. */
  tap: Tap | null;
  sheetOpen: boolean;
  /** The sheet shows "Receipt saved" (also while it slides away). */
  saved: boolean;
  amount: string;
  focus: "amount" | null;
  scrolled: boolean;
  photo: boolean;
  sending: boolean;
  posted: boolean;
  thanked: boolean;
  /** Fade the chats out before the loop starts again. */
  fade: boolean;
}

const START: TourFrame = {
  dur: 0,
  draft: "",
  typing: false,
  asked: false,
  linked: false,
  tap: null,
  sheetOpen: false,
  saved: false,
  amount: "",
  focus: null,
  scrolled: false,
  photo: false,
  sending: false,
  posted: false,
  thanked: false,
  fade: false,
};

// Uneven on purpose: typing is quick, a new message needs time to be read,
// and the office waits while Mike is on the page.
const SCRIPT: [number, Partial<TourFrame>][] = [
  [1400, {}],
  [150, { draft: "Mike,", typing: true }],
  [150, { draft: "Mike, could" }],
  [150, { draft: "Mike, could you" }],
  [150, { draft: "Mike, could you share" }],
  [150, { draft: "Mike, could you share your" }],
  [700, { draft: "Mike, could you share your receipt?" }],
  [1100, { draft: "", typing: false, asked: true }],
  [2600, { linked: true }],
  [520, { tap: "open" }],
  // Long enough to see that his name, truck and trailer are already there.
  [1400, { sheetOpen: true }],
  [440, { tap: "amount", focus: "amount" }],
  [150, { amount: "1" }],
  [150, { amount: "17" }],
  [150, { amount: "175" }],
  [700, { amount: "175.00" }],
  [750, { focus: null, scrolled: true }],
  [500, { tap: "photo" }],
  [950, { photo: true }],
  [500, { tap: "submit" }],
  [1200, { sending: true }],
  [1800, { sending: false, saved: true, posted: true }],
  [750, { sheetOpen: false }],
  [1600, {}],
  [3600, { thanked: true }],
  [650, { fade: true }],
];

const FRAMES = SCRIPT.reduce<TourFrame[]>((frames, [dur, patch]) => {
  const previous = frames[frames.length - 1] ?? START;
  frames.push({ ...previous, tap: null, ...patch, dur });
  return frames;
}, []);

/** The finished conversation: what the page first shows, and all reduced motion sees. */
const POSTER = FRAMES.findIndex((frame) => frame.thanked);

const DESCRIPTION =
  "Animation of a Telegram group on two phones. In the office, Sarah writes: Mike, could you share your receipt? The Raisedash bot answers with a button to open receipt capture. On his phone, Mike taps it. His name, truck 104 and trailer 5317 are already filled in, so he types $175.00, takes a photo, and submits. The bot posts Receipt submitted, $175.00, in the group, and Sarah says thanks.";

/* ── Timing ─────────────────────────────────────────────────────────────── */

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(reducedMotionQuery);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true
  );
}

/** True while the node is at least a quarter on screen in a visible tab. */
function useOnScreen(ref: React.RefObject<HTMLElement | null>): boolean {
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let inView = false;
    const update = () => setOnScreen(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [ref]);
  return onScreen;
}

/** Starts on the poster and steps from there, so the page never opens on a blank chat. */
function useTimeline(playing: boolean): TourFrame {
  const [index, setIndex] = useState(POSTER);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % FRAMES.length),
      FRAMES[index].dur
    );
    return () => window.clearTimeout(timer);
  }, [index, playing]);
  return FRAMES[index];
}

/**
 * Draws children at a fixed design size and scales them to the width it is
 * given, so the phones keep their proportions at every breakpoint. Hidden until
 * measured, which is one frame after hydration.
 */
function Stage({
  width,
  height,
  className,
  children,
}: {
  width: number;
  height: number;
  className?: string;
  children: React.ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useLayoutEffect(() => {
    const node = outer.current;
    if (!node) return;
    // Fires once on observe, then on every resize.
    const observer = new ResizeObserver(() => setScale(node.clientWidth / width));
    observer.observe(node);
    return () => observer.disconnect();
  }, [width]);
  return (
    <div
      ref={outer}
      className={cn("relative mx-auto w-full", className)}
      style={{ aspectRatio: `${width} / ${height}`, maxWidth: width }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left transition-opacity duration-300"
        style={{ width, height, transform: `scale(${scale})`, opacity: scale ? 1 : 0 }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Phone ──────────────────────────────────────────────────────────────── */

const PHONE_W = 272;
const PHONE_H = 564;
const TG_BLUE = "#0a84ff";
const INK = "#1c1c1e";

function StatusIcons() {
  return (
    <span className="flex items-center gap-[5px]">
      <span className="flex h-[9px] items-end gap-[1.5px]">
        {[3.5, 5, 7, 9].map((height) => (
          <i key={height} className="w-[2.5px] rounded-[1px] bg-current" style={{ height }} />
        ))}
      </span>
      <svg width="13" height="9.5" viewBox="0 0 16 12" aria-hidden="true">
        <path d="M8 11.4a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8Z" fill="currentColor" />
        <path
          d="M4.4 7.2a5.1 5.1 0 0 1 7.2 0M1.6 4.4a9 9 0 0 1 12.8 0"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg width="21" height="10" viewBox="0 0 25 12" aria-hidden="true">
        <rect
          x=".5"
          y=".5"
          width="21"
          height="11"
          rx="3.2"
          fill="none"
          stroke="currentColor"
          strokeOpacity=".4"
        />
        <rect x="2" y="2" width="15.5" height="8" rx="1.7" fill="currentColor" />
        <path d="M23 4v4c.8-.3 1.4-1.1 1.4-2S23.8 4.3 23 4Z" fill="currentColor" opacity=".45" />
      </svg>
    </span>
  );
}

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-[44px] bg-[#1b1b1d] p-[7px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_60px_-24px_rgba(0,0,0,0.75)]",
        className
      )}
      style={{ width: PHONE_W, height: PHONE_H }}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[37px] bg-white antialiased"
        style={{
          color: INK,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div className="relative z-30 flex h-[34px] shrink-0 items-center justify-between px-[22px] pt-[2px] text-[11.5px] font-semibold tracking-[-0.2px]">
          <span>9:41</span>
          <span className="absolute top-[8px] left-1/2 h-[20px] w-[68px] -translate-x-1/2 rounded-full bg-black" />
          <StatusIcons />
        </div>
        {children}
      </div>
    </div>
  );
}

/** The ring a fingertip leaves. Sits inside a relative target. */
function TapRing() {
  return (
    <span
      aria-hidden="true"
      className="tg-tap pointer-events-none absolute top-1/2 left-1/2 z-20 size-[34px] rounded-full border-[1.5px] border-black/25 bg-black/15 motion-reduce:hidden"
    />
  );
}

/* ── Telegram ───────────────────────────────────────────────────────────── */

type Viewer = "office" | "driver";
type Sender = "mike" | "sarah" | "bot";

const PEOPLE: Record<Sender, { name: string; color: string; avatar: React.ReactNode }> = {
  mike: {
    name: "Mike Ruiz",
    color: "#2f80d0",
    avatar: (
      <span className="grid size-full place-items-center bg-gradient-to-b from-[#6fb4f5] to-[#3d85dc] text-[9.5px] font-semibold text-white">
        MR
      </span>
    ),
  },
  sarah: {
    name: "Sarah Lee",
    color: "#c2447f",
    avatar: (
      <span className="grid size-full place-items-center bg-gradient-to-b from-[#f38fb8] to-[#d9578f] text-[9.5px] font-semibold text-white">
        SL
      </span>
    ),
  },
  bot: {
    name: "Raisedash Helper",
    color: "#cf6b16",
    avatar: <Image src="/logo.webp" alt="" width={26} height={26} className="size-full" />,
  },
};

interface Message {
  id: string;
  from: Sender;
  time: string;
  body: React.ReactNode;
  button?: string;
  show: (frame: TourFrame) => boolean;
}

const MESSAGES: Message[] = [
  {
    id: "door",
    from: "sarah",
    time: "7:58 AM",
    body: "Morning Mike, Dallas DC has you at door 14.",
    show: () => true,
  },
  {
    id: "unloaded",
    from: "mike",
    time: "9:32 AM",
    body: "Unloaded at Dallas DC. Lumper was $175.",
    show: () => true,
  },
  {
    id: "ask",
    from: "sarah",
    time: "9:40 AM",
    body: "Mike, could you share your receipt?",
    show: (frame) => frame.asked,
  },
  {
    id: "link",
    from: "bot",
    time: "9:40 AM",
    body: (
      <>
        <b className="font-semibold">🧾 Upload a receipt</b>
        <br />
        <br />
        Add up to 5 photos, PDFs, or videos and enter the amount in USD.
        <br />
        <br />
        This link expires in 24 hours.
      </>
    ),
    button: "Open receipt capture",
    show: (frame) => frame.linked,
  },
  {
    id: "posted",
    from: "bot",
    time: "9:41 AM",
    body: (
      <>
        <b className="font-semibold">🧾 Receipt submitted · $175.00</b>
        <br />
        <br />
        Driver: Mike Ruiz
        <br />
        Truck: 104
        <br />
        Trailer: 5317
        <br />1 file
        <br />
        <br />
        <span style={{ color: TG_BLUE }}>View receipt</span>
        <br />
        <br />
        Another receipt? Send <b className="font-semibold">receipt</b> in this chat.
      </>
    ),
    show: (frame) => frame.posted,
  },
  {
    id: "thanks",
    from: "sarah",
    time: "9:41 AM",
    body: "Got it, thanks! 👍",
    show: (frame) => frame.thanked,
  },
];

/** Bubble tail, drawn on the last bubble of a run. */
function Tail({ side, color }: { side: "left" | "right"; color: string }) {
  return (
    <svg
      aria-hidden="true"
      width="7"
      height="12"
      viewBox="0 0 7 12"
      className={cn("absolute bottom-0", side === "left" ? "-left-[6px]" : "-right-[6px]")}
      style={side === "right" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M7 0C7 6.5 5 10 0 12h7z" fill={color} />
    </svg>
  );
}

function Bubble({
  message,
  outgoing,
  first,
  last,
  viewer,
  frame,
}: {
  message: Message;
  outgoing: boolean;
  first: boolean;
  last: boolean;
  viewer: Viewer;
  frame: TourFrame;
}) {
  const fill = outgoing ? "#e1ffc7" : "#ffffff";
  const pressed = viewer === "driver" && frame.tap === "open";
  return (
    <div
      className={cn(
        "tg-pop flex max-w-[196px] flex-col",
        outgoing ? "origin-bottom-right self-end" : "origin-bottom-left"
      )}
    >
      <div
        className={cn(
          "relative rounded-[16px] px-[9px] pt-[5px] pb-[6px] text-[11.5px] leading-[1.36] shadow-[0_1px_1px_rgba(0,0,0,0.12)]",
          last && (outgoing ? "rounded-br-[5px]" : "rounded-bl-[5px]")
        )}
        style={{ backgroundColor: fill }}
      >
        {!outgoing && first ? (
          <p
            className="mb-[1px] text-[11px] font-semibold"
            style={{ color: PEOPLE[message.from].color }}
          >
            {PEOPLE[message.from].name}
          </p>
        ) : null}
        <p>
          {message.body}
          {/* Room for the time on the last line, as Telegram leaves it. */}
          <span className={cn("inline-block", outgoing ? "w-[60px]" : "w-[46px]")} />
        </p>
        <span
          className={cn(
            "absolute right-[8px] bottom-[4px] flex items-center gap-[2px] text-[9px] tabular-nums",
            outgoing ? "text-[#4fae4e]" : "text-black/40"
          )}
        >
          {message.time}
          {outgoing ? <CheckCheck className="size-[11px]" strokeWidth={2.2} /> : null}
        </span>
        {last && !message.button ? <Tail side={outgoing ? "right" : "left"} color={fill} /> : null}
      </div>
      {message.button ? (
        <div
          className={cn(
            "relative mt-[3px] flex h-[30px] items-center justify-center rounded-[10px] text-[11px] font-semibold text-white backdrop-blur-[2px] transition-colors duration-150",
            pressed ? "bg-black/45" : "bg-black/25"
          )}
        >
          {message.button}
          <ArrowUpRight className="absolute top-[4px] right-[4px] size-[9px]" strokeWidth={2.6} />
          {pressed ? <TapRing /> : null}
        </div>
      ) : null}
    </div>
  );
}

function Chat({ viewer, frame }: { viewer: Viewer; frame: TourFrame }) {
  const self: Sender = viewer === "office" ? "sarah" : "mike";
  const visible = MESSAGES.filter((message) => message.show(frame));
  // Consecutive messages from one sender form a run: the name leads it and
  // the avatar and tail close it.
  const runs: Message[][] = [];
  for (const message of visible) {
    const run = runs[runs.length - 1];
    if (run && run[0].from === message.from) run.push(message);
    else runs.push([message]);
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-end gap-[7px] px-[8px] pt-[8px] pb-[8px] transition-opacity duration-500",
        frame.fade && "opacity-0"
      )}
    >
      <span className="mx-auto mb-[2px] rounded-full bg-black/20 px-[9px] py-[2px] text-[10px] font-medium text-white">
        Today
      </span>
      {runs.map((run) => {
        const outgoing = run[0].from === self;
        return (
          <div
            key={run[0].id}
            className={cn("flex items-end gap-[5px]", outgoing && "justify-end")}
          >
            {!outgoing ? (
              <span className="size-[26px] shrink-0 overflow-hidden rounded-full">
                {PEOPLE[run[0].from].avatar}
              </span>
            ) : null}
            <div className={cn("flex min-w-0 flex-col gap-[3px]", outgoing && "items-end")}>
              {run.map((message, index) => (
                <Bubble
                  key={message.id}
                  message={message}
                  outgoing={outgoing}
                  first={index === 0}
                  last={index === run.length - 1}
                  viewer={viewer}
                  frame={frame}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ChatHeader({ viewer, frame }: { viewer: Viewer; frame: TourFrame }) {
  const typing = viewer === "driver" && frame.typing;
  return (
    <div className="relative z-10 flex h-[44px] shrink-0 items-center gap-2 border-b border-black/10 bg-[#f6f6f6]/95 px-[8px]">
      <span className="flex items-center" style={{ color: TG_BLUE }}>
        <ChevronLeft className="size-[20px]" strokeWidth={2.4} />
        <span
          className="-ml-[3px] rounded-full px-[5px] text-[9.5px] leading-[15px] font-semibold text-white"
          style={{ backgroundColor: TG_BLUE }}
        >
          3
        </span>
      </span>
      <div className="min-w-0 flex-1 text-center">
        <p className="truncate text-[12px] leading-tight font-semibold">
          Ridgeline Freight Drivers
        </p>
        <p
          className="truncate text-[10px] leading-tight"
          style={{ color: typing ? TG_BLUE : "rgba(0,0,0,0.45)" }}
        >
          {typing ? "Sarah is typing…" : "8 members"}
        </p>
      </div>
      <span className="grid size-[28px] shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#ffa66b] to-[#f0682b] text-[10px] font-semibold text-white">
        RF
      </span>
    </div>
  );
}

function InputBar({ draft }: { draft: string }) {
  return (
    <div className="relative z-10 shrink-0 border-t border-black/10 bg-[#f6f6f6]/95 px-[8px] pt-[6px] pb-[18px]">
      {/* Like Telegram, a long draft wraps and the field grows; the icons
          stay on its last line. */}
      <div className="flex items-end gap-[7px]">
        <Paperclip className="mb-[5px] size-[17px] shrink-0 text-black/40" strokeWidth={1.9} />
        <div className="min-h-[28px] min-w-0 flex-1 rounded-[14px] border border-black/15 bg-white px-[10px] py-[6px] text-[11.5px] leading-[14px]">
          {draft ? (
            <span>
              {draft}
              <i
                className="ml-px inline-block h-[13px] w-[1.5px] translate-y-[2px]"
                style={{ backgroundColor: TG_BLUE }}
              />
            </span>
          ) : (
            <span className="text-black/35">Message</span>
          )}
        </div>
        {draft ? (
          <span
            className="mb-px grid size-[26px] shrink-0 place-items-center rounded-full text-white"
            style={{ backgroundColor: TG_BLUE }}
          >
            <ArrowUp className="size-[15px]" strokeWidth={2.6} />
          </span>
        ) : (
          <Mic className="mb-[5px] size-[18px] shrink-0 text-black/40" strokeWidth={1.9} />
        )}
      </div>
      <span className="absolute bottom-[6px] left-1/2 h-[4px] w-[92px] -translate-x-1/2 rounded-full bg-black/85" />
    </div>
  );
}

/* ── The receipt page, in Telegram's browser ────────────────────────────── */

function Field({
  label,
  value,
  placeholder,
  prefix,
  focused,
  tapped,
  className,
}: {
  label: string;
  value: string;
  placeholder?: string;
  prefix?: string;
  focused?: boolean;
  tapped?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[9.5px] font-medium">{label}</p>
      <div
        className={cn(
          "relative mt-[3px] flex h-[26px] items-center rounded-[6px] border bg-white px-[7px] text-[11px] transition-shadow duration-150",
          focused
            ? "border-[#0a84ff]/70 shadow-[0_0_0_2.5px_rgba(10,132,255,0.18)]"
            : "border-black/15"
        )}
      >
        {prefix ? <span className="mr-[3px] text-black/40">{prefix}</span> : null}
        {value ? (
          <span className="truncate tabular-nums">{value}</span>
        ) : placeholder && !focused ? (
          <span className="text-black/35">{placeholder}</span>
        ) : null}
        {focused ? (
          <i className="ml-px h-[13px] w-[1.5px] shrink-0" style={{ backgroundColor: TG_BLUE }} />
        ) : null}
        {tapped ? <TapRing /> : null}
      </div>
    </div>
  );
}

function PageButton({
  icon: Icon,
  children,
  tapped,
  className,
}: {
  icon: typeof Camera;
  children: string;
  tapped?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative flex h-[26px] items-center justify-center gap-[5px] rounded-[6px] border border-black/15 bg-white text-[10px] font-medium transition-colors duration-150",
        tapped && "bg-black/5",
        className
      )}
    >
      <Icon className="size-[12px]" strokeWidth={2} />
      {children}
      {tapped ? <TapRing /> : null}
    </span>
  );
}

/** A photo of a paper receipt, drawn small. */
function PhotoThumb() {
  return (
    <span className="grid size-[30px] shrink-0 place-items-center overflow-hidden rounded-[5px] bg-[#d8d4c8]">
      <span className="flex h-[76%] w-[52%] -rotate-6 flex-col gap-[2px] rounded-[1.5px] bg-white px-[2px] pt-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
        <i className="h-[1.5px] w-[70%] self-center bg-black/55" />
        <i className="h-[1.5px] w-full bg-black/15" />
        <i className="h-[1.5px] w-[80%] bg-black/15" />
        <i className="h-[1.5px] w-full bg-black/15" />
        <i className="mt-auto mb-[3px] h-[1.5px] w-[55%] self-end bg-black/55" />
      </span>
    </span>
  );
}

function CaptureForm({ frame }: { frame: TourFrame }) {
  return (
    <div
      className="px-[12px] pt-[10px] pb-[16px] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
      style={{ transform: frame.scrolled ? "translateY(-92px)" : "none" }}
    >
      <div className="flex items-center gap-[6px]">
        <Image src="/logo.webp" alt="" width={18} height={18} className="rounded-[4px]" />
        <span className="text-[11.5px] font-semibold tracking-tight">Raisedash</span>
      </div>
      <p className="mt-[12px] text-[9.5px] text-black/50">Ridgeline Freight</p>
      <p className="text-[15px] leading-tight font-semibold tracking-[-0.2px]">Upload a receipt</p>
      <p className="mt-[2px] text-[9.5px] text-black/50">
        Add your files and enter the total amount.
      </p>

      <div className="mt-[10px] rounded-[9px] border border-black/10 bg-white p-[9px]">
        <Field label="Driver name" value="Mike Ruiz" />
        <div className="mt-[7px] grid grid-cols-2 gap-[7px]">
          <Field label="Truck / unit" value="104" />
          <Field label="Trailer" value="5317" />
        </div>
        <Field
          className="mt-[7px]"
          label="Total amount (USD)"
          value={frame.amount}
          placeholder="0.00"
          prefix="$"
          focused={frame.focus === "amount"}
          tapped={frame.tap === "amount"}
        />
      </div>

      <div className="mt-[9px] rounded-[9px] border border-black/10 bg-white p-[9px]">
        <div className="flex items-center justify-between">
          <span className="text-[10.5px] font-semibold">Receipt files</span>
          <span className="text-[9.5px] text-black/50 tabular-nums">{frame.photo ? 1 : 0} / 5</span>
        </div>
        <p className="mt-[1px] text-[9px] text-black/50">
          Photos, PDFs, or videos. Up to 100 MB each.
        </p>
        <div className="mt-[7px] grid grid-cols-2 gap-[5px]">
          <PageButton icon={Camera} tapped={frame.tap === "photo"}>
            Take photo
          </PageButton>
          <PageButton icon={ImagePlus}>Choose files</PageButton>
          <PageButton icon={Video} className="col-span-2">
            Record video
          </PageButton>
        </div>
        {frame.photo ? (
          <div className="tg-pop mt-[7px] flex items-center gap-[7px] rounded-[7px] border border-black/10 p-[4px] pr-[7px]">
            <PhotoThumb />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[10px] font-medium">IMG_4107.jpg</span>
              <span className="block text-[9px] text-black/50">0.7 MB</span>
            </span>
            <Trash2 className="size-[11px] text-black/40" />
          </div>
        ) : null}
      </div>

      <div
        className={cn(
          "relative mt-[10px] flex h-[32px] items-center justify-center gap-[6px] rounded-[7px] text-[11px] font-semibold text-white transition-colors duration-150",
          frame.tap === "submit" ? "bg-black" : "bg-[#26251e]"
        )}
      >
        {frame.sending ? (
          <>
            <LoaderCircle className="size-[12px] animate-spin" strokeWidth={2.4} />
            Sending receipt…
          </>
        ) : (
          "Submit receipt"
        )}
        {frame.tap === "submit" ? <TapRing /> : null}
      </div>
      <p className="mt-[7px] text-center text-[8.5px] leading-snug text-black/50">
        The amount, driver details, and receipt link will be posted in your Telegram group.
      </p>
    </div>
  );
}

function Saved() {
  return (
    <div className="tg-pop mx-[12px] mt-[18px] flex flex-col items-center rounded-[10px] border border-black/10 bg-white px-[14px] py-[22px] text-center">
      <CircleCheckBig className="size-[34px] text-[#16a34a]" strokeWidth={2} />
      <p className="mt-[10px] text-[15px] font-semibold tracking-[-0.2px]">Receipt saved</p>
      <p className="mt-[5px] text-[9.5px] leading-snug text-black/55">
        You can view your receipt below and return to your Telegram group.
      </p>
      <span className="mt-[12px] flex h-[28px] items-center rounded-[7px] bg-[#26251e] px-[14px] text-[10.5px] font-semibold text-white">
        View receipt
      </span>
    </div>
  );
}

/** Telegram's in-app browser, as a sheet over the chat. */
function BrowserSheet({ frame }: { frame: TourFrame }) {
  return (
    <div
      className="absolute inset-x-0 top-[40px] bottom-0 z-20 flex flex-col overflow-hidden rounded-t-[14px] bg-[#f7f7f4] shadow-[0_-8px_24px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
      style={{ transform: frame.sheetOpen ? "translateY(0)" : "translateY(104%)" }}
    >
      <div className="flex h-[38px] shrink-0 items-center justify-between border-b border-black/10 bg-white px-[12px]">
        <span className="text-[11.5px]" style={{ color: TG_BLUE }}>
          Close
        </span>
        <span className="flex items-center gap-[3px] text-[10.5px] font-semibold">
          <Lock className="size-[9px] text-black/45" strokeWidth={2.4} />
          on.raisedash.com
        </span>
        <Ellipsis className="size-[16px]" style={{ color: TG_BLUE }} />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        {frame.saved ? <Saved /> : <CaptureForm frame={frame} />}
      </div>
      <span className="absolute bottom-[6px] left-1/2 h-[4px] w-[92px] -translate-x-1/2 rounded-full bg-black/85" />
    </div>
  );
}

function TelegramPhone({ viewer, frame }: { viewer: Viewer; frame: TourFrame }) {
  const sheet = viewer === "driver" && frame.sheetOpen;
  return (
    <Phone>
      {/* Behind an open sheet the chat steps back, as iOS does. */}
      <div
        className={cn(
          "relative flex min-h-0 flex-1 origin-top flex-col overflow-hidden transition-[transform,filter,border-radius] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          sheet && "scale-[0.94] rounded-t-[12px] brightness-[0.62]"
        )}
      >
        <ChatHeader viewer={viewer} frame={frame} />
        <div className="tg-wallpaper relative min-h-0 flex-1 overflow-hidden">
          <Chat viewer={viewer} frame={frame} />
        </div>
        <InputBar draft={viewer === "office" ? frame.draft : ""} />
      </div>
      {viewer === "driver" ? <BrowserSheet frame={frame} /> : null}
    </Phone>
  );
}

/* ── Scene ──────────────────────────────────────────────────────────────── */

function PlayToggle({
  paused,
  onToggle,
  className,
}: {
  paused: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={paused ? "Play animation" : "Pause animation"}
      className={cn(
        "focus-visible:outline-ring grid place-items-center rounded-full border border-black/10 bg-white text-[#26251e]/70 transition-colors hover:text-[#26251e] focus-visible:outline-2 focus-visible:outline-offset-2",
        className
      )}
    >
      {paused ? (
        <Play className="size-3.5" aria-hidden="true" />
      ) : (
        <Pause className="size-3.5" aria-hidden="true" />
      )}
    </button>
  );
}

export function ReceiptTour() {
  const plate = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [paused, setPaused] = useState<boolean | null>(null);
  const isPaused = paused ?? reduced;
  const onScreen = useOnScreen(plate);
  const frame = useTimeline(onScreen && !isPaused);
  // While Mike is on the receipt page, the office phone steps back.
  const officeWaits = frame.tap === "open" || (frame.sheetOpen && !frame.saved);

  return (
    <div>
      <div
        ref={plate}
        style={plateStyle({ pos: "50% 22%", flip: true, size: "cover" })}
        className="graphite-plate border-border relative rounded-xs border px-3 py-4 sm:px-4 sm:py-5"
      >
        <div role="img" aria-label={DESCRIPTION}>
          <Stage width={640} height={612} className="hidden sm:block">
            <div className="flex h-full items-start justify-center gap-[32px] pt-[6px]">
              {(["office", "driver"] as const).map((viewer) => (
                <div
                  key={viewer}
                  className={cn(
                    "flex flex-col items-center gap-[12px] transition-opacity duration-500",
                    viewer === "office" && officeWaits && "opacity-45"
                  )}
                >
                  <TelegramPhone viewer={viewer} frame={frame} />
                  <span className="text-[12.5px] font-medium tracking-[-0.1px] text-white/75">
                    {viewer === "office" ? "Office" : "Driver"}
                  </span>
                </div>
              ))}
            </div>
          </Stage>
          <Stage width={PHONE_W} height={PHONE_H} className="sm:hidden">
            <TelegramPhone viewer="driver" frame={frame} />
          </Stage>
        </div>
        <PlayToggle
          paused={isPaused}
          onToggle={() => setPaused(!isPaused)}
          className="absolute top-3 right-3 hidden size-8 sm:grid"
        />
      </div>
      <div className="flex justify-end sm:hidden">
        <button
          type="button"
          onClick={() => setPaused(!isPaused)}
          className="text-muted-foreground hover:text-foreground focus-visible:outline-ring inline-flex min-h-11 items-center gap-1.5 text-sm focus-visible:outline-2"
        >
          {isPaused ? (
            <Play className="size-3.5" aria-hidden="true" />
          ) : (
            <Pause className="size-3.5" aria-hidden="true" />
          )}
          {isPaused ? "Play animation" : "Pause animation"}
        </button>
      </div>
    </div>
  );
}
