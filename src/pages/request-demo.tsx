import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Check } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

const benefits = [
  {
    title: "Personalized Demo",
    description: "See how Raisedash fits your specific use case",
  },
  {
    title: "Expert Consultation",
    description: "Get answers from our security specialists",
  },
  {
    title: "Live Demonstration",
    description: "Watch our platform in action with real data",
  },
];

export default function RequestDemo() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData(initialFormData);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout
      title="Request Demo"
      description="Request a personalized demo of Raisedash. See how our platform can enhance your freight logistics security."
    >
      <Container className="bg-white dark:bg-card mt-18 rounded-md border ui-corner-accents">
        <div className="py-12">
          {submitStatus === "success" ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Demo Request Submitted!
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Thank you for your interest in Raisedash. Our team will review your request and
                contact you within 24 hours to schedule your personalized demo.
              </p>
              <Button onClick={() => setSubmitStatus("idle")}>Submit Another Request</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Side - Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Request Your Demo
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Get a personalized demonstration of Raisedash tailored to your security needs.
                    Our experts will show you how our platform can enhance your security operations.
                  </p>
                </div>

                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="firstName"
                      label="First Name"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                    />
                    <Input
                      type="text"
                      name="lastName"
                      label="Last Name"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                    />
                  </div>

                  <Input
                    type="email"
                    name="email"
                    label="Work Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@company.com"
                  />

                  <Input
                    type="tel"
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <p className="text-sm text-muted-foreground">* Required fields</p>
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? "Submitting..." : "Request Demo"}
                    </Button>
                  </div>

                  {submitStatus === "error" && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        There was an error submitting your request. Please try again or contact us
                        directly.
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </Container>
    </PageLayout>
  );
}
