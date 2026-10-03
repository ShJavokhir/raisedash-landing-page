import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { Check, ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";
import { GraphiteCard, GraphitePlate, type PlateCrop } from "@/components/receipts/figures";
import {
  AnyEventFigure,
  AutomaticFigure,
  BuildLessonFigure,
  DriverPageFigure,
  FromTheClipFigure,
  HeroFigure,
  RankFigure,
  RecordFigure,
  TwoWays,
} from "@/components/coaching/figures";

/**
 * Driver coaching: a short lesson sent to the driver's phone after a safety
 * event, with the dashcam clip, assigned by hand or by rules on Samsara and
 * Motive events. To a buyer it's its own product; underneath it's the same
 * training, driver portal and driver record as Orientation.
 *
 * Owner confirmed live on 2026-10-02: manual coaching, the clip inside the
 * lesson, rule-based automatic or approve-first assignment, and Motive (see
 * the header in components/coaching/figures.tsx for what was verified in code
 * and what wasn't).
 *
 * Guardrails: we send coaching and keep the record. We never decide fault,
 * preventability or discipline, and never promise a record wins a lawsuit or
 * keeps you "compliant" (driver-readiness platform, see CLAUDE.md). Record
 * contents must match /platform/training-evidence. The ATRI figures are the
 * average verdict size in its database (2020 study, via FreightWaves).
 *
 * Copy: keep it short. One idea per sentence, no eyebrows or captions that
 * repeat the heading, no em dashes. The owner pushed back on the first,
 * wordier version (2026-10-02): people skim, so less text wins.
 */

const ATRI_SOURCE =
  "https://www.freightwaves.com/news/atri-study-reveals-nuclear-verdicts-on-the-rise";

const parts: {
  id: string;
  title: string;
  text: string;
  points: string[];
  figure: React.ReactNode;
  crop: PlateCrop;
}[] = [
  {
    id: "clip",
    title: "The driver sees exactly what you saw",
    text: "They watch their own clip, then a short lesson, then answer a few questions.",
    points: ["A few minutes, on their phone.", "You see when they finished and how they answered."],
    figure: <FromTheClipFigure />,
    crop: { pos: "15% 55%" },
  },
  {
    id: "automatic",
    title: "Samsara and Motive events assign it for you",
    text: "Set a rule once, like 3 following-distance events in 7 days, and we send the lesson.",
    points: ["Send right away, or wait for your OK.", "One set of rules for a mixed fleet."],
    figure: <AutomaticFigure />,
    crop: { pos: "75% 20%", flip: true },
  },
  {
    id: "any-event",
    title: "Coach for what the camera can’t see",
    text: "An accident, a roadside violation, a customer complaint. Pick the driver and the lesson.",
    points: ["Works without a telematics connection.", "Send to one driver or many."],
    figure: <AnyEventFigure />,
    crop: { pos: "45% 90%" },
  },
];

const features: { title: string; text: string; figure: React.ReactNode; crop: PlateCrop }[] = [
  {
    title: "Lessons from your policy",
    text: "Describe the rule. AI drafts the lesson, you approve it.",
    figure: <BuildLessonFigure />,
    crop: { pos: "60% 80%" },
  },
  {
    title: "See who needs it most",
    text: "Drivers ranked by events per 1,000 miles, not raw counts.",
    figure: <RankFigure />,
    crop: { pos: "90% 95%" },
  },
  {
    title: "Next to orientation",
    text: "Onboarding and every coaching on one driver page.",
    figure: <DriverPageFigure />,
    crop: { pos: "30% 60%", flip: true },
  },
];

/** Cameras already make drivers wary. Say why this feels fair, briefly. */
const fairness = [
  { title: "They see the clip", text: "Not a summary of it." },
  { title: "You skip false alerts", text: "So coaching only goes out when it fits." },
  { title: "Only theirs", text: "No driver sees a coworker’s events." },
];

const faqs: FAQItem[] = [
  {
    question: "Do I need Samsara or Motive?",
    answer:
      "No. You can send coaching by hand for anything. Connecting Samsara or Motive adds the clips and automatic rules.",
  },
  {
    question: "We already coach in Samsara or Motive. Why add this?",
    answer:
      "Raisedash covers events the camera doesn’t see, gives a mixed fleet one set of rules, and keeps coaching on the same record as training. Switch camera vendors and your history stays.",
  },
  {
    question: "Do drivers need an app?",
    answer: "No. They get a text with a link and sign in with a 6-digit code.",
  },
  {
    question: "What if the camera got it wrong?",
    answer: "Skip it. With approve-first rules, a false alert never reaches the driver.",
  },
  {
    question: "Does Raisedash decide fault or discipline?",
    answer: "No. We send coaching and keep the record. What happens next is up to you.",
  },
  {
    question: "How do I get started?",
    answer: "Get a demo. We’ll share pricing and help you send your first coaching.",
  },
];

export default function DriverCoachingPage() {
  return (
    <PageLayout
      title="Driver Coaching Software for Trucking Fleets"
      description="Send drivers a short coaching lesson with their dashcam clip after a safety event. Assign it automatically from Samsara and Motive, and keep a record of every coaching."
      keywords={[
        "driver coaching software",
        "fleet driver coaching",
        "dashcam coaching",
        "samsara driver coaching",
        "motive driver coaching",
        "truck driver safety coaching",
        "safety event coaching",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Driver Coaching", url: "/products/driver-coaching" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Driver Coaching"
        description="Coaching lessons sent to drivers' phones after safety events, with the dashcam clip, assigned by hand or automatically from Samsara and Motive. Every coaching is kept on the driver's record."
        operatingSystem={["Web", "iOS", "Android"]}
      />
      <FAQPageJsonLd faqs={faqs} />

      <Container className="py-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              Coach drivers the day it happens.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Send a short lesson with the dashcam clip. The driver finishes it on their phone.
            </p>
            <GetDemoLink product="driver-coaching" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">Works with Samsara and Motive.</p>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <HeroFigure />
          </div>
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="dc-two-ways-heading">
          <h2
            id="dc-two-ways-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            The camera saw it. Then what?
          </h2>
          <TwoWays />
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <div className="space-y-14 sm:space-y-20">
          {parts.map((part, index) => (
            <section
              key={part.id}
              aria-labelledby={`dc-${part.id}-heading`}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className={`min-w-0 lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <h2
                  id={`dc-${part.id}-heading`}
                  className="text-foreground text-2xl leading-snug font-normal tracking-tight sm:text-3xl"
                >
                  {part.title}
                </h2>
                <p className="text-muted-foreground mt-4 text-base leading-relaxed">{part.text}</p>
                <ul className="mt-5 space-y-3">
                  {part.points.map((point) => (
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
            </section>
          ))}
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section
          aria-labelledby="dc-record-heading"
          className="bg-card border-border rounded-xs border p-6 sm:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-6">
              <h2
                id="dc-record-heading"
                className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
              >
                Proof you coached, when it matters
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                After a crash, lawyers ask for your dashcam events. Flagged events with no coaching
                after them look like you knew and did nothing.
              </p>
              <p className="text-foreground mt-4 text-base leading-relaxed">
                Raisedash keeps the event, the lesson, and when the driver finished it.
              </p>
              <p className="text-muted-foreground/80 border-border mt-6 border-t pt-4 text-xs leading-relaxed">
                Average trucking verdicts grew from $2.3M in 2010 to $22.3M in 2018 (
                <a
                  href={ATRI_SOURCE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground underline underline-offset-2"
                >
                  ATRI
                </a>
                ). Not legal advice.
              </p>
            </div>
            <GraphitePlate
              crop={{ pos: "20% 70%", flip: true }}
              className="grid min-h-[420px] place-items-center px-4 py-8 sm:p-10 lg:col-span-6"
            >
              <RecordFigure />
            </GraphitePlate>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <ul className="grid gap-x-5 gap-y-10 md:grid-cols-3">
          {features.map((feature) => (
            <GraphiteCard key={feature.title} {...feature} />
          ))}
        </ul>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="dc-fairness-heading">
          <h2
            id="dc-fairness-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            Fair to drivers
          </h2>
          <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-3">
            {fairness.map((item) => (
              <li key={item.title} className="border-border border-t pt-5">
                <h3 className="text-foreground text-lg font-normal tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground mt-1 text-base leading-relaxed">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="dc-faq-heading">
          <h2
            id="dc-faq-heading"
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
          aria-labelledby="dc-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="dc-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            Coach it while it’s still fresh
          </h2>
          <GetDemoLink product="driver-coaching" className="mt-7 text-sm" />
        </section>
      </Container>
    </PageLayout>
  );
}
