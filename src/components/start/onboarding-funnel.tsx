import { useId, useRef, useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/start/button";
import { Card, CardContent } from "@/components/start/card";
import { Input } from "@/components/start/input";
import { Field } from "@/components/start/form-field";
import { PhoneInput } from "@/components/start/phone-input";
import { apiPost, errorMessage } from "@/lib/start-api";
import { collectAttribution, compactAttribution, newEventId, trackPixel } from "@/lib/meta-pixel";
import { cn } from "@/lib/utils";

/**
 * Public onboarding funnel for Meta (Facebook/Instagram) ads. Designed for the
 * mobile in-app browser: tappable, one question per screen, easy clickable
 * answers first to build commitment, the high-friction contact details last —
 * by the time we ask, the user is invested. On the final submit we persist the
 * lead and fire the Lead conversion (browser Pixel + server CAPI, deduplicated
 * by a shared event id). No account is created here — that happens later, via the
 * email we send. Copied from the dashboard's app/(public)/start/onboarding-funnel.tsx.
 */

interface Choice {
  value: string;
  label: string;
}

const FLEET_SIZES: Choice[] = [
  { value: "1", label: "Just 1 — owner-operator" },
  { value: "2-4", label: "2–4 trucks" },
  { value: "5-8", label: "5–8 trucks" },
  { value: "9+", label: "9 or more" },
];

const WORRIES: Choice[] = [
  { value: "audit", label: "Passing a DOT audit" },
  { value: "deadlines", label: "Missing a deadline" },
  { value: "paperwork", label: "Messy paperwork" },
  { value: "drug_alcohol", label: "Drug & alcohol program" },
];

const TOTAL_STEPS = 5; // fleet, worry, name, email, contact (done is not counted)

interface FunnelData {
  fleetSize: string;
  biggestWorry: string;
  name: string;
  email: string;
  usDot: string;
  phone: string;
  /** Honeypot — stays '' for humans; bots that fill every field trip it. */
  companyWebsite: string;
}

const EMPTY: FunnelData = {
  fleetSize: "",
  biggestWorry: "",
  name: "",
  email: "",
  usDot: "",
  phone: "",
  companyWebsite: "",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isDot = (v: string) => /^\d{5,8}$/.test(v.trim());

export function OnboardingFunnel() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FunnelData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Stable across retries so the Pixel and CAPI Lead always dedup to one event.
  const eventIdRef = useRef<string>("");
  const pixelFiredRef = useRef(false);

  const set = (patch: Partial<FunnelData>) => setData((d) => ({ ...d, ...patch }));
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  // A clickable answer commits and advances in one tap.
  const choose = (patch: Partial<FunnelData>) => {
    set(patch);
    next();
  };

  async function submit() {
    if (!isDot(data.usDot)) {
      setError("Enter a valid USDOT number (5–8 digits).");
      return;
    }
    setSubmitting(true);
    setError(null);
    if (!eventIdRef.current) eventIdRef.current = newEventId();
    const eventId = eventIdRef.current;

    try {
      await apiPost("public/onboarding", {
        usDot: data.usDot.trim(),
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone || undefined,
        fleetSize: data.fleetSize || undefined,
        biggestWorry: data.biggestWorry || undefined,
        companyWebsite: data.companyWebsite || undefined,
        eventId,
        clientUserAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        attribution: compactAttribution(collectAttribution()),
      });

      // Fire the browser Lead only after a real, persisted lead — same event id
      // as the server event, so Meta keeps one. Once, even across retries.
      if (!pixelFiredRef.current) {
        trackPixel("Lead", {}, eventId);
        pixelFiredRef.current = true;
      }
      setStep(TOTAL_STEPS); // done
    } catch (e) {
      setError(errorMessage(e, "Something went wrong — please try again."));
    } finally {
      setSubmitting(false);
    }
  }

  if (step >= TOTAL_STEPS) {
    return <DoneStep email={data.email.trim()} />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <ProgressHeader step={step} onBack={step > 0 ? back : undefined} />

      {/* key re-triggers the enter animation on every step change */}
      <div
        key={step}
        className="animate-in fade-in-0 slide-in-from-bottom-2 flex flex-1 flex-col duration-300"
      >
        {step === 0 && (
          <ChoiceStep
            title="How many trucks do you run?"
            subtitle="We’ll tailor your DOT file to your operation."
            options={FLEET_SIZES}
            selected={data.fleetSize}
            onSelect={(value) => choose({ fleetSize: value })}
            footer="Free to start · No credit card · About a minute"
          />
        )}

        {step === 1 && (
          <ChoiceStep
            title="What’s weighing on you most?"
            subtitle="Pick the one that’d hurt most right now."
            options={WORRIES}
            selected={data.biggestWorry}
            onSelect={(value) => choose({ biggestWorry: value })}
          />
        )}

        {step === 2 && (
          <TextStep
            title="Let’s set up your account."
            subtitle="First — what should we call you?"
            label="Your name"
            value={data.name}
            onChange={(name) => set({ name })}
            valid={data.name.trim().length >= 2}
            inputProps={{
              autoComplete: "name",
              placeholder: "Sam Carrier",
              autoFocus: true,
            }}
            onContinue={next}
          />
        )}

        {step === 3 && (
          <TextStep
            title="Where should we send your access?"
            subtitle="We’ll email you a link to open Raisedash."
            label="Email address"
            value={data.email}
            onChange={(email) => set({ email })}
            valid={isEmail(data.email)}
            invalidHint={
              data.email.length > 3 && !isEmail(data.email)
                ? "Enter a valid email address."
                : undefined
            }
            inputProps={{
              type: "email",
              inputMode: "email",
              autoComplete: "email",
              placeholder: "you@company.com",
              autoFocus: true,
            }}
            onContinue={next}
          />
        )}

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
    <div className="mb-6 flex items-center gap-3">
      {onBack ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          aria-label="Back"
          className="text-muted-foreground hover:text-foreground shrink-0"
        >
          <ArrowLeft className="size-5" />
        </Button>
      ) : (
        <div className="size-8 shrink-0" aria-hidden />
      )}
      <div className="flex flex-1 items-center gap-1.5" aria-hidden>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-300",
              i <= step ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      <span className="text-muted-foreground w-9 shrink-0 text-right text-xs font-medium tabular-nums">
        {step + 1} / {TOTAL_STEPS}
      </span>
    </div>
  );
}

function StepHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-1.5">
      <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
      {subtitle ? <p className="text-muted-foreground text-sm">{subtitle}</p> : null}
    </div>
  );
}

function ChoiceStep({
  title,
  subtitle,
  options,
  selected,
  onSelect,
  footer,
}: {
  title: string;
  subtitle?: string;
  options: Choice[];
  selected: string;
  onSelect: (value: string) => void;
  footer?: string;
}) {
  return (
    <div className="space-y-6">
      <StepHeading title={title} subtitle={subtitle} />
      <div className="space-y-2.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              "bg-card flex w-full items-center justify-between gap-3 rounded-lg border px-4 py-3.5 text-left text-sm font-medium transition-colors",
              "hover:border-primary/40 hover:bg-muted active:translate-y-px",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none",
              selected === opt.value ? "border-primary ring-primary/20 ring-2" : "border-border"
            )}
          >
            {opt.label}
            <ChevronRight className="text-muted-foreground size-4 shrink-0" />
          </button>
        ))}
      </div>
      {footer ? <p className="text-muted-foreground text-center text-xs">{footer}</p> : null}
    </div>
  );
}

function TextStep({
  title,
  subtitle,
  label,
  value,
  onChange,
  valid,
  invalidHint,
  inputProps,
  onContinue,
}: {
  title: string;
  subtitle?: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  valid: boolean;
  invalidHint?: string;
  inputProps?: React.ComponentProps<typeof Input>;
  onContinue: () => void;
}) {
  const fieldId = useId();
  const hintId = `${fieldId}-hint`;
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onContinue();
      }}
    >
      <StepHeading title={title} subtitle={subtitle} />
      <Field label={label} htmlFor={fieldId}>
        <Input
          id={fieldId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalidHint ? true : undefined}
          aria-describedby={invalidHint ? hintId : undefined}
          {...inputProps}
        />
        {invalidHint ? (
          <p id={hintId} role="alert" className="text-destructive text-xs">
            {invalidHint}
          </p>
        ) : null}
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={!valid}>
        Continue
      </Button>
    </form>
  );
}

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
  const dotValid = isDot(data.usDot);
  const dotId = useId();
  const phoneId = useId();
  const phoneHintId = `${phoneId}-hint`;
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitting) onSubmit();
      }}
    >
      <StepHeading
        title="Last step — your USDOT number."
        subtitle="It’s how we pull your carrier’s record and build your file."
      />

      <div className="space-y-4">
        <Field label="USDOT number" htmlFor={dotId}>
          <Input
            id={dotId}
            value={data.usDot}
            onChange={(e) => set({ usDot: e.target.value.replace(/\D/g, "").slice(0, 8) })}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="e.g. 1234567"
            autoFocus
          />
        </Field>

        <Field label="Phone (optional)" htmlFor={phoneId}>
          <PhoneInput id={phoneId} value={data.phone} onChange={(phone) => set({ phone })} />
          <p id={phoneHintId} className="text-muted-foreground text-xs">
            Only if you’d like setup help by text.
          </p>
        </Field>

        {/* Honeypot: hidden from humans, catches form-filling bots. The value
            is sent to the server, which silently drops any lead that has it. */}
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
      </div>

      {error ? (
        <p role="alert" className="text-destructive text-sm">
          {error}
        </p>
      ) : null}

      <div className="space-y-3">
        <Button type="submit" size="lg" className="w-full" disabled={!dotValid || submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Setting up…
            </>
          ) : (
            "Get my access"
          )}
        </Button>
        <p className="text-muted-foreground text-center text-xs">
          We use your details only to set up your account. No spam, ever.
        </p>
      </div>
    </form>
  );
}

function DoneStep({ email }: { email: string }) {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-2 flex flex-1 flex-col justify-center py-10 duration-300">
      <Card>
        <CardContent className="space-y-5 py-9 text-center">
          <div className="bg-primary/10 text-primary mx-auto flex size-12 items-center justify-center rounded-full">
            <BadgeCheck className="size-6" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              You’re in — check your email.
            </h1>
            <p className="text-muted-foreground text-sm">
              We just sent{" "}
              {email ? <span className="text-foreground font-medium">{email}</span> : "you"} a link
              to open Raisedash and start getting your DOT file ready.
            </p>
          </div>
          <p className="text-muted-foreground text-xs">
            It can take a minute to arrive. If you don’t see it, check your spam or promotions
            folder.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
