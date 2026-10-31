import { GetDemoLink } from "@/components/demo/GetDemoLink";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  Mic,
  BookOpen,
  MessageSquare,
  ListChecks,
  FileText,
  Languages,
  ShieldCheck,
  Volume2,
  GraduationCap,
  Gauge,
  Check,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { TrustedBy } from "@/components/layout/TrustedBy";
import {
  FAQPageJsonLd,
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { elpCopy } from "@/i18n/pages/elp-practice";
import { localeServerSideProps } from "@/i18n/server";

/**
 * Organic SEO landing page for TruckTalk, our CDL English Language Proficiency
 * (ELP) practice tool. This is a marketing page only — every CTA funnels to the
 * shared /get-a-demo page. It does not link out to the live product or surface
 * any pricing. Indexed and registered in
 * sitemap.xml.tsx + api/indexnow.ts.
 */

// The app's cover: the page's social card, and the banner over "Inside TruckTalk" (the hero plays the film).
const COVER_IMAGE =
  "https://cdn.raisedash.com/media/landing/blog/trucktalk-elp-practice-cover.webp";

// The TruckTalk card's plate on the homepage (src/data/products.ts): the hero film plays on it.
const PLATE = "#6d4bd8";

// Copy for every section lives in src/i18n/pages/elp-practice.ts (English + Uzbek).
const ASSESSMENT = [
  { key: "interview", icon: MessageSquare },
  { key: "signs", icon: ShieldCheck },
] as const;

const FEATURES = [
  { key: "roleplay", icon: Mic },
  { key: "terms", icon: BookOpen },
  { key: "conversations", icon: MessageSquare },
  { key: "quizzes", icon: ListChecks },
  { key: "documents", icon: FileText },
  { key: "languages", icon: Languages },
] as const;

const GALLERY = [
  {
    key: "vocabulary",
    src: "https://cdn.raisedash.com/media/landing/blog/trucktalk-vocabulary.webp",
  },
  {
    key: "conversations",
    src: "https://cdn.raisedash.com/media/landing/blog/trucktalk-example-conversations.webp",
  },
  {
    key: "quiz",
    src: "https://cdn.raisedash.com/media/landing/blog/trucktalk-quiz-example.webp",
  },
] as const;

const STEPS = [
  { key: "language", icon: GraduationCap },
  { key: "practice", icon: Gauge },
  { key: "readiness", icon: Volume2 },
] as const;

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && (
        <p className="text-accent mb-3 text-sm font-medium tracking-wide uppercase">{eyebrow}</p>
      )}
      <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="text-muted-foreground mx-auto mt-4 text-lg">{sub}</p>}
    </div>
  );
}

export default function ElpPractice() {
  const t = useCopy(elpCopy);
  const faqs: FAQItem[] = t.faq.items;

  return (
    <PageLayout
      title={t.seo.title}
      description={t.seo.description}
      keywords={[
        "CDL English proficiency practice",
        "ELP practice truck drivers",
        "FMCSA English language requirement",
        "DOT English test practice",
        "CDL English language proficiency tool",
        "trucking English learning app",
        "49 CFR 391.11",
        "roadside ELP inspection",
        "fleet ELP training",
        "TruckTalk",
      ]}
      ogImage={COVER_IMAGE}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "CDL English Proficiency Practice", url: "/tools/elp-practice" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="TruckTalk: CDL English Proficiency Practice"
        description="An English Language Proficiency practice tool built specifically for CDL truck drivers, with AI voice roleplay, trucking vocabulary, example conversations, and quizzes for the FMCSA ELP requirement."
        operatingSystem={["Web", "iOS", "Android"]}
        applicationCategory="EducationalApplication"
      />
      <FAQPageJsonLd faqs={faqs} />

      {/* Hero */}
      <Container className="py-12 sm:py-16">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-accent mb-4 font-mono text-xs tracking-[0.14em] uppercase">
              {t.hero.eyebrow}
            </p>
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-[-0.03em] sm:text-[48px]">
              {t.hero.title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
              {t.hero.body}
            </p>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <GetDemoLink product="elp-practice" />
              <Link href="#inside">
                <Button variant="secondary" size="lg">
                  {t.hero.seeInside}
                </Button>
              </Link>
            </div>

            <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Check className="text-accent h-4 w-4" /> {t.hero.badges.cdlOnly}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="text-accent h-4 w-4" /> {t.hero.badges.voice}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="text-accent h-4 w-4" /> {t.hero.badges.languages}
              </span>
            </div>
          </div>
          <TrustedBy className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
        <ProductMotion
          name="elp"
          label={t.hero.motionLabel}
          pauseLabel={t.hero.pauseMotion}
          playLabel={t.hero.playMotion}
          plate={PLATE}
          className="mt-10 sm:mt-12"
        />
      </Container>

      {/* Stats */}
      <Container className="pb-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.stats.items.map((stat) => (
            <div key={stat.label} className="bg-card border-border rounded-xs border p-6">
              <div className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                {stat.value}
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground/70 mt-4 text-center text-xs">{t.stats.sources}</p>
      </Container>

      {/* The reality */}
      <Container className="pb-12">
        <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
            <div className="bg-accent/10 text-accent flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                {t.reality.title}
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{t.reality.body}</p>
            </div>
          </div>
        </div>
      </Container>

      {/* What the assessment looks like */}
      <Container className="pb-12">
        <SectionHeading
          eyebrow={t.assessment.eyebrow}
          title={t.assessment.title}
          sub={t.assessment.sub}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ASSESSMENT.map((part) => {
            const Icon = part.icon;
            return (
              <div key={part.key} className="bg-card border-border rounded-xs border p-6 sm:p-8">
                <Icon className="text-accent h-6 w-6" />
                <h3 className="text-foreground mt-4 text-xl font-normal">
                  {t.assessment[part.key].title}
                </h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">
                  {t.assessment[part.key].body}
                </p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Why generic apps fail */}
      <Container className="pb-12">
        <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                {t.generic.title}
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">{t.generic.body}</p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              {t.generic.items.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="text-accent mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Inside TruckTalk — features */}
      <div id="inside" className="scroll-mt-8">
        <Container className="pb-12">
          <SectionHeading
            eyebrow={t.features.eyebrow}
            title={t.features.title}
            sub={t.features.sub}
          />
          <div className="border-border mb-4 overflow-hidden rounded-xs border">
            <Image
              src={COVER_IMAGE}
              alt={t.features.imageAlt}
              width={2400}
              height={1350}
              sizes="(max-width: 1200px) 100vw, 1140px"
              className="h-auto w-full"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.key}
                  className="bg-card border-border rounded-xs border p-6 sm:p-8"
                >
                  <div className="bg-accent/10 text-accent flex h-11 w-11 items-center justify-center rounded-xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-foreground mt-4 text-lg font-normal">
                    {t.features[feature.key].title}
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {t.features[feature.key].body}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* AI roleplay spotlight */}
      <Container className="pb-12">
        <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="text-accent mb-3 text-sm font-medium tracking-wide uppercase">
                {t.spotlight.eyebrow}
              </p>
              <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                {t.spotlight.title}
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {`${t.spotlight.body} `}
                <Link
                  href="/features/ai-voice-roleplay-training"
                  className="text-foreground decoration-border underline underline-offset-4 transition-colors hover:decoration-current"
                >
                  {t.spotlight.fleetLink}
                </Link>
                .
              </p>
              <div className="mt-6">
                <GetDemoLink product="elp-practice" />
              </div>
            </div>
            <div className="border-border overflow-hidden rounded-xs border">
              <Image
                src="https://cdn.raisedash.com/media/landing/blog/trucktalk-ai-roleplay.webp"
                alt={t.spotlight.imageAlt}
                width={2400}
                height={1350}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Screenshot gallery */}
      <Container className="pb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {GALLERY.map((shot) => (
            <figure
              key={shot.src}
              className="bg-card border-border overflow-hidden rounded-xs border"
            >
              <Image
                src={shot.src}
                alt={t.gallery[shot.key].alt}
                width={2400}
                height={1350}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 380px"
                className="h-auto w-full"
              />
              <figcaption className="text-muted-foreground border-border border-t p-4 text-sm">
                {t.gallery[shot.key].caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      {/* How it works */}
      <Container className="pb-12">
        <SectionHeading eyebrow={t.steps.eyebrow} title={t.steps.title} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.key} className="bg-card border-border rounded-xs border p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="bg-surface-3 text-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm">
                    {i + 1}
                  </span>
                  <Icon className="text-accent h-5 w-5" />
                </div>
                <h3 className="text-foreground mt-4 text-lg font-normal">
                  {t.steps[step.key].title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t.steps[step.key].body}
                </p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Enforcement timeline */}
      <Container className="pb-12">
        <SectionHeading eyebrow={t.timeline.eyebrow} title={t.timeline.title} />
        <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
          <ol className="space-y-6">
            {t.timeline.items.map((item) => (
              <li key={item.date} className="flex gap-4 sm:gap-6">
                <div className="text-accent w-28 flex-shrink-0 text-sm font-medium sm:w-32">
                  {item.date}
                </div>
                <div className="text-muted-foreground border-border border-l pb-1 pl-4 leading-relaxed sm:pl-6">
                  {item.event}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      {/* FAQ */}
      <Container className="pb-12">
        <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-card border-border rounded-xs border p-6"
            >
              <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 font-normal [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown className="text-muted-foreground h-4 w-4 flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-muted-foreground mt-4 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>

      {/* Final CTA */}
      <Container className="pb-12">
        <div className="bg-card border-border rounded-xs border p-8 text-center sm:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            {t.cta.title}
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">{t.cta.body}</p>
          <div className="flex justify-center">
            <GetDemoLink product="elp-practice" />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
