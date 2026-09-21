import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Check,
  ChevronDown,
  ClipboardList,
  FolderOpen,
  KeyRound,
  Smartphone,
  TriangleAlert,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/SEO";
import { ScreenshotGallery } from "@/components/pti/ScreenshotGallery";

const BOT_LINK = "https://t.me/raisedashbot";
const UPGRADE_LINK = "https://t.me/raisedash";
const DEMO_LINK = "https://youtu.be/0yaCfofuQ-A";
// Visible history and stored records have different limits on the free plan.
const FREE_HISTORY_DAYS = 7;
const FREE_STORAGE_DAYS = 90;

const benefits = [
  {
    title: "No extra app to install",
    icon: Smartphone,
    description:
      "Drivers open the inspection link from Telegram in their browser. No extra app taking up phone storage.",
  },
  {
    title: "No driver accounts to set up",
    icon: KeyRound,
    description: "No signup, account invitations, or passwords for drivers to remember.",
  },
  {
    title: "Stop sending every request yourself",
    icon: CalendarClock,
    description: "Set a schedule and let the bot ask drivers for their inspections.",
  },
  {
    title: "Give drivers a checklist to follow",
    icon: ClipboardList,
    description:
      "Each step shows what to check and photograph, so drivers aren’t relying on memory.",
  },
  {
    title: "Report problems before leaving",
    icon: TriangleAlert,
    description:
      "Drivers can flag worn tires, broken lights, or visible damage and send photos to the office.",
  },
  {
    title: "Keep a record for later",
    icon: FolderOpen,
    description:
      "Keep photos, reported problems, and inspection times together for audits or reviews after an accident.",
  },
];

const screenshots = [
  {
    title: "In your driver group",
    description: "The bot sends an inspection link directly to your Telegram group.",
    src: "/images/pti/telegram-request.jpg",
    width: 974,
    height: 1148,
    previewClass: "absolute bottom-0 -left-[12.5%] h-auto w-[125%] max-w-none",
    alt: "A driver Telegram group with a PTI request and the Raisedash bot replying with an inspection link.",
  },
  {
    title: "Checklist and automatic requests",
    description:
      "Choose what drivers check. Request inspections on a schedule or after a few days without one.",
    src: "/images/pti/group-settings.jpg",
    width: 1204,
    height: 1280,
    previewClass: "-ml-[40%] h-auto w-[180%] max-w-none",
    alt: "Group settings showing scheduled and inactivity-based inspection requests, plus an inspection checklist.",
  },
  {
    title: "Inspection reports",
    description: "Review the photos, videos, and reported problems. Share the report with a link.",
    src: "/images/pti/inspection-report.jpg",
    width: 1129,
    height: 1280,
    previewClass: "-ml-[30%] -mt-[50%] h-auto w-[160%] max-w-none",
    alt: "A submitted pre-trip inspection report with the inspection time, truck photos, and no problems reported. Identifying details are redacted.",
  },
];

const freeFeatures = [
  "Guided photo and video inspections",
  "Custom inspection checklist",
  "Scheduled or inactivity-based requests",
  `${FREE_HISTORY_DAYS} days of inspection history`,
];
const paidFeatures = [
  "Everything in Free",
  "Update settings across all groups at once",
  "Longer inspection history",
  "Download inspection reports as PDFs",
  "Request custom features",
  "Onboarding support for your team",
  "Data processing agreement (DPA)",
  "Optional storage in your own buckets",
];

const primaryLink =
  "bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
const secondaryLink =
  "border-border text-foreground hover:bg-surface-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function PtiTelegramBotPage() {
  return (
    <PageLayout
      title="Free Pre-Trip Inspections in Telegram"
      description="Drivers follow your checklist and send photos or video to your Telegram group. Schedule inspection requests. Free to start, with a paid fleet dashboard available."
    >
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
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              Pre-trip inspections in Telegram.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Drivers follow your checklist. You get the photos, videos, and reported problems in
              your group.
            </p>
            <a href={BOT_LINK} className={`${primaryLink} mt-7`}>
              Add @raisedashbot <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="text-muted-foreground mt-3 text-sm">
              Free. No signup or payment required.
            </p>
          </div>
          <div id="how-it-works" className="scroll-mt-24 lg:col-span-7">
            <div className="border-border aspect-video overflow-hidden rounded-xs border bg-black">
              <iframe
                className="h-full w-full"
                src="https://www.youtube-nocookie.com/embed/0yaCfofuQ-A?rel=0"
                title="Raisedash PTI Telegram bot demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <a
              href={DEMO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm underline-offset-4 hover:underline"
            >
              Watch on YouTube <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="pti-benefits-heading">
          <h2
            id="pti-benefits-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            Why use the bot?
          </h2>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ title, description, icon: Icon }) => (
              <li key={title} className="bg-card border-border rounded-xs border p-6">
                <div className="flex min-h-12 items-center gap-3">
                  <span className="bg-surface-2 text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-xs">
                    <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="text-foreground text-base font-medium">{title}</h3>
                </div>
                <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                  {description}
                </p>
              </li>
            ))}
          </ul>
          <details className="group border-border mt-8 border-y">
            <summary className="text-foreground flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-sm [&::-webkit-details-marker]:hidden">
              Are pre-trip inspections required?
              <ChevronDown className="h-4 w-4 shrink-0 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <ul className="text-muted-foreground max-w-3xl list-disc space-y-3 pr-4 pb-5 pl-5 text-sm leading-relaxed">
              <li>
                Yes. FMCSA requires drivers to check that the vehicle is safe before driving.{" "}
                <a
                  href="https://www.ecfr.gov/current/title-49/section-396.13"
                  className="text-foreground underline underline-offset-4"
                >
                  49 CFR 396.13
                </a>{" "}
                and{" "}
                <a
                  href="https://www.ecfr.gov/current/title-49/section-392.7"
                  className="text-foreground underline underline-offset-4"
                >
                  392.7
                </a>
                .
              </li>
              <li>
                A written DVIR is generally not required when no defects are found or reported.{" "}
                <a
                  href="https://www.ecfr.gov/current/title-49/section-396.11"
                  className="text-foreground underline underline-offset-4"
                >
                  49 CFR 396.11
                </a>
                .
              </li>
              <li>
                The bot records what drivers submit. It does not certify that a truck is safe or
                replace required DVIR signatures and repair records.
              </li>
            </ul>
          </details>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <ScreenshotGallery screenshots={screenshots} />
      </Container>

      <Container id="pricing" className="scroll-mt-24 pb-12 sm:pb-16">
        <h2 className="text-foreground mb-6 text-2xl font-normal tracking-tight">Free and paid</h2>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            {
              name: "Free",
              features: freeFeatures,
              href: BOT_LINK,
              cta: "Start free in Telegram",
              primary: true,
            },
            {
              name: "Paid",
              features: paidFeatures,
              href: UPGRADE_LINK,
              cta: "Ask about pricing",
              primary: false,
            },
          ].map((plan) => (
            <section
              key={plan.name}
              aria-label={`${plan.name} version`}
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
              <a
                href={plan.href}
                className={`${plan.primary ? primaryLink : secondaryLink} mt-auto self-start`}
              >
                {plan.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </section>
          ))}
        </div>
        <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
          We store free inspection records for up to {FREE_STORAGE_DAYS} days. Subscribe to access
          older records still in storage.
        </p>
      </Container>
    </PageLayout>
  );
}
