import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { DemoFunnel } from "@/components/demo-funnel/DemoFunnel";

export default function DemoPage() {
  return (
    <PageLayout
      title="Driver orientation software demo"
      description="Book a demo of Raisedash driver orientation software or set up your fleet. See the mobile driver experience, progress tracking, and PDF reports."
      keywords={[
        "book a demo",
        "driver orientation software",
        "trucking fleet onboarding",
        "driver orientation platform demo",
        "training records for fleets",
      ]}
    >
      <div className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto mb-8 max-w-xl text-center">
            <h1 className="text-foreground animate-fade-in-up text-3xl leading-tight font-normal tracking-[-0.02em] sm:text-4xl">
              Try the driver orientation platform
            </h1>
            <p className="text-muted-foreground animate-fade-in-up mt-3 text-base leading-relaxed delay-75">
              Book a demo or set up your fleet yourself.
            </p>
          </div>
          {/* Width is chosen per-screen inside DemoFunnel: the gate/chooser/form
              stay narrow (max-w-xl); the inline calendar goes wider so cal.com
              renders its side-by-side desktop layout instead of stacking. */}
          <div className="animate-fade-in-scale delay-150">
            <DemoFunnel />
          </div>
        </Container>
      </div>
    </PageLayout>
  );
}
