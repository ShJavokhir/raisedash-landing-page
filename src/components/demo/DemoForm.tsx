import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Briefcase, Building2, Check, ChevronRight, Mail, Phone, Star, Truck, User } from "lucide-react";
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
      <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-8 animate-in fade-in duration-700">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-24 h-24 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center border-4 border-emerald-500/20"
        >
          <Check size={48} strokeWidth={3} />
        </motion.div>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Request received</h2>
          <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
            We’re gearing up your tailored demo. Keep an eye on <span className="font-semibold text-foreground">{formData.email}</span> for
            your scheduling link.
          </p>
        </div>
        <Button
          onClick={resetFlow}
          variant="ghost"
          className="group"
        >
          Start another request
          <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-card border border-border rounded-xl shadow-xl overflow-hidden backdrop-blur-sm relative">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Truck size={100} />
      </div>

      <div className="p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-foreground">Request Demo</h1>
          <p className="text-muted-foreground text-sm">Complete the form to schedule your personalized demo.</p>
        </div>

        <div className="flex items-center justify-between mb-10 relative px-2">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-secondary -z-10" />
          {[0, 1, 2, 3].map((step) => {
            const isActive = step === activeStep;
            const isCompleted = step < activeStep;
            return (
              <motion.button
                key={step}
                onClick={() => isCompleted && setActiveStep(step)}
                disabled={!isCompleted}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 z-10 ${
                  isActive
                    ? "border-primary bg-background text-primary ring-4 ring-primary/10 shadow-lg"
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

        <form onSubmit={handleSubmit} className="space-y-6 relative min-h-[320px]">
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
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
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
                <div className="pt-6 flex justify-end">
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
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
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
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Truck size={16} className="text-primary" /> Fleet capacity
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.values(CompanySize).map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleChange("companySize", size)}
                        className={`px-4 py-3 text-xs font-medium border rounded-lg transition-all text-left relative overflow-hidden ${
                          formData.companySize === size
                            ? "border-primary bg-primary/5 ring-1 ring-primary text-primary"
                            : "border-input hover:border-primary/40 bg-secondary/20"
                        }`}
                      >
                        {formData.companySize === size && <motion.div layoutId="selected-size" className="absolute inset-0 bg-primary/5" />}
                        <span className="relative z-10">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-6 flex justify-between items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveStep(0)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    disabled={!isStep2Valid}
                  >
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
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
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
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
                <div className="pt-6 flex justify-between items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    disabled={!isStep3Valid}
                  >
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
                  <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Phone size={16} className="text-primary" /> Phone number (optional){" "}
                    <span className="text-muted-foreground font-normal ml-auto text-xs opacity-70 flex items-center gap-1">
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
                  <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    {submitError}
                  </p>
                )}
                <div className="pt-8 flex justify-between items-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveStep(2)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-48"
                  >
                    {isSubmitting ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
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

