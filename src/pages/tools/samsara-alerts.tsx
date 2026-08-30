import { Inter } from "next/font/google";
import { Bell, Check, Gauge, Send, TriangleAlert, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import {
  SEO,
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";
import { Shot } from "@/components/samsara/Shot";
import { BoardTabs } from "@/components/samsara/BoardTabs";

/**
 * Standalone landing page for the Samsara → Telegram alerting service
 * (`raisedash-apps/samsara-alerts`). A deliberate dead end: the marketing header
 * is suppressed for this route in `_app.tsx`, the site footer is replaced with a
 * link-free one, and the only outbound link is the Telegram CTA. Raisedash's
 * main product is a different pitch to a different buyer.
 *
 * Written for a fleet owner who already pays for Samsara, not for an engineer.
 * Keep it short — the screenshots do the selling. No API endpoints, no raw
 * Samsara behaviour labels, no architecture. Do not add internal navigation.
 *
 * Every image is a real capture from a live fleet, redacted in the file itself
 * (see `Shot`). If you add one, redact it the same way before it reaches
 * `public/` — that directory deploys.
 */

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const CTA_HREF = "https://t.me/raisedash";

// Pricing lives here so a change is one edit. Priced separately from the
// Raisedash platform in `pricing.tsx` — the two are not linked.
const PRICE_BASE = 200;
const PRICE_INCLUDED_TRUCKS = 100;
const PRICE_PER_EXTRA_TRUCK = 1;

function TelegramCta({
  children = "Message us on Telegram",
  variant = "primary",
  size = "lg",
}: {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
}) {
  return (
    <a href={CTA_HREF} target="_blank" rel="noopener noreferrer">
      <Button variant={variant} size={size}>
        {children}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </a>
  );
}

const SENDS = [
  {
    icon: Video,
    title: "Safety events, with the video",
    body: "Both camera angles play right in the message. Nobody logs in to watch fifteen seconds of a driver on their phone.",
  },
  {
    icon: Gauge,
    title: "Speeding, over your limit",
    body: "How fast, how long, and where. You pick the threshold, so 3 over stays quiet and 15 over does not.",
  },
  {
    icon: TriangleAlert,
    title: "Engine faults, in plain text",
    body: "Which warning light came on and what the code means, so your shop knows before the truck gets there.",
  },
];

// Every behaviour Samsara reports, in the words a dispatcher would use. Anything
// not on this list still comes through, just under a generic label.
const EVENTS = [
  "Speeding",
  "Phone use",
  "Distracted driving",
  "Drowsy",
  "No seatbelt",
  "Blocked camera",
  "Following too close",
  "Tailgating",
  "Harsh braking",
  "Harsh acceleration",
  "Harsh turn",
  "Lane departure",
  "Rolling stop",
  "Ran a red light",
  "Railroad crossing",
  "Unsafe parking",
  "Roadside parking",
  "Passenger in the cab",
  "Near collision",
  "Forward collision warning",
  "Rollover protection",
  "Crash",
  "Defensive driving",
  "Engine fault codes",
];

// Why the events sitting in Samsara are not already solving this. The same
// argument runs as the first FAQ; this is the version a scroller sees.
const WHY = [
  {
    t: "The Samsara dashboard",
    b: "Someone has to be logged in and refreshing it. A busy week is thousands of events, and everyone you want looking needs their own seat.",
  },
  {
    t: "Email alerts",
    b: "They bury an inbox, they are not instant, and every one of them still ends with somebody opening the dashboard.",
  },
  {
    t: "The group chat you already have",
    b: "Open on every phone in the company. The video is in the message, and everybody sees the same thing at the same time.",
  },
];

const FAQS: FAQItem[] = [
  {
    question: "Why not just watch the events in Samsara?",
    answer:
      "Because somebody has to be logged in and refreshing. A busy fleet throws thousands of events a week, and everyone you want watching needs their own Samsara seat. Email alerts are worse: they bury an inbox, they are not instant, and they still end with someone opening the dashboard. Your Telegram group is already open on every phone, and the video plays in the message.",
  },
  {
    question: "Where does our data go?",
    answer:
      "Onto our own server in AWS us-east-1, inside a private network. Nothing is written to a database and nothing leaves that server. Alerts pass straight through to your group and are gone. The weekly boards are built fresh from Samsara each time they run.",
  },
  {
    question: "Does this replace Samsara?",
    answer:
      "No. It reads the Samsara account you already pay for and posts what it finds to Telegram. Samsara stays exactly as it is.",
  },
  {
    question: "Will it spam our group?",
    answer:
      "No. Nothing is ever sent twice, speeding only posts past the limit you set, engine faults have to stay on before they alert, and anything your team already dismissed in Samsara never shows up. Each behaviour also gets its own topic, so phone-use alerts do not bury everything else.",
  },
  {
    question: "Can drivers get their own alerts?",
    answer:
      "Yes. You can send chosen events to a driver's own group chat, on a separate threshold from the main one, so a driver hears about 15 over without the whole office watching every 3 over.",
  },
  {
    question: "What if a truck has no camera, or the video will not load?",
    answer:
      "You still get the alert as text, with the driver, the truck, the time and a map link. The video is a bonus, never a requirement.",
  },
];

export default function SamsaraAlerts() {
  const exampleTrucks = 140;
  const examplePrice = PRICE_BASE + (exampleTrucks - PRICE_INCLUDED_TRUCKS) * PRICE_PER_EXTRA_TRUCK;

  return (
    <div className={`${inter.className} font-sans antialiased`}>
      <SEO
        title="Samsara Alerts in Telegram: Safety Events, Speeding and Engine Faults"
        description="Get Samsara safety events, speeding and engine faults in your Telegram group, with the dashcam video attached. Plus advanced weekly fleet reports. $200/mo up to 100 trucks, 3 days free."
        canonical="https://www.raisedash.com/tools/samsara-alerts"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Samsara Telegram Alerts", url: "/tools/samsara-alerts" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Samsara Alerts for Telegram"
        description="Sends Samsara safety events, speeding and engine faults to your Telegram group with dashcam video attached, and posts advanced weekly fleet reports."
        operatingSystem={["Web"]}
        applicationCategory="BusinessApplication"
        offers={[{ price: String(PRICE_BASE), priceCurrency: "USD" }]}
      />
      <FAQPageJsonLd faqs={FAQS} />

      {/* Sticky bar. Deliberately not a link — this page does not navigate. */}
      <div className="border-border bg-background/85 sticky top-0 z-30 border-b backdrop-blur-sm">
        <Container className="flex h-14 items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <span className="bg-accent flex h-6 w-6 items-center justify-center rounded-xs">
              <Bell className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="text-foreground text-sm font-medium">Samsara Alerts</span>
          </div>
          <TelegramCta size="md">Talk to us</TelegramCta>
        </Container>
      </div>

      {/* ----------------------------------------------------------- hero --- */}
      <div className="pt-10 pb-8 sm:pt-14">
        <Container>
          <div className="bg-card border-border animate-fade-in-scale rounded-xs border px-6 py-10 sm:px-12 sm:py-14">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
              <div>
                <p className="text-accent mb-4 font-mono text-xs tracking-[0.14em] uppercase">
                  Samsara → Telegram
                </p>
                <h1 className="text-foreground text-4xl leading-[1.08] font-normal tracking-[-0.03em] sm:text-[48px]">
                  Samsara alerts in your Telegram group.
                </h1>
                <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed">
                  Safety events with the dashcam video, speeding, engine faults. Sent to the chat
                  your team already has open all day.
                </p>

                <div className="mt-8">
                  <TelegramCta />
                </div>
              </div>

              <div className="animate-fade-in-up mx-auto w-full max-w-[420px] delay-150">
                <Shot
                  src="/images/samsara/alert-safety-event.webp"
                  alt="A drowsy-driving alert in a Telegram group: the road-facing clip, the cabin clip, and a caption with the vehicle, the time and a map link."
                  width={660}
                  height={877}
                  sizes="(max-width: 1024px) 90vw, 420px"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ----------------------------------------------------- the group --- */}
      <Container className="pb-14">
        {/* The full two-pane window is unreadable under ~640px, so phones get
            the topic list on its own. The hidden one never enters the viewport,
            so next/image never fetches it. */}
        <div className="sm:hidden">
          <Shot
            title="Samsara Events · Telegram"
            src="/images/samsara/telegram-topics.webp"
            alt="A Telegram group with a separate topic for each event type: fault codes, following distance, obstructed camera, mobile usage, speeding, no seatbelt, battery voltage, harsh turn, coolant temperature, harsh braking, drowsy, rolling stop, tire pressure and crash."
            width={497}
            height={1500}
            sizes="100vw"
          />
        </div>
        <div className="hidden sm:block">
          <Shot
            title="Samsara Events · Telegram"
            src="/images/samsara/telegram-group.webp"
            alt="A Telegram group with a separate topic for each event type: fault codes, following distance, obstructed camera, mobile usage, speeding, no seatbelt, harsh turn, drowsy and more, next to a thread of alerts carrying dashcam clips."
            width={1600}
            height={1548}
            sizes="(max-width: 1200px) 100vw, 1140px"
          />
        </div>
        <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed">
          Every event type gets its own topic, and every alert carries the truck number, so
          searching one truck pulls up everything it has ever done.
        </p>
        <p className="text-muted-foreground/70 mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed">
          Real screenshots from a fleet running this. Names, plates and locations are blurred for
          this page, not in your group.
        </p>
      </Container>

      {/* ------------------------------------------------------- the why --- */}
      <Container className="pb-14">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Samsara already sees all of this. Nobody is watching it.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {WHY.map((w, i) => (
            <div
              key={w.t}
              className={`rounded-xs border p-6 sm:p-8 ${
                i === WHY.length - 1 ? "border-accent/30 bg-accent/[0.04]" : "border-border bg-card"
              }`}
            >
              <h3 className="text-foreground text-base font-normal">{w.t}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{w.b}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* --------------------------------------------------- what arrives --- */}
      <Container className="pb-14">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SENDS.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.title} className="bg-card border-border rounded-xs border p-6 sm:p-8">
                <div className="bg-accent/10 text-accent flex h-11 w-11 items-center justify-center rounded-xs">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-foreground mt-4 text-lg font-normal">{t.title}</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t.body}</p>
              </div>
            );
          })}
        </div>
        <div className="mx-auto mt-4 max-w-[720px]">
          <Shot
            src="/images/samsara/alert-engine-fault.webp"
            alt="Two engine-fault alerts in Telegram, each listing the emissions, protect, stop and warning lamp states and spelling out every diagnostic trouble code."
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
            Everything it watches for
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {EVENTS.map((e) => (
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
          Turn off the ones you do not want. Anything Samsara adds later still comes through, it
          just arrives without a nickname until we give it one.
        </p>
      </Container>

      {/* --------------------------------------------------------- boards --- */}
      <Container className="pb-14">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="text-accent mb-3 text-sm font-medium tracking-wide uppercase">
            Every Friday
          </p>
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Three boards get pinned in the group
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            The last seven days: what happened, who drove clean, and who is burning the fuel.
          </p>
        </div>
        <BoardTabs />
      </Container>

      {/* -------------------------------------------------------- pricing --- */}
      <Container className="pb-14">
        <div className="mx-auto max-w-2xl">
          <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
            <div className="border-accent/35 bg-accent/[0.07] mb-7 rounded-xs border px-5 py-4 text-center">
              <p className="text-accent text-lg font-medium tracking-[-0.01em] sm:text-xl">
                Try 3 days for free
              </p>
              <p className="text-muted-foreground mt-1 text-sm">Pay only if it helps.</p>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-foreground text-5xl font-normal tracking-[-0.03em]">
                ${PRICE_BASE}
              </span>
              <span className="text-muted-foreground text-lg">per month</span>
            </div>
            <p className="text-muted-foreground mt-3 text-lg">
              {`Covers your first ${PRICE_INCLUDED_TRUCKS} trucks, then $${PRICE_PER_EXTRA_TRUCK} per truck. A ${exampleTrucks}-truck fleet pays $${examplePrice}.`}
            </p>

            <div className="border-border mt-8 space-y-3 border-t pt-8">
              {[
                "Everything above, for the whole group. No per-seat charge",
                "Advanced weekly reports",
                "Also supports separate driver groups",
                "Setup takes ~15 minutes, and we do it with you",
              ].map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <Check className="text-accent mt-1 h-4 w-4 shrink-0" />
                  <span className="text-foreground text-sm">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <TelegramCta>Ask about your fleet</TelegramCta>
            </div>
          </div>
        </div>
      </Container>

      {/* ------------------------------------------------------------ faq --- */}
      <Container className="pb-14">
        <div className="mx-auto max-w-3xl">
          <div className="border-border divide-border bg-card divide-y overflow-hidden rounded-xs border">
            {FAQS.map((f) => (
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
            Tell us how many trucks you run.
          </h2>
          <div className="mt-8 flex justify-center">
            <TelegramCta>t.me/raisedash</TelegramCta>
          </div>
        </div>
      </Container>

      {/* --------------------------------------------------------- footer --- */}
      <footer className="mb-8 w-full sm:mb-12">
        <Container className="border-border bg-card rounded-xs border px-6 py-8 sm:px-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-foreground text-sm">Samsara Alerts, built by Raisedash</p>
              <p className="text-muted-foreground mt-2 max-w-xl text-xs leading-relaxed">
                Samsara is a trademark of Samsara Inc. This is an independent integration and is not
                affiliated with or endorsed by Samsara. Telegram is a trademark of Telegram
                Messenger Inc.
              </p>
            </div>
            <a
              href={CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent shrink-0 text-sm transition-colors duration-[0.15s]"
            >
              t.me/raisedash
            </a>
          </div>
          <p className="text-muted-foreground border-border mt-6 border-t pt-6 text-xs">
            &copy; {new Date().getFullYear()} Raisedash. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
