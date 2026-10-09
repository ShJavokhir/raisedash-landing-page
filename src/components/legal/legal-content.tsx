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
import type { ReactNode } from "react";
import { TERMS_EFFECTIVE_DATE, type LegalDoc } from "@/components/legal/legal-docs";

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
          <li>Learner profile information provided by a fleet or learner</li>
          <li>Training assignments, progress, completion dates, quiz attempts, and scores</li>
          <li>Training activity, certificates, and identity-verification information</li>
          <li>
            Messages, photos, videos, documents, and location shared with our Telegram bots or in
            chats where a Raisedash bot has been added, along with Telegram names and user IDs
          </li>
          <li>Inspection reports, receipts, and other records submitted through our services</li>
        </ul>

        <h3 className="text-foreground mt-6 mb-3 text-xl font-semibold">Usage Information</h3>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Log data (IP address, browser type, access times)</li>
          <li>Device information and operating system</li>
          <li>Service usage patterns and preferences</li>
          <li>Security and monitoring data</li>
          <li>
            Records of your acceptance of our Terms of Use, including the time, IP address, and
            browser
          </li>
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
          <li>Deliver and maintain our driver training and recordkeeping services</li>
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
          These measures may include:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Encryption for data transmission</li>
          <li>Secure data storage with access controls</li>
          <li>Incident response and breach notification procedures</li>
          <li>Administrative and technical controls appropriate to the service</li>
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
          7. Cookies, Analytics, and Session Recordings
        </h2>
        <p className="text-muted-foreground mb-4">
          We use cookies and similar technologies, such as your browser&apos;s local storage, to
          keep our website working, understand how visitors use it, and measure our advertising.
          These technologies help us:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>Remember your preferences and settings</li>
          <li>Analyze how you use our services</li>
          <li>Improve our platform performance</li>
          <li>Provide personalized content and features</li>
          <li>Ensure security and prevent fraud</li>
        </ul>

        <h3 className="text-foreground mt-6 mb-3 text-xl font-semibold">
          Website Analytics and Session Recordings
        </h3>
        <p className="text-muted-foreground mb-4">
          On raisedash.com we use PostHog, a product analytics service, to learn which pages are
          useful and where people get stuck. When you visit our website, it collects:
        </p>
        <ul className="text-muted-foreground ml-4 list-inside list-disc space-y-2">
          <li>
            The pages you view, the links and buttons you click, how far you scroll, and how long
            you stay
          </li>
          <li>
            Your browser, device type, the website or ad that brought you here, and an approximate
            location (city and country) based on your IP address
          </li>
          <li>Errors and page loading times</li>
          <li>
            <strong>Session recordings:</strong> a replay of your visit that shows how the page
            looked to you and how you moved, clicked, and scrolled through it
          </li>
        </ul>
        <p className="text-muted-foreground mt-4">
          Session recordings hide everything you type into form fields, so we can&apos;t see what
          you entered in them. If you give us your email address through one of our forms, for
          example to book a demo, we connect your visits and recordings to that email address so we
          understand what you were looking for when we follow up. PostHog processes this information
          for us in the United States. You can ask us to delete the analytics data connected to your
          email address by contacting us.
        </p>

        <h3 className="text-foreground mt-6 mb-3 text-xl font-semibold">Advertising</h3>
        <p className="text-muted-foreground">
          We use the Meta Pixel and Meta Conversions API to measure how our Facebook and Instagram
          ads perform. When you submit one of our forms, we send Meta a hashed (one-way scrambled)
          version of the contact details you entered, along with your IP address and browser, so
          Meta can tell whether the visit came from one of our ads. Meta&apos;s use of this
          information is covered by Meta&apos;s own privacy policy.
        </p>

        <p className="text-muted-foreground mt-4">
          You can block or delete cookies and site data in your browser settings, but doing so may
          affect how parts of our services work.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-foreground mb-4 text-2xl font-semibold">
          8. International Data Transfers
        </h2>
        <p className="text-muted-foreground mb-4">
          Your information may be transferred to and processed in countries other than your country
          of residence, including the United States, where we and our service providers operate.
          Where the law requires a transfer mechanism, we rely on appropriate safeguards such as
          standard contractual clauses.
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
          posting the new Privacy Policy on this page and updating the effective date.
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
          We aim to handle personal information in line with the data protection laws that apply to
          us, which may include:
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
          <p className="text-muted-foreground">
            Address: 2810 N Church St PMB 388779, Wilmington, DE 19802
          </p>
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

/*
 * Terms of Use. B2B terms covering every Raisedash product except the Academy, which has its
 * own terms on academy.raisedash.com. Bump TERMS_EFFECTIVE_DATE in legal-docs.ts on any change.
 */
export function TermsOfUseContent() {
  return (
    <>
      <TermsSection title="Summary of Key Terms">
        <TermsP>
          Effective {TERMS_EFFECTIVE_DATE}. This summary is for convenience only. The full Terms
          below control. Please read them, and in particular:
        </TermsP>
        <TermsList>
          <li>
            Raisedash is a software and recordkeeping tool.{" "}
            <strong>
              You, not Raisedash, are responsible for vehicle safety, inspections, driver
              qualification, and compliance with DOT, FMCSA, and all other laws
            </strong>{" "}
            (Section 6).
          </li>
          <li>
            You must give your drivers and other users any notices and get any consents the law
            requires before you add them to the Services (Section 7).
          </li>
          <li>
            You authorize us to charge your payment method for the fees you agree to. Fees are
            non-refundable, and we may change them with at least 30 days&apos; notice (Section 12).
          </li>
          <li>
            The Services are provided “as is,” and our total liability is limited (Sections 17 and
            18).
          </li>
          <li>
            <strong>
              Disputes are resolved by binding individual arbitration, not in court, and you waive
              any right to a jury trial or to take part in a class action
            </strong>{" "}
            (Section 22).
          </li>
        </TermsList>
      </TermsSection>

      <TermsSection title="1. Agreement and Acceptance">
        <TermsP>
          These Terms of Use (the “Terms”) are a legally binding agreement between LoadHunter Inc.,
          a Delaware corporation doing business as Raisedash (“Raisedash,” “we,” “us,” or “our”),
          and the company, organization, or other entity that accesses or uses the Services
          (“Customer” or “you”).
        </TermsP>
        <TermsP>
          You accept these Terms, and they become binding on you, when you do any of the following,
          whichever happens first: (a) click or check a box, or click a button, indicating
          acceptance; (b) create an account; (c) add any Raisedash bot to a chat, group, or channel,
          or send it a command; (d) sign or accept an Order; (e) pay any Fee or invoice; or (f)
          otherwise access or use any of the Services. If you do not agree to these Terms, do not
          access or use the Services.
        </TermsP>
        <TermsP>
          If you accept these Terms on behalf of a company or other entity, you represent and
          warrant that you have the authority to bind that entity, and “Customer” and “you” refer to
          that entity. If you do not have that authority, or the entity does not exist, you
          personally accept these Terms and are personally responsible for complying with them.
        </TermsP>
        <TermsP>
          The Services are offered only to businesses, for business purposes. They are not offered
          to consumers for personal, family, or household use. You must be at least 18 years old and
          able to form a binding contract to accept these Terms.
        </TermsP>
      </TermsSection>

      <TermsSection title="2. Definitions">
        <TermsList>
          <li>
            <strong>“Services”</strong> means all products and services that Raisedash provides,
            including the Raisedash web dashboard, the driver and learner portal, the Raisedash
            Training Platform (also called the Driver Orientation Platform), our Telegram bots and
            other messaging integrations (including the PTI &amp; DVIR Collector, Receipts
            Collector, Driver Feedback Collector, Driver Announcements, Samsara to Telegram, and
            RingCentral to Telegram), driver paperwork and coaching tools, ELP practice tools,
            Raisedash Shield, AI Features, APIs, websites, mobile and web applications, templates,
            content, documentation, and any related setup, onboarding, support, hosting,
            maintenance, or custom development services, as each may be updated over time. Raisedash
            Academy (academy.raisedash.com) is governed by its own terms and not by these Terms.
          </li>
          <li>
            <strong>“Order”</strong> means any quote, order form, statement of work, invoice,
            checkout page, or written communication (including email) from Raisedash that states the
            Services you receive and the Fees for them.
          </li>
          <li>
            <strong>“Fees”</strong> means all amounts payable for the Services, as stated in an
            Order or otherwise communicated to you in writing or in the Services.
          </li>
          <li>
            <strong>“Authorized Users”</strong> means anyone who accesses or uses the Services
            through your account or your chats and groups, or whom you invite, add, or enroll,
            including your administrators, employees, contractors, drivers, owner-operators,
            learners, and members of any chat or group in which a Raisedash bot is present.
          </li>
          <li>
            <strong>“Customer Data”</strong> means all data, content, and materials that you or your
            Authorized Users submit to the Services, including messages, photos, videos, audio,
            documents, inspection records, receipts, location data, and personal information.
          </li>
          <li>
            <strong>“Third-Party Services”</strong> means products, platforms, networks, and
            services not provided by Raisedash, including Telegram, Samsara, RingCentral, Stripe,
            Google, Meta, Amazon Web Services, telecommunications carriers, and AI model providers.
          </li>
          <li>
            <strong>“Raisedash Parties”</strong> means Raisedash, its affiliates, and its and their
            officers, directors, shareholders, employees, contractors, agents, licensors, service
            providers, successors, and assigns.
          </li>
        </TermsList>
      </TermsSection>

      <TermsSection title="3. Orders and Order of Precedence">
        <TermsP>
          Each Order is part of these Terms. If an Order conflicts with these Terms, the Order
          controls only for the Services, quantities, Fees, and billing period it states, and these
          Terms control for everything else. A separate written agreement signed by an authorized
          officer of Raisedash controls over both, but only to the extent it expressly says it
          overrides these Terms. Any terms in your purchase order, vendor portal, or other document
          that add to or differ from these Terms are rejected and have no effect, even if we accept
          or sign that document.
        </TermsP>
      </TermsSection>

      <TermsSection title="4. The Services">
        <TermsP>
          Subject to these Terms and your payment of all Fees, we grant you a limited,
          non-exclusive, non-transferable, non-sublicensable, revocable right to access and use the
          Services during your subscription or other permitted term, solely for your internal
          business operations.
        </TermsP>
        <TermsP>
          We continually change and improve the Services. We may add, change, limit, or remove any
          feature, content, integration, or Service at any time, and we may set or change usage
          limits. We do not commit to any uptime, response time, or service level unless an Order or
          signed agreement expressly says so.
        </TermsP>
        <TermsP>
          Features we offer for free, as a trial, as a pilot, or labeled as beta, preview, early
          access, or similar are provided “as is” without any warranty, support, or liability of any
          kind, and we may change or end them at any time without notice.
        </TermsP>
      </TermsSection>

      <TermsSection title="5. Accounts and Authorized Users">
        <TermsP>You agree to:</TermsP>
        <TermsList>
          <li>Provide accurate, current, and complete information and keep it updated</li>
          <li>Keep your login credentials secure and not share them</li>
          <li>Notify us immediately at support@raisedash.com of any unauthorized use</li>
          <li>Keep your billing contact and payment method current</li>
        </TermsList>
        <TermsP>
          You are responsible for all activity under your accounts and in every chat, group, or
          channel where you or your Authorized Users add a Raisedash bot, whether or not you
          authorized that activity. You are responsible for the acts and omissions of your
          Authorized Users as if they were your own, and for ensuring they comply with these Terms.
        </TermsP>
      </TermsSection>

      <TermsSection title="6. Your Responsibility for Safety and Compliance">
        <TermsP>
          <strong>
            RAISEDASH IS A SOFTWARE AND RECORDKEEPING TOOL. RAISEDASH IS NOT A MOTOR CARRIER,
            BROKER, EMPLOYER OF YOUR DRIVERS, MECHANIC, INSPECTOR, SAFETY CONSULTANT, INSURER, OR
            LAW FIRM, AND NOTHING IN THE SERVICES IS LEGAL, REGULATORY, SAFETY, INSURANCE, OR OTHER
            PROFESSIONAL ADVICE.
          </strong>
        </TermsP>
        <TermsP>You alone are responsible for:</TermsP>
        <TermsList>
          <li>
            Complying with all laws that apply to you, including the Federal Motor Carrier Safety
            Regulations, hours-of-service rules, drug and alcohol testing rules, and all other
            federal, state, and local transportation, employment, and safety laws
          </li>
          <li>
            Inspecting, maintaining, and repairing your vehicles and equipment, and deciding whether
            any vehicle may be operated
          </li>
          <li>
            Hiring, qualifying, training, supervising, and disciplining your drivers and personnel,
            and every employment decision you make
          </li>
          <li>
            Creating, keeping, and producing every record the law requires, in the form and for the
            period the law requires. The Services do not replace those obligations.
          </li>
          <li>
            The accuracy, legality, and suitability of all training content, policies, documents,
            and messages that you create, select, or send through the Services
          </li>
        </TermsList>
        <TermsP>
          Inspection reports, photos, videos, checklists, timestamps, location stamps, receipts, and
          other records in the Services reflect information submitted by your Authorized Users and
          their devices. We do not verify that any inspection was actually performed or performed
          correctly, or the condition of any vehicle. A completed inspection, checklist, or report
          in the Services is not a certification that a vehicle is safe, roadworthy, or compliant.
          Training completions, quiz results, scores, and certificates record activity in the
          Services only. They do not certify that anyone is competent, qualified, or licensed, and
          they are not accredited credentials.
        </TermsP>
        <TermsP>
          A missed, late, or failed reminder, message, upload, sync, or report, or any outage of the
          Services or a Third-Party Service, does not excuse or reduce any of your obligations. You
          must keep your own procedures to meet your obligations if the Services are unavailable.
        </TermsP>
      </TermsSection>

      <TermsSection title="7. Driver and Personal Data; Required Consents">
        <TermsP>
          As between you and Raisedash, you decide what personal information is collected through
          the Services and why, and we process it on your behalf to provide the Services. You
          represent and warrant that, before you or your Authorized Users add anyone to the Services
          or submit their information, you have given every notice and obtained every consent and
          authorization that applicable law requires, including under employment, privacy, data
          protection, biometric, location-tracking, call recording, wiretapping, and telemarketing
          laws (including the Telephone Consumer Protection Act), for:
        </TermsP>
        <TermsList>
          <li>
            Collecting and processing names, phone numbers, email addresses, photos, videos, voice,
            location, identity-verification data, documents, and messages
          </li>
          <li>
            Us sending SMS, email, Telegram, and other messages to the people you add, invite, or
            enroll, which we send at your direction and on your behalf
          </li>
          <li>
            A Raisedash bot reading and processing messages and media in the chats and groups where
            it is added, as permitted by that platform&apos;s settings
          </li>
        </TermsList>
        <TermsP>
          Do not submit Social Security numbers, medical information, drug or alcohol test results,
          financial account numbers, or other sensitive information unless a feature is expressly
          designed to collect it, and then only as the law permits. Our Privacy Policy, at
          raisedash.com/privacy-policy, describes how we handle personal information.
        </TermsP>
      </TermsSection>

      <TermsSection title="8. Customer Data">
        <TermsP>
          You keep ownership of your Customer Data. You grant the Raisedash Parties a worldwide,
          non-exclusive, royalty-free license to host, copy, store, process, transmit, translate,
          analyze, display, and otherwise use Customer Data as needed to provide, maintain, secure,
          support, and improve the Services, to prevent fraud and abuse, and as required by law.
        </TermsP>
        <TermsP>
          We may collect and create data about how the Services are used and may combine Customer
          Data with other data to create aggregated or de-identified data that does not identify you
          or any individual. We own that data and may use it for any lawful purpose, including after
          these Terms end.
        </TermsP>
        <TermsP>
          You are solely responsible for the accuracy, quality, and legality of Customer Data and
          for keeping your own copies of it. The Services are not a backup or archival service. Some
          features delete content automatically after a short retention period. After your account
          or a Service ends, we may delete the related Customer Data after 30 days without further
          notice, and we have no obligation to keep or return it. We may keep copies as required by
          law or in routine backups. We may disclose Customer Data if we believe in good faith that
          the law, a subpoena, or a government request requires it, or that disclosure is needed to
          protect any person&apos;s safety or our rights.
        </TermsP>
      </TermsSection>

      <TermsSection title="9. AI Features">
        <TermsP>
          Some Services use artificial intelligence and machine learning, including to generate or
          translate training content, quizzes, simulations, roleplays, videos, summaries,
          transcriptions, and answers, and to read photos, documents, and receipts (“AI Features”).
          AI output can be inaccurate, incomplete, outdated, or inappropriate, and similar inputs
          may produce different outputs. You are responsible for reviewing AI output before you rely
          on it or share it, and you must not use AI output as the sole basis for any safety, legal,
          employment, or financial decision. We may use Third-Party Services to provide AI Features.
        </TermsP>
      </TermsSection>

      <TermsSection title="10. Third-Party Services">
        <TermsP>
          The Services work with and depend on Third-Party Services. Your use of a Third-Party
          Service is governed by that provider&apos;s terms, and you are responsible for complying
          with them. We do not control Third-Party Services and are not responsible for their
          availability, performance, security, data handling, fees, changes to their features or
          APIs, or any suspension of your or our accounts with them. If a Third-Party Service
          changes or stops working with the Services, we may change or stop the related features
          without liability or refund. When you connect a Third-Party Service, you authorize us to
          access and use your data in it as needed to provide the Services.
        </TermsP>
      </TermsSection>

      <TermsSection title="11. Acceptable Use">
        <TermsP>You will not, and will not permit anyone else to:</TermsP>
        <TermsList>
          <li>Use the Services in violation of any law or the rights of any person</li>
          <li>
            Send spam, unlawful, harassing, threatening, defamatory, or deceptive messages, or
            messages to people who have not consented to receive them
          </li>
          <li>Upload or transmit malicious code, or content you have no right to share</li>
          <li>
            Copy, modify, reverse engineer, decompile, or create derivative works of the Services,
            except to the extent the law expressly permits despite this restriction
          </li>
          <li>
            Access the Services by automated means (including scraping, crawling, or bots) except
            through interfaces we provide, or exceed or circumvent any usage limit
          </li>
          <li>
            Resell, sublicense, rent, or provide the Services to third parties, or use them to build
            or benchmark a competing product
          </li>
          <li>
            Manipulate, split, disguise, or misreport usage (including the number of drivers,
            trucks, groups, or other billing units) to avoid or reduce Fees
          </li>
          <li>
            Attempt to gain unauthorized access to, probe, disrupt, or overload the Services or any
            related system or network
          </li>
          <li>
            Use the Services as the only means of ensuring the safety of any person or vehicle
          </li>
        </TermsList>
      </TermsSection>

      <TermsSection title="12. Fees, Billing, and Payment">
        <TermsP>
          <strong>Fees.</strong> You will pay all Fees for the Services you receive. Unless an Order
          says otherwise, Fees are in US dollars, recurring Fees are billed in advance, and
          usage-based Fees are billed in arrears. Usage-based Fees (for example per driver, per
          truck, per active group, or per message) are calculated from Raisedash&apos;s system
          records, which are conclusive absent manifest error. Each billing unit has the meaning
          stated in the Order or other pricing we communicate to you.
        </TermsP>
        <TermsP>
          <strong>Payment authorization.</strong> When you provide a payment method for a paid
          Service, or pay any invoice with a payment method, you authorize Raisedash and its payment
          processor to charge that payment method, and any updated or replacement payment method you
          provide, for all Fees as they become due, including recurring subscription Fees,
          usage-based Fees, taxes, and late charges, without asking you again for each charge, until
          you cancel in accordance with these Terms. If we tell you that a payment method is
          collected only to verify your account, we will not charge it unless you later agree to
          paid Services and authorize the charge, which you may do in writing, including by email.
        </TermsP>
        <TermsP>
          <strong>Invoices.</strong> Invoices are due on the date stated on the invoice, or on
          receipt if no date is stated. Amounts not paid when due accrue a late charge of 1.5% per
          month, or the highest rate the law allows if that is lower, from the due date until paid.
          You will reimburse our reasonable costs of collecting overdue amounts, including
          attorneys&apos; fees and collection agency fees.
        </TermsP>
        <TermsP>
          <strong>Taxes.</strong> Fees do not include taxes. You will pay all sales, use,
          value-added, withholding, and similar taxes, duties, and charges related to the Services,
          other than taxes on our net income.
        </TermsP>
        <TermsP>
          <strong>Billing disputes.</strong> If you believe a charge is wrong, you must tell us in
          writing at support@raisedash.com within 30 days after the invoice or charge date, with the
          details of the dispute. If you do not, the charge is final and you waive any dispute of
          it. You agree to contact us and try to resolve any concern before you dispute a charge
          with your bank or card issuer. A chargeback or payment reversal without first contacting
          us is a material breach of these Terms, and you will reimburse us for any related fees.
        </TermsP>
        <TermsP>
          <strong>No refunds.</strong> Except where the law requires otherwise or an Order expressly
          says otherwise, all Fees are non-cancellable and non-refundable, including for partial
          billing periods, unused Services or capacity, downgrades, and suspension or termination
          for your breach.
        </TermsP>
        <TermsP>
          <strong>Automatic renewal.</strong> Unless an Order says otherwise, each subscription
          renews automatically for successive periods equal to its current billing period, at the
          then-current Fees, until cancelled. You may cancel by emailing support@raisedash.com
          before the renewal date. Cancellation takes effect at the end of the current billing
          period.
        </TermsP>
        <TermsP>
          <strong>Price changes.</strong> We may change our Fees, introduce new Fees, or change how
          any Service is priced or measured. For Services you are already paying for, we will give
          you at least 30 days&apos; advance notice of any increase, by email to your account owner
          or billing contact, by a notice in the Services, or on an invoice. The new Fees apply from
          the first billing period that begins after the notice period ends. If you do not agree,
          you may cancel before the new Fees take effect and you will not be charged them. If you do
          not cancel, or you keep using the Service after the new Fees take effect, you accept the
          new Fees and authorize us to charge them to your payment method on file. Discounted,
          promotional, introductory, founding, or custom pricing applies only for the period stated,
          or if no period is stated, until we give you 30 days&apos; notice that it will end. Fees
          stated in an Order for a fixed, committed term will not increase during that term unless
          the Order says otherwise.
        </TermsP>
      </TermsSection>

      <TermsSection title="13. Suspension">
        <TermsP>
          We may suspend or limit access to any or all of the Services, including removing a
          Raisedash bot from a chat or group, immediately and without liability if: (a) any amount
          you owe is more than 10 days overdue; (b) we believe you or your Authorized Users have
          breached these Terms; (c) we believe your use creates a security, legal, or operational
          risk, or could harm us, a Third-Party Service, or anyone else; or (d) the law, a court, a
          government authority, or a Third-Party Service requires it. Where practical we will give
          you notice. Suspension does not relieve you of your obligation to pay Fees.
        </TermsP>
      </TermsSection>

      <TermsSection title="14. Confidentiality">
        <TermsP>
          Each party will use the other&apos;s non-public business, technical, and pricing
          information that it receives under these Terms only to perform under these Terms, and will
          protect it with at least reasonable care. This does not apply to information that is or
          becomes public through no fault of the receiving party, was already known to it, is
          independently developed, or is rightfully received from a third party. A party may
          disclose confidential information when the law requires it. Our pricing, Orders, and the
          non-public features of the Services are our confidential information.
        </TermsP>
      </TermsSection>

      <TermsSection title="15. Intellectual Property and Feedback">
        <TermsP>
          The Services and everything in them, including software, bots, designs, templates,
          training libraries, videos, images, text, AI Features, documentation, and all improvements
          and derivatives of them, are owned by Raisedash and its licensors and are protected by
          intellectual property laws. Content we provide may be used only within the Services for
          your internal business purposes. All rights not expressly granted to you in these Terms
          are reserved by Raisedash and its licensors, and no rights are granted by implication or
          estoppel.
        </TermsP>
        <TermsP>
          If you or your Authorized Users give us suggestions, ideas, or other feedback, we may use
          it for any purpose without restriction, payment, or attribution, and you hereby grant us a
          perpetual, irrevocable, worldwide, royalty-free license to do so.
        </TermsP>
        <TermsP>
          We may identify you as a customer, including by name and logo, on our website and in
          marketing materials. You may ask us to stop at any time by emailing support@raisedash.com.
        </TermsP>
      </TermsSection>

      <TermsSection title="16. Term and Termination">
        <TermsP>
          These Terms apply from the moment you accept them until all of your accounts and Services
          have ended. You may stop using the Services at any time and may cancel paid Services as
          described in Section 12. We may terminate these Terms or any Service for any reason on 30
          days&apos; notice, and if we do so for a reason other than your breach, we will refund any
          prepaid Fees for the period after termination. We may terminate immediately on notice if
          you breach these Terms, fail to pay, become insolvent, or if continuing would expose us to
          legal liability.
        </TermsP>
        <TermsP>
          When these Terms or a Service end: your right to use the affected Services ends; all
          unpaid Fees, including usage-based Fees through the end date, become immediately due; we
          may remove Raisedash bots from your chats and groups; and Section 8 governs your Customer
          Data. Every provision that by its nature should survive will survive, including Sections 6
          through 8, 11, 12 (for amounts owed), 14, 15, and 17 through 26.
        </TermsP>
      </TermsSection>

      <TermsSection title="17. Disclaimer of Warranties">
        <TermsP>
          <strong>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE SERVICES, AND ALL CONTENT, AI OUTPUT,
            RECORDS, AND REPORTS, ARE PROVIDED “AS IS” AND “AS AVAILABLE,” WITH ALL FAULTS AND
            WITHOUT WARRANTY OF ANY KIND. THE RAISEDASH PARTIES DISCLAIM ALL WARRANTIES, WHETHER
            EXPRESS, IMPLIED, STATUTORY, OR ARISING FROM COURSE OF DEALING OR USAGE OF TRADE,
            INCLUDING ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
            NON-INFRINGEMENT, ACCURACY, AND QUIET ENJOYMENT. WE DO NOT WARRANT THAT THE SERVICES
            WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE, THAT ANY MESSAGE, REMINDER, OR
            UPLOAD WILL BE DELIVERED OR STORED, THAT ANY DATA WILL BE ACCURATE OR PRESERVED, OR THAT
            USING THE SERVICES WILL MAKE YOU COMPLIANT WITH ANY LAW OR PASS ANY AUDIT, INSPECTION,
            OR INVESTIGATION. NO ADVICE OR INFORMATION FROM US CREATES ANY WARRANTY NOT EXPRESSLY
            STATED IN THESE TERMS.
          </strong>
        </TermsP>
      </TermsSection>

      <TermsSection title="18. Limitation of Liability">
        <TermsP>
          <strong>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL ANY RAISEDASH PARTY BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR
            FOR ANY LOSS OF PROFITS, REVENUE, BUSINESS, CONTRACTS, GOODWILL, OR DATA, COST OF
            SUBSTITUTE SERVICES, VEHICLE ACCIDENTS, BODILY INJURY, DEATH, PROPERTY OR CARGO DAMAGE,
            FINES, PENALTIES, OUT-OF-SERVICE ORDERS, SAFETY RATINGS, AUDIT RESULTS, OR INSURANCE
            CONSEQUENCES, ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES, HOWEVER CAUSED.
          </strong>
        </TermsP>
        <TermsP>
          <strong>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE TOTAL AGGREGATE LIABILITY OF ALL RAISEDASH
            PARTIES FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES WILL
            NOT EXCEED THE GREATER OF (A) THE FEES YOU ACTUALLY PAID TO RAISEDASH FOR THE SPECIFIC
            SERVICE GIVING RISE TO THE LIABILITY DURING THE 12 MONTHS BEFORE THE EVENT GIVING RISE
            TO THE FIRST CLAIM, AND (B) ONE HUNDRED US DOLLARS (US$100).
          </strong>
        </TermsP>
        <TermsP>
          These limitations apply to every claim and theory of liability, whether in contract, tort
          (including negligence), strict liability, statute, or otherwise, even if a Raisedash Party
          was advised of the possibility of the damage and even if any remedy fails of its essential
          purpose. They do not limit your obligation to pay Fees or your obligations under Sections
          11 and 19. The Fees reflect, and the parties rely on, this allocation of risk.
        </TermsP>
      </TermsSection>

      <TermsSection title="19. Indemnification">
        <TermsP>
          You will defend, indemnify, and hold harmless the Raisedash Parties from and against all
          claims, demands, actions, investigations, losses, damages, liabilities, fines, penalties,
          settlements, costs, and expenses, including reasonable attorneys&apos; fees, arising out
          of or relating to: (a) Customer Data; (b) the use of the Services by you or your
          Authorized Users; (c) the operation, inspection, maintenance, or condition of any vehicle
          or equipment, and any accident, injury, death, or property or cargo damage; (d) your
          relationship with, and decisions about, your drivers, employees, and contractors; (e) any
          messages sent at your direction; (f) your violation of any law or any third party&apos;s
          rights; (g) your breach of these Terms; and (h) any dispute between you and any Authorized
          User or other third party. We may participate in the defense with counsel of our choice at
          our own expense. You may not settle any claim that imposes any obligation or admission on
          a Raisedash Party without our prior written consent.
        </TermsP>
      </TermsSection>

      <TermsSection title="20. Release">
        <TermsP>
          You release the Raisedash Parties from all claims, known or unknown, arising out of or
          relating to any dispute between you and any Authorized User, driver, customer, or other
          third party, or the conduct of any of them. If you are located in California, you waive
          California Civil Code Section 1542, which says: “A general release does not extend to
          claims that the creditor or releasing party does not know or suspect to exist in his or
          her favor at the time of executing the release and that, if known by him or her, would
          have materially affected his or her settlement with the debtor or released party.” You
          waive any similar law of any other jurisdiction.
        </TermsP>
      </TermsSection>

      <TermsSection title="21. Governing Law">
        <TermsP>
          These Terms, and every dispute arising out of or relating to them or the Services, are
          governed by the laws of the State of Delaware, without regard to its conflict of laws
          rules. The United Nations Convention on Contracts for the International Sale of Goods and
          the Uniform Computer Information Transactions Act do not apply.
        </TermsP>
      </TermsSection>

      <TermsSection title="22. Dispute Resolution, Binding Arbitration, and Class Action Waiver">
        <TermsP>
          <strong>Please read this section carefully. It affects your legal rights.</strong>
        </TermsP>
        <TermsP>
          <strong>Informal resolution.</strong> Before starting any arbitration or court proceeding,
          a party must first send the other a written notice describing the dispute and the relief
          requested (to us at legal@raisedash.com), and the parties will try in good faith to
          resolve it for 30 days.
        </TermsP>
        <TermsP>
          <strong>Arbitration.</strong> Any dispute, claim, or controversy arising out of or
          relating to these Terms or the Services, including their formation, interpretation,
          breach, termination, enforceability, or validity, and the arbitrability of any dispute,
          will be resolved by final and binding arbitration administered by the American Arbitration
          Association under its Commercial Arbitration Rules, before a single arbitrator. The seat
          of arbitration is Wilmington, Delaware, and hearings may be held by video conference. The
          arbitrator&apos;s award is final and binding, and judgment on it may be entered in any
          court of competent jurisdiction. The Federal Arbitration Act governs this Section 22.
        </TermsP>
        <TermsP>
          <strong>Exceptions.</strong> Either party may (a) bring an individual claim in a small
          claims court; (b) seek temporary or preliminary injunctive relief in court to protect its
          intellectual property, confidential information, or the security of the Services; and (c)
          bring an action in court to collect undisputed Fees.
        </TermsP>
        <TermsP>
          <strong>
            Class action and jury waiver. Each party may bring claims against the other only in its
            individual capacity, and not as a plaintiff or class member in any purported class,
            collective, consolidated, or representative proceeding. The arbitrator may not
            consolidate claims of more than one party or preside over any representative proceeding.
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, EACH PARTY WAIVES ANY RIGHT TO A JURY TRIAL.
          </strong>{" "}
          If the class action waiver is found unenforceable as to any claim, that claim must be
          severed and decided in court, and not in arbitration.
        </TermsP>
        <TermsP>
          <strong>Time limit.</strong> To the maximum extent permitted by law, any claim against a
          Raisedash Party must be brought within one year after it arises, or it is permanently
          barred.
        </TermsP>
        <TermsP>
          <strong>Courts.</strong> For any dispute that is not arbitrated, the parties submit to the
          exclusive jurisdiction of the state and federal courts located in Delaware.
        </TermsP>
      </TermsSection>

      <TermsSection title="23. Changes to These Terms">
        <TermsP>
          We may update these Terms from time to time. We will post the updated Terms on this page
          with a new effective date. If a change is material, we will also give you at least 30
          days&apos; notice by email, in the Services, or on an invoice before it takes effect.
          Other changes take effect when posted. By continuing to access or use the Services after a
          change takes effect, you accept the updated Terms. A change to Section 22 will not apply
          to any dispute of which either party gave notice before the change was posted. Changes to
          Fees are governed by Section 12.
        </TermsP>
      </TermsSection>

      <TermsSection title="24. General">
        <TermsList>
          <li>
            <strong>Entire agreement.</strong> These Terms, including every Order, are the entire
            agreement between the parties about their subject matter and replace all prior or
            contemporaneous proposals, discussions, and agreements about it.
          </li>
          <li>
            <strong>Notices and electronic communications.</strong> We may give you notices by email
            to any address in your account or billing records, in the Services, or on an invoice.
            Email notices are effective when sent. You are responsible for keeping your contact
            details current. You consent to receive communications and enter into agreements
            electronically, and electronic acceptance has the same effect as a signature. You must
            send legal notices to us at legal@raisedash.com.
          </li>
          <li>
            <strong>Assignment.</strong> You may not assign or transfer these Terms without our
            prior written consent. We may assign these Terms without consent, including in
            connection with a merger, acquisition, reorganization, or sale of assets. Any prohibited
            assignment is void.
          </li>
          <li>
            <strong>Force majeure.</strong> We are not liable for any delay or failure caused by
            events beyond our reasonable control, including failures of the internet, hosting
            providers, telecommunications carriers, or Third-Party Services, cyberattacks, power
            outages, labor disputes, natural disasters, epidemics, war, terrorism, or government
            action.
          </li>
          <li>
            <strong>Relationship.</strong> The parties are independent contractors. Nothing in these
            Terms creates a partnership, joint venture, agency, fiduciary, or employment
            relationship.
          </li>
          <li>
            <strong>Third-party beneficiaries.</strong> The Raisedash Parties are intended
            third-party beneficiaries of Sections 17 through 20 and 25. There are no other
            third-party beneficiaries.
          </li>
          <li>
            <strong>Export and sanctions.</strong> You will comply with all export control and
            sanctions laws and will not use the Services in, or for the benefit of, any sanctioned
            country or person.
          </li>
          <li>
            <strong>Waiver and severability.</strong> Our failure to enforce any provision is not a
            waiver of it. If any provision is held invalid or unenforceable, it will be enforced to
            the maximum extent permissible and the remaining provisions will remain in full force
            and effect.
          </li>
          <li>
            <strong>Interpretation.</strong> “Including” and similar words mean “including without
            limitation.” Headings are for convenience only. These Terms will not be construed
            against either party as the drafter. If these Terms are translated, the English version
            controls.
          </li>
        </TermsList>
      </TermsSection>

      <TermsSection title="25. Maximum Protection">
        <TermsP>
          Every disclaimer, exclusion, limitation, release, waiver, indemnity, and other protection
          of the Raisedash Parties in these Terms (a) applies to the fullest extent permitted by
          applicable law; (b) applies to all claims and causes of action of any kind, under any
          legal or equitable theory, whether known or unknown, and whether they arise under these
          Terms, an Order, any other agreement, or otherwise; (c) protects each Raisedash Party; and
          (d) is cumulative with, and does not limit, any other right, remedy, or defense available
          to any Raisedash Party under these Terms, at law, or in equity. If applicable law does not
          allow any part of such a protection to apply to you, it will apply to the greatest extent
          that law allows, and the rest of these Terms will not be affected.
        </TermsP>
      </TermsSection>

      <TermsSection title="26. Contact Information">
        <TermsP>If you have any questions about these Terms, please contact us:</TermsP>
        <div className="bg-muted rounded-lg p-6">
          <p className="text-foreground mb-2">
            <strong>LoadHunter Inc. (doing business as Raisedash)</strong>
          </p>
          <p className="text-muted-foreground mb-2">Legal notices: legal@raisedash.com</p>
          <p className="text-muted-foreground">Support and billing: support@raisedash.com</p>
        </div>
      </TermsSection>
    </>
  );
}

function TermsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-foreground mb-4 text-2xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function TermsP({ children }: { children: ReactNode }) {
  return <p className="text-muted-foreground mb-4">{children}</p>;
}

function TermsList({ children }: { children: ReactNode }) {
  return (
    <ul className="text-muted-foreground mb-4 ml-4 list-inside list-disc space-y-2">{children}</ul>
  );
}
