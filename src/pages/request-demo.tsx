import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { DemoForm } from "@/components/demo/DemoForm";
import { TruckVisual } from "@/components/demo/TruckVisual";
import { DemoFormData, FieldsCompleted } from "@/components/demo/types";

const initialFormData: DemoFormData = {
  email: "",
  companyName: "",
  companySize: "",
  fullName: "",
  role: "",
  phone: "",
};

const benefits = [
  { title: "Live walkthroughs", description: "See Raisedash against your real routes and freight risk." },
  { title: "Security experts on call", description: "Ask our specialists about compliance, ops, and data flow." },
  { title: "Fast rollout plan", description: "Leave with an implementation path tailored to your fleet." },
];

export default function RequestDemo() {
  const [formData, setFormData] = useState<DemoFormData>(initialFormData);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fieldsCompleted: FieldsCompleted = useMemo(
    () => ({
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      companyName: formData.companyName.trim().length > 2,
      companySize: formData.companySize !== "",
      fullName: formData.fullName.trim().length > 2,
      role: formData.role.trim().length > 2,
      phone: formData.phone.replace(/\D/g, "").length >= 10,
    }),
    [formData]
  );

  const handleSubmit = async () => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string; missingFields?: string[] } | null;
        const missing = data?.missingFields?.length ? `Missing: ${data.missingFields.join(", ")}` : "";
        throw new Error(data?.error || missing || "Unable to submit right now. Please retry.");
      }

      setIsSuccess(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit right now. Please retry.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...initialFormData });
    setHasInteracted(false);
    setIsSubmitting(false);
    setIsSuccess(false);
    setSubmitError(null);
  };

  const showInteractive = hasInteracted || isSuccess;

  return (
    <PageLayout
      title="Request Demo"
      description="Build your Raisedash demo request and watch the experience respond as you complete the manifest."
    >
      <Container className="bg-white dark:bg-card mt-18 rounded-md border ui-corner-accents relative overflow-hidden">
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start relative">
            <AnimatePresence>
              {!showInteractive && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6 lg:pr-6"
                >
                  <div className="space-y-4">
                    <h2 className="text-3xl font-semibold text-foreground">Request your demo</h2>
                    <p className="text-muted-foreground">
                      Start with your work email. As soon as you type, the form moves into focus and the live fleet visual spins up on the
                      right to mirror your progress.
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
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className={`${showInteractive ? "order-1" : "order-2"} w-full`}
            >
              <DemoForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onInteract={() => setHasInteracted(true)}
                onReset={handleReset}
                isSubmitting={isSubmitting}
                isSuccess={isSuccess}
                submitError={submitError}
              />
            </motion.div>

            <AnimatePresence>
              {showInteractive && (
                <motion.div
                  key="visual"
                  layout
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                  className="order-2 w-full"
                >
                  <TruckVisual formData={formData} fieldsCompleted={fieldsCompleted} isSubmitting={isSubmitting} isSuccess={isSuccess} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
