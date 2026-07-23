import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { DemoFunnel } from "@/components/demo-funnel/DemoFunnel";

export default function DemoPage() {
  return (
    <PageLayout
      title="Book a demo"
      description="Book a demo of Raisedash driver orientation software, or create an account and set up your fleet yourself. See the mobile driver experience, progress tracking, and PDF training report."
      keywords={[
        "book a demo",
        "driver readiness platform",
        "trucking fleet onboarding",
        "driver orientation software",
        "training records for fleets",
      ]}
    >
      <div className="py-12 sm:py-16">
        <Container>
          <div className="mx-auto max-w-xl">
            <div className="mb-8 text-center">
              <h1 className="text-foreground animate-fade-in-up text-3xl leading-tight font-normal tracking-[-0.02em] sm:text-4xl">
                Get started
              </h1>
              <p className="text-muted-foreground animate-fade-in-up mt-3 text-base leading-relaxed delay-75">
                Book a demo, or set up your fleet yourself. Your call.
              </p>
            </div>
            <div className="animate-fade-in-scale delay-150">
              <DemoFunnel />
            </div>
          </div>
        </Container>
      </div>
    </PageLayout>
  );
}
