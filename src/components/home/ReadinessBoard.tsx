import { CheckCircle2, FileSignature, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/cn";
import { useVignetteLoop } from "@/hooks/useVignetteLoop";

/**
 * The homepage hero vignette — a looping "Ready board" that plays the product's
 * core story: a reminder text goes out, a signature lands, lessons finish, and
 * the class ends up ready for Monday. Built entirely from design tokens
 * (no images, no real data); obviously-generic placeholder names only.
 *
 * Loop (6 steps): idle → reminder texted → signature lands → lessons finish →
 * last driver ready → "all set" — then repeats.
 */

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

export function ReadinessBoard() {
  const step = useVignetteLoop(6, 1500);

  const sosaReady = step >= 2;
  const carterDone = step >= 3;
  const carterReady = step >= 4;
  const allReady = step >= 5;
  const readyCount = 3 + (sosaReady ? 1 : 0) + (carterReady ? 1 : 0);

  return (
    <div aria-hidden="true" className="relative w-[22rem] select-none">
      <div className="border-border bg-background rounded-xs border p-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-foreground text-sm font-normal">Ready board</p>
            <p className="text-muted-foreground text-xs">Monday orientation · Springfield</p>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-normal transition-colors duration-500",
              allReady
                ? "bg-success/10 text-success animate-pulse-soft"
                : "bg-surface-3 text-foreground"
            )}
          >
            {allReady ? "All 5 ready" : `${readyCount} of 5 ready`}
          </span>
        </div>

        {/* Rows */}
        <div className="divide-border divide-y">
          {ROWS.map((row) => {
            const isSosa = row.name === "L. Sosa";
            const isCarter = row.name === "J. Carter";
            const ready =
              (!isSosa && !isCarter) || (isSosa && sosaReady) || (isCarter && carterReady);
            const justFlipped = (isSosa && step === 2) || (isCarter && step === 4);

            return (
              <div key={row.name} className="flex items-center justify-between gap-3 py-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px]",
                      AVATAR_TINTS[row.tint]
                    )}
                  >
                    {initials(row.name)}
                  </div>
                  <div>
                    <span className="text-foreground text-sm font-normal">{row.name}</span>
                    {isCarter && !carterReady ? (
                      <div className="mt-1 flex items-center gap-1.5">
                        <div className="bg-surface-3 h-1 w-16 overflow-hidden rounded-full">
                          <div
                            className="bg-accent-amber h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: carterDone ? "100%" : "60%" }}
                          />
                        </div>
                        <span className="text-muted-foreground text-[10px]">
                          {carterDone ? "5 of 5" : "3 of 5"}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {ready ? (
                  <span
                    className={cn(
                      "bg-success/10 text-success inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs",
                      justFlipped && "animate-pulse-soft"
                    )}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Ready
                  </span>
                ) : isSosa ? (
                  <span className="bg-accent-violet-soft text-accent-violet inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs">
                    <FileSignature className="h-3.5 w-3.5" />
                    Signature pending
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

      {/* Floating SMS toast — the "text message" beat of the loop */}
      {step === 1 ? (
        <div className="animate-vignette-in border-border bg-card absolute -bottom-4 left-5 flex items-center gap-2 rounded-xs border px-3 py-2 shadow-lg">
          <span className="bg-accent-blue-soft text-accent-blue flex h-6 w-6 items-center justify-center rounded-full">
            <MessageSquareText className="h-3.5 w-3.5" />
          </span>
          <span className="text-foreground text-xs">Reminder texted to L. Sosa</span>
        </div>
      ) : null}
    </div>
  );
}

export default ReadinessBoard;
