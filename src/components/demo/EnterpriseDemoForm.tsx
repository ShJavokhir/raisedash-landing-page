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

interface FieldErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  jobTitle?: string;
  fleetSize?: string;
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
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
    // Clear field error when user starts typing
    if (fieldErrors[field as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): FieldErrors => {
    const errors: FieldErrors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.company.trim()) {
      errors.company = "Company name is required";
    } else if (formData.company.trim().length < 2) {
      errors.company = "Company name must be at least 2 characters";
    }

    if (!formData.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    } else if (formData.jobTitle.trim().length < 2) {
      errors.jobTitle = "Job title must be at least 2 characters";
    }

    if (!formData.fleetSize) {
      errors.fleetSize = "Please select a fleet size";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError("Please fix the errors above to continue.");
      return;
    }

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
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
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
        className="dark:bg-card border-border dark:border-border rounded-2xl border bg-white p-8 md:p-10"
      >
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950">
            <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-foreground dark:text-foreground text-2xl font-semibold">
              Thank you for your interest
            </h3>
            <p className="text-muted-foreground dark:text-muted-foreground mx-auto max-w-sm">
              A member of our team will reach out to{" "}
              <span className="text-foreground dark:text-foreground font-medium">
                {formData.email}
              </span>{" "}
              within one business day.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="dark:bg-card border-border dark:border-border rounded-2xl border bg-white p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-foreground dark:text-foreground mb-2 text-2xl font-semibold">
          Request a demo
        </h2>
        <p className="text-muted-foreground dark:text-muted-foreground text-sm">
          Fill out the form and we'll be in touch within one business day.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email first - enterprise standard for lead qualification */}
        <div className="space-y-2">
          <label className="text-foreground dark:text-foreground text-sm font-medium">
            Work email <span className="text-destructive">*</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@company.com"
            className={`h-11 ${fieldErrors.email ? "border-destructive focus:ring-destructive/20" : ""}`}
          />
          {fieldErrors.email && <p className="text-destructive text-sm">{fieldErrors.email}</p>}
        </div>

        {/* Name fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-foreground dark:text-foreground text-sm font-medium">
              First name <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="John"
              className={`h-11 ${fieldErrors.firstName ? "border-destructive focus:ring-destructive/20" : ""}`}
            />
            {fieldErrors.firstName && (
              <p className="text-destructive text-sm">{fieldErrors.firstName}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-foreground dark:text-foreground text-sm font-medium">
              Last name <span className="text-destructive">*</span>
            </label>
            <Input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Smith"
              className={`h-11 ${fieldErrors.lastName ? "border-destructive focus:ring-destructive/20" : ""}`}
            />
            {fieldErrors.lastName && (
              <p className="text-destructive text-sm">{fieldErrors.lastName}</p>
            )}
          </div>
        </div>

        {/* Company info */}
        <div className="space-y-2">
          <label className="text-foreground dark:text-foreground text-sm font-medium">
            Company <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Acme Logistics"
            className={`h-11 ${fieldErrors.company ? "border-destructive focus:ring-destructive/20" : ""}`}
          />
          {fieldErrors.company && <p className="text-destructive text-sm">{fieldErrors.company}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-foreground dark:text-foreground text-sm font-medium">
            Job title <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            value={formData.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            placeholder="Fleet Manager"
            className={`h-11 ${fieldErrors.jobTitle ? "border-destructive focus:ring-destructive/20" : ""}`}
          />
          {fieldErrors.jobTitle && (
            <p className="text-destructive text-sm">{fieldErrors.jobTitle}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-foreground dark:text-foreground text-sm font-medium">
            Fleet size <span className="text-destructive">*</span>
          </label>
          <select
            value={formData.fleetSize}
            onChange={(e) => handleChange("fleetSize", e.target.value)}
            className={`dark:bg-card text-foreground dark:text-foreground h-11 w-full rounded-lg border bg-white px-4 text-sm transition-colors focus:ring-2 focus:outline-none ${
              fieldErrors.fleetSize
                ? "border-destructive focus:ring-destructive/20 focus:border-destructive"
                : "border-input dark:border-border dark:focus:ring-foreground/20 dark:focus:border-foreground focus:border-[#2E2D2D] focus:ring-[#2E2D2D]/20"
            }`}
          >
            <option value="">Select fleet size</option>
            {fleetSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldErrors.fleetSize && (
            <p className="text-destructive text-sm">{fieldErrors.fleetSize}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-foreground dark:text-foreground text-sm font-medium">
            Phone number{" "}
            <span className="text-muted-foreground dark:text-muted-foreground font-normal">
              (optional)
            </span>
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
          <p className="text-destructive bg-destructive/10 border-destructive/20 rounded-lg border p-3 text-sm">
            {error}
          </p>
        )}

        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full text-base font-medium"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Request demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <p className="text-muted-foreground dark:text-muted-foreground pt-2 text-center text-xs">
          By submitting, you agree to our{" "}
          <a
            href="/privacy-policy"
            className="hover:text-foreground dark:hover:text-foreground underline"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="/terms-of-use"
            className="hover:text-foreground dark:hover:text-foreground underline"
          >
            Terms of Service
          </a>
          .
        </p>
      </form>
    </div>
  );
}
