import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Mail, HeadphonesIcon, Users, Check } from "lucide-react";

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout
      title="Contact Us"
      description="Get in touch with Raisedash. Contact our sales, support, or partnership teams to learn more about our freight logistics security solutions."
      keywords={["contact raisedash", "fleet safety support", "logistics software demo", "sales inquiry"]}
    >
      {/* Hero Section */}
      <div className="pt-8 pb-12">
        <Container className="bg-white py-12 sm:py-16 px-8 sm:px-12 rounded-xs border border-border animate-fade-in-scale delay-0">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-[48px] font-normal tracking-[-0.03em] text-foreground leading-tight animate-fade-in-up delay-75">
              Get in Touch
            </h1>
            <p className="mt-6 text-xl font-normal text-muted-foreground leading-relaxed animate-fade-in-up delay-150">
              Ready to secure your freight operations? We're here to help. Contact us to learn more
              about our solutions or get started today.
            </p>
          </div>
        </Container>
      </div>

      {/* Contact Form Section */}
      <Container className="py-12 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Contact Form */}
          <div className="bg-white rounded-xs border border-border p-6 sm:p-8 animate-fade-in-scale delay-200">
            <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-foreground mb-8">
              Send us a Message
            </h2>

            {isSubmitted ? (
              <div className="bg-surface-3 border border-border rounded-xs p-8 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-normal text-foreground mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-5 animate-fade-in-scale delay-300">
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-foreground mb-2">
                Contact Information
              </h2>
              <p className="text-base text-muted-foreground">
                Reach out directly to the team that can best assist you.
              </p>
            </div>

            <div className="space-y-5">
              {contactMethods.map((method, index) => (
                <div
                  key={method.title}
                  className={`bg-white rounded-xs border border-border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2 animate-fade-in-scale delay-${400 + index * 100}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary rounded-xs flex items-center justify-center text-primary-foreground flex-shrink-0">
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-1">
                        {method.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                      <a
                        href={`mailto:${method.email}`}
                        className="text-sm text-primary hover:text-primary/80 font-normal transition-colors duration-[0.15s]"
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
        <div className="mb-10 text-center animate-fade-in-up delay-700">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Quick answers to common questions about our services and solutions.
          </p>
        </div>

        <div className="bg-white rounded-xs border border-border p-6 sm:p-8 animate-fade-in-scale delay-800">
          <div className="max-w-3xl mx-auto space-y-0">
            <div className="border-b border-border py-6">
              <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-3">
                How quickly can we get started with Raisedash?
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Most implementations can be completed within 1-2 weeks, depending on your specific
                requirements and infrastructure setup.
              </p>
            </div>

            <div className="border-b border-border py-6">
              <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-3">
                Do you offer 24/7 support?
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Yes, we provide 24/7 monitoring and support for all our security solutions to ensure
                your cargo is always protected.
              </p>
            </div>

            <div className="border-b border-border py-6">
              <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-3">
                Can Raisedash integrate with our existing systems?
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                Absolutely. Our solutions are designed to integrate seamlessly with most logistics
                and ERP systems through our comprehensive API.
              </p>
            </div>

            <div className="py-6">
              <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-3">
                What makes Raisedash different from other security solutions?
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
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
        <div className="bg-primary rounded-xs p-8 sm:p-12 text-center animate-fade-in-scale delay-900">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-primary-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Schedule a demo to see how Raisedash can transform your freight security.
          </p>
          <Link href="/request-demo">
            <Button variant="secondary" size="lg">
              Request a Demo
            </Button>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
