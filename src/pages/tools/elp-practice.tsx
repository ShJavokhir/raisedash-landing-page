import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  AlertTriangle,
  Mic,
  BookOpen,
  MessageSquare,
  ListChecks,
  FileText,
  Languages,
  ShieldCheck,
  Volume2,
  GraduationCap,
  Gauge,
  Check,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  FAQPageJsonLd,
  BreadcrumbJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";

/**
 * Organic SEO landing page for TruckTalk, our CDL English Language Proficiency
 * (ELP) practice tool. This is a marketing page only — every CTA funnels to the
 * /start-v2 lead funnel, and the page deliberately does not link out to the live
 * product or surface any pricing. Indexed (unlike /start-v2) and registered in
 * sitemap.xml.tsx + api/indexnow.ts.
 */

const CTA_HREF = "/start-v2";
const COVER_IMAGE =
  "https://cdn.raisedash.com/media/landing/blog/trucktalk-elp-practice-cover.webp";

const STATS = [
  { value: "600+", label: "drivers pulled off the road in California since enforcement began" },
  { value: "400+", label: "ELP violations in a single month — a 300% jump over 2025" },
  { value: "Out of service", label: "on the spot the moment a driver fails the roadside check" },
  { value: "3 years", label: "the violation stays on the PSP record future employers see" },
];

const ASSESSMENT = [
  {
    icon: MessageSquare,
    title: "1. The driver interview",
    body: "The inspector asks about the trip, the vehicle, duty status, and the load. The driver has to answer in English — no interpreter, no I-Speak card, no translation app.",
  },
  {
    icon: ShieldCheck,
    title: "2. Highway sign recognition",
    body: "The officer shows a chart of standard traffic signs and the driver has to identify each one and explain what it means, out loud, in English.",
  },
];

const FEATURES = [
  {
    icon: Mic,
    title: "AI voice roleplay",
    body: "Drivers speak out loud with an AI DOT officer, dispatcher, or shipper across 50+ scenarios and three difficulty levels — then get scored on clarity, vocabulary, and task completion.",
  },
  {
    icon: BookOpen,
    title: "2,300+ trucking terms",
    body: "Every word a driver meets at a dock, on a shipping paper, or in an ELD log — each with audio, phonetics, and an example sentence.",
  },
  {
    icon: MessageSquare,
    title: "500+ example conversations",
    body: "Real driver-to-officer, dispatcher, shipper, and mechanic exchanges, organized by topic, with audio playback on every line.",
  },
  {
    icon: ListChecks,
    title: "2,900+ quiz questions",
    body: "Six exercise types built on practical trucking knowledge — multiple choice, image matching, listen-and-choose, and more — not abstract grammar.",
  },
  {
    icon: FileText,
    title: "Interactive document training",
    body: "Tap through a live ELD timeline, a Bill of Lading, and hazmat shipping papers to learn the English by actually using it.",
  },
  {
    icon: Languages,
    title: "11 native languages",
    body: "Translate any term or lesson into Spanish, Punjabi, Hindi, Haitian Creole, Russian, Ukrainian, Uzbek, and more.",
  },
];

const GALLERY = [
  {
    src: "https://cdn.raisedash.com/media/landing/blog/trucktalk-vocabulary.webp",
    alt: "TruckTalk vocabulary dictionary showing CDL terms with phonetic pronunciation, definitions, and native-language translation",
    caption: "Trucking-specific dictionary with audio and translations",
  },
  {
    src: "https://cdn.raisedash.com/media/landing/blog/trucktalk-example-conversations.webp",
    alt: "TruckTalk example conversations organized by topic including DOT inspection, pre-trip, and logbook talk",
    caption: "Hundreds of real trucking conversations, by topic",
  },
  {
    src: "https://cdn.raisedash.com/media/landing/blog/trucktalk-quiz-example.webp",
    alt: "TruckTalk quiz showing a fill-in-the-blank question about CDL terminology with multiple choice answers",
    caption: "Quizzes that test the English of the job",
  },
];

const STEPS = [
  {
    icon: GraduationCap,
    title: "Pick a language and level",
    body: "Each driver chooses their native language and English level — beginner, intermediate, or advanced.",
  },
  {
    icon: Gauge,
    title: "Practice 5–10 minutes a day",
    body: "Short lessons fit a break at a truck stop or the sleeper before a shift. Vocabulary, quizzes, and live voice roleplay.",
  },
  {
    icon: Volume2,
    title: "Build real roadside readiness",
    body: "A spaced-repetition system surfaces weak words sooner, tracks streaks and progress, and scores every roleplay session.",
  },
];

const TIMELINE = [
  {
    date: "Jun 25, 2025",
    event: "CVSA Out-of-Service criteria for English proficiency failures take effect nationwide.",
  },
  {
    date: "Jan 1, 2026",
    event: "California, the last holdout state, begins enforcing ELP at roadside inspections.",
  },
  {
    date: "Feb 3, 2026",
    event: "Congress passes legislation requiring FMCSA to codify ELP out-of-service orders.",
  },
  {
    date: "Feb 20, 2026",
    event: "The U.S. DOT orders that all CDL exams be administered exclusively in English.",
  },
];

const FAQS: FAQItem[] = [
  {
    question: "What is the FMCSA English Language Proficiency requirement?",
    answer:
      "Under 49 CFR § 391.11(b)(2), every CDL holder must be able to read and speak English well enough to converse with the public, understand highway traffic signs, respond to official inquiries, and make entries on reports and records. It is assessed at roadside inspections without translators or translation devices.",
  },
  {
    question: "What happens if a driver fails an ELP check at a DOT inspection?",
    answer:
      "The driver is placed out of service immediately and the truck stays parked until a qualified replacement arrives. The violation goes on the driver's inspection history through the Pre-Employment Screening Program (PSP) for three years, and carriers can face federal civil penalties.",
  },
  {
    question: "How is TruckTalk different from Duolingo or other English apps?",
    answer:
      "Generic apps teach everyday vocabulary like ordering food. TruckTalk teaches the specific English a CDL driver needs — ELD log terminology, Bill of Lading vocabulary, DOT inspection questions, dispatch communication, and hazmat shipping paper language. Every word, conversation, and quiz is built for trucking.",
  },
  {
    question: "Can drivers actually practice speaking, not just reading?",
    answer:
      "Yes. The AI Voice Roleplay feature lets drivers have real spoken conversations with AI-powered DOT officers, dispatchers, and shippers. Drivers speak out loud in English and get scored on listening comprehension, response clarity, vocabulary, and task completion across 50+ scenarios.",
  },
  {
    question: "What native languages does TruckTalk support?",
    answer:
      "TruckTalk supports 11 native languages for in-app translations: Spanish, Punjabi, Hindi, Haitian Creole, Amharic, Somali, Russian, Ukrainian, Polish, French, and Uzbek.",
  },
  {
    question: "Can fleet managers track multiple drivers?",
    answer:
      "Yes. Fleets get a management dashboard that tracks each driver's progress, quiz scores, and ELP readiness, with timestamped records you can show an auditor. Drivers can be invited by link, email, or code and start learning in minutes.",
  },
];

function PrimaryCta({
  children = "Get your drivers road-ready",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={CTA_HREF}>
      <Button size="lg" className={className}>
        {children} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  title,
  sub,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && (
        <p className="text-accent mb-3 text-sm font-medium tracking-wide uppercase">{eyebrow}</p>
      )}
      <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
        {title}
      </h2>
      {sub && <p className="text-muted-foreground mx-auto mt-4 text-lg">{sub}</p>}
    </div>
  );
}

export default function ElpPractice() {
  return (
    <PageLayout
      title="CDL English Proficiency Practice (ELP) for Truck Drivers"
      description="TruckTalk is a CDL English practice tool built only for truck drivers — DOT inspection roleplay, trucking vocabulary, and real roadside scenarios. Prepare your fleet for the FMCSA English Language Proficiency check."
      keywords={[
        "CDL English proficiency practice",
        "ELP practice truck drivers",
        "FMCSA English language requirement",
        "DOT English test practice",
        "CDL English language proficiency tool",
        "trucking English learning app",
        "49 CFR 391.11",
        "roadside ELP inspection",
        "fleet ELP training",
        "TruckTalk",
      ]}
      ogImage={COVER_IMAGE}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "CDL English Proficiency Practice", url: "/tools/elp-practice" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="TruckTalk — CDL English Proficiency Practice"
        description="An English Language Proficiency practice tool built specifically for CDL truck drivers, with AI voice roleplay, trucking vocabulary, example conversations, and quizzes for the FMCSA ELP requirement."
        operatingSystem={["Web", "iOS", "Android"]}
        applicationCategory="EducationalApplication"
      />
      <FAQPageJsonLd faqs={FAQS} />

      {/* Hero */}
      <div className="pt-16 pb-8">
        <Container>
          <div className="bg-card border-border animate-fade-in-scale rounded-xs border px-6 py-12 text-center sm:px-12 sm:py-16">
            <p className="text-accent mb-4 text-sm font-medium tracking-wide uppercase">
              FMCSA English Language Proficiency
            </p>
            <h1 className="text-foreground mx-auto max-w-3xl text-4xl leading-tight font-normal tracking-[-0.03em] sm:text-[48px]">
              Prepare your drivers for the roadside English check.
            </h1>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-xl leading-relaxed">
              TruckTalk is a CDL English practice tool built for one job: passing a DOT inspection.
              AI voice roleplay, trucking vocabulary, and real roadside scenarios — not generic
              English lessons.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryCta />
              <Link href="#inside">
                <Button variant="secondary" size="lg">
                  See what&apos;s inside
                </Button>
              </Link>
            </div>

            <div className="text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5">
                <Check className="text-accent h-4 w-4" /> Built only for CDL drivers
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="text-accent h-4 w-4" /> AI voice practice
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="text-accent h-4 w-4" /> 11 native languages
              </span>
            </div>

            <div className="border-border mt-12 overflow-hidden rounded-xs border">
              <Image
                src={COVER_IMAGE}
                alt="TruckTalk CDL English proficiency practice app showing the study dashboard, vocabulary dictionary, and quiz interface"
                width={2400}
                height={1350}
                priority
                sizes="(max-width: 1200px) 100vw, 1140px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Stats */}
      <Container className="pb-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-card border-border rounded-xs border p-6">
              <div className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                {stat.value}
              </div>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-muted-foreground/70 mt-4 text-center text-xs">
          Sources: FMCSA, CVSA, and California CHP enforcement reporting, 2025–2026.
        </p>
      </Container>

      {/* The reality */}
      <Container className="pb-12">
        <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
            <div className="bg-accent/10 text-accent flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                The enforcement crackdown is already here
              </h2>
              <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                Since June 2025, failing the English Language Proficiency check is an out-of-service
                violation in every state. Under 49 CFR § 391.11(b)(2), every CDL holder must read
                and speak English well enough to talk with the public, understand traffic signs,
                respond to official questions, and complete reports — assessed roadside, with no
                translation help allowed. A single failed check strands the truck, delays the load,
                and follows the driver for years.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* What the assessment looks like */}
      <Container className="pb-12">
        <SectionHeading
          eyebrow="What actually happens"
          title="The roadside ELP assessment has two parts"
          sub="Most drivers have never seen what the check involves. Here is exactly what an officer does."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ASSESSMENT.map((part) => {
            const Icon = part.icon;
            return (
              <div key={part.title} className="bg-card border-border rounded-xs border p-6 sm:p-8">
                <Icon className="text-accent h-6 w-6" />
                <h3 className="text-foreground mt-4 text-xl font-normal">{part.title}</h3>
                <p className="text-muted-foreground mt-3 leading-relaxed">{part.body}</p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Why generic apps fail */}
      <Container className="pb-12">
        <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                Why a generic English app won&apos;t prepare a driver
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Duolingo and Babbel teach you to order coffee and ask for directions. None of that
                helps when an officer asks a driver to explain their ELD logs, walk through their
                hours of service, or read a Bill of Lading and identify the hazmat classifications
                on the load.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3">
              {[
                "ELD and hours-of-service terminology",
                "Bill of Lading and shipping paper vocabulary",
                "DOT inspection questions and responses",
                "Hazmat classes, dispatch, and weigh-station talk",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="text-accent mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Inside TruckTalk — features */}
      <div id="inside" className="scroll-mt-8">
        <Container className="pb-12">
          <SectionHeading
            eyebrow="Inside TruckTalk"
            title="Everything is specific to trucking"
            sub="There is not one lesson about ordering coffee. Every word, conversation, and quiz is built for the inspection a driver will actually face."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-card border-border rounded-xs border p-6 sm:p-8"
                >
                  <div className="bg-accent/10 text-accent flex h-11 w-11 items-center justify-center rounded-xs">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-foreground mt-4 text-lg font-normal">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* AI roleplay spotlight */}
      <Container className="pb-12">
        <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="text-accent mb-3 text-sm font-medium tracking-wide uppercase">
                The feature that changes everything
              </p>
              <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                A real conversation, not a flashcard
              </h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                A driver opens a scenario and an AI-powered DOT officer starts talking out loud. The
                driver answers out loud, in English. The AI responds based on what was actually said
                — then scores listening, clarity, vocabulary, and task completion, and even rewrites
                weak answers to show a better way to respond. Fleet version:{" "}
                <Link
                  href="/features/ai-voice-roleplay-training"
                  className="text-foreground decoration-border underline underline-offset-4 transition-colors hover:decoration-current"
                >
                  AI voice roleplay for your own scenarios
                </Link>
                .
              </p>
              <div className="mt-6">
                <PrimaryCta>Get your drivers practicing</PrimaryCta>
              </div>
            </div>
            <div className="border-border overflow-hidden rounded-xs border">
              <Image
                src="https://cdn.raisedash.com/media/landing/blog/trucktalk-ai-roleplay.webp"
                alt="TruckTalk AI voice roleplay simulating a DOT roadside inspection where an officer asks for license, medical card, and vehicle registration"
                width={2400}
                height={1350}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 560px"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Screenshot gallery */}
      <Container className="pb-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {GALLERY.map((shot) => (
            <figure
              key={shot.src}
              className="bg-card border-border overflow-hidden rounded-xs border"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={2400}
                height={1350}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 380px"
                className="h-auto w-full"
              />
              <figcaption className="text-muted-foreground border-border border-t p-4 text-sm">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>

      {/* How it works */}
      <Container className="pb-12">
        <SectionHeading eyebrow="How it works" title="Up and running in minutes a day" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="bg-card border-border rounded-xs border p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="bg-surface-3 text-foreground flex h-8 w-8 items-center justify-center rounded-full text-sm">
                    {i + 1}
                  </span>
                  <Icon className="text-accent h-5 w-5" />
                </div>
                <h3 className="text-foreground mt-4 text-lg font-normal">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.body}</p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Enforcement timeline */}
      <Container className="pb-12">
        <SectionHeading
          eyebrow="The direction is clear"
          title="The enforcement timeline only goes one way"
        />
        <div className="bg-card border-border rounded-xs border p-6 sm:p-10">
          <ol className="space-y-6">
            {TIMELINE.map((item) => (
              <li key={item.date} className="flex gap-4 sm:gap-6">
                <div className="text-accent w-28 flex-shrink-0 text-sm font-medium sm:w-32">
                  {item.date}
                </div>
                <div className="text-muted-foreground border-border border-l pb-1 pl-4 leading-relaxed sm:pl-6">
                  {item.event}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      {/* FAQ */}
      <Container className="pb-12">
        <SectionHeading eyebrow="FAQ" title="Common questions about the ELP requirement" />
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQS.map((faq) => (
            <details
              key={faq.question}
              className="group bg-card border-border rounded-xs border p-6"
            >
              <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 font-normal [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown className="text-muted-foreground h-4 w-4 flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-muted-foreground mt-4 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>

      {/* Final CTA */}
      <Container className="pb-12">
        <div className="bg-card border-border rounded-xs border p-8 text-center sm:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Get your drivers ready before the next inspection
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            Tell us about your fleet and we&apos;ll put together a plan to get every driver
            road-ready on English proficiency, road signs, and safety.
          </p>
          <div className="flex justify-center">
            <PrimaryCta />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
