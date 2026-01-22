import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Loader2, Truck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// Confetti component
function Confetti({ show }: { show: boolean }) {
  const [particles, setParticles] = useState<
    { id: number; x: number; delay: number; color: string; size: number }[]
  >([]);

  useEffect(() => {
    if (show) {
      const colors = ["#4ade80", "#60a5fa", "#f472b6", "#facc15", "#a78bfa", "#34d399", "#fb923c"];
      const newParticles = Array.from({ length: 120 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), 2500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show || particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, scale: 1 }}
          animate={{ y: "100vh", opacity: 0, scale: 0.3, rotate: 720 }}
          transition={{ duration: 2 + Math.random(), delay: p.delay, ease: "easeIn" }}
          className="absolute rounded-full"
          style={{ backgroundColor: p.color, width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}

type FleetSize = "1-10" | "11-50" | "51-100" | "101-250" | "251+";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  fleetSize: FleetSize | "";
  phone: string;
}

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  company?: string;
  jobTitle?: string;
}

const fleetSizeOptions: { value: FleetSize; label: string }[] = [
  { value: "1-10", label: "1-10 Vehicles" },
  { value: "11-50", label: "11-50 Vehicles" },
  { value: "51-100", label: "51-100 Vehicles" },
  { value: "101-250", label: "101-250 Vehicles" },
  { value: "251+", label: "251+ Vehicles" },
];

type Step = "email" | "fleet-size" | "registration" | "success";

export default function GetStarted() {
  const router = useRouter();
  const [step, setStep] = useState<Step | null>(null); // null until we determine initial step
  const [emailFromUrl, setEmailFromUrl] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
    fleetSize: "",
    phone: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Determine initial step based on URL params
  useEffect(() => {
    if (router.isReady) {
      if (router.query.email && typeof router.query.email === "string") {
        const email = router.query.email.trim();
        if (email) {
          setFormData((prev) => ({ ...prev, email }));
          setEmailFromUrl(true);
          setStep("fleet-size");
        } else {
          setStep("email");
        }
      } else {
        setStep("email");
      }
    }
  }, [router.isReady, router.query.email]);

  const handleFleetSizeSelect = (size: FleetSize) => {
    setFormData((prev) => ({ ...prev, fleetSize: size }));
    setShowConfetti(true);
    setStep("registration");
  };

  const validateEmail = (email: string): string | null => {
    const trimmed = email.trim();
    if (!trimmed) {
      return "Email is required";
    }
    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    const error = validateEmail(formData.email);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailError(null);
    setStep("fleet-size");
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmitError(null);
    if (field === "email") {
      setEmailError(null);
    }
    if (fieldErrors[field as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): FieldErrors => {
    const errors: FieldErrors = {};

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

    return errors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSubmitError("Please fix the errors above to continue.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

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
        throw new Error(result.error || "Unable to submit. Please try again.");
      }

      setStep("success");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goBack = () => {
    if (step === "registration") {
      setShowConfetti(false);
      setStep("fleet-size");
    } else if (step === "fleet-size" && !emailFromUrl) {
      setStep("email");
    }
  };

  return (
    <>
      <Head>
        <title>Get Started | Raisedash</title>
        <meta
          name="description"
          content="Get started with Raisedash fleet safety solutions. Tell us about your fleet and schedule your personalized demo."
        />
      </Head>

      <Confetti show={showConfetti} />
      <div className="bg-background flex min-h-screen items-center justify-center">
        <main className="mx-auto w-full max-w-xl px-6 py-12">
          {/* Loading state while determining initial step */}
          {step === null && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === "email" && (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-10 text-center">
                  <h1 className="text-foreground mb-3 text-3xl font-semibold tracking-tight">
                    Enter your work email to begin
                  </h1>
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">
                      Work email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="you@company.com"
                      autoFocus
                      className={`h-11 bg-white ${emailError ? "border-destructive" : ""}`}
                    />
                    {emailError && <p className="text-destructive text-sm">{emailError}</p>}
                  </div>

                  <div className="pt-2">
                    <Button type="submit" className="h-12 w-full text-base font-medium">
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === "fleet-size" && (
              <motion.div
                key="fleet-size"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-10 text-center">
                  <h1 className="text-foreground mb-3 text-3xl font-semibold tracking-tight">
                    How large is your fleet?
                  </h1>
                </div>

                <div className="space-y-3">
                  {fleetSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFleetSizeSelect(option.value)}
                      className="border-border bg-card hover:bg-surface-2 hover:border-foreground/20 text-foreground group flex w-full cursor-pointer items-center justify-between rounded-md border p-4 text-left transition-all duration-150"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-surface-3 group-hover:bg-primary/10 flex h-9 w-9 items-center justify-center rounded-sm transition-colors">
                          <Truck className="text-muted-foreground group-hover:text-primary h-4 w-4 transition-colors" />
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </div>
                      <ArrowRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>

                <div className="mt-10 text-center">
                  {emailFromUrl ? (
                    <Link
                      href="/"
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to homepage
                    </Link>
                  ) : (
                    <button
                      onClick={goBack}
                      className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-2 text-sm transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Change email
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === "registration" && (
              <motion.div
                key="registration"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-10">
                  <button
                    onClick={goBack}
                    className="text-muted-foreground hover:text-foreground mb-6 inline-flex cursor-pointer items-center gap-2 text-sm transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Change fleet size
                  </button>

                  <h1 className="mb-2 text-3xl font-semibold tracking-tight text-emerald-600">
                    Great news — you qualify for Raisedash
                  </h1>
                  <p className="text-foreground mb-3 text-lg font-medium">Tell us about yourself</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email - read-only, pre-filled */}
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">Work email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      readOnly
                      className="bg-surface-2 h-11 cursor-not-allowed opacity-70"
                    />
                    <p className="text-muted-foreground text-xs">Email from previous step</p>
                  </div>

                  {/* Fleet size - read-only, pre-filled */}
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">Fleet size</label>
                    <div className="bg-surface-2 border-border text-foreground flex h-11 items-center rounded-xs border px-4 text-sm opacity-70">
                      {fleetSizeOptions.find((o) => o.value === formData.fleetSize)?.label}
                    </div>
                    <p className="text-muted-foreground text-xs">Selected in previous step</p>
                  </div>

                  {/* Name fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-foreground text-sm font-medium">
                        First name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="John"
                        className={`h-11 bg-white ${fieldErrors.firstName ? "border-destructive" : ""}`}
                      />
                      {fieldErrors.firstName && (
                        <p className="text-destructive text-sm">{fieldErrors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-foreground text-sm font-medium">
                        Last name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        placeholder="Smith"
                        className={`h-11 bg-white ${fieldErrors.lastName ? "border-destructive" : ""}`}
                      />
                      {fieldErrors.lastName && (
                        <p className="text-destructive text-sm">{fieldErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">
                      Company <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      placeholder="Acme Logistics"
                      className={`h-11 bg-white ${fieldErrors.company ? "border-destructive" : ""}`}
                    />
                    {fieldErrors.company && (
                      <p className="text-destructive text-sm">{fieldErrors.company}</p>
                    )}
                  </div>

                  {/* Job title */}
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">
                      Job title <span className="text-destructive">*</span>
                    </label>
                    <Input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => handleChange("jobTitle", e.target.value)}
                      placeholder="Fleet Manager"
                      className={`h-11 bg-white ${fieldErrors.jobTitle ? "border-destructive" : ""}`}
                    />
                    {fieldErrors.jobTitle && (
                      <p className="text-destructive text-sm">{fieldErrors.jobTitle}</p>
                    )}
                  </div>

                  {/* Phone - optional */}
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-medium">
                      Phone number{" "}
                      <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="h-11 bg-white"
                    />
                  </div>

                  {submitError && (
                    <p className="text-destructive bg-destructive/10 border-destructive/20 rounded-lg border p-3 text-sm">
                      {submitError}
                    </p>
                  )}

                  <div className="pt-4">
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

                  <p className="text-muted-foreground pt-2 text-center text-xs">
                    By submitting, you agree to our{" "}
                    <Link href="/privacy-policy" className="hover:text-foreground underline">
                      Privacy Policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/terms-of-use" className="hover:text-foreground underline">
                      Terms of Service
                    </Link>
                    .
                  </p>
                </form>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-12 text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950">
                  <Check className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h1 className="text-foreground mb-3 text-3xl font-semibold tracking-tight">
                  Thank you for your interest
                </h1>
                <p className="text-muted-foreground mx-auto mb-8 max-w-md">
                  A member of our team will reach out to{" "}
                  <span className="text-foreground font-medium">{formData.email}</span> within one
                  business day to schedule your personalized demo.
                </p>
                <Link href="/">
                  <Button variant="secondary" size="lg">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to homepage
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
