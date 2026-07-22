import { useRef } from "react";
import {
  Award,
  CalendarClock,
  ClipboardCheck,
  FileCheck2,
  FileText,
  MousePointer2,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";
import { useVignetteTimeline } from "@/hooks/useVignetteTimeline";

/**
 * The "demo weapon" section — chaos → one click → packet. Scattered training
 * records drift across the stage; an animated cursor presses "Generate
 * packet"; every fragment flies into a single stacked document that gets
 * stamped complete. The visual argument: reconstructing a driver's record
 * takes fleets days — here it's one click.
 *
 * Starts when scrolled into view, then loops (~10s). Reduced motion rests on
 * the assembled-packet frame. Tokens only; generic placeholder data.
 *
 * Beats: 0 scattered → 1 cursor moves in → 2 click → 3 records fly together →
 * 4 packet + stamp → 5 hold → repeat.
 */

const STEP_DURATIONS = [2000, 900, 500, 1200, 1600, 2600];

interface Fragment {
  icon: typeof FileText;
  label: string;
  sub: string;
  tint: string;
  /**
   * Scattered resting position as Tailwind left/top classes. The three
   * fragments phones keep carry mobile-safe base positions plus md:
   * overrides — desktop coordinates put them off-canvas or on top of each
   * other on a 330px-wide stage.
   */
  pos: string;
  rotate: number;
  /** Hidden on small screens to keep the mobile stage uncluttered. */
  desktopOnly?: boolean;
}

const FRAGMENTS: Fragment[] = [
  {
    icon: FileText,
    label: "Winter driving",
    sub: "Lesson viewed · 11 min",
    tint: "text-accent-blue bg-accent-blue-soft",
    pos: "left-[6%] top-[12%]",
    rotate: -5,
    desktopOnly: true,
  },
  {
    icon: ClipboardCheck,
    label: "HOS & ELD quiz · 92%",
    sub: "Attempt 1 of 1",
    tint: "text-accent-amber bg-accent-amber-soft",
    pos: "left-[5%] top-[42%] md:left-[26%] md:top-[46%]",
    rotate: 3,
  },
  {
    icon: FileCheck2,
    label: "Reading completed",
    sub: "Accident procedures",
    tint: "text-accent-violet bg-accent-violet-soft",
    pos: "left-[64%] top-[10%]",
    rotate: 4,
    desktopOnly: true,
  },
  {
    icon: CalendarClock,
    label: "Mar 14 · 8:02 AM",
    sub: "Completion timestamp",
    tint: "text-muted-foreground bg-surface-3",
    pos: "left-[82%] top-[40%]",
    rotate: -3,
    desktopOnly: true,
  },
  {
    icon: Award,
    label: "Certificate issued",
    sub: "Orientation · 2024",
    tint: "text-success bg-success/10",
    pos: "left-[7%] top-[78%] md:left-[8%] md:top-[72%]",
    rotate: 6,
  },
  {
    icon: ClipboardCheck,
    label: "Pre-trip quiz · Passed",
    sub: "Attempt 1 of 2",
    tint: "text-accent-blue bg-accent-blue-soft",
    pos: "left-[34%] top-[60%] md:left-[58%] md:top-[64%]",
    rotate: -4,
  },
];

export function EvidenceMoment() {
  const stageRef = useRef<HTMLDivElement>(null);
  const step = useVignetteTimeline(STEP_DURATIONS, { startInView: stageRef });

  const gathered = step >= 3;
  const packetVisible = step >= 4;

  return (
    <Container className="pb-12 md:px-0">
      <div className="border-border bg-card rounded-xs border p-6 sm:p-12">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-muted-foreground mb-3 text-sm font-normal tracking-wide uppercase">
            Training evidence
          </p>
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            When someone asks, the record is already there.
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            Raisedash keeps each driver&apos;s training history organized as the work happens, so
            your team can review it without searching paper folders, inboxes, and spreadsheets.
          </p>
        </div>

        {/* The stage */}
        <div
          ref={stageRef}
          aria-hidden="true"
          className="border-border bg-background relative h-[21rem] w-full overflow-hidden rounded-xs border select-none"
        >
          {/* Scattered records */}
          {FRAGMENTS.map((fragment, i) => {
            const Icon = fragment.icon;
            return (
              <div
                key={fragment.label}
                className={cn(
                  "border-border bg-card absolute flex w-max items-center gap-2 rounded-xs border px-3 py-2 shadow-sm",
                  fragment.pos,
                  fragment.desktopOnly && "hidden md:flex"
                )}
                style={{
                  transform: gathered
                    ? "translate(0, 0) rotate(0deg) scale(0.5)"
                    : `rotate(${fragment.rotate}deg)`,
                  // Once gathered, fragments converge on the packet's spot.
                  ...(gathered
                    ? {
                        left: "50%",
                        top: "52%",
                        marginLeft: "-3rem",
                        opacity: 0,
                      }
                    : {}),
                  transition: `left 0.7s var(--ease-in-out-strong) ${i * 70}ms, top 0.7s var(--ease-in-out-strong) ${i * 70}ms, transform 0.7s var(--ease-in-out-strong) ${i * 70}ms, opacity 0.35s ease ${350 + i * 70}ms`,
                }}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    fragment.tint
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="text-foreground block text-xs leading-tight">
                    {fragment.label}
                  </span>
                  <span className="text-muted-foreground block text-[10px] leading-tight">
                    {fragment.sub}
                  </span>
                </span>
              </div>
            );
          })}

          {/* Generate button — the "one click". w-max: an absolutely
              positioned box at left-1/2 otherwise caps its width at the
              stage's right edge and wraps the label on phones. */}
          <div className="absolute top-[18%] left-1/2 w-max -translate-x-1/2">
            <span
              className={cn(
                "bg-primary text-primary-foreground relative inline-flex items-center gap-2 rounded-xs px-4 py-2 text-sm whitespace-nowrap transition-transform duration-150",
                step === 2 && "scale-[0.96]"
              )}
            >
              <ShieldCheck className="h-4 w-4" />
              Download report
              {step === 2 ? (
                <span className="animate-tap-ring border-foreground/40 absolute inset-0 rounded-xs border-2" />
              ) : null}
            </span>
          </div>

          {/* Cursor */}
          <div
            className="text-foreground absolute z-20"
            style={{
              left: "50%",
              top: "18%",
              transform: step >= 1 ? "translate(2.2rem, 2.2rem)" : "translate(15rem, 10rem)",
              opacity: step >= 4 ? 0 : 1,
              transition: "transform 0.85s var(--ease-in-out-strong), opacity 0.3s ease 0.2s",
            }}
          >
            <MousePointer2 className="h-5 w-5 drop-shadow-sm" fill="currentColor" />
          </div>

          {/* The packet */}
          <div
            className={cn(
              "absolute top-[42%] left-1/2 w-56 -translate-x-1/2 transition-all duration-500",
              packetVisible ? "opacity-100" : "translate-y-3 opacity-0"
            )}
            style={{ transitionTimingFunction: "var(--ease-out-strong)" }}
          >
            {/* Stacked pages behind */}
            <div className="border-border bg-card absolute -top-1.5 left-1.5 h-full w-full rounded-xs border" />
            <div className="border-border bg-card absolute -top-[3px] left-[3px] h-full w-full rounded-xs border" />
            <div className="border-border bg-card relative rounded-xs border p-4 shadow-lg">
              <p className="text-muted-foreground text-[10px] tracking-wide uppercase">
                Training report
              </p>
              <p className="text-foreground mt-0.5 text-sm">J. Carter — training record</p>
              <div className="mt-2.5 space-y-1">
                <div className="bg-surface-3 h-1 w-full rounded-full" />
                <div className="bg-surface-3 h-1 w-4/5 rounded-full" />
                <div className="bg-surface-3 h-1 w-full rounded-full" />
                <div className="bg-surface-3 h-1 w-3/5 rounded-full" />
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <span className="bg-surface-3 text-muted-foreground rounded-xs px-1.5 py-0.5 text-[10px]">
                  PDF
                </span>
                <span className="text-muted-foreground text-[10px]">· Training activity</span>
              </div>
              {/* Stamp */}
              {packetVisible ? (
                <span className="animate-stamp-in border-success text-success absolute -top-3 -right-3 rounded-xs border-2 bg-transparent px-2 py-0.5 text-[10px] font-medium tracking-wider uppercase [animation-delay:450ms]">
                  Complete
                </span>
              ) : null}
            </div>
          </div>

          {/* Scene caption */}
          <p className="text-muted-foreground absolute top-4 left-4 text-xs">
            {gathered ? "Report ready." : "Training details in one driver record."}
          </p>
        </div>
      </div>
    </Container>
  );
}

export default EvidenceMoment;
