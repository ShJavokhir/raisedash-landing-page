import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

export default function TermsOfUse() {
  return (
    <PageLayout
      title="Terms of Use"
      description="Read the terms and conditions governing your use of Raisedash freight logistics security services."
      keywords={["raisedash terms", "terms of service", "fleet software terms"]}
    >
      {/* Hero Section */}
      <Container className="flex items-center bg-card mt-12 rounded-xs border border-border">
        <div className="w-full py-16 sm:py-24 md:py-28">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            Terms of Use
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Please read these terms carefully before using our services. By accessing or using Raisedash, 
            you agree to be bound by these terms and conditions.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </Container>

      {/* Terms Content */}
      <Container className="bg-card mt-8 rounded-xs border border-border">
        <div className="py-16">
          <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using Raisedash ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-muted-foreground">
                These Terms of Use ("Terms") govern your use of our website located at raisedash.com (the "Service") operated by Raisedash Inc. ("us", "we", or "our").
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                Raisedash provides freight logistics security and monitoring services through our AI-powered platform. Our services include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Real-time cargo monitoring and tracking</li>
                <li>Security threat detection and alerts</li>
                <li>Risk assessment and analytics</li>
                <li>Incident response and management</li>
                <li>Compliance reporting and documentation</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts and Registration</h2>
              <p className="text-muted-foreground mb-4">
                To access certain features of the Service, you may be required to register for an account. When you register for an account, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Acceptable Use Policy</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit or store malicious code or harmful content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Share your account credentials with others</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data and Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your data, including encryption, access controls, and regular security audits.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property Rights</h2>
              <p className="text-muted-foreground mb-4">
                The Service and its original content, features, and functionality are and will remain the exclusive property of Raisedash Inc. and its licensors. The Service is protected by copyright, trademark, and other laws.
              </p>
              <p className="text-muted-foreground">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our material without our prior written consent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Service Availability</h2>
              <p className="text-muted-foreground mb-4">
                We strive to maintain high service availability, but we do not guarantee that the Service will be available at all times. We may experience downtime for maintenance, updates, or other reasons.
              </p>
              <p className="text-muted-foreground">
                We reserve the right to modify, suspend, or discontinue the Service (or any part thereof) at any time with or without notice.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                In no event shall Raisedash Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
              </p>
              <p className="text-muted-foreground">
                Our total liability to you for all damages shall not exceed the amount you paid us for the Service in the twelve (12) months preceding the claim.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Indemnification</h2>
              <p className="text-muted-foreground">
                You agree to defend, indemnify, and hold harmless Raisedash Inc. and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="text-muted-foreground">
                If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
              <p className="text-muted-foreground">
                These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-muted-foreground">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Use, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-foreground mb-2"><strong>LoadHunter Inc.</strong></p>
                <p className="text-muted-foreground mb-2">Email: legal@raisedash.com</p>
              </div>
            </section>
          </div>
        </div>
      </Container>

    </PageLayout>
  );
}