import { CSSProperties, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArchiveRestore,
  Check,
  CircleDollarSign,
  Handshake,
  RefreshCcw,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * Pricing page — LIVE.
 *
 * One plan, everything included. The numbers here are the public source of
 * truth for marketing copy and MUST stay in sync with the backend's
 * `raisedash-backend/src/billing/plans.ts` (PLAN constant), which drives what
 * Stripe actually charges. If you change a number in one place, change both.
 *
 * Model:
 *   $149/mo includes the first 25 managed drivers, then $6 per additional
 *   managed driver ($5 for founding fleets — the first 10 subscribed fleets,
 *   for their first year). Annual = pay for 10 months (2 months free),
 *   arranged from billing after signup. 14-day free trial, card on file,
 *   nothing charged up front.
 *
 * A "managed driver" is a currently employed / hired-and-onboarding driver
 * with an active Raisedash profile. Admins, archived drivers, and replaced
 * seats never count.
 */

const BASE_MONTHLY = 149;
const INCLUDED_DRIVERS = 25;
const OVERAGE_PER_DRIVER = 6;
const FOUNDING_OVERAGE_PER_DRIVER = 5;
const FOUNDING_FLEET_COUNT = 10;
const ANNUAL_MONTHS_CHARGED = 10; // pay for 10 months, get 12
const TRIAL_DAYS = 14;
const APP_SIGNUP_URL = "https://app.raisedash.com/sign-up";

function monthlyFor(drivers: number, founding = false): number {
  const rate = founding ? FOUNDING_OVERAGE_PER_DRIVER : OVERAGE_PER_DRIVER;
  return BASE_MONTHLY + Math.max(0, drivers - INCLUDED_DRIVERS) * rate;
}

const fmtUsd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** Rows for the at-a-glance table. */
const TABLE_DRIVER_COUNTS = [25, 50, 75, 100, 150];

/* ────────────────────────── driver-count slider ─────────────────────────── */

function DriverSlider({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const min = 5;
  const max = 250;
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor="pricing-drivers" className="text-foreground/90 text-sm">
          Managed drivers on your fleet
        </label>
        <span className="text-foreground shrink-0 text-sm font-normal tabular-nums">
          {value} drivers
        </span>
      </div>
      <input
        id="pricing-drivers"
        type="range"
        min={min}
        max={max}
        step={5}
        value={value}
        aria-valuetext={`${value} drivers`}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range"
        style={
          {
            "--range-fill": `linear-gradient(to right, var(--foreground) ${pct}%, var(--surface-3) ${pct}%)`,
          } as CSSProperties
        }
      />
      <div className="text-muted-foreground/70 mt-1 flex justify-between text-xs">
        <span>5</span>
        <span>250</span>
      </div>
    </div>
  );
}

/* ───────────────────────────── page sections ────────────────────────────── */

interface IncludedGroup {
  heading: string;
  note?: string;
  items: string[];
}

const INCLUDED: IncludedGroup[] = [
  {
    heading: "Everything in the platform today",
    items: [
      "Mobile driver training with one-time-code sign-in — no app, no passwords",
      "Video, reading, and quiz lessons with passing scores and retries",
      "SMS and email invitations with automatic reminders",
      "Pre-arrival orientation programs drivers finish before terminal day",
      "Program-level and driver-level progress reporting",
      "Driver training report exported as PDF — the record, in one click",
      "Completion certificates with public QR verification",
      "Photo identity verification on quizzes (optional, per fleet)",
      "Unlimited admin seats for your safety and operations team",
      "Data export in every plan, always — your records are yours",
    ],
  },
  {
    heading: "In development — included when it ships, same price",
    note: "We publish what exists and what doesn't. These are being built now and land in the same plan at no extra cost for existing customers.",
    items: [
      "Policy-to-course authoring tools",
      "Forms and e-signatures",
      "First-90-days programs and check-ins",
      "Corrective-action workflows after safety events",
      "API and webhooks",
    ],
  },
];

interface DefinitionCard {
  icon: LucideIcon;
  title: string;
  body: string;
}

const MANAGED_DRIVER_CARDS: DefinitionCard[] = [
  {
    icon: Users,
    title: "Counts: a driver you manage",
    body: "A currently employed, contracted, or hired-and-onboarding driver with an active Raisedash profile. Predictable from your roster — not from how much training you assign.",
  },
  {
    icon: ShieldCheck,
    title: "Free: every admin",
    body: "Safety directors, HR, dispatchers, terminal managers — unlimited admin seats on every account. You should never ration who can see readiness.",
  },
  {
    icon: ArchiveRestore,
    title: "Free: former drivers",
    body: "Archive a departed driver and they stop counting immediately — while their full training record stays preserved and exportable forever.",
  },
  {
    icon: RefreshCcw,
    title: "Free: replacing a driver",
    body: "Capacity transfers. When one driver leaves and another starts, your count doesn't change — you're never charged twice for one seat.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What counts as a managed driver?",
    a: "A currently employed, contracted, or hired-and-onboarding driver with an active profile in Raisedash. Your bill follows your roster, so you can predict it from headcount alone. Admins are unlimited and free, archived drivers are free, and replacing a departed driver never adds to your count.",
  },
  {
    q: "What happens when a driver leaves?",
    a: "Archive them. They stop counting toward your bill right away, and their complete training record — lessons, quizzes, signatures, certificates — stays preserved and exportable. Editing your roster never edits history.",
  },
  {
    q: "Do applicants cost a full seat?",
    a: "No. You're billed for drivers you actually manage, not people you're evaluating. A driver starts counting when you create an active profile to onboard them. Dedicated pre-hire applicant tracking is on the roadmap and will never cost the full driver price.",
  },
  {
    q: "How does the free trial work?",
    a: `Create an account, add a card, and you have ${TRIAL_DAYS} days free — nothing is charged up front. We email you before the trial ends with your exact upcoming price based on your roster. Cancel in two clicks from Billing settings and you owe nothing.`,
  },
  {
    q: "How does annual billing work?",
    a: "Pay for 10 months, get 12 — two months free. Start monthly, and switch to annual any time from your billing settings once you know Raisedash is working for your fleet. We'll never push an annual contract on an unproven relationship.",
  },
  {
    q: "Is there a setup or implementation fee?",
    a: "No. Setup is self-serve and takes an afternoon, not a six-week implementation call. If you want hands-on help, the Founding Fleet Pilot includes guided setup — and it's credited back if you continue.",
  },
  {
    q: "What happens to our records if we cancel?",
    a: "You export them, free. Driver training reports and data exports are included in every plan, always. We will never hold a fleet's own completion records hostage — that's a promise, not fine print.",
  },
];

export default function Pricing() {
  const [drivers, setDrivers] = useState(50);
  const [annual, setAnnual] = useState(false);

  const estimate = useMemo(() => {
    const monthly = monthlyFor(drivers);
    const annualTotal = monthly * ANNUAL_MONTHS_CHARGED;
    const effectiveMonthly = annualTotal / 12;
    const shown = annual ? effectiveMonthly : monthly;
    return {
      monthly,
      annualTotal,
      effectiveMonthly,
      shown,
      perDriver: shown / drivers,
    };
  }, [drivers, annual]);

  return (
    <PageLayout
      title="Pricing"
      description="One plan with everything included. $149/month covers your first 25 managed drivers, then $6 per additional driver. 14-day free trial, cancel monthly, free data exports."
      keywords={[
        "driver readiness pricing",
        "fleet onboarding software pricing",
        "trucking training software cost",
        "transparent pricing",
        "per driver pricing",
      ]}
    >
      {/* Hero + offer */}
      <div className="pt-8 pb-5">
        <Container className="bg-card border-border animate-fade-in-scale rounded-xs border px-8 py-12 delay-0 sm:px-12 sm:py-14">
          <div className="max-w-3xl">
            <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
              Simple, transparent pricing.
            </h1>
            <p className="text-muted-foreground animate-fade-in-up mt-6 text-xl leading-relaxed font-normal delay-150">
              One plan with everything included. No quote calls, no seat games, no surprise invoices
              — your bill follows your roster, nothing else.
            </p>
          </div>

          <div className="animate-fade-in-up mt-10 grid grid-cols-1 gap-5 delay-200 lg:grid-cols-12">
            {/* Price panel */}
            <div className="border-border bg-background flex flex-col rounded-xs border p-7 lg:col-span-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-foreground text-lg font-normal tracking-[-0.01em]">
                  Raisedash Readiness
                </h2>
                {/* Billing period toggle */}
                <div
                  role="group"
                  aria-label="Billing period"
                  className="border-border bg-surface-2 flex rounded-full border p-0.5 text-xs"
                >
                  {(["Monthly", "Annual"] as const).map((label) => {
                    const isAnnual = label === "Annual";
                    const active = annual === isAnnual;
                    return (
                      <button
                        key={label}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setAnnual(isAnnual)}
                        className={cn(
                          "rounded-full px-3 py-1 transition-colors duration-[0.15s]",
                          active
                            ? "bg-card text-foreground border-border border shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="text-foreground text-5xl font-normal tracking-[-0.03em] tabular-nums">
                  {fmtUsd(annual ? (BASE_MONTHLY * ANNUAL_MONTHS_CHARGED) / 12 : BASE_MONTHLY)}
                </span>
                <span className="text-muted-foreground text-sm">/ month</span>
              </div>
              <p className="text-foreground/90 mt-2 text-sm leading-relaxed">
                Includes your first {INCLUDED_DRIVERS} managed drivers, then{" "}
                <span className="text-foreground">${OVERAGE_PER_DRIVER} per additional driver</span>
                {annual ? ", billed annually — two months free." : ", billed monthly."}
              </p>
              {annual && (
                <p className="text-muted-foreground mt-1 text-xs">
                  {fmtUsd(BASE_MONTHLY * ANNUAL_MONTHS_CHARGED)}/year at {INCLUDED_DRIVERS} drivers
                  — pay for {ANNUAL_MONTHS_CHARGED} months, get 12.
                </p>
              )}

              <ul className="mt-6 space-y-2.5">
                {[
                  `${TRIAL_DAYS}-day free trial — nothing charged up front`,
                  "Cancel monthly. No contracts, no minimum term",
                  "Unlimited admins. Archived drivers and replaced seats are free",
                  "Data exports free in every plan, always",
                ].map((line) => (
                  <li
                    key={line}
                    className="text-foreground/90 flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <Check className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <a href={APP_SIGNUP_URL}>
                  <Button size="md" className="w-full">
                    Start your fleet <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </a>
                <Link href="/demo" className="mt-2 block">
                  <Button variant="secondary" size="md" className="w-full">
                    Book a demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Estimator panel */}
            <div className="border-border bg-background rounded-xs border p-7 lg:col-span-7">
              <h3 className="text-foreground text-lg font-normal tracking-[-0.01em]">
                What would your fleet pay?
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Drag to your roster size. The math is the whole model — there is nothing else to
                quote.
              </p>

              <div className="mt-6">
                <DriverSlider value={drivers} onChange={setDrivers} />
              </div>

              <div className="border-border mt-6 grid grid-cols-1 gap-4 border-t pt-6 sm:grid-cols-3">
                <div>
                  <div className="text-muted-foreground text-xs">
                    {annual ? "Effective monthly" : "Monthly total"}
                  </div>
                  <div className="text-foreground mt-1 text-3xl font-normal tracking-[-0.02em] tabular-nums">
                    {fmtUsd(estimate.shown)}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">Per managed driver</div>
                  <div className="text-foreground mt-1 text-3xl font-normal tracking-[-0.02em] tabular-nums">
                    ${estimate.perDriver.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground text-xs">
                    {annual ? "Billed once a year" : "Switch to annual and pay"}
                  </div>
                  <div className="text-foreground mt-1 text-3xl font-normal tracking-[-0.02em] tabular-nums">
                    {fmtUsd(estimate.annualTotal)}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mt-5 text-xs leading-relaxed">
                {drivers <= INCLUDED_DRIVERS
                  ? `Up to ${INCLUDED_DRIVERS} drivers, the base price covers everything.`
                  : `${fmtUsd(BASE_MONTHLY)} base + ${drivers - INCLUDED_DRIVERS} additional drivers × $${OVERAGE_PER_DRIVER}.`}{" "}
                Founding fleets pay ${FOUNDING_OVERAGE_PER_DRIVER} per additional driver in year
                one.
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* At-a-glance table */}
      <Container className="py-7 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 sm:p-10">
          <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            The whole price list fits in one table.
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl text-base">
            Most of our market hides pricing behind a quote call. Here is ours, complete.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-muted-foreground border-border border-b text-left">
                  <th className="py-3 pr-4 font-normal">Managed drivers</th>
                  <th className="py-3 pr-4 text-right font-normal">Monthly</th>
                  <th className="py-3 pr-4 text-right font-normal">Annual prepay</th>
                  <th className="py-3 text-right font-normal">Effective monthly (annual)</th>
                </tr>
              </thead>
              <tbody className="divide-border divide-y">
                {TABLE_DRIVER_COUNTS.map((count) => {
                  const monthly = monthlyFor(count);
                  const annualTotal = monthly * ANNUAL_MONTHS_CHARGED;
                  return (
                    <tr key={count}>
                      <td className="text-foreground py-3 pr-4">{count}</td>
                      <td className="text-foreground py-3 pr-4 text-right tabular-nums">
                        {fmtUsd(monthly)}
                      </td>
                      <td className="text-foreground py-3 pr-4 text-right tabular-nums">
                        {fmtUsd(annualTotal)}
                      </td>
                      <td className="text-foreground py-3 text-right tabular-nums">
                        {fmtUsd(annualTotal / 12)}/mo
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-4 text-xs">
            At 75 drivers hiring 6 new drivers a month, Raisedash costs about{" "}
            {fmtUsd(monthlyFor(75) / 6)} per new start.{" "}
            <Link
              href="/#orientation-cost-calculator"
              className="text-foreground underline underline-offset-2"
            >
              Compare that to your orientation cost per hire
            </Link>
            .
          </p>
        </div>
      </Container>

      {/* Managed driver definition */}
      <Container className="py-7 md:px-0">
        <div className="animate-fade-in-up mb-8">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            You pay for drivers you manage. Nothing else.
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
            Billing follows your roster, so your invoice is predictable from headcount alone — never
            from how much training you assign.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MANAGED_DRIVER_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-card border-border rounded-xs border p-6">
                <Icon className="text-foreground h-5 w-5" />
                <h3 className="text-foreground mt-4 mb-2 text-lg font-normal tracking-[-0.01em]">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* What's included */}
      <Container className="py-7 md:px-0">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {INCLUDED.map((group) => (
            <div key={group.heading} className="bg-card border-border rounded-xs border p-8">
              <h2 className="text-foreground text-xl font-normal tracking-[-0.01em]">
                {group.heading}
              </h2>
              {group.note && (
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{group.note}</p>
              )}
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-foreground/90 flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <Check className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Founding fleets */}
      <Container className="py-7 md:px-0">
        <div className="animate-fade-in-up mb-8">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            We&apos;re onboarding our first fleets — and it shows in the price.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="bg-card border-border rounded-xs border p-8">
            <div className="flex items-center gap-3">
              <CircleDollarSign className="text-foreground h-5 w-5" />
              <h3 className="text-foreground text-xl font-normal tracking-[-0.01em]">
                Founding fleet rate
              </h3>
            </div>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              The first {FOUNDING_FLEET_COUNT} fleets pay{" "}
              <span className="text-foreground">
                ${FOUNDING_OVERAGE_PER_DRIVER} per additional driver
              </span>{" "}
              instead of ${OVERAGE_PER_DRIVER} for their first year, month-to-month — then standard
              pricing, locked for the following year. At 75 drivers that&apos;s{" "}
              {fmtUsd(monthlyFor(75, true))}/month. In exchange, we ask for honest feedback and a
              short call once a month. No lifetime gimmicks — just a fair head start for fleets who
              bet on us early.
            </p>
          </div>
          <div className="bg-card border-border rounded-xs border p-8">
            <div className="flex items-center gap-3">
              <Handshake className="text-foreground h-5 w-5" />
              <h3 className="text-foreground text-xl font-normal tracking-[-0.01em]">
                Founding Fleet Pilot — $500, fully credited
              </h3>
            </div>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Want proof before you commit? Run one live orientation cohort of up to 25 drivers over
              45 days. We do guided setup, your first driver import, and one program build with you,
              then review the results together — pre-arrival completion, admin time saved, and how
              fast you can produce a driver&apos;s record. Continue, and the $500 is credited to
              your subscription.
            </p>
            <div className="mt-5">
              <Link href="/demo">
                <Button variant="secondary" size="sm">
                  Talk to us about a pilot <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* FAQ */}
      <Container className="py-7 md:px-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Pricing questions, answered plainly.
          </h2>
          <div className="divide-border divide-y">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-6 first:pt-0 last:pb-0">
                <h3 className="text-foreground text-lg font-normal tracking-[-0.01em]">{faq.q}</h3>
                <p className="text-muted-foreground mt-2 text-base leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Final CTA */}
      <Container className="pt-7 pb-16 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 text-center sm:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Send your first orientation today.
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            Set up your fleet in an afternoon. {TRIAL_DAYS} days free, nothing charged up front,
            cancel in two clicks — and your records export free, forever.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={APP_SIGNUP_URL}>
              <Button size="lg">
                Start your fleet <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
            <Link href="/demo">
              <Button variant="secondary" size="lg">
                Book a demo
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
