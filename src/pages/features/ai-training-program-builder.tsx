import Image from "next/image";
import Link from "next/link";
import { ClipboardCheck, HelpCircle, LayoutList, PenLine, PlayCircle } from "lucide-react";
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
    title: "Review the full outline",
    description:
      "See every proposed module, lesson, quiz, and video. Rename items, remove them, or request changes in plain language. When research is enabled, web research adds current, cited sources to the outline for you to check. Nothing is generated until you approve.",
  },
  {
    title: "Generate the draft program",
    description:
      "Raisedash builds the approved lessons and quizzes in the course builder. Included videos render in the background and attach automatically.",
  },
  {
    title: "Edit, publish, assign",
    description:
      "The result is an editable draft. Review any lesson, then publish and assign the program when it's ready. Drivers only see what you publish.",
  },
];

const FEATURES: PlatformFeature[] = [
  {
    title: "Quizzes built from the lessons",
    description: "Questions based on the lesson content, with a passing score you set.",
    icon: HelpCircle,
  },
  {
    title: "Optional videos included",
    description: "Optional narrated video lessons render in the background and attach when ready.",
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
    question: "What does Training Studio actually produce?",
    answer:
      "A draft training program: modules in a logical order, text lessons written for drivers, quizzes with pass scores, and optional narrated videos. It lands in the Raisedash course builder as a draft you can edit before publishing.",
  },
  {
    question: "Can it use our fleet's own policies?",
    answer:
      "Yes. Add your equipment, lanes, policies, and operating rules to the brief. The optional questions help capture important details, and you can correct the outline before generation.",
  },
  {
    question: "What if the outline isn't right?",
    answer:
      "Describe the change in plain language, such as 'add a module on winter chaining' or 'make the program shorter.' Raisedash redesigns the outline around your feedback, and you can repeat until it's right.",
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
      title="AI training program builder for fleets"
      description="Type a topic brief, approve the outline, and get a draft program with modules, lessons, quizzes, and optional videos. Edit everything before drivers see it."
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
        title="Turn one brief into a complete driver training program."
        subhead="Describe the topic, review the outline item by item, and get a draft with modules, lessons, quizzes, and optional videos in your course builder."
        vignette={<OutlineVignette />}
      />

      <PlatformSection title="Your team knows the material. Turning it into a program is the bottleneck.">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <p className="text-foreground text-lg leading-relaxed">
              The knowledge for a good training program already exists in your policies,
              presentations, SOPs, and experienced people. The work is organizing it: deciding what
              to teach, writing every lesson, building fair quiz questions.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Training Studio gives you a strong first draft. You write a short brief, approve the
              outline, and get a complete draft program in the course builder, ready to edit and
              publish.
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
        title="From a brief to a reviewable draft"
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection
        eyebrow="Your approval, twice"
        title="What you control before and after generation"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border-accent-blue/30 bg-accent-blue-soft rounded-xs border p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="bg-accent-blue flex h-10 w-10 items-center justify-center rounded-xs text-white">
                <ClipboardCheck className="h-5 w-5" />
              </span>
              <h3 className="text-foreground text-xl font-normal">Before generation</h3>
            </div>
            <ul className="space-y-3">
              {[
                "The full outline, visible item by item",
                "Include or exclude any lesson, quiz, or video",
                "Describe changes in plain language and get an updated outline",
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
                "A normal draft in the standard course builder",
                "Edit any lesson or question",
                "Publish only when you're satisfied",
                "Drivers only see what you publish",
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
          Our{" "}
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

      <PlatformSection title="What's included in a generated program">
        <FeatureGrid features={FEATURES} columns={4} accent="blue" />
      </PlatformSection>

      <PlatformSection title="Assign, track, and keep records">
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

      <FaqSection title="Common questions" faqs={FAQS} />

      <FeatureCrossLinks currentSlug="ai-training-program-builder" />

      <PlatformCTA
        title="Build the training program your team has been putting off."
        subtitle="Book a demo, bring a real topic, and leave with a reviewable outline."
        footnote="Training Studio drafts; your team approves, edits, and publishes. Nothing reaches drivers without your sign-off."
      />
    </PageLayout>
  );
}
