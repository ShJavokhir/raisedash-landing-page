import { useState } from "react";
import { Shot } from "./Shot";

/**
 * The three weekly boards, as the PNGs the service actually renders and pins in
 * the group. These are real exports from a live fleet — every driver name and
 * the carrier name are destroyed in the file itself, not hidden with CSS.
 */

const BOARDS = [
  {
    key: "safety",
    tab: "Weekly safety report",
    src: "/images/samsara/board-weekly-safety.webp",
    width: 1200,
    height: 1188,
    alt: "Weekly safety report: total events for the week with the change against last week, a bar per event type, and a column per day.",
    note: "Every event type for the week, and whether each one is better or worse than last week.",
  },
  {
    key: "driver",
    tab: "Driver safety board",
    src: "/images/samsara/board-driver-safety.webp",
    width: 1200,
    height: 1204,
    alt: "Driver safety board: safest and riskiest drivers ranked by events per thousand miles, with driver names redacted.",
    note: "Safest and riskiest drivers, ranked by events per 1,000 miles, not by raw counts.",
  },
  {
    key: "fuel",
    tab: "Fuel efficiency board",
    src: "/images/samsara/board-fuel-efficiency.webp",
    width: 1200,
    height: 1226,
    alt: "Fuel efficiency board: fleet miles per gallon, estimated fuel spend, and the most and least efficient drivers with idle share, driver names redacted.",
    note: "MPG and idle share per driver, plus what the below-average half is costing you.",
  },
] as const;

export function BoardTabs() {
  const [active, setActive] = useState(0);
  const board = BOARDS[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Weekly boards"
        className="mb-5 flex flex-wrap justify-center gap-2"
      >
        {BOARDS.map((b, i) => (
          <button
            key={b.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`board-${b.key}`}
            onClick={() => setActive(i)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors duration-[0.15s] ${
              i === active
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
            }`}
          >
            {b.tab}
          </button>
        ))}
      </div>

      <div id={`board-${board.key}`} role="tabpanel" className="mx-auto max-w-[900px]">
        <Shot
          src={board.src}
          alt={board.alt}
          width={board.width}
          height={board.height}
          sizes="(max-width: 900px) 100vw, 900px"
        />
        <p className="text-muted-foreground mt-4 text-center text-sm leading-relaxed">
          {board.note}
        </p>
      </div>
    </div>
  );
}
