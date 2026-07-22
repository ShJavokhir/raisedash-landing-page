import { useEffect, useRef, useState } from "react";
import {
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  MessageSquareText,
  Mic,
  MousePointer2,
  Play,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useVignetteTimeline } from "@/hooks/useVignetteTimeline";

/**
 * The homepage hero vignette — one driver's journey told as a strict
 * cause-and-effect chain with two actors. The admin's cursor clicks "Invite"
 * on the readiness board (right, back); a text lands on the driver's phone
 * (left, front); the driver works through a four-step orientation checklist
 * and signs; a completion chip flies back and the admin gets the payoff
 * toast. Only one side is "lit" at a time — the inactive panel dims so the
 * viewer always knows where to look — and a floating caption names the
 * current phase.
 *
 * Built entirely from design tokens (no images, no real data); placeholder
 * names are obviously generic. Loops ~17s; prefers-reduced-motion rests on
 * the final all-ready frame.
 *
 * Beats: 0 idle → 1 cursor glides in → 2 click "Invite" → 3 text chip flies
 * to the phone → 4 SMS lands → 5 driver taps the link → 6 checklist opens →
 * 7–10 video/simulation/voice/quiz tick off → 11 signature draws → 12 ready
 * chip flies to the board → 13 all-ready hold + admin toast → repeat.
 */

const STEP_DURATIONS = [
  1300, // 0 idle — board lit, invite waiting
  900, // 1 cursor glides to Invite
  700, // 2 click
  1000, // 3 text chip flies to the phone
  2100, // 4 SMS lands
  700, // 5 driver taps the link
  900, // 6 checklist opens
  700, // 7 video done
  700, // 8 simulation done
  700, // 9 voice done
  700, // 10 quiz done
  2100, // 11 signature draws
  1000, // 12 ready chip flies to the board
  3200, // 13 all-ready hold + toast
];

const AVATAR_TINTS: Record<string, string> = {
  blue: "bg-accent-blue-soft text-accent-blue",
  violet: "bg-accent-violet-soft text-accent-violet",
  amber: "bg-accent-amber-soft text-accent-amber",
  green: "bg-success/10 text-success",
  orange: "bg-chart-1/10 text-chart-1",
};

/** The four already-ready drivers; J. Carter (the story) renders separately. */
const READY_ROWS = [
  { name: "M. Rodriguez", tint: "blue" },
  { name: "T. Nguyen", tint: "green" },
  { name: "A. Powell", tint: "orange" },
  { name: "L. Sosa", tint: "violet" },
];

const TRAINING_STEPS = [
  { icon: Play, label: "Winter driving video" },
  { icon: Truck, label: "Backing simulation" },
  { icon: Mic, label: "Voice check-in practice" },
  { icon: ClipboardCheck, label: "Final quiz" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("");
}

/** A loose, obviously-abstract cursive squiggle — reads as "a signature". */
const SIGNATURE_PATH =
  "M4 26 C 10 8, 16 6, 18 14 C 20 22, 12 30, 22 24 C 30 19, 32 10, 38 12 C 44 14, 40 26, 50 20 C 58 15, 62 18, 68 16 C 78 13, 88 18, 102 15";

function captionFor(step: number) {
  if (step <= 2) return "Your team sends one invite";
  if (step <= 5) return "The driver gets a text — no app";
  if (step <= 10) return "Videos, simulation, voice, quiz";
  if (step === 11) return "Documents signed";
  return "Ready before day one";
}

function PhoneScreen({ step }: { step: number }) {
  // Which mini-app the phone shows for the current beat.
  const view =
    step <= 3
      ? "idle"
      : step <= 5
        ? "sms"
        : step <= 10
          ? "checklist"
          : step === 11
            ? "sign"
            : "done";

  return (
    <div className="flex h-[9.5rem] flex-col px-3 py-2.5">
      {view === "idle" ? (
        <div key="idle" className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-foreground text-2xl font-light tracking-tight">9:41</p>
          <p className="text-muted-foreground mt-1 text-[10px]">No new messages</p>
        </div>
      ) : null}

      {view === "sms" ? (
        <div key="sms" className="animate-vignette-in flex flex-1 flex-col">
          <p className="text-muted-foreground mb-2 text-[9px] tracking-wide uppercase">
            Messages · Raisedash
          </p>
          <div className="bg-surface-3 text-foreground max-w-[95%] rounded-xs rounded-bl-none px-2.5 py-2 text-[10px] leading-snug">
            Hi Jordan — your orientation starts Monday.
          </div>
          <div className="animate-vignette-in bg-surface-3 text-foreground relative mt-1.5 max-w-[95%] rounded-xs rounded-bl-none px-2.5 py-2 text-[10px] leading-snug [animation-delay:400ms]">
            Get ready on your phone: <span className="text-accent-blue">rd.sh/j8k2</span>
            {step === 5 ? (
              <span className="animate-tap-ring border-foreground/40 absolute inset-0 rounded-xs border-2" />
            ) : null}
          </div>
        </div>
      ) : null}

      {view === "checklist" ? (
        <div key="checklist" className="animate-vignette-in flex flex-1 flex-col">
          <p className="text-muted-foreground mb-2 text-[9px] tracking-wide uppercase">
            Orientation · 4 steps
          </p>
          <div className="space-y-1.5">
            {TRAINING_STEPS.map((item, i) => {
              const done = step >= 7 + i;
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                      done ? "bg-success/10 text-success" : "bg-surface-3 text-muted-foreground"
                    )}
                  >
                    <Icon className="h-2.5 w-2.5" />
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-[10px] leading-tight transition-colors duration-300",
                      done ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </span>
                  {done ? (
                    <CheckCircle2 className="animate-vignette-in text-success h-3 w-3 shrink-0" />
                  ) : (
                    <span className="border-border h-3 w-3 shrink-0 rounded-full border" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {view === "sign" ? (
        <div key="sign" className="animate-vignette-in flex flex-1 flex-col">
          <p className="text-muted-foreground mb-1 text-[9px] tracking-wide uppercase">
            Last step · Sign documents
          </p>
          <div className="border-border bg-surface-2 relative mt-1 flex-1 rounded-xs border">
            <svg
              viewBox="0 0 106 34"
              className="text-foreground absolute inset-0 m-auto h-9 w-[6.5rem]"
              fill="none"
            >
              <path
                d={SIGNATURE_PATH}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1}
                style={{ animation: "draw-stroke 1.2s var(--ease-in-out-strong) 0.25s both" }}
              />
            </svg>
            <span className="border-border absolute right-2 bottom-1.5 left-2 border-t border-dashed" />
          </div>
          <p className="animate-vignette-in text-success mt-2 flex items-center gap-1 text-[10px] [animation-delay:1500ms]">
            <CheckCircle2 className="h-3 w-3" /> Documents signed
          </p>
        </div>
      ) : null}

      {view === "done" ? (
        <div
          key="done"
          className="animate-vignette-in flex flex-1 flex-col items-center justify-center text-center"
        >
          <span className="bg-success/10 text-success mb-2 flex h-8 w-8 items-center justify-center rounded-full">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <p className="text-foreground text-[11px]">Onboarding complete</p>
          <p className="text-muted-foreground mt-0.5 text-[10px]">Orientation program</p>
        </div>
      ) : null}
    </div>
  );
}

/** Stage size of the full scene in px (29rem × 24rem at the 16px root). */
const SCENE_W = 464;
const SCENE_H = 384;
/** The payoff toast renders at -top-9 — keep headroom so it isn't clipped. */
const SCENE_TOP_OVERHANG = 40;

/**
 * The mobile hero visual: the exact same two-panel scene as desktop, measured
 * against the available width and scaled down to fit — not a cut-down variant.
 * The inner HeroScene gates its own timeline on visibility, so the desktop
 * copy (display:none here) never runs timers and vice versa.
 */
export function MobileHeroScene({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // Close-enough first paint for a ~375px phone; measurement corrects it.
  const [scale, setScale] = useState(0.62);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / SCENE_W));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={cn("w-full", className)}>
      <div
        className="mx-auto"
        style={{ width: SCENE_W * scale, height: (SCENE_H + SCENE_TOP_OVERHANG) * scale }}
      >
        <div
          style={{
            width: SCENE_W,
            paddingTop: SCENE_TOP_OVERHANG,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <HeroScene />
        </div>
      </div>
    </div>
  );
}

export function HeroScene() {
  // Gate the timeline on the scene being in view. On phones the homepage wraps
  // this in `hidden lg:block` (display:none), so the observer never reports
  // intersecting and no timers run for the invisible scene; on desktop it's
  // in view immediately, so behavior is unchanged.
  const rootRef = useRef<HTMLDivElement>(null);
  const step = useVignetteTimeline(STEP_DURATIONS, { startInView: rootRef });

  // Spotlight: the phone owns the middle of the story, the board owns the
  // bookends. The inactive panel dims and recedes so the eye follows.
  const phoneFocus = step >= 4 && step <= 11;
  const allReady = step >= 13;
  const caption = captionFor(step);

  return (
    <div ref={rootRef} aria-hidden="true" className="relative h-[24rem] w-[29rem] select-none">
      {/* Phase caption — names what's happening so no beat lands contextless */}
      <p
        key={caption}
        className="animate-vignette-in text-muted-foreground absolute top-0 left-0 max-w-[9rem] text-xs leading-snug"
      >
        {caption}
      </p>

      {/* Readiness board — the admin's side of the story */}
      <div
        className={cn(
          "border-border bg-background absolute top-0 right-0 w-[19rem] rounded-xs border p-4 transition-[opacity,transform] duration-500",
          phoneFocus && "scale-[0.985] opacity-45"
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-foreground text-sm font-normal">Driver readiness</p>
            <p className="text-muted-foreground text-xs">Monday orientation</p>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-normal whitespace-nowrap transition-colors duration-500",
              allReady
                ? "bg-success/10 text-success animate-pulse-soft"
                : "bg-surface-3 text-foreground"
            )}
          >
            {allReady ? "All 5 ready" : "4 of 5 ready"}
          </span>
        </div>

        <div className="divide-border divide-y">
          {READY_ROWS.map((row) => (
            <div key={row.name} className="flex items-center justify-between gap-3 py-2">
              <div className="flex items-center gap-2.5">
                <div
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px]",
                    AVATAR_TINTS[row.tint]
                  )}
                >
                  {initials(row.name)}
                </div>
                <span className="text-foreground text-sm font-normal">{row.name}</span>
              </div>
              <span className="bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Ready
              </span>
            </div>
          ))}

          {/* J. Carter — the driver whose journey we watch */}
          <div className="flex items-center justify-between gap-3 py-2">
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px]",
                  AVATAR_TINTS.amber
                )}
              >
                JC
              </div>
              <span className="text-foreground text-sm font-normal">J. Carter</span>
            </div>

            {step <= 2 ? (
              <span
                className={cn(
                  "bg-primary text-primary-foreground relative inline-flex items-center rounded-full px-3 py-0.5 text-xs transition-transform duration-150",
                  step === 2 && "scale-95"
                )}
              >
                Invite
                {step === 2 ? (
                  <span className="animate-tap-ring border-foreground/40 absolute inset-0 rounded-full border-2" />
                ) : null}
              </span>
            ) : step <= 6 ? (
              <span className="animate-vignette-in bg-accent-blue-soft text-accent-blue inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs">
                <MessageSquareText className="h-3.5 w-3.5" />
                Invite sent
              </span>
            ) : step <= 12 ? (
              <span className="animate-vignette-in bg-accent-amber-soft text-accent-amber inline-flex items-center rounded-full px-2 py-0.5 text-xs">
                In progress
              </span>
            ) : (
              <span className="animate-pulse-soft bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Ready
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Driver's phone — where the invite becomes readiness */}
      <div
        className={cn(
          "border-border bg-card absolute bottom-0 left-0 z-10 w-[11rem] rounded-[1.4rem] border p-1.5 transition-[opacity,transform,box-shadow] duration-500",
          phoneFocus ? "scale-[1.04] opacity-100 shadow-xl" : "opacity-80 shadow-lg"
        )}
      >
        <div className="border-border bg-background overflow-hidden rounded-[1rem] border">
          <div className="text-muted-foreground flex items-center justify-between px-3 pt-1.5 pb-0.5 text-[9px]">
            <span>9:41</span>
            <span className="bg-border/60 h-1 w-8 rounded-full" />
            <span>5G</span>
          </div>
          <PhoneScreen step={step} />
        </div>
      </div>

      {/* Admin cursor — the visible actor behind the invite */}
      <div
        className="text-foreground absolute z-30"
        style={{
          left: "24.9rem",
          top: "15.5rem",
          transform: step >= 1 ? "translate(0, 0)" : "translate(-9rem, 4.5rem)",
          opacity: step >= 3 ? 0 : 1,
          transition: "transform 0.85s var(--ease-in-out-strong), opacity 0.3s ease",
        }}
      >
        <MousePointer2 className="h-5 w-5 drop-shadow-sm" fill="currentColor" />
      </div>

      {/* The text message flying board → phone */}
      {step === 3 ? (
        <div
          className="animate-chip-fly bg-accent-blue-soft text-accent-blue border-accent-blue/20 absolute z-20 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] whitespace-nowrap backdrop-blur-sm"
          style={
            {
              left: "19rem",
              top: "16.2rem",
              "--fly-x": "-14rem",
              "--fly-y": "-2.5rem",
            } as React.CSSProperties
          }
        >
          <MessageSquareText className="h-3 w-3" /> Text sent
        </div>
      ) : null}

      {/* The completion flying phone → board */}
      {step === 12 ? (
        <div
          className="animate-chip-fly bg-success/10 text-success border-success/20 absolute z-20 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] whitespace-nowrap backdrop-blur-sm"
          style={
            {
              left: "8.5rem",
              top: "13rem",
              "--fly-x": "13.5rem",
              "--fly-y": "2.4rem",
            } as React.CSSProperties
          }
        >
          <CheckCircle2 className="h-3 w-3" /> Orientation complete
        </div>
      ) : null}

      {/* Admin notification — the payoff */}
      {allReady ? (
        <div className="animate-vignette-in border-border bg-card absolute -top-9 right-8 z-20 flex items-center gap-2 rounded-xs border px-3 py-2 shadow-lg">
          <span className="bg-success/10 text-success flex h-6 w-6 items-center justify-center rounded-full">
            <BellRing className="h-3.5 w-3.5" />
          </span>
          <span className="text-foreground text-xs">J. Carter is ready for day one</span>
        </div>
      ) : null}
    </div>
  );
}

export default HeroScene;
