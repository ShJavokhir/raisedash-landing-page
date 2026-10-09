import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { TermsOfUseContent } from "@/components/legal/legal-content";
import { TERMS_EFFECTIVE_DATE } from "@/components/legal/legal-docs";

export default function TermsOfUse() {
  return (
    <PageLayout
      title="Terms of Use"
      description="The terms that govern your use of Raisedash software, Telegram bots, and related services."
      keywords={["raisedash terms", "terms of service", "fleet software terms"]}
    >
      {/* Hero Section */}
      <Container className="bg-card border-border mt-12 flex items-center rounded-xs border px-5">
        <div className="w-full py-16 sm:py-24 md:py-28">
          <h1 className="text-foreground text-4xl font-semibold tracking-[-0.01em] md:text-5xl">
            Terms of Use
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-lg">
            Please read these terms carefully before using our services. By accessing or using
            Raisedash, you agree to be bound by these terms. They include a binding arbitration
            agreement and class action waiver in Section 22.
          </p>
          <p className="text-muted-foreground mt-2 text-sm">Effective: {TERMS_EFFECTIVE_DATE}</p>
        </div>
      </Container>

      {/* Terms Content */}
      <Container className="bg-card border-border mt-8 rounded-xs border px-5">
        <div className="py-16">
          <div className="prose prose-slate dark:prose-invert mx-auto max-w-4xl">
            <TermsOfUseContent />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
