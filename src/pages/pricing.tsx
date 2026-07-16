import Link from "next/link";
import {
  ArrowRight,
  Check,
  Download,
  Gauge,
  Percent,
  Receipt,
  Sparkles,
  Tag,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";

/**
 * Pricing page — TEMPLATE, shipped unlinked and unindexed.
 *
 * This page is intentionally NOT in the header nav, the footer, or the
 * sitemap. It carries noindex/nofollow (passed to PageLayout, which forwards
 * them to the shared SEO component — the same mechanism the /start funnel
 * pages use) so it stays out of search until final numbers are locked.
 *
 * It is designed to flip live with a small edit: fill in the tier prices and
 * set PRICING_LIVE = true (see the "TODO: launch pricing" block below).
 */

/*
 * ───────────────────────────────────────────────────────────────────────────
 * TODO: launch pricing
 * ───────────────────────────────────────────────────────────────────────────
 * Final per-driver prices are NOT public yet. Until they are, PRICING_LIVE
 * stays `false` and every price slot renders the "Final pricing announced at
 * launch" treatment. Do NOT ship real dollar figures as live page text before
 * the numbers are locked and approved.
 *
 * To flip pricing live:
 *   1. Fill in each tier's `price` field below (see TIERS / RISK_TIER) using
 *      the model values, e.g. price: { perDriver: "$5", minimum: "$149 / mo minimum" }.
 *   2. Set PRICING_LIVE = true.
 *   3. Wire /pricing into the header nav + footer, add it to
 *      src/pages/sitemap.xml.tsx (STATIC_PAGE_DATES) and
 *      src/pages/api/indexnow.ts (STATIC_PATHS), and remove the
 *      noindex/nofollow props on <PageLayout> at the bottom of this file.
 *
 * Internal launch model (vision & strategy §10 — planning numbers, not yet
 * public). Uncomment and drop these into the tiers when approved:
 *
 *   // const CORE_PRICE   = { perDriver: "$5",  minimum: "$149 / mo minimum" };
 *   // const GROWTH_PRICE = { perDriver: "$7",  minimum: "$249 / mo minimum" };
 *   // const RISK_PRICE   = { perDriver: "$10", minimum: "$399 / mo minimum" };
 *   //   At 100 drivers: roughly $500 / $700 / $1,000 per month.
 *   //   Annual: ~10% discount. Applicants: ~$2 each above a ~2x allowance.
 * ───────────────────────────────────────────────────────────────────────────
 */
const PRICING_LIVE: boolean = false;

type PriceSlot = { perDriver: string; minimum: string } | null;

interface Tier {
  name: string;
  tagline: string;
  /** null until launch pricing is set — see the TODO block above. */
  price: PriceSlot;
  status: "available" | "later";
  cta: "primary" | "secondary";
  features: string[];
}

const TIERS: Tier[] = [
  {
    name: "Core",
    tagline:
      "The current tools for sending driver training, tracking progress, and downloading a PDF report.",
    price: null, // TODO(launch): { perDriver: "$5", minimum: "$149 / mo minimum" }
    status: "available",
    cta: "secondary",
    features: [
      "Mobile driver training with one-time-code sign-in",
      "Video, reading, and quiz lessons",
      "SMS and email invitations",
      "Program-level and driver-level reporting",
      "Driver training report exported as PDF",
    ],
  },
  {
    name: "Growth · planned",
    tagline:
      "A planned tier for content tools, forms, and more assignment options. These features are not available yet.",
    price: null, // TODO(launch): { perDriver: "$7", minimum: "$249 / mo minimum" }
    status: "available",
    cta: "primary",
    features: [
      "Planned: everything in Core",
      "Planned: policy-to-course authoring tools",
      "Planned: multilingual content tools",
      "Planned: forms and e-signatures",
      "Planned: assignment rules by role, terminal, equipment, or status",
      "Planned: API and webhooks",
    ],
  },
];

const RISK_TIER: Tier = {
  name: "Risk",
  tagline:
    "A future tier for connecting fleet events with follow-up training. This is not available yet.",
  price: null, // TODO(launch): { perDriver: "$10", minimum: "$399 / mo minimum" }
  status: "later",
  cta: "secondary",
  features: [
    "Planned: telematics-triggered training assignments",
    "Planned: incident and corrective-action workflows",
    "Planned: risk analytics",
    "Planned: insurer and broker reporting",
  ],
};

interface Promise {
  icon: LucideIcon;
  title: string;
  body: string;
}

const PROMISES: Promise[] = [
  {
    icon: Gauge,
    title: "Planned: pay for active drivers",
    body: "We are considering billing around drivers who are assigned or completing training during the billing period.",
  },
  {
    icon: Users,
    title: "Planned: simple admin access",
    body: "We are considering including admin access without a separate seat charge.",
  },
  {
    icon: UserPlus,
    title: "Planned: lower cost for applicants",
    body: "We are considering a lower rate for pre-hire candidates than for active drivers.",
  },
  {
    icon: Sparkles,
    title: "Planned: easy-to-read billing",
    body: "Our goal is to avoid small usage charges that make the monthly bill hard to predict.",
  },
  {
    icon: Receipt,
    title: "Planned: optional setup help",
    body: "Our goal is to let fleets set up the product themselves and choose paid setup help only when needed.",
  },
  {
    icon: Percent,
    title: "Planned: annual option",
    body: "We are considering a lower effective price for fleets that choose annual billing.",
  },
  {
    icon: Download,
    title: "Download a driver training report",
    body: "The current product can export a driver's Raisedash training information as a PDF report.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What would count as an active driver?",
    a: "The model we are considering counts a driver who is assigned or completing training during the billing period. This definition is not final.",
  },
  {
    q: "Would applicants cost a full seat?",
    a: "We are considering a lower rate for pre-hire candidates. Final billing rules have not been announced.",
  },
  {
    q: "Will there be an implementation fee?",
    a: "Final setup and service fees have not been announced. Our goal is to support self-serve setup with optional help when a fleet needs it.",
  },
  {
    q: "What can we export today?",
    a: "The current product can export a PDF report with a driver's Raisedash training information, including trainings, quizzes, recorded activity, and certificates.",
  },
  {
    q: "What happens to our records if we leave?",
    a: "Download the available driver training report before closing your account. Ask our team about any other data you need to keep.",
  },
];

/**
 * Renders a tier's price slot. Until PRICING_LIVE is true (and the tier has a
 * `price` set), it shows the "announced at launch" treatment sized so a real
 * figure drops straight into the same slot later.
 */
function PriceDisplay({ tier }: { tier: Tier }) {
  if (PRICING_LIVE && tier.price) {
    return (
      <div className="mt-6">
        <div className="flex items-baseline gap-1.5">
          <span className="text-foreground text-4xl font-normal tracking-[-0.03em]">
            {tier.price.perDriver}
          </span>
          <span className="text-muted-foreground text-sm">/ active driver / mo</span>
        </div>
        <p className="text-muted-foreground mt-1 text-sm">{tier.price.minimum}</p>
      </div>
    );
  }

  const label =
    tier.status === "later"
      ? "Pricing set when this tier ships"
      : "Final pricing announced at launch";

  return (
    <div className="mt-6">
      <div className="bg-surface-2 border-border text-muted-foreground inline-flex items-center gap-2 rounded-xs border px-3 py-2 text-sm">
        <Tag className="h-3.5 w-3.5 flex-shrink-0" />
        {label}
      </div>
      <p className="text-muted-foreground/70 mt-2 text-xs">
        Planned pricing model. Final terms have not been announced.
      </p>
    </div>
  );
}

export default function Pricing() {
  return (
    <PageLayout
      title="Pricing"
      description="Planned pricing for Raisedash driver orientation and training records. Final pricing has not been announced."
      keywords={[
        "driver readiness pricing",
        "fleet onboarding software pricing",
        "trucking training pricing",
        "transparent pricing",
        "per driver pricing",
      ]}
      noindex
      nofollow
    >
      {/* Hero */}
      <div className="pt-8 pb-12">
        <Container className="bg-card border-border animate-fade-in-scale rounded-xs border px-8 py-12 delay-0 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
              Simple, transparent pricing.
            </h1>
            <p className="text-muted-foreground animate-fade-in-up mt-6 text-xl leading-relaxed font-normal delay-150">
              Final pricing has not been announced. This page shows the pricing model we are
              considering and clearly marks features that are still planned.
            </p>
            <div className="animate-fade-in-up mt-8 delay-200">
              <span className="bg-surface-2 border-border text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
                <Tag className="h-3.5 w-3.5" />
                Final per-driver pricing announced at launch
              </span>
            </div>
          </div>
        </Container>
      </div>

      {/* Tiers */}
      <Container className="pb-4 md:px-0">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              className={`bg-card border-border animate-fade-in-scale flex flex-col rounded-xs border p-8 ${
                i === 0 ? "delay-200" : "delay-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em]">
                  {tier.name}
                </h2>
                {tier.name === "Growth" && (
                  <span className="bg-surface-3 text-foreground rounded-full px-2.5 py-0.5 text-xs font-normal">
                    Adds AI authoring
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{tier.tagline}</p>

              <PriceDisplay tier={tier} />

              <div className="border-border my-6 border-t" />

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-foreground/90 flex items-start gap-2.5 text-sm leading-relaxed"
                  >
                    <Check className="text-success mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <Link href="/demo" className="block">
                  <Button variant={tier.cta} size="md" className="w-full">
                    Book a demo <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Risk — muted, coming later */}
        <div className="bg-surface-2 border-border animate-fade-in-scale mt-5 rounded-xs border border-dashed p-8 delay-400">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="md:max-w-md">
              <div className="flex items-center gap-3">
                <h2 className="text-foreground/80 text-2xl font-normal tracking-[-0.02em]">
                  {RISK_TIER.name}
                </h2>
                <span className="bg-surface-3 text-muted-foreground rounded-full px-2.5 py-0.5 text-xs font-normal">
                  Coming later
                </span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {RISK_TIER.tagline}
              </p>
              <PriceDisplay tier={RISK_TIER} />
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 md:max-w-md md:flex-1">
              {RISK_TIER.features.map((feature) => (
                <li
                  key={feature}
                  className="text-muted-foreground flex items-start gap-2.5 text-sm leading-relaxed"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 opacity-60" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Billing promises */}
      <Container className="py-12 md:px-0">
        <div className="animate-fade-in-up mb-10 delay-100">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Pricing ideas under consideration
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-lg">
            These are product goals, not final prices or contract terms.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROMISES.map((promise) => {
            const Icon = promise.icon;
            return (
              <div
                key={promise.title}
                className="bg-card border-border hover:bg-surface-2 rounded-xs border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5"
              >
                <Icon className="text-foreground h-5 w-5" />
                <h3 className="text-foreground mt-4 mb-2 text-lg font-normal tracking-[-0.01em]">
                  {promise.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{promise.body}</p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* FAQ */}
      <Container className="py-12 md:px-0">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-foreground mb-8 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Current pricing questions
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

      {/* CTA */}
      <Container className="pb-16 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 text-center sm:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Get in early on pricing
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            We are onboarding our first fleets now. Book a demo and we will walk you through the
            platform and talk through early-access pricing for your fleet.
          </p>
          <Link href="/demo">
            <Button size="lg">
              Talk to us about early access pricing <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
