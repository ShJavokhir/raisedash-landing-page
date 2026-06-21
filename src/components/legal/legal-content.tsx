/**
 * Single source of truth for the legal copy, so the full pages
 * (/privacy-policy, /terms-of-use) and the lightweight in-funnel bottom sheet
 * (/start) can never drift apart. These render ONLY the prose sections — the page
 * chrome (PageLayout, hero, Container, the `prose` wrapper) and the sheet supply
 * their own framing. See components/start/legal-sheet.tsx for the funnel use.
 *
 * This module is intentionally heavy (all the prose) and is only ever reached from
 * the funnel via `dynamic()` — the title/type metadata lives in legal-docs.ts so a
 * static import there never pulls this copy into the funnel's first-load bundle.
 */
import type { LegalDoc } from "@/components/legal/legal-docs";

/** Pick the right document — used by the lazily-loaded sheet. */
export function LegalContent({ doc }: { doc: LegalDoc }) {
  return doc === "privacy" ? <PrivacyPolicyContent /> : <TermsOfUseContent />;
}

export function PrivacyPolicyContent() {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">1. Information We Collect</h2>
        <p className="text-muted-foreground mb-4">
          We collect information you provide directly to us, such as when you create an account, use
          our services, or contact us for support.
        </p>

        <h3 className="text-foreground mt-6 mb-3 text-xl font-semibold">Personal Information</h3>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Name and contact information (email, phone number, address)</li>
          <li>Company information and job title</li>
          <li>Account credentials and preferences</li>
          <li>Payment and billing information</li>
          <li>Communication records and support interactions</li>
        </ul>

        <h3 className="text-foreground mt-6 mb-3 text-xl font-semibold">Usage Information</h3>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Log data (IP address, browser type, access times)</li>
          <li>Device information and operating system</li>
          <li>Service usage patterns and preferences</li>
          <li>Security and monitoring data</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          2. How We Use Your Information
        </h2>
        <p className="text-muted-foreground mb-4">
          We use the information we collect to provide, maintain, and improve our services:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Deliver and maintain our security monitoring services</li>
          <li>Process transactions and manage your account</li>
          <li>Provide customer support and respond to inquiries</li>
          <li>Send important service updates and notifications</li>
          <li>Improve our services and develop new features</li>
          <li>Ensure security and prevent fraud</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          3. Information Sharing and Disclosure
        </h2>
        <p className="text-muted-foreground mb-4">
          We do not sell, trade, or otherwise transfer your personal information to third parties
          except in the following circumstances:
        </p>

        <h3 className="text-foreground mt-6 mb-3 text-xl font-semibold">Service Providers</h3>
        <p className="text-muted-foreground mb-4">
          We may share information with trusted third-party service providers who assist us in
          operating our platform, conducting business, or serving our users. These parties agree to
          keep your information confidential.
        </p>

        <h3 className="text-foreground mt-6 mb-3 text-xl font-semibold">Legal Requirements</h3>
        <p className="text-muted-foreground mb-4">
          We may disclose your information if required to do so by law or in response to valid
          requests by public authorities.
        </p>

        <h3 className="text-foreground mt-6 mb-3 text-xl font-semibold">Business Transfers</h3>
        <p className="text-muted-foreground">
          In the event of a merger, acquisition, or sale of assets, your information may be
          transferred as part of that transaction.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">4. Data Security</h2>
        <p className="text-muted-foreground mb-4">
          We implement appropriate technical and organizational security measures to protect your
          personal information against unauthorized access, alteration, disclosure, or destruction.
          Our security measures include:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>End-to-end encryption for data transmission</li>
          <li>Secure data storage with access controls</li>
          <li>Regular security audits and assessments</li>
          <li>Employee training on data protection</li>
          <li>Incident response and breach notification procedures</li>
          <li>Compliance with industry security standards</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">5. Data Retention</h2>
        <p className="text-muted-foreground mb-4">
          We retain your personal information for as long as necessary to provide our services and
          fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is
          required or permitted by law.
        </p>
        <p className="text-muted-foreground">
          When we no longer need your personal information, we will securely delete or anonymize it
          in accordance with our data retention policies.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">6. Your Rights and Choices</h2>
        <p className="text-muted-foreground mb-4">
          Depending on your location, you may have certain rights regarding your personal
          information:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>
            <strong>Access:</strong> Request access to your personal information
          </li>
          <li>
            <strong>Correction:</strong> Request correction of inaccurate information
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your personal information
          </li>
          <li>
            <strong>Portability:</strong> Request a copy of your data in a portable format
          </li>
          <li>
            <strong>Restriction:</strong> Request restriction of processing
          </li>
          <li>
            <strong>Objection:</strong> Object to certain types of processing
          </li>
          <li>
            <strong>Withdrawal:</strong> Withdraw consent where applicable
          </li>
        </ul>
        <p className="text-muted-foreground mt-4">
          To exercise these rights, please contact us using the information provided in the Contact
          section below.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          7. Cookies and Tracking Technologies
        </h2>
        <p className="text-muted-foreground mb-4">
          We use cookies and similar tracking technologies to enhance your experience on our
          platform. These technologies help us:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Remember your preferences and settings</li>
          <li>Analyze how you use our services</li>
          <li>Improve our platform performance</li>
          <li>Provide personalized content and features</li>
          <li>Ensure security and prevent fraud</li>
        </ul>
        <p className="text-muted-foreground mt-4">
          You can control cookie settings through your browser preferences, but disabling cookies
          may affect the functionality of our services.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          8. International Data Transfers
        </h2>
        <p className="text-muted-foreground mb-4">
          Your information may be transferred to and processed in countries other than your country
          of residence. We ensure that such transfers comply with applicable data protection laws
          and implement appropriate safeguards.
        </p>
        <p className="text-muted-foreground">
          When we transfer personal information from the European Economic Area (EEA) to other
          countries, we use standard contractual clauses and other appropriate safeguards to ensure
          adequate protection.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">9. Children's Privacy</h2>
        <p className="text-muted-foreground">
          Our services are not intended for children under 13 years of age. We do not knowingly
          collect personal information from children under 13. If we become aware that we have
          collected personal information from a child under 13, we will take steps to delete such
          information.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          10. Changes to This Privacy Policy
        </h2>
        <p className="text-muted-foreground mb-4">
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
        <p className="text-muted-foreground">
          We encourage you to review this Privacy Policy periodically for any changes. Changes to
          this Privacy Policy are effective when they are posted on this page.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          11. Compliance and Regulations
        </h2>
        <p className="text-muted-foreground mb-4">
          We comply with applicable data protection laws and regulations, including:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>General Data Protection Regulation (GDPR)</li>
          <li>California Consumer Privacy Act (CCPA)</li>
          <li>Other applicable regional and national privacy laws</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">12. Contact Us</h2>
        <p className="text-muted-foreground mb-4">
          If you have any questions about this Privacy Policy or our data practices, please contact
          us:
        </p>
        <div className="bg-muted rounded-lg p-6">
          <p className="text-foreground mb-2">
            <strong>LoadHunter Inc.</strong>
          </p>
          <p className="text-muted-foreground mb-2">Privacy Officer: legal@raisedash.com</p>
          <p className="text-muted-foreground mb-2">General Inquiries: support@raisedash.com</p>
          <p className="text-muted-foreground">Address: 415 Mission St, San Francisco, CA 94105</p>
        </div>
        <p className="text-muted-foreground mt-4">
          For EU residents, you also have the right to lodge a complaint with your local data
          protection authority if you believe we have not handled your personal information in
          accordance with applicable law.
        </p>
      </section>
    </>
  );
}

export function TermsOfUseContent() {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground mb-4">
          By accessing and using Raisedash ("the Service"), you accept and agree to be bound by the
          terms and provision of this agreement. If you do not agree to abide by the above, please
          do not use this service.
        </p>
        <p className="text-muted-foreground">
          These Terms of Use ("Terms") govern your use of our website located at raisedash.com (the
          "Service") operated by LoadHunter Inc., doing business as Raisedash ("us", "we", or
          "our").
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">2. Description of Service</h2>
        <p className="text-muted-foreground mb-4">
          Raisedash provides freight logistics security and monitoring services through our
          AI-powered platform. Our services include:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Real-time cargo monitoring and tracking</li>
          <li>Security threat detection and alerts</li>
          <li>Risk assessment and analytics</li>
          <li>Incident response and management</li>
          <li>Compliance reporting and documentation</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          3. User Accounts and Registration
        </h2>
        <p className="text-muted-foreground mb-4">
          To access certain features of the Service, you may be required to register for an account.
          When you register for an account, you agree to:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain and update your account information</li>
          <li>Maintain the security of your password and account</li>
          <li>Accept responsibility for all activities under your account</li>
          <li>Notify us immediately of any unauthorized use</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">4. Acceptable Use Policy</h2>
        <p className="text-muted-foreground mb-4">You agree not to use the Service to:</p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Violate any applicable laws or regulations</li>
          <li>Transmit or store malicious code or harmful content</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Interfere with or disrupt the Service</li>
          <li>Use the Service for any illegal or unauthorized purpose</li>
          <li>Share your account credentials with others</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">5. Data and Privacy</h2>
        <p className="text-muted-foreground mb-4">
          Your privacy is important to us. Our Privacy Policy explains how we collect, use, and
          protect your information when you use our Service. By using our Service, you agree to the
          collection and use of information in accordance with our Privacy Policy.
        </p>
        <p className="text-muted-foreground">
          We implement industry-standard security measures to protect your data, including
          encryption, access controls, and regular security audits.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          6. Intellectual Property Rights
        </h2>
        <p className="text-muted-foreground mb-4">
          The Service and its original content, features, and functionality are and will remain the
          exclusive property of LoadHunter Inc. and its licensors. The Service is protected by
          copyright, trademark, and other laws.
        </p>
        <p className="text-muted-foreground">
          You may not reproduce, distribute, modify, create derivative works of, publicly display,
          publicly perform, republish, download, store, or transmit any of our material without our
          prior written consent.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">7. Service Availability</h2>
        <p className="text-muted-foreground mb-4">
          We strive to maintain high service availability, but we do not guarantee that the Service
          will be available at all times. We may experience downtime for maintenance, updates, or
          other reasons.
        </p>
        <p className="text-muted-foreground">
          We reserve the right to modify, suspend, or discontinue the Service (or any part thereof)
          at any time with or without notice.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">8. Limitation of Liability</h2>
        <p className="text-muted-foreground mb-4">
          In no event shall LoadHunter Inc., nor its directors, employees, partners, agents,
          suppliers, or affiliates, be liable for any indirect, incidental, special, consequential,
          or punitive damages, including without limitation, loss of profits, data, use, goodwill,
          or other intangible losses, resulting from your use of the Service.
        </p>
        <p className="text-muted-foreground">
          Our total liability to you for all damages shall not exceed the amount you paid us for the
          Service in the twelve (12) months preceding the claim.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">9. Indemnification</h2>
        <p className="text-muted-foreground">
          You agree to defend, indemnify, and hold harmless LoadHunter Inc. and its licensee and
          licensors, and their employees, contractors, agents, officers and directors, from and
          against any and all claims, damages, obligations, losses, liabilities, costs or debt, and
          expenses (including but not limited to attorney's fees).
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">10. Termination</h2>
        <p className="text-muted-foreground mb-4">
          We may terminate or suspend your account and bar access to the Service immediately,
          without prior notice or liability, under our sole discretion, for any reason whatsoever
          and without limitation, including but not limited to a breach of the Terms.
        </p>
        <p className="text-muted-foreground">
          If you wish to terminate your account, you may simply discontinue using the Service or
          contact us to request account deletion.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">11. Governing Law</h2>
        <p className="text-muted-foreground">
          These Terms shall be interpreted and governed by the laws of the State of California,
          United States, without regard to its conflict of law provisions. Our failure to enforce
          any right or provision of these Terms will not be considered a waiver of those rights.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">12. Changes to Terms</h2>
        <p className="text-muted-foreground mb-4">
          We reserve the right, at our sole discretion, to modify or replace these Terms at any
          time. If a revision is material, we will provide at least 30 days notice prior to any new
          terms taking effect.
        </p>
        <p className="text-muted-foreground">
          By continuing to access or use our Service after those revisions become effective, you
          agree to be bound by the revised terms.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">13. Contact Information</h2>
        <p className="text-muted-foreground mb-4">
          If you have any questions about these Terms of Use, please contact us:
        </p>
        <div className="bg-muted rounded-lg p-6">
          <p className="text-foreground mb-2">
            <strong>LoadHunter Inc.</strong>
          </p>
          <p className="text-muted-foreground mb-2">Email: legal@raisedash.com</p>
        </div>
      </section>
    </>
  );
}
