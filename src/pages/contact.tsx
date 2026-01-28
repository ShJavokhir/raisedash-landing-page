import { useState, useCallback } from "react";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Mail, HeadphonesIcon, Users, Check } from "lucide-react";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

const contactMethods = [
  {
    title: "Sales Inquiries",
    description: "Get in touch with our sales team to learn more about our solutions.",
    email: "sales@raisedash.com",
    icon: Mail,
  },
  {
    title: "Support",
    description: "Need help with your existing Raisedash implementation?",
    email: "support@raisedash.com",
    icon: HeadphonesIcon,
  },
  {
    title: "Partnerships",
    description: "Interested in partnering with us? Let's explore opportunities.",
    email: "partnerships@raisedash.com",
    icon: Users,
  },
];

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
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

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
    setSubmitError(null);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
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
      setSubmitError("Please complete the verification challenge.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          turnstileToken: turnstileToken || undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFormData(initialFormData);
        resetTurnstile();
      } else {
        if (result.code === "TURNSTILE_FAILED" || result.code === "TURNSTILE_REQUIRED") {
          resetTurnstile();
        }
        setSubmitError(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout
      title="Contact Us"
      description="Get in touch with Raisedash. Contact our sales, support, or partnership teams to learn more about our freight logistics security solutions."
      keywords={[
        "contact raisedash",
        "fleet safety support",
        "logistics software demo",
        "sales inquiry",
      ]}
    >
      {/* Hero Section */}
      <div className="pt-8 pb-12">
        <Container className="bg-card border-border animate-fade-in-scale rounded-xs border px-8 py-12 delay-0 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
              Get in Touch
            </h1>
            <p className="text-muted-foreground animate-fade-in-up mt-6 text-xl leading-relaxed font-normal delay-150">
              Ready to secure your freight operations? We're here to help. Contact us to learn more
              about our solutions or get started today.
            </p>
          </div>
        </Container>
      </div>

      {/* Contact Form Section */}
      <Container className="py-12 md:px-0">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-6 delay-200 sm:p-8">
            <h2 className="text-foreground mb-8 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
              Send us a Message
            </h2>

            {isSubmitted ? (
              <div className="bg-surface-3 border-border rounded-xs border p-8 text-center">
                <div className="bg-primary/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                  <Check className="text-primary h-7 w-7" />
                </div>
                <h3 className="text-foreground mb-2 text-xl font-normal">
                  Message Sent Successfully!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    type="text"
                    name="name"
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <Input
                    type="email"
                    name="email"
                    label="Email Address"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                  />
                </div>

                <Input
                  type="text"
                  name="company"
                  label="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your Company"
                />

                <Select
                  name="inquiryType"
                  label="Inquiry Type"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  options={inquiryTypeOptions}
                />

                <Input
                  type="text"
                  name="subject"
                  label="Subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                />

                <Textarea
                  name="message"
                  label="Message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your needs..."
                />

                {/* Turnstile CAPTCHA */}
                {TURNSTILE_SITE_KEY && (
                  <div className="flex justify-center">
                    <Turnstile
                      key={turnstileKey}
                      siteKey={TURNSTILE_SITE_KEY}
                      onSuccess={handleTurnstileSuccess}
                      onError={handleTurnstileError}
                      onExpire={handleTurnstileExpire}
                      options={{
                        theme: "light",
                        size: "normal",
                      }}
                    />
                  </div>
                )}

                {submitError && (
                  <p className="text-center text-sm text-red-600 dark:text-red-400">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || (TURNSTILE_SITE_KEY ? !turnstileToken : false)}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="animate-fade-in-scale space-y-5 delay-300">
            <div className="mb-6">
              <h2 className="text-foreground mb-2 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
                Contact Information
              </h2>
              <p className="text-muted-foreground text-base">
                Reach out directly to the team that can best assist you.
              </p>
            </div>

            <div className="space-y-5">
              {contactMethods.map((method, index) => (
                <div
                  key={method.title}
                  className={`bg-card border-border hover:bg-surface-2 animate-fade-in-scale rounded-xs border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 delay-${400 + index * 100}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary text-primary-foreground flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xs">
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-foreground mb-1 text-xl font-normal tracking-[-0.01em]">
                        {method.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 text-sm">{method.description}</p>
                      <a
                        href={`mailto:${method.email}`}
                        className="text-primary hover:text-primary/80 text-sm font-normal transition-colors duration-[0.15s]"
                      >
                        {method.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* FAQ Section */}
      <Container className="py-12 md:px-0">
        <div className="animate-fade-in-up mb-10 text-center delay-700">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
            Quick answers to common questions about our services and solutions.
          </p>
        </div>

        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-6 delay-800 sm:p-8">
          <div className="mx-auto max-w-3xl space-y-0">
            <div className="border-border border-b py-6">
              <h3 className="text-foreground mb-3 text-xl font-normal tracking-[-0.01em]">
                How quickly can we get started with Raisedash?
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Most implementations can be completed within 1-2 weeks, depending on your specific
                requirements and infrastructure setup.
              </p>
            </div>

            <div className="border-border border-b py-6">
              <h3 className="text-foreground mb-3 text-xl font-normal tracking-[-0.01em]">
                Do you offer 24/7 support?
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Yes, we provide 24/7 monitoring and support for all our security solutions to ensure
                your cargo is always protected.
              </p>
            </div>

            <div className="border-border border-b py-6">
              <h3 className="text-foreground mb-3 text-xl font-normal tracking-[-0.01em]">
                Can Raisedash integrate with our existing systems?
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Absolutely. Our solutions are designed to integrate seamlessly with most logistics
                and ERP systems through our comprehensive API.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-foreground mb-3 text-xl font-normal tracking-[-0.01em]">
                What makes Raisedash different from other security solutions?
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                Our AI-powered approach provides real-time threat detection and predictive
                analytics, going beyond traditional security measures to prevent incidents before
                they occur.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="pb-12 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 text-center delay-900 sm:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            Schedule a demo to see how Raisedash can transform your freight security.
          </p>
          <Link href="/get-started">
            <Button size="lg">See a demo</Button>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
