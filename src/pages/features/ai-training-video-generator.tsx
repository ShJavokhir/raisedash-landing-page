import Image from "next/image";
import Link from "next/link";
import { Clapperboard, Film, Gauge } from "lucide-react";
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
    "A driver training video created by Raisedash Video Studio from a two-sentence brief about responding to a steer-tire blowout. Includes script, narration, visuals, and captions.",
  thumbnailUrl: "https://cdn.raisedash.com/media/landing/features/sample-explainer.jpg",
  contentUrl: "https://cdn.raisedash.com/media/landing/features/sample-explainer.mp4",
  uploadDate: "2026-07-19",
  duration: "PT1M52S",
};

const STEPS: PlatformStep[] = [
  {
    title: "Describe the topic",
    description:
      "Type the topic, audience, and key points in plain language. Raisedash can ask a few optional questions to fill in the brief.",
  },
  {
    title: "Check the production brief",
    description:
      "Raisedash rewrites your input into a structured brief. Read it, edit anything, then start generation.",
  },
  {
    title: "Wait for the draft",
    description:
      "Raisedash builds the script, narration, visuals, captions, and music in the background while you keep working.",
  },
  {
    title: "Review, edit, assign",
    description:
      "Play the draft, swap scenes or rewrite lines, then download it or add it to a training module. Drivers see it only after your team approves.",
  },
];

const FEATURES: PlatformFeature[] = [
  {
    title: "Draft mode",
    description: "Test and refine a brief with a fast preview before creating the final version.",
    icon: Gauge,
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is an AI training video generator?",
    answer:
      "It turns a written topic or policy into a narrated training video with a script, voiceover, visuals, and captions. You enter a brief in Raisedash and review the finished draft before drivers see it.",
  },
  {
    question: "How long does it take to generate a training video?",
    answer:
      "Montage videos are usually ready in about a minute. Explainer videos with custom visuals take 10 to 45 minutes. Both generate in the background while you keep working.",
  },
  {
    question: "Can I edit the video after it's generated?",
    answer:
      "Yes. For montage videos, you can swap footage, rewrite narration or on-screen text, and reorder or delete scenes. Explainer videos are regenerated after you update the brief.",
  },
  {
    question: "Where do the visuals come from?",
    answer:
      "Montage videos are cut from a library of hundreds of real trucking clips and photos, matched to each line of your script. Explainer videos use custom illustrations generated for your exact topic, plus captions, music, and sound design.",
  },
  {
    question: "Do generated videos work with training records?",
    answer:
      "Yes. Add a generated video to any training module. Completion is tracked and appears in each driver's training history with the same records and certificates as other Raisedash content.",
  },
  {
    question: "Is this just an avatar reading a script?",
    answer:
      "No. There are no talking-head avatars. Explainer videos are motion-graphic lessons built from learning objectives. Montage videos are narrated cuts of real trucking footage. Both are built for drivers to learn from.",
  },
];

export default function AiTrainingVideoGenerator() {
  return (
    <PageLayout
      title="AI training video generator for fleets"
      description="Describe a topic or policy and get a narrated driver training video with script, visuals, and captions. No filming needed. Built for trucking fleets."
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
        title="Generate a driver training video from a short brief."
        subhead="Type what drivers need to learn. Raisedash writes the script, generates narration, adds visuals and captions, and delivers a draft you can edit scene by scene."
        vignette={<GeneratorVignette />}
      />

      <PlatformSection
        eyebrow="Why this exists"
        title="Your fleet's procedures don't match generic training libraries"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <p className="text-foreground text-lg leading-relaxed">
              A new policy, a training video after a recent incident, an upcoming orientation.
              Generic videos don&apos;t cover any of that.
            </p>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              Filming your own takes a crew, a schedule, and editing time most safety teams
              don&apos;t have. With Video Studio, you describe the lesson and get a complete draft
              to review. No shoot, no editing software.
            </p>
          </div>
          <MediaFrame
            kind="loop"
            src="https://cdn.raisedash.com/media/landing/features/video-studio-film-crew.mp4"
            poster="https://cdn.raisedash.com/media/landing/features/video-studio-film-crew.jpg"
            caption="Filming a custom training video the usual way: a film crew with lights and a cinema camera set up around a semi truck."
            ariaLabel="A film crew with lights and a cinema camera set up around a semi truck"
          />
        </div>
      </PlatformSection>

      <PlatformSection
        id="how-it-works"
        eyebrow="How it works"
        title="Four steps from topic to finished video"
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection eyebrow="Sample" title="An unedited draft from a two-sentence brief">
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

      <PlatformSection eyebrow="Two formats" title="Explainer or Montage: pick the one that fits">
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
                "A structured lesson built from learning objectives",
                "Custom AI-drawn visuals for your exact topic",
                "Burned-in, word-synced captions, music, and sound design (drivers can watch on their phones with the sound off)",
                "Vertical and landscape from the same brief",
                "Ready in 10 to 45 minutes",
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
                "Narrated cut from a library of hundreds of real trucking clips",
                "Footage matched scene by scene to your script",
                "Swap any scene's footage, rewrite a line, reorder or delete scenes, and re-render in seconds",
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

      <PlatformSection eyebrow="Details" title="Editing and output options">
        <FeatureGrid features={FEATURES} columns={4} accent="violet" />
      </PlatformSection>

      <PlatformSection
        eyebrow="Training records"
        title="Generated videos go straight into your training programs"
      >
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
              Every generated video is a normal training asset in Raisedash. Attach it to a module,
              assign it before orientation or after an incident, and completion lands in the
              driver&apos;s{" "}
              <Link
                href="/platform/training-evidence"
                className="text-foreground underline-offset-2 hover:underline"
              >
                training history
              </Link>
              , recording who watched it, when they completed it, and how they scored on any related
              quiz.
            </p>
          </div>
        </div>
      </PlatformSection>

      <FaqSection title="Common questions" faqs={FAQS} />

      <FeatureCrossLinks currentSlug="ai-training-video-generator" />

      <PlatformCTA
        title="See a brief become a training video during the call."
        subtitle="Book a demo and see a brief become a finished draft during the call."
        footnote="Your team reviews and edits every video before drivers see it."
      />
    </PageLayout>
  );
}
