import Image from "next/image";
import Link from "next/link";
import {
  Captions,
  Clapperboard,
  ClipboardCheck,
  Film,
  Gauge,
  ListVideo,
  MessageSquareText,
  Paperclip,
  Smartphone,
} from "lucide-react";
import { FeatureCrossLinks } from "@/components/features/FeatureCrossLinks";
import { MediaFrame } from "@/components/features/MediaFrame";
import { GeneratorVignette } from "@/components/features/vignettes-generators";
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

const VIDEO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Tire blowout response: AI-generated driver training video",
  description:
    "A complete driver training video created by Raisedash Video Studio from a short brief, including the script, narration, visuals, and captions.",
  thumbnailUrl: "https://cdn.raisedash.com/media/landing/features/sample-explainer.jpg",
  contentUrl: "https://cdn.raisedash.com/media/landing/features/sample-explainer.mp4",
  uploadDate: "2026-07-19",
  duration: "PT1M52S",
};

const STEPS: PlatformStep[] = [
  {
    title: "Describe the video",
    description:
      "Enter the topic, audience, and key points in plain language. Raisedash can ask a few optional questions to clarify the brief.",
  },
  {
    title: "Review the refined brief",
    description:
      "The brief is rewritten into a clear production brief you can edit before anything is generated.",
  },
  {
    title: "Let Raisedash build the draft",
    description:
      "Raisedash creates the script, narration, visuals, captions, and music in the background.",
  },
  {
    title: "Review, edit, and use it",
    description:
      "Play the draft, make changes, then download it or add it directly to a training module.",
  },
];

const FEATURES: PlatformFeature[] = [
  {
    title: "Brief coach",
    description: "Optional questions help turn a rough idea into a clear brief before generation.",
    icon: MessageSquareText,
  },
  {
    title: "Editable production brief",
    description: "See what Raisedash will create and edit the plan before generation starts.",
    icon: ClipboardCheck,
  },
  {
    title: "Real trucking footage",
    description: "Montage videos match each line of narration with trucking footage and photos.",
    icon: Film,
  },
  {
    title: "Word-synced captions",
    description: "Burned-in captions timed to the narration, made for phones with the sound off.",
    icon: Captions,
  },
  {
    title: "Vertical + landscape",
    description: "Create phone-friendly and landscape versions from the same brief.",
    icon: Smartphone,
  },
  {
    title: "Scene-by-scene editing",
    description: "Swap footage, rewrite narration, reorder scenes, and render a new version.",
    icon: ListVideo,
  },
  {
    title: "Draft mode",
    description: "Test and refine a brief with a fast preview before creating the final version.",
    icon: Gauge,
  },
  {
    title: "Add to any training",
    description: "Place finished videos in modules with completion tracking and records.",
    icon: Paperclip,
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is an AI training video generator?",
    answer:
      "It turns a written topic or policy into a narrated training video with a script, voiceover, visuals, and captions. In Raisedash, you enter a brief and review the finished draft before drivers see it.",
  },
  {
    question: "How long does it take to generate a training video?",
    answer:
      "Montage videos made from trucking footage are usually ready in about a minute once generation starts. Designed explainer lessons with custom visuals take 10 to 45 minutes. Both generate in the background while you continue working.",
  },
  {
    question: "Can I edit the video after it's generated?",
    answer:
      "Yes. For montage videos, you can swap footage, rewrite narration or on-screen text, and reorder or delete scenes. Explainer videos are regenerated after you update the brief.",
  },
  {
    question: "Where do the visuals come from?",
    answer:
      "Two places. Montage videos are cut from a library of hundreds of real trucking-context clips and photos, matched to each line of your script. Explainer videos use custom illustrations generated for your exact topic, plus captions, music, and sound design.",
  },
  {
    question: "Do generated videos work with our training records?",
    answer:
      "Yes. Add a generated video to any training module. Drivers can watch it on their phones, completion is tracked, and the activity appears in each driver's training history.",
  },
  {
    question: "Is this just an avatar reading a script?",
    answer:
      "No. There are no talking-head avatars. Explainer videos are motion-graphic lessons built from learning objectives; montage videos are narrated cuts of real trucking footage. Both are designed for drivers to actually learn from, not to look like a newscast.",
  },
];

export default function AiTrainingVideoGenerator() {
  return (
    <PageLayout
      title="AI Training Video Generator for Fleets"
      description="Describe a topic or policy and get a finished, narrated driver training video. No filming or production software required. Built for trucking fleets."
      keywords={[
        "AI training video generator for fleets",
        "custom driver training video",
        "create a safety training video",
        "on-demand training video generator",
        "AI safety training videos for truck drivers",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.raisedash.com/" },
          { name: "Features", url: "https://www.raisedash.com/features" },
          {
            name: "AI training video generator",
            url: "https://www.raisedash.com/features/ai-training-video-generator",
          },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(VIDEO_SCHEMA) }}
      />

      <PlatformHero
        eyebrow="Video Studio"
        eyebrowIcon={Clapperboard}
        title="Turn a training topic into a finished video."
        subhead="Enter what drivers need to learn. Raisedash creates the script, narration, visuals, and captions. Your team reviews and edits the draft before assigning it."
        vignette={<GeneratorVignette />}
      />

      <PlatformSection
        eyebrow="The problem"
        title="Create fleet-specific videos without a production crew"
        lede="Turn your policies and operating knowledge into clear training while the topic is still relevant."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <p className="text-foreground text-lg leading-relaxed">
              Your fleet has specific equipment, policies, and procedures. Generic library videos
              rarely explain them the way your drivers need.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Filming and editing a custom video takes time that most safety teams do not have. The
              usual fallback is a generic video that drivers have already seen or that does not
              match the fleet&apos;s actual process.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              With Raisedash, you describe the lesson and receive a complete draft to review. You
              can create useful training for a new policy, a recent incident, or an upcoming
              orientation without organizing a shoot.
            </p>
          </div>
          <MediaFrame
            kind="loop"
            src="https://cdn.raisedash.com/media/landing/features/video-studio-film-crew.mp4"
            poster="https://cdn.raisedash.com/media/landing/features/video-studio-film-crew.jpg"
            caption="The traditional way: a crew, a set, a schedule, an invoice."
            ariaLabel="A film crew with lights and a cinema camera set up around a semi truck"
          />
        </div>
      </PlatformSection>

      <PlatformSection
        id="how-it-works"
        eyebrow="How it works"
        title="From a sentence to a finished video"
        lede="Four clear steps take you from an idea to a reviewed training video."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection
        eyebrow="See a result"
        title="A video generated by Raisedash, unedited"
        lede="This sample shows the draft Video Studio produced from a two-sentence brief."
      >
        <div className="mx-auto max-w-3xl">
          <MediaFrame
            kind="player"
            src="https://cdn.raisedash.com/media/landing/features/sample-explainer.mp4"
            poster="https://cdn.raisedash.com/media/landing/features/sample-explainer.jpg"
            caption="Video Studio created the script, narration, visuals, captions, and pacing from a two-sentence brief about responding to a steer-tire blowout."
            ariaLabel="Play the sample AI-generated training video about tire blowout response"
          />
        </div>
      </PlatformSection>

      <PlatformSection
        eyebrow="Two speeds"
        title="Two kinds of video, one brief"
        lede="Pick the format that fits the moment: a designed lesson, or a fast narrated cut."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border-accent-violet/30 bg-accent-violet-soft rounded-xs border p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="bg-accent-violet flex h-10 w-10 items-center justify-center rounded-xs text-white">
                <Clapperboard className="h-5 w-5" />
              </span>
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Designed to teach
                </p>
                <h3 className="text-foreground mt-1 text-xl font-normal">Explainer</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "A structured lesson designed from learning objectives",
                "Custom AI-drawn visuals for your exact topic",
                "Word-synced captions, music, and sound design",
                "Vertical and landscape from the same brief",
                "Ready in 10–45 minutes",
              ].map((item) => (
                <li
                  key={item}
                  className="text-muted-foreground flex gap-2.5 text-sm leading-relaxed"
                >
                  <span className="bg-accent-violet mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="border-border bg-surface-2 text-foreground flex h-10 w-10 items-center justify-center rounded-xs border">
                <Film className="h-5 w-5" />
              </span>
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Built for speed
                </p>
                <h3 className="text-foreground mt-1 text-xl font-normal">Montage</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                "A narrated cut from a library of hundreds of real trucking shots",
                "Footage matched scene-by-scene to your script",
                "Swap any scene's footage with one click",
                "Rewrite a line and re-render in seconds",
                "Ready in about a minute",
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
      </PlatformSection>

      <PlatformSection eyebrow="Built in" title="The details that make it usable">
        <FeatureGrid features={FEATURES} columns={4} accent="violet" />
      </PlatformSection>

      <PlatformSection eyebrow="Part of the platform" title="From a sentence to a finished lesson">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <Image
            src="https://cdn.raisedash.com/media/landing/features/video-studio-ink-brief-to-film.webp"
            alt="A typed sentence becoming a strip of film frames with script, narration, captions, and a final approval check."
            width={1536}
            height={864}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 560px"
            className="border-border h-auto w-full rounded-xs border"
          />
          <div>
            <p className="text-muted-foreground text-base leading-relaxed">
              Every generated video is a normal Raisedash training asset. Attach it to a module,
              assign it before orientation day, and completion lands in the driver&apos;s training
              history with the same records and certificates as other Raisedash content.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              The video is the content. The{" "}
              <Link
                href="/platform/training-evidence"
                className="text-foreground underline-offset-2 hover:underline"
              >
                training evidence
              </Link>{" "}
              layer records who watched it, when they completed it, and how they scored on the
              related quiz.
            </p>
          </div>
        </div>
      </PlatformSection>

      <FaqSection title="AI training video questions" faqs={FAQS} />

      <FeatureCrossLinks currentSlug="ai-training-video-generator" />

      <PlatformCTA
        title="Create the training video your fleet actually needs."
        subtitle="Book a demo and see a brief become a finished draft during the call."
        footnote="Your team reviews every generated video before drivers see it."
      />
    </PageLayout>
  );
}
