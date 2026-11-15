import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { GuardFigure, SHIELD_PLATE, ShieldPlate } from "@/components/shield/figures";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { shieldCopy } from "@/i18n/pages/shield";
import { localeServerSideProps } from "@/i18n/server";
import { cn } from "@/lib/cn";

/**
 * Raisedash Shield: a free Chrome extension that warns trucking people at the
 * moment a freight scam needs them (a brand-new site asking for a password or
 * documents, a "rate confirmation" that is a program, a page that wants a
 * command pasted into Windows + R, a site on the reviewed scam list). The
 * product lives in ~/dev/projects/cargo-security (README, docs/PRIVACY.md).
 *
 * The page is short on purpose: what it is, the film, why it matters now
 * (sourced numbers and the FBI's own description of the attack), the four
 * moments with real captures, how quiet it is, three honest answers. The verb
 * is "warns": it never blocks a site, verifies a carrier or stops a theft.
 * The privacy and limits answers keep the wording of the privacy notice.
 */

/** The homepage card color (src/data/products.ts), the hero film's stage. */
const PLATE = SHIELD_PLATE;

/** The live Chrome Web Store listing (item ganiojafgdmhecgmbbffgcgpgkkeakgi). */
const STORE_URL = "https://chromewebstore.google.com/detail/ganiojafgdmhecgmbbffgcgpgkkeakgi";

/**
 * One 3D icon per number in t.problem.stats (xAI renders cut out with rembg,
 * sources in marketing/landing-icons/shield/). Files are 3x the 64 px they show at.
 */
const STAT_ICONS = [
  { src: "/brand/shield/trailer.webp", width: 253, height: 192 },
  { src: "/brand/shield/loss.webp", width: 220, height: 192 },
  { src: "/brand/shield/hook.webp", width: 134, height: 192 },
];

/** The captures in t.guards.items order, with the made-up address each page had. */
const GUARDS: { name: string; url: [string, string] }[] = [
  { name: "phishing", url: ["loadboard-signin.com", "/login"] },
  { name: "documents", url: ["carrier-compliance-check.com", "/review"] },
  { name: "download", url: ["ratecon-portal.com", "/rc/48213"] },
  { name: "clickfix", url: ["load-tracking-verify.com", "/verify"] },
];

function StoreLink({ label, className }: { label: string; className?: string }) {
  return (
    <a
      href={STORE_URL}
      target="_blank"
      rel="noopener"
      className={cn(
        "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-base transition-[background-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-[0.97] motion-reduce:active:scale-100",
        className
      )}
    >
      {label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function Shield() {
  const t = useCopy(shieldCopy);
  // One array for both the page and FAQPageJsonLd, so the schema matches what renders.
  const faqs: FAQItem[] = t.faq.items;

  return (
    <PageLayout
      title={t.seo.title}
      description={t.seo.description}
      keywords={[
        "freight fraud protection",
        "cargo theft prevention",
        "load board phishing",
        "fake rate confirmation",
        "double brokering scam",
        "trucking chrome extension",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Raisedash Shield", url: "/products/shield" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Shield"
        description="Free Chrome extension for your whole trucking or freight office. Warns about phishing pages and fake rate confirmations behind cargo and identity theft."
        operatingSystem={["Chrome"]}
        applicationCategory="SecurityApplication"
        offers={[{ price: "0" }]}
      />
      <FAQPageJsonLd faqs={faqs} />

      <Container className="py-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="text-accent mb-4 font-mono text-xs tracking-[0.14em] uppercase">
            {t.hero.eyebrow}
          </p>
          <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight text-balance sm:text-5xl">
            {t.hero.title}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
            {t.hero.body}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
            <StoreLink label={t.hero.cta} className="text-sm" />
            <span className="text-muted-foreground text-sm">{t.hero.note}</span>
          </div>
        </div>
        <ProductMotion
          name="shield"
          label={t.hero.motionLabel}
          pauseLabel={t.hero.pauseMotion}
          playLabel={t.hero.playMotion}
          plate={PLATE}
          className="mt-10 sm:mt-12"
        />
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="shield-problem-heading">
          <h2
            id="shield-problem-heading"
            className="text-foreground text-2xl font-normal tracking-tight"
          >
            {t.problem.heading}
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-relaxed">
            {t.problem.body}
          </p>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-3">
            {t.problem.stats.map((stat, i) => (
              <li key={stat.value} className="border-border border-t py-6">
                {/* Decorative: the number and its line say what it is. */}
                <Image
                  src={STAT_ICONS[i].src}
                  alt=""
                  width={STAT_ICONS[i].width}
                  height={STAT_ICONS[i].height}
                  className="mb-4 h-16 w-auto drop-shadow-[0_8px_12px_rgb(0_0_0/0.16)]"
                />
                <p className="text-foreground text-4xl font-normal tracking-tight tabular-nums">
                  {stat.value}
                </p>
                <p className="text-foreground mt-2 text-base leading-relaxed">{stat.text}</p>
                <p className="text-muted-foreground mt-2 text-sm">{stat.source}</p>
              </li>
            ))}
          </ul>
          <figure className="border-accent mt-6 max-w-3xl border-l-2 py-1 pl-6">
            <blockquote className="text-foreground text-xl leading-relaxed tracking-tight">
              “{t.problem.quote}”
            </blockquote>
            <figcaption className="text-muted-foreground mt-3 text-sm">
              <a
                href={t.problem.sources[0].href}
                target="_blank"
                rel="noopener"
                className="underline underline-offset-4"
              >
                {t.problem.quoteSource}
              </a>
            </figcaption>
          </figure>
          <p className="text-foreground mt-6 max-w-2xl text-lg leading-relaxed">
            {t.problem.quoteAfter}
          </p>
          <div className="text-muted-foreground mt-8 text-xs leading-relaxed">
            <p>{t.problem.sourcesLabel}</p>
            <ul className="mt-1 space-y-1">
              {t.problem.sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener"
                    className="underline underline-offset-4"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="shield-guards-heading">
          <h2
            id="shield-guards-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.guards.heading}
          </h2>
          <ul className="grid gap-x-5 gap-y-10 lg:grid-cols-2">
            {GUARDS.map((guard, i) => (
              <li key={guard.name}>
                <GuardFigure
                  name={guard.name}
                  url={guard.url}
                  alt={t.guards.items[i].alt}
                  index={i}
                />
                <h3 className="text-foreground mt-5 text-lg font-normal tracking-tight">
                  {t.guards.items[i].title}
                </h3>
                <p className="text-muted-foreground mt-1.5 max-w-xl text-base leading-relaxed">
                  {t.guards.items[i].text}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="shield-quiet-heading">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                id="shield-quiet-heading"
                className="text-foreground text-2xl font-normal tracking-tight"
              >
                {t.quiet.heading}
              </h2>
              <p className="text-muted-foreground mt-3 max-w-xl text-base leading-relaxed">
                {t.quiet.body}
              </p>
              <ul className="mt-6 space-y-3">
                {t.quiet.points.map((point) => (
                  <li key={point} className="text-foreground flex gap-3 text-base leading-relaxed">
                    <Check className="text-accent mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <ShieldPlate
              index={1}
              className="grid place-items-center px-6 py-8 sm:p-10 lg:col-span-7"
            >
              <Image
                src="/images/shield/popup.webp"
                alt={t.quiet.alt}
                width={760}
                height={966}
                sizes="(min-width: 640px) 340px, 75vw"
                className="h-auto w-full max-w-[340px] rounded-md shadow-[0_24px_48px_-20px_rgb(0_0_0/0.5)] ring-1 ring-black/10"
              />
            </ShieldPlate>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="shield-faq-heading">
          <h2
            id="shield-faq-heading"
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

      <Container className="pb-12 sm:pb-16">
        <section
          aria-labelledby="shield-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="shield-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            {t.cta.heading}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            {t.cta.body}
          </p>
          <StoreLink label={t.hero.cta} className="mt-7 text-sm" />
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link
              href="/products/shield/privacy"
              className="text-foreground underline underline-offset-4"
            >
              {t.cta.privacyLink}
            </Link>
            <a
              href="mailto:support@raisedash.com"
              className="text-foreground underline underline-offset-4"
            >
              {t.cta.contactSupport}
            </a>
          </div>
          <p className="text-muted-foreground/70 mx-auto mt-8 max-w-2xl text-xs leading-relaxed">
            {t.cta.operator}
          </p>
        </section>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
