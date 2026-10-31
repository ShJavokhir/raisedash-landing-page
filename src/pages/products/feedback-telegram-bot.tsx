import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { TrustedBy } from "@/components/layout/TrustedBy";
import { StepList } from "@/components/platform/StepList";
import {
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";
import { GraphiteCard, GraphitePlate, type PlateCrop } from "@/components/receipts/figures";
import {
  AnonymousFigure,
  GroupsFigure,
  LeavingFigure,
  NewDriverFigure,
  NoAppFigure,
  ResultsFigure,
  TemplatesFigure,
} from "@/components/feedback/figures";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { feedbackCopy } from "@/i18n/pages/feedback-telegram-bot";
import { localeServerSideProps } from "@/i18n/server";

/**
 * Driver surveys in Telegram groups (raisedash-backend src/surveys,
 * docs/telegram-feedback.md).
 *
 * The pitch is driver retention: ask why drivers would leave, while there is
 * still time to fix it. Anonymous answers carry no name, group or Telegram
 * account, so never promise to show WHO is leaving; only how many and why.
 *
 * Copy: short, simple words, no em dashes, "we" for what the product does.
 * Only claim what the product does today. Named surveys can prefill a driver's
 * name, but that comes from another product, so this page does not mention it.
 * No public price: the CTA goes to the shared demo request page.
 */

/** The homepage card color (src/data/products.ts), the hero film's stage. */
const PLATE = "#f87917";

// Copy for every section lives in src/i18n/pages/feedback-telegram-bot.ts (English + Uzbek).
const features = [
  { key: "leaving", figure: <LeavingFigure />, crop: { pos: "0% 8%" } },
  { key: "anonymous", figure: <AnonymousFigure />, crop: { pos: "60% 80%" } },
  { key: "templates", figure: <TemplatesFigure />, crop: { pos: "100% 25%", flip: true } },
  { key: "groups", figure: <GroupsFigure />, crop: { pos: "90% 95%" } },
  { key: "noApp", figure: <NoAppFigure />, crop: { pos: "10% 40%", flip: true } },
  { key: "newDrivers", figure: <NewDriverFigure />, crop: { pos: "30% 60%", flip: true } },
] as const satisfies readonly { key: string; figure: React.ReactNode; crop: PlateCrop }[];

export default function FeedbackTelegramBotPage() {
  const t = useCopy(feedbackCopy);
  const faqs: FAQItem[] = t.faq.items;

  return (
    <PageLayout
      title={t.seo.title}
      description={t.seo.description}
      keywords={[
        "driver retention",
        "driver turnover",
        "trucking driver survey",
        "anonymous driver feedback",
        "telegram survey bot",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Feedback Bot", url: "/products/feedback-telegram-bot" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Feedback for Telegram"
        description="Send anonymous or named driver surveys to your Telegram groups. See scores, percentages, and written answers in one dashboard, and find out what would make drivers stay."
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
            <GetDemoLink product="feedback-telegram-bot" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">{t.hero.note}</p>
          </div>
          <TrustedBy className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
        <ProductMotion
          name="feedback"
          label={t.hero.motionLabel}
          pauseLabel={t.hero.pauseMotion}
          playLabel={t.hero.playMotion}
          plate={PLATE}
          className="mt-10 sm:mt-12"
        />
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="feedback-how-heading">
          <h2
            id="feedback-how-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.how.heading}
          </h2>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <StepList steps={t.how.steps} className="lg:col-span-5" />
            <GraphitePlate
              crop={{ pos: "20% 70%", flip: true }}
              className="grid place-items-center px-3 py-8 sm:p-10 lg:col-span-7"
            >
              <ResultsFigure />
            </GraphitePlate>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="feedback-features-heading">
          <h2
            id="feedback-features-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.features.heading}
          </h2>
          <ul className="grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ key, figure, crop }) => (
              <GraphiteCard key={key} {...t.features[key]} figure={figure} crop={crop} />
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="feedback-faq-heading">
          <h2
            id="feedback-faq-heading"
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
          aria-labelledby="feedback-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="feedback-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            {t.cta.heading}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            {t.cta.body}
          </p>
          <GetDemoLink product="feedback-telegram-bot" className="mt-7 text-sm" />
        </section>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
