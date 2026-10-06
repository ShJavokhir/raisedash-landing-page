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
  GroupPickerFigure,
  HeroFigure,
  MessageFigure,
  TwoWays,
} from "@/components/announcements/figures";

/**
 * Driver announcements: write one message in Raisedash, pick driver Telegram
 * groups, and our bot posts it in each one. Carriers do this by hand today,
 * pasting the same policy into every group.
 *
 * The owner chose the dashboard flow on 2026-10-04 and didn't confirm any
 * extras. So the page promises only: write once, select all or pick some groups,
 * send, it lands in the group drivers already use, and drivers can reply
 * there like any message. Don't claim attachments, pinning, a delivery
 * report, read confirmations or scheduling until the owner says they're live
 * (mark them "Coming soon" if they're added before then).
 *
 * The sell is the office's time and no group left out, not "it shows up in
 * the group": pasting it by hand shows up in the group too.
 *
 * Copy: short, plain words, no em dashes, "we" for what the product does.
 * Stands alone: no other product is mentioned, even though it's the same bot.
 * No public price: the CTA goes to the shared demo request page.
 */

const steps: PlatformStep[] = [
  {
    title: "Write it once",
    description: "Type your message in Raisedash, the same way you’d write it in a group.",
  },
  {
    title: "Pick the groups",
    description: "Select all, or search and pick only the drivers who need it.",
  },
  {
    title: "Send",
    description:
      "We post it in every group you picked. Drivers read it in the chat they already use, and can reply right there.",
  },
];

const examples: { title: string; text: string; figure: React.ReactNode; crop: PlateCrop }[] = [
  {
    title: "Company policies",
    text: "A new rule reaches every driver on the same day.",
    figure: (
      <MessageFigure
        group={0}
        text="📌 New policy starting Monday: no handheld phone use while the truck is moving. Hands-free only, or pull over."
      />
    ),
    crop: { pos: "0% 8%" },
  },
  {
    title: "Pay changes",
    text: "Everyone hears it from you at once, not secondhand from another driver.",
    figure: (
      <MessageFigure
        group={1}
        text="💵 Starting October 16, settlements go out on Thursday instead of Friday."
      />
    ),
    crop: { pos: "60% 80%" },
  },
  {
    title: "Holiday hours",
    text: "Who to call while the office is closed.",
    figure: (
      <MessageFigure
        group={2}
        text="🦃 The office is closed Thursday, November 27. After-hours dispatch: (555) 010-0142."
      />
    ),
    crop: { pos: "100% 25%", flip: true },
  },
  {
    title: "Weather warnings",
    text: "Send it only to the drivers heading into it.",
    figure: (
      <MessageFigure
        group={3}
        sentTo="Sent to 12 groups"
        text="❄️ Snowstorm on I-80 in Wyoming Tuesday night. Check road conditions before you go through."
      />
    ),
    crop: { pos: "90% 95%" },
  },
  {
    title: "Safety reminders",
    text: "Before an inspection week, or after a close call everyone should hear about.",
    figure: (
      <MessageFigure
        group={4}
        text="🦺 Roadcheck is next week. Check your lights, tires and logs before you roll."
      />
    ),
    crop: { pos: "10% 40%", flip: true },
  },
  {
    title: "New phone numbers",
    text: "A new dispatch line in every group, before anyone needs it.",
    figure: (
      <MessageFigure
        group={5}
        text="☎️ New after-hours dispatch number: (555) 010-0199. Please save it in your phone."
      />
    ),
    crop: { pos: "30% 60%", flip: true },
  },
];

const faqs: FAQItem[] = [
  {
    question: "Do drivers need an app?",
    answer:
      "No. Your message shows up in the Telegram group they already use. There’s nothing to install and nothing to log in to.",
  },
  {
    question: "Can I send to only some groups?",
    answer:
      "Yes. Select all, or search and pick the groups you need, like the drivers heading into bad weather.",
  },
  {
    question: "Can drivers reply?",
    answer:
      "Yes. They reply in their group like any other message, and your team answers them there.",
  },
  {
    question: "What do I need to set up?",
    answer: "Our bot needs to be in each group you send to. We’ll help you add it.",
  },
  {
    question: "How do I get started?",
    answer: "Get a demo. We’ll share pricing and help you set it up for your groups.",
  },
];

export default function DriverAnnouncementsPage() {
  return (
    <PageLayout
      title="Send One Message to All Your Drivers’ Telegram Groups"
      description="Write a message once and we’ll post it in every driver Telegram group. Send company policies, pay changes, and holiday hours to all your drivers in a minute, not one group at a time."
      keywords={[
        "driver announcements",
        "telegram broadcast to groups",
        "send message to multiple telegram groups",
        "trucking driver communication",
        "fleet driver announcements",
        "company policy announcement drivers",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Driver Announcements", url: "/products/driver-announcements" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Driver Announcements"
        description="Write one message and post it in all your drivers’ Telegram groups, or only the ones you pick. Send company policies, pay changes, holiday hours, and weather warnings without pasting them into each group by hand."
        operatingSystem={["Web", "iOS", "Android"]}
      />
      <FAQPageJsonLd faqs={faqs} />

      <Container className="py-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              Write it once. Every driver group gets it.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Just write your message and pick your drivers’ Telegram groups, and we’ll post it in
              every one. No more pasting the same message into group after group.
            </p>
            <GetDemoLink product="driver-announcements" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">We’ll set it up for your groups.</p>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <HeroFigure />
          </div>
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="da-two-ways-heading">
          <h2
            id="da-two-ways-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            A new policy for 148 drivers
          </h2>
          <TwoWays />
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="da-how-heading">
          <h2
            id="da-how-heading"
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
              <GroupPickerFigure />
            </GraphitePlate>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="da-examples-heading">
          <h2
            id="da-examples-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            What carriers send
          </h2>
          <ul className="grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => (
              <GraphiteCard key={example.title} {...example} />
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="da-faq-heading">
          <h2
            id="da-faq-heading"
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
          aria-labelledby="da-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="da-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            Tell every driver at once
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            Get a demo. We’ll share pricing and help you set it up for your groups.
          </p>
          <GetDemoLink product="driver-announcements" className="mt-7 text-sm" />
          <p className="text-muted-foreground/70 mx-auto mt-8 max-w-2xl text-xs leading-relaxed">
            Telegram is a trademark of Telegram Messenger Inc. Raisedash is not affiliated with or
            endorsed by Telegram.
          </p>
        </section>
      </Container>
    </PageLayout>
  );
}
