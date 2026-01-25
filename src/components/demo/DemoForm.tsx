import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronRight,
  Mail,
  Phone,
  Star,
  Truck,
  User,
} from "lucide-react";
import { CompanySize, DemoFormData, DemoFormField } from "./types";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface DemoFormProps {
  formData: DemoFormData;
  setFormData: React.Dispatch<React.SetStateAction<DemoFormData>>;
  onSubmit: () => Promise<void>;
  onInteract: () => void;
  onReset: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  submitError?: string | null;
}

export function DemoForm({
  formData,
  setFormData,
  onSubmit,
  onInteract,
  onReset,
  isSubmitting,
  isSuccess,
  submitError,
}: DemoFormProps) {
  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (field: DemoFormField, value: string) => {
    if (!value && field === "phone") {
      setFormData((prev) => ({ ...prev, [field]: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    onInteract();
  };

  const isStep1Valid = formData.email.includes("@");
  const isStep2Valid = formData.companyName.trim().length > 2 && formData.companySize !== "";
  const isStep3Valid = formData.fullName.trim().length > 2 && formData.role.trim().length > 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit();
  };

  const resetFlow = () => {
    setActiveStep(0);
    onReset();
  };

  if (isSuccess) {
    return (
      <div className="animate-in fade-in flex h-full flex-col items-center justify-center space-y-8 p-8 text-center duration-700">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
        >
          <Check size={48} strokeWidth={3} />
        </motion.div>
        <div className="space-y-3">
          <h2 className="text-foreground text-3xl font-bold tracking-tight">Request received</h2>
          <p className="text-muted-foreground mx-auto max-w-sm leading-relaxed">
            We’re gearing up your tailored demo. Keep an eye on{" "}
            <span className="text-foreground font-semibold">{formData.email}</span> for your
            scheduling link.
          </p>
        </div>
        <Button onClick={resetFlow} variant="ghost" className="group">
          Start another request
          <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border-border relative mx-auto w-full max-w-xl overflow-hidden rounded-xl border shadow-xl backdrop-blur-sm">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Truck size={100} />
      </div>

      <div className="p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-2xl font-bold tracking-tight md:text-3xl">
            See a demo
          </h1>
          <p className="text-muted-foreground text-sm">
            Complete the form to schedule your personalized demo.
          </p>
        </div>

        <div className="relative mb-10 flex items-center justify-between px-2">
          <div className="bg-secondary absolute top-1/2 left-0 -z-10 h-0.5 w-full" />
          {[0, 1, 2, 3].map((step) => {
            const isActive = step === activeStep;
            const isCompleted = step < activeStep;
            return (
              <motion.button
                key={step}
                onClick={() => isCompleted && setActiveStep(step)}
                disabled={!isCompleted}
                className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "border-primary bg-background text-primary ring-primary/10 shadow-lg ring-4"
                    : isCompleted
                      ? "border-primary bg-primary text-primary-foreground cursor-pointer"
                      : "border-muted bg-secondary text-muted-foreground"
                }`}
                initial={false}
                animate={{ scale: isActive ? 1.1 : 1 }}
              >
                {isCompleted ? <Check size={16} /> : step + 1}
              </motion.button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="relative min-h-[320px] space-y-6">
          <AnimatePresence mode="wait" initial={false}>
            {activeStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
                    <Mail size={16} className="text-primary" /> Work email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onFocus={onInteract}
                    placeholder="dispatcher@company.com"
                  />
                </div>
                <div className="flex justify-end pt-6">
                  <Button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    disabled={!isStep1Valid}
                    className="w-auto"
                  >
                    Continue <ChevronRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
                    <Building2 size={16} className="text-primary" /> Company name
                  </label>
                  <Input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleChange("companyName", e.target.value)}
                    onFocus={onInteract}
                    placeholder="Raisedash Logistics"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
                    <Truck size={16} className="text-primary" /> Fleet capacity
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.values(CompanySize).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleChange("companySize", size)}
                        className={`relative overflow-hidden rounded-lg border px-4 py-3 text-left text-xs font-medium transition-all ${
                          formData.companySize === size
                            ? "border-primary bg-primary/5 ring-primary text-primary ring-1"
                            : "border-input hover:border-primary/40 bg-secondary/20"
                        }`}
                      >
                        {formData.companySize === size && (
                          <motion.div
                            layoutId="selected-size"
                            className="bg-primary/5 absolute inset-0"
                          />
                        )}
                        <span className="relative z-10">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6">
                  <Button type="button" variant="ghost" onClick={() => setActiveStep(0)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveStep(2)} disabled={!isStep2Valid}>
                    Continue <ChevronRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
                      <User size={16} className="text-primary" /> Full name
                    </label>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      onFocus={onInteract}
                      placeholder="Alex Morgan"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
                      <Briefcase size={16} className="text-primary" /> Job title
                    </label>
                    <Input
                      type="text"
                      value={formData.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      onFocus={onInteract}
                      placeholder="Director of operations"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6">
                  <Button type="button" variant="ghost" onClick={() => setActiveStep(1)}>
                    Back
                  </Button>
                  <Button type="button" onClick={() => setActiveStep(3)} disabled={!isStep3Valid}>
                    Continue <ChevronRight size={16} className="ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
                    <Phone size={16} className="text-primary" /> Phone number (optional){" "}
                    <span className="text-muted-foreground ml-auto flex items-center gap-1 text-xs font-normal opacity-70">
                      <Star size={10} fill="currentColor" /> Bonus
                    </span>
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onFocus={onInteract}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                {submitError && (
                  <p className="text-destructive bg-destructive/10 border-destructive/20 rounded-lg border p-3 text-sm">
                    {submitError}
                  </p>
                )}
                <div className="flex items-center justify-between pt-8">
                  <Button type="button" variant="ghost" onClick={() => setActiveStep(2)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="w-48">
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <Truck size={20} />
                      </motion.div>
                    ) : (
                      "Launch demo"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}

export default DemoForm;
