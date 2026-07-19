import {
  CheckCircle2,
  FileCheck,
  FileText,
  HelpCircle,
  Loader2,
  Play,
  PlayCircle,
} from "lucide-react";
import { VignetteCursor } from "@/components/features/VignetteCursor";
import { BrowserFrame } from "@/components/platform";
import { useVignetteLoop } from "@/hooks/useVignetteLoop";
import { cn } from "@/lib/cn";

const GENERATION_STEPS = [
  "Writing the script",
  "Picking footage & recording narration",
  "Rendering",
  "Ready",
];

export function GeneratorVignette() {
  const step = useVignetteLoop(6, 1400);
  const activeRow = step >= 1 && step <= 3 ? step - 1 : -1;
  const progress = step === 1 ? 20 : step === 2 ? 55 : step === 3 ? 85 : 0;

  return (
    <BrowserFrame url="app.raisedash.com/videos">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-foreground text-sm font-normal">New training video</p>
        <span className="bg-surface-3 text-foreground rounded-full px-2.5 py-1 text-[10px]">
          Explainer
        </span>
      </div>

      <div className="border-border bg-surface-2 rounded-xs border p-3">
        <p className="text-muted-foreground text-[9px] tracking-wide uppercase">Brief</p>
        <p className="text-foreground mt-1 text-[11px] font-normal">
          Explain winter braking on ice for regional van drivers
        </p>
      </div>

      {/* Every phase occupies the same stage so the hero keeps one height as the loop advances. */}
      <div className="relative mt-3 h-[292px]">
        <div
          aria-hidden={step !== 0}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            step === 0 ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <button
            type="button"
            className={cn(
              "bg-primary text-primary-foreground rounded-xs px-3 py-2 text-xs font-normal",
              step === 0 && "animate-figure-cursor-target"
            )}
          >
            Create video
          </button>
          {step === 0 ? <VignetteCursor className="top-7 left-[5.5rem]" /> : null}
        </div>

        <div
          aria-hidden={step < 1 || step > 3}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            step >= 1 && step <= 3 ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="space-y-2">
            {GENERATION_STEPS.map((label, index) => {
              const done = index < activeRow;
              const active = index === activeRow;
              return (
                <div key={label} className="flex h-6 items-center gap-2.5">
                  {done ? (
                    <CheckCircle2 className="text-success h-3.5 w-3.5 flex-shrink-0" />
                  ) : active ? (
                    <Loader2 className="text-accent-violet h-3.5 w-3.5 flex-shrink-0 animate-spin" />
                  ) : (
                    <span className="border-border h-3.5 w-3.5 flex-shrink-0 rounded-full border" />
                  )}
                  <span
                    className={cn(
                      "text-[11px] font-normal",
                      done || active ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="bg-surface-3 mt-3 h-1 overflow-hidden rounded-full">
            <div
              className="bg-accent-violet h-full rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div
          aria-hidden={step < 4}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            step >= 4 ? "animate-vignette-in opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <span className="bg-success/10 text-success inline-flex rounded-full px-2.5 py-1 text-[10px]">
            Ready
          </span>
          <div className="border-border bg-card mt-2 max-w-[360px] rounded-xs border p-2">
            <div className="bg-primary flex aspect-video items-center justify-center rounded-xs">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                <Play className="ml-0.5 h-4 w-4" />
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-foreground text-[11px] font-normal">Winter braking on ice</p>
              <p className="text-muted-foreground flex-shrink-0 text-[10px]">1:04 · landscape</p>
            </div>
            <div className="mt-2 flex gap-1.5">
              {["Download", "Edit video"].map((label) => (
                <span
                  key={label}
                  className="border-border bg-card text-foreground rounded-xs border px-2 py-1 text-[10px]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

const OUTLINE_MODULES = [
  {
    title: "1 · Pre-trip in the cold",
    items: [
      { icon: FileText, title: "Cold-weather pre-trip" },
      { icon: FileText, title: "Air & fluid checks" },
      { icon: HelpCircle, title: "Knowledge check" },
    ],
  },
  {
    title: "2 · Braking & following distance on ice",
    items: [
      { icon: FileText, title: "Braking on ice" },
      { icon: HelpCircle, title: "Knowledge check" },
      { icon: PlayCircle, title: "Braking walkthrough", video: true },
    ],
  },
  {
    title: "3 · When to shut down",
    items: [
      { icon: FileText, title: "Shutdown thresholds" },
      { icon: FileText, title: "Communication plan" },
      { icon: HelpCircle, title: "Knowledge check" },
    ],
  },
];

function MiniToggle({ on, cursorTarget = false }: { on: boolean; cursorTarget?: boolean }) {
  return (
    <span
      className={cn(
        "relative h-3 w-6 flex-shrink-0 rounded-full transition-colors duration-300",
        on ? "bg-accent-blue" : "bg-surface-3",
        cursorTarget && "animate-figure-cursor-target"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-2 w-2 rounded-full bg-white transition-transform duration-300",
          on && "translate-x-3"
        )}
      />
    </span>
  );
}

export function OutlineVignette() {
  const step = useVignetteLoop(6, 1500);
  const videoIncluded = step !== 3;

  return (
    <BrowserFrame url="app.raisedash.com/trainings/studio">
      {/* All five states are layered into one reserved stage to prevent layout shift. */}
      <div className="relative h-[300px]">
        <div
          aria-hidden={step !== 0}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            step === 0 ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="border-border bg-surface-2 rounded-xs border p-3">
            <p className="text-muted-foreground text-[9px] tracking-wide uppercase">
              Training brief
            </p>
            <p className="text-foreground mt-1 text-[11px] font-normal">
              Winter operations refresher for regional drivers
            </p>
          </div>
          <button
            type="button"
            className={cn(
              "bg-primary text-primary-foreground mt-3 rounded-xs px-3 py-2 text-xs font-normal",
              step === 0 && "animate-figure-cursor-target"
            )}
          >
            Generate outline
          </button>
          {step === 0 ? <VignetteCursor className="top-[6.25rem] left-[6.75rem]" /> : null}
        </div>

        <div
          aria-hidden={step !== 1}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            step === 1 ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <span className="bg-accent-blue-soft text-accent-blue inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px]">
            <Loader2 className="h-3 w-3 animate-spin" />
            Researching the topic · folding in sources
          </span>
        </div>

        <div
          aria-hidden={step < 2 || step > 3}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            step >= 2 && step <= 3
              ? "animate-vignette-in opacity-100"
              : "pointer-events-none opacity-0"
          )}
        >
          <div className="space-y-1.5">
            {OUTLINE_MODULES.map((module) => (
              <div key={module.title} className="border-border bg-surface-2 rounded-xs border p-2">
                <p className="text-foreground truncate text-[10px] font-normal">{module.title}</p>
                <div className="mt-1 space-y-1">
                  {module.items.map((item) => {
                    const Icon = item.icon;
                    const enabled = !item.video || videoIncluded;
                    return (
                      <div
                        key={item.title}
                        className={cn(
                          "text-muted-foreground flex min-w-0 items-center gap-1 text-[8px] transition-opacity duration-300",
                          !enabled && "opacity-50"
                        )}
                      >
                        <Icon className="h-2.5 w-2.5 flex-shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{item.title}</span>
                        <MiniToggle on={enabled} cursorTarget={step === 2 && Boolean(item.video)} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={cn(
              "bg-primary text-primary-foreground mt-2 w-full rounded-xs px-3 py-2 text-[10px] font-normal",
              step === 3 && "animate-figure-cursor-target"
            )}
          >
            Approve & generate: 6 lessons · 3 quizzes · {videoIncluded ? "1 video" : "0 videos"}
          </button>
          {step === 2 ? (
            <VignetteCursor className="top-[7.25rem] right-2" fromX="3rem" fromY="2.5rem" />
          ) : null}
          {step === 3 ? (
            <VignetteCursor className="top-[16rem] left-[85%]" fromX="2rem" fromY="2rem" />
          ) : null}
        </div>

        <div
          aria-hidden={step !== 4}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            step === 4 ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="space-y-2">
            <div className="border-border bg-surface-2 flex items-center gap-2 rounded-xs border px-3 py-2">
              <CheckCircle2 className="text-success h-3.5 w-3.5" />
              <span className="text-foreground text-[11px]">Module 1</span>
            </div>
            <div className="border-border bg-surface-2 flex items-center gap-2 rounded-xs border px-3 py-2">
              <Loader2 className="text-accent-blue h-3.5 w-3.5 animate-spin" />
              <span className="text-foreground text-[11px]">Module 2</span>
            </div>
            <div className="border-border bg-surface-2 flex items-center gap-2 rounded-xs border px-3 py-2">
              <span className="border-border h-3.5 w-3.5 rounded-full border" />
              <span className="text-muted-foreground text-[11px]">Module 3</span>
            </div>
          </div>
          <p className="text-muted-foreground mt-3 text-[10px] leading-relaxed">
            Content appears in your course builder as it&apos;s generated
          </p>
        </div>

        <div
          aria-hidden={step !== 5}
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            step === 5 ? "animate-vignette-in opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <div className="border-success/30 bg-success/10 rounded-xs border p-4">
            <div className="flex items-center gap-3">
              <span className="bg-card text-success flex h-9 w-9 items-center justify-center rounded-xs">
                <FileCheck className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-foreground text-sm font-normal">Draft training ready</p>
                  <span className="bg-surface-3 text-muted-foreground rounded-full px-2 py-0.5 text-[9px] tracking-wide">
                    DRAFT
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-[10px]">
                  Review and publish in the course builder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
