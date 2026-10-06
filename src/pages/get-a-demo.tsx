import { DEMO_TELEGRAM_URL, getDemoProduct } from "@/data/demo";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { emails } from "@/data/site";
import { demoRequestSchema, type DemoRequest } from "@/lib/demo-request";
import { analyticsContext, capture, identify } from "@/lib/site-analytics";
import { newEventId } from "@/lib/meta-pixel";
import { trackFleetPixel } from "@/lib/meta-fleet-pixel";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const choiceClass =
  "group flex min-h-20 w-full items-center gap-4 border-b border-border py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring";

export default function GetADemoPage() {
  const router = useRouter();
  const product = getDemoProduct(router.query.product);
  const productSlug = product?.href.split("/").pop();
  const emailHref = `mailto:${emails.sales}?subject=${encodeURIComponent(product ? `Demo request: ${product.name}` : "Raisedash demo request")}`;
  // The form stays hidden until the visitor picks "Leave your details", so the three
  // ways to reach us get equal weight. Once opened it stays mounted, so going back to
  // the options doesn't throw away anything already typed.
  const [formOpen, setFormOpen] = useState(false);
  const [formMounted, setFormMounted] = useState(false);
  const choicesRef = useRef<HTMLElement>(null);

  function openForm() {
    setFormMounted(true);
    setFormOpen(true);
    capture("demo_path_chosen", {
      path: "leave_details",
      form: "get_a_demo",
      product: productSlug,
    });
    requestAnimationFrame(() => {
      document.getElementById("demo-request")?.scrollIntoView({ block: "nearest" });
      (document.getElementById("demo-full-name") ?? document.getElementById("demo-success"))?.focus(
        { preventScroll: true }
      );
    });
  }

  function closeForm() {
    setFormOpen(false);
    requestAnimationFrame(() =>
      choicesRef.current?.querySelector<HTMLElement>("a,button")?.focus()
    );
  }

  return (
    <PageLayout
      title="Get a risk-free demo"
      description="See how Raisedash can help your trucking company. Email us, leave your details for a product demo, or contact our team on Telegram."
      canonical="https://www.raisedash.com/get-a-demo"
    >
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
            Get a risk-free demo.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-md text-lg leading-relaxed">
            {product
              ? `See how ${product.name} fits your trucking company. Choose the easiest way to talk to us.`
              : "See how our tools fit your trucking company. Choose the easiest way to talk to us."}
          </p>

          <nav
            ref={choicesRef}
            aria-label="Ways to get a demo"
            hidden={formOpen}
            className="mt-8 sm:mt-10"
          >
            <a
              href={DEMO_TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={choiceClass}
            >
              <TelegramLogo className="h-7 w-7 shrink-0" />
              <span className="flex-1">
                <span className="text-foreground block text-base">Contact us on Telegram</span>
                <span className="text-muted-foreground mt-1 block text-sm">
                  @raisedash <span className="sr-only">(opens in a new tab)</span>
                </span>
              </span>
              <ArrowUpRight
                className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0"
                aria-hidden="true"
              />
            </a>
            <a href={emailHref} className={choiceClass}>
              <MailFilled className="text-foreground/70 h-7 w-7 shrink-0 p-0.5" />
              <span className="min-w-0 flex-1">
                <span className="text-foreground block text-base">Email us</span>
                <span className="text-muted-foreground mt-1 block text-sm">{emails.sales}</span>
              </span>
              <ArrowUpRight
                className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0"
                aria-hidden="true"
              />
            </a>
            <button
              type="button"
              className={choiceClass}
              aria-controls="demo-request"
              aria-expanded={formOpen}
              onClick={openForm}
            >
              <ChatFilled className="text-foreground/70 h-7 w-7 shrink-0 p-0.5" />
              <span className="flex-1">
                <span className="text-foreground block text-base">Leave your details</span>
                <span className="text-muted-foreground mt-1 block text-sm">
                  We’ll reach out to arrange your demo.
                </span>
              </span>
              <ArrowRight
                className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0"
                aria-hidden="true"
              />
            </button>
          </nav>

          {formMounted && (
            <div hidden={!formOpen} className="mt-8 sm:mt-10">
              <button
                type="button"
                onClick={closeForm}
                className="text-muted-foreground hover:text-foreground focus-visible:outline-ring mb-4 inline-flex min-h-11 items-center gap-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Other ways to reach us
              </button>
              <section
                id="demo-request"
                aria-label="Request a demo"
                className="bg-card scroll-mt-28 rounded-sm p-6 sm:p-8"
              >
                <DemoRequestForm
                  key={productSlug ?? "general"}
                  productSlug={productSlug}
                  productName={product?.name}
                />
              </section>
            </div>
          )}
        </div>
      </Container>
    </PageLayout>
  );
}

/** Telegram's mark: brand-blue circle, white plane. */
function TelegramLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#fff" />
      <path
        fill="#26a5e4"
        d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
      />
    </svg>
  );
}

function MailFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

function ChatFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
      />
    </svg>
  );
}

function DemoRequestForm({
  productSlug,
  productName,
}: {
  productSlug?: string;
  productName?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submittingRef = useRef(false);
  const eventIdRef = useRef<string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DemoRequest>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      interests: productName ?? "",
      companyWebsite: "",
    },
  });

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);
  useEffect(() => {
    if (submitError) errorRef.current?.focus();
  }, [submitError]);

  async function submit(data: DemoRequest) {
    if (submittingRef.current) return;
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setSubmitError("Please complete the verification below before sending your request.");
      return;
    }
    submittingRef.current = true;
    setSubmitError("");
    eventIdRef.current ??= newEventId();
    try {
      const response = await fetch("/api/product-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(30000),
        body: JSON.stringify({
          ...data,
          product: productSlug,
          turnstileToken,
          eventId: eventIdRef.current,
          analytics: analyticsContext(),
        }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        if (result.fields && typeof result.fields === "object") {
          for (const field of ["fullName", "email", "phone", "company", "interests"] as const) {
            if (typeof result.fields[field] === "string") {
              setError(field, { type: "server", message: result.fields[field] });
            }
          }
        }
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "We couldn’t send your request. Please try again."
        );
      }
      // A honeypot response deliberately looks successful, but is not a conversion.
      if (!data.companyWebsite) {
        identify(data.email);
        capture("demo_request_submitted", {
          form: "get_a_demo",
          product: productSlug,
          has_phone: Boolean(data.phone),
        });
        trackFleetPixel("Schedule", { content_name: "product_demo_request" }, eventIdRef.current);
      }
      setSubmitted(true);
    } catch (error) {
      const message =
        error instanceof Error && error.name === "Error"
          ? error.message
          : "We couldn’t confirm your request was received. Please try again, email us, or contact us on Telegram.";
      setSubmitError(message);
      capture("demo_request_error", { form: "get_a_demo", product: productSlug });
    } finally {
      submittingRef.current = false;
      setTurnstileToken("");
      turnstileRef.current?.reset();
    }
  }

  if (submitted) {
    return (
      <div
        ref={successRef}
        id="demo-success"
        tabIndex={-1}
        role="status"
        className="py-12 outline-none"
      >
        <span className="bg-background mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full">
          <Check className="text-foreground h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="text-foreground text-2xl font-normal tracking-tight">
          Thanks. We’ll be in touch.
        </h2>
        <p className="text-muted-foreground mt-3 text-base leading-relaxed">
          We’ve received your details. Our team will reach out to learn more and arrange your demo.
        </p>
        <Link
          href="/#products"
          className="text-foreground mt-8 inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"
        >
          Explore our products <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-foreground text-2xl font-normal tracking-tight">
        Tell us what you’re looking for.
      </h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        A few details so we can help you get started.
      </p>
      <noscript>
        <p className="mt-4">
          Please enable JavaScript to use this form, or use the email and Telegram links to contact
          us.
        </p>
      </noscript>
      <form
        noValidate
        onSubmit={(event) => {
          void handleSubmit(submit)(event);
        }}
        className="mt-7"
        aria-busy={isSubmitting}
      >
        <fieldset disabled={isSubmitting} className="space-y-5">
          <legend className="sr-only">Your contact details and product interests</legend>
          <Input
            {...register("fullName")}
            id="demo-full-name"
            label="Full name"
            autoComplete="name"
            required
            maxLength={100}
            error={errors.fullName?.message}
          />
          <Input
            {...register("email")}
            id="demo-email"
            label="Email address"
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={254}
            error={errors.email?.message}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              {...register("phone")}
              id="demo-phone"
              label="Phone number (optional)"
              type="tel"
              autoComplete="tel"
              placeholder="Include country code"
              maxLength={40}
              error={errors.phone?.message}
            />
            <Input
              {...register("company")}
              id="demo-company"
              label="Company (optional)"
              autoComplete="organization"
              maxLength={150}
              error={errors.company?.message}
            />
          </div>
          <Textarea
            {...register("interests")}
            id="demo-interests"
            label="Products you’re interested in"
            placeholder="Tell us which products you’d like to see and what you need help with."
            required
            rows={4}
            maxLength={1200}
            className="resize-y"
            error={errors.interests?.message}
          />
          <div hidden aria-hidden="true">
            <label htmlFor="demo-website">Leave this field empty</label>
            <input
              {...register("companyWebsite")}
              id="demo-website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {TURNSTILE_SITE_KEY && (
            <Turnstile
              ref={turnstileRef}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={(token) => {
                setTurnstileToken(token);
                setSubmitError("");
              }}
              onExpire={() => setTurnstileToken("")}
              onError={() => {
                setTurnstileToken("");
                setSubmitError(
                  "Verification couldn’t load. Try again, or use email or Telegram to reach us."
                );
              }}
              options={{ theme: "light", size: "flexible" }}
            />
          )}
          {submitError && (
            <p
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              className="text-destructive text-sm leading-relaxed outline-none"
            >
              {submitError}
            </p>
          )}
          <Button
            aria-label={isSubmitting ? "Sending request" : "Request a demo"}
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            loadingText="Sending request…"
            className="w-full"
          >
            Request a demo <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <p className="text-muted-foreground text-xs leading-relaxed">
            We’ll use your details to respond to your request.{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2">
              Privacy policy
            </Link>
            .
          </p>
        </fieldset>
      </form>
    </>
  );
}
