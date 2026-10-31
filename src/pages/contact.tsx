import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { ContactChoices, type ContactChoicesCopy } from "@/components/contact/ContactChoices";
import { emails } from "@/data/site";
import { timeoutSignal } from "@/lib/handoff";
import { analyticsContext, capture, identify } from "@/lib/site-analytics";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const SEND_FAILED = `Failed to send message. Please try again, or email us at ${emails.sales}.`;

// The same ways to reach us as /get-a-demo. The form here is the general contact
// form (sales, support, partnerships): it posts to /api/contact, not the demo
// request route, so a support question never counts as a demo request.
const copy: ContactChoicesCopy = {
  choices: {
    aria: "Ways to reach us",
    telegram: "Contact us on Telegram",
    email: "Email us",
    booking: "Book a call",
    bookingNote: "Pick a time that works for you.",
    details: "Send us a message",
    detailsNote: "Tell us how we can help. We’ll get back to you.",
  },
  emailHelp: {
    body: "Email app didn’t open? Copy our address and send us an email from any app.",
    copy: "Copy",
    copied: "Copied",
  },
  back: "Other ways to reach us",
  formSectionAria: "Send us a message",
  telegramHelp: {
    noTelegram: (email) =>
      `No Telegram? Email us at ${email}, or send us a message and we’ll get back to you.`,
    leaveDetails: "Send us a message",
  },
};

const inquiryTypeOptions = [
  { value: "sales", label: "Sales Inquiry" },
  { value: "support", label: "Support" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

const initialFormData = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
  inquiryType: "sales",
};

export default function Contact() {
  return (
    <PageLayout
      title="Contact us"
      description="Contact Raisedash on Telegram, by email, or book a call. Sales, support, and partnerships."
      keywords={[
        "contact raisedash",
        "driver readiness platform",
        "book a demo",
        "fleet onboarding software",
      ]}
    >
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
            Get in touch.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-md text-lg leading-relaxed">
            Questions about one of our tools, or need a hand getting started? Choose the easiest way
            to reach us.
          </p>

          <ContactChoices
            placement="contact"
            copy={copy}
            emailSubject="Raisedash inquiry"
            formId="contact-request"
            focusIds={["contact-name", "contact-success"]}
          >
            <ContactForm />
          </ContactChoices>

          <p className="text-muted-foreground mt-10 text-sm leading-relaxed">
            {`Already a customer? Email `}
            <a
              href={`mailto:${emails.support}`}
              className="text-foreground underline underline-offset-2"
            >
              {emails.support}
            </a>
            {`. For partnerships, email `}
            <a
              href={`mailto:${emails.partnerships}`}
              className="text-foreground underline underline-offset-2"
            >
              {emails.partnerships}
            </a>
            .
          </p>
        </div>
      </Container>
    </PageLayout>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  // True while the shown error is about verification, which a fresh pass fixes.
  const verifyErrorRef = useRef(false);

  useEffect(() => {
    if (isSubmitted) successRef.current?.focus();
  }, [isSubmitted]);
  useEffect(() => {
    if (submitError) errorRef.current?.focus();
  }, [submitError]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  // Turnstile handlers
  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
    if (verifyErrorRef.current) setSubmitError(null);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    verifyErrorRef.current = true;
    setSubmitError("Verification failed. Please try again.");
  }, []);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken(null);
    setTurnstileKey((prev) => prev + 1);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      verifyErrorRef.current = true;
      setSubmitError("Please complete the verification challenge.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: timeoutSignal(30000),
        body: JSON.stringify({
          ...formData,
          turnstileToken: turnstileToken || undefined,
          analytics: analyticsContext(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // The subject and message are free text and stay out of analytics.
        identify(formData.email);
        capture("contact_form_submitted", {
          inquiry_type: formData.inquiryType,
          has_company: Boolean(formData.company.trim()),
        });
        setIsSubmitted(true);
        setFormData(initialFormData);
        resetTurnstile();
      } else {
        // The server spends a Turnstile token as soon as it checks it, so any
        // failed send needs a fresh one before the visitor can retry.
        resetTurnstile();
        capture("contact_form_error", { status: response.status, code: result.code });
        verifyErrorRef.current =
          result.code === "TURNSTILE_FAILED" || result.code === "TURNSTILE_REQUIRED";
        // 4xx errors say what to fix; a 5xx message ("Internal server error") doesn't.
        setSubmitError((response.status < 500 && result.error) || SEND_FAILED);
      }
    } catch (error) {
      resetTurnstile();
      capture("contact_form_error", { status: "network" });
      console.error("Error submitting form:", error);
      verifyErrorRef.current = false;
      setSubmitError(SEND_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        ref={successRef}
        id="contact-success"
        tabIndex={-1}
        role="status"
        className="py-12 outline-none"
      >
        <span className="bg-background mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full">
          <Check className="text-foreground h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="text-foreground text-2xl font-normal tracking-tight">
          Thanks for reaching out.
        </h2>
        <p className="text-muted-foreground mt-3 text-base leading-relaxed">
          We’ve received your message and will get back to you within 24 hours.
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
      <h2 className="text-foreground text-2xl font-normal tracking-tight">Send us a message.</h2>
      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
        Sales, support, or partnerships. Tell us how we can help.
      </p>
      <noscript>
        <p className="mt-4">
          {`Please enable JavaScript to use this form, or email us at ${emails.sales}.`}
        </p>
      </noscript>
      <form onSubmit={handleSubmit} className="mt-7" aria-busy={isSubmitting}>
        <fieldset disabled={isSubmitting} className="space-y-5">
          <legend className="sr-only">Your message and contact details</legend>
          <Input
            id="contact-name"
            type="text"
            name="name"
            label="Full name"
            autoComplete="name"
            required
            maxLength={100}
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            id="contact-email"
            type="email"
            name="email"
            label="Email address"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            maxLength={254}
            value={formData.email}
            onChange={handleInputChange}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              id="contact-company"
              type="text"
              name="company"
              label="Company (optional)"
              autoComplete="organization"
              maxLength={150}
              value={formData.company}
              onChange={handleInputChange}
            />
            <Select
              id="contact-inquiry-type"
              name="inquiryType"
              label="Inquiry type"
              value={formData.inquiryType}
              onChange={handleInputChange}
              options={inquiryTypeOptions}
            />
          </div>
          <Input
            id="contact-subject"
            type="text"
            name="subject"
            label="Subject"
            required
            maxLength={200}
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="How can we help you?"
          />
          <Textarea
            id="contact-message"
            name="message"
            label="Message"
            required
            rows={5}
            maxLength={2000}
            className="resize-y"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us more about what you need."
          />
          {TURNSTILE_SITE_KEY && (
            <Turnstile
              key={turnstileKey}
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={handleTurnstileSuccess}
              onError={handleTurnstileError}
              onExpire={handleTurnstileExpire}
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
            type="submit"
            size="lg"
            className="w-full"
            isLoading={isSubmitting}
            loadingText="Sending…"
            disabled={TURNSTILE_SITE_KEY ? !turnstileToken : false}
          >
            Send message <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {`We’ll use your details to respond to your message. `}
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
