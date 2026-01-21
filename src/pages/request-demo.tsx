import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { EnterpriseDemoForm } from "@/components/demo/EnterpriseDemoForm";
import { Check } from "lucide-react";

const benefits = [
  {
    title: "Personalized platform walkthrough",
    description: "See Raisedash configured for your specific fleet operations and compliance requirements.",
  },
  {
    title: "ROI and savings analysis",
    description: "Get a custom projection of cost savings and risk reduction based on your fleet size.",
  },
  {
    title: "Implementation roadmap",
    description: "Leave with a clear deployment plan and timeline tailored to your operations.",
  },
];

export default function RequestDemo() {
  return (
    <PageLayout
      title="Request a Demo"
      description="Schedule a personalized demo of Raisedash fleet safety solutions. See how our DVIR, driver training, and compliance tools can transform your fleet operations."
      keywords={["raisedash demo", "fleet software demo", "DVIR demo", "fleet management demo"]}
    >
      {/* Hero Section */}
      <section className="bg-background py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Value Proposition */}
            <div className="space-y-10 lg:pr-8">
              <div className="space-y-6">
                <h1 className="text-[40px] md:text-[52px] font-normal tracking-[-0.03em] text-foreground leading-[1.1]">
                  See what Raisedash can do for your fleet
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Meet one-on-one with a fleet safety expert to explore how Raisedash helps you
                  reduce risk, streamline compliance, and protect your drivers.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-5">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="font-normal text-foreground mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:sticky lg:top-8">
              <EnterpriseDemoForm />
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="bg-background py-20 border-t border-border">
        <Container>
          <h2 className="text-2xl font-normal text-foreground text-center mb-12">
            Frequently asked questions
          </h2>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-xs border border-border p-6">
              <h3 className="font-normal text-foreground mb-2">
                How long is the demo?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Most demos run 30-45 minutes, but we&apos;ll adjust based on your needs.
                We focus on the features most relevant to your fleet operations.
              </p>
            </div>

            <div className="bg-white rounded-xs border border-border p-6">
              <h3 className="font-normal text-foreground mb-2">
                Do I need to prepare anything?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No preparation required. However, having your current fleet size and
                primary compliance challenges in mind helps us tailor the demo to your needs.
              </p>
            </div>

            <div className="bg-white rounded-xs border border-border p-6">
              <h3 className="font-normal text-foreground mb-2">
                What happens after the demo?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We&apos;ll provide a custom proposal including pricing, implementation timeline,
                and ROI projections based on your specific requirements—no pressure, no commitment.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
