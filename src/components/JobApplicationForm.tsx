import React, { useState, useCallback } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/Button";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

interface JobApplicationFormProps {
  jobTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  experience: string;
  coverLetter: string;
}

export function JobApplicationForm({ jobTitle, isOpen, onClose }: JobApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    experience: "",
    coverLetter: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileKey, setTurnstileKey] = useState(0);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Please select your experience level";
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required";
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setSubmitError("Please complete the verification challenge.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitError(null);

    try {
      const response = await fetch("/api/job-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle,
          ...formData,
          turnstileToken: turnstileToken || undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          linkedinUrl: "",
          experience: "",
          coverLetter: "",
        });
        resetTurnstile();
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus("idle");
        }, 2000);
      } else {
        if (result.code === "TURNSTILE_FAILED" || result.code === "TURNSTILE_REQUIRED") {
          resetTurnstile();
        }
        setSubmitError(result.error || "Failed to submit application. Please try again.");
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("Failed to submit application. Please try again.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-application-title"
        className="bg-card border-border max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xs border shadow-lg"
      >
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 id="job-application-title" className="text-foreground text-2xl font-semibold">
              Apply for {jobTitle}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {submitStatus === "success" ? (
            <div className="py-8 text-center" aria-live="polite">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
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
              <h3 className="text-foreground mb-2 text-xl font-semibold">
                Application Submitted Successfully!
              </h3>
              <p className="text-muted-foreground">
                Thank you for your interest. We'll review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                    aria-invalid={errors.firstName ? "true" : undefined}
                    className={`bg-background text-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                      errors.firstName ? "border-red-500" : "border-input"
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p id="firstName-error" role="alert" className="mt-1 text-sm text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                    aria-invalid={errors.lastName ? "true" : undefined}
                    className={`bg-background text-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                      errors.lastName ? "border-red-500" : "border-input"
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p id="lastName-error" role="alert" className="mt-1 text-sm text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-foreground mb-2 block text-sm font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={errors.email ? "true" : undefined}
                    className={`bg-background text-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                      errors.email ? "border-red-500" : "border-input"
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-sm text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="text-foreground mb-2 block text-sm font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    aria-invalid={errors.phone ? "true" : undefined}
                    className={`bg-background text-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                      errors.phone ? "border-red-500" : "border-input"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p id="phone-error" role="alert" className="mt-1 text-sm text-red-500">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  id="linkedinUrl"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  className="border-input bg-background text-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label
                  htmlFor="experience"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  Years of Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleInputChange}
                  aria-describedby={errors.experience ? "experience-error" : undefined}
                  aria-invalid={errors.experience ? "true" : undefined}
                  className={`bg-background text-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                    errors.experience ? "border-red-500" : "border-input"
                  }`}
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years</option>
                  <option value="2-3">2-3 years</option>
                  <option value="4-5">4-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                {errors.experience && (
                  <p id="experience-error" role="alert" className="mt-1 text-sm text-red-500">
                    {errors.experience}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="coverLetter"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  Cover Letter *
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={6}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  aria-describedby={
                    errors.coverLetter ? "coverLetter-error coverLetter-hint" : "coverLetter-hint"
                  }
                  aria-invalid={errors.coverLetter ? "true" : undefined}
                  className={`bg-background text-foreground focus:ring-ring w-full rounded-md border px-3 py-2 focus:border-transparent focus:ring-2 focus:outline-none ${
                    errors.coverLetter ? "border-red-500" : "border-input"
                  }`}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                />
                <p id="coverLetter-hint" className="text-muted-foreground mt-1 text-sm">
                  {formData.coverLetter.length}/500 characters (minimum 50)
                </p>
                {errors.coverLetter && (
                  <p id="coverLetter-error" role="alert" className="mt-1 text-sm text-red-500">
                    {errors.coverLetter}
                  </p>
                )}
              </div>

              {/* Turnstile CAPTCHA */}
              {TURNSTILE_SITE_KEY && (
                <div className="flex justify-center pt-2">
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

              {(submitStatus === "error" || submitError) && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
                >
                  <p className="text-red-800 dark:text-red-200">
                    {submitError ||
                      "There was an error submitting your application. Please try again."}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || (TURNSTILE_SITE_KEY ? !turnstileToken : false)}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
