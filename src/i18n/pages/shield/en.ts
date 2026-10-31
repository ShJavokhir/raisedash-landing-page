// English is the source text; every other language is typed against it.
// Keep in step with the extension's store listing (cargo-security/docs/STORE_PASTE_SHEET_0.1.2.md).
// The numbers in `problem` were read on their sources on 2026-10-27 (links in `problem.sources`).
export const en = {
  seo: {
    title: "Raisedash Shield – Freight Fraud Protection",
    description:
      "Free Chrome extension for trucking and freight offices. Warns your whole team about the phishing pages and fake rate confirmations behind cargo and identity theft.",
  },
  hero: {
    eyebrow: "Raisedash Shield · Free Chrome extension",
    title: "Freight fraud starts with one click. Shield warns you first.",
    body: "For everyone in your company who works on the web all day: dispatch, safety, billing, accounting and the owner. Thieves only need one of them to click. Shield warns when a brand-new site asks for a password or documents, when a “rate confirmation” is really a program, and when a page tries to make you run a command.",
    cta: "Add to Chrome, it’s free",
    note: "No account, nothing to set up.",
    motionLabel:
      "A dispatcher gets a load offer by email and clicks View load. A sign-in page that looks like a load board opens. Before she types her password, Raisedash Shield shows a warning in the corner: this site was registered 3 days ago and asks for your password. She leaves. Next, a rate confirmation download turns out to be a program, RateConfirmation.pdf.exe. Shield pauses it and she deletes it.",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  problem: {
    heading: "Cargo theft now starts on a computer",
    body: "Thieves don’t need to break into a trailer anymore. They steal a login or get a program onto an office computer, then book loads in your name, change where you get paid, or send a load to the wrong place.",
    stats: [
      {
        value: "$725M",
        text: "Nearly that much was lost to cargo theft in the US and Canada in 2025, up 60% from 2024.",
        source: "CargoNet, quoted by the FBI",
      },
      {
        value: "$273,990",
        text: "The average loss per theft in 2025, up 36% in a year.",
        source: "CargoNet, quoted by the FBI",
      },
      {
        value: "25%",
        text: "Of cargo thefts in 2023 were done with fraud, like stolen identities and fake credentials. In 2018 it was 2.2%.",
        source: "ATRI",
      },
    ],
    quote:
      "Once clicked, the targeted user is redirected to a phishing website imitating the legitimate one. The phishing website hosts a malicious executable file…",
    quoteSource: "FBI warning to brokers and carriers, April 30, 2026",
    quoteAfter: "That click, that sign-in page and that file are the moments Shield watches.",
    sourcesLabel: "Sources",
    sources: [
      {
        label: "FBI IC3: Cyber-Enabled Strategic Cargo Theft Surging (April 2026)",
        href: "https://www.ic3.gov/PSA/2026/PSA260430",
      },
      {
        label: "ATRI research, in ATA testimony to the House Judiciary Committee (December 2025)",
        href: "https://judiciary.house.gov/sites/evo-subsites/republicans-judiciary.house.gov/files/evo-media-document/spear-testimony.pdf",
      },
    ],
  },
  guards: {
    heading: "Where Shield steps in",
    items: [
      {
        title: "Fake sign-in pages",
        text: "When a page asks for your password, we check when the site was registered. Real load boards and broker portals have been around for years. Phishing sites are usually days old.",
        alt: "A sign-in page at loadboard-signin.com with Raisedash Shield’s warning: This site is brand new. It was registered 3 days ago and asks for your password.",
      },
      {
        title: "Requests for your documents",
        text: "Your CDL, insurance certificate and voided check get a warning first when the site asking for them is brand new.",
        alt: "An upload page asking for a CDL, insurance certificate and voided check, with Raisedash Shield’s warning: This site is brand new. It was registered today and asks you to upload files.",
      },
      {
        title: "Fake rate confirmations",
        text: "A “RateConfirmation.pdf.exe” is a program, not a document. We pause it, and remote-access installers, until you decide.",
        alt: "A rate confirmation page with Raisedash Shield’s warning: Don’t open this file. RateConfirmation.pdf.exe is actually a program, and Shield paused it.",
      },
      {
        title: "Fake “verify you’re human” checks",
        text: "When a page copies a command and tells you to press Windows + R and paste, we swap it for a warning. You can put it back.",
        alt: "A fake security check that says press Windows + R, then Ctrl + V, with Raisedash Shield’s warning: Don’t paste what this page copied.",
      },
    ],
  },
  quiet: {
    heading: "Quiet until it matters",
    body: "On every other site you won’t hear from us. A warning sits in the corner and never blocks the page. You always decide.",
    points: [
      "Free, with no account. Install it and it’s working.",
      "We never read your passwords or what’s inside your files.",
      "Sites on our scam list were reported by a carrier and confirmed by a person. Your browser gets the list about every 30 minutes.",
      "Site-age checks can be turned off any time in the menu.",
    ],
    alt: "Raisedash Shield’s menu on a normal site: Protection on, No warnings, the scam list update time, and the switch for site-age checks.",
  },
  faq: {
    heading: "Questions",
    items: [
      {
        question: "Who is it for?",
        answer:
          "Everyone at your company who works in Chrome on a computer: dispatchers, safety and compliance, billing and accounting, recruiting, and owners. Thieves go after whichever login they need, whether that’s the load board, company email, the factoring portal or the bank, so put it on every office computer. It runs in Chrome on a computer, not on phones.",
      },
      {
        question: "What leaves my computer?",
        answer:
          "The scam-list check, the download pause and the clipboard protection work on your computer and send nothing about the sites you visit. Shield never reads what you type into a password field or the contents of a downloaded file. Site-age checks are the one thing that sends something: only when a page asks for a password or a file upload, or after Shield stops a download or a copied command on it, Shield sends that site’s hostname (never the rest of the address, what you type or page contents) so it can tell how old the site is. They are on from install and can be turned off any time in the shield’s menu. The scam list is downloaded about every 30 minutes; the update service sees ordinary connection details such as your IP address. A report is sent only when you press Send report or This warning is wrong.",
      },
      {
        question: "What can’t it do?",
        answer:
          "Shield cannot catch every scam, verify a carrier, broker or load, or guarantee that a page is safe. It does not replace antivirus software or your existing carrier-verification process. Warnings never block a site; you can always continue. Some small downloads finish before they can be paused. A page can sometimes copy a command before an embedded frame can be checked. Confirm unexpected password, document, payment or download requests by phone, using a number you already have.",
      },
    ],
  },
  cta: {
    heading: "Add Shield to Chrome",
    body: "Free, with no account. It starts working the moment it’s installed.",
    privacyLink: "Read Shield’s privacy notice",
    contactSupport: "Contact support",
    operator:
      "Raisedash Shield is operated by LoadHunter Inc. References to freight services describe detection coverage and do not imply affiliation or endorsement.",
  },
};

export type Copy = typeof en;
