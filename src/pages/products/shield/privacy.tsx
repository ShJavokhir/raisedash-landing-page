import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

// Must say the same thing as the extension's technical disclosure
// (cargo-security/docs/PRIVACY.md) and the Chrome Web Store privacy tab.
export default function ShieldPrivacy() {
  return (
    <PageLayout
      title="Raisedash Shield Privacy Notice"
      description="What Raisedash Shield keeps on your computer, what site-age checks send, and how reports and the scam list are handled."
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
            <p className="text-muted-foreground mt-4">Effective October 24, 2026</p>
            <p className="text-muted-foreground mt-4">
              Raisedash Shield is operated by LoadHunter Inc. (“Raisedash,” “we,” or “us”). This
              notice covers the Shield browser extension and the Raisedash services it talks to: the
              scam-list update service, the site-age lookup service and the report service. Contact
              us at{" "}
              <a className="underline" href="mailto:support@raisedash.com">
                support@raisedash.com
              </a>{" "}
              for support or privacy requests.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">The short version</h2>
            <p className="text-muted-foreground">
              Shield works on your computer and sends nothing about the pages you visit, with one
              exception. Site-age checks send the hostname of a page (for example{" "}
              <code>login.example-freight.com</code>) at four moments: when the page asks for a
              password, when it asks for a file upload, when Shield pauses a download from it, and
              when Shield replaces a scam command the page put on your clipboard. Nothing else about
              the page, and nothing that identifies you, is sent. Site-age checks are on from
              install; the welcome page that opens says so and has the off switch, and the same
              switch is in the toolbar menu.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">What is on from install</h2>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Protection</strong> — the scam-list check, the
              download pause and the clipboard guard — runs entirely in your browser and is on from
              install. You can turn it off in the toolbar menu; scam-list updates continue as
              described below.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Site-age checks</strong> are also on from install.
              When you install Shield yourself, a welcome page opens that states exactly what
              site-age checks send, with a “Turn them off” control directly under it. The toolbar
              menu has the same switch. Turning checks off records only that choice and deletes
              every site-age answer the browser remembered. An organization can decide for its
              people with a managed browser policy; the person then cannot change it, and no welcome
              page opens on a policy install.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">What stays on your computer</h2>
            <p className="text-muted-foreground">
              The scam-list check matches each page’s hostname against the downloaded list of
              confirmed scam sites, in the browser. Shield notes whether a page, or a frame inside
              it, has a password field or a file-upload field; it never reads what you type, a
              field’s label or the text around it. The clipboard guard watches what a page writes to
              your clipboard, classifies the first few kilobytes locally and replaces a scam command
              with a warning that has a restore control; to decide whether an ordinary command is
              part of a “paste this into Run” lure it reads bounded page text locally, which is
              never stored or sent. The download guard judges a download’s file name, type, origin
              and how the tab was reached; a program disguised as paperwork or a remote-control
              installer is paused until you choose. Downloaded file contents are never read, and
              deleting a downloaded file requires your action.
            </p>
            <p className="text-muted-foreground">
              Since version 0.1.0 nothing reads page wording to raise a warning: document requests,
              sign-in codes and brand names on a page are no longer judged, because they caused
              false alarms on chat and email sites.
            </p>
            <p className="text-muted-foreground">
              Broad website access lets these checks run on unfamiliar websites and supported
              embedded frames, including intranet and localhost pages. Browser-internal pages and
              local files are outside the extension’s page-access scope. If you separately allow
              incognito access, the same checks can run there.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">
              Site-age checks: what is sent, and when
            </h2>
            <p className="text-muted-foreground">
              While site-age checks are on, Shield sends a request to the Raisedash lookup service
              only at these four moments: the page, or a frame in it, has a password field; the
              page, or a frame in it, has a file-upload field; the download guard paused or warned
              about a file on the page; the clipboard guard acted on the page.
            </p>
            <p className="text-muted-foreground">
              The request contains exactly two things: the page’s hostname (lowercase, no port) and
              which of the four moments happened. It never contains the rest of the address, the
              query string, page content, field values, an install or user identifier, or cookies.
            </p>
            <p className="text-muted-foreground">
              These are never sent: roughly the ten thousand most-linked websites and their own
              sign-in addresses, official freight-brand domains, United States .gov and .mil sites,
              sites Raisedash has reviewed as legitimate, local and private network addresses, IP
              addresses, and platforms where anyone can publish a page under one shared hostname
              (such as Google Docs and Forms or Dropbox).
            </p>
            <p className="text-muted-foreground">
              The answer — when the domain was registered, and whether it is on the scam or
              reviewed-legitimate list — is kept in browser session storage for at most seven days
              and is gone when the browser closes. The same host is asked about again within that
              time only when a different moment happens on it. A failed request is retried no sooner
              than ten minutes later. A warning about a brand-new site never blocks the page; you
              can always continue.
            </p>
            <p className="text-muted-foreground">
              On the server, the lookup service answers from its cache of registration dates or asks
              the domain’s registry through the public RDAP protocol; the registry sees that the
              domain was looked up, not who asked. The service records a sighting: the domain, the
              hostname, the day (UTC), which moment it was and a count. It does not record your IP
              address, any identifier or the request itself, and its request logs carry the route,
              status and timing, never the hostname. Sightings are deleted after 90 days. A person
              at Raisedash reviews recent sightings; only when that person confirms a site as a scam
              is it added to the list every Shield install downloads.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Scam-list updates</h2>
            <p className="text-muted-foreground">
              From install, Shield downloads the reviewed scam list from guard-api.raisedash.com at
              startup and about every 30 minutes, with retries after failures. Updates continue
              while protection is turned off. The request contains no visited-page addresses, page
              content or browser credentials; after the first download it carries only the version
              already held. The list is data, never code: executable detection logic is bundled with
              the extension.
            </p>
            <p className="text-muted-foreground">
              Our service and infrastructure providers receive ordinary connection metadata, such as
              IP address and user agent, for every request to our services. We use this to deliver
              updates, operate the service and limit abuse.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Reports you choose to send</h2>
            <p className="text-muted-foreground">
              A report is sent only when you press Send report, or This warning is wrong on a
              warning you disagree with. Opening or cancelling the form sends nothing. The report
              contains the previewed site address (scheme, host, port and path; URL credentials,
              query parameters and fragments are removed), the reason you chose, an optional comment
              of up to 1,000 characters and the warning level shown. A path or a comment can still
              contain personal information, so please leave out anything unnecessary.
            </p>
            <p className="text-muted-foreground">
              We store the report and its review status. Authorized reviewers use reports to
              investigate abuse and maintain the scam list. Reports are not sent to an AI service
              and are not published. A report alone never adds a site to the list or removes one
              from it; a person decides.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">
              Use, service providers and disclosure
            </h2>
            <p className="text-muted-foreground">
              Shield data is used to provide and improve its security features, to find new scam
              sites faster, to handle support requests, to investigate abuse and to meet legal
              obligations. We do not sell Shield user data or use it for advertising, unrelated
              profiling, creditworthiness or lending decisions.
            </p>
            <p className="text-muted-foreground">
              AWS hosts the lookup, update and report services and their backups; Cloudflare
              provides network delivery and protection; domain registries answer registration-date
              queries over RDAP. Google operates the Chrome Web Store and browser update
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
              Your browser stores settings, your site-age off choice (if you made one) and the
              downloaded scam list. Per-tab findings, Continue decisions and site-age answers are
              held in browser session storage and removed when the tab closes or the browser quits.
              None of this becomes a server-side browsing history. Uninstalling the extension
              removes its browser-managed storage.
            </p>
            <p className="text-muted-foreground">
              On our servers, sightings from site-age checks are deleted after 90 days and the table
              is capped. A domain’s registration date is cached for up to a day. Our standard policy
              removes raw reports and their review notes after 30 days from submission, including
              reports still awaiting review; cleanup runs daily, so removal normally follows the
              30-day boundary by up to one scheduled day. A report needed for an active
              investigation or legal obligation may be held longer, with a review date no more than
              90 days ahead and a renewed justification for any extension.
            </p>
            <p className="text-muted-foreground">
              Reviewed domain decisions and minimal administrative records remain for protection and
              accountability. Older free-text review notes are removed under the same normal 30-day
              policy; an active report hold can preserve related decision notes. Authorized report
              exports remain subject to the same retention requirements.
            </p>
            <p className="text-muted-foreground">
              Restricted backups can retain older copies after live deletion. Local backup cleanup
              targets copies older than 7 days. Our cloud backup lifecycle expires current versions
              after 14 days and noncurrent versions after 30 further days, with provider processing
              delay possible. We reapply retention and outstanding deletion requests before using a
              restored backup to serve users. This is not a promise to erase every backup copy
              within 30 days.
            </p>
            <p className="text-muted-foreground">
              Application and API access logs record operational information such as request IDs,
              API routes, status and timing, never a looked-up hostname, a report body or a comment.
              These logs rotate by file-size limits rather than a fixed number of days. Cloudflare
              also handles connection metadata for delivery and security under its{" "}
              <a className="underline" href="https://www.cloudflare.com/privacypolicy/">
                privacy policy
              </a>
              . We keep support correspondence while handling a request and as needed to document
              its resolution or meet legal obligations.
            </p>
            <p className="text-muted-foreground">
              The hosted services use HTTPS, an encrypted database volume and encrypted backups.
              Storage access is restricted to authorized operators. No security measure eliminates
              every risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Your controls and requests</h2>
            <p className="text-muted-foreground">
              You can turn site-age checks off on the welcome page or in the toolbar menu, turn
              protection off, restrict site access in Chrome, decline to send reports, or disable or
              uninstall the extension. Disabling or uninstalling stops every request. Restricting
              access may prevent protection on affected pages.
            </p>
            <p className="text-muted-foreground">
              To request access, correction or deletion of information you submitted, email{" "}
              <a className="underline" href="mailto:support@raisedash.com">
                support@raisedash.com
              </a>
              . Include the report identifier if you have it, or enough information to locate the
              submission. Sightings carry no identifier, so we cannot tie one to you. We may need to
              verify that the information belongs to you. Do not send identity documents unless a
              proportionate verification method has first been agreed. Your legal rights depend on
              your location.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold">Scope and changes</h2>
            <p className="text-muted-foreground">
              This notice describes Shield version 0.1.1 and later releases with the same data
              handling practices. Earlier versions behaved differently: 0.1.0 asked for a click
              before any site-age check, and 0.0.16 and older asked for a click before anything at
              all. Development builds and separately operated servers may also differ. If your
              administrator configures another server, ask that operator about its privacy
              practices.
            </p>
            <p className="text-muted-foreground">
              The extension contains no advertising, analytics or crash-reporting SDK. Visits to the
              Raisedash website, including this page, are separately covered by our{" "}
              <Link className="underline" href="/privacy-policy">
                website privacy policy
              </Link>
              . We will update this notice when practices change and tell you inside the product
              before materially expanding what is sent.
            </p>
          </section>
        </article>
      </Container>
    </PageLayout>
  );
}
