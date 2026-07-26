import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronDown,
  ImageIcon,
  MessageSquare,
  Minus,
  RefreshCw,
  SkipForward,
  Smartphone,
  Truck,
  Video,
  Wifi,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  FaqSection,
  FeatureGrid,
  PlatformSection,
  type PlatformFaq,
  type PlatformFeature,
} from "@/components/platform";
import {
  CaptureModesVignette,
  ChapterListVignette,
  ProblemFoundVignette,
  ReportVignette,
  TelegramGroupVignette,
} from "@/components/pti/vignettes";
import { BreadcrumbJsonLd, SoftwareApplicationJsonLd } from "@/components/seo/SEO";
import { Button } from "@/components/ui/Button";

/**
 * Numbers and links this page says out loud. They mirror
 * raisedash-backend/src/pti/pti.constants.ts, so a limit that moves there moves
 * here too. FREE_RETENTION_DAYS especially: it is a product setting that has
 * already changed once.
 */
const BOT_LINK = "https://t.me/raisedashbot";
/**
 * Upgrades are a Telegram conversation with a person, not the bot. This handle
 * must match PTI_UPGRADE_CONTACT_USERNAME in the backend constants — the bot's
 * own /upgrade reply names it too, so a mismatch sends fleets two ways.
 */
const UPGRADE_LINK = "https://t.me/raisedash";
const UPGRADE_HANDLE = "@raisedash";
const FREE_RETENTION_DAYS = 90;
const LINK_HOURS = 24;
const MAX_STEPS = 20;
const MAX_VIDEO_MINUTES = 10;

const DEFAULT_STEPS = [
  "Front of truck",
  "Tires & wheels",
  "Lights & reflectors",
  "Coupling / fifth wheel",
  "Trailer & mudflaps",
  "In-cab gauges & brakes",
];

const DRIVER_FEATURES: PlatformFeature[] = [
  {
    title: "No app, no password",
    description: "A link from the group opens it. Nothing to install or log in to.",
    icon: Smartphone,
  },
  {
    title: "An example for every item",
    description: "Each step shows a drawing of what to point the camera at.",
    icon: ImageIcon,
  },
  {
    title: "Name and truck remembered",
    description: "Filled in from last time. One tap to change them.",
    icon: Truck,
  },
  {
    title: "Skip what does not apply",
    description: "No trailer today? Skip it. The report says which items were skipped.",
    icon: SkipForward,
  },
  {
    title: "Uploads run in the background",
    description: "The driver moves to the next item while the last photo sends.",
    icon: RefreshCw,
  },
  {
    title: "Survives a bad signal",
    description: "Big files go up in pieces. A dropped bar costs one piece, not the file.",
    icon: Wifi,
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "Is it really free?",
    answer:
      "Yes. The bot, the inspections, the photos and video, the location and time stamps, the group message and the report link are free, with no limit on groups, drivers, trucks, or inspections. No card, no trial clock. The paid version adds the dashboard, an editable checklist, and history past the free window.",
  },
  {
    question: "Do drivers have to install anything?",
    answer:
      "No. Telegram is the only app involved, and they already have it. The inspection itself opens in the phone browser from a link in the group.",
  },
  {
    question: "Is this a legal DVIR?",
    answer:
      "No, and we do not claim it is. It records what a driver saw, when and where, with photos or video and their own report of any problem. It does not handle the driver and mechanic sign-off chain that a formal DVIR under 49 CFR 396.11 involves. Most fleets use it alongside whatever process they already run.",
  },
  {
    question: "What happens to old photos and video?",
    answer: `On the free version the last ${FREE_RETENTION_DAYS} days stay open. After that the files are hidden, not deleted, and the report still shows who ran the inspection, when, and what they reported. Move to the paid version and everything comes back, including inspections from before you upgraded.`,
  },
  {
    question: "Does the bot read our group chat?",
    answer:
      "It only acts on the commands it knows: /pti, /upgrade, /name, and an activation code. Everything else is ignored and never answered. It never posts anything on its own, and we do not send ads into driver groups.",
  },
  {
    question: "The camera does not open. Why?",
    answer:
      "Telegram opens links in its own browser, and on iPhone that browser is not allowed to use the camera. The page detects this and shows the driver how to open it in Safari instead. One tap, once per link.",
  },
];

function CtaButtons({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a href={BOT_LINK} target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="group w-full gap-2 sm:w-auto">
          Add the bot to your group
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </a>
      <a href="#how-it-works">
        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
          See how it works
        </Button>
      </a>
    </div>
  );
}

function PlanCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <>
        <Check className="text-success h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus className="text-muted-foreground h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-muted-foreground text-sm">{value}</span>;
}

function PlanComparison() {
  const rows: { label: string; free: boolean | string; paid: boolean | string }[] = [
    { label: "Unlimited groups, drivers, trucks, inspections", free: true, paid: true },
    { label: "Photos or walkaround video, with time and location", free: true, paid: true },
    { label: "Result in the group and a report link to forward", free: true, paid: true },
    { label: "Photos and video older than the free window", free: "Hidden", paid: "Always open" },
    { label: "Dashboard across every group and truck", free: false, paid: true },
    { label: "Open problems tracked until marked handled", free: false, paid: true },
    { label: "Write your own checklist items", free: false, paid: true },
  ];

  return (
    <div className="border-border overflow-hidden rounded-xs border">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left">
          <thead>
            <tr className="border-border bg-surface-2 border-b">
              <th className="text-foreground px-4 py-3 text-sm font-normal sm:px-5" />
              <th className="text-foreground w-28 px-4 py-3 text-sm font-normal sm:px-5">
                Free
                <span className="text-muted-foreground mt-0.5 block text-xs">Add it yourself</span>
              </th>
              <th className="text-foreground w-28 px-4 py-3 text-sm font-normal sm:px-5">
                Paid
                <span className="text-muted-foreground mt-0.5 block text-xs">Message us</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-border bg-card divide-y">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="text-foreground px-4 py-3 text-sm sm:px-5">{row.label}</td>
                <td className="px-4 py-3 sm:px-5">
                  <PlanCell value={row.free} />
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <PlanCell value={row.paid} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Full technical detail, folded away. Everything a buyer needs to rule this out
 * is here, but it does not shout at someone who just wants to try the bot.
 */
function SpecDetails() {
  const groups: { heading: string; rows: { label: string; value: string }[] }[] = [
    {
      heading: "How it runs",
      rows: [
        {
          label: "Chat platform",
          value: "Telegram groups only. No SMS, WhatsApp, or email version.",
        },
        { label: "Driver app", value: "None. The inspection opens in the phone browser." },
        {
          label: "Driver accounts",
          value: "None. Drivers type or confirm their name on the page.",
        },
        { label: "Starting one", value: "Any group member, with /pti, /pti pre, or /pti post." },
        {
          label: "Inspection link",
          value: `Single use, works for ${LINK_HOURS} hours. Starting a new one clears the old link from the chat, but a driver already partway through can still finish.`,
        },
        {
          label: "Report link",
          value: "Separate from the inspection link, keeps working afterwards, needs no login.",
        },
      ],
    },
    {
      heading: "Capture",
      rows: [
        {
          label: "Photos",
          value:
            "JPEG, PNG, WebP, or HEIC. Shrunk on the phone to about a megabyte before sending.",
        },
        {
          label: "Video",
          value: `MP4, MOV, or WebM. The guided walkaround records at 720p and stops on its own at ${MAX_VIDEO_MINUTES} minutes.`,
        },
        {
          label: "Large uploads",
          value:
            "Sent in 8 MB pieces, each retried on its own, so a dropped signal does not restart the file.",
        },
        {
          label: "Location",
          value:
            "Asked for once. A driver can refuse and still send, and the report records that no location was captured.",
        },
        {
          label: "Checklist",
          value: `Six items by default, up to ${MAX_STEPS} on the paid version. Each has a name, an instruction, and applies to the pre-trip, the post-trip, or both.`,
        },
        {
          label: "Problem report",
          value:
            "Required before sending. All good, or found a problem with tagged items and a note up to 500 characters.",
        },
      ],
    },
    {
      heading: "Good to know",
      rows: [
        {
          label: "iPhone and Telegram",
          value:
            "Telegram's built-in browser cannot use the camera on iPhone. The page detects this and walks the driver into Safari. One extra tap, once per link.",
        },
        {
          label: "No driver signature",
          value:
            "We built one and removed it. A finger-drawn signature cannot survive Telegram's built-in browser, where the first stroke closes the window and loses the inspection.",
        },
        {
          label: "Tidying the group",
          value:
            "The bot always removes its own old messages. Removing the driver's /pti command too needs the bot to be a group admin, which is optional.",
        },
        {
          label: "Separate from driver records",
          value:
            "Inspections stand on their own. They are not linked to driver profiles or training records in the rest of Raisedash.",
        },
        {
          label: "What we store",
          value:
            "The Telegram account that asked for the link, the name the driver typed, the truck number, the media, and the time and location. Nothing else from the group.",
        },
      ],
    },
  ];

  return (
    <details className="group border-border bg-card overflow-hidden rounded-xs border">
      <summary className="hover:bg-surface-2 flex cursor-pointer items-center justify-between gap-4 px-5 py-4 transition-colors duration-[0.15s] [&::-webkit-details-marker]:hidden">
        <span className="text-foreground text-base">Full specifications</span>
        <ChevronDown className="text-muted-foreground h-4 w-4 flex-shrink-0 transition-transform duration-[0.15s] group-open:rotate-180" />
      </summary>
      <div className="border-border space-y-6 border-t px-5 py-5">
        {groups.map((group) => (
          <div key={group.heading}>
            <p className="text-muted-foreground mb-3 text-xs tracking-wide uppercase">
              {group.heading}
            </p>
            <dl className="divide-border divide-y">
              {group.rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-1 py-2.5 sm:flex-row sm:gap-4">
                  <dt className="text-muted-foreground w-full text-sm sm:w-44 sm:flex-shrink-0">
                    {row.label}
                  </dt>
                  <dd className="text-foreground text-sm leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </details>
  );
}

export default function PtiTelegramBotPage() {
  return (
    <PageLayout
      title="Free Pre-Trip Inspections in Telegram"
      description="Add a bot to your driver group. A driver types /pti, walks the truck, and the group gets photos or a walkaround video stamped with the time and place. Free, no signup."
      keywords={[
        "pre-trip inspection app",
        "post-trip inspection",
        "telegram inspection bot",
        "free pre-trip inspection software",
        "truck walkaround video inspection",
        "driver vehicle inspection photos",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Inspections in Telegram", url: "/products/pti-telegram-bot" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Inspections for Telegram"
        description="A Telegram bot that runs pre-trip and post-trip truck inspections. Drivers capture photos or one guided walkaround video from their phone, and the result is posted back to the driver group with time, location, and a shareable report link."
        operatingSystem={["Web", "iOS", "Android"]}
        offers={[{ price: "0", priceCurrency: "USD" }]}
      />

      {/* Not the shared PlatformHero: that one sends people to /demo, and the
          point of this product is that nobody has to talk to us first. */}
      <div className="pt-8 pb-8">
        <Container className="bg-card border-border animate-fade-in-scale relative overflow-hidden rounded-xs border px-6 py-10 delay-0 sm:px-12 sm:py-16">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
            <div className="w-full max-w-2xl flex-1">
              <div className="text-muted-foreground border-border bg-background animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide uppercase delay-75">
                <MessageSquare className="h-3.5 w-3.5" />
                Free Telegram bot
              </div>
              <h1 className="text-foreground animate-fade-in-up text-3xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-4xl md:text-[46px]">
                Pre-trip inspections where your drivers already are.
              </h1>
              <p className="text-muted-foreground animate-fade-in-up mt-6 max-w-xl text-lg leading-relaxed font-normal delay-150 sm:text-xl">
                A driver types /pti in your group and walks the truck with their phone. The group
                gets the photos back, stamped with the time and place.
              </p>
              <CtaButtons className="animate-fade-in-up mt-9 flex flex-col gap-3 delay-200 sm:flex-row" />
              <p className="text-muted-foreground animate-fade-in-up mt-5 text-sm delay-200">
                Free. No signup, no card, about a minute to set up.
              </p>
            </div>

            <div className="animate-fade-in-up w-full flex-1 delay-300">
              <TelegramGroupVignette />
            </div>
          </div>
        </Container>
      </div>

      {/* Three steps, shown rather than argued. */}
      <PlatformSection id="how-it-works" eyebrow="How it works" title="Three steps, once.">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              n: "1",
              title: "Add the bot to your driver group",
              body: "It answers right away and takes the fleet name from the group name.",
            },
            {
              n: "2",
              title: "A driver types /pti",
              body: "The bot replies with a link made for that one inspection.",
            },
            {
              n: "3",
              title: "The group gets the result",
              body: "Photos or video, the time, the place, and a report link anyone can open.",
            },
          ].map((step) => (
            <div key={step.n} className="border-border bg-card rounded-xs border p-6">
              <span className="border-border text-muted-foreground mb-4 flex h-8 w-8 items-center justify-center rounded-full border text-sm">
                {step.n}
              </span>
              <h3 className="text-foreground text-base font-normal">{step.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="border-border bg-card mt-5 overflow-hidden rounded-xs border">
          <Image
            src="/images/pti/driver-photographing-tire.webp"
            alt="A truck driver standing beside the front wheel of a semi truck, holding up a phone to photograph the tire."
            width={1400}
            height={933}
            className="h-auto w-full"
            priority={false}
          />
        </div>
      </PlatformSection>

      {/* The two modes. The visual does the explaining. */}
      <PlatformSection
        eyebrow="Two ways to capture"
        title="Photos, or one walkaround video"
        lede="Both walk the same checklist. Turn on one or both and let the driver pick."
      >
        <CaptureModesVignette />

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="border-border bg-card flex items-start gap-3 rounded-xs border p-5">
            <span className="bg-accent-blue-soft text-accent-blue border-accent-blue/20 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xs border">
              <Camera className="h-4 w-4" />
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Photos are shrunk on the phone before sending, so a full inspection uses about a
              megabyte a shot instead of ten. That matters on a yard with one bar.
            </p>
          </div>
          <div className="border-border bg-card flex items-start gap-3 rounded-xs border p-5">
            <span className="bg-accent-amber-soft text-accent-amber border-accent-amber/20 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xs border">
              <Video className="h-4 w-4" />
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The camera never stops. The microphone stays on too, so a driver talking through what
              they see is part of the record.
            </p>
          </div>
        </div>
      </PlatformSection>

      {/* The chapter list is the strongest single idea here. Give it room, few words. */}
      <PlatformSection
        eyebrow="Walkaround video"
        title="Jump straight to the part that matters"
        lede="Every item the driver reaches while filming is marked. Tap it and the video goes there."
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <ChapterListVignette />
          <div>
            <div className="border-border bg-card overflow-hidden rounded-xs border">
              <Image
                src="/images/pti/driver-walkaround-trailer.webp"
                alt="A truck driver walking alongside a semi trailer while filming it with a phone held out in front of them."
                width={1400}
                height={933}
                className="h-auto w-full"
              />
            </div>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              One walk is far easier for a driver than starting and stopping the camera at every
              item. Marking each item as they reach it is what keeps the video useful to the office.
              Items with a reported problem are highlighted.
            </p>
          </div>
        </div>
      </PlatformSection>

      {/* What the office holds afterwards. */}
      <PlatformSection
        eyebrow="What comes back"
        title="One message, and a link you can send anyone"
        lede="Before sending, every driver has to answer whether anything is wrong. It is never filled in for them."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProblemFoundVignette />
          <ReportVignette />
        </div>
        <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed">
          The report page needs no login. Send it to a shop, a broker, an insurer, or the driver.
        </p>
      </PlatformSection>

      <PlatformSection
        eyebrow="Built for drivers"
        title="Simple on purpose"
        lede="A driver should finish one without being taught how."
      >
        <FeatureGrid features={DRIVER_FEATURES} columns={3} accent="amber" />
      </PlatformSection>

      {/* Checklist: what you get, and what costs money. Kept short and honest. */}
      <PlatformSection
        eyebrow="Your checklist"
        title="Six items to start"
        lede="Enough for a normal tractor and trailer walkaround, so the bot is useful the minute you add it."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ol className="border-border bg-card divide-border divide-y overflow-hidden rounded-xs border">
            {DEFAULT_STEPS.map((label, index) => (
              <li key={label} className="flex items-center gap-3 px-5 py-3">
                <span className="border-border text-muted-foreground flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-[11px]">
                  {index + 1}
                </span>
                <span className="text-foreground text-sm">{label}</span>
              </li>
            ))}
          </ol>
          <div>
            <p className="text-muted-foreground leading-relaxed">
              On the paid version you can rewrite all of it. Change what the driver is told to look
              at, set whether an item belongs on the pre-trip or the post-trip, reorder them, and
              add your own up to {MAX_STEPS}. Reefer checks, chain racks, tanker fittings, whatever
              your equipment needs.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Write an item and a simple drawing of it is made for you, so drivers see an example
              without anyone photographing your trucks.
            </p>
          </div>
        </div>
      </PlatformSection>

      {/* Free and paid. */}
      <PlatformSection
        id="pricing"
        eyebrow="Free and paid"
        title="The bot is free. The dashboard is not."
        lede="Everything a driver touches stays free. The paid version is for the office."
      >
        <PlanComparison />
        <div className="text-muted-foreground mt-5 grid grid-cols-1 gap-x-8 gap-y-3 text-sm leading-relaxed lg:grid-cols-2">
          <p>
            On the free version the last {FREE_RETENTION_DAYS} days of photos and video stay open.
            After that they are hidden, never deleted. Upgrade later and everything comes back,
            including inspections from before.
          </p>
          <p>
            There is no checkout page. Type /upgrade in your group, or message{" "}
            <a
              href={UPGRADE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-2 hover:underline"
            >
              {UPGRADE_HANDLE}
            </a>{" "}
            on Telegram. We set it up by hand and keep every inspection you have already run.
          </p>
        </div>
      </PlatformSection>

      {/* Limits stay visible. Only the deep detail folds away. */}
      <PlatformSection eyebrow="Before you roll it out" title="What it does not do">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            {
              title: "It is not a legal DVIR",
              body: "No driver and mechanic sign-off chain, no defect grading, no repair workflow.",
            },
            {
              title: "It does not chase anyone",
              body: "No reminders or schedules. A driver or dispatcher has to type /pti.",
            },
            {
              title: "No exports or PDFs",
              body: "Evidence is shared with the report link. No spreadsheet or printable pack.",
            },
          ].map((item) => (
            <div key={item.title} className="border-border bg-card rounded-xs border p-5">
              <p className="text-foreground text-sm">{item.title}</p>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <SpecDetails />
        </div>
      </PlatformSection>

      <FaqSection title="Questions" faqs={FAQS} />

      {/* Closing CTA. Same reason as the hero: the free path must not route
          through /demo. */}
      <Container className="pb-16 md:px-0">
        <div className="bg-card border-border rounded-xs border p-8 text-center sm:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Try it on tomorrow&apos;s pre-trip.
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg leading-relaxed">
            Add the bot to one group and ask a driver to type /pti. If it is not useful, remove it.
            Nothing to cancel.
          </p>
          <CtaButtons className="flex flex-col items-center justify-center gap-3 sm:flex-row" />
        </div>
      </Container>

      <Container className="pb-16 md:px-0">
        <div className="border-border bg-surface-2 flex flex-col gap-4 rounded-xs border p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground text-sm leading-relaxed">
            Raisedash also gets new drivers ready before their first day, with orientation by text
            and a record of what each driver completed.
          </p>
          <Link href="/" className="flex-shrink-0">
            <Button variant="secondary" className="group gap-2">
              See the platform
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
