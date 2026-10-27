// English is the source text; every other language is typed against it.
// Keep in step with the extension's store listing (cargo-security/docs/STORE_PASTE_SHEET_0.1.2.md).
export const en = {
  seo: {
    title: "Raisedash Shield – Freight Fraud Protection",
    description:
      "Free Chrome extension for trucking: freight fraud protection that warns about the phishing pages and fake rate confirmations behind cargo and identity theft.",
  },
  hero: {
    status: "Chrome extension · Free",
    title: "Raisedash Shield",
    lead: "Freight fraud often starts with one click. Shield warns you before a phishing page gets your load-board login or a fake rate confirmation gets your computer.",
    body: "Built for dispatchers, drivers and trucking offices. Cargo theft, double brokering and carrier identity theft often begin with a stolen login or a program that hands a stranger your computer. Shield watches the browser moments those attacks use (typing a password, uploading your documents, opening a download, pasting a command) and stays quiet everywhere else.",
    release:
      "No account or payment is required. Install it from the Chrome Web Store and it is working; there is nothing to set up.",
    privacyLink: "Read Shield’s privacy notice",
    contactSupport: "Contact support",
  },
  checks: {
    heading: "Where Shield steps in",
    items: [
      [
        "Phishing pages",
        "When a page asks for your password or a file upload, Shield checks when the site was registered and warns you if it is only days or weeks old. Real load boards and broker portals have been around for years.",
      ],
      [
        "Fake rate confirmations",
        "A download that is really a program (like “RateConfirmation.pdf.exe”) or a remote-access installer is paused until you decide.",
      ],
      [
        "Fake “verify you’re human” commands",
        "When a page puts a “press Windows + R and paste” command on your clipboard, Shield replaces it with a warning and lets you restore it.",
      ],
      [
        "Reported fraud sites",
        "A warning on any site on Raisedash’s list of confirmed scam sites. Every entry was reported by a carrier and confirmed by a person before it was added.",
      ],
    ],
  },
  consent: {
    heading: "On from install, and what leaves your computer",
    local:
      "The scam-list check, the download pause and the clipboard protection work on your computer and send nothing about the sites you visit. Shield never reads what you type into a password field or the contents of a downloaded file.",
    updates:
      "Site-age checks are the one thing that sends something: only when a page asks for a password or a file upload, or after Shield stops a download or a copied command on it, Shield sends that site’s hostname — never the rest of the address, what you type or page contents — so it can tell how old the site is. They are on from install and can be turned off any time in the shield’s menu. The scam list is downloaded about every 30 minutes; the update service sees ordinary connection details such as your IP address. A report is sent only when you press Send report or This warning is wrong.",
  },
  limits: {
    heading: "An extra check, with limits",
    coverage:
      "Shield cannot catch every scam, verify a carrier, broker or load, or guarantee that a page is safe. It does not replace antivirus software or your existing carrier-verification process. Warnings never block a site; you can always continue.",
    gaps: "Some small downloads finish before they can be paused. A page can sometimes copy a command before an embedded frame can be checked. Confirm unexpected password, document, payment or download requests by phone, using a number you already have.",
    operator:
      "Raisedash Shield is operated by LoadHunter Inc. References to freight services describe detection coverage and do not imply affiliation or endorsement.",
  },
};

export type Copy = typeof en;
