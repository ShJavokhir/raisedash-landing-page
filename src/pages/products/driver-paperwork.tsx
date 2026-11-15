import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { Check, ChevronDown, ShieldCheck } from "lucide-react";
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
import { GraphitePlate, type PlateCrop } from "@/components/receipts/figures";
import {
  ApplicationsFigure,
  DocumentsFigure,
  FileRequestsFigure,
  TextMessageFigure,
} from "@/components/paperwork/figures";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { ProductMotion } from "@/components/motion/ProductMotion";
import { paperworkCopy } from "@/i18n/pages/driver-paperwork";
import { localeServerSideProps } from "@/i18n/server";

/**
 * Driver paperwork: the dashboard's Paperwork section (Documents, Applications,
 * File requests) and the driver portal where drivers finish each one.
 *
 * The pitch is for the person who hires and onboards drivers: stop printing,
 * faxing and texting for paperwork. Only claim what the product does today.
 * It collects and stores. It does not run MVRs, PSP reports or background
 * checks, does not contact past employers, and has no approve or reject step
 * (a bad file means asking again). Don't sell it as "stay compliant" or
 * "audit-ready": the site is a driver-readiness platform, not compliance
 * automation (see CLAUDE.md, product guardrails).
 *
 * Facts this page leans on, and where they live: 25 templates in four
 * categories (backend src/policies/template-library.ts); 9 application steps
 * with autosave, SSN and date of birth encrypted, only the last 4 shown
 * (src/driver-applications); up to 5 files, 25 MB each, PDF/JPG/PNG/HEIC/WebP
 * (src/file-requests/file-request.constants.ts); every request sends an email
 * and a text; drivers sign in with a 6-digit code; the sign button waits for
 * the end of the document; a published document is locked, changes go in a
 * new version; downloads use 15-minute links. When one changes, change it here.
 *
 * Copy: plain words a person would say out loud, no em dashes, "we" for what
 * the product does. No public price: the CTA goes to the demo request page.
 */

// The Driver Paperwork card's plate on the homepage (src/data/products.ts): the hero film plays on it.
const PLATE = "#0f7d8c";

// Copy for every section lives in src/i18n/pages/driver-paperwork.ts (English + Uzbek).
const parts: {
  key: "applications" | "documents" | "fileRequests";
  id: string;
  figure: React.ReactNode;
  crop: PlateCrop;
}[] = [
  {
    key: "applications",
    id: "applications",
    figure: <ApplicationsFigure />,
    crop: { pos: "15% 55%" },
  },
  {
    key: "documents",
    id: "documents",
    figure: <DocumentsFigure />,
    crop: { pos: "75% 20%", flip: true },
  },
  {
    key: "fileRequests",
    id: "file-requests",
    figure: <FileRequestsFigure />,
    crop: { pos: "45% 90%" },
  },
];

export default function DriverPaperworkPage() {
  const t = useCopy(paperworkCopy);
  // One array for both the page and FAQPageJsonLd, so the schema matches what renders.
  const faqs: FAQItem[] = t.faq.items;

  return (
    <PageLayout
      title={t.seo.title}
      description={t.seo.description}
      keywords={[
        "driver employment application",
        "online cdl driver application",
        "trucking e-signature",
        "driver onboarding paperwork",
        "collect driver documents",
        "drug and alcohol policy acknowledgment",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Driver Paperwork", url: "/products/driver-paperwork" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Driver Paperwork"
        description="Driver applications, documents to e-sign, and file requests that drivers finish on their phone. The office downloads clean PDFs."
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
            <GetDemoLink product="driver-paperwork" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">{t.hero.note}</p>
          </div>
          <TrustedBy className="mt-8 lg:mt-0 lg:shrink-0" />
        </div>
        <ProductMotion
          name="paperwork"
          label={t.hero.motionLabel}
          pauseLabel={t.hero.pauseMotion}
          playLabel={t.hero.playMotion}
          plate={PLATE}
          className="mt-10 sm:mt-12"
        />
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="pw-parts-heading">
          <h2
            id="pw-parts-heading"
            className="text-foreground mb-10 text-2xl font-normal tracking-tight"
          >
            {t.parts.heading}
          </h2>
          <div className="space-y-14 sm:space-y-20">
            {parts.map((part, index) => (
              <article
                key={part.id}
                aria-labelledby={`pw-${part.id}-heading`}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className={`min-w-0 lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <p className="text-accent mb-3 font-mono text-xs tracking-[0.14em] uppercase">
                    {t.parts[part.key].label}
                  </p>
                  <h3
                    id={`pw-${part.id}-heading`}
                    className="text-foreground text-2xl leading-snug font-normal tracking-tight sm:text-3xl"
                  >
                    {t.parts[part.key].title}
                  </h3>
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
              </article>
            ))}
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="pw-how-heading">
          <h2
            id="pw-how-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            {t.how.heading}
          </h2>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <StepList steps={t.how.steps} className="lg:col-span-5" />
            <GraphitePlate
              crop={{ pos: "20% 70%", flip: true }}
              className="grid place-items-center px-4 py-8 sm:p-10 lg:col-span-7"
            >
              <TextMessageFigure />
            </GraphitePlate>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section
          aria-labelledby="pw-privacy-heading"
          className="bg-card border-border rounded-xs border p-6 sm:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <ShieldCheck className="text-accent h-6 w-6" aria-hidden="true" />
              <h2
                id="pw-privacy-heading"
                className="text-foreground mt-4 text-2xl font-normal tracking-tight"
              >
                {t.privacy.heading}
              </h2>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                {t.privacy.body}
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
              {t.privacy.items.map((item) => (
                <li key={item.title} className="border-border border-t pt-5">
                  <h3 className="text-foreground text-lg font-normal tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-1.5 text-base leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="pw-faq-heading">
          <h2
            id="pw-faq-heading"
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
          aria-labelledby="pw-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="pw-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            {t.start.heading}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            {t.start.body}
          </p>
          <GetDemoLink product="driver-paperwork" className="mt-7 text-sm" />
        </section>
      </Container>
    </PageLayout>
  );
}

export const getServerSideProps = localeServerSideProps;
