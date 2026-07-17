import { memo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

// Driver-readiness pains, mixed for variety. These are the day-to-day frustrations
// a safety director, owner, and driver each feel before Raisedash.
const ALL_PROBLEMS = [
  "Orientation starts from zero every Monday?",
  "Repeating the same material for every class?",
  "Paid orientation time spent on paperwork?",
  "Travel booked before prerequisites are finished?",
  "A driver no-shows after plans are already made?",
  "No clear view of who is prepared?",
  "Training records spread across paper, email, and spreadsheets?",
  "Hard to answer what a driver completed and when?",
  "Follow-up stops when orientation ends?",
  "The first 90 days managed from memory?",
  "A safety issue handled but the response never documented?",
  "Each terminal runs orientation differently?",
  "Drivers struggling with office-first software?",
  "One person doing safety, HR, and half of recruiting?",
  "Pulling a driver record together takes too long?",
];

// Split array into rows
function splitIntoRows(items: string[]): [string[], string[], string[]] {
  const row1 = items.filter((_, i) => i % 3 === 0);
  const row2 = items.filter((_, i) => i % 3 === 1);
  const row3 = items.filter((_, i) => i % 3 === 2);
  return [row1, row2, row3];
}

// Deterministic rows — the same order on the server and the client, so the
// marquee never visibly re-shuffles its content right after hydration.
const PROBLEM_ROWS = splitIntoRows(ALL_PROBLEMS);

interface ProblemBadgeProps {
  text: string;
  // The duplicated (aria-hidden) loop set passes -1 to keep its links out of
  // the tab order — visible badges stay focusable, the clones don't.
  tabIndex?: number;
}

const ProblemBadge = memo(function ProblemBadge({ text, tabIndex }: ProblemBadgeProps) {
  return (
    <Link
      href="/demo"
      tabIndex={tabIndex}
      className="bg-card text-muted-foreground border-border hover:border-foreground/30 hover:text-foreground group inline-flex shrink-0 items-center gap-1 rounded-xs border px-3 py-1.5 text-lg whitespace-nowrap transition-colors duration-150"
    >
      {text}
      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
    </Link>
  );
});

interface MarqueeRowProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
}

const MarqueeRow = memo(function MarqueeRow({
  items,
  direction = "left",
  speed = 120,
}: MarqueeRowProps) {
  const animationStyle = {
    "--marquee-speed": `${speed}s`,
  } as React.CSSProperties;

  return (
    <div className="marquee-container flex w-full overflow-hidden py-1" role="presentation">
      <div
        className={`flex gap-3 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={animationStyle}
      >
        {/* First set of items - visible to crawlers */}
        {items.map((item, i) => (
          <ProblemBadge key={`a-${i}`} text={item} />
        ))}
        {/* Duplicate for seamless loop - hidden from crawlers and screen readers */}
        <div aria-hidden="true" className="flex gap-3">
          {items.map((item, i) => (
            <ProblemBadge key={`b-${i}`} text={item} tabIndex={-1} />
          ))}
        </div>
      </div>
    </div>
  );
});

export function ProblemsMarquee() {
  return (
    <section className="py-6" aria-labelledby="readiness-pains-heading">
      <Container>
        {/* SEO: Visible heading for search engines */}
        <h2
          id="readiness-pains-heading"
          className="text-muted-foreground mb-4 text-center text-lg font-normal"
        >
          Sound familiar?
        </h2>

        <div className="relative overflow-hidden rounded-xs">
          {/* Fade overlays */}
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent sm:w-24" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent sm:w-24" />

          {/* Marquee rows */}
          <div className="flex flex-col gap-2">
            <MarqueeRow items={PROBLEM_ROWS[0]} direction="left" speed={280} />
            <MarqueeRow items={PROBLEM_ROWS[1]} direction="right" speed={240} />
            <MarqueeRow items={PROBLEM_ROWS[2]} direction="left" speed={260} />
          </div>
        </div>

        {/* SEO: Hidden semantic list for crawlers */}
        <ul className="sr-only">
          {ALL_PROBLEMS.map((problem, i) => (
            <li key={i}>{problem}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
