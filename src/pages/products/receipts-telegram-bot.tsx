import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { TrustedBy } from "@/components/layout/TrustedBy";
import { StepList } from "@/components/platform/StepList";
import { BreadcrumbJsonLd, FAQPageJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/SEO";
import {
  AiCheckFigure,
  DashboardFigure,
  ExpensesFigure,
  FastPhotosFigure,
  GraphiteCard,
  GraphitePlate,
  plateStyle,
} from "@/components/receipts/figures";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { receiptsCopy } from "@/i18n/pages/receipts-telegram-bot";
import { localeServerSideProps } from "@/i18n/server";

/**
 * Receipt collection in Telegram groups (raisedash-backend src/pti/receipts,
 * docs/telegram-receipts.md).
 *
 * Rules from the user (2026-09-23): this is a paid product, so never mention a
 * free version. It runs on the same bot as the PTI product, but this page sells
 * receipts alone, so never mention PTI or inspections. Tell it the simple way:
 * type "receipt" and we send a link to capture it.
 *
 * Copy: short, simple words, no em dashes. Only claim what the product does
 * today: no reading of receipts, USD only, up to 5 files, 24-hour links. The
 * one exception is the AI check, which is marked Coming soon. The receipt list
 * makes paying drivers back easier, but we never pay anyone ourselves.
 */

const DEMO_LINK = "https://youtube.com/shorts/6rw33V2kXmE";
const DEMO_EMBED = "https://www.youtube-nocookie.com/embed/6rw33V2kXmE?rel=0";
/** The homepage card color (src/data/products.ts), the hero film's stage. */
const PLATE = "#365c93";

// Copy for every section lives in src/i18n/pages/receipts-telegram-bot.ts (English + Uzbek).
const stepKeys = ["ask", "photo", "dashboard"] as const;

const features = [
  { key: "expenses", figure: <ExpensesFigure />, crop: { pos: "100% 25%", flip: true } },
  { key: "fastPhotos", figure: <FastPhotosFigure />, crop: { pos: "10% 40%", flip: true } },
  { key: "aiCheck", figure: <AiCheckFigure />, crop: { pos: "30% 60%", flip: true } },
] as const;

export default function ReceiptsTelegramBotPage() {
  const t = useCopy(receiptsCopy);
  const steps = stepKeys.map((key) => t.steps[key]);

  return (
    <PageLayout
      title={t.seo.title}
      description={t.seo.description}
      keywords={[
        "driver receipts app",
        "trucking receipts",
        "telegram receipt bot",
        "lumper receipts",
        "fuel receipts",
        "driver expense receipts",
        "driver reimbursement",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Receipts Bot", url: "/products/receipts-telegram-bot" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Receipts for Telegram"
        description="Collect driver receipts in Telegram groups. Type 'receipt' in the group and the bot sends a link. The driver photographs the receipt, types the total, and it lands in one dashboard with the driver, amount, and photos."
        operatingSystem={["Web", "iOS", "Android"]}
      />
      <FAQPageJsonLd faqs={t.faqs} />

      <Container className="py-12 sm:py-16">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              {t.hero.title}
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              {t.hero.body}
            </p>
            <GetDemoLink product="receipts-telegram-bot" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">{t.hero.note}</p>
          </div>
          <TrustedBy className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
        <div className="mt-10 sm:mt-12">
          <ProductMotion
            name="receipts"
            label={t.hero.motionLabel}
            pauseLabel={t.hero.pauseMotion}
            playLabel={t.hero.playMotion}
            plate={PLATE}
          />
          <a
            href={DEMO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm underline-offset-4 hover:underline"
          >
            {t.hero.watchDemo} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="receipts-how-heading">
          <h2
            id="receipts-how-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.how.heading}
          </h2>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <StepList steps={steps} className="lg:col-span-5" />
            <GraphitePlate
              crop={{ pos: "20% 70%", flip: true }}
              className="grid place-items-center px-3 py-8 sm:p-10 lg:col-span-7"
            >
              <DashboardFigure />
            </GraphitePlate>
          </div>
        </section>
      </Container>

      <Container id="demo" className="scroll-mt-24 pb-12 sm:pb-16">
        <section
          aria-labelledby="receipts-demo-heading"
          className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-5">
            <h2
              id="receipts-demo-heading"
              className="text-foreground text-2xl font-normal tracking-tight"
            >
              {t.demo.heading}
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
              {t.demo.body}
            </p>
            <a
              href={DEMO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm underline-offset-4 hover:underline"
            >
              {t.demo.youtube} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          {/* Not GraphitePlate: that one is aria-hidden, and this video must stay reachable. */}
          <div
            style={plateStyle({ pos: "70% 30%" })}
            className="graphite-plate border-border grid place-items-center rounded-xs border px-3 py-8 sm:p-10 lg:col-span-7"
          >
            <div className="aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-lg bg-black shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]">
              <iframe
                className="h-full w-full"
                src={DEMO_EMBED}
                title={t.demo.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="receipts-features-heading">
          <h2
            id="receipts-features-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.features.heading}
          </h2>
          <ul className="grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ key, ...feature }) => (
              <GraphiteCard key={key} {...feature} {...t.features[key]} />
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="receipts-faq-heading">
          <h2
            id="receipts-faq-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.faq.heading}
          </h2>
          <div className="border-border divide-border divide-y border-y">
            {t.faqs.map((faq) => (
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
          aria-labelledby="receipts-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="receipts-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            {t.start.heading}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            {t.start.body}
          </p>
          <GetDemoLink product="receipts-telegram-bot" className="mt-7 text-sm" />
        </section>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
