import { useEffect, useId, useRef, useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Mail,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/start/button";
import { Card, CardContent } from "@/components/start/card";
import { Input } from "@/components/start/input";
import { Field } from "@/components/start/form-field";
import { PhoneInput } from "@/components/start/phone-input";
import { apiPost, errorMessage } from "@/lib/start-api";
import {
  campaignAttribution,
  collectAttribution,
  compactAttribution,
  newEventId,
  trackPixel,
  type CampaignAttribution,
} from "@/lib/meta-pixel";
import { trackFunnel } from "@/lib/funnel-analytics";
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
  { value: "2-5", label: "2–5 trucks" },
  { value: "5-15", label: "5–15 trucks" },
  { value: "15+", label: "15 or more trucks" },
];

// Multi-select (a small carrier rarely has just one). Keep these to the pains
// that genuinely cost an owner-operator sleep — fines, downtime, lost contracts.
const WORRIES: Choice[] = [
  { value: "audit", label: "Passing a DOT audit" },
  { value: "csa_scores", label: "Rising CSA scores" },
  { value: "inspections", label: "Roadside inspection violations" },
  { value: "deadlines", label: "Missing a filing deadline" },
  { value: "driver_files", label: "Incomplete driver files" },
  { value: "drug_alcohol", label: "Drug & alcohol program" },
  { value: "paperwork", label: "Messy paperwork" },
];

const TOTAL_STEPS = 5; // fleet, worry, name, email, contact (done is not counted)

// Readable name per step index, so the PostHog funnel reads "fleet → worry → …"
// rather than "0 → 1 → …". See lib/funnel-analytics.ts.
const STEP_NAMES = ["fleet", "worry", "name", "email", "contact"] as const;

interface FunnelData {
  fleetSize: string;
  worries: string[];
  name: string;
  email: string;
  usDot: string;
  phone: string;
  /** Honeypot — stays '' for humans; bots that fill every field trip it. */
  companyWebsite: string;
}

const EMPTY: FunnelData = {
  fleetSize: "",
  worries: [],
  name: "",
  email: "",
  usDot: "",
  phone: "",
  companyWebsite: "",
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isDot = (v: string) => /^\d{5,8}$/.test(v.trim());

// ── Carrier scan preview (mirrors the backend ScanService.buildPreview output) ──
type PreviewStatus = "looks_good" | "needs_attention" | "critical";
interface PreviewCard {
  status: PreviewStatus;
  title: string;
  note: string;
}
interface ScanPreview {
  carrier: {
    usDot: string;
    legalName: string;
    powerUnits: number;
    drivers: number;
    operatingStatus: string;
    isNewEntrant: boolean;
    city?: string;
    state?: string;
    source: "fmcsa" | "mock";
  };
  counts: { critical: number; needs_attention: number; looks_good: number };
  cards: PreviewCard[];
  disclaimer: string;
}

export function OnboardingFunnel() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FunnelData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // After the lead is captured we pull the carrier's PUBLIC DOT record and show
  // an honest, real-data preview (the "aha"). Best-effort: if no real record
  // resolves (e.g. no verified source yet) we fall back to the plain "check your
  // email" screen — we never invent findings.
  const [scanState, setScanState] = useState<"idle" | "scanning" | "ready" | "failed">("idle");
  const [preview, setPreview] = useState<ScanPreview | null>(null);

  // Stable across retries so the Pixel and CAPI Lead always dedup to one event.
  const eventIdRef = useRef<string>("");
  const pixelFiredRef = useRef(false);

  // Per-session id for funnel telemetry — distinct from the Lead dedup event id
  // above; this one stitches every step event of one run together in PostHog.
  const sidRef = useRef<string>("");
  // Ad attribution (utm_*, fbclid, referrer), captured once on the first event of
  // the run and replayed on every subsequent one so PostHog can attribute both the
  // visitor and the lead to the campaign that drove them.
  const attributionRef = useRef<CampaignAttribution | null>(null);
  const track = (event: string, props?: Record<string, unknown>) => {
    if (!sidRef.current) sidRef.current = newEventId();
    if (!attributionRef.current) attributionRef.current = campaignAttribution();
    trackFunnel({
      sid: sidRef.current,
      event,
      attribution: attributionRef.current,
      props: { funnel: "start", ...props },
    });
  };

  // One event per step the user lands on — including the final "done" screen —
  // so PostHog can chart exactly where the funnel leaks. Fires on mount (step 0)
  // and on every step change; intentionally keyed on `step` only.
  useEffect(() => {
    const stepName = step >= TOTAL_STEPS ? "done" : STEP_NAMES[step];
    track("funnel_step_viewed", { step, step_name: stepName });
  }, [step]);

  const set = (patch: Partial<FunnelData>) => setData((d) => ({ ...d, ...patch }));
  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  // A clickable answer commits and advances in one tap.
  const choose = (patch: Partial<FunnelData>) => {
    set(patch);
    next();
  };

  // Multi-select: toggle a worry in/out without advancing (a Continue button does).
  const toggleWorry = (value: string) =>
    setData((d) => ({
      ...d,
      worries: d.worries.includes(value)
        ? d.worries.filter((w) => w !== value)
        : [...d.worries, value],
    }));

  async function runScan(usDot: string) {
    setScanState("scanning");
    const TIMEOUT = Symbol("timeout");
    try {
      const result = await Promise.race([
        apiPost<ScanPreview>("public/scan", { usDot }),
        new Promise<typeof TIMEOUT>((resolve) => setTimeout(() => resolve(TIMEOUT), 7000)),
      ]);
      if (result === TIMEOUT || !result.cards?.length) {
        setScanState("failed");
        return;
      }
      setPreview(result);
      setScanState("ready");
    } catch {
      // No real record we can stand behind — fall back to the email screen.
      setScanState("failed");
    }
  }

  async function submit() {
    if (!isDot(data.usDot)) {
      setError("Enter a valid USDOT number (5–8 digits).");
      return;
    }
    setSubmitting(true);
    setError(null);
    if (!eventIdRef.current) eventIdRef.current = newEventId();
    const eventId = eventIdRef.current;
    track("funnel_submit_started");

    try {
      const attribution = compactAttribution(collectAttribution());
      // The backend is Meta-free: it stores ad-source PROVENANCE only (which
      // campaign converted them). The Meta match cookies (fbp/fbc), the dedup
      // eventId, and the server CAPI Lead are NOT its concern — they go solely to
      // our Vercel CAPI route below. All Meta tracking lives in this project.
      const provenance = { ...attribution };
      delete provenance.fbp;
      delete provenance.fbc;

      await apiPost("public/onboarding", {
        usDot: data.usDot.trim(),
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone || undefined,
        fleetSize: data.fleetSize || undefined,
        worries: data.worries.length ? data.worries : undefined,
        companyWebsite: data.companyWebsite || undefined,
        attribution: provenance,
      });

      // Fire the server-side Meta CAPI Lead via our Vercel route (best-effort,
      // fire-and-forget) — deduplicated with the browser Pixel by the shared
      // eventId. Same-origin, so the route sees the real client IP. /start posts
      // its lead straight to the backend (for rate-limit IP), so unlike /start-v2
      // the CAPI event can't ride that request — it fires here instead.
      void fetch("/api/start-capi", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          eventId,
          usDot: data.usDot.trim(),
          name: data.name.trim(),
          email: data.email.trim(),
          phone: data.phone || undefined,
          attribution,
        }),
      }).catch(() => {});

      // Fire the browser Lead only after a real, persisted lead — same event id
      // as the server event, so Meta keeps one. Once, even across retries.
      if (!pixelFiredRef.current) {
        trackPixel("Lead", {}, eventId);
        pixelFiredRef.current = true;
      }
      // Funnel conversion — categorical answers only, never the contact PII.
      track("funnel_lead_captured", {
        fleet_size: data.fleetSize || undefined,
        worries: data.worries,
      });
      setStep(TOTAL_STEPS); // done — now reveal the real DOT-record preview
      void runScan(data.usDot.trim());
    } catch (e) {
      const message = errorMessage(e, "Something went wrong — please try again.");
      track("funnel_submit_error", { message });
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  if (step >= TOTAL_STEPS) {
    if (scanState === "scanning") return <ScanningStep />;
    if (scanState === "ready" && preview)
      return <ScanReveal preview={preview} email={data.email.trim()} />;
    // idle or failed → the dependable "check your email" screen
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
            options={FLEET_SIZES}
            selected={data.fleetSize}
            onSelect={(value) => choose({ fleetSize: value })}
          />
        )}

        {step === 1 && (
          <MultiChoiceStep
            title="What’s keeping you up at night?"
            subtitle="Pick all that apply."
            options={WORRIES}
            selected={data.worries}
            onToggle={toggleWorry}
            onContinue={next}
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
              autoCapitalize: "words",
              enterKeyHint: "next",
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
              autoCapitalize: "off",
              autoCorrect: "off",
              enterKeyHint: "next",
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
 * Like ChoiceStep but the user can pick several answers (carriers usually have
 * more than one pain). Tapping toggles instead of advancing, so a Continue
 * button — enabled once at least one is chosen — moves the funnel forward.
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
        Continue
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
      className="space-y-7"
      onSubmit={(e) => {
        e.preventDefault();
        if (!submitting) onSubmit();
      }}
    >
      <StepHeading
        title="Last step — your USDOT number."
        subtitle="It’s how we pull your carrier’s record and build your file."
      />

      <div className="space-y-5">
        <Field label="USDOT number" htmlFor={dotId}>
          <Input
            id={dotId}
            value={data.usDot}
            onChange={(e) => set({ usDot: e.target.value.replace(/\D/g, "").slice(0, 8) })}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            enterKeyHint="go"
            placeholder="e.g. 1234567"
            autoFocus
          />
        </Field>

        <Field label="Phone (optional)" htmlFor={phoneId}>
          <PhoneInput id={phoneId} value={data.phone} onChange={(phone) => set({ phone })} />
          <p id={phoneHintId} className="text-muted-foreground text-[13px]">
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
        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-xl text-base"
          disabled={!dotValid || submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Setting up…
            </>
          ) : (
            "Get my access"
          )}
        </Button>
        <p className="text-muted-foreground text-center text-[13px]">
          We use your details only to set up your account. No spam, ever.
        </p>
      </div>
    </form>
  );
}

/**
 * Webmail "open inbox" shortcuts only make sense on a real desktop browser, where
 * the user is already signed into Gmail/Outlook on the web — one click lands them
 * in their inbox. We deliberately do NOT show them on mobile or inside the Meta
 * (FB/IG) in-app browser: there the WebView session is isolated and usually logged
 * out, and Google outright blocks sign-in from embedded browsers, so the link would
 * dead-end at a login wall. Default to hidden; reveal only when confident it's a
 * desktop browser.
 */
function isDesktopBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  // Embedded / in-app browsers (Meta and peers) — never treat as desktop.
  if (/FBAN|FBAV|FB_IAB|Instagram|Line\/|MicroMessenger|Twitter|TikTok|Snapchat|; wv\)/i.test(ua)) {
    return false;
  }
  // Phones and tablets — native mail apps are the norm there.
  if (
    /Android|iPhone|iPad|iPod|Mobile|Silk|Kindle|BlackBerry|Opera Mini|IEMobile|Windows Phone/i.test(
      ua
    )
  ) {
    return false;
  }
  // iPadOS Safari masquerades as macOS — unmask it via touch support.
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return false;
  return true;
}

// The two providers that cover the vast majority of inboxes. Link to the web
// inbox (reliable when already signed in on desktop), opened in a new tab. Shown
// unconditionally on desktop — we don't infer the provider from the typed email.
const INBOX_PROVIDERS = [
  { label: "Gmail", href: "https://mail.google.com/mail/u/0/", color: "#EA4335" },
  { label: "Outlook", href: "https://outlook.live.com/mail/0/", color: "#0072C6" },
] as const;

/**
 * Webmail shortcuts, shown only on a confirmed desktop browser. Default hidden so
 * the first-paint output is the safe state (no buttons) — never a hydration mismatch.
 */
function InboxButtons() {
  const [showInbox, setShowInbox] = useState(false);
  useEffect(() => {
    setShowInbox(isDesktopBrowser());
  }, []);
  if (!showInbox) return null;
  return (
    <div className="flex items-center justify-center gap-3">
      {INBOX_PROVIDERS.map((provider) => (
        <a
          key={provider.label}
          href={provider.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 flex-1 gap-2 rounded-xl text-sm font-medium"
          )}
        >
          <Mail className="size-4" style={{ color: provider.color }} />
          Open {provider.label}
        </a>
      ))}
    </div>
  );
}

/** Brief "labour illusion" while we pull the carrier's public DOT record. */
function ScanningStep() {
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-2 flex flex-1 flex-col justify-center py-10 duration-300">
      <Card>
        <CardContent className="space-y-6 py-12 text-center">
          <div className="bg-primary/10 text-primary mx-auto flex size-16 items-center justify-center rounded-full">
            <Loader2 className="size-8 animate-spin" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Pulling your carrier record…
            </h1>
            <p className="text-muted-foreground text-base">
              Checking your authority, safety record, and what an auditor would see today.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const STATUS_STYLE: Record<
  PreviewStatus,
  { icon: typeof Check; label: string; dot: string; card: string; iconClass: string }
> = {
  critical: {
    icon: AlertTriangle,
    label: "Critical",
    dot: "bg-red-500",
    card: "border-red-200 bg-red-50/60",
    iconClass: "text-red-600",
  },
  needs_attention: {
    icon: AlertCircle,
    label: "Needs attention",
    dot: "bg-amber-500",
    card: "border-amber-200 bg-amber-50/60",
    iconClass: "text-amber-600",
  },
  looks_good: {
    icon: CheckCircle2,
    label: "Looks good",
    dot: "bg-emerald-500",
    card: "border-emerald-200 bg-emerald-50/50",
    iconClass: "text-emerald-600",
  },
};

function CountsBar({ counts }: { counts: ScanPreview["counts"] }) {
  const items: { key: PreviewStatus; n: number }[] = [
    { key: "critical", n: counts.critical },
    { key: "needs_attention", n: counts.needs_attention },
    { key: "looks_good", n: counts.looks_good },
  ];
  return (
    <div className="flex items-center justify-center gap-2">
      {items.map(({ key, n }) => (
        <div
          key={key}
          className="bg-card flex flex-1 flex-col items-center gap-1 rounded-xl border px-2 py-3"
        >
          <span className="text-2xl font-semibold tabular-nums">{n}</span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-medium">
            <span className={cn("size-2 rounded-full", STATUS_STYLE[key].dot)} aria-hidden />
            {STATUS_STYLE[key].label}
          </span>
        </div>
      ))}
    </div>
  );
}

function FindingCard({ card }: { card: PreviewCard }) {
  const style = STATUS_STYLE[card.status];
  const Icon = style.icon;
  return (
    <div className={cn("flex gap-3 rounded-xl border p-4 text-left", style.card)}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", style.iconClass)} aria-hidden />
      <div className="space-y-0.5">
        <p className="text-sm font-semibold">{card.title}</p>
        <p className="text-muted-foreground text-[13px] leading-relaxed">{card.note}</p>
      </div>
    </div>
  );
}

/**
 * The "aha": an honest, real-data preview of the carrier's PUBLIC DOT record,
 * shown right after the lead is captured. Findings come straight from the backend
 * ScanService (authority from the real record; internal records are "not confirmed
 * yet", never "missing"). Demo/dev data is labelled so it never reads as real.
 */
function ScanReveal({ preview, email }: { preview: ScanPreview; email: string }) {
  const { carrier, counts, cards, disclaimer } = preview;
  const isDemo = carrier.source !== "fmcsa";
  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-2 flex flex-1 flex-col gap-6 py-8 duration-300">
      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          USDOT {carrier.usDot}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          Here’s what we found on {carrier.legalName}.
        </h1>
        <p className="text-muted-foreground text-base">
          Straight from your public DOT record — this is what an auditor sees today.
        </p>
        {isDemo ? (
          <p className="text-muted-foreground bg-muted mx-auto inline-block rounded-full px-3 py-1 text-xs font-medium">
            Demo data — your real record loads once you’re in.
          </p>
        ) : null}
      </div>

      <CountsBar counts={counts} />

      <div className="space-y-3">
        {cards.map((card, i) => (
          <FindingCard key={i} card={card} />
        ))}
      </div>

      <p className="text-muted-foreground text-center text-[13px] leading-relaxed text-balance">
        {disclaimer}
      </p>

      <div className="bg-card space-y-4 rounded-2xl border p-6 text-center">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Fix these before they cost you.</h2>
          <p className="text-muted-foreground text-sm">
            We emailed{" "}
            {email ? <span className="text-foreground font-medium">{email}</span> : "you"} a link to
            open Raisedash and start clearing your file.
          </p>
        </div>
        <InboxButtons />
        <p className="text-muted-foreground text-[13px]">
          It can take a minute to arrive — check spam or promotions if you don’t see it.
        </p>
      </div>
    </div>
  );
}

function DoneStep({ email }: { email: string }) {
  // Default hidden; reveal only on a confirmed desktop browser. Deciding after
  // mount keeps the safe state ("no buttons") as the server/first-paint output,
  // so there's never a hydration mismatch.
  const [showInbox, setShowInbox] = useState(false);
  useEffect(() => {
    setShowInbox(isDesktopBrowser());
  }, []);

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-2 flex flex-1 flex-col justify-center py-10 duration-300">
      <Card>
        <CardContent className="space-y-6 py-10 text-center">
          <div className="bg-primary/10 text-primary mx-auto flex size-16 items-center justify-center rounded-full">
            <BadgeCheck className="size-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              You’re in — check your email.
            </h1>
            <p className="text-muted-foreground text-base">
              We just sent{" "}
              {email ? <span className="text-foreground font-medium">{email}</span> : "you"} a link
              to open Raisedash and start getting your DOT file ready.
            </p>
          </div>

          {showInbox ? (
            <div className="flex items-center justify-center gap-3">
              {INBOX_PROVIDERS.map((provider) => (
                <a
                  key={provider.label}
                  href={provider.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-11 flex-1 gap-2 rounded-xl text-sm font-medium"
                  )}
                >
                  <Mail className="size-4" style={{ color: provider.color }} />
                  Open {provider.label}
                </a>
              ))}
            </div>
          ) : null}

          <p className="text-muted-foreground text-[13px]">
            It can take a minute to arrive. If you don’t see it, check your spam or promotions
            folder.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
