import { Geist, Geist_Mono } from "next/font/google";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function PrivacyPolicy() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      {/* Hero Section */}
      <Container 
        className="flex items-center bg-white dark:bg-card mt-12 rounded-md border"
        // style={{
        //   backgroundColor: '#ffffff',
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23efefef' fill-opacity='0.16' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        // }}
      >
        <div className="w-full py-16 sm:py-24 md:py-28">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Your privacy is important to us. This Privacy Policy explains how Raisedash collects, 
            uses, and protects your information when you use our services.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </Container>

      {/* Privacy Content */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-16">
          <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Personal Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Name and contact information (email, phone number, address)</li>
                <li>Company information and job title</li>
                <li>Account credentials and preferences</li>
                <li>Payment and billing information</li>
                <li>Communication records and support interactions</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Usage Information</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Log data (IP address, browser type, access times)</li>
                <li>Device information and operating system</li>
                <li>Service usage patterns and preferences</li>
                <li>Security and monitoring data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to provide, maintain, and improve our services:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
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
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Service Providers</h3>
              <p className="text-muted-foreground mb-4">
                We may share information with trusted third-party service providers who assist us in operating our platform, conducting business, or serving our users. These parties agree to keep your information confidential.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Legal Requirements</h3>
              <p className="text-muted-foreground mb-4">
                We may disclose your information if required to do so by law or in response to valid requests by public authorities.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Business Transfers</h3>
              <p className="text-muted-foreground">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>End-to-end encryption for data transmission</li>
                <li>Secure data storage with access controls</li>
                <li>Regular security audits and assessments</li>
                <li>Employee training on data protection</li>
                <li>Incident response and breach notification procedures</li>
                <li>Compliance with industry security standards</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
              <p className="text-muted-foreground">
                When we no longer need your personal information, we will securely delete or anonymize it in accordance with our data retention policies.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights and Choices</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
                <li><strong>Withdrawal:</strong> Withdraw consent where applicable</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise these rights, please contact us using the information provided in the Contact section below.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our platform. These technologies help us:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze how you use our services</li>
                <li>Improve our platform performance</li>
                <li>Provide personalized content and features</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can control cookie settings through your browser preferences, but disabling cookies may affect the functionality of our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. International Data Transfers</h2>
              <p className="text-muted-foreground mb-4">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards.
              </p>
              <p className="text-muted-foreground">
                When we transfer personal information from the European Economic Area (EEA) to other countries, we use standard contractual clauses and other appropriate safeguards to ensure adequate protection.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-muted-foreground">
                We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Compliance and Regulations</h2>
              <p className="text-muted-foreground mb-4">
                We comply with applicable data protection laws and regulations, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>General Data Protection Regulation (GDPR)</li>
                <li>California Consumer Privacy Act (CCPA)</li>
                <li>Health Insurance Portability and Accountability Act (HIPAA)</li>
                <li>Other applicable regional and national privacy laws</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-foreground mb-2"><strong>Raisedash Inc.</strong></p>
                <p className="text-muted-foreground mb-2">Privacy Officer: legal@raisedash.com</p>
                <p className="text-muted-foreground mb-2">General Inquiries: support@raisedash.com</p>
                <p className="text-muted-foreground mb-2">Phone: +1 (555) 123-4567</p>
                <p className="text-muted-foreground">Address: 123 Security Drive, San Francisco, CA 94105</p>
              </div>
              <p className="text-muted-foreground mt-4">
                For EU residents, you also have the right to lodge a complaint with your local data protection authority if you believe we have not handled your personal information in accordance with applicable law.
              </p>
            </section>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
