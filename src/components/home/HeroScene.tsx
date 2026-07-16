import { CheckCircle2, FileSignature, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/cn";
import { useVignetteTimeline } from "@/hooks/useVignetteTimeline";

/**
 * The homepage hero vignette — a cause-and-effect scene. A driver's phone
 * (left, front) does the work: an SMS lands, a lesson finishes, a signature
 * draws itself. Each completion flies a chip across into the Ready board
 * (right, back), flipping that row green — so the viewer sees WHY a row
 * turns Ready, not just that it does.
 *
 * Built entirely from design tokens (no images, no real data); placeholder
 * names are obviously generic. Loops ~11s; prefers-reduced-motion rests on
 * the final all-ready frame.
 *
 * Beats: 0 idle → 1 SMS lands → 2 lesson fills → 3 chip flies (Carter) →
 * 4 signature draws → 5 chip flies (Sosa) → 6 all-ready hold → repeat.
 */

const STEP_DURATIONS = [1200, 1500, 2100, 800, 2300, 800, 2800];

const AVATAR_TINTS: Record<string, string> = {
  blue: "bg-accent-blue-soft text-accent-blue",
  violet: "bg-accent-violet-soft text-accent-violet",
  amber: "bg-accent-amber-soft text-accent-amber",
  green: "bg-success/10 text-success",
  orange: "bg-chart-1/10 text-chart-1",
};

const ROWS = [
  { name: "M. Rodriguez", tint: "blue" },
  { name: "T. Nguyen", tint: "green" },
  { name: "J. Carter", tint: "amber" },
  { name: "A. Powell", tint: "orange" },
  { name: "L. Sosa", tint: "violet" },
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

function PhoneScreen({ step }: { step: number }) {
  // Which mini-app the phone shows for the current beat.
  const view = step <= 1 ? "sms" : step <= 3 ? "lesson" : step <= 5 ? "signature" : "done";

  return (
    <div className="flex h-[9.5rem] flex-col px-3 py-2.5">
      {view === "sms" ? (
        <div key="sms" className="flex flex-1 flex-col">
          <p className="text-muted-foreground mb-2 text-[9px] tracking-wide uppercase">
            Messages · Raisedash
          </p>
          <div className="bg-surface-3 text-foreground max-w-[95%] rounded-xs rounded-bl-none px-2.5 py-2 text-[10px] leading-snug">
            Hi Jordan — 2 lessons left before Monday&apos;s orientation.
          </div>
          {step >= 1 ? (
            <div className="animate-vignette-in bg-surface-3 text-foreground mt-1.5 max-w-[95%] rounded-xs rounded-bl-none px-2.5 py-2 text-[10px] leading-snug">
              Finish on your phone: <span className="text-accent-blue">rd.sh/j8k2</span>
            </div>
          ) : null}
        </div>
      ) : null}

      {view === "lesson" ? (
        <div key="lesson" className="animate-vignette-in flex flex-1 flex-col">
          <p className="text-muted-foreground mb-1 text-[9px] tracking-wide uppercase">
            Lesson 5 of 5
          </p>
          <p className="text-foreground text-[11px] leading-snug">
            Backing &amp; parking at customer sites
          </p>
          <div className="bg-surface-3 mt-2.5 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-accent-amber h-full rounded-full"
              style={{ animation: "lesson-fill 1.6s var(--ease-out-strong) 0.4s both" }}
            />
          </div>
          <div className="mt-auto">
            {step >= 3 ? (
              <p className="animate-vignette-in text-success flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="h-3 w-3" /> Lessons complete
              </p>
            ) : (
              <p className="text-muted-foreground text-[10px]">3 min left</p>
            )}
          </div>
        </div>
      ) : null}

      {view === "signature" ? (
        <div key="signature" className="animate-vignette-in flex flex-1 flex-col">
          <p className="text-muted-foreground mb-1 text-[9px] tracking-wide uppercase">
            L. Sosa · Knowledge check
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
                style={{ animation: "draw-stroke 1.5s var(--ease-in-out-strong) 0.35s both" }}
              />
            </svg>
            <span className="border-border absolute right-2 bottom-1.5 left-2 border-t border-dashed" />
          </div>
          <div className="mt-2">
            {step >= 5 ? (
              <p className="animate-vignette-in text-success flex items-center gap-1 text-[10px]">
                <CheckCircle2 className="h-3 w-3" /> Quiz submitted
              </p>
            ) : (
              <p className="text-muted-foreground text-[10px]">Review and submit</p>
            )}
          </div>
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
          <p className="text-foreground text-[11px]">Assigned training complete</p>
          <p className="text-muted-foreground mt-0.5 text-[10px]">Orientation program</p>
        </div>
      ) : null}
    </div>
  );
}

export function HeroScene() {
  const step = useVignetteTimeline(STEP_DURATIONS);

  const carterReady = step >= 4;
  const sosaReady = step >= 6;
  const allReady = sosaReady;
  const readyCount = 3 + (carterReady ? 1 : 0) + (sosaReady ? 1 : 0);

  return (
    <div aria-hidden="true" className="relative h-[24rem] w-[29rem] select-none">
      {/* Ready board — the admin's side of the story */}
      <div className="border-border bg-background absolute top-0 right-0 w-[19rem] rounded-xs border p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-foreground text-sm font-normal">Training progress</p>
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
            {allReady ? "All 5 complete" : `${readyCount} of 5 complete`}
          </span>
        </div>

        <div className="divide-border divide-y">
          {ROWS.map((row) => {
            const isSosa = row.name === "L. Sosa";
            const isCarter = row.name === "J. Carter";
            const ready =
              (!isSosa && !isCarter) || (isSosa && sosaReady) || (isCarter && carterReady);
            const justFlipped = (isCarter && step === 4) || (isSosa && step === 6);

            return (
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

                {ready ? (
                  <span
                    className={cn(
                      "bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs",
                      justFlipped && "animate-pulse-soft"
                    )}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Complete
                  </span>
                ) : isSosa ? (
                  <span className="bg-accent-violet-soft text-accent-violet inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs">
                    <FileSignature className="h-3.5 w-3.5" />
                    Quiz left
                  </span>
                ) : (
                  <span className="bg-accent-amber-soft text-accent-amber inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs">
                    Lessons left
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Driver's phone — the cause */}
      <div className="border-border bg-card absolute bottom-0 left-0 z-10 w-[11rem] rounded-[1.4rem] border p-1.5 shadow-lg">
        <div className="border-border bg-background overflow-hidden rounded-[1rem] border">
          <div className="text-muted-foreground flex items-center justify-between px-3 pt-1.5 pb-0.5 text-[9px]">
            <span>9:41</span>
            <span className="bg-border/60 h-1 w-8 rounded-full" />
            <span>5G</span>
          </div>
          <PhoneScreen step={step} />
        </div>
      </div>

      {/* Completion chips — the causal link, phone → board row */}
      {step === 3 ? (
        <div
          className="animate-chip-fly bg-success/10 text-success border-success/20 absolute z-20 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] whitespace-nowrap backdrop-blur-sm"
          style={
            {
              left: "8.5rem",
              top: "11.5rem",
              "--fly-x": "13rem",
              "--fly-y": "-1.5rem",
            } as React.CSSProperties
          }
        >
          <CheckCircle2 className="h-3 w-3" /> Lessons 5/5
        </div>
      ) : null}
      {step === 5 ? (
        <div
          className="animate-chip-fly bg-success/10 text-success border-success/20 absolute z-20 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] whitespace-nowrap backdrop-blur-sm"
          style={
            {
              left: "8.5rem",
              top: "11.5rem",
              "--fly-x": "14rem",
              "--fly-y": "3.6rem",
            } as React.CSSProperties
          }
        >
          <FileSignature className="h-3 w-3" /> Quiz passed
        </div>
      ) : null}

      {/* SMS toast on the board side when the reminder goes out */}
      {step === 1 ? (
        <div className="animate-vignette-in border-border bg-card absolute -top-9 right-8 flex items-center gap-2 rounded-xs border px-3 py-2 shadow-lg">
          <span className="bg-accent-blue-soft text-accent-blue flex h-6 w-6 items-center justify-center rounded-full">
            <MessageSquareText className="h-3.5 w-3.5" />
          </span>
          <span className="text-foreground text-xs">Reminder texted to J. Carter</span>
        </div>
      ) : null}
    </div>
  );
}

export default HeroScene;
