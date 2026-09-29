import { useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Download,
  ListChecks,
  MessageSquare,
  Send,
  ShieldCheck,
  Smartphone,
  Star,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { StepList } from "@/components/platform/StepList";
import {
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";

const CONTACT_LINK = "https://t.me/raisedash";
const buttonClass =
  "bg-primary text-primary-foreground hover:bg-primary/90 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";
const features = [
  {
    icon: ListChecks,
    title: "Ask it your way",
    text: "Written answers, single choice, multiple choice, and ratings from 1 to 5. Make the important questions required.",
  },
  {
    icon: ShieldCheck,
    title: "Anonymous or named",
    text: "Choose before you publish. Anonymous answers have no name or Telegram group attached. Named surveys ask drivers to enter their name.",
  },
  {
    icon: Smartphone,
    title: "Made for a driver’s phone",
    text: "A link opens the survey right on the phone. No new app, account, or password for drivers.",
  },
  {
    icon: Send,
    title: "Send to your groups",
    text: "Choose your connected Telegram groups in the dashboard. The bot posts a link drivers can open when they have a moment.",
  },
  {
    icon: MessageSquare,
    title: "Read every response",
    text: "See response counts, choice totals, and written answers in one place. Only company admins can view the results.",
  },
  {
    icon: Download,
    title: "Keep the answers",
    text: "Download responses as a CSV. Close the survey when you are done, or duplicate it to ask again with a fresh set of responses.",
  },
];
const faqs: FAQItem[] = [
  {
    question: "How do I get started?",
    answer:
      "Message us on Telegram at @raisedash. We’ll help connect your company and driver groups, explain pricing, and show you how to send your first survey.",
  },
  {
    question: "Do drivers need a Raisedash account?",
    answer:
      "No. Drivers open the link in the group and answer on their phone. There is no sign-in or app download.",
  },
  {
    question: "How does anonymous feedback work?",
    answer:
      "Anonymous responses have no name or Telegram group attached. The same survey link is shared with every selected group. If only one person answers, or the answer describes a specific incident, the company may still recognize them.",
  },
  {
    question: "Who can see the answers?",
    answer:
      "Only your company’s admins can view or export responses in the dashboard. Answers are not posted back into the Telegram group.",
  },
  {
    question: "Can someone answer more than once?",
    answer:
      "The page prevents accidental duplicate submissions and remembers a completed response in the same browser. The link does not verify a driver’s identity, so it cannot enforce one response per person. Anyone the link is shared with can answer while the survey is open.",
  },
  {
    question: "Can I change a survey after sending it?",
    answer:
      "Publishing locks the questions and privacy setting so all responses refer to the same survey. You can close it at any time, keep the existing answers, and duplicate it to make a new version.",
  },
];

/** Local demonstration only. It does not collect or transmit an answer. */
function SurveyDemo() {
  const [rating, setRating] = useState<number | null>(null);
  const [sent, setSent] = useState(false);
  return (
    <div className="rounded-xs bg-[#e7ecf4] p-5 sm:p-10">
      <div className="mb-5 flex items-center justify-between gap-2 text-xs text-[#334766]">
        <span className="inline-flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Driver feedback
        </span>
        <span>Interactive example</span>
      </div>
      <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-black/10 bg-[#fffefa] text-[#26251e] shadow-lg">
        <div className="border-b border-black/10 px-6 py-4 text-xs text-[#6d6c63]">
          EXAMPLE FLEET · WEEKLY CHECK-IN
        </div>
        {sent ? (
          <div className="space-y-4 px-6 py-12 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-[#265b43]" />
            <h3 className="text-xl">Thank you</h3>
            <p className="text-sm text-[#6d6c63]">Your feedback was sent to Example Fleet.</p>
            <p className="text-xs text-[#6d6c63]">This example did not save or send anything.</p>
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setRating(null);
              }}
              className="min-h-11 text-sm underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="space-y-6 p-6">
            <div>
              <h3 className="text-2xl leading-snug tracking-tight">
                How was your week on the road?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6d6c63]">
                Help us make next week a little better.
              </p>
            </div>
            <p className="flex items-center gap-1.5 text-sm">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              Anonymous feedback
            </p>
            <fieldset>
              <legend className="mb-3 text-sm">How supported did you feel?</legend>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <label
                    key={value}
                    className={`relative grid min-h-12 cursor-pointer place-items-center rounded-md border text-sm focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#365c93] ${rating === value ? "border-[#365c93] bg-[#365c93] text-white" : "border-black/15"}`}
                  >
                    <input
                      type="radio"
                      name="demo-rating"
                      value={value}
                      checked={rating === value}
                      onChange={() => setRating(value)}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                    {value}
                  </label>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-[#6d6c63]">
                <span>Not supported</span>
                <span>Very supported</span>
              </div>
            </fieldset>
            <button
              type="button"
              disabled={rating === null}
              onClick={() => setSent(true)}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#26251e] px-4 text-sm text-white disabled:opacity-40"
            >
              Try submitting <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-[#6d6c63]">
              Example only. Nothing is collected.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FeedbackTelegramBotPage() {
  return (
    <PageLayout
      title="Driver Feedback and Surveys in Telegram"
      description="Create a short survey, send it to your driver Telegram groups, and see the answers in one dashboard. Anonymous or named feedback. No sign-in for drivers."
      keywords={[
        "driver feedback",
        "trucking driver survey",
        "telegram survey bot",
        "fleet driver feedback",
        "anonymous driver feedback",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Feedback Bot", url: "/products/feedback-telegram-bot" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Feedback for Telegram"
        description="Create driver surveys, send links to connected Telegram groups, and review or export anonymous or named responses in your company dashboard."
        operatingSystem={["Web", "iOS", "Android"]}
      />
      <FAQPageJsonLd faqs={faqs} />
      <Container className="py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-muted-foreground mb-4 text-sm">Raisedash Feedback Bot</p>
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              Hear from the people behind the wheel.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Send a short survey to your driver Telegram groups. Find out what is working, what is
              frustrating, and what would make the next trip better.
            </p>
            <a href={CONTACT_LINK} className={`${buttonClass} mt-7`}>
              Message us on Telegram <Send className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="text-muted-foreground mt-3 text-sm">
              Anonymous or named. No sign-in for drivers.
            </p>
          </div>
          <div className="lg:col-span-7">
            <SurveyDemo />
          </div>
        </div>
      </Container>
      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="feedback-how">
          <h2 id="feedback-how" className="mb-8 text-2xl font-normal tracking-tight">
            From a question to a clearer picture.
          </h2>
          <StepList
            steps={[
              {
                title: "Build a short survey",
                description:
                  "Write your questions in the dashboard. Choose anonymous or named responses, then preview what drivers will see.",
              },
              {
                title: "Send it to your groups",
                description:
                  "Pick your connected Telegram groups. The bot posts the survey link, and drivers answer on their phones.",
              },
              {
                title: "Read, learn, and follow up",
                description:
                  "Review the answers in your dashboard. See choice totals, read written feedback, and export the responses for your team.",
              },
            ]}
          />
        </section>
      </Container>
      <Container className="pb-12 sm:pb-16">
        <section
          className="border-border bg-card grid gap-8 rounded-xs border p-6 sm:p-10 lg:grid-cols-2"
          aria-labelledby="feedback-use-cases"
        >
          <div>
            <h2 id="feedback-use-cases" className="text-2xl font-normal tracking-tight">
              Ask while the experience is still fresh.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg leading-relaxed">
              You do not need a long annual survey to learn something useful. Start with a few
              questions about the work your drivers do every day.
            </p>
          </div>
          <ul className="space-y-5">
            {[
              "How did your first week go?",
              "Did dispatch give you the information you needed?",
              "What would make pickup and delivery easier?",
              "What is one thing we should change?",
            ].map((question) => (
              <li key={question} className="flex gap-3 text-base">
                <Check className="text-muted-foreground mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                {question}
              </li>
            ))}
          </ul>
        </section>
      </Container>
      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="feedback-features">
          <h2 id="feedback-features" className="mb-8 text-2xl font-normal tracking-tight">
            Everything you need to start listening.
          </h2>
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <div className="bg-card mb-4 grid h-12 w-12 place-items-center rounded-lg">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-normal">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
        </section>
      </Container>
      <Container className="pb-12 sm:pb-16">
        <section
          className="border-border grid gap-8 border-y py-10 sm:grid-cols-2"
          aria-labelledby="feedback-privacy"
        >
          <div>
            <ShieldCheck className="mb-4 h-6 w-6" aria-hidden="true" />
            <h2 id="feedback-privacy" className="text-2xl font-normal tracking-tight">
              Be clear about who sees what.
            </h2>
          </div>
          <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
            <p>
              Drivers see the privacy choice before they answer. Anonymous responses have no name or
              Telegram group attached. Named responses include the name the driver enters.
            </p>
            <p>
              Only company admins can review the answers. Feedback stays out of the group chat.
              Remind drivers to avoid identifying details if you want candid, anonymous feedback.
            </p>
          </div>
        </section>
      </Container>
      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="feedback-faq">
          <h2 id="feedback-faq" className="mb-6 text-2xl font-normal tracking-tight">
            Questions
          </h2>
          <div className="divide-border border-border divide-y border-y">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-base [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    className="text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="text-muted-foreground max-w-3xl pb-5 text-base leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </Container>
      <Container className="pb-12 sm:pb-16">
        <section className="border-border bg-card rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14">
          <Star className="mx-auto mb-4 h-6 w-6" aria-hidden="true" />
          <h2 className="text-2xl font-normal tracking-tight sm:text-3xl">
            Your next improvement starts with a question.
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-base leading-relaxed">
            Message us on Telegram. We’ll explain pricing, connect your groups, and help you send
            your first survey.
          </p>
          <a href={CONTACT_LINK} className={`${buttonClass} mt-7`}>
            Get started with Feedback <Send className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>
      </Container>
    </PageLayout>
  );
}
