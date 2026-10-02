import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { ChevronDown, ShieldCheck } from "lucide-react";
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
  AnywhereFigure,
  ChannelDemo,
  CoachFigure,
  MessageAnatomy,
  MissedFigure,
  SearchFigure,
  ShareFigure,
  SkipFigure,
  TwoWays,
} from "@/components/ringcentral/figures";

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

const steps: PlatformStep[] = [
  {
    title: "Get a demo",
    description:
      "Tell us which RingCentral account to connect and which Telegram chat the calls should go to.",
  },
  {
    title: "Connect RingCentral",
    description:
      "Your RingCentral admin gives us access to the call log, and we add our bot to your chat. We’ll walk you through it.",
  },
  {
    title: "Listen",
    description:
      "New calls show up in the chat on their own. Open Telegram and tap play. Older calls stay in RingCentral.",
  },
];

const features: { title: string; text: string; figure: React.ReactNode; crop: PlateCrop }[] = [
  {
    title: "Settle “he said, she said”",
    text: "A broker says the rate was $2,400. Your dispatcher says $2,600. Search the broker’s name in the chat and play the call.",
    figure: <SearchFigure />,
    crop: { pos: "0% 8%" },
  },
  {
    title: "Coach new people",
    text: "Listen to a new dispatcher’s calls from their first week. Catch the mistakes early, before a driver or a customer complains.",
    figure: <CoachFigure />,
    crop: { pos: "60% 80%" },
  },
  {
    title: "See the calls nobody took",
    text: "Missed calls and voicemails show up too, so you know when a customer couldn’t reach anyone.",
    figure: <MissedFigure />,
    crop: { pos: "100% 25%", flip: true },
  },
  {
    title: "Listen from anywhere",
    text: "From the truck, from home, or between meetings. All you need is Telegram on your phone.",
    figure: <AnywhereFigure />,
    crop: { pos: "90% 95%" },
  },
  {
    title: "Share a call",
    text: "Forward a good call to a new hire as an example, or a bad one to your safety manager. Nothing to download.",
    figure: <ShareFigure />,
    crop: { pos: "10% 40%", flip: true },
  },
  {
    title: "Leave private lines out",
    text: "Some calls don’t belong in the chat, like HR or the owner’s line. Tell us whose calls to skip.",
    figure: <SkipFigure />,
    crop: { pos: "30% 60%", flip: true },
  },
];

/** Shown as its own section, not buried in the FAQ: this is the customer's job. */
const consent = [
  {
    title: "Tell your employees",
    text: "Let them know their calls are recorded and who will listen to them. Get their consent in writing before you turn this on.",
  },
  {
    title: "Tell the people who call you",
    text: "Many states require everyone on a call to agree to the recording. RingCentral can play a short notice at the start of every call.",
  },
  {
    title: "Keep the chat small",
    text: "Anyone in the chat can play every call. Add only the people who need to hear them, like owners and managers.",
  },
  {
    title: "We don’t keep the recordings",
    text: "They go from RingCentral to your chat and are not saved on our server. You decide who gets in.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "How do I get started?",
    answer:
      "Message us on Telegram at @raisedash. We’ll show you a demo, give you the price, and set it up with your RingCentral admin.",
  },
  {
    question: "Do our employees need to agree to this?",
    answer:
      "Yes. Tell them their calls are recorded and who listens to them, and get their written consent first. Many states also require the other person on the call to agree, so turn on RingCentral’s recording notice. This isn’t legal advice, so check the rules for the states you work in.",
  },
  {
    question: "How quickly does a call show up?",
    answer:
      "We check RingCentral for new calls every couple of minutes, so a call shows up shortly after it ends. It isn’t live.",
  },
  {
    question: "Do we need call recording turned on in RingCentral?",
    answer:
      "Yes, to get the audio. We send what RingCentral recorded. Calls without a recording still show up with who called, who answered, and what happened, like Missed or Voicemail.",
  },
  {
    question: "Where do the recordings go?",
    answer:
      "Straight from RingCentral to your Telegram chat. We don’t keep a copy. Once a call is in the chat, anyone in that chat can play it.",
  },
  {
    question: "Will we get our old calls?",
    answer: "No. We start from the day we connect. Older recordings stay in RingCentral.",
  },
  {
    question: "Does it turn calls into text?",
    answer:
      "Not today. You get the recording and the call details. To find a call, search a name or a phone number in the chat.",
  },
  {
    question: "We have more than one RingCentral account.",
    answer: "That works. Each account can go to its own Telegram chat.",
  },
];

export default function RingCentralTelegramPage() {
  return (
    <PageLayout
      title="RingCentral Call Recordings in Telegram"
      description="Listen to your team’s RingCentral calls in Telegram. Missed calls and voicemails show up too, and managers don’t need a RingCentral login."
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
      <FAQPageJsonLd faqs={faqs} />

      <Container className="py-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-accent mb-4 font-mono text-xs tracking-[0.14em] uppercase">
              RingCentral → Telegram
            </p>
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              Your team’s RingCentral calls, right in Telegram.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Your team’s recorded calls show up in a Telegram chat. Tap play to listen. No logging
              in to RingCentral, no digging through the call log.
            </p>
            <GetDemoLink product="ringcentral-telegram" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">
              We’ll walk you through it and help you get set up.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <ChannelDemo />
            <p className="text-muted-foreground/80 mt-3 text-center text-xs leading-relaxed">
              A real customer’s chat, rebuilt for this page. Names, numbers and the company are
              blurred.
            </p>
          </div>
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="rc-two-ways-heading">
          <h2
            id="rc-two-ways-heading"
            className="text-foreground mb-2 text-2xl font-normal tracking-tight"
          >
            One call, two ways
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl text-base leading-relaxed">
            Your calls are already recorded in RingCentral. Finding one there takes so many clicks
            that most of them never get played.
          </p>
          <TwoWays />
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="rc-how-heading">
          <h2
            id="rc-how-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            How it works
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
                Privacy and consent
              </h2>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                This is for quality and training, not for spying on people. Before you turn it on,
                make sure everyone knows.
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
              {consent.map((item) => (
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
        <section aria-labelledby="rc-faq-heading">
          <h2
            id="rc-faq-heading"
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
          aria-labelledby="rc-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="rc-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            Hear your office from your phone
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            Get a demo. We’ll share pricing and help you set it up with your RingCentral admin.
          </p>
          <GetDemoLink product="ringcentral-telegram" className="mt-7 text-sm" />
          <p className="text-muted-foreground/70 mx-auto mt-8 max-w-2xl text-xs leading-relaxed">
            RingCentral is a trademark of RingCentral, Inc. This is an independent integration and
            is not affiliated with or endorsed by RingCentral. Telegram is a trademark of Telegram
            Messenger Inc.
          </p>
        </section>
      </Container>
    </PageLayout>
  );
}
