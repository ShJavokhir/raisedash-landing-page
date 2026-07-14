import { memo, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

// Driver-readiness pains, mixed for variety. These are the day-to-day frustrations
// a safety director, owner, and driver each feel before Raisedash.
const ALL_PROBLEMS = [
  // Orientation day
  "Half the class shows up having done nothing?",
  "Burning a paid classroom day on the handbook?",
  "Scheduled drivers who never show up?",
  "Paid for a hotel room for a no-show?",
  "Orientation runs long because nobody prepped?",
  "Re-teaching the same policies every single week?",
  // Records & proof
  "Training records scattered across folders and inboxes?",
  "Signed acknowledgments buried in a desk drawer?",
  "Can't prove what a driver was trained on two years ago?",
  "Quiz scores and certificates lost in email?",
  "A week-long scramble when a lawyer asks for records?",
  "Auditor wants the file and you can't assemble it?",
  "Insurance renewal and no documented safety process?",
  "Road-test forms sitting in a paper folder somewhere?",
  "No single place that shows who's actually ready?",
  // Driver experience
  "Drivers who hate portals and passwords?",
  "New hires who don't even use email?",
  "Desktop training software your drivers won't touch?",
  "Spanish-speaking drivers stuck with English-only lessons?",
  "Making a driver reset a password before day one?",
  // After an incident
  "A crash and no record of the driver's training?",
  "A citation with no follow-up training assigned?",
  "Failed road test and nothing documented afterward?",
  "Roadside inspection issue that never got addressed?",
  "No paper trail for corrective action?",
  // First 90 days
  "New driver's first 90 days left to chance?",
  "No day-30 or day-60 check-in that actually happens?",
  "Refresher training that everyone forgets to send?",
  // Admin reality
  "One person doing safety, HR, and half of recruiting?",
  "Onboarding that takes weeks instead of days?",
  "Software that needs a support call to add a driver?",
  "Expiration dates tracked on sticky notes?",
  "Six-week implementation before you can even start?",
];

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Split array into rows
function splitIntoRows(items: string[]): [string[], string[], string[]] {
  const row1 = items.filter((_, i) => i % 3 === 0);
  const row2 = items.filter((_, i) => i % 3 === 1);
  const row3 = items.filter((_, i) => i % 3 === 2);
  return [row1, row2, row3];
}

// Default rows for SSR
const defaultRows = splitIntoRows(ALL_PROBLEMS);

interface ProblemBadgeProps {
  text: string;
}

const ProblemBadge = memo(function ProblemBadge({ text }: ProblemBadgeProps) {
  return (
    <Link
      href="/demo"
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
            <ProblemBadge key={`b-${i}`} text={item} />
          ))}
        </div>
      </div>
    </div>
  );
});

export function ProblemsMarquee() {
  const [rows, setRows] = useState(defaultRows);

  useEffect(() => {
    // Shuffle on mount for randomized order each page load
    setRows(splitIntoRows(shuffle(ALL_PROBLEMS)));
  }, []);

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
            <MarqueeRow items={rows[0]} direction="left" speed={280} />
            <MarqueeRow items={rows[1]} direction="right" speed={240} />
            <MarqueeRow items={rows[2]} direction="left" speed={260} />
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
