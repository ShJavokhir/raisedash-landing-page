import { getDemoProduct } from "@/data/demo";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ContactChoices } from "@/components/contact/ContactChoices";
import { demoRequestSchema, type DemoRequest } from "@/lib/demo-request";
import { analyticsContext, capture, identify } from "@/lib/site-analytics";
import { newEventId } from "@/lib/meta-pixel";
import { trackFleetPixel } from "@/lib/meta-fleet-pixel";
import { timeoutSignal } from "@/lib/handoff";
import { useCopy } from "@/components/i18n/LocaleProvider";
import { getADemoCopy } from "@/i18n/pages/get-a-demo";
import { localeServerSideProps } from "@/i18n/server";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function GetADemoPage() {
  const t = useCopy(getADemoCopy);
  const router = useRouter();
  const product = getDemoProduct(router.query.product);
  const productSlug = product?.href.split("/").pop();

  return (
    <PageLayout title={t.seo.title} description={t.seo.description}>
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
            {t.hero.title}
          </h1>
          <p className="text-muted-foreground mt-5 max-w-md text-lg leading-relaxed">
            {t.hero.body(product?.name)}
          </p>

          <ContactChoices
            placement="get_a_demo"
            product={productSlug}
            copy={t}
            emailSubject={product ? `Demo request: ${product.name}` : "Raisedash demo request"}
            formId="demo-request"
            focusIds={["demo-full-name", "demo-success"]}
            onFormOpen={() =>
              capture("demo_path_chosen", {
                path: "leave_details",
                form: "get_a_demo",
                product: productSlug,
              })
            }
          >
            <DemoRequestForm
              key={productSlug ?? "general"}
              productSlug={productSlug}
              productName={product?.name}
            />
          </ContactChoices>
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
  const t = useCopy(getADemoCopy);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submittingRef = useRef(false);
  const eventIdRef = useRef<string | undefined>(undefined);
  // Validation and API messages arrive in English; show them in the page language.
  const translate = (message?: string) => message && (t.serverMessages[message] ?? message);
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
      setSubmitError(t.errors.verifyFirst);
      return;
    }
    submittingRef.current = true;
    setSubmitError("");
    eventIdRef.current ??= newEventId();
    try {
      const response = await fetch("/api/product-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: timeoutSignal(30000),
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
        throw new Error(typeof result.error === "string" ? result.error : t.errors.sendFailed);
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
        error instanceof Error && error.name === "Error" ? error.message : t.errors.unconfirmed;
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
        <h2 className="text-foreground text-2xl font-normal tracking-tight">{t.success.title}</h2>
        <p className="text-muted-foreground mt-3 text-base leading-relaxed">{t.success.body}</p>
        <Link
          href="/#products"
          className="text-foreground mt-8 inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"
        >
          {t.success.explore} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-foreground text-2xl font-normal tracking-tight">{t.form.heading}</h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{t.form.intro}</p>
      <noscript>
        <p className="mt-4">{t.form.noscript}</p>
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
          <legend className="sr-only">{t.form.legend}</legend>
          <Input
            {...register("fullName")}
            id="demo-full-name"
            label={t.form.fullName}
            autoComplete="name"
            required
            maxLength={100}
            error={translate(errors.fullName?.message)}
          />
          <Input
            {...register("email")}
            id="demo-email"
            label={t.form.email}
            type="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={254}
            error={translate(errors.email?.message)}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              {...register("phone")}
              id="demo-phone"
              label={t.form.phone}
              type="tel"
              autoComplete="tel"
              placeholder={t.form.phonePlaceholder}
              maxLength={40}
              error={translate(errors.phone?.message)}
            />
            <Input
              {...register("company")}
              id="demo-company"
              label={t.form.company}
              autoComplete="organization"
              maxLength={150}
              error={translate(errors.company?.message)}
            />
          </div>
          <Textarea
            {...register("interests")}
            id="demo-interests"
            label={t.form.interests}
            placeholder={t.form.interestsPlaceholder}
            required
            rows={4}
            maxLength={1200}
            className="resize-y"
            error={translate(errors.interests?.message)}
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
                setSubmitError(t.errors.verifyLoad);
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
              {translate(submitError)}
            </p>
          )}
          <Button
            aria-label={isSubmitting ? t.form.sendingAria : t.form.submitAria}
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            loadingText={t.form.sending}
            className="w-full"
          >
            {t.form.submit} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {`${t.form.privacyNote} `}
            <Link href="/privacy-policy" className="underline underline-offset-2">
              {t.form.privacyLink}
            </Link>
            .
          </p>
        </fieldset>
      </form>
    </>
  );
}

export const getServerSideProps = localeServerSideProps;
