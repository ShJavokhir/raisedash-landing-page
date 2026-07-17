import { useId, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarClock, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isValidEmail } from "@/lib/validation";
import { cn } from "@/lib/utils";
import {
  FLEET_OPTIONS,
  ROLE_OPTIONS,
  HEADACHE_OPTIONS,
  type Choice,
} from "@/components/demo-funnel/options";

/**
 * The /demo funnel — the site's primary CTA target. Every "Get started" email
 * capture lands here and picks a path on the first screen:
 *
 *  - "Book a demo": a lightweight, one-question-per-screen flow (fleet size,
 *    role, headaches, contact). On submit the answers POST to /api/demo-lead,
 *    which notifies the team over Telegram, and the user sees a "we'll reach
 *    out" screen with a self-serve scheduling link.
 *  - "Set up my fleet myself": hands off to the dashboard's WorkOS signup at
 *    app.raisedash.com/sign-up. Its ?email= param prefills the WorkOS form
 *    (loginHint); the dashboard then auto-creates the org and collects a card
 *    (14-day trial starts at card-on-file, nothing charged up front).
 *
 * Keeps the normal marketing design system (site tokens + shared ui components).
 * It is intentionally NOT the stripped ad funnel: no Meta Pixel, no PostHog.
 * Built standalone (it does not import from the frozen start / start-v2 funnels)
 * so this flow can never regress the live ad funnels.
 */

const CAL_LINK = "https://cal.com/javokhir/raisedash-demo-meeting";
const APP_SIGNUP_URL = "https://app.raisedash.com/sign-up";

// trucks, role, headache, name+company, contact — the done screen isn't a step.
const TOTAL_STEPS = 5;

/** Mirrors the /api/demo-lead rule: phone is optional, but 7–15 digits when present. */
function isPlausiblePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Human messages for the field names /api/demo-lead returns in its 400 body,
 * so a rejected submit says what to fix instead of a generic failure.
 */
const FIELD_MESSAGES: Record<string, string> = {
  fleetSize: "Your fleet size answer didn't come through — go back and pick it again.",
  role: "Your role answer didn't come through — go back and pick it again.",
  headaches: "Your headache answer didn't come through — go back and pick at least one.",
  fullName: "Your name needs at least 2 characters — go back to fix it.",
  company: "Your company name needs at least 2 characters — go back to fix it.",
  email: "That email address doesn't look valid — please check it.",
  phone: "That phone number doesn't look valid — use 7 to 15 digits, or leave it blank.",
};

interface FunnelData {
  fleetSize: string;
  role: string;
  headaches: string[];
  fullName: string;
  company: string;
  email: string;
  /** Optional. */
  phone: string;
  /** Honeypot — stays "" for humans; bots that fill every field trip it. */
  companyWebsite: string;
}

const EMPTY: FunnelData = {
  fleetSize: "",
  role: "",
  headaches: [],
  fullName: "",
  company: "",
  email: "",
  phone: "",
  companyWebsite: "",
};

export function DemoFunnel() {
  const [step, setStep] = useState(0);
  // Prefill the email the homepage capture stashed so the contact step doesn't
  // ask for it twice. Lazy initializer: sessionStorage exists only client-side,
  // and the email input isn't rendered on step 0, so hydration stays consistent.
  const [data, setData] = useState<FunnelData>(() => {
    if (typeof window === "undefined") return EMPTY;
    try {
      const captured = sessionStorage.getItem("rd_captured_email");
      return captured ? { ...EMPTY, email: captured } : EMPTY;
    } catch {
      return EMPTY;
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // The first screen is the demo-vs-self-serve fork, not a numbered step.
  const [choosingPath, setChoosingPath] = useState(true);

  const set = (patch: Partial<FunnelData>) => setData((d) => ({ ...d, ...patch }));
  const next = () => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  // A clickable single-choice answer commits and advances in one tap.
  const choose = (patch: Partial<FunnelData>) => {
    set(patch);
    next();
  };

  const toggleHeadache = (value: string) =>
    setData((d) => ({
      ...d,
      headaches: d.headaches.includes(value)
        ? d.headaches.filter((h) => h !== value)
        : [...d.headaches, value],
    }));

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/demo-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fleetSize: data.fleetSize,
          role: data.role,
          headaches: data.headaches,
          fullName: data.fullName.trim(),
          company: data.company.trim(),
          email: data.email.trim(),
          phone: data.phone.trim() || undefined,
          companyWebsite: data.companyWebsite || undefined,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        return;
      }
      let fields: string[] = [];
      try {
        const body = (await res.json()) as { fields?: unknown };
        if (Array.isArray(body.fields)) fields = body.fields.map(String);
      } catch {
        // Non-JSON error body — fall through to the generic message.
      }
      const messages = fields.map((f) => FIELD_MESSAGES[f]).filter(Boolean);
      setError(
        messages.length > 0
          ? messages.join(" ")
          : "We couldn't send your request. Please try again in a moment."
      );
    } catch {
      setError("We couldn't reach the server — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return <DoneScreen />;

  if (choosingPath) {
    return (
      <div className="bg-card border-border rounded-xs border p-6 sm:p-8">
        <PathChooser email={data.email.trim()} onBookDemo={() => setChoosingPath(false)} />
      </div>
    );
  }

  return (
    <div className="bg-card border-border rounded-xs border p-6 sm:p-8">
      <ProgressHeader step={step} onBack={step > 0 ? back : () => setChoosingPath(true)} />

      {/* key re-triggers the enter animation on every step change */}
      <div key={step} className="animate-fade-in-up mt-8">
        {step === 0 && (
          <ChoiceStep
            title="How many drivers do you run?"
            options={FLEET_OPTIONS}
            selected={data.fleetSize}
            onSelect={(value) => choose({ fleetSize: value })}
          />
        )}

        {step === 1 && (
          <ChoiceStep
            title="What's your role?"
            options={ROLE_OPTIONS}
            selected={data.role}
            onSelect={(value) => choose({ role: value })}
          />
        )}

        {step === 2 && (
          <MultiChoiceStep
            title="What's your biggest headache right now?"
            subtitle="Pick everything that applies."
            options={HEADACHE_OPTIONS}
            selected={data.headaches}
            onToggle={toggleHeadache}
            onContinue={next}
          />
        )}

        {step === 3 && <NameStep data={data} set={set} onContinue={next} />}

        {step === 4 && (
          <ContactStep
            data={data}
            set={set}
            submitting={submitting}
            error={error}
            onSubmit={submit}
          />
        )}
      </div>
    </div>
  );
}

const PATH_CARD_CLASSES = cn(
  "group flex w-full items-center justify-between gap-4 rounded-xs border px-5 py-5 text-left transition-all duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)]",
  "border-border bg-card hover:bg-surface-2 hover:-translate-y-0.5",
  "focus-visible:outline-ring focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2"
);

/** The fork screen: guided demo funnel vs self-serve signup in the app. */
function PathChooser({ email, onBookDemo }: { email: string; onBookDemo: () => void }) {
  const signupUrl = isValidEmail(email)
    ? `${APP_SIGNUP_URL}?email=${encodeURIComponent(email)}`
    : APP_SIGNUP_URL;

  // Fire-and-forget Telegram note that this lead went self-serve; keepalive lets
  // the request finish while the browser navigates away to the app.
  const logSelfServe = () => {
    if (!isValidEmail(email)) return;
    fetch("/api/email-capture", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, source: "Self-serve signup (/demo)" }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <div className="space-y-6">
      <StepHeading
        title="How do you want to start?"
        subtitle="Both take a few minutes — pick what fits."
      />
      <div className="space-y-3">
        <button type="button" onClick={onBookDemo} className={PATH_CARD_CLASSES}>
          <span className="flex-1">
            <span className="text-foreground block text-lg font-normal tracking-[-0.01em]">
              Book a demo
            </span>
            <span className="text-muted-foreground mt-1 block text-sm leading-relaxed">
              Answer a few quick questions and we&apos;ll walk you through the platform within one
              business day.
            </span>
          </span>
          <ChevronRight className="text-muted-foreground size-5 shrink-0" />
        </button>
        <a href={signupUrl} onClick={logSelfServe} className={PATH_CARD_CLASSES}>
          <span className="flex-1">
            <span className="text-foreground block text-lg font-normal tracking-[-0.01em]">
              Set up my fleet myself
            </span>
            <span className="text-muted-foreground mt-1 block text-sm leading-relaxed">
              Create an account and send your first orientation today. Free 14-day trial starts when
              you add a card — nothing is charged up front.
            </span>
          </span>
          <ArrowRight className="text-muted-foreground size-5 shrink-0" />
        </a>
      </div>
    </div>
  );
}

function ProgressHeader({ step, onBack }: { step: number; onBack?: () => void }) {
  return (
    <div className="flex items-center gap-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="text-muted-foreground hover:text-foreground hover:bg-muted flex size-9 shrink-0 items-center justify-center rounded-xs transition-colors"
        >
          <ArrowLeft className="size-5" />
        </button>
      ) : (
        <div className="size-9 shrink-0" aria-hidden />
      )}
      <div className="flex flex-1 items-center gap-1.5" aria-hidden>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              i <= step ? "bg-primary" : "bg-surface-3"
            )}
          />
        ))}
      </div>
      <span className="text-muted-foreground w-10 shrink-0 text-right text-sm tabular-nums">
        {step + 1} / {TOTAL_STEPS}
      </span>
    </div>
  );
}

function StepHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] text-balance">
        {title}
      </h2>
      {subtitle ? <p className="text-muted-foreground text-base">{subtitle}</p> : null}
    </div>
  );
}

function ChoiceStep({
  title,
  subtitle,
  options,
  selected,
  onSelect,
}: {
  title: string;
  subtitle?: string;
  options: Choice[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading title={title} subtitle={subtitle} />
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              "flex w-full items-center justify-between gap-3 rounded-xs border px-5 py-4 text-left text-base font-normal transition-all duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)]",
              "hover:bg-surface-2 hover:-translate-y-0.5",
              "focus-visible:outline-ring focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
              selected === opt.value ? "border-primary bg-surface-2" : "border-border bg-card"
            )}
          >
            <span className="text-foreground">{opt.label}</span>
            <ChevronRight className="text-muted-foreground size-5 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Like ChoiceStep but several answers can be picked; a Continue button advances. */
function MultiChoiceStep({
  title,
  subtitle,
  options,
  selected,
  onToggle,
  onContinue,
}: {
  title: string;
  subtitle?: string;
  options: Choice[];
  selected: string[];
  onToggle: (value: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className="space-y-6">
      <StepHeading title={title} subtitle={subtitle} />
      <div className="space-y-3">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              aria-pressed={isSelected}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xs border px-5 py-4 text-left text-base font-normal transition-all duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)]",
                "hover:bg-surface-2 hover:-translate-y-0.5",
                "focus-visible:outline-ring focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
                isSelected ? "border-primary bg-surface-2" : "border-border bg-card"
              )}
            >
              <span className="text-foreground">{opt.label}</span>
              <span
                aria-hidden
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-xs border transition-colors",
                  isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"
                )}
              >
                {isSelected ? <Check className="size-3.5" /> : null}
              </span>
            </button>
          );
        })}
      </div>
      <Button
        type="button"
        size="lg"
        className="w-full"
        onClick={onContinue}
        disabled={selected.length === 0}
      >
        Continue <ArrowRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}

/** Step 4 — name + company, both required. */
function NameStep({
  data,
  set,
  onContinue,
}: {
  data: FunnelData;
  set: (patch: Partial<FunnelData>) => void;
  onContinue: () => void;
}) {
  const canContinue = data.fullName.trim().length >= 2 && data.company.trim().length >= 2;
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (canContinue) onContinue();
      }}
    >
      <StepHeading title="Who should we talk to?" />
      <div className="space-y-4">
        <Input
          label="Your name"
          type="text"
          value={data.fullName}
          onChange={(e) => set({ fullName: e.target.value })}
          autoComplete="name"
          autoCapitalize="words"
          placeholder="Alex Morgan"
          autoFocus
        />
        <Input
          label="Company"
          type="text"
          value={data.company}
          onChange={(e) => set({ company: e.target.value })}
          autoComplete="organization"
          autoCapitalize="words"
          placeholder="Acme Trucking"
        />
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={!canContinue}>
        Continue <ArrowRight className="ml-2 size-4" />
      </Button>
    </form>
  );
}

/** Step 5 — work email (required) + phone (optional). Submitting sends the lead. */
function ContactStep({
  data,
  set,
  submitting,
  error,
  onSubmit,
}: {
  data: FunnelData;
  set: (patch: Partial<FunnelData>) => void;
  submitting: boolean;
  error: string | null;
  onSubmit: () => void;
}) {
  const emailId = useId();
  const phoneId = useId();
  const emailValid = isValidEmail(data.email.trim());
  const showEmailHint = data.email.trim().length > 3 && !emailValid;
  const phone = data.phone.trim();
  const phoneValid = phone === "" || isPlausiblePhone(phone);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitting && emailValid && phoneValid) onSubmit();
      }}
    >
      <StepHeading
        title="Where should we reach you?"
        subtitle="We'll follow up within one business day."
      />
      <div className="space-y-4">
        <Input
          id={emailId}
          label="Work email"
          type="email"
          inputMode="email"
          value={data.email}
          onChange={(e) => set({ email: e.target.value })}
          autoComplete="email"
          autoCapitalize="off"
          autoCorrect="off"
          placeholder="you@company.com"
          error={showEmailHint ? "Enter a valid email address." : undefined}
          autoFocus
        />
        <Input
          id={phoneId}
          label="Phone (optional)"
          type="tel"
          inputMode="tel"
          value={data.phone}
          onChange={(e) => set({ phone: e.target.value })}
          autoComplete="tel"
          placeholder="+1 (555) 000-0000"
          error={
            !phoneValid
              ? "Enter a phone number with 7 to 15 digits, or leave this blank."
              : undefined
          }
        />
      </div>

      {/* Honeypot: hidden from humans, catches form-filling bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.companyWebsite}
          onChange={(e) => set({ companyWebsite: e.target.value })}
        />
      </div>

      {error ? (
        <p role="alert" className="text-destructive text-sm">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!emailValid || !phoneValid || submitting}
        isLoading={submitting}
        loadingText="Sending…"
      >
        Book my demo <ArrowRight className="ml-2 size-4" />
      </Button>
      <p className="text-muted-foreground text-center text-[13px]">
        No spam. A real person reads every request.
      </p>
    </form>
  );
}

function DoneScreen() {
  return (
    <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 text-center sm:p-10">
      <div className="bg-primary/10 mx-auto mb-5 flex size-14 items-center justify-center rounded-full">
        <Check className="text-primary size-7" />
      </div>
      <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em]">
        Thanks — we&apos;ll reach out within one business day.
      </h2>
      <p className="text-muted-foreground mx-auto mt-3 max-w-md text-base leading-relaxed">
        A real person on our team will get back to you to set up your demo of the driver readiness
        platform.
      </p>
      <div className="mt-8">
        <a
          href={CAL_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-sm transition-colors"
        >
          <CalendarClock className="size-4" />
          Or grab a time now
        </a>
      </div>
    </div>
  );
}

export default DemoFunnel;
