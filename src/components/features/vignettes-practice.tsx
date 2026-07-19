import { CheckCircle2, Loader2, Mic, TriangleAlert } from "lucide-react";
import { VignetteCursor } from "@/components/features/VignetteCursor";
import { PhoneFrame } from "@/components/platform";
import { useVignetteLoop } from "@/hooks/useVignetteLoop";
import { cn } from "@/lib/cn";

const ROLEPLAY_TIMES = ["4:32", "4:07", "3:41", "3:12"];
const ROLEPLAY_STATUS = [
  "Listening to you…",
  "Officer M. is thinking…",
  "Officer M. is speaking…",
  "Listening to you…",
];
const ROLEPLAY_CRITERIA = [
  "Answered questions in English",
  "Explained the trip and cargo",
  "Stayed calm and asked for clarification",
];

export function RoleplayCallVignette() {
  const step = useVignetteLoop(7, 1500);

  return (
    <PhoneFrame caption="Voice practice">
      <div className="relative min-h-[300px]">
        {step <= 3 ? (
          <div className="animate-vignette-in flex min-h-[300px] flex-col">
            <div className="flex items-center gap-2">
              <span className="bg-accent-amber-soft text-accent-amber flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                <Mic className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-foreground text-xs font-normal">Roadside inspector</p>
                <p className="text-muted-foreground text-[10px]">Officer M.</p>
              </div>
              <span className="text-muted-foreground font-mono text-[10px] tabular-nums">
                {ROLEPLAY_TIMES[step]}
              </span>
            </div>

            <div className="mt-5 flex h-6 items-center justify-center gap-1.5">
              {Array.from({ length: 7 }, (_, index) => (
                <span
                  key={index}
                  className={cn(
                    "bg-accent-amber h-6 w-1 rounded-full",
                    step === 1 ? "opacity-40" : "animate-waveform"
                  )}
                  style={step === 1 ? undefined : { animationDelay: `${index * 0.12}s` }}
                />
              ))}
            </div>
            <p className="text-muted-foreground mt-2 text-center text-[10px]">
              {ROLEPLAY_STATUS[step]}
            </p>

            <div className="mt-4 flex min-h-[82px] flex-col gap-1.5">
              {step >= 1 ? (
                <p className="bg-surface-2 text-foreground animate-vignette-in max-w-[85%] rounded-xs px-2 py-1.5 text-[10px] leading-relaxed">
                  Where are you headed today, driver?
                </p>
              ) : null}
              {step >= 3 ? (
                <p className="bg-accent-amber-soft text-foreground animate-vignette-in max-w-[85%] self-end rounded-xs px-2 py-1.5 text-[10px] leading-relaxed">
                  Coming from Columbus, delivering in Dayton.
                </p>
              ) : null}
            </div>

            <div className="mt-auto flex justify-center pt-3">
              <span
                className={cn(
                  "border-border bg-card text-foreground rounded-full border px-3 py-1.5 text-[10px]",
                  step === 3 && "animate-figure-cursor-target"
                )}
              >
                End conversation
              </span>
            </div>
            {step === 3 ? (
              <VignetteCursor className="top-[17.75rem] left-[70%]" fromX="3.5rem" fromY="2rem" />
            ) : null}
          </div>
        ) : step === 4 ? (
          <div className="animate-vignette-in flex min-h-[300px] flex-col items-center justify-center gap-3">
            <Loader2 className="text-accent-amber h-5 w-5 animate-spin" />
            <p className="text-muted-foreground text-[11px]">Reviewing your conversation…</p>
          </div>
        ) : (
          <div className="animate-vignette-in flex min-h-[300px] flex-col">
            <div>
              <span className="bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
                <CheckCircle2 className="h-3 w-3" />
                Passed
              </span>
              <p className="text-muted-foreground mt-3 text-[10px] leading-relaxed">
                Clear answers, steady pace, asked when unsure.
              </p>
            </div>

            <div className="mt-4 space-y-2">
              {ROLEPLAY_CRITERIA.map((criterion, index) => {
                const shown = index < (step === 5 ? 2 : 3);
                return (
                  <div
                    key={criterion}
                    className={cn(
                      "border-border bg-surface-2 flex min-h-9 items-center gap-2 rounded-xs border px-2.5 py-2 transition-opacity duration-500",
                      shown ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <CheckCircle2 className="text-success h-3 w-3 flex-shrink-0" />
                    <span className="text-foreground flex-1 text-[10px] leading-snug">
                      {criterion}
                    </span>
                    {index === 2 ? (
                      <span className="bg-surface-3 text-muted-foreground rounded-full px-1.5 py-0.5 text-[8px]">
                        Optional
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-auto flex gap-2 pt-4">
              <span className="bg-primary text-primary-foreground flex-1 rounded-full px-3 py-1.5 text-center text-[10px]">
                Continue
              </span>
              <span className="border-border bg-card text-foreground flex-1 rounded-full border px-3 py-1.5 text-center text-[10px]">
                Do it again
              </span>
            </div>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}

const SIM_TIMES = ["0:42", "0:49", "0:57", "1:04", "1:12", "1:19"];

export function SimVignette() {
  const step = useVignetteLoop(7, 1400);

  const instruction =
    step === 0
      ? "Tap ON to go on duty."
      : step === 1
        ? "Not yet. You haven't started driving. Look for ON."
        : step === 2
          ? "Tap ON to go on duty."
          : step === 3
            ? "Step 2 of 4: certify yesterday's log."
            : step === 4
              ? "Tap Certify to confirm yesterday's log."
              : "Yesterday's log is certified.";

  return (
    <PhoneFrame caption="Practice simulation">
      <div className="relative min-h-[300px]">
        {step <= 5 ? (
          <div className="animate-vignette-in flex min-h-[300px] flex-col">
            <p className="text-foreground text-xs font-normal">Daily log</p>

            <div className="mt-4 min-h-[126px]">
              {step <= 3 ? (
                <div className="grid grid-cols-2 gap-2">
                  {["OFF", "ON", "SB", "D"].map((status) => {
                    const isOn = status === "ON";
                    const isDriving = status === "D";
                    return (
                      <div
                        key={status}
                        className={cn(
                          "border-border bg-surface-2 text-foreground flex min-h-[55px] items-center justify-center rounded-xs border py-3 text-center text-[11px] transition-colors duration-300",
                          step === 0 && isOn && "ring-success/50 animate-pulse-soft ring-2",
                          step === 0 && isDriving && "animate-figure-cursor-target",
                          step === 1 && isDriving && "border-destructive/60 animate-shake-x",
                          step === 2 &&
                            isOn &&
                            "ring-success/50 animate-figure-cursor-target ring-2",
                          step === 3 && isOn && "border-success/40 bg-success/10 text-success"
                        )}
                      >
                        {step === 3 && isOn ? (
                          <span className="inline-flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            ON
                          </span>
                        ) : (
                          status
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="border-border bg-surface-2 animate-vignette-in rounded-xs border p-3">
                  <p className="text-foreground text-[11px] font-normal">
                    Yesterday · 9h 42m driving
                  </p>
                  <div className="mt-4 flex justify-end">
                    {step === 4 ? (
                      <span className="bg-primary text-primary-foreground animate-figure-cursor-target rounded-full px-3 py-1.5 text-[10px]">
                        Certify
                      </span>
                    ) : (
                      <span className="bg-success/10 text-success inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px]">
                        <CheckCircle2 className="h-3 w-3" />
                        Certified
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-3 flex justify-center gap-2">
              {Array.from({ length: 4 }, (_, index) => {
                const completed = step >= 5 ? index < 2 : step >= 3 ? index < 1 : false;
                const active = step >= 5 ? index === 2 : step >= 3 ? index === 1 : index === 0;
                return (
                  <span
                    key={index}
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      completed ? "bg-success" : active ? "bg-foreground" : "bg-border"
                    )}
                  />
                );
              })}
            </div>

            <div className="mt-3 min-h-7">
              {step === 2 ? (
                <span className="bg-accent-blue-soft text-accent-blue animate-vignette-in inline-flex rounded-full px-2.5 py-1 text-[10px]">
                  Hint: ON is top right
                </span>
              ) : null}
            </div>

            <div className="border-border mt-auto min-h-[66px] border-t pt-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-muted-foreground text-[10px] tracking-wide uppercase">
                  Mission · Start your day
                </p>
                <span className="text-muted-foreground font-mono text-[10px] tabular-nums">
                  {SIM_TIMES[step]}
                </span>
              </div>
              <p
                className={cn(
                  "text-foreground mt-2 text-[11px] leading-snug",
                  step === 1 && "flex items-start gap-1.5"
                )}
              >
                {step === 1 ? (
                  <TriangleAlert className="text-destructive mt-0.5 h-3 w-3 flex-shrink-0" />
                ) : null}
                <span>{instruction}</span>
              </p>
            </div>
            {step === 0 ? (
              <VignetteCursor className="top-[7.25rem] left-[78%]" fromX="2.5rem" fromY="2rem" />
            ) : null}
            {step === 2 ? (
              <VignetteCursor className="top-[3.5rem] left-[78%]" fromX="2.5rem" fromY="2rem" />
            ) : null}
            {step === 4 ? (
              <VignetteCursor className="top-[6.25rem] left-[88%]" fromX="1.5rem" fromY="1.5rem" />
            ) : null}
          </div>
        ) : (
          <div className="animate-vignette-in flex min-h-[300px] flex-col items-center justify-center text-center">
            <CheckCircle2 className="text-success h-6 w-6" />
            <p className="text-foreground mt-3 text-xs font-normal">Practice complete</p>
            <p className="text-muted-foreground mt-1 text-[10px]">1 wrong tap · 1 hint</p>
            <span className="bg-primary text-primary-foreground mt-5 rounded-full px-4 py-1.5 text-[10px]">
              Finish
            </span>
          </div>
        )}
      </div>
    </PhoneFrame>
  );
}
