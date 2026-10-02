import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { StepList, type PlatformStep } from "@/components/platform/StepList";
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
  HeroDemo,
  LeavingFigure,
  NewDriverFigure,
  NoAppFigure,
  ResultsFigure,
  TemplatesFigure,
} from "@/components/feedback/figures";

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

const steps: PlatformStep[] = [
  {
    title: "Pick a survey",
    description:
      "Start from a ready-made one like “Pay and home time”, or write your own. Choose anonymous or named.",
  },
  {
    title: "Send it to your groups",
    description:
      "Just pick your drivers’ Telegram groups, and we’ll post the link in each one. Drivers answer on their phone in about a minute.",
  },
  {
    title: "See what to fix first",
    description:
      "Every score, percentage, and written answer in one dashboard. Start with the lowest score.",
  },
];

const features: { title: string; text: string; figure: React.ReactNode; crop: PlateCrop }[] = [
  {
    title: "Hear it before they quit",
    text: "Ask “Are you thinking about leaving?” every month. When “Maybe” starts to grow, you still have time to fix it.",
    figure: <LeavingFigure />,
    crop: { pos: "0% 8%" },
  },
  {
    title: "Anonymous, so they’re honest",
    text: "We don’t save a name, a group, or a Telegram account with the answer. Drivers tell you what they won’t tell dispatch.",
    figure: <AnonymousFigure />,
    crop: { pos: "60% 80%" },
  },
  {
    title: "Six ready-made surveys",
    text: "Pay, home time, dispatch, equipment, safety, and new drivers. Pick one, change what you like, and send it.",
    figure: <TemplatesFigure />,
    crop: { pos: "100% 25%", flip: true },
  },
  {
    title: "Every group at once",
    text: "Search by group, driver, or truck, then select all. We post the link in every group, even if you have hundreds.",
    figure: <GroupsFigure />,
    crop: { pos: "90% 95%" },
  },
  {
    title: "No app for drivers",
    text: "Drivers tap the link in the group and answer on their phone. No app, no account, no password.",
    figure: <NoAppFigure />,
    crop: { pos: "10% 40%", flip: true },
  },
  {
    title: "Check on new drivers",
    text: "Ask at 30 days how the first month went and whether the office has their back.",
    figure: <NewDriverFigure />,
    crop: { pos: "30% 60%", flip: true },
  },
];

const faqs: FAQItem[] = [
  {
    question: "How do I get started?",
    answer:
      "Request a demo. We’ll show you how it works, share pricing, and help set it up for your groups.",
  },
  {
    question: "Can I see who is thinking about leaving?",
    answer:
      "Not in an anonymous survey. You see how many and why, not who. If you need names to follow up, send a named survey. Drivers add their name to their answers.",
  },
  {
    question: "Is it really anonymous?",
    answer:
      "We don’t save a name, a Telegram account, or the group with an anonymous answer. In a very small group, or if a driver writes about something only they did, you may still guess who wrote it.",
  },
  {
    question: "Can I write my own questions?",
    answer:
      "Yes. Written answers, single or multiple choice, and 1 to 5 ratings. Up to 20 questions in one survey.",
  },
  {
    question: "Can I ask the same questions next month?",
    answer:
      "Yes. Duplicate the survey and send it again. Each round keeps its own answers, so you can see if things got better.",
  },
  {
    question: "Can a driver answer twice?",
    answer:
      "The page stops accidental double sends. It doesn’t check who the driver is, so anyone with the link can answer while the survey is open.",
  },
];

export default function FeedbackTelegramBotPage() {
  return (
    <PageLayout
      title="Anonymous Driver Surveys in Telegram"
      description="Find out why drivers leave. Send an anonymous survey to your drivers’ Telegram groups and see pay, home time, and dispatch scores in one dashboard. No app for drivers."
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
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              Find out why drivers leave. Before the next one does.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Just pick a survey and your Telegram groups, and we’ll post the link. Drivers answer
              anonymously on their phone. You see if it’s pay, home time, dispatch, or the truck.
            </p>
            <GetDemoLink product="feedback-telegram-bot" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">We’ll set it up for your groups.</p>
          </div>
          <div className="lg:col-span-7">
            <HeroDemo />
          </div>
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="feedback-how-heading">
          <h2
            id="feedback-how-heading"
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
        <section aria-labelledby="feedback-faq-heading">
          <h2
            id="feedback-faq-heading"
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
          aria-labelledby="feedback-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="feedback-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            Ask your drivers what would make them stay
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            Get a demo. We’ll show you how it works, share pricing, and help set it up for your
            groups.
          </p>
          <GetDemoLink product="feedback-telegram-bot" className="mt-7 text-sm" />
        </section>
      </Container>
    </PageLayout>
  );
}
