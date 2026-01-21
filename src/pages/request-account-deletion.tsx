import { useState, type ChangeEvent, type FormEvent } from "react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ProductOption = "raisedash" | "raisedash_vertex";

const productOptions: {
  id: ProductOption;
  name: string;
  description: string;
  badge: string;
}[] = [
  {
    id: "raisedash",
    name: "Raisedash (for PTI inspections)",
    description: "Remove your PTI inspections account using the email tied to your profile.",
    badge: "Needs email",
  },
  {
    id: "raisedash_vertex",
    name: "Raisedash Vertex",
    description: "Remove your Vertex account using the phone number linked to your login.",
    badge: "Needs phone number",
  },
];

interface FormState {
  product: ProductOption;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

export default function RequestAccountDeletion() {
  const [formData, setFormData] = useState<FormState>({
    product: "raisedash",
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductSelect = (product: ProductOption) => {
    setFormData((prev) => ({
      ...prev,
      product,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/request-account-deletion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          product: "raisedash",
          fullName: "",
          email: "",
          phone: "",
          notes: "",
        });
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

  const requiresEmail = formData.product === "raisedash";

  return (
    <PageLayout
      title="Request Account Deletion"
      description="Request deletion of your Raisedash account. We'll process your request securely."
      noindex={true}
    >
      <Container className="flex items-center bg-white dark:bg-card mt-12 rounded-md border">
        <div className="w-full py-16 sm:py-24 md:py-28">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            Request Account Deletion
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Select the Raisedash product you use and provide the contact detail tied to your account.
            We will forward your request to our team via our secure Telegram workflow.
          </p>
        </div>
      </Container>

      <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground">
                Choose your app
              </h2>
              <p className="text-muted-foreground">
                Pick the product where you want your account removed. We will only contact you to confirm
                and process the deletion request.
              </p>

              <div className="space-y-4">
                {productOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleProductSelect(option.id)}
                    className={cn(
                      "w-full text-left p-4 border rounded-lg transition-colors",
                      "hover:border-primary/60 hover:bg-primary/5",
                      formData.product === option.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-background"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-lg font-semibold text-foreground">{option.name}</p>
                        <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-muted text-foreground">
                        {option.badge}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              
            </div>

            <div>
              {submitStatus === "success" ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    Request sent
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    We have forwarded your deletion request. Our team will reach out to confirm before processing.
                  </p>
                  <div className="mt-6">
                    <Button variant="secondary" onClick={() => setSubmitStatus("idle")}>
                      Submit another request
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="Jane Doe"
                    />
                  </div>

                  {requiresEmail ? (
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Account Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-2">
                      Additional details (optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      placeholder="Tell us anything we should know before deleting your account."
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-sm text-destructive">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit request"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>

    </PageLayout>
  );
}
