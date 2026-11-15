import { Check, Gauge, TriangleAlert, Video } from "lucide-react";
import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { TrustedBy } from "@/components/layout/TrustedBy";
import { BreadcrumbJsonLd, FAQPageJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/SEO";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { Shot } from "@/components/samsara/Shot";
import { BoardTabs } from "@/components/samsara/BoardTabs";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { samsaraCopy } from "@/i18n/pages/samsara-alerts";
import { localeServerSideProps } from "@/i18n/server";

/**
 * Landing page for the Samsara → Telegram alerting service
 * (`raisedash-apps/samsara-alerts`), using the shared Raisedash header and footer.
 * Product calls to action lead to the shared demo request page.
 *
 * Written for a fleet owner who already pays for Samsara, not for an engineer.
 * Keep it short — the screenshots do the selling. No API endpoints, no raw
 * Samsara behaviour labels, no architecture.
 *
 * Every image is a real capture from a live fleet, redacted in the file itself
 * (see `Shot`). If you add one, redact it the same way before it reaches
 * `public/` — that directory deploys.
 */

/** The homepage card color (src/data/products.ts), the hero film's stage. */
const PLATE = "#009a74";

// Copy for every section lives in src/i18n/pages/samsara-alerts.ts (English + Uzbek).
const SENDS = [
  { key: "video", icon: Video },
  { key: "speeding", icon: Gauge },
  { key: "faults", icon: TriangleAlert },
] as const;

export default function SamsaraAlerts() {
  const t = useCopy(samsaraCopy);

  return (
    <PageLayout title={t.seo.title} description={t.seo.description}>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Samsara Telegram Alerts", url: "/tools/samsara-alerts" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Samsara Alerts for Telegram"
        description="Samsara safety events, speeding and engine faults posted to your Telegram group with dashcam video. Weekly fleet reports pinned every Friday. Free trial included."
        operatingSystem={["Web"]}
        applicationCategory="BusinessApplication"
      />
      <FAQPageJsonLd faqs={t.faqs} />

      {/* ----------------------------------------------------------- hero --- */}
      <Container className="py-12 sm:py-16">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-accent mb-4 font-mono text-xs tracking-[0.14em] uppercase">
              {t.hero.eyebrow}
            </p>
            <h1 className="text-foreground text-4xl leading-[1.08] font-normal tracking-[-0.03em] sm:text-[48px]">
              {t.hero.title}
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
              {t.hero.body}
            </p>
            <div className="mt-8">
              <GetDemoLink product="samsara-alerts" />
            </div>
          </div>
          <TrustedBy className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
        <ProductMotion
          name="samsara"
          label={t.hero.motionLabel}
          pauseLabel={t.hero.pauseMotion}
          playLabel={t.hero.playMotion}
          plate={PLATE}
          className="mt-10 sm:mt-12"
        />
      </Container>

      {/* ----------------------------------------------------- the group --- */}
      <Container className="pb-14">
        {/* The full two-pane window is unreadable under ~640px, so phones get
            the topic list on its own. The hidden one never enters the viewport,
            so next/image never fetches it. */}
        <div className="sm:hidden">
          <Shot
            title="Samsara Events · Telegram"
            src="/images/samsara/telegram-topics.webp"
            alt={t.group.altPhone}
            width={497}
            height={1500}
            sizes="100vw"
          />
        </div>
        <div className="hidden sm:block">
          <Shot
            title="Samsara Events · Telegram"
            src="/images/samsara/telegram-group.webp"
            alt={t.group.altDesktop}
            width={1600}
            height={1548}
            sizes="(max-width: 1200px) 100vw, 1140px"
          />
        </div>
        <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed">
          {t.group.caption}
        </p>
        <p className="text-muted-foreground/70 mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed">
          {t.group.redacted}
        </p>
      </Container>

      {/* ------------------------------------------------------- the why --- */}
      <Container className="pb-14">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            {t.why.heading}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {t.why.items.map((w, i) => (
            <div
              key={w.title}
              className={`rounded-xs border p-6 sm:p-8 ${
                i === t.why.items.length - 1
                  ? "border-accent/30 bg-accent/[0.04]"
                  : "border-border bg-card"
              }`}
            >
              <h3 className="text-foreground text-base font-normal">{w.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* --------------------------------------------------- what arrives --- */}
      <Container className="pb-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SENDS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.key} className="bg-card border-border rounded-xs border p-6 sm:p-8">
                <div className="bg-accent/10 text-accent flex h-11 w-11 items-center justify-center rounded-xs">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-foreground mt-4 text-lg font-normal">{t.sends[s.key].title}</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {t.sends[s.key].body}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mx-auto mt-4 max-w-[720px]">
          <Shot
            src="/images/samsara/alert-engine-fault.webp"
            alt={t.sends.faultsAlt}
            width={990}
            height={886}
            sizes="(max-width: 760px) 100vw, 720px"
          />
        </div>
      </Container>

      {/* --------------------------------------------------------- events --- */}
      <Container className="pb-14">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            {t.events.heading}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {t.events.list.map((e) => (
            <div
              key={e}
              className="border-border bg-card flex items-center gap-2.5 rounded-xs border px-3.5 py-3"
            >
              <span className="bg-accent/60 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="text-foreground text-sm">{e}</span>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed">
          {t.events.note}
        </p>
      </Container>

      {/* --------------------------------------------------------- boards --- */}
      <Container className="pb-14">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-accent mb-3 text-sm font-medium tracking-wide uppercase">
            {t.boards.eyebrow}
          </p>
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            {t.boards.heading}
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{t.boards.body}</p>
        </div>
        <BoardTabs />
      </Container>

      {/* ---------------------------------------------------------- trial --- */}
      <Container className="pb-14">
        <div className="mx-auto max-w-2xl">
          <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
            <div className="border-accent/35 bg-accent/[0.07] mb-7 rounded-xs border px-5 py-4 text-center">
              <p className="text-accent text-lg font-medium tracking-[-0.01em] sm:text-xl">
                {t.pricing.trial}
              </p>
              <p className="text-muted-foreground mt-1 text-sm">{t.pricing.trialNote}</p>
            </div>

            <div className="space-y-3">
              {t.pricing.features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <Check className="text-accent mt-1 h-4 w-4 shrink-0" />
                  <span className="text-foreground text-sm">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <GetDemoLink product="samsara-alerts" />
            </div>
          </div>
        </div>
      </Container>

      {/* ------------------------------------------------------------ faq --- */}
      <Container className="pb-14">
        <div className="mx-auto max-w-3xl">
          <div className="border-border divide-border bg-card divide-y overflow-hidden rounded-xs border">
            {t.faqs.map((f) => (
              <details key={f.question} className="group">
                <summary className="hover:bg-surface-2 flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors duration-150 sm:px-6">
                  <span className="text-foreground text-base">{f.question}</span>
                  <span className="text-muted-foreground shrink-0 text-xl leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-muted-foreground px-5 pb-5 text-sm leading-relaxed sm:px-6">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>

      {/* ----------------------------------------------------- final cta ---- */}
      <Container className="pb-12">
        <div className="bg-card border-border rounded-xs border p-6 text-center sm:p-12">
          <h2 className="text-foreground mx-auto max-w-2xl text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            {t.finalCta}
          </h2>
          <div className="mt-8 flex justify-center">
            <GetDemoLink product="samsara-alerts" />
          </div>
        </div>
      </Container>

      <Container className="pb-8">
        <p className="text-muted-foreground max-w-xl text-xs leading-relaxed">{t.trademark}</p>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
