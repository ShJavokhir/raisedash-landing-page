import Link from "next/link";
import {
  CheckCheck,
  ClipboardCheck,
  MessagesSquare,
  Mic,
  RefreshCw,
  Smartphone,
  TimerReset,
  Users,
} from "lucide-react";
import { FeatureCrossLinks } from "@/components/features/FeatureCrossLinks";
import { MediaFrame } from "@/components/features/MediaFrame";
import { RoleplayCallVignette } from "@/components/features/vignettes-practice";
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

const FEATURES: PlatformFeature[] = [
  {
    title: "Any character, any scenario",
    description: "Create practice for inspectors, dispatchers, shippers, managers, or customers.",
    icon: Users,
  },
  {
    title: "A real conversation",
    description: "The character listens, responds, and adapts to what the driver says.",
    icon: MessagesSquare,
  },
  {
    title: "Your rubric decides the pass",
    description: "Required criteria must all be met. Optional ones coach without blocking.",
    icon: ClipboardCheck,
  },
  {
    title: "Graded on the driver's words",
    description: "Evaluation is anchored to what the driver actually said in the call.",
    icon: CheckCheck,
  },
  {
    title: "Unlimited retries",
    description: "Practice is the point. Drivers can try again immediately, every time.",
    icon: RefreshCw,
  },
  {
    title: "Phone-browser simple",
    description: "One-time code, mic permission, no app to install.",
    icon: Smartphone,
  },
  {
    title: "Natural call ending",
    description: "The character closes the conversation naturally when time runs low.",
    icon: TimerReset,
  },
  {
    title: "Completion means passed",
    description: "A roleplay only counts as complete when the driver passes it.",
    icon: CheckCheck,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Write the scenario and the character",
    description:
      "Describe who the driver is talking to, how the character should behave, and which details it should challenge.",
  },
  {
    title: "Write the rubric",
    description:
      "Add up to ten plain-language criteria and mark each one required or optional. Drivers see the expectations before they begin.",
  },
  {
    title: "The driver practices out loud",
    description:
      "A live spoken conversation in the phone browser. The character answers, pushes back, can be interrupted, and wraps up naturally when time runs low.",
  },
  {
    title: "Scored on what was actually said",
    description:
      "After the call, the conversation is graded against your rubric using the driver's own words as evidence. Passing requires every required criterion.",
  },
  {
    title: "Feedback the driver can use",
    description:
      "A plain-language scorecard explains what went well and what to improve. Drivers can retry immediately.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is AI voice roleplay training for truck drivers?",
    answer:
      "It gives drivers a safe place to practice spoken conversations such as roadside inspections, dispatcher calls, and customer interactions. The driver speaks in a phone browser, the AI character responds in real time, and feedback is based on criteria written by the fleet.",
  },
  {
    question: "Does this prepare drivers for the FMCSA English proficiency check?",
    answer:
      "It can help drivers practice the spoken part of a roadside interaction in English. FMCSA advises carriers to evaluate whether drivers can communicate with law enforcement during the qualification process. Roleplay makes that practice repeatable and private, but it is not a certification or legal determination.",
  },
  {
    question: "What does the driver see after a conversation?",
    answer:
      "A pass-or-fail scorecard with a short summary and per-criterion feedback written to the driver, based only on what they actually said. If they fail, they can immediately try again.",
  },
  {
    question: "Who writes the scenarios?",
    answer:
      "Your team does. Describe the scene, the character's role and behavior, an optional opening line, and the success criteria in plain language. You do not need to write a script or dialogue tree.",
  },
  {
    question: "What if the driver's microphone doesn't work or the call drops?",
    answer:
      "Raisedash detects a silent call and asks the driver to check the microphone and retry. Dropped connections are handled the same way, so technical problems are not scored as failed practice.",
  },
  {
    question: "Does a roleplay count toward training completion?",
    answer:
      "Yes. A roleplay is marked complete only after the driver passes the conversation. It cannot be skipped.",
  },
];

export default function AiVoiceRoleplayTraining() {
  return (
    <PageLayout
      title="AI Voice Roleplay Training for Drivers"
      description="Drivers talk out loud with an AI inspector, dispatcher, or customer and get scored against your rubric. Real practice for roadside stops and ELP checks."
      keywords={[
        "AI voice roleplay training for truck drivers",
        "driver roleplay training software",
        "practice roadside inspection conversation",
        "dispatcher call practice",
        "spoken English practice for truck drivers",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Features", url: "/features" },
          { name: "AI voice roleplay", url: "/features/ai-voice-roleplay-training" },
        ]}
      />

      <PlatformHero
        eyebrow="Voice roleplay"
        eyebrowIcon={Mic}
        title="Give drivers a safe place to practice hard conversations."
        subhead="Drivers speak with an AI inspector, dispatcher, or customer and receive feedback based on your rubric. They can practice privately on their phones before the real conversation happens."
        vignette={<RoleplayCallVignette />}
      />

      <PlatformSection
        eyebrow="Why practice matters"
        title="Knowing the answer is different from saying it under pressure"
        lede="Videos and quizzes can explain what to do. Spoken practice helps drivers do it clearly in the moment."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <p className="text-foreground text-lg leading-relaxed">
              Drivers handle conversations that affect safety, service, and compliance. A roadside
              inspection, a dispatcher call, and a difficult customer all require the driver to
              listen, respond clearly, and stay composed.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Voice roleplay lets the driver rehearse those moments with an AI character that
              responds in real time. Your team defines the situation and what a good response should
              include. The driver receives specific feedback and can practice again.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              For English-language proficiency, FMCSA advises carriers to assess whether drivers can
              communicate with law enforcement during a roadside inspection. Its{" "}
              <a
                href="https://www.fmcsa.dot.gov/regulations/what-should-motor-carrier-do-assess-cmv-drivers-english-language-proficiency-elp-during"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline-offset-2 hover:underline"
              >
                carrier guidance
              </a>{" "}
              recommends a driver interview as part of that process. Raisedash makes this kind of
              spoken practice repeatable, but your fleet still decides whether a driver is
              qualified.
            </p>
          </div>
          <div>
            <MediaFrame
              kind="loop"
              src="https://cdn.raisedash.com/media/landing/features/roleplay-roadside-inspection.mp4"
              poster="https://cdn.raisedash.com/media/landing/features/roleplay-roadside-inspection.jpg"
              caption="A roadside inspection requires a driver to listen, understand, and respond clearly in the moment."
              ariaLabel="An officer walking toward a semi truck stopped at the roadside"
            />
          </div>
        </div>
      </PlatformSection>

      <PlatformSection
        eyebrow="Driver practice"
        title="The driver does the talking"
        lede="Each driver gets a private practice partner that responds to what they actually say."
      >
        <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
          <p className="text-muted-foreground leading-relaxed">
            Every scenario is a live, two-way spoken conversation. The AI character answers what the
            driver actually says, follows the behavior your team defined, and can be interrupted
            mid-sentence. It also closes the conversation naturally when time runs low. The driver
            gets realistic practice without the consequences of making a mistake in a live
            situation.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Want drivers to feel the format first?{" "}
            <Link
              href="/tools/elp-practice"
              className="text-foreground underline-offset-2 hover:underline"
            >
              TruckTalk, our free ELP practice tool
            </Link>
            , includes roadside-conversation practice.
          </p>
        </div>
      </PlatformSection>

      <PlatformSection
        id="how-it-works"
        eyebrow="How it works"
        title="Write the scene once. Every driver gets a live partner."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection eyebrow="Built in" title="What makes it real practice">
        <FeatureGrid features={FEATURES} columns={4} accent="amber" />
      </PlatformSection>

      <PlatformSection eyebrow="Speech is the skill" title="Practice out loud, not in your head">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* A plain image is intentional: this is an externally hosted marketing asset. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://cdn.raisedash.com/media/landing/features/roleplay-ink-driver-call.webp"
            alt="A driver in a parked cab speaking toward a dash-mounted phone, an orange voice waveform rising from the screen."
            className="border-border h-auto w-full rounded-xs border"
          />
          <div>
            <p className="text-muted-foreground leading-relaxed">
              Reading about a roadside stop and getting through one are different skills. The stop
              is spoken: questions arrive out of order, in an official&apos;s phrasing, under time
              pressure. Practicing out loud with something that answers back prepares the driver for
              that experience.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Roleplay turns instruction into repeatable practice. Every passing attempt is recorded
              with the rest of the driver&apos;s{" "}
              <Link
                href="/platform/training-evidence"
                className="text-foreground underline-offset-2 hover:underline"
              >
                training history
              </Link>
              .
            </p>
          </div>
        </div>
      </PlatformSection>

      <FaqSection title="Voice roleplay questions" faqs={FAQS} />

      <FeatureCrossLinks currentSlug="ai-voice-roleplay-training" />

      <PlatformCTA
        title="Help drivers practice before the pressure is real."
        subtitle="Book a demo and try a two-minute conversation with the AI inspector."
        footnote="Roleplay scores practice performance against your rubric. It is not a legal English-proficiency determination, and your fleet decides qualification."
      />
    </PageLayout>
  );
}
