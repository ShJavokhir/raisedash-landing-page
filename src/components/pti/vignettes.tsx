import { useEffect, useState, useSyncExternalStore } from "react";
import { Camera, CheckCircle2, MapPin, TriangleAlert, Video } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * CSS-built mockups for the /pti product page. Same rules as the platform
 * vignettes: styled divs and design tokens only, no screenshots, no real
 * customer data, placeholder driver names kept to an initial plus surname so
 * they read as examples rather than real people.
 */

/**
 * Like useVignetteLoop, but each beat sets its own duration. A conversation
 * does not advance on a metronome: a typing indicator is short, a link landing
 * needs a moment to read, and the stretch where the driver is out walking the
 * truck should feel like time actually passing. Uniform timing is what made the
 * first version of the hero read as a slideshow rather than a live chat.
 *
 * Pass a module-level constant, not an inline array, or the effect re-runs
 * every render. SSR-safe: the server always renders beat 0.
 */
function useBeats(durations: readonly number[]): number {
  const reduced = usePrefersReducedMotion();
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setBeat((b) => (b + 1) % durations.length), durations[beat]);
    return () => window.clearTimeout(id);
  }, [beat, durations, reduced]);

  /* Derived rather than assigned in an effect, so no cascading render: a
     reader who asked for less motion just gets the finished chat. */
  return reduced ? durations.length - 1 : beat;
}

/** Media query read the subscribe-and-snapshot way, so SSR and hydration agree. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function ChatFrame({
  children,
  title,
  subtitle = "7 members, 1 bot",
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="border-border bg-card overflow-hidden rounded-xs border shadow-lg">
      <div className="border-border bg-surface-2 flex items-center gap-3 border-b px-4 py-3">
        <div className="bg-surface-4 text-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[11px]">
          RF
        </div>
        <div className="min-w-0">
          <p className="text-foreground truncate text-sm leading-tight">{title}</p>
          <p className="text-muted-foreground truncate text-[11px] leading-tight">{subtitle}</p>
        </div>
      </div>
      <div className="bg-background space-y-2.5 px-3 py-4 sm:px-4">{children}</div>
    </div>
  );
}

/** Three bouncing dots, used both for a typing bubble and the in-progress line. */
function Dots({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      <span className="bg-muted-foreground/60 animate-typing-dot h-1.5 w-1.5 rounded-full" />
      <span className="bg-muted-foreground/60 animate-typing-dot h-1.5 w-1.5 rounded-full [animation-delay:160ms]" />
      <span className="bg-muted-foreground/60 animate-typing-dot h-1.5 w-1.5 rounded-full [animation-delay:320ms]" />
    </span>
  );
}

function DriverBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="bg-surface-3 text-foreground max-w-[78%] rounded-xs rounded-br-none px-3 py-2 text-sm">
        {children}
      </div>
    </div>
  );
}

function BotBubble({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="flex justify-start">
      <div
        className={cn(
          "border-border bg-card max-w-[85%] rounded-xs rounded-bl-none border px-3 py-2.5",
          className
        )}
      >
        <p className="text-muted-foreground mb-1.5 text-[10px] tracking-wide uppercase">
          Raisedash bot
        </p>
        {children}
      </div>
    </div>
  );
}

/**
 * The hero figure: the real sequence a driver group sees.
 *
 * Three separate messages, matching the backend exactly (pti.service.ts): the
 * driver's /pti, the bot's link, and then a brand new result message. The
 * result is NOT an edit of the link. At submit the bot deletes its own link
 * (`removePrompt`) and sends a fresh message (`sendMessage`), which is why beat
 * 3 shows all three at once and beat 4 rests on the tidied chat.
 *
 * Beat 2 is off-chat on purpose: nothing is posted to the group while the
 * driver is walking the truck, so inventing a "driver started" message would be
 * a lie. The phone card is drawn as clearly not a chat bubble.
 */
/**
 * Per-beat timing, in order. Deliberately uneven: typing is quick, a message
 * landing needs reading time, and beat 4 (the driver out at the truck) is the
 * longest because that is the one stretch where real minutes pass.
 */
const CHAT_BEATS = [1500, 1800, 1300, 2400, 3200, 2600, 3000] as const;

const BEAT_EMPTY = 0;
const BEAT_COMMAND = 1;
const BEAT_BOT_TYPING = 2;
const BEAT_LINK = 3;
const BEAT_INSPECTING = 4;
const BEAT_RESULT = 5;
/* Beat 6 is the rest state: the link is gone and only the result remains. It
   needs no constant because every condition below already covers it. */

export function TelegramGroupVignette() {
  const beat = useBeats(CHAT_BEATS);

  const showCommand = beat >= BEAT_COMMAND;
  const showLink = beat >= BEAT_LINK && beat <= BEAT_RESULT;
  const showResult = beat >= BEAT_RESULT;

  return (
    <div className="relative">
      <ChatFrame
        title="Ridgeline Freight, Drivers"
        /* The chat starts empty and the driver types into it, so the loop
           begins the way a real one does instead of opening on a command
           that is somehow already sent. */
        subtitle={beat === BEAT_EMPTY ? "M. Ruiz is typing…" : "7 members, 1 bot"}
      >
        {/* Fixed height so the hero never jolts as beats change size, and
            bottom-anchored because that is how a chat actually stacks: the
            empty room belongs above the messages, not below them. */}
        <div className="flex min-h-[19rem] flex-col justify-end gap-2.5">
          {showCommand ? (
            <div className="animate-vignette-in">
              <DriverBubble>/pti</DriverBubble>
            </div>
          ) : null}

          {beat === BEAT_BOT_TYPING ? (
            <div className="animate-vignette-in">
              <BotBubble>
                <Dots className="py-0.5" />
              </BotBubble>
            </div>
          ) : null}

          {showLink ? (
            <div
              className={cn(
                "animate-vignette-in transition-opacity duration-700",
                /* The bot deletes this the moment the result lands. */
                beat === BEAT_RESULT && "opacity-30"
              )}
            >
              <BotBubble>
                <p className="text-foreground text-sm leading-relaxed">🚛 Start your inspection:</p>
                <p className="text-accent-blue mt-0.5 text-sm break-all">
                  on.raisedash.com/pti/9fKq2p
                </p>
              </BotBubble>
            </div>
          ) : null}

          {/* Nothing is posted to the group while the driver is out at the
              truck, so this is a plain caption rather than a chat bubble. */}
          {beat === BEAT_INSPECTING ? (
            <p className="animate-vignette-in text-muted-foreground flex items-center justify-center gap-1.5 py-1 text-center text-[11px]">
              Driver opened the link, doing the inspection
              <Dots />
            </p>
          ) : null}

          {showResult ? (
            <div className="animate-vignette-in">
              <BotBubble className="border-success/40">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-foreground text-sm leading-snug">Pre-trip done, M. Ruiz</p>
                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                      Truck 104 · 6 photos · 📍 location
                    </p>
                    <p className="text-accent-blue mt-1.5 text-xs break-all">
                      on.raisedash.com/pti/r/x7Tb4m
                    </p>
                  </div>
                </div>
              </BotBubble>
            </div>
          ) : null}
        </div>
      </ChatFrame>

      <p className="text-muted-foreground mt-3 text-center text-xs">
        The result is its own message. The bot clears its old link away, so the group keeps one
        message per inspection instead of a stack.
      </p>
    </div>
  );
}

/**
 * The other outcome. Shown next to the clean result so a buyer sees that the
 * driver's own answer is what turns a routine inspection into something the
 * office has to act on.
 */
export function ProblemFoundVignette() {
  return (
    <ChatFrame title="Ridgeline Freight, Drivers">
      <BotBubble className="border-accent-amber/40">
        <div className="flex items-start gap-2">
          <TriangleAlert className="text-accent-amber mt-0.5 h-4 w-4 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-foreground text-sm leading-snug">
              Post-trip, M. Ruiz found a problem
            </p>
            <p className="text-foreground mt-1 text-xs leading-relaxed">
              Tires &amp; wheels, Lights &amp; reflectors
            </p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed italic">
              &ldquo;Left marker light is out&rdquo;
            </p>
            <p className="text-muted-foreground mt-1 text-xs">5 photos</p>
            <p className="text-accent-blue mt-1.5 text-xs break-all">
              on.raisedash.com/pti/r/b2Nw8k
            </p>
          </div>
        </div>
      </BotBubble>
    </ChatFrame>
  );
}

/** Side-by-side comparison of the two capture modes, as the driver sees them. */
export function CaptureModesVignette() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {/* Photo mode: one screen per step */}
      <div className="border-border bg-card flex flex-col rounded-xs border p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="bg-accent-blue-soft text-accent-blue border-accent-blue/20 flex h-8 w-8 items-center justify-center rounded-xs border">
            <Camera className="h-4 w-4" />
          </span>
          <div>
            <p className="text-foreground text-sm">Photos</p>
            <p className="text-muted-foreground text-xs">A photo of each item</p>
          </div>
        </div>

        <div className="border-border bg-background rounded-xs border p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-muted-foreground text-[11px]">Step 2 of 6</p>
            <p className="text-muted-foreground text-[11px]">Skip</p>
          </div>
          <p className="text-foreground text-sm">Tires &amp; wheels</p>
          <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
            The steer tires, showing tread and lug nuts.
          </p>
          <div className="border-border bg-surface-2 mt-3 flex h-20 items-center justify-center rounded-xs border border-dashed">
            <p className="text-muted-foreground text-[11px]">Example sketch</p>
          </div>
          <div className="bg-primary text-primary-foreground mt-3 flex h-8 items-center justify-center rounded-full text-xs">
            Take photo
          </div>
        </div>

        <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
          Each photo starts uploading in the background while the driver walks to the next item.
        </p>
      </div>

      {/* Video mode: one continuous walkaround */}
      <div className="border-border bg-card flex flex-col rounded-xs border p-5">
        <div className="mb-4 flex items-center gap-2">
          <span className="bg-accent-amber-soft text-accent-amber border-accent-amber/20 flex h-8 w-8 items-center justify-center rounded-xs border">
            <Video className="h-4 w-4" />
          </span>
          <div>
            <p className="text-foreground text-sm">Video</p>
            <p className="text-muted-foreground text-xs">One guided walkaround</p>
          </div>
        </div>

        <div className="border-border bg-foreground/90 rounded-xs border p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              <span className="text-[11px] text-white/70">1:12</span>
            </span>
            <span className="text-[11px] text-white/70">3 of 6 done</span>
          </div>
          <p className="text-[11px] text-white/60">Step 4 of 6</p>
          <p className="mt-0.5 text-sm text-white">Coupling / fifth wheel</p>
          <p className="mt-0.5 text-xs leading-relaxed text-white/60">
            The fifth wheel, kingpin, and locking jaws.
          </p>
          <div className="mt-3 flex gap-2">
            <div className="flex h-8 flex-1 items-center justify-center rounded-full bg-white text-xs text-black">
              Done, next
            </div>
            <div className="flex h-8 items-center justify-center rounded-full border border-white/30 px-3 text-xs text-white/80">
              Skip
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mt-4 text-xs leading-relaxed">
          The camera never stops. Each step the driver reaches is stamped as a chapter the office
          can jump straight to.
        </p>
      </div>
    </div>
  );
}

/** The chapter list a walkaround video produces, as the office sees it. */
export function ChapterListVignette() {
  const chapters = [
    { label: "Front of truck", at: "0:00", flagged: false },
    { label: "Tires & wheels", at: "0:42", flagged: true },
    { label: "Lights & reflectors", at: "1:20", flagged: false },
    { label: "Coupling / fifth wheel", at: "1:58", flagged: false },
    { label: "Trailer & mudflaps", at: "2:31", flagged: false },
    { label: "In-cab gauges & brakes", at: "3:04", flagged: false },
  ];

  return (
    <div className="border-border bg-card overflow-hidden rounded-xs border">
      <div className="bg-foreground/90 flex h-32 items-center justify-center sm:h-40">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
          <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
        </span>
      </div>
      <div className="divide-border divide-y">
        {chapters.map((chapter) => (
          <div
            key={chapter.label}
            className={cn(
              "flex items-center justify-between gap-3 px-4 py-2.5",
              chapter.flagged && "bg-accent-amber-soft"
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              {chapter.flagged ? (
                <TriangleAlert className="text-accent-amber h-3.5 w-3.5 flex-shrink-0" />
              ) : null}
              <span className="text-foreground truncate text-sm">{chapter.label}</span>
            </span>
            <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
              {chapter.at}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** What a forwarded report link opens to. */
export function ReportVignette() {
  return (
    <div className="border-border bg-card overflow-hidden rounded-xs border">
      <div className="border-border border-b px-5 py-4">
        <p className="text-muted-foreground text-[11px] tracking-wide uppercase">
          Pre-trip inspection
        </p>
        <p className="text-foreground mt-1 text-base">Ridgeline Freight</p>
      </div>
      <div className="space-y-4 px-5 py-5">
        <div className="border-success/40 bg-success/10 flex items-start gap-2.5 rounded-xs border p-3">
          <CheckCircle2 className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
          <p className="text-foreground text-sm">No problems reported</p>
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground text-xs">Driver</dt>
            <dd className="text-foreground mt-0.5">M. Ruiz</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">Truck</dt>
            <dd className="text-foreground mt-0.5">104</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">Submitted</dt>
            <dd className="text-foreground mt-0.5">6:12 AM</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">Location</dt>
            <dd className="text-foreground mt-0.5 flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Captured
            </dd>
          </div>
        </dl>

        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border-border bg-surface-3 aspect-4/3 rounded-xs border" />
          ))}
        </div>
      </div>
    </div>
  );
}
