import Link from "next/link";
import { CheckCheck, Mic, RefreshCw, Smartphone, TimerReset } from "lucide-react";
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
    title: "Unlimited retries",
    description: "Drivers can try again right away, as many times as they need.",
    icon: RefreshCw,
  },
  {
    title: "Completion means passed",
    description:
      "A roleplay only counts as complete when the driver passes every required criterion.",
    icon: CheckCheck,
  },
  {
    title: "Natural call ending",
    description: "The character closes the conversation on its own when time runs low.",
    icon: TimerReset,
  },
  {
    title: "Phone browser, no app",
    description: "One-time code, mic permission, done. Nothing to install.",
    icon: Smartphone,
  },
];

const STEPS: PlatformStep[] = [
  {
    title: "Write the scenario and the character",
    description:
      "Describe who the driver is talking to (an inspector, dispatcher, shipper, manager, or customer), how the character should behave, and which details it should challenge. No script or dialogue tree needed.",
  },
  {
    title: "Set the rubric",
    description:
      "Add up to ten plain-language criteria and mark each one required or optional. Drivers see these expectations before they start.",
  },
  {
    title: "The driver talks",
    description:
      "A live spoken conversation in the phone browser. The character answers, pushes back, and can be interrupted mid-sentence.",
  },
  {
    title: "Scored against your rubric",
    description:
      "After the call, each criterion is graded using the driver's own words as evidence. Passing requires every required criterion.",
  },
  {
    title: "Feedback the driver can use",
    description:
      "A plain-language scorecard explains what went well and what to improve. Drivers can retry right away.",
  },
];

const FAQS: PlatformFaq[] = [
  {
    question: "What is AI voice roleplay training for truck drivers?",
    answer:
      "Drivers practice spoken conversations (roadside inspections, dispatcher calls, customer interactions) by talking out loud with an AI character on their phone. The character responds in real time, and feedback is based on criteria your team wrote.",
  },
  {
    question: "Does this prepare drivers for the FMCSA English proficiency check?",
    answer:
      "It lets drivers practice the spoken part of a roadside interaction in English. FMCSA advises carriers to evaluate whether drivers can communicate with law enforcement during qualification. Roleplay makes that practice repeatable and private, but it is not a certification or legal determination.",
  },
  {
    question: "What does the driver see after a conversation?",
    answer:
      "A pass-or-fail scorecard with a short summary and per-criterion feedback, based only on what they actually said. If they fail, they can try again right away.",
  },
  {
    question: "Who writes the scenarios?",
    answer:
      "Your team does. Describe the scene, the character's role and behavior, an optional opening line, and the success criteria in plain language.",
  },
  {
    question: "What if the driver's microphone doesn't work or the call drops?",
    answer:
      "Raisedash detects a silent call and asks the driver to check the microphone and retry. Dropped connections are handled the same way, so technical problems are not scored as failed practice.",
  },
  {
    question: "Does a roleplay count toward training completion?",
    answer:
      "Yes. A roleplay is marked complete only after the driver passes. It cannot be skipped.",
  },
];

export default function AiVoiceRoleplayTraining() {
  return (
    <PageLayout
      title="AI voice roleplay training for drivers"
      description="Drivers practice roadside inspections, dispatcher calls, and customer conversations out loud with an AI character, scored against your rubric."
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
        title="Drivers practice hard conversations out loud before they happen for real."
        subhead="An AI inspector, dispatcher, or customer talks back. Your rubric decides the pass."
        vignette={<RoleplayCallVignette />}
      />

      <PlatformSection
        eyebrow="Why speaking is different"
        title="Knowing the answer is not the same as saying it under pressure"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-border bg-card rounded-xs border p-6 sm:p-8">
            <p className="text-foreground text-lg leading-relaxed">
              Roadside inspections, dispatcher calls, and difficult customers all require a driver
              to listen, respond clearly, and stay composed. Videos and quizzes can explain what to
              say. Spoken practice builds the skill of saying it.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Your team writes the scenario, the character, and the rubric. The driver speaks on
              their phone. The AI character responds in real time, pushes back, and can be
              interrupted. After the call, a scorecard shows what went well and what to improve,
              graded against your criteria. Every passing attempt is recorded with the rest of the
              driver&apos;s{" "}
              <Link
                href="/platform/training-evidence"
                className="text-foreground underline-offset-2 hover:underline"
              >
                training history
              </Link>
              .
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
              recommends a driver interview as part of that process. Roleplay makes this kind of
              spoken practice repeatable, but your fleet still decides whether a driver is
              qualified.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Want drivers to try the format first?{" "}
              <Link
                href="/tools/elp-practice"
                className="text-foreground underline-offset-2 hover:underline"
              >
                TruckTalk, our free ELP practice tool
              </Link>
              , includes roadside-conversation practice.
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
        id="how-it-works"
        eyebrow="How it works"
        title="Write the scene once. Every driver gets a live partner."
      >
        <StepList steps={STEPS} />
      </PlatformSection>

      <PlatformSection eyebrow="Also built in" title="How practice stays useful">
        <FeatureGrid features={FEATURES} columns={4} accent="amber" />
      </PlatformSection>

      <FaqSection title="Voice roleplay questions" faqs={FAQS} />

      <FeatureCrossLinks currentSlug="ai-voice-roleplay-training" />

      <PlatformCTA
        title="Let drivers practice before the pressure is real."
        subtitle="Book a demo and try a two-minute conversation with the AI inspector."
        footnote="Roleplay scores practice performance against your rubric. It is not a legal English-proficiency determination, and your fleet decides qualification."
      />
    </PageLayout>
  );
}
