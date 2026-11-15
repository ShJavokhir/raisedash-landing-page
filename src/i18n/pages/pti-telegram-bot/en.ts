// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Free pre-trip inspections in Telegram",
    description:
      "Drivers follow your checklist and send inspection photos to your Telegram group. Free to start, no app or signup. Paid plan adds PDFs and unlimited history.",
  },
  hero: {
    title: "Pre-trip inspections in Telegram.",
    body: "Drivers follow your checklist step by step and send photos, videos, and reported problems straight to your Telegram group.",
    cta: "Add @raisedashbot",
    note: "Free. No signup or payment required.",
    motionLabel:
      "The Raisedash bot asks for an inspection in a Telegram group, the driver photographs each checklist step on their phone, and the report with 12 photos comes back to the group.",
    watchDemo: "Watch the full demo on YouTube",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  demo: {
    heading: "Watch the full demo",
    body: "See how a driver completes a pre-trip inspection in a real Telegram group with @raisedashbot.",
    youtube: "Watch on YouTube",
    title: "Raisedash PTI Telegram bot demo",
  },
  benefits: {
    heading: "What the bot does for your fleet",
    noApp: {
      title: "No app or account for drivers",
      description:
        "Drivers open the inspection link from Telegram in their browser. No extra app, no signup, no password.",
    },
    problems: {
      title: "Drivers report problems before leaving",
      description:
        "Worn tires, broken lights, or visible damage: drivers flag issues and send photos to the office.",
    },
    record: {
      title: "Photos and problems kept together",
      description:
        "Every inspection has its photos, reported problems, and timestamp in one place for audits or reviews after an accident.",
    },
  },
  faq: {
    question: "Are pre-trip inspections required?",
    required: "Yes. FMCSA requires drivers to check that the vehicle is safe before driving.",
    and: "and",
    dvir: "A written DVIR is generally not required when no defects are found or reported.",
    scope:
      "The bot records what drivers submit. It does not certify that a truck is safe or replace required DVIR signatures and repair records.",
  },
  screenshots: {
    request: {
      title: "In your driver group",
      description: "The bot sends an inspection link directly to your Telegram group.",
      alt: "A driver Telegram group with a PTI request and the Raisedash bot replying with an inspection link.",
    },
    settings: {
      title: "Checklist and automatic requests",
      description:
        "Choose what drivers check. Request inspections on a schedule or after a few days without one.",
      alt: "Group settings showing scheduled and inactivity-based inspection requests, plus an inspection checklist.",
    },
    report: {
      title: "Inspection reports",
      description:
        "Review the photos, videos, and reported problems. Share the report with a link.",
      alt: "A submitted pre-trip inspection report with the inspection time, truck photos, and no problems reported. Identifying details are redacted.",
    },
  },
  plans: {
    heading: "Free and paid plans",
    free: {
      name: "Free",
      label: "Free plan",
      cta: "Start free in Telegram",
      features: [
        "Guided photo and video inspections",
        "Custom inspection checklist",
        "Scheduled or inactivity-based requests",
      ],
      history: (days: number) => `${days} days of inspection history`,
    },
    paid: {
      name: "Paid",
      label: "Paid plan",
      cta: "Ask about pricing",
      features: [
        "Everything in Free",
        "Update settings across all groups at once",
        "Unlimited inspection history",
        "Download inspection reports as PDFs",
        "Request custom features",
        "Onboarding support for your team",
        "Data processing agreement (DPA)",
        "API access",
        "Webhooks",
        "Use your own storage for maximum privacy",
      ],
    },
    storageNote: (days: number) =>
      `We store free inspection records for up to ${days} days. Subscribe to access older records still in storage.`,
  },
  gallery: {
    close: "Close screenshot viewer",
    previous: "Previous screenshot",
    next: "Next screenshot",
    zoomIn: "Zoom in",
    fitImage: "Fit image",
    enlarge: (title: string) => `Enlarge screenshot: ${title}`,
  },
};

export type Copy = typeof en;
