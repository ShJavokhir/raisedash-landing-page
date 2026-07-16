import {
  BellRing,
  Languages,
  ListChecks,
  RotateCcw,
  Send,
  Smartphone,
  Users,
  WifiOff,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  CrossLinks,
  FaqSection,
  FeatureGrid,
  PipelineVignette,
  PlatformCTA,
  PlatformHero,
  PlatformSection,
  StepList,
  type PlatformFaq,
  type PlatformFeature,
  type PlatformStep,
} from "@/components/platform";

const FEATURES: PlatformFeature[] = [
  {
    title: "One text, no password",
    description:
      "The onboarding account is created the moment recruiting approves the hire. The driver gets a single SMS link — no password to set, no app to install, no email to find.",
    icon: Send,
  },
  {
    title: "Everything on the phone",
    description:
      "Lessons, quizzes, and policy signatures all happen right from the text thread, on the device the driver already carries.",
    icon: Smartphone,
  },
  {
    title: "A real readiness view",
    description:
      "See who is actually prepared for Monday — who's finished, who's mid-way, and who hasn't started — before anyone books a hotel room.",
    icon: ListChecks,
  },
  {
    title: "English and Spanish",
    description:
      "The lessons and the whole flow work in English and Spanish, with captions on the video. The driver picks their language; your team doesn't manage it.",
    icon: Languages,
  },
  {
    title: "Resume where they left off",
    description:
      "Drivers finish between loads. Progress saves automatically, so a dropped signal or a closed tab never means starting over.",
    icon: RotateCcw,
  },
  {
    title: "Built for weak signal",
    description:
      "Short lessons and light pages are designed to load on the kind of connection a truck stop or a yard actually has.",
    icon: WifiOff,
  },
  {
    title: "One hire or a whole class",
    description:
      "Add a single driver in seconds or invite an entire orientation class at once — the readiness board keeps count either way.",
    icon: Users,
  },
  {
    title: "Reminders that nudge",
    description:
      "Automatic SMS reminders keep unfinished work moving so you're not personally chasing anyone the weekend before orientation.",
    icon: BellRing,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Approve the hire",
    description:
      "When a candidate is approved, Raisedash creates their pre-arrival onboarding automatically. You add a driver in seconds, or import a batch — no spreadsheet handoff to a separate system.",
  },
  {
    title: "The driver gets a text",
    description:
      "A single SMS link opens everything on their phone. There's no password to create, no app to download, and no email address required to get started.",
  },
  {
    title: "They finish before they travel",
    description:
      "Videos, quizzes, and policy acknowledgments get done at home or between loads — in English or Spanish, picking up wherever they left off.",
  },
  {
    title: "You watch the readiness board",
    description:
      "Track who's ready in real time. Walk into orientation with a class that has already covered the handbook, and commit travel and hotel spend only to drivers who are genuinely prepared to show up.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "Do drivers need to download an app?",
    answer:
      "No. Everything runs in the phone's web browser from a single text-message link. There's no app store, no password to create, and no email required to complete pre-arrival work.",
  },
  {
    question: "What if a driver doesn't have an email address?",
    answer:
      "That's fine. The invitation and every reminder are sent by SMS, and the driver opens their work straight from the link. Email is never required to finish pre-arrival readiness.",
  },
  {
    question: "Does it work in Spanish?",
    answer:
      "Yes. The lessons and the entire driver flow are available in English and Spanish, and captions are on the video. The driver chooses the language; there is nothing for your team to switch.",
  },
  {
    question: "What happens if a driver loses signal partway through?",
    answer:
      "Progress saves as they go, so they resume exactly where they left off. Lessons are short and pages are intentionally light, which helps on the weak connections common at truck stops and yards.",
  },
  {
    question: "Does this replace hands-on orientation at the terminal?",
    answer:
      "No. Pre-arrival readiness covers the handbook, policies, and acknowledgments so your in-person time is shorter and focused on the driving and hands-on parts that genuinely need a terminal.",
  },
];

export default function PreArrivalReadiness() {
  return (
    <PageLayout
      title="Driver Orientation Software — Pre-Arrival Readiness"
      description="Send driver orientation to your new hires' phones before day one. Lessons, quizzes, and signatures finished by text — with a readiness board that shows who's actually prepared."
      keywords={[
        "driver orientation software",
        "pre-hire onboarding for trucking",
        "new driver orientation checklist",
        "trucking driver onboarding",
        "pre-arrival driver readiness",
      ]}
    >
      <PlatformHero
        eyebrow="Pre-arrival readiness"
        eyebrowIcon={Send}
        title="Orientation starts the moment you say you're hired."
        subhead="Raisedash sends orientation to a new driver's phone the day they're approved — lessons, quizzes, and signatures, all by text. So they arrive trained and signed, and you know who's ready before you book a single hotel room."
        vignette={<PipelineVignette />}
      />

      {/* Problem — the safety director's Monday */}
      <PlatformSection eyebrow="The problem" title="The Monday you already know">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8 lg:col-span-3">
            <p className="text-muted-foreground text-lg leading-relaxed font-normal">
              Half the orientation class shows up having done nothing in advance. You spend a paid
              classroom day walking new hires through the same handbook they could have read at
              home. One driver you scheduled never shows — after the hotel room was already booked.
              And the acknowledgments, quiz results, and road-test forms end up in paper folders,
              email threads, and somewhere on your desk.
            </p>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed font-normal">
              You're also handling claims, CSA, and half of recruiting. There is no full-time person
              to run onboarding software. Whatever you use has to work for someone with fifteen
              other jobs.
            </p>
          </div>
          <div className="border-border bg-surface-2 rounded-xs border p-6 sm:p-8 lg:col-span-2">
            <p className="text-muted-foreground mb-4 text-xs tracking-wide uppercase">
              What that costs you
            </p>
            <ul className="space-y-3">
              {[
                "Paid classroom hours spent on material drivers could finish at home",
                "Travel and hotel spent on drivers who never arrive",
                "Signed acknowledgments scattered across paper, email, and desks",
                "No clear answer to “who is actually ready for Monday?”",
              ].map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                >
                  <span className="bg-foreground/40 mt-2 h-1 w-1 flex-shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PlatformSection>

      {/* How it works */}
      <PlatformSection
        id="how-it-works"
        eyebrow="How it works"
        title="Approved to ready, without the spreadsheet"
        lede="Four steps run from the moment a candidate is approved to the moment they walk in prepared."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      {/* Feature grid */}
      <PlatformSection
        eyebrow="What's inside"
        title="Everything a new hire needs, on the device they already carry"
      >
        <FeatureGrid features={FEATURES} columns={4} accent="blue" />
      </PlatformSection>

      {/* FAQ */}
      <FaqSection faqs={FAQS} />

      {/* Cross-links */}
      <CrossLinks currentSlug="pre-arrival-readiness" />

      {/* CTA */}
      <PlatformCTA
        title="See a readiness board with your own hires on it."
        subtitle="Book a short demo and watch a new driver go from approved to road-ready — before day one."
        footnote="Set up before lunch. Not after a six-week implementation."
      />
    </PageLayout>
  );
}
