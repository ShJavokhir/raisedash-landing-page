import Image from "next/image";
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
import { GraphitePlate } from "@/components/receipts/figures";
import { PortalFigure } from "@/components/payroll/figures";
import { PAYROLL_PLATE, ScreenPlate } from "@/components/payroll/screens";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { payrollCopy } from "@/i18n/pages/freight-payroll";
import { localeServerSideProps } from "@/i18n/server";

/**
 * Freight Payroll: payroll for a trucking company's office team (dispatchers,
 * safety and fleet managers, recruiters, accounting). The product lives in
 * ~/dev/projects/freight-payroll (docs/STATUS.md and docs/DOMAIN.md).
 *
 * Kept short on purpose (owner, 2026-10-24: the first version copied the
 * other product pages' sections and was "slop"): what it is, the film, what
 * it takes care of, a closer look at the real app, payslips in Telegram,
 * three honest answers. The film already shows the steps, so the page doesn't
 * repeat them; the screenshots (owner, 2026-10-25) show the same month up
 * close.
 *
 * Not built, so never claimed: sending money, direct deposit, taxes, PDF
 * payslips, hourly pay and overtime, driver pay. Each company runs its own
 * bot, so the page never names one. Plain words, no em dashes, "we" for what
 * the product does, no other product mentioned, no public price.
 */

/** The homepage card color (src/data/products.ts), the hero film's stage. */
const PLATE = PAYROLL_PLATE;

/**
 * One 3D icon per "What it takes care of" item, in the order of
 * t.handles.items (same family as the homepage card icons: xAI renders cut
 * out with rembg, sources in marketing/landing-icons/payroll/). Files are 3x
 * the 64 px they show at.
 */
const HANDLE_ICONS = [
  { src: "/brand/payroll/days.webp", width: 197, height: 192 },
  { src: "/brand/payroll/commission.webp", width: 240, height: 192 },
  { src: "/brand/payroll/advances.webp", width: 198, height: 192 },
  { src: "/brand/payroll/loans.webp", width: 197, height: 192 },
  { src: "/brand/payroll/approval.webp", width: 230, height: 192 },
  { src: "/brand/payroll/reports.webp", width: 209, height: 192 },
];

/**
 * "A closer look": real screenshots of the October the film tells, in the
 * order of t.closer.items. The table and the reports take the full width
 * (the table needs it to fit its columns); Sarah's line and the review share
 * a row. On phones each plate shows a zoomed crop that runs off its edges.
 * Files are 2x the app's CSS pixels (1376 px window, the review at 1200).
 */
const SCREENS = [
  {
    src: "/images/freight-payroll/period.webp",
    width: 2240,
    height: 1948,
    span: "lg:col-span-12",
    plateClass: "aspect-[4/5] sm:grid sm:aspect-[3/2] sm:place-items-center",
    cardClass: "absolute top-[5%] left-[6%] w-[190%] sm:static sm:w-[68%]",
    sizes: "(min-width: 1200px) 789px, (min-width: 640px) 68vw, 190vw",
  },
  {
    src: "/images/freight-payroll/line.webp",
    width: 1152,
    height: 1800,
    span: "lg:col-span-5",
    plateClass:
      "grid aspect-[4/5] place-items-center sm:aspect-[16/10] lg:aspect-auto lg:h-[660px]",
    cardClass: "w-[70%] sm:w-[35%] lg:w-[76%]",
    sizes: "(min-width: 1200px) 360px, (min-width: 1024px) 30vw, (min-width: 640px) 35vw, 70vw",
  },
  {
    src: "/images/freight-payroll/review.webp",
    width: 1888,
    height: 1820,
    span: "lg:col-span-7",
    plateClass:
      "aspect-[4/5] sm:grid sm:aspect-[4/3] sm:place-items-center lg:aspect-auto lg:h-[660px]",
    cardClass: "absolute top-[5%] left-[6%] w-[170%] sm:static sm:w-[70%] lg:w-[88%]",
    sizes: "(min-width: 1200px) 587px, (min-width: 1024px) 50vw, (min-width: 640px) 70vw, 170vw",
  },
  {
    src: "/images/freight-payroll/reports.webp",
    width: 2240,
    height: 1692,
    span: "lg:col-span-12",
    plateClass: "aspect-[4/5] sm:grid sm:aspect-[16/10] sm:place-items-center",
    cardClass: "absolute top-[5%] left-[6%] w-[190%] sm:static sm:w-[72%]",
    sizes: "(min-width: 1200px) 835px, (min-width: 640px) 72vw, 190vw",
  },
];

export default function FreightPayrollPage() {
  const t = useCopy(payrollCopy);
  // One array for both the page and FAQPageJsonLd, so the schema matches what renders.
  const faqs: FAQItem[] = t.faq.items;

  return (
    <PageLayout
      title={t.seo.title}
      description={t.seo.description}
      keywords={[
        "trucking payroll software",
        "dispatcher payroll",
        "payroll for trucking office staff",
        "dispatcher commission per load",
        "salary advance tracking",
        "employee payslips in telegram",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Freight Payroll", url: "/products/freight-payroll" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Freight Payroll"
        description="Payroll software for a trucking company's office team: dispatchers, safety and fleet managers, recruiters, accounting. Not for driver pay. Payslips go to Telegram."
        operatingSystem={["Web", "iOS", "Android"]}
      />
      <FAQPageJsonLd faqs={faqs} />

      <Container className="py-12 sm:py-16">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-accent mb-4 font-mono text-xs tracking-[0.14em] uppercase">
              {t.hero.eyebrow}
            </p>
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              {t.hero.title}
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              {t.hero.body}
            </p>
            <GetDemoLink product="freight-payroll" className="mt-7 text-sm" />
          </div>
          <TrustedBy className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
        <ProductMotion
          name="payroll"
          label={t.hero.motionLabel}
          pauseLabel={t.hero.pauseMotion}
          playLabel={t.hero.playMotion}
          plate={PLATE}
          className="mt-10 sm:mt-12"
        />
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="fp-handles-heading">
          <h2
            id="fp-handles-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.handles.heading}
          </h2>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {t.handles.items.map((item, i) => (
              <li key={item.title} className="border-border border-t py-6">
                {/* Decorative: the title says what it is. */}
                <Image
                  src={HANDLE_ICONS[i].src}
                  alt=""
                  width={HANDLE_ICONS[i].width}
                  height={HANDLE_ICONS[i].height}
                  className="mb-4 h-16 w-auto drop-shadow-[0_8px_12px_rgb(0_0_0/0.16)]"
                />
                <h3 className="text-foreground text-lg font-normal tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground mt-1.5 text-base leading-relaxed">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="fp-closer-heading">
          <h2
            id="fp-closer-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.closer.heading}
          </h2>
          <ul className="grid gap-x-5 gap-y-10 lg:grid-cols-12">
            {SCREENS.map(({ span, ...screen }, i) => (
              <li key={screen.src} className={span}>
                <ScreenPlate {...screen} alt={t.closer.items[i].alt} index={i} />
                <h3 className="text-foreground mt-5 text-lg font-normal tracking-tight">
                  {t.closer.items[i].title}
                </h3>
                <p className="text-muted-foreground mt-1.5 max-w-xl text-base leading-relaxed">
                  {t.closer.items[i].text}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="fp-portal-heading">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                id="fp-portal-heading"
                className="text-foreground text-2xl font-normal tracking-tight"
              >
                {t.portal.heading}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
                {t.portal.body}
              </p>
              <ul className="mt-6 space-y-3">
                {t.portal.points.map((point) => (
                  <li key={point} className="text-foreground flex gap-3 text-base leading-relaxed">
                    <Check className="text-accent mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <GraphitePlate
              crop={{ pos: "70% 30%" }}
              className="grid place-items-center px-4 py-8 sm:p-10 lg:col-span-7"
            >
              <PortalFigure />
            </GraphitePlate>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="fp-faq-heading">
          <h2
            id="fp-faq-heading"
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
          aria-labelledby="fp-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="fp-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            {t.cta.heading}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            {t.cta.body}
          </p>
          <GetDemoLink product="freight-payroll" className="mt-7 text-sm" />
          <p className="text-muted-foreground/70 mx-auto mt-8 max-w-2xl text-xs leading-relaxed">
            {t.cta.trademark}
          </p>
        </section>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
