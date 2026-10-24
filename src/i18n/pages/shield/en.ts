// English is the source text; every other language is typed against it.
// Keep in step with the extension's store listing (cargo-security/docs/STORE_PASTE_SHEET_0.1.1.md).
export const en = {
  seo: {
    title: "Raisedash Shield",
    description:
      "A Chrome extension that warns carriers about confirmed scam sites, brand-new sites that ask for passwords or documents, and fake paperwork downloads.",
  },
  hero: {
    status: "Chrome extension · Free",
    title: "Raisedash Shield",
    lead: "Notice a freight scam site before you type a password, upload your documents or open a download.",
    body: "Built for dispatchers, drivers and carrier office teams. Scam sites are usually days old, ask for your load-board password or carrier documents, and send “rate confirmations” that are really programs. Shield warns about what it can be sure of and stays quiet everywhere else.",
    release:
      "No account or payment is required. Install it from the Chrome Web Store and it is working; there is nothing to set up.",
    privacyLink: "Read Shield’s privacy notice",
    contactSupport: "Contact support",
  },
  checks: {
    heading: "Four checks, each with a reason",
    items: [
      [
        "Confirmed scam sites",
        "A warning on any site on Raisedash’s list of confirmed scam sites. Every entry was reported by a carrier and confirmed by a person before it was added.",
      ],
      [
        "Brand-new sites asking for passwords or documents",
        "When a page asks for your password or a file upload, Shield checks when the site was registered and warns you if it is only days or weeks old.",
      ],
      [
        "Programs disguised as paperwork",
        "A download that is really a program (like “RateConfirmation.pdf.exe”) or a remote-access installer is paused until you decide.",
      ],
      [
        "Scam commands on the clipboard",
        "When a page puts a “press Windows + R and paste” command on your clipboard, Shield replaces it with a warning and lets you restore it.",
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
