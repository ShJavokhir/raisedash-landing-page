import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Mail, HeadphonesIcon, Users } from "lucide-react";

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
      <section className="bg-[#F9F7F6] dark:bg-secondary">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-[48px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground leading-tight">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground leading-relaxed">
              Ready to secure your freight operations? We're here to help. Contact us to learn more
              about our solutions or get started today.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="bg-[#F9F7F6] dark:bg-secondary pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-8 md:p-12">
              <h2 className="text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-8">
                Send us a Message
              </h2>

              {isSubmitted ? (
                <div className="bg-[#F0FDF4] dark:bg-emerald-950 border border-[#BBF7D0] dark:border-emerald-800 rounded-2xl p-8 text-center">
                  <div className="w-14 h-14 bg-[#DCFCE7] dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-7 h-7 text-[#16A34A] dark:text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-[#166534] dark:text-emerald-400 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-[#15803D] dark:text-emerald-300 font-light">
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
            <div className="space-y-6">
              <h2 className="text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-2">
                Contact Information
              </h2>
              <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-8">
                Reach out directly to the team that can best assist you.
              </p>

              <div className="space-y-4">
                {contactMethods.map((method) => (
                  <div
                    key={method.title}
                    className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-6 hover:-translate-y-1 transition-transform duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#19224A] dark:bg-[#1E293B] rounded-xl flex items-center justify-center text-white flex-shrink-0">
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-[#2E2D2D] dark:text-foreground mb-1">
                          {method.title}
                        </h3>
                        <p className="text-sm font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-3">{method.description}</p>
                        <a
                          href={`mailto:${method.email}`}
                          className="text-sm text-[#D04841] hover:underline font-medium"
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
      </section>

      {/* FAQ Section */}
      <section className="bg-white dark:bg-card py-16 md:py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our services and solutions.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-0">
            <div className="border-b border-[#EEEBEA] dark:border-border py-6">
              <h3 className="text-lg font-medium text-[#2E2D2D] dark:text-foreground mb-3">
                How quickly can we get started with Raisedash?
              </h3>
              <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                Most implementations can be completed within 1-2 weeks, depending on your specific
                requirements and infrastructure setup.
              </p>
            </div>

            <div className="border-b border-[#EEEBEA] dark:border-border py-6">
              <h3 className="text-lg font-medium text-[#2E2D2D] dark:text-foreground mb-3">
                Do you offer 24/7 support?
              </h3>
              <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                Yes, we provide 24/7 monitoring and support for all our security solutions to ensure
                your cargo is always protected.
              </p>
            </div>

            <div className="border-b border-[#EEEBEA] dark:border-border py-6">
              <h3 className="text-lg font-medium text-[#2E2D2D] dark:text-foreground mb-3">
                Can Raisedash integrate with our existing systems?
              </h3>
              <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                Absolutely. Our solutions are designed to integrate seamlessly with most logistics
                and ERP systems through our comprehensive API.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-medium text-[#2E2D2D] dark:text-foreground mb-3">
                What makes Raisedash different from other security solutions?
              </h3>
              <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                Our AI-powered approach provides real-time threat detection and predictive
                analytics, going beyond traditional security measures to prevent incidents before
                they occur.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
