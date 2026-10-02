import { DEMO_TELEGRAM_URL, getDemoProduct } from "@/data/demo";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
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
      title="Get a demo"
      description="See how Raisedash can help your trucking company. Email us, leave your details for a product demo, or contact our team on Telegram."
      canonical="https://www.raisedash.com/get-a-demo"
    >
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
            Get a demo.
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
            <a href={emailHref} className={choiceClass}>
              <Mail className="text-muted-foreground h-5 w-5 shrink-0" aria-hidden="true" />
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
              <MessageSquare
                className="text-muted-foreground h-5 w-5 shrink-0"
                aria-hidden="true"
              />
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
            <a
              href={DEMO_TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={choiceClass}
            >
              <Send className="text-muted-foreground h-5 w-5 shrink-0" aria-hidden="true" />
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
