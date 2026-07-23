import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  FileText,
  ImageIcon,
  ListChecks,
  Loader2,
  Mic,
  MousePointer2,
  Play,
  Radio,
  Sparkles,
  Upload,
  Volume2,
} from "lucide-react";
import { useVignetteTimeline } from "@/hooks/useVignetteTimeline";

function TrainingGeneratorVisual() {
  const step = useVignetteTimeline([650, 850, 900, 5200]);
  const outlineItems = [
    { icon: FileText, label: "Mileage and route pay" },
    { icon: FileText, label: "Detention and layover" },
    { icon: ListChecks, label: "Read a sample settlement" },
  ];

  return (
    <div
      className="border-border bg-background relative h-56 overflow-hidden rounded-xs border p-4"
      aria-hidden="true"
    >
      <div className="border-border bg-card rounded-xs border p-2.5 shadow-sm">
        <div className="mb-1 flex items-center justify-between gap-3">
          <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
            Training brief
          </span>
          <span className="bg-accent-violet-soft text-accent-violet flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px]">
            <Sparkles className="h-3 w-3" /> On demand
          </span>
        </div>
        <p className="text-foreground text-[11px] leading-relaxed">
          Explain our mileage, detention, layover, and payday rules.
        </p>
      </div>

      <div className="border-border bg-card absolute right-4 bottom-4 left-8 rounded-xs border p-2.5 shadow-md">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-foreground flex min-w-0 items-center gap-1.5 text-xs">
            <Sparkles className="text-accent-violet h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Company driver pay</span>
          </span>
          <span
            className={`flex shrink-0 items-center gap-1 text-[10px] ${
              step === 3 ? "text-success" : "text-accent-violet"
            }`}
          >
            {step === 3 ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <Loader2 className="h-3 w-3 animate-spin" />
            )}
            {step === 3 ? "Ready to review" : "Generating"}
          </span>
        </div>
        <div className="space-y-1.5">
          {outlineItems.map(({ icon: ItemIcon, label }, index) => {
            const shown = step >= index + 1;
            return (
              <div
                key={label}
                className={`bg-surface-2 text-foreground flex items-center gap-2 rounded-xs px-2.5 py-1 text-[10px] transition-[opacity,transform] duration-300 ${
                  shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-35"
                }`}
              >
                <ItemIcon className="text-muted-foreground h-3 w-3 shrink-0" />
                <span className="truncate">{label}</span>
                {shown ? <Check className="text-success ml-auto h-3 w-3 shrink-0" /> : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VideoGeneratorVisual() {
  const step = useVignetteTimeline([650, 850, 1100, 5000]);
  const stages = [
    { icon: FileText, label: "Script" },
    { icon: Volume2, label: "Narration" },
    { icon: ImageIcon, label: "Visuals" },
  ];
  const progress = [0.12, 0.4, 0.74, 1][step];

  return (
    <div
      className="border-border bg-background relative h-56 overflow-hidden rounded-xs border p-4"
      aria-hidden="true"
    >
      <div className="border-border bg-card flex h-full flex-col overflow-hidden rounded-xs border shadow-sm">
        <div className="border-border border-b px-3 py-2.5">
          <div className="mb-1 flex items-center justify-between gap-3">
            <span className="text-muted-foreground text-[10px] tracking-wide uppercase">
              Video brief
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                step === 3 ? "bg-success/10 text-success" : "bg-accent-blue-soft text-accent-blue"
              }`}
            >
              {step === 3 ? "Video ready" : "AI production"}
            </span>
          </div>
          <p className="text-foreground text-xs">Our accident-reporting process in 90 seconds</p>
        </div>

        <div className="bg-surface-3 relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          <div className="absolute inset-3 grid grid-cols-[1.15fr_0.85fr] gap-2 opacity-75">
            <div className="bg-accent-blue-soft rounded-xs" />
            <div className="grid gap-2">
              <div className="bg-accent-amber-soft rounded-xs" />
              <div className="bg-accent-violet-soft rounded-xs" />
            </div>
          </div>
          {step === 3 ? (
            <span className="bg-primary text-primary-foreground animate-vignette-in relative flex h-10 w-10 items-center justify-center rounded-full shadow-md">
              <Play className="ml-0.5 h-4 w-4" fill="currentColor" />
            </span>
          ) : (
            <span className="bg-card/90 text-foreground relative flex h-9 w-9 items-center justify-center rounded-full shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin" />
            </span>
          )}
        </div>

        <div className="px-3 py-2">
          <div className="mb-2 flex items-center gap-1.5">
            {stages.map(({ icon: StageIcon, label }, index) => {
              const complete = step > index || step === 3;
              const active = step === index && step < 3;
              return (
                <span
                  key={label}
                  className={`flex items-center gap-1 rounded-xs px-2 py-1 text-[9px] transition-colors duration-200 ${
                    complete
                      ? "bg-success/10 text-success"
                      : active
                        ? "bg-accent-blue-soft text-accent-blue"
                        : "bg-surface-2 text-muted-foreground"
                  }`}
                >
                  {complete ? (
                    <Check className="h-2.5 w-2.5" />
                  ) : (
                    <StageIcon className="h-2.5 w-2.5" />
                  )}
                  {label}
                </span>
              );
            })}
          </div>
          <div className="bg-surface-3 h-1 overflow-hidden rounded-full">
            <div
              className="bg-accent-blue h-full origin-left rounded-full transition-transform duration-500"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RoleplayVisual() {
  const step = useVignetteTimeline([650, 1100, 1400, 4450]);
  const waveform = [10, 20, 14, 26, 18, 30, 12, 22, 16, 8];

  return (
    <div
      className="border-border bg-background relative h-56 overflow-hidden rounded-xs border p-4"
      aria-hidden="true"
    >
      <div className="border-border bg-card mx-auto flex h-full max-w-[18rem] flex-col rounded-[1.2rem] border p-3.5 shadow-md">
        <div className="flex items-center gap-2.5">
          <span className="bg-accent-blue-soft text-accent-blue flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
            <Mic className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-foreground text-xs">DOT Officer</p>
            <p className="text-muted-foreground text-[10px]">ELP roadside practice</p>
          </div>
          <span className="bg-success animate-pulse-soft ml-auto h-2 w-2 shrink-0 rounded-full" />
        </div>

        <div className="my-2.5 flex min-h-0 flex-1 flex-col justify-center gap-2">
          <div
            className={`bg-surface-2 text-foreground rounded-xs rounded-tl-none px-2.5 py-2 text-[11px] leading-snug transition-[opacity,transform] duration-300 ${
              step >= 1 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-30"
            }`}
          >
            “Where did you begin your trip, and where are you delivering?”
          </div>
          <div
            className={`bg-accent-blue-soft text-foreground ml-auto max-w-[90%] rounded-xs rounded-br-none px-2.5 py-2 text-[10px] leading-snug transition-[opacity,transform] duration-300 ${
              step >= 2 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            “I started in Fresno. I&apos;m delivering this load in Reno.”
          </div>
        </div>

        {step < 3 ? (
          <div
            className="text-accent-blue flex h-9 items-center justify-center gap-1"
            aria-hidden="true"
          >
            <Radio className="mr-1 h-3 w-3" />
            {waveform.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="bg-accent-blue animate-typing-dot w-0.5 rounded-full opacity-70"
                style={{ height: height / 2, animationDelay: `${index * 45}ms` }}
              />
            ))}
            <span className="ml-1 text-[9px]">Listening</span>
          </div>
        ) : (
          <div className="border-border bg-surface-2 animate-vignette-in rounded-xs border px-2.5 py-2">
            <div className="flex items-center justify-between text-[9px]">
              <span className="text-muted-foreground">ELP scorecard</span>
              <span className="text-success flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> 3/3 met
              </span>
            </div>
            <p className="text-foreground mt-1 text-[9px]">
              Understood inquiry · Clear English · Trip details
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const simulationUseCases = [
  {
    label: "ELD",
    source: "ELD walkthrough",
    screen: "Driver logs",
    detail: "Roadside inspection",
    action: "Transfer logs",
  },
  {
    label: "DVIR",
    source: "DVIR walkthrough",
    screen: "Vehicle inspection",
    detail: "Front tire damage",
    action: "Add defect",
  },
  {
    label: "Fuel",
    source: "Fuel app walkthrough",
    screen: "Fuel network",
    detail: "Approved locations",
    action: "Find fuel stop",
  },
  {
    label: "POD",
    source: "POD walkthrough",
    screen: "Delivery stop",
    detail: "Bill of lading",
    action: "Upload POD",
  },
];

function SimulationVisual() {
  const step = useVignetteTimeline([1150, 1150, 1150, 4150]);
  const useCase = simulationUseCases[step];

  return (
    <div
      className="border-border bg-background relative h-56 overflow-hidden rounded-xs border p-3"
      aria-hidden="true"
    >
      <div className="mb-3 grid grid-cols-4 gap-1">
        {simulationUseCases.map((item, index) => (
          <span
            key={item.label}
            className={`rounded-xs px-1 py-1.5 text-center text-[9px] transition-colors duration-200 ${
              step === index
                ? "bg-primary text-primary-foreground"
                : "bg-surface-2 text-muted-foreground"
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>

      <div className="grid h-[10.25rem] grid-cols-[minmax(0,0.9fr)_auto_minmax(0,1.1fr)] items-center gap-2.5">
        <div className="border-border bg-card min-w-0 rounded-xs border p-2.5 shadow-sm">
          <div className="bg-surface-3 relative mb-2 flex aspect-video items-center justify-center rounded-xs">
            <Play className="text-muted-foreground h-4 w-4" />
          </div>
          <p className="text-foreground truncate text-[10px]">{useCase.source}</p>
          <p className="text-muted-foreground mt-0.5 text-[8px]">Narrated screen recording</p>
        </div>

        <ArrowRight className="text-muted-foreground h-3.5 w-3.5" />

        <div
          key={useCase.label}
          className="border-border bg-card animate-vignette-in mx-auto w-full max-w-[9rem] min-w-0 rounded-[1rem] border p-1.5 shadow-md"
        >
          <div className="border-border bg-background rounded-[0.7rem] border p-2.5">
            <div className="mb-2 flex items-center justify-between gap-1 text-[8px]">
              <span className="text-foreground truncate">{useCase.screen}</span>
              <span className="text-success shrink-0">Try it</span>
            </div>
            <div className="bg-surface-3 mb-2 h-10 rounded-xs p-1.5">
              <div className="border-accent-blue h-full border-l-2 pl-1">
                <span className="text-muted-foreground block truncate text-[7px]">
                  Current task
                </span>
                <span className="text-foreground block truncate text-[8px]">{useCase.detail}</span>
              </div>
            </div>
            <div className="relative">
              <div className="border-accent-blue bg-accent-blue-soft text-accent-blue truncate rounded-xs border px-1.5 py-1.5 text-center text-[8px]">
                {useCase.action}
              </div>
              {useCase.label === "POD" ? (
                <Upload className="text-foreground absolute -right-1 -bottom-2 h-3.5 w-3.5 drop-shadow-sm" />
              ) : (
                <MousePointer2
                  className="text-foreground absolute -right-1 -bottom-2 h-3.5 w-3.5 drop-shadow-sm"
                  fill="currentColor"
                />
              )}
              <span className="animate-tap-ring border-accent-blue absolute -right-2 -bottom-3 h-5 w-5 rounded-full border" />
            </div>
            <p className="text-muted-foreground mt-2 text-center text-[8px]">Interactive step</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const tools = [
  {
    tabLabel: "AI training",
    eyebrow: "AI training",
    title: "Build training from a short brief.",
    body: "Create editable lessons, quizzes, and videos for your fleet.",
    visual: TrainingGeneratorVisual,
  },
  {
    tabLabel: "AI video",
    eyebrow: "AI video",
    title: "Create a training video.",
    body: "Raisedash writes the script, narration, and visuals for your review.",
    visual: VideoGeneratorVisual,
  },
  {
    tabLabel: "English",
    eyebrow: "Roadside English",
    title: "Practice before an inspection.",
    body: "Drivers talk with an AI DOT officer and get feedback.",
    visual: RoleplayVisual,
  },
  {
    tabLabel: "Simulations",
    eyebrow: "Software practice",
    title: "Practice the software before using it.",
    body: "Turn an ELD, DVIR, or other workflow into a tappable simulation.",
    visual: SimulationVisual,
  },
];

export function TrainingToolsCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeTool = tools[activeIndex];
  const Visual = activeTool.visual;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tools.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, [paused]);

  return (
    <article
      className="border-border bg-card hover:border-foreground/20 flex flex-col rounded-xs border p-6 transition-colors duration-200 sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="border-border bg-background mb-4 grid grid-cols-4 gap-1 rounded-xs border p-1"
        aria-label="AI training and practice tools"
      >
        {tools.map((tool, index) => (
          <button
            key={tool.eyebrow}
            type="button"
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
            className={`rounded-xs px-1 py-2.5 text-[11px] transition-[background-color,color,transform] duration-150 active:scale-[0.97] motion-reduce:active:scale-100 sm:px-1.5 sm:py-2 sm:text-xs ${
              activeIndex === index
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
            }`}
          >
            {tool.tabLabel}
          </button>
        ))}
      </div>

      <div key={activeTool.eyebrow} className="animate-vignette-in mb-9">
        <Visual />
      </div>

      <div className="min-h-[9.5rem] sm:min-h-[8.5rem]">
        <p className="text-muted-foreground mb-2 text-xs font-normal tracking-wide uppercase">
          {activeTool.eyebrow}
        </p>
        <h3 className="text-foreground mb-3 text-xl font-normal tracking-[-0.01em]">
          {activeTool.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{activeTool.body}</p>
      </div>

      <Link
        href="/demo"
        className="bg-primary text-primary-foreground border-primary group mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm transition-[background-color,border-color,transform] duration-150 hover:border-[#3b3a33] hover:bg-[#3b3a33] active:scale-[0.97] motion-reduce:active:scale-100"
      >
        See it in action
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
      </Link>

      <ul className="sr-only">
        {tools.map((tool) => (
          <li key={tool.eyebrow}>
            {tool.eyebrow}: {tool.title} {tool.body}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default TrainingToolsCard;
