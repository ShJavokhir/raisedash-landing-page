import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  fleetSize: string;
  phone: string;
}

const initialFormData: FormData = {
  email: "",
  firstName: "",
  lastName: "",
  company: "",
  jobTitle: "",
  fleetSize: "",
  phone: "",
};

const fleetSizeOptions = [
  { value: "1-25", label: "1-25 vehicles" },
  { value: "26-100", label: "26-100 vehicles" },
  { value: "101-500", label: "101-500 vehicles" },
  { value: "501-1000", label: "501-1,000 vehicles" },
  { value: "1000+", label: "1,000+ vehicles" },
];

export function EnterpriseDemoForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const isValid =
    formData.email.includes("@") &&
    formData.firstName.trim().length > 1 &&
    formData.lastName.trim().length > 1 &&
    formData.company.trim().length > 1 &&
    formData.jobTitle.trim().length > 1 &&
    formData.fleetSize !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setError(null);

    // Sanitize inputs before sending
    const sanitizedData = {
      email: formData.email.trim().toLowerCase(),
      fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      companyName: formData.company.trim(),
      role: formData.jobTitle.trim(),
      companySize: formData.fleetSize,
      phone: formData.phone.trim() || undefined,
    };

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result.error || "Unable to submit. Please try again.";
        throw new Error(errorMessage);
      }

      setIsSuccess(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-8 md:p-10"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#2E2D2D] dark:text-foreground">
              Thank you for your interest
            </h3>
            <p className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground max-w-sm mx-auto">
              A member of our team will reach out to{" "}
              <span className="font-medium text-[#2E2D2D] dark:text-foreground">{formData.email}</span>{" "}
              within one business day.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#2E2D2D] dark:text-foreground mb-2">
          Request a demo
        </h2>
        <p className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground text-sm">
          Fill out the form and we'll be in touch within one business day.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email first - enterprise standard for lead qualification */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">
            Work email <span className="text-[#D04841]">*</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@company.com"
            className="h-11"
          />
        </div>

        {/* Name fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">
              First name <span className="text-[#D04841]">*</span>
            </label>
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="John"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">
              Last name <span className="text-[#D04841]">*</span>
            </label>
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Smith"
              className="h-11"
            />
          </div>
        </div>

        {/* Company info */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">
            Company <span className="text-[#D04841]">*</span>
          </label>
          <Input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Acme Logistics"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">
            Job title <span className="text-[#D04841]">*</span>
          </label>
          <Input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            placeholder="Fleet Manager"
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">
            Fleet size <span className="text-[#D04841]">*</span>
          </label>
          <select
            value={formData.fleetSize}
            onChange={(e) => handleChange("fleetSize", e.target.value)}
            className="w-full h-11 px-4 rounded-lg border border-[#DAD6D5] dark:border-border bg-white dark:bg-card text-[#2E2D2D] dark:text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#2E2D2D]/20 dark:focus:ring-foreground/20 focus:border-[#2E2D2D] dark:focus:border-foreground transition-colors"
          >
            <option value="">Select fleet size</option>
            {fleetSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">
            Phone number{" "}
            <span className="text-[rgba(24,23,23,0.5)] dark:text-muted-foreground font-normal">(optional)</span>
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="h-11"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border border-red-100 dark:border-red-900 rounded-lg p-3">
            {error}
          </p>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full h-12 text-base font-medium"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Request demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-[rgba(24,23,23,0.5)] dark:text-muted-foreground text-center pt-2">
          By submitting, you agree to our{" "}
          <a href="/privacy-policy" className="underline hover:text-[#2E2D2D] dark:hover:text-foreground">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms-of-use" className="underline hover:text-[#2E2D2D] dark:hover:text-foreground">
            Terms of Service
          </a>
          .
        </p>
      </form>
    </div>
  );
}
