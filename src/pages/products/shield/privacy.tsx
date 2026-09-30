import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

export default function ShieldPrivacy() {
  return (
    <PageLayout
      title="Raisedash Shield Privacy Notice"
      description="How Raisedash Shield handles local page checks, detection updates and optional reports."
    >
      <Container className="bg-card border-border mt-12 rounded-xs border px-6 py-12 sm:px-12">
        <article className="mx-auto max-w-3xl space-y-10 text-base leading-relaxed">
          <header>
            <Link
              href="/products/shield"
              className="text-muted-foreground underline underline-offset-4"
            >
              Raisedash Shield
            </Link>
            <h1 className="text-foreground mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Raisedash Shield privacy notice
            </h1>
            <p className="text-muted-foreground mt-4">Effective September 29, 2026</p>
            <p className="text-muted-foreground mt-4">
              Raisedash Shield is operated by LoadHunter Inc. (“Raisedash,” “we,” or “us”). This
              notice covers the Shield browser extension and its detection-update and report
              services. Contact us at{" "}
              <a className="underline" href="mailto:support@raisedash.com">
                support@raisedash.com
              </a>{" "}
              for support or privacy requests.
            </p>
          </header>
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Your choice comes first</h2>
            <p className="text-muted-foreground">
              Automatic page checks and detection-list requests remain off until you read the
              in-product explanation and choose Enable protection. You can leave protection off.
              After enabling it, you can pause page checks from the toolbar menu; detection-list
              updates continue as disclosed below.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">What stays on your computer</h2>
            <p className="text-muted-foreground">
              Automatic checks inspect page addresses, bounded page text and labels, sign-in-field
              metadata, page-driven clipboard writes, user-triggered sensitive pastes, and download
              names and types. Page text may include personal communications, financial or health
              information, or other personal details visible on a page. We use these checks only to
              identify supported phishing and risky-action patterns and show or manage warnings.
            </p>
            <p className="text-muted-foreground">
              These automatic checks do not upload that information. Shield does not read
              password-field values or downloaded file contents. It can replace a suspicious
              clipboard write, block a first sensitive-code paste or pause a flagged download. The
              warning explains the action and available recovery controls. Deleting a downloaded
              file requires your action.
            </p>
            <p className="text-muted-foreground">
              Broad website access allows local checks on unfamiliar websites and supported embedded
              frames, including intranet and localhost pages. Browser-internal pages and local files
              are outside the extension’s page-access scope. If you separately allow incognito
              access, the same checks can run there.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Detection-list updates</h2>
            <p className="text-muted-foreground">
              After you enable protection, Shield requests reviewed detection data from
              guard-api.raisedash.com at startup and about every 30 minutes, with retries after
              failures. Updates continue while page protection is paused. The request contains no
              visited-page addresses, page content or browser credentials. It may include the
              version of the list already held.
            </p>
            <p className="text-muted-foreground">
              Our service and infrastructure providers receive ordinary connection metadata, such as
              IP address and user agent. We use this to deliver updates, operate the service and
              limit abuse. Detection updates are data; executable detection logic is bundled with
              the extension.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Reports you choose to send</h2>
            <p className="text-muted-foreground">
              Nothing is reported automatically. When you press Send report, Shield sends the
              previewed site address, selected reason, optional comment and displayed warning level
              to our report service for human review. The address excludes URL login details, query
              parameters and fragments, but its path and your comment can still contain personal
              information. Please leave out unnecessary personal or confidential information.
            </p>
            <p className="text-muted-foreground">
              We store the report and review status. Authorized reviewers use reports to investigate
              abuse and maintain detection rules. Submitted reports are not automatically sent to an
              AI service or published. A reviewed domain may be distributed in the detection list;
              reports do not automatically add domains to that list.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">
              Use, service providers and disclosure
            </h2>
            <p className="text-muted-foreground">
              Shield data is used to provide and improve its security features, handle support
              requests, investigate abuse and meet legal obligations. We do not sell Shield user
              data or use it for advertising, unrelated profiling, creditworthiness or lending
              decisions.
            </p>
            <p className="text-muted-foreground">
              AWS hosts the report and update service and backups; Cloudflare provides network
              delivery and protection. Google operates the Chrome Web Store and browser update
              distribution under its own policies. Authorized personnel and service providers
              receive access only as needed for the disclosed purposes. We may disclose information
              when legally required or necessary to investigate security incidents. Information may
              be processed in the United States and other countries where our providers operate.
            </p>
            <p className="text-muted-foreground">
              Raisedash Shield’s use of information received through the extension complies with the{" "}
              <a
                className="underline"
                href="https://developer.chrome.com/docs/webstore/program-policies/user-data-faq"
              >
                Chrome Web Store User Data Policy
              </a>
              , including its{" "}
              <a
                className="underline"
                href="https://developer.chrome.com/docs/webstore/program-policies/limited-use"
              >
                Limited Use requirements
              </a>
              .
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Storage and retention</h2>
            <p className="text-muted-foreground">
              Your browser stores preferences, the dated consent record and the downloaded detection
              list locally. Per-tab findings and warning decisions are held in browser session
              storage and removed when the tab closes. These records are not a server-side browsing
              history. Uninstalling the extension removes its browser-managed storage.
            </p>
            <p className="text-muted-foreground">
              Our standard policy removes raw reports and their review notes after 30 days from
              submission, including reports still awaiting review. Cleanup runs daily, so removal
              normally follows the 30-day boundary by up to one scheduled day. A report needed for
              an active investigation or legal obligation may be held longer, with a review date no
              more than 90 days ahead and a renewed justification for any extension.
            </p>
            <p className="text-muted-foreground">
              Reviewed domain rules and minimal administrative records remain for protection and
              accountability. Older free-text rule and detection-list notes are removed under the
              same normal 30-day policy; an active report hold can preserve related decision notes.
              Authorized report exports remain subject to the same retention requirements.
            </p>
            <p className="text-muted-foreground">
              Restricted backups can retain older copies after live deletion. Local backup cleanup
              targets copies older than 7 days. Our cloud backup lifecycle expires current versions
              after 14 days and noncurrent versions after 30 further days, with provider processing
              delay possible. We reapply retention and outstanding deletion requests before using a
              restored backup to serve users. This is not a promise to erase every backup copy
              within 30 days of a report.
            </p>
            <p className="text-muted-foreground">
              Application and API access logs record operational information such as request IDs,
              API routes, status and timing, rather than report bodies or comments. These logs
              rotate by file-size limits rather than a fixed number of days. Cloudflare also handles
              connection metadata for delivery and security under its{" "}
              <a className="underline" href="https://www.cloudflare.com/privacypolicy/">
                privacy policy
              </a>
              . We keep support correspondence while handling a request and as needed to document
              its resolution or meet legal obligations.
            </p>
            <p className="text-muted-foreground">
              The hosted service uses HTTPS, an encrypted database volume and encrypted backups.
              Storage access is restricted to authorized operators. No security measure eliminates
              every risk.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Your controls and requests</h2>
            <p className="text-muted-foreground">
              You can pause page checks, restrict site access in Chrome, decline to send reports, or
              disable or uninstall the extension. Disabling or uninstalling stops its update
              requests. Restricting access may prevent protection on affected pages.
            </p>
            <p className="text-muted-foreground">
              To request access, correction or deletion of information you submitted, email{" "}
              <a className="underline" href="mailto:support@raisedash.com">
                support@raisedash.com
              </a>
              . Include the report identifier if you have it, or enough information to locate the
              submission. We may need to verify that the information belongs to you. Do not send
              identity documents unless a proportionate verification method has first been agreed.
              Your legal rights depend on your location.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Scope and changes</h2>
            <p className="text-muted-foreground">
              This notice describes Shield version 0.0.16 and later releases with the same data
              handling practices. Older development builds and separately operated servers may work
              differently. If your administrator configures another server, ask that operator about
              its privacy practices.
            </p>
            <p className="text-muted-foreground">
              The extension contains no advertising or analytics SDK. Visits to the Raisedash
              website, including this page, are separately covered by our{" "}
              <Link className="underline" href="/privacy-policy">
                website privacy policy
              </Link>
              . We will update this notice when practices change and seek a new in-product choice
              before materially expanding data handling where required.
            </p>
          </section>
        </article>
      </Container>
    </PageLayout>
  );
}
