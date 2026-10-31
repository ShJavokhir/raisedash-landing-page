import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { TrustedBy } from "@/components/layout/TrustedBy";
import { StepList } from "@/components/platform/StepList";
import { BreadcrumbJsonLd, FAQPageJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/SEO";
import { GraphiteCard, GraphitePlate } from "@/components/receipts/figures";
import {
  AnywhereFigure,
  CoachFigure,
  MessageAnatomy,
  MissedFigure,
  SearchFigure,
  ShareFigure,
  SkipFigure,
  TwoWays,
} from "@/components/ringcentral/figures";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { ringcentralCopy } from "@/i18n/pages/ringcentral-telegram";
import { localeServerSideProps } from "@/i18n/server";

/**
 * RingCentral call recordings in a Telegram chat
 * (raisedash-apps/ringcentral-recordings).
 *
 * The pitch is for owners and managers: hear the office's calls on your phone
 * without logging in to RingCentral. Only claim what the bot does today. It
 * checks RingCentral every few minutes (never say "instant" or "live"), it
 * posts the audio only when RingCentral recorded the call (other calls post as
 * text with Missed, Voicemail, Accepted), it skips calls by person name, it
 * starts from the day it is connected, and it keeps no copy. No transcripts,
 * no summaries, no per-person topics.
 *
 * Recording people is sensitive. Keep the consent section: the customer tells
 * employees and callers, and keeps the chat small. Never pitch it as spying.
 *
 * Copy: plain words a person would say out loud, no em dashes, "we" for what
 * the product does. Avoid stiff phrasing like "posts a few minutes after each
 * call".
 * No public price: the CTA goes to the shared demo request page.
 */

/** The homepage card color (src/data/products.ts), the hero film's stage. */
const PLATE = "#a8325e";

// Copy for every section lives in src/i18n/pages/ringcentral-telegram.ts (English + Uzbek).
const stepKeys = ["demo", "connect", "listen"] as const;

const features = [
  { key: "settle", figure: <SearchFigure />, crop: { pos: "0% 8%" } },
  { key: "coach", figure: <CoachFigure />, crop: { pos: "60% 80%" } },
  { key: "missed", figure: <MissedFigure />, crop: { pos: "100% 25%", flip: true } },
  { key: "anywhere", figure: <AnywhereFigure />, crop: { pos: "90% 95%" } },
  { key: "share", figure: <ShareFigure />, crop: { pos: "10% 40%", flip: true } },
  { key: "skip", figure: <SkipFigure />, crop: { pos: "30% 60%", flip: true } },
] as const;

/** Shown as its own section, not buried in the FAQ: this is the customer's job. */
const consentKeys = ["employees", "callers", "smallChat", "noCopies"] as const;

export default function RingCentralTelegramPage() {
  const t = useCopy(ringcentralCopy);
  const steps = stepKeys.map((key) => t.steps[key]);

  return (
    <PageLayout
      title={t.seo.title}
      description={t.seo.description}
      keywords={[
        "ringcentral call recordings",
        "ringcentral telegram",
        "call recording telegram bot",
        "dispatch call monitoring",
        "trucking dispatch quality control",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "RingCentral to Telegram", url: "/products/ringcentral-telegram" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash RingCentral to Telegram"
        description="Sends your RingCentral call recordings to a Telegram chat with who called, who answered, and when. Missed calls and voicemails show up too."
        operatingSystem={["Web", "iOS", "Android"]}
      />
      <FAQPageJsonLd faqs={t.faqs} />

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
            <GetDemoLink product="ringcentral-telegram" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">{t.hero.note}</p>
          </div>
          <TrustedBy className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
        <ProductMotion
          name="ringcentral"
          label={t.hero.motionLabel}
          pauseLabel={t.hero.pauseMotion}
          playLabel={t.hero.playMotion}
          plate={PLATE}
          className="mt-10 sm:mt-12"
        />
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="rc-two-ways-heading">
          <h2
            id="rc-two-ways-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.twoWays.heading}
          </h2>
          <TwoWays />
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="rc-how-heading">
          <h2
            id="rc-how-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.how.heading}
          </h2>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <StepList steps={steps} className="lg:col-span-5" />
            <GraphitePlate
              crop={{ pos: "20% 70%", flip: true }}
              className="grid place-items-center px-4 py-8 sm:p-10 lg:col-span-7"
            >
              <MessageAnatomy />
            </GraphitePlate>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="rc-features-heading">
          <h2
            id="rc-features-heading"
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
        <section
          aria-labelledby="rc-consent-heading"
          className="bg-card border-border rounded-xs border p-6 sm:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <ShieldCheck className="text-accent h-6 w-6" aria-hidden="true" />
              <h2
                id="rc-consent-heading"
                className="text-foreground mt-4 text-2xl font-normal tracking-tight"
              >
                {t.consent.heading}
              </h2>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                {t.consent.intro}
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
              {consentKeys.map((key) => (
                <li key={key} className="border-border border-t pt-5">
                  <h3 className="text-foreground text-lg font-normal tracking-tight">
                    {t.consent[key].title}
                  </h3>
                  <p className="text-muted-foreground mt-1.5 text-base leading-relaxed">
                    {t.consent[key].text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="rc-faq-heading">
          <h2
            id="rc-faq-heading"
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
          aria-labelledby="rc-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="rc-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            {t.start.heading}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            {t.start.body}
          </p>
          <GetDemoLink product="ringcentral-telegram" className="mt-7 text-sm" />
          <p className="text-muted-foreground/70 mx-auto mt-8 max-w-2xl text-xs leading-relaxed">
            {t.start.trademark}
          </p>
        </section>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
