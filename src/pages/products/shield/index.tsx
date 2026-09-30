import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

const checks = [
  [
    "Lookalike freight logins",
    "Warnings when supported freight branding or a sign-in address shows signs of impersonation.",
  ],
  [
    "Programs disguised as paperwork",
    "Warnings about suspicious download names and types, with a pause when the browser allows it.",
  ],
  [
    "Scam instructions",
    "Warnings about supported command-pasting, sign-in-code and identity-document request patterns.",
  ],
  [
    "Reviewed threat reports",
    "Optional reports go to a person for review. A report alone never adds a site to the warning list.",
  ],
];

export default function Shield() {
  return (
    <PageLayout
      title="Raisedash Shield"
      description="Local browser warnings for freight phishing, disguised downloads and scam instructions."
    >
      <Container className="bg-card border-border mt-12 rounded-xs border px-6 py-16 sm:px-12">
        <div className="max-w-3xl">
          <p className="text-muted-foreground mb-4 text-sm">
            Chrome extension · Preparing for public release
          </p>
          <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
            Raisedash Shield
          </h1>
          <p className="text-foreground mt-6 text-xl leading-relaxed">
            Notice suspicious freight sites before you sign in, share documents or open a download.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Built for dispatchers, drivers and carrier office teams. Shield checks supported warning
            signs in your browser and explains what to look at before continuing.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            The first release is being tested for the Chrome Web Store. No account or payment is
            required to use the extension.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <Link
              href="/products/shield/privacy"
              className="text-foreground underline underline-offset-4"
            >
              Read Shield’s privacy notice
            </Link>
            <a
              href="mailto:support@raisedash.com"
              className="text-foreground underline underline-offset-4"
            >
              Contact support
            </a>
          </div>
        </div>
      </Container>
      <Container className="bg-card border-border mt-6 rounded-xs border px-6 py-12 sm:px-12">
        <h2 className="text-foreground text-2xl font-semibold">A warning with a reason</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {checks.map(([title, description]) => (
            <section key={title}>
              <h3 className="text-foreground text-lg font-medium">{title}</h3>
              <p className="text-muted-foreground mt-2 leading-relaxed">{description}</p>
            </section>
          ))}
        </div>
      </Container>
      <Container className="bg-card border-border mt-6 rounded-xs border px-6 py-12 sm:px-12">
        <div className="max-w-3xl space-y-4 text-base leading-relaxed">
          <h2 className="text-foreground text-2xl font-semibold">
            You choose when protection starts
          </h2>
          <p className="text-muted-foreground">
            Read the data explanation, then choose Enable protection. Automatic checks stay on your
            computer. They do not upload the pages you visit, clipboard contents or pasted text, and
            they do not read password-field values or downloaded file contents.
          </p>
          <p className="text-muted-foreground">
            After you enable it, Shield downloads detection updates about every 30 minutes. The
            update service receives connection details such as your IP address. Updates continue if
            you later turn page protection off. Sending a report is a separate, explicit action.
          </p>
          <h2 className="text-foreground pt-4 text-2xl font-semibold">
            An extra check, with limits
          </h2>
          <p className="text-muted-foreground">
            Shield cannot catch every scam, verify a carrier or guarantee that a page is safe. It
            does not replace antivirus software or your existing carrier-verification process. Its
            current detection vocabulary mainly covers English-language U.S. freight workflows.
          </p>
          <p className="text-muted-foreground">
            A page can sometimes copy a command before an embedded frame can be checked. A warning
            does not guarantee the copied text was blocked. Some small downloads finish before they
            can be paused. You can continue past warnings and turn page protection off. Confirm
            unexpected requests using a phone number or contact you already trust.
          </p>
          <p className="text-muted-foreground">
            Raisedash Shield is operated by LoadHunter Inc. References to freight services describe
            detection coverage and do not imply affiliation or endorsement.
          </p>
        </div>
      </Container>
    </PageLayout>
  );
}
