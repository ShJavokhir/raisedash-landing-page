import { ChevronDown, Send } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { StepList, type PlatformStep } from "@/components/platform/StepList";
import {
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";
import {
  AiCheckFigure,
  DashboardFigure,
  ExpensesFigure,
  FastPhotosFigure,
  FilesFigure,
  GraphiteCard,
  GraphitePlate,
  LinkFigure,
  NoAppFigure,
  type PlateCrop,
} from "@/components/receipts/figures";
import { ReceiptTour } from "@/components/receipts/ReceiptTour";

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

const CONTACT_LINK = "https://t.me/raisedash";

const steps: PlatformStep[] = [
  {
    title: "Ask for the receipt",
    description:
      "Ask in your Telegram group, like “Mike, could you share your receipt?” We reply with a link.",
  },
  {
    title: "The driver sends a photo",
    description:
      "The link opens on the driver’s phone. They take a photo of the receipt and type the total.",
  },
  {
    title: "All receipts in one dashboard",
    description:
      "Every driver’s receipts in one list, with the amount and the photos. No digging through chats when it’s time to pay drivers back.",
  },
];

const features: {
  title: string;
  text: string;
  figure: React.ReactNode;
  crop: PlateCrop;
  badge?: string;
}[] = [
  {
    title: "Photos, PDFs, and videos",
    text: "Up to 5 files on one receipt. Take a new photo or pick one from the phone.",
    figure: <FilesFigure />,
    crop: { pos: "0% 8%" },
  },
  {
    title: "A link for every receipt",
    text: "Open it to see the photos and the amount. Send it to accounting or keep it for later.",
    figure: <LinkFigure />,
    crop: { pos: "60% 80%" },
  },
  {
    title: "Lumpers, fuel, tolls, and more",
    text: "Any receipt a driver gets on the road. Scale tickets, parking, and repairs work the same way.",
    figure: <ExpensesFigure />,
    crop: { pos: "100% 25%", flip: true },
  },
  {
    title: "No app to install",
    text: "The link opens right on the phone. No app, no account, no password.",
    figure: <NoAppFigure />,
    crop: { pos: "90% 95%" },
  },
  {
    title: "Photos send fast",
    text: "We make photos smaller before they upload, so they send fast, even on a weak signal.",
    figure: <FastPhotosFigure />,
    crop: { pos: "10% 40%", flip: true },
  },
  {
    title: "Check if receipts are AI generated",
    text: "We’ll check each receipt photo and warn you if it looks AI generated, before you pay the driver back.",
    figure: <AiCheckFigure />,
    crop: { pos: "30% 60%", flip: true },
    badge: "Coming soon",
  },
];

const faqs: FAQItem[] = [
  {
    question: "How do I get started?",
    answer:
      "Message us on Telegram at @raisedash. We’ll set it up in your drivers’ groups and show your team how it works.",
  },
  {
    question: "Does it pay drivers back?",
    answer:
      "No. You pay drivers the way you do now. We put every receipt in one list with the driver, the amount, and the photos, so you know who to pay and how much.",
  },
  {
    question: "What if a driver types the wrong amount?",
    answer:
      "You can fix the amount or delete the receipt in the dashboard. The receipt link shows the change.",
  },
  {
    question: "Does it read the amount from the photo?",
    answer:
      "No. The driver types the total. The photos stay with the receipt, so you can check the amount.",
  },
  {
    question: "What can drivers send?",
    answer:
      "Photos, PDFs, and videos. Up to 5 files on one receipt, up to 100 MB each. The amount is in US dollars.",
  },
  {
    question: "How long does the link work?",
    answer: "24 hours. After that, just type “receipt” again for a new link.",
  },
];

const primaryLink =
  "bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

function ContactButton({ className }: { className?: string }) {
  return (
    <a href={CONTACT_LINK} className={`${primaryLink} ${className ?? ""}`}>
      Message us on Telegram <Send className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

export default function ReceiptsTelegramBotPage() {
  return (
    <PageLayout
      title="Collect Driver Receipts in Telegram"
      description="Type “receipt” in your Telegram group and we send a link to capture it. Every receipt shows up in one dashboard, so paying drivers back is easy. No app for drivers."
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
        description="Collect driver receipts in Telegram groups. Type receipt, get a link, and send photos, PDFs, or videos with the amount. Every receipt shows up in one dashboard, which makes paying drivers back easier."
        operatingSystem={["Web", "iOS", "Android"]}
      />
      <FAQPageJsonLd faqs={faqs} />

      <Container className="py-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              Collect driver receipts in Telegram.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Just type the word “receipt” in your Telegram group, and we’ll send a link to capture
              it. Every receipt shows up in your dashboard, so you know who to pay back and how
              much.
            </p>
            <ContactButton className="mt-7" />
            <p className="text-muted-foreground mt-3 text-sm">We’ll set it up for your groups.</p>
          </div>
          <div className="lg:col-span-7">
            <ReceiptTour />
          </div>
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="receipts-how-heading">
          <h2
            id="receipts-how-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            How it works
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

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="receipts-features-heading">
          <h2
            id="receipts-features-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            What you get
          </h2>
          <ul className="grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <GraphiteCard key={feature.title} {...feature} />
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
            Questions
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
          aria-labelledby="receipts-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="receipts-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            Start collecting receipts
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            Message us on Telegram. We’ll tell you the price and set it up for your groups.
          </p>
          <ContactButton className="mt-7" />
        </section>
      </Container>
    </PageLayout>
  );
}
