import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { PrivacyPolicyContent } from "@/components/legal/legal-content";

export default function PrivacyPolicy() {
  return (
    <PageLayout
      title="Privacy Policy"
      description="Learn how Raisedash collects, uses, and protects your information when you use our driver readiness services."
      keywords={["raisedash privacy policy", "data privacy", "fleet software privacy"]}
    >
      {/* Hero Section */}
      <Container className="bg-card border-border mt-12 flex items-center rounded-xs border">
        <div className="w-full py-16 sm:py-24 md:py-28">
          <h1 className="text-foreground text-4xl font-semibold tracking-[-0.01em] md:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mt-4 max-w-3xl text-lg">
            Your privacy is important to us. This Privacy Policy explains how Raisedash collects,
            uses, and protects your information when you use our services.
          </p>
          <p className="text-muted-foreground mt-2 text-sm">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </Container>

      {/* Privacy Content */}
      <Container className="bg-card border-border mt-8 rounded-xs border">
        <div className="py-16">
          <div className="prose prose-slate dark:prose-invert mx-auto max-w-4xl">
            <PrivacyPolicyContent />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
