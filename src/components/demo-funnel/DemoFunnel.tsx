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
 * The /demo "book a demo" funnel — the site's primary CTA target.
 *
 * A lightweight, one-question-per-screen flow that keeps the normal marketing
 * design system (site tokens + shared ui components). It is intentionally NOT the
 * stripped ad funnel: no Meta Pixel, no PostHog, no backend account. On submit the
 * answers POST to /api/demo-lead, which notifies the team over Telegram, and the
 * user sees a "we'll reach out" screen with a self-serve scheduling link.
 *
 * Built standalone (it does not import from the frozen start / start-v2 funnels)
 * so this flow can never regress the live ad funnels.
 */

const CAL_LINK = "https://cal.com/javokhir/raisedash-demo-meeting";

// trucks, role, headache, name+company, contact — the done screen isn't a step.
const TOTAL_STEPS = 5;

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
  const [data, setData] = useState<FunnelData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return <DoneScreen />;

  return (
    <div className="bg-card border-border rounded-xs border p-6 sm:p-8">
      <ProgressHeader step={step} onBack={step > 0 ? back : undefined} />

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
  const emailValid = isValidEmail(data.email.trim());
  const showEmailHint = data.email.trim().length > 3 && !emailValid;

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitting && emailValid) onSubmit();
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
          label="Phone (optional)"
          type="tel"
          inputMode="tel"
          value={data.phone}
          onChange={(e) => set({ phone: e.target.value })}
          autoComplete="tel"
          placeholder="+1 (555) 000-0000"
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
        disabled={!emailValid || submitting}
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
        Thanks — we'll reach out within one business day.
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
