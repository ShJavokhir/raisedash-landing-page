import Image from "next/image";
import { Check, Search, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { GraphitePlate } from "@/components/receipts/figures";

/**
 * Figures for /products/driver-announcements: the office writes one message
 * in the dashboard, picks driver Telegram groups, and our bot posts it in each
 * one.
 *
 * The owner chose the dashboard flow on 2026-10-04 (write, pick groups,
 * send). It is not in a repo we can read yet; the only broadcast code today is
 * the founder's console (raisedash-pti-console/broadcast.mjs). So these panels
 * show the idea, not a copied screen: no attachments, pinning, delivery
 * report, read confirmations or scheduling, because none of those were
 * confirmed. Re-check against the dashboard when it ships.
 *
 * The bot's name is the live bot's (Raisedash Helper), same as the other
 * Telegram pages. The plate is dark in both themes, so everything on it uses
 * literal colors. People and the fleet are made up (Ridgeline Freight, Mike
 * Ruiz, truck 104). Phone numbers are 555-01xx.
 */

const surface =
  "rounded-lg border border-black/10 bg-white text-[#26251e] shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]";
const muted = "text-[#26251e]/55";
const BOT = "Raisedash Helper";
const GROUP_COUNT = 148;
const POLICY =
  "📌 New policy starting Monday: no handheld phone use while the truck is moving. Hands-free only, or pull over.";

/** Telegram's avatar gradients, so the groups don't all look the same. */
const AVATARS = [
  "from-[#ff885e] to-[#ff516a]",
  "from-[#72d5fd] to-[#2a9ef1]",
  "from-[#a0de7e] to-[#54cb68]",
  "from-[#82b1ff] to-[#665fff]",
  "from-[#ffcd6a] to-[#ffa85c]",
  "from-[#e0a2f3] to-[#d669ed]",
  "from-[#53edd6] to-[#28c9b7]",
];

/** `last` is the driver's own last message, before the announcement lands. */
const GROUPS = [
  { truck: "104", driver: "Mike Ruiz", last: "Loaded, heading out" },
  { truck: "212", driver: "Anna Kim", last: "At the receiver, door 14" },
  { truck: "118", driver: "Dan Novak", last: "Fuel stop in Laramie" },
  { truck: "131", driver: "Luis Ortega", last: "📷 Photo" },
  { truck: "127", driver: "Sam Patel", last: "Thanks!" },
  { truck: "140", driver: "Joe Brooks", last: "On my 10 hour break" },
];

function Avatar({ label, index, className }: { label: string; index: number; className?: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-gradient-to-b font-semibold text-white",
        AVATARS[index % AVATARS.length],
        className
      )}
    >
      {label}
    </span>
  );
}

function Checkbox({ on = true }: { on?: boolean }) {
  return (
    <span
      className={cn(
        "grid size-3.5 shrink-0 place-items-center rounded-[3px] border",
        on ? "border-[#26251e] bg-[#26251e] text-white" : "border-black/25"
      )}
    >
      {on ? <Check className="size-2.5" strokeWidth={3} /> : null}
    </span>
  );
}

function DashboardBar() {
  return (
    <div className="flex h-10 items-center gap-2 border-b border-black/10 px-4">
      <Image src="/logo.webp" alt="" width={18} height={18} className="rounded-[4px]" />
      <span className="text-[12px] font-semibold">Raisedash</span>
      <span className={cn("ml-auto text-[11px]", muted)}>Ridgeline Freight</span>
    </div>
  );
}

function InkButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-9 w-full items-center justify-center gap-1.5 rounded-full bg-[#26251e] text-[12px] text-white",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

/** The office writes the message once. */
function ComposeCard() {
  return (
    <div className={cn(surface, "w-full max-w-[320px] overflow-hidden")}>
      <DashboardBar />
      <div className="space-y-3 p-4">
        <p className="text-[13px] font-semibold">New announcement</p>
        <p className="rounded-md border border-black/15 px-3 py-2.5 text-[12px] leading-snug">
          {POLICY}
        </p>
        <div>
          <p className={cn("text-[11px]", muted)}>Send to</p>
          <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border border-black/15 px-2.5 py-1 text-[11.5px]">
            <Checkbox /> All groups · {GROUP_COUNT}
          </span>
        </div>
        <InkButton>
          <Send className="h-3.5 w-3.5" /> Send to {GROUP_COUNT} groups
        </InkButton>
      </div>
    </div>
  );
}

/** When each group's row flips to the announcement, one after another. */
const arrival = (i: number) => ({ animationDelay: `${700 + i * 220}ms` });

/**
 * The office manager's own Telegram, a moment later: every driver group gets
 * the same message. Rows are drawn like Telegram's group rows (sender on its
 * own line, then the message). Each row's last driver message fades out and
 * the announcement fades in, one group after another. Without motion it
 * shows the end state.
 */
function ChatList() {
  return (
    <div className="w-full max-w-[320px] overflow-hidden rounded-2xl bg-white text-black shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-black/[0.07] px-4 py-2.5">
        <span className="text-[12.5px] text-[#3390ec]">Edit</span>
        <span className="text-[14px] font-semibold">Chats</span>
        <span />
      </div>
      <ul>
        {GROUPS.map((group, i) => (
          <li
            key={group.truck}
            className={cn("items-center gap-2.5 px-3 py-2", i < 4 ? "flex" : "hidden sm:flex")}
          >
            <Avatar label={group.truck} index={i} className="size-11 text-[12px]" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-[13px] font-semibold">
                  Truck {group.truck} · {group.driver}
                </p>
                <span
                  style={arrival(i)}
                  className="shrink-0 text-[10.5px] text-black/45 motion-safe:animate-[fade-in_300ms_ease-out_both]"
                >
                  9:41 AM
                </span>
              </div>
              <div className="relative flex items-end gap-2">
                <div
                  style={arrival(i)}
                  className="min-w-0 flex-1 text-[12px] leading-[1.35] motion-safe:animate-[fade-in_300ms_ease-out_both]"
                >
                  <p className="truncate text-black/80">{BOT}</p>
                  <p className="truncate text-black/50">{POLICY}</p>
                </div>
                <span
                  style={arrival(i)}
                  className="mb-px grid h-[18px] min-w-[18px] shrink-0 place-items-center rounded-full bg-[#3390ec] px-1 text-[10.5px] font-medium text-white motion-safe:animate-[fade-in_300ms_ease-out_both]"
                >
                  1
                </span>
                {/* The driver's last message, before the announcement. */}
                <div
                  style={arrival(i)}
                  className="absolute inset-0 bg-white text-[12px] leading-[1.35] motion-safe:animate-[fade-in_200ms_ease-in_reverse_both] motion-reduce:hidden"
                >
                  <p className="truncate text-black/80">{group.driver.split(" ")[0]}</p>
                  <p className="truncate text-black/50">{group.last}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HeroFigure() {
  return (
    <GraphitePlate
      crop={{ pos: "30% 40%" }}
      className="grid items-center justify-items-center gap-5 px-4 py-6 sm:grid-cols-2 sm:gap-6 sm:p-8"
    >
      <div className="flex w-full max-w-[320px] flex-col items-center gap-3">
        <ComposeCard />
        <span
          style={arrival(GROUPS.length)}
          className="tg-pop inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11.5px] text-white"
        >
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          Posted in {GROUP_COUNT} groups
        </span>
      </div>
      <ChatList />
    </GraphitePlate>
  );
}

/* ── Before and after ────────────────────────────────────────────────────── */

const BY_HAND = [
  "Open a driver’s group",
  "Paste the message and send",
  "Open the next group",
  `Repeat ${GROUP_COUNT} times`,
  "Hope you didn’t skip one",
];

const WITH_US = ["Write the message once", "Select all groups", "Press Send"];

export function TwoWays() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="bg-card border-border flex flex-col rounded-xs border p-6 sm:p-8">
        <p className="text-muted-foreground font-mono text-xs tracking-[0.14em] uppercase">
          Before Raisedash
        </p>
        <ol className="mt-5 grid gap-2">
          {BY_HAND.map((step, i) => (
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
        <p className="text-muted-foreground mt-auto pt-6 text-sm">
          Your time: <span className="text-foreground">over an hour</span>
        </p>
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
        <p className="text-muted-foreground mt-auto pt-6 text-sm">
          Your time: <span className="text-foreground">about a minute</span>
        </p>
      </div>
    </div>
  );
}

/* ── How it works ────────────────────────────────────────────────────────── */

/** Step 2: pick the groups. Select all is the whole point. */
export function GroupPickerFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[460px] overflow-hidden")}>
      <DashboardBar />
      <div className="p-4">
        <p className="text-[13px] font-semibold">Send to</p>
        <div className="mt-2.5 flex h-9 items-center gap-2 rounded-md border border-black/15 px-3 text-[12px]">
          <Search className="h-3.5 w-3.5 text-[#26251e]/45" />
          <span className={muted}>Search groups</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-b border-black/10 px-1 pb-2.5 text-[12px]">
          <span className="flex items-center gap-2 font-medium">
            <Checkbox /> Select all
          </span>
          <span className={muted}>
            {GROUP_COUNT} of {GROUP_COUNT} selected
          </span>
        </div>
        <ul className="mt-1">
          {GROUPS.slice(0, 4).map((group, i) => (
            <li
              key={group.truck}
              className="flex items-center gap-2.5 border-b border-black/[0.06] px-1 py-2 text-[12px]"
            >
              <Checkbox />
              <Avatar label={group.truck} index={i} className="size-6 text-[9px]" />
              <span className="truncate">
                Truck {group.truck} · {group.driver}
              </span>
            </li>
          ))}
        </ul>
        <p className={cn("px-1 pt-2 text-[11px]", muted)}>and {GROUP_COUNT - 4} more</p>
        <InkButton className="mt-4">
          <Send className="h-3.5 w-3.5" /> Send to {GROUP_COUNT} groups
        </InkButton>
      </div>
    </div>
  );
}

/* ── What carriers send ──────────────────────────────────────────────────── */

/**
 * One announcement as a driver sees it in their truck's group. `sentTo` adds
 * a tag for messages that went to only some groups.
 */
export function MessageFigure({
  text,
  group,
  sentTo,
}: {
  text: string;
  /** Which of GROUPS this chat is. */
  group: number;
  sentTo?: string;
}) {
  const g = GROUPS[group % GROUPS.length];
  return (
    <div className="flex w-full max-w-[276px] flex-col items-center gap-2.5">
      {sentTo ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] text-white">
          <Send className="h-3 w-3" />
          {sentTo}
        </span>
      ) : null}
      <div className="w-full overflow-hidden rounded-lg shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2 bg-white px-3 py-2 text-black">
          <Avatar label={g.truck} index={group} className="size-6 text-[9px]" />
          <span className="truncate text-[12px] font-semibold">
            Truck {g.truck} · {g.driver}
          </span>
        </div>
        <div className="tg-wallpaper p-2.5">
          <div className="max-w-[232px] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[12px] leading-snug text-black shadow-sm">
            <p className="text-[11.5px] font-semibold text-[#3a8fd6]">{BOT}</p>
            <p className="mt-0.5">{text}</p>
            <p className="mt-1 text-right text-[10px] text-black/40">9:41 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
