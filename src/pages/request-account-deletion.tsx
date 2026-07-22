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
      <Container className="bg-card mt-12 flex items-center rounded-xs border px-5">
        <div className="w-full py-16 sm:py-24 md:py-28">
          <h1 className="text-foreground text-4xl font-semibold tracking-[-0.01em] md:text-5xl">
            Request Account Deletion
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-lg">
            Select the Raisedash product you use and provide the contact detail tied to your
            account. We will forward your request to our team via our secure Telegram workflow.
          </p>
        </div>
      </Container>

      <Container className="bg-card border-border mt-8 rounded-xs border px-5">
        <div className="py-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-foreground text-3xl font-semibold tracking-[-0.01em]">
                Choose your app
              </h2>
              <p className="text-muted-foreground">
                Pick the product where you want your account removed. We will only contact you to
                confirm and process the deletion request.
              </p>

              <div className="space-y-4">
                {productOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleProductSelect(option.id)}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-colors",
                      "hover:border-primary/60 hover:bg-primary/5",
                      formData.product === option.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-foreground text-lg font-semibold">{option.name}</p>
                        <p className="text-muted-foreground mt-1 text-sm">{option.description}</p>
                      </div>
                      <span className="bg-muted text-foreground inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
                        {option.badge}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              {submitStatus === "success" ? (
                <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                    <svg
                      className="h-6 w-6 text-green-600 dark:text-green-400"
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
                  <h3 className="mb-2 text-lg font-semibold text-green-800 dark:text-green-200">
                    Request sent
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    We have forwarded your deletion request. Our team will reach out to confirm
                    before processing.
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
                    <label
                      htmlFor="fullName"
                      className="text-foreground mb-2 block text-sm font-medium"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="border-input bg-background text-foreground focus:ring-ring w-full rounded-xs border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
                      placeholder="Jane Doe"
                    />
                  </div>

                  {requiresEmail ? (
                    <div>
                      <label
                        htmlFor="email"
                        className="text-foreground mb-2 block text-sm font-medium"
                      >
                        Account Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-input bg-background text-foreground focus:ring-ring w-full rounded-xs border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                  ) : (
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-foreground mb-2 block text-sm font-medium"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-input bg-background text-foreground focus:ring-ring w-full rounded-xs border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="notes"
                      className="text-foreground mb-2 block text-sm font-medium"
                    >
                      Additional details (optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="border-input bg-background text-foreground focus:ring-ring w-full resize-none rounded-xs border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
                      placeholder="Tell us anything we should know before deleting your account."
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-destructive text-sm">
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
