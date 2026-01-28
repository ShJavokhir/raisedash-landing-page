import { memo, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

// All problem statements mixed together for variety
const ALL_PROBLEMS = [
  // DQF
  "Forgot to pull pre-employment MVR?",
  "Driver's medical card expired yesterday?",
  "Missing documents in your driver files?",
  "Driver's CDL expired and no one noticed?",
  "Driver file wouldn't survive an audit?",
  "Employment application missing required fields?",
  // Drug & Alcohol
  "Need to run a Clearinghouse query?",
  "Missed the annual limited query deadline?",
  "Random testing pool selections overdue?",
  "Post-accident test window closing in hours?",
  "Pre-employment drug test results lost in email?",
  "Not hitting your 50% drug / 10% alcohol testing rates?",
  // Employer Verification
  "Previous employer won't respond to your inquiry?",
  "30-day deadline for employment verification approaching?",
  "Can't prove 'good faith effort' to contact employers?",
  "Safety performance history investigation incomplete?",
  // Medical
  "Medical certificate expiring this month?",
  "Driver operating with an expired DOT physical?",
  "Forgot to check if examiner is on National Registry?",
  "CDLIS MVR doesn't match driver's medical card?",
  // MVR
  "Annual MVR pull date missed?",
  "Driver had violations you didn't know about?",
  "No documented review of the MVR you pulled?",
  "MVR shows suspension but driver is still driving?",
  // HOS
  "Unassigned drive time piling up?",
  "HOS violations hurting your CSA score?",
  "ELD data scattered across multiple providers?",
  "30-minute break violations mounting?",
  // Maintenance
  "Annual inspection due date missed?",
  "DVIR defects not certified before operation?",
  "Pre-trip inspection completion not tracked?",
  // CSA
  "Don't know which drivers are hurting your score?",
  "DataQs dispute deadline missed?",
  "Unsafe Driving BASIC over 65%?",
  // Audit
  "DOT audit notice arrived with 48-hour deadline?",
  "Can't find the documents auditors requested?",
  "No idea if you'd pass a mock audit?",
  "Safety rating downgraded to Conditional?",
  // Training
  "Onboarding training checklist incomplete?",

  // Accidents
  "Accident register not maintained?",
  "Post-accident drug test window expired?",
  "Crash rate trending above industry average?",
  "Root cause analysis not documented?",
  // General Chaos
  "Compliance spread across spreadsheets and emails?",
  "No single source of truth for driver status?",
  "Expiration dates tracked on sticky notes?",
  "Audit prep takes weeks instead of minutes?",
  "Can't answer 'are we compliant?' in one click?",
  "Small fleet, no dedicated safety department?",
  "New driver onboarding takes weeks instead of days?",
  "No idea if you're actually DOT-ready right now?",
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
      href="/compliance-challenges"
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
    <section className="py-6" aria-labelledby="compliance-challenges-heading">
      <Container>
        {/* SEO: Visible heading for search engines */}
        <h2
          id="compliance-challenges-heading"
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
