import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  FolderOpen,
  Smartphone,
  TriangleAlert,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { TrustedBy } from "@/components/layout/TrustedBy";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/SEO";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { ScreenshotGallery } from "@/components/pti/ScreenshotGallery";
import { TelegramBotHelp, TelegramBotLink } from "@/components/telegram/TelegramLink";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { ptiCopy } from "@/i18n/pages/pti-telegram-bot";
import { localeServerSideProps } from "@/i18n/server";

const UPGRADE_LINK = "https://t.me/raisedash";
// The PTI card's homepage plate (src/data/products.ts), behind the hero loop.
const PLATE = "#9aa200";
const DEMO_LINK = "https://youtu.be/0yaCfofuQ-A";
const DEMO_EMBED = "https://www.youtube-nocookie.com/embed/0yaCfofuQ-A?rel=0";
// Visible history and stored records have different limits on the free plan.
const FREE_HISTORY_DAYS = 7;
const FREE_STORAGE_DAYS = 90;

// Copy for every section lives in src/i18n/pages/pti-telegram-bot.ts (English + Uzbek).
const benefits = [
  { key: "noApp", icon: Smartphone },
  { key: "problems", icon: TriangleAlert },
  { key: "record", icon: FolderOpen },
] as const;

const screenshots = [
  {
    key: "request",
    src: "/images/pti/telegram-request.jpg",
    width: 974,
    height: 1148,
    previewClass: "absolute bottom-0 -left-[12.5%] h-auto w-[125%] max-w-none",
  },
  {
    key: "settings",
    src: "/images/pti/group-settings.jpg",
    width: 1204,
    height: 1280,
    previewClass: "-ml-[40%] h-auto w-[180%] max-w-none",
  },
  {
    key: "report",
    src: "/images/pti/inspection-report.jpg",
    width: 1129,
    height: 1280,
    previewClass: "-ml-[30%] -mt-[50%] h-auto w-[160%] max-w-none",
  },
] as const;

const primaryLink =
  "bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
const secondaryLink =
  "border-border text-foreground hover:bg-surface-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function PtiTelegramBotPage() {
  const t = useCopy(ptiCopy);

  return (
    <PageLayout title={t.seo.title} description={t.seo.description}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "PTI Telegram Bot", url: "/products/pti-telegram-bot" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Inspections for Telegram"
        description="Guided pre-trip and post-trip inspections in Telegram, with photos, video, editable checklists, automatic requests, and shareable reports."
        operatingSystem={["Web", "iOS", "Android"]}
        offers={[{ price: "0", priceCurrency: "USD" }]}
      />

      <Container className="py-12 sm:py-16">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              {t.hero.title}
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              {t.hero.body}
            </p>
            <TelegramBotLink placement="hero" className={`${primaryLink} mt-7`}>
              {t.hero.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </TelegramBotLink>
            <p className="text-muted-foreground mt-3 text-sm">{t.hero.note}</p>
          </div>
          <TrustedBy className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
        <div id="how-it-works" className="mt-10 scroll-mt-24 sm:mt-12">
          <ProductMotion
            name="pti"
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
        <section aria-labelledby="pti-benefits-heading">
          <h2
            id="pti-benefits-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.benefits.heading}
          </h2>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ key, icon: Icon }) => (
              <li key={key} className="bg-card border-border rounded-xs border p-6">
                <div className="flex min-h-12 items-center gap-3">
                  <span className="bg-surface-2 text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xs">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="text-foreground text-base font-medium">{t.benefits[key].title}</h3>
                </div>
                <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                  {t.benefits[key].description}
                </p>
              </li>
            ))}
          </ul>
          <details className="group border-border mt-8 border-y">
            <summary className="text-foreground flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-sm [&::-webkit-details-marker]:hidden">
              {t.faq.question}
              <ChevronDown className="h-4 w-4 shrink-0 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <ul className="text-muted-foreground max-w-3xl list-disc space-y-3 pr-4 pb-5 pl-5 text-sm leading-relaxed">
              <li>
                {`${t.faq.required} `}
                <a
                  href="https://www.ecfr.gov/current/title-49/section-396.13"
                  className="text-foreground underline underline-offset-4"
                >
                  49 CFR 396.13
                </a>
                {` ${t.faq.and} `}
                <a
                  href="https://www.ecfr.gov/current/title-49/section-392.7"
                  className="text-foreground underline underline-offset-4"
                >
                  392.7
                </a>
                .
              </li>
              <li>
                {`${t.faq.dvir} `}
                <a
                  href="https://www.ecfr.gov/current/title-49/section-396.11"
                  className="text-foreground underline underline-offset-4"
                >
                  49 CFR 396.11
                </a>
                .
              </li>
              <li>{t.faq.scope}</li>
            </ul>
          </details>
        </section>
      </Container>

      <Container id="demo" className="scroll-mt-24 pb-12 sm:pb-16">
        <section
          aria-labelledby="pti-demo-heading"
          className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-5">
            <h2
              id="pti-demo-heading"
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
          <div className="border-border aspect-video overflow-hidden rounded-xs border bg-black lg:col-span-7">
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
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <ScreenshotGallery
          screenshots={screenshots.map(({ key, ...image }) => ({
            ...image,
            ...t.screenshots[key],
          }))}
        />
      </Container>

      <Container id="pricing" className="scroll-mt-24 pb-12 sm:pb-16">
        <h2 className="text-foreground mb-6 text-2xl font-normal tracking-tight">
          {t.plans.heading}
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              ...t.plans.free,
              features: [...t.plans.free.features, t.plans.free.history(FREE_HISTORY_DAYS)],
              href: null,
              primary: true,
            },
            { ...t.plans.paid, href: UPGRADE_LINK, primary: false },
          ].map((plan) => (
            <section
              key={plan.name}
              aria-label={plan.label}
              className="bg-card border-border flex flex-col rounded-xs border p-6 sm:p-8"
            >
              <h3 className="text-foreground text-xl font-normal">{plan.name}</h3>
              <ul className="my-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-muted-foreground flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <Check className="text-foreground mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.href ? (
                <a
                  href={plan.href}
                  className={`${plan.primary ? primaryLink : secondaryLink} mt-auto self-start`}
                >
                  {plan.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <TelegramBotLink
                  placement="free_plan"
                  className={`${plan.primary ? primaryLink : secondaryLink} mt-auto self-start`}
                >
                  {plan.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </TelegramBotLink>
              )}
            </section>
          ))}
        </div>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          {t.plans.storageNote(FREE_STORAGE_DAYS)}
        </p>
      </Container>
      <TelegramBotHelp />
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
