import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { Check, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { TrustedBy } from "@/components/layout/TrustedBy";
import {
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";
import { GraphiteCard, GraphitePlate, type PlateCrop } from "@/components/receipts/figures";
import {
  AnyEventFigure,
  AutomaticFigure,
  BuildLessonFigure,
  DriverPageFigure,
  FromTheClipFigure,
  RankFigure,
  RecordFigure,
  TwoWays,
} from "@/components/coaching/figures";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { coachingCopy } from "@/i18n/pages/driver-coaching";
import { localeServerSideProps } from "@/i18n/server";

/**
 * Driver coaching: a short lesson sent to the driver's phone after a safety
 * event, with the dashcam clip, assigned by hand or by rules on Samsara and
 * Motive events. To a buyer it's its own product; underneath it's the same
 * training, driver portal and driver record as Orientation.
 *
 * Owner confirmed live on 2026-10-02: manual coaching, the clip inside the
 * lesson, rule-based automatic or approve-first assignment, and Motive (see
 * the header in components/coaching/figures.tsx for what was verified in code
 * and what wasn't).
 *
 * Guardrails: we send coaching and keep the record. We never decide fault,
 * preventability or discipline, and never promise a record wins a lawsuit or
 * keeps you "compliant" (driver-readiness platform, see CLAUDE.md). Record
 * contents must match /platform/training-evidence. The ATRI figures are the
 * average verdict size in its database (2020 study, via FreightWaves).
 *
 * Copy: keep it short. One idea per sentence, no eyebrows or captions that
 * repeat the heading, no em dashes. The owner pushed back on the first,
 * wordier version (2026-10-02): people skim, so less text wins.
 */

/** The homepage card color (src/data/products.ts), the hero film's stage. */
const PLATE = "#7c5a2e";

const ATRI_SOURCE =
  "https://www.freightwaves.com/news/atri-study-reveals-nuclear-verdicts-on-the-rise";

// Copy for every section lives in src/i18n/pages/driver-coaching.ts (English + Uzbek).
type CoachingCopy = (typeof coachingCopy)["en"];

const parts: {
  id: string;
  key: keyof CoachingCopy["parts"];
  figure: React.ReactNode;
  crop: PlateCrop;
}[] = [
  { id: "clip", key: "clip", figure: <FromTheClipFigure />, crop: { pos: "15% 55%" } },
  {
    id: "automatic",
    key: "automatic",
    figure: <AutomaticFigure />,
    crop: { pos: "75% 20%", flip: true },
  },
  { id: "any-event", key: "anyEvent", figure: <AnyEventFigure />, crop: { pos: "45% 90%" } },
];

const features: {
  key: keyof CoachingCopy["features"];
  figure: React.ReactNode;
  crop: PlateCrop;
}[] = [
  { key: "policy", figure: <BuildLessonFigure />, crop: { pos: "60% 80%" } },
  { key: "rank", figure: <RankFigure />, crop: { pos: "90% 95%" } },
  { key: "driverPage", figure: <DriverPageFigure />, crop: { pos: "30% 60%", flip: true } },
];

export default function DriverCoachingPage() {
  const t = useCopy(coachingCopy);
  const faqs: FAQItem[] = t.faq.items;

  return (
    <PageLayout
      title={t.seo.title}
      description={t.seo.description}
      keywords={[
        "driver coaching software",
        "fleet driver coaching",
        "dashcam coaching",
        "samsara driver coaching",
        "motive driver coaching",
        "truck driver safety coaching",
        "safety event coaching",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Driver Coaching", url: "/products/driver-coaching" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Driver Coaching"
        description="Coaching lessons sent to drivers' phones after safety events, with the dashcam clip, assigned by hand or automatically from Samsara and Motive. Every coaching is kept on the driver's record."
        operatingSystem={["Web", "iOS", "Android"]}
      />
      <FAQPageJsonLd faqs={faqs} />

      <Container className="py-12 sm:py-16">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              {t.hero.title}
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              {t.hero.body}
            </p>
            <GetDemoLink product="driver-coaching" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">{t.hero.worksWith}</p>
          </div>
          <TrustedBy className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
        <ProductMotion
          name="coaching"
          label={t.hero.motionLabel}
          pauseLabel={t.hero.pauseMotion}
          playLabel={t.hero.playMotion}
          plate={PLATE}
          className="mt-10 sm:mt-12"
        />
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="dc-two-ways-heading">
          <h2
            id="dc-two-ways-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.twoWays.heading}
          </h2>
          <TwoWays />
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <div className="space-y-14 sm:space-y-20">
          {parts.map((part, index) => (
            <section
              key={part.id}
              aria-labelledby={`dc-${part.id}-heading`}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className={`min-w-0 lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <h2
                  id={`dc-${part.id}-heading`}
                  className="text-foreground text-2xl leading-snug font-normal tracking-tight sm:text-3xl"
                >
                  {t.parts[part.key].title}
                </h2>
                <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                  {t.parts[part.key].text}
                </p>
                <ul className="mt-5 space-y-3">
                  {t.parts[part.key].points.map((point) => (
                    <li
                      key={point}
                      className="text-foreground flex gap-3 text-base leading-relaxed"
                    >
                      <Check
                        className="text-accent mt-1 h-4 w-4 shrink-0"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <GraphitePlate
                crop={part.crop}
                className={`grid min-h-[400px] place-items-center px-4 py-8 sm:p-10 lg:col-span-7 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                {part.figure}
              </GraphitePlate>
            </section>
          ))}
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section
          aria-labelledby="dc-record-heading"
          className="bg-card border-border rounded-xs border p-6 sm:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <h2
                id="dc-record-heading"
                className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
              >
                {t.record.heading}
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                {t.record.body}
              </p>
              <p className="text-foreground mt-4 text-base leading-relaxed">{t.record.kept}</p>
              <p className="text-muted-foreground/80 border-border mt-6 border-t pt-4 text-xs leading-relaxed">
                {t.record.sourceBefore}
                <a
                  href={ATRI_SOURCE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline underline-offset-2"
                >
                  ATRI
                </a>
                {t.record.sourceAfter}
              </p>
            </div>
            <GraphitePlate
              crop={{ pos: "20% 70%", flip: true }}
              className="grid min-h-[420px] place-items-center px-4 py-8 sm:p-10 lg:col-span-6"
            >
              <RecordFigure />
            </GraphitePlate>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <ul className="grid gap-x-5 gap-y-10 md:grid-cols-3">
          {features.map(({ key, ...feature }) => (
            <GraphiteCard key={key} {...feature} {...t.features[key]} />
          ))}
        </ul>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="dc-fairness-heading">
          <h2
            id="dc-fairness-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.fairness.heading}
          </h2>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
            {t.fairness.items.map((item) => (
              <li key={item.title} className="border-border border-t pt-5">
                <h3 className="text-foreground text-lg font-normal tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground mt-1 text-base leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="dc-faq-heading">
          <h2
            id="dc-faq-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.faq.heading}
          </h2>
          <div className="border-border divide-border divide-y border-y">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="text-foreground flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-base [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    className="text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="text-muted-foreground max-w-3xl pb-5 text-base leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </Container>

      <Container id="get-started" className="scroll-mt-24 pb-12 sm:pb-16">
        <section
          aria-labelledby="dc-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="dc-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            {t.cta.heading}
          </h2>
          <GetDemoLink product="driver-coaching" className="mt-7 text-sm" />
        </section>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
