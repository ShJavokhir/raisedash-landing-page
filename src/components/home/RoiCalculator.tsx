import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import {
  BedDouble,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Link2,
  Presentation,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { EmailCapture } from "@/components/ui/EmailCapture";
import { cn } from "@/lib/cn";

/**
 * Orientation cost calculator — the visitor drags sliders that describe their
 * fleet and sees, live, what pre-arrival readiness could save in dollars and
 * hours per year.
 *
 * Ground rules that shape this section:
 * - Raisedash pricing is public, but this calculator deliberately measures the
 *   avoidable cost of unready orientation instead of presenting a manufactured
 *   ROI multiple. Visitors can compare the result with /pricing themselves.
 * - No invented benchmarks. Every savings lever is an assumption the visitor
 *   can see and adjust, and the output is labeled as an estimate.
 *
 * Estimates are shareable: "Copy link" encodes every slider into a URL hash
 * (`/#calc=1-6-2-…`) so a safety director can send their exact numbers to an
 * owner. The hash never reaches the server or the sitemap — opening it applies
 * the values, scrolls here, and shows a dismissible "shared estimate" notice.
 */

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const HOURS_PER_ORIENTATION_DAY = 8;

const DEFAULTS = {
  // Fleet inputs — what the visitor knows about their own operation.
  hiresPerMonth: 6,
  orientationDays: 2,
  dayPay: 200,
  hotelShare: 30,
  hotelCost: 300,
  noShowRate: 10,
  adminHours: 3,
  // Savings levers — deliberately conservative, all user-adjustable.
  classroomShift: 25,
  noShowAvoided: 75,
  adminReduction: 40,
  adminRate: 28,
};

type CalcValues = typeof DEFAULTS;
type CalcField = keyof CalcValues;

const LIMITS: Record<CalcField, { min: number; max: number; step: number }> = {
  hiresPerMonth: { min: 1, max: 30, step: 1 },
  orientationDays: { min: 0.5, max: 4, step: 0.5 },
  dayPay: { min: 100, max: 400, step: 10 },
  hotelShare: { min: 0, max: 100, step: 5 },
  hotelCost: { min: 0, max: 600, step: 25 },
  noShowRate: { min: 0, max: 40, step: 1 },
  adminHours: { min: 0.5, max: 10, step: 0.5 },
  classroomShift: { min: 0, max: 50, step: 5 },
  noShowAvoided: { min: 0, max: 100, step: 5 },
  adminReduction: { min: 0, max: 60, step: 5 },
  adminRate: { min: 15, max: 60, step: 1 },
};

/** Field order inside a share hash. Append-only — reorderings break old links. */
const SHARE_FIELDS: CalcField[] = [
  "hiresPerMonth",
  "orientationDays",
  "dayPay",
  "hotelShare",
  "hotelCost",
  "noShowRate",
  "adminHours",
  "classroomShift",
  "noShowAvoided",
  "adminReduction",
  "adminRate",
];

const SHARE_VERSION = "1";
const SHARE_PREFIX = "#calc=";
const SECTION_ID = "orientation-cost-calculator";

function encodeShareHash(values: CalcValues): string {
  return `${SHARE_PREFIX}${SHARE_VERSION}-${SHARE_FIELDS.map((f) => values[f]).join("-")}`;
}

/** Returns null unless the hash is a complete, well-formed v1 share link. */
function decodeShareHash(hash: string): CalcValues | null {
  if (!hash.startsWith(SHARE_PREFIX)) return null;
  const parts = hash.slice(SHARE_PREFIX.length).split("-");
  if (parts[0] !== SHARE_VERSION || parts.length !== SHARE_FIELDS.length + 1) return null;

  const values = { ...DEFAULTS };
  for (let i = 0; i < SHARE_FIELDS.length; i++) {
    const field = SHARE_FIELDS[i];
    const raw = Number(parts[i + 1]);
    if (!Number.isFinite(raw)) return null;
    const { min, max, step } = LIMITS[field];
    const snapped = Math.round((raw - min) / step) * step + min;
    values[field] = Math.min(max, Math.max(min, Number(snapped.toFixed(2))));
  }
  return values;
}

/**
 * Tweens toward `target`, retargeting from the currently displayed value when
 * the target changes mid-flight — so dragging a slider makes the number chase
 * smoothly instead of restarting from zero. Reduced motion snaps instantly.
 */
function useAnimatedNumber(target: number): number {
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = displayRef.current;
    if (from === target) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const duration = reduced ? 0 : 500;
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = from + (target - from) * eased;
      displayRef.current = value;
      setDisplay(value);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target]);

  return display;
}

interface SliderRowProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
  onChange: (value: number) => void;
  compact?: boolean;
  tone?: "default" | "success";
}

function SliderRow({
  id,
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
  compact,
  tone = "default",
}: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={compact ? "py-2" : "py-3"}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className={cn("text-foreground/90", compact ? "text-xs" : "text-sm")}>
          {label}
        </label>
        <span
          className={cn(
            "text-foreground shrink-0 font-normal tabular-nums",
            compact ? "text-xs" : "text-sm"
          )}
        >
          {format(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range"
        style={
          {
            "--range-fill": `linear-gradient(to right, var(--${tone === "success" ? "success" : "foreground"}) ${pct}%, var(--surface-3) ${pct}%)`,
          } as CSSProperties
        }
      />
    </div>
  );
}

interface BreakdownRowProps {
  icon: typeof Presentation;
  label: string;
  caption: string;
  amount: number;
  share: number; // 0..1 of the largest category
  barClass: string;
  revealed: boolean;
}

function BreakdownRow({
  icon: Icon,
  label,
  caption,
  amount,
  share,
  barClass,
  revealed,
}: BreakdownRowProps) {
  const animated = useAnimatedNumber(revealed ? amount : 0);
  const width = revealed && amount > 0 ? Math.max(share * 100, 3) : 0;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-foreground/90 flex items-center gap-2 text-sm">
          <Icon className="text-muted-foreground h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {label}
        </span>
        <span className="text-foreground text-sm tabular-nums">
          {currency.format(Math.round(animated))}
        </span>
      </div>
      <div className="bg-surface-3 mt-2 h-1 overflow-hidden rounded-full">
        <div
          className={cn("h-full rounded-full", barClass)}
          style={{
            width: `${width}%`,
            transition: "width 0.7s var(--ease-out-strong)",
          }}
        />
      </div>
      <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{caption}</p>
    </div>
  );
}

export function RoiCalculator() {
  const [values, setValues] = useState<CalcValues>(DEFAULTS);
  const [assumptionsOpen, setAssumptionsOpen] = useState(false);
  const [sharedNotice, setSharedNotice] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setField = (field: CalcField) => (value: number) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // First drag makes the estimate theirs — retire the "shared" notice.
    setSharedNotice(false);
  };

  // Apply a shared estimate from the URL hash: set the sliders, scroll here,
  // and show the notice. Runs once; deferred to a timeout so state updates
  // happen outside the effect body (and after hydration settles).
  useEffect(() => {
    const shared = decodeShareHash(window.location.hash);
    if (!shared) return;
    const timer = setTimeout(() => {
      setValues(shared);
      if (
        shared.classroomShift !== DEFAULTS.classroomShift ||
        shared.noShowAvoided !== DEFAULTS.noShowAvoided ||
        shared.adminReduction !== DEFAULTS.adminReduction ||
        shared.adminRate !== DEFAULTS.adminRate
      ) {
        setAssumptionsOpen(true);
      }
      setSharedNotice(true);
      document.getElementById(SECTION_ID)?.scrollIntoView();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/${encodeShareHash(values)}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API unavailable (old browser, unfocused document) — fall
      // back to a temporary input + execCommand.
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    if (copyTimerRef.current !== null) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const results = useMemo(() => {
    const {
      hiresPerMonth,
      orientationDays,
      dayPay,
      hotelShare,
      hotelCost,
      noShowRate,
      adminHours,
      classroomShift,
      noShowAvoided,
      adminReduction,
      adminRate,
    } = values;
    const hiresPerYear = hiresPerMonth * 12;

    const classroomDollars = hiresPerYear * orientationDays * dayPay * (classroomShift / 100);
    const classroomHours =
      hiresPerYear * orientationDays * HOURS_PER_ORIENTATION_DAY * (classroomShift / 100);

    const noShowHotelWaste = hiresPerYear * (noShowRate / 100) * (hotelShare / 100) * hotelCost;
    const hotelDollars = noShowHotelWaste * (noShowAvoided / 100);

    const adminDollars = hiresPerYear * adminHours * adminRate * (adminReduction / 100);
    const adminHoursSaved = hiresPerYear * adminHours * (adminReduction / 100);

    return {
      hiresPerYear,
      classroomDollars,
      hotelDollars,
      adminDollars,
      total: classroomDollars + hotelDollars + adminDollars,
      hoursSaved: classroomHours + adminHoursSaved,
    };
  }, [values]);

  const animatedTotal = useAnimatedNumber(results.total);
  const animatedHours = useAnimatedNumber(results.hoursSaved);
  const largestCategory = Math.max(
    results.classroomDollars,
    results.hotelDollars,
    results.adminDollars,
    1
  );
  const perHire = results.hiresPerYear > 0 ? results.total / results.hiresPerYear : 0;
  const workingDays = Math.round(results.hoursSaved / HOURS_PER_ORIENTATION_DAY);

  return (
    <section id={SECTION_ID} className="scroll-mt-24">
      <Container className="pb-12 md:px-0">
        <div className="border-border bg-card rounded-xs border p-8 sm:p-12">
          <div className="mb-10 max-w-2xl">
            <p className="text-success mb-3 text-sm font-medium tracking-wide uppercase">
              Orientation cost calculator
            </p>
            <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
              Put a number on day-one readiness.
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Estimate what your fleet spends on orientation work that could happen before drivers
              arrive — paid classroom time, hotel nights booked for no-shows, and admin chasing. Use
              your own numbers and change every assumption. The calculator shows its work.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]">
            {/* Inputs */}
            <div>
              <p className="text-muted-foreground mb-1 text-xs font-normal tracking-wide uppercase">
                Your hiring
              </p>
              <div className="divide-border-subtle divide-y">
                <SliderRow
                  id="roi-hires"
                  label="New drivers per month"
                  value={values.hiresPerMonth}
                  {...LIMITS.hiresPerMonth}
                  format={(v) => `${v}`}
                  onChange={setField("hiresPerMonth")}
                />
                <SliderRow
                  id="roi-days"
                  label="Paid orientation days per hire"
                  value={values.orientationDays}
                  {...LIMITS.orientationDays}
                  format={(v) => (v === 1 ? "1 day" : `${v} days`)}
                  onChange={setField("orientationDays")}
                />
                <SliderRow
                  id="roi-pay"
                  label="Driver pay per orientation day"
                  value={values.dayPay}
                  {...LIMITS.dayPay}
                  format={(v) => currency.format(v)}
                  onChange={setField("dayPay")}
                />
              </div>

              <p className="text-muted-foreground mt-8 mb-1 text-xs font-normal tracking-wide uppercase">
                The overhead
              </p>
              <div className="divide-border-subtle divide-y">
                <SliderRow
                  id="roi-hotel-share"
                  label="Hires that need a hotel"
                  value={values.hotelShare}
                  {...LIMITS.hotelShare}
                  format={(v) => `${v}%`}
                  onChange={setField("hotelShare")}
                />
                <SliderRow
                  id="roi-hotel-cost"
                  label="Hotel + travel for those hires"
                  value={values.hotelCost}
                  {...LIMITS.hotelCost}
                  format={(v) => currency.format(v)}
                  onChange={setField("hotelCost")}
                />
                <SliderRow
                  id="roi-noshow"
                  label="Orientation no-show rate"
                  value={values.noShowRate}
                  {...LIMITS.noShowRate}
                  format={(v) => `${v}%`}
                  onChange={setField("noShowRate")}
                />
                <SliderRow
                  id="roi-admin"
                  label="Admin time per new hire"
                  value={values.adminHours}
                  {...LIMITS.adminHours}
                  format={(v) => (v === 1 ? "1 hour" : `${v} hours`)}
                  onChange={setField("adminHours")}
                />
              </div>

              {/* Savings assumptions — visible, honest, adjustable */}
              <div className="border-success/20 bg-success/10 mt-8 rounded-xs border">
                <button
                  type="button"
                  onClick={() => setAssumptionsOpen((open) => !open)}
                  aria-expanded={assumptionsOpen}
                  aria-controls="roi-assumptions"
                  className="hover:bg-success/10 flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-[background-color,transform] duration-150 ease-out active:scale-[0.99] motion-reduce:active:scale-100"
                >
                  <span className="text-foreground flex items-center gap-2 text-sm">
                    <SlidersHorizontal className="text-success h-3.5 w-3.5" aria-hidden="true" />
                    Savings assumptions
                  </span>
                  <span className="text-muted-foreground flex items-center gap-2 text-xs">
                    {values.classroomShift}% classroom · {values.adminReduction}% admin
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 ease-out",
                        assumptionsOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </span>
                </button>
                <div
                  id="roi-assumptions"
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200",
                    assumptionsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                  style={{ transitionTimingFunction: "var(--ease-out-strong)" }}
                >
                  <div className="overflow-hidden">
                    <div className="border-border-subtle border-t px-4 pt-2 pb-3">
                      <p className="text-muted-foreground pt-2 text-xs leading-relaxed">
                        Conservative starting points. Set them to whatever you believe.
                      </p>
                      <SliderRow
                        compact
                        tone="success"
                        id="roi-classroom-shift"
                        label="Classroom time moved to pre-arrival"
                        value={values.classroomShift}
                        {...LIMITS.classroomShift}
                        format={(v) => `${v}%`}
                        onChange={setField("classroomShift")}
                      />
                      <SliderRow
                        compact
                        tone="success"
                        id="roi-noshow-avoided"
                        label="No-show hotel spend avoided"
                        value={values.noShowAvoided}
                        {...LIMITS.noShowAvoided}
                        format={(v) => `${v}%`}
                        onChange={setField("noShowAvoided")}
                      />
                      <SliderRow
                        compact
                        tone="success"
                        id="roi-admin-reduction"
                        label="Admin time saved"
                        value={values.adminReduction}
                        {...LIMITS.adminReduction}
                        format={(v) => `${v}%`}
                        onChange={setField("adminReduction")}
                      />
                      <SliderRow
                        compact
                        tone="success"
                        id="roi-admin-rate"
                        label="Admin hourly cost"
                        value={values.adminRate}
                        {...LIMITS.adminRate}
                        format={(v) => `${currency.format(v)}/hr`}
                        onChange={setField("adminRate")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="border-success/25 bg-success/10 rounded-xs border p-6 sm:p-8">
              {sharedNotice && (
                <div className="bg-surface-2 border-border mb-5 flex items-start gap-2.5 rounded-xs border px-3 py-2.5">
                  <Link2
                    className="text-muted-foreground mt-0.5 h-3.5 w-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Someone shared this estimate with you — the sliders are set to their numbers.
                    Drag anything to make it yours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSharedNotice(false)}
                    aria-label="Dismiss shared estimate notice"
                    className="text-muted-foreground hover:text-foreground -m-1 ml-auto shrink-0 p-1 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}

              <p className="text-success flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
                <CircleDollarSign className="h-3.5 w-3.5" aria-hidden="true" />
                Estimated annual savings
              </p>
              <p className="text-success mt-2 text-5xl font-normal tracking-[-0.03em] tabular-nums">
                {currency.format(Math.round(animatedTotal))}
              </p>
              <p className="text-muted-foreground mt-1.5 text-sm">
                across {results.hiresPerYear} new drivers a year · ≈{" "}
                {currency.format(Math.round(perHire))} per hire
              </p>

              <div className="border-success/20 bg-card/70 mt-6 rounded-xs border p-4">
                <p className="text-success flex items-baseline gap-2 text-sm">
                  <Clock3 className="text-success h-3.5 w-3.5 self-center" aria-hidden="true" />
                  <span className="text-2xl font-normal tracking-[-0.02em] tabular-nums">
                    {Math.round(animatedHours).toLocaleString("en-US")}
                  </span>
                  hours back per year
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Driver classroom and admin time — roughly {workingDays.toLocaleString("en-US")}{" "}
                  working days.
                </p>
              </div>

              <div className="border-border-subtle mt-5 space-y-5 border-t pt-5">
                <p className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
                  Where it comes from
                </p>
                <BreakdownRow
                  icon={Presentation}
                  label="Paid classroom time"
                  caption="Drivers finish the online portion on their phones before day one."
                  amount={results.classroomDollars}
                  share={results.classroomDollars / largestCategory}
                  barClass="bg-accent-blue"
                  revealed
                />
                <BreakdownRow
                  icon={BedDouble}
                  label="No-show hotel &amp; travel"
                  caption="See who is actually progressing before you book the room."
                  amount={results.hotelDollars}
                  share={results.hotelDollars / largestCategory}
                  barClass="bg-accent-amber"
                  revealed
                />
                <BreakdownRow
                  icon={ClipboardList}
                  label="Admin chasing &amp; filing"
                  caption="Automatic reminders, live progress, and records that keep themselves."
                  amount={results.adminDollars}
                  share={results.adminDollars / largestCategory}
                  barClass="bg-accent-violet"
                  revealed
                />
              </div>

              <p className="text-muted-foreground/80 border-border-subtle mt-6 border-t pt-4 text-xs leading-relaxed">
                Estimates from your inputs and the assumptions shown — not a quote or a promise of
                results. Trainer time and driver-turnover effects are not counted.
              </p>

              <div className="mt-6 space-y-2.5">
                <EmailCapture
                  source="Orientation cost calculator"
                  buttonText="Get started"
                  className="max-w-none"
                />
                <p className="text-muted-foreground text-center text-xs">
                  Start with your work email. We&apos;ll help you pressure-test the estimate.
                </p>
                <Button
                  variant="secondary"
                  size="md"
                  className="border-success/25 bg-card/70 hover:border-success/40 hover:bg-card w-full"
                  onClick={handleCopyLink}
                  aria-live="polite"
                >
                  {copied ? (
                    <>
                      Link copied <Check className="text-success ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Copy a link to this estimate <Link2 className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-muted-foreground text-center text-xs">
                  The link keeps your numbers — send it to your owner or safety team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RoiCalculator;
