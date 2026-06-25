import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronRight, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/start/button";
import { Card, CardContent } from "@/components/start/card";
import { Input } from "@/components/start/input";
import { Field } from "@/components/start/form-field";
import { PhoneInput } from "@/components/start/phone-input";
import { isValidIntlPhone } from "@/lib/phone";
import { collectAttribution, compactAttribution, newEventId, trackPixel } from "@/lib/meta-pixel";
import { trackFunnel } from "@/lib/funnel-analytics";
import { cn } from "@/lib/utils";
import { type Choice } from "@/lib/start-v2";
import { useStartV2Options, useStartV2T } from "@/components/start-v2/i18n";

/**
 * Public lead-capture funnel for the /start-v2 page (a Meta-ad destination for
 * driver-training campaigns). Same shape as the /start onboarding funnel — mobile
 * first, one question per screen, clickable answers first to build commitment and
 * the high-friction contact details last — but its ONLY goal is collecting contact
 * info: there's no account, no scan, and no email. On submit we POST the answers
 * to /api/start-v2-lead (which notifies Telegram) and show a "we'll reach out"
 * screen.
 *
 * The small step components below mirror the /start funnel's, kept self-contained
 * on purpose so editing this lead funnel can never regress the live /start flow.
 */

const TOTAL_STEPS = 6; // trucks, problems, role, name, contact, company (done not counted)

// Readable step names so the PostHog funnel reads "trucks → problems → …".
const STEP_NAMES = ["trucks", "problems", "role", "name", "contact", "company"] as const;

interface FunnelData {
  fleetSize: string;
  driverProblems: string[];
  role: string;
  fullName: string;
  email: string;
  /** Canonical E.164 from PhoneInput, or "" while incomplete. */
  phone: string;
  usDot: string;
  /** "I don't know my USDOT" → collect the company name instead. */
  dontKnowDot: boolean;
  companyName: string;
  /** Honeypot — stays "" for humans; bots that fill every field trip it. */
  companyWebsite: string;
}

const EMPTY: FunnelData = {
  fleetSize: "",
  driverProblems: [],
  role: "",
  fullName: "",
  email: "",
  phone: "",
  usDot: "",
  dontKnowDot: false,
  companyName: "",
  companyWebsite: "",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isDot = (v: string) => /^\d{5,8}$/.test(v.trim());

export function LeadFunnel() {
  const t = useStartV2T();
  const options = useStartV2Options();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FunnelData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fire the Pixel Lead at most once, even across submit retries.
  const pixelFiredRef = useRef(false);

  // Stable Meta event id for THIS submission, shared between the browser Pixel
  // Lead and the server CAPI Lead so Meta deduplicates the pair (one conversion,
  // not two). Distinct from sidRef below (which is PostHog funnel telemetry).
  const eventIdRef = useRef<string>("");

  // Per-session id for funnel telemetry — stitches every step event of one run
  // together in PostHog.
  const sidRef = useRef<string>("");
  const track = (event: string, props?: Record<string, unknown>) => {
    if (!sidRef.current) sidRef.current = newEventId();
    trackFunnel({ sid: sidRef.current, event, props: { funnel: "start_v2", ...props } });
  };

  // One event per step the user lands on (including the final "done" screen) so
  // PostHog can chart exactly where the funnel leaks.
  useEffect(() => {
    const stepName = submitted ? "done" : STEP_NAMES[step];
    track("funnel_step_viewed", { step, step_name: stepName });
  }, [step, submitted]);

  const set = (patch: Partial<FunnelData>) => setData((d) => ({ ...d, ...patch }));
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  // A clickable answer commits and advances in one tap.
  const choose = (patch: Partial<FunnelData>) => {
    set(patch);
    next();
  };

  const toggleProblem = (value: string) =>
    setData((d) => ({
      ...d,
      driverProblems: d.driverProblems.includes(value)
        ? d.driverProblems.filter((p) => p !== value)
        : [...d.driverProblems, value],
    }));

  async function submit() {
    setSubmitting(true);
    setError(null);
    track("funnel_submit_started");

    // One id for the deduped Pixel + CAPI Lead pair; stable across submit retries.
    if (!eventIdRef.current) eventIdRef.current = newEventId();

    try {
      const res = await fetch("/api/start-v2-lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          eventId: eventIdRef.current,
          fleetSize: data.fleetSize,
          driverProblems: data.driverProblems,
          role: data.role,
          fullName: data.fullName.trim(),
          email: data.email.trim(),
          phone: data.phone,
          usDot: data.dontKnowDot ? undefined : data.usDot.trim() || undefined,
          companyName: data.dontKnowDot ? data.companyName.trim() : undefined,
          companyWebsite: data.companyWebsite || undefined,
          attribution: compactAttribution(collectAttribution()),
        }),
      });

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      // Browser-side Meta Lead so the ad algorithm can optimize for conversions.
      // The server CAPI Lead (fired by /api/start-v2-lead) shares this eventId, so
      // Meta deduplicates the pair into one conversion.
      if (!pixelFiredRef.current) {
        trackPixel("Lead", { content_name: "start_v2_lead" }, eventIdRef.current);
        pixelFiredRef.current = true;
      }
      track("funnel_lead_captured", {
        fleet_size: data.fleetSize,
        role: data.role,
        driver_problems: data.driverProblems,
      });
      setSubmitted(true);
    } catch (e) {
      const message =
        e instanceof Error && e.message ? e.message : "Something went wrong — please try again.";
      track("funnel_submit_error", { message });
      setError(t.error.generic);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return <DoneStep />;

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
            title={t.fleet.title}
            options={options.fleet}
            selected={data.fleetSize}
            onSelect={(value) => choose({ fleetSize: value })}
          />
        )}

        {step === 1 && (
          <MultiChoiceStep
            title={t.problems.title}
            subtitle={t.problems.subtitle}
            options={options.problems}
            selected={data.driverProblems}
            onToggle={toggleProblem}
            onContinue={next}
          />
        )}

        {step === 2 && (
          <ChoiceStep
            title={t.role.title}
            options={options.roles}
            selected={data.role}
            onSelect={(value) => choose({ role: value })}
          />
        )}

        {step === 3 && (
          <TextStep
            title={t.name.title}
            label={t.name.label}
            value={data.fullName}
            onChange={(fullName) => set({ fullName })}
            valid={data.fullName.trim().length >= 2}
            inputProps={{
              autoComplete: "name",
              autoCapitalize: "words",
              enterKeyHint: "next",
              autoFocus: true,
            }}
            onContinue={next}
          />
        )}

        {step === 4 && <ContactStep data={data} set={set} onContinue={next} />}

        {step === 5 && (
          <CompanyStep
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
  const t = useStartV2T();
  return (
    <div className="mb-6 flex items-center gap-3">
      {onBack ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          aria-label={t.progress.back}
          className="text-muted-foreground hover:text-foreground size-10 shrink-0"
        >
          <ArrowLeft className="size-5" />
        </Button>
      ) : (
        <div className="size-10 shrink-0" aria-hidden />
      )}
      <div className="flex flex-1 items-center gap-1.5" aria-hidden>
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-2 flex-1 rounded-full transition-colors duration-300",
              i <= step ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
      <span className="text-muted-foreground w-10 shrink-0 text-right text-sm font-medium tabular-nums">
        {step + 1} / {TOTAL_STEPS}
      </span>
    </div>
  );
}

function StepHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{title}</h1>
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
    <div className="space-y-7">
      <StepHeading title={title} subtitle={subtitle} />
      <div className="space-y-3">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={cn(
              "bg-card flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-base font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              "hover:border-primary/40 hover:bg-muted active:translate-y-px motion-safe:hover:scale-[1.01] motion-safe:active:scale-[0.97]",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none",
              selected === opt.value ? "border-primary ring-primary/20 ring-2" : "border-border"
            )}
          >
            {opt.label}
            <ChevronRight className="text-muted-foreground size-5 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Like ChoiceStep but several answers can be picked. Tapping toggles instead of
 * advancing, so a Continue button — enabled once at least one is chosen — moves
 * the funnel forward.
 */
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
  const t = useStartV2T();
  return (
    <div className="space-y-7">
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
                "bg-card flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-base font-medium transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                "hover:border-primary/40 hover:bg-muted active:translate-y-px motion-safe:hover:scale-[1.01] motion-safe:active:scale-[0.97]",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none",
                isSelected ? "border-primary ring-primary/20 ring-2" : "border-border"
              )}
            >
              {opt.label}
              <span
                aria-hidden
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                  isSelected ? "border-primary bg-primary text-primary-foreground" : "border-input"
                )}
              >
                {isSelected ? <Check className="size-4" /> : null}
              </span>
            </button>
          );
        })}
      </div>
      <Button
        type="button"
        size="lg"
        className="h-12 w-full rounded-xl text-base"
        onClick={onContinue}
        disabled={selected.length === 0}
      >
        {t.common.continue}
      </Button>
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
  const t = useStartV2T();
  const fieldId = useId();
  const hintId = `${fieldId}-hint`;
  return (
    <form
      className="space-y-7"
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
      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-xl text-base"
        disabled={!valid}
      >
        {t.common.continue}
      </Button>
    </form>
  );
}

/** Email + phone, both required — this is the whole point of the funnel. */
function ContactStep({
  data,
  set,
  onContinue,
}: {
  data: FunnelData;
  set: (patch: Partial<FunnelData>) => void;
  onContinue: () => void;
}) {
  const t = useStartV2T();
  const emailId = useId();
  const phoneId = useId();
  const emailHintId = `${emailId}-hint`;
  const emailValid = isEmail(data.email);
  const phoneValid = isValidIntlPhone(data.phone);
  const showEmailHint = data.email.length > 3 && !emailValid;
  const canContinue = emailValid && phoneValid;

  return (
    <form
      className="space-y-7"
      onSubmit={(e) => {
        e.preventDefault();
        if (canContinue) onContinue();
      }}
    >
      <StepHeading title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="space-y-5">
        <Field label={t.contact.emailLabel} htmlFor={emailId} required>
          <Input
            id={emailId}
            value={data.email}
            onChange={(e) => set({ email: e.target.value })}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
            enterKeyHint="next"
            placeholder={t.contact.emailPlaceholder}
            aria-invalid={showEmailHint ? true : undefined}
            aria-describedby={showEmailHint ? emailHintId : undefined}
            autoFocus
          />
          {showEmailHint ? (
            <p id={emailHintId} role="alert" className="text-destructive text-xs">
              {t.contact.emailHint}
            </p>
          ) : null}
        </Field>

        <Field label={t.contact.phoneLabel} htmlFor={phoneId} required>
          <PhoneInput
            id={phoneId}
            value={data.phone}
            onChange={(phone) => set({ phone })}
            international
            incompleteHint={t.contact.phoneHint}
          />
        </Field>
      </div>

      <Button
        type="submit"
        size="lg"
        className="h-12 w-full rounded-xl text-base"
        disabled={!canContinue}
      >
        {t.common.continue}
      </Button>
    </form>
  );
}

/**
 * Final step: USDOT (optional). If the user doesn't know it, a checkbox swaps the
 * field for the company name so we can still identify the carrier. Submitting here
 * sends the lead.
 */
function CompanyStep({
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
  const t = useStartV2T();
  const dotId = useId();
  const companyId = useId();
  const dotHintId = `${dotId}-hint`;

  const dotInvalid = !data.dontKnowDot && data.usDot.trim() !== "" && !isDot(data.usDot);
  const canSubmit = data.dontKnowDot
    ? data.companyName.trim().length >= 2
    : data.usDot.trim() === "" || isDot(data.usDot);

  return (
    <form
      className="space-y-7"
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitting && canSubmit) onSubmit();
      }}
    >
      <StepHeading title={t.company.title} subtitle={t.company.subtitle} />

      <div className="space-y-5">
        {!data.dontKnowDot ? (
          <Field label={t.company.dotLabel} htmlFor={dotId}>
            <Input
              id={dotId}
              value={data.usDot}
              onChange={(e) => set({ usDot: e.target.value.replace(/\D/g, "").slice(0, 8) })}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              enterKeyHint="go"
              placeholder={t.company.dotPlaceholder}
              aria-invalid={dotInvalid ? true : undefined}
              aria-describedby={dotInvalid ? dotHintId : undefined}
              autoFocus
            />
            {dotInvalid ? (
              <p id={dotHintId} role="alert" className="text-destructive text-xs">
                {t.company.dotHint}
              </p>
            ) : null}
          </Field>
        ) : (
          <Field label={t.company.companyLabel} htmlFor={companyId} required>
            <Input
              id={companyId}
              value={data.companyName}
              onChange={(e) => set({ companyName: e.target.value })}
              type="text"
              autoComplete="organization"
              autoCapitalize="words"
              enterKeyHint="go"
              placeholder={t.company.companyPlaceholder}
              autoFocus
            />
          </Field>
        )}

        {/* "I don't know my USDOT" — switches to collecting the company name. */}
        <button
          type="button"
          role="checkbox"
          aria-checked={data.dontKnowDot}
          onClick={() =>
            set(
              data.dontKnowDot
                ? { dontKnowDot: false, companyName: "" }
                : { dontKnowDot: true, usDot: "" }
            )
          }
          className={cn(
            "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
            "hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3 focus-visible:outline-none",
            data.dontKnowDot ? "border-primary bg-muted/50" : "border-border bg-card"
          )}
        >
          <span
            aria-hidden
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
              data.dontKnowDot
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input"
            )}
          >
            {data.dontKnowDot ? <Check className="size-3.5" /> : null}
          </span>
          {t.company.dontKnow}
        </button>

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
      </div>

      {error ? (
        <p role="alert" className="text-destructive text-sm">
          {error}
        </p>
      ) : null}

      <div className="space-y-3">
        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-xl text-base"
          disabled={!canSubmit || submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              {t.company.sending}
            </>
          ) : (
            t.company.submit
          )}
        </Button>
        <p className="text-muted-foreground text-center text-[13px]">{t.company.reassurance}</p>
      </div>
    </form>
  );
}

function DoneStep() {
  const t = useStartV2T();
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-2 flex flex-1 flex-col justify-center py-10 duration-300">
      <Card>
        <CardContent className="space-y-6 py-10 text-center">
          <div className="bg-primary/10 text-primary mx-auto flex size-16 items-center justify-center rounded-full">
            <BadgeCheck className="size-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {t.done.title}
            </h1>
            <p className="text-muted-foreground text-base">{t.done.body}</p>
          </div>
          <Link
            href="/tools/elp-practice"
            className={cn(buttonVariants(), "h-12 w-full gap-2 rounded-xl text-base")}
          >
            {t.done.cta}
            <ArrowRight className="size-5" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
