// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Driver receipts in Telegram",
    description:
      "Collect fuel, lumper, toll, and repair receipts from drivers in Telegram. No app, no account. They tap a link, snap a photo, type the total. One dashboard.",
  },
  hero: {
    title: "Collect driver receipts in Telegram.",
    body: "Type “receipt” in your drivers’ Telegram group and the bot replies with a link. The driver taps it, photographs the receipt, and types the total in dollars. Every receipt lands in one dashboard with the driver, the amount, and the photos.",
    note: "We’ll set it up for your groups.",
    motionLabel:
      "In a drivers’ Telegram group, the office asks Mike for his receipt, Mike photographs it and types the $175 total on his phone, and it lands in the office’s receipts dashboard, where the totals, the daily spending chart and the top drivers update.",
    watchDemo: "Watch the full demo on YouTube",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  demo: {
    heading: "Watch the demo",
    body: "A real receipt, sent from a real phone. See how it gets from the Telegram group to your dashboard.",
    youtube: "Watch on YouTube",
    title: "Raisedash receipts bot demo",
  },
  how: {
    heading: "How it works",
  },
  steps: {
    ask: {
      title: "Type “receipt” in the group",
      description:
        "The bot replies with a link. The driver opens it in their phone’s browser. No app, no account, no password.",
    },
    photo: {
      title: "The driver photographs the receipt",
      description:
        "Take a photo or pick a file, then type the total. Photos are compressed before upload so they send on a weak signal.",
    },
    dashboard: {
      title: "Every receipt in one dashboard",
      description:
        "Each receipt shows the driver, the amount, and the files. Every receipt has its own shareable link you can send to accounting.",
    },
  },
  features: {
    heading: "What you get",
    expenses: {
      title: "Lumpers, fuel, tolls, and more",
      text: "Any receipt a driver gets on the road: scale tickets, parking, repairs. They all work the same way.",
    },
    fastPhotos: {
      title: "Photos send on a weak signal",
      text: "We compress photos before upload, so they send quickly even on a slow connection.",
    },
    aiCheck: {
      title: "AI receipt detection, coming soon",
      text: "We will check each receipt photo and warn you if it looks AI generated, before you pay the driver back.",
      badge: "Coming soon",
    },
  },
  faq: {
    heading: "Questions",
  },
  faqs: [
    {
      question: "How do I get started?",
      answer:
        "Request a demo. We’ll show your team how it works and set it up in your drivers’ groups.",
    },
    {
      question: "Does it pay drivers back?",
      answer:
        "No. You pay drivers the way you do now. The dashboard puts every receipt in one list with the driver, the amount, and the photos, so you know who to pay and how much.",
    },
    {
      question: "What if a driver types the wrong amount?",
      answer:
        "You can fix the amount or delete the receipt in the dashboard. The receipt link shows the updated amount.",
    },
    {
      question: "Does it read the amount from the photo?",
      answer:
        "No. The driver types the total. The photos stay with the receipt so you can check the number.",
    },
    {
      question: "What can drivers send?",
      answer:
        "Photos, PDFs, and videos. Up to 5 files per receipt, up to 100 MB each. The amount is in US dollars.",
    },
    {
      question: "How long does the link work?",
      answer: "24 hours. After that, type “receipt” again for a new link.",
    },
  ],
  start: {
    heading: "Start collecting receipts",
    body: "Request a demo. We’ll show you how it works and set it up for your groups.",
  },
};

export type Copy = typeof en;
