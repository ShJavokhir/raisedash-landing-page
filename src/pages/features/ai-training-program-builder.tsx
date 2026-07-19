import Image from "next/image";
import Link from "next/link";
import {
  ClipboardCheck,
  HelpCircle,
  LayoutList,
  MessageSquareText,
  PenLine,
  PlayCircle,
  RefreshCw,
  Search,
  ToggleRight,
} from "lucide-react";
import { FeatureCrossLinks } from "@/components/features/FeatureCrossLinks";
import { MediaFrame } from "@/components/features/MediaFrame";
import { OutlineVignette } from "@/components/features/vignettes-generators";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  FaqSection,
  FeatureGrid,
  PlatformCTA,
  PlatformHero,
  PlatformSection,
  StepList,
  type PlatformFaq,
  type PlatformFeature,
  type PlatformStep,
} from "@/components/platform";
import { BreadcrumbJsonLd } from "@/components/seo/SEO";

const STEPS: PlatformStep[] = [
  {
    title: "Write a brief",
    description:
      "Describe the topic, audience, and details that matter to your operation. Optional questions help fill in anything missing.",
  },
  {
    title: "Add current sources when needed",
    description:
      "When research is enabled, Raisedash adds current sources and citations to the outline for you to review.",
  },
  {
    title: "Review the full outline",
    description:
      "See every proposed module, lesson, quiz, and video. Rename items, remove them, or request changes in plain language. Nothing is generated until you approve the outline.",
  },
  {
    title: "Generate the draft program",
    description:
      "Raisedash builds the approved lessons and quizzes in the course builder. Included videos render in the background and attach automatically.",
  },
  {
    title: "Edit, publish, assign",
    description:
      "The result is an editable draft. Review any lesson, then publish and assign the program when it is ready.",
  },
];

const FEATURES: PlatformFeature[] = [
  {
    title: "Brief coach",
    description: "Optional questions sharpen the brief before any generation starts.",
    icon: MessageSquareText,
  },
  {
    title: "Live web research",
    description: "Add current, cited sources to the outline before you approve it.",
    icon: Search,
  },
  {
    title: "Editable outline",
    description: "Rename modules and lessons. The approved outline controls what gets generated.",
    icon: PenLine,
  },
  {
    title: "Include/exclude toggles",
    description: "Drop any lesson, quiz, or video from the plan with one switch.",
    icon: ToggleRight,
  },
  {
    title: "Plain-language revisions",
    description: "Describe what should change and receive an updated outline to review.",
    icon: RefreshCw,
  },
  {
    title: "Quizzes built from the lessons",
    description: "Create questions based on the lesson content and set a passing score.",
    icon: HelpCircle,
  },
  {
    title: "Videos included",
    description: "Video lessons render in the background and are added when ready.",
    icon: PlayCircle,
  },
  {
    title: "Lands in your course builder",
    description: "Edit, assign, track, and certify it like any other Raisedash training.",
    icon: LayoutList,
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What does the AI training program builder actually produce?",
    answer:
      "A complete draft training: modules in a logical order, text lessons written for drivers, quizzes with pass scores, and optional narrated videos. It lands in the normal Raisedash course builder as a draft you can edit.",
  },
  {
    question: "Does anything reach drivers without human review?",
    answer:
      "No. First, you review and approve the outline item by item. The generated program then remains a draft until an admin reviews and publishes it.",
  },
  {
    question: "Can it use our fleet's own policies?",
    answer:
      "Yes. Add your equipment, lanes, policies, and operating rules to the brief. The optional questions help capture important details, and you can correct the outline before generation.",
  },
  {
    question: "What if the outline isn't right?",
    answer:
      "Describe the change in plain language, such as 'add a module on winter chaining' or 'make the program shorter.' Raisedash redesigns the outline around your feedback, and you can repeat the review until it is ready.",
  },
  {
    question: "Does it create roleplays or simulations too?",
    answer:
      "Not today. Training Studio generates lessons, quizzes, and videos. Voice roleplays and interactive simulations are authored separately and can be added to any training, including a generated one.",
  },
  {
    question: "How is a generated program tracked?",
    answer:
      "Exactly like a hand-built program. Assignments, module locking, quiz results, completions, and certificates all work the same way.",
  },
];

export default function AiTrainingProgramBuilder() {
  return (
    <PageLayout
      title="AI Training Program Builder for Fleets"
      description="Give Raisedash a topic brief and get a complete training program with modules, lessons, quizzes, and optional videos for your team to review and approve."
      keywords={[
        "AI training program generator",
        "create a driver training program",
        "AI course generator for trucking",
        "automated training curriculum builder",
        "driver training software with AI",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.raisedash.com/" },
          { name: "Features", url: "https://www.raisedash.com/features" },
          {
            name: "AI training program builder",
            url: "https://www.raisedash.com/features/ai-training-program-builder",
          },
        ]}
      />

      <PlatformHero
        eyebrow="Training Studio"
        eyebrowIcon={LayoutList}
        title="Turn one brief into a complete training program."
        subhead="Training Studio creates a structured draft with modules, lessons, quizzes, and optional videos. You approve the outline before generation and review the program before publishing."
        vignette={<OutlineVignette />}
      />

      <PlatformSection
        eyebrow="The problem"
        title="Build fleet-specific training without starting from a blank page"
        lede="Capture what your team knows and turn it into a program drivers can actually complete."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <p className="text-foreground text-lg leading-relaxed">
              Your team knows how work should be done, but that knowledge is often spread across
              policies, presentations, and experienced employees.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Turning that material into a useful program means deciding what to teach, organizing
              the sequence, writing every lesson, and building fair quiz questions. Busy safety and
              operations teams often postpone the work or rely on generic content instead.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Training Studio gives you a strong first draft without taking control away from your
              team. You review the structure, request changes, edit the finished content, and decide
              when it is ready for drivers.
            </p>
          </div>
          <MediaFrame
            kind="loop"
            src="https://cdn.raisedash.com/media/landing/features/training-studio-orientation.mp4"
            poster="https://cdn.raisedash.com/media/landing/features/training-studio-orientation.jpg"
            caption="Orientation time is limited. A clear program helps drivers prepare before they arrive."
            ariaLabel="Drivers in safety vests huddled for a briefing between parked trailers"
          />
        </div>
      </PlatformSection>

      <PlatformSection
        id="how-it-works"
        eyebrow="How it works"
        title="A brief becomes a reviewable draft"
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection
        eyebrow="The approval gate"
        title="Generated does not mean unreviewed"
        lede="Your team approves the structure before generation and the finished content before publishing."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border-accent-blue/30 bg-accent-blue-soft rounded-xs border p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="bg-accent-blue flex h-10 w-10 items-center justify-center rounded-xs text-white">
                <ClipboardCheck className="h-5 w-5" />
              </span>
              <h3 className="text-foreground text-xl font-normal">Before you approve</h3>
            </div>
            <ul className="space-y-3">
              {[
                "The full outline, visible item by item",
                "Include or exclude any lesson, quiz, or video",
                "Free-text 'ask for changes' redesigns the plan",
                "A live count of exactly what will be generated",
              ].map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                >
                  <span className="bg-accent-blue mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="border-border bg-surface-2 text-foreground flex h-10 w-10 items-center justify-center rounded-xs border">
                <PenLine className="h-5 w-5" />
              </span>
              <h3 className="text-foreground text-xl font-normal">After generation</h3>
            </div>
            <ul className="space-y-3">
              {[
                "A normal draft training in the standard builder",
                "Edit any lesson or question",
                "Publish only when you're satisfied",
                "Drivers only ever see what you chose to publish",
              ].map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                >
                  <span className="bg-foreground/40 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
          Human review is essential for fleet-specific training. Our{" "}
          <Link
            href="/blog/driver-onboarding-software-trucking"
            className="text-foreground underline-offset-2 hover:underline"
          >
            buyer&apos;s guide to driver onboarding software
          </Link>{" "}
          explains what to look for when evaluating content controls, assignments, and training
          records.
        </p>
      </PlatformSection>

      <PlatformSection eyebrow="Built in">
        <FeatureGrid features={FEATURES} columns={4} accent="blue" />
      </PlatformSection>

      <PlatformSection eyebrow="Part of the platform" title="One brief, a whole program">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <Image
            src="https://cdn.raisedash.com/media/landing/features/training-studio-ink-outline-tree.webp"
            alt="A single handwritten brief branching into a tree of modules, lessons, and quizzes, with an approval stamp in orange at the trunk."
            width={1536}
            height={864}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 560px"
            className="border-border h-auto w-full rounded-xs border"
          />
          <div>
            <p className="text-muted-foreground text-base leading-relaxed">
              A generated program works like any other Raisedash training. Assign it to one driver
              or an incoming class, watch progress by module, and keep each completion and quiz
              attempt in the driver&apos;s record.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Send it out through{" "}
              <Link
                href="/platform/pre-arrival-readiness"
                className="text-foreground underline-offset-2 hover:underline"
              >
                pre-arrival orientation
              </Link>{" "}
              before day one. Completions then appear automatically in{" "}
              <Link
                href="/platform/training-evidence"
                className="text-foreground underline-offset-2 hover:underline"
              >
                training evidence
              </Link>
              .
            </p>
          </div>
        </div>
      </PlatformSection>

      <FaqSection title="Training program generation questions" faqs={FAQS} />

      <FeatureCrossLinks currentSlug="ai-training-program-builder" />

      <PlatformCTA
        title="Build the program your team has been putting off."
        subtitle="Book a demo, bring a real topic, and leave with a reviewable outline."
        footnote="Training Studio drafts; your team approves, edits, and publishes. Nothing reaches drivers without your sign-off."
      />
    </PageLayout>
  );
}
