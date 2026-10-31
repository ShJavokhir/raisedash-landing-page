// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Collect Driver Receipts in Telegram",
    description:
      "Type “receipt” in your Telegram group and we send a link to capture it. Every receipt shows up in one dashboard, so paying drivers back is easy. No app for drivers.",
  },
  hero: {
    title: "Collect driver receipts in Telegram.",
    body: "Just type the word “receipt” in your Telegram group, and we’ll send a link to capture it. Every receipt shows up in your dashboard, so you know who to pay back and how much.",
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
      title: "Ask for the receipt",
      description:
        "Ask in your Telegram group, like “Mike, could you share your receipt?” We reply with a link.",
    },
    photo: {
      title: "The driver sends a photo",
      description:
        "The link opens on the driver’s phone. They take a photo of the receipt and type the total.",
    },
    dashboard: {
      title: "All receipts in one dashboard",
      description:
        "Every driver’s receipts in one list, with the amount and the photos. No digging through chats when it’s time to pay drivers back.",
    },
  },
  features: {
    heading: "What you get",
    files: {
      title: "Photos, PDFs, and videos",
      text: "Up to 5 files on one receipt. Take a new photo or pick one from the phone.",
    },
    link: {
      title: "A link for every receipt",
      text: "Open it to see the photos and the amount. Send it to accounting or keep it for later.",
    },
    expenses: {
      title: "Lumpers, fuel, tolls, and more",
      text: "Any receipt a driver gets on the road. Scale tickets, parking, and repairs work the same way.",
    },
    noApp: {
      title: "No app to install",
      text: "The link opens right on the phone. No app, no account, no password.",
    },
    fastPhotos: {
      title: "Photos send fast",
      text: "We make photos smaller before they upload, so they send fast, even on a weak signal.",
    },
    aiCheck: {
      title: "Check if receipts are AI generated",
      text: "We’ll check each receipt photo and warn you if it looks AI generated, before you pay the driver back.",
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
        "Request a demo. We’ll show your team how it works and help set it up in your drivers’ groups.",
    },
    {
      question: "Does it pay drivers back?",
      answer:
        "No. You pay drivers the way you do now. We put every receipt in one list with the driver, the amount, and the photos, so you know who to pay and how much.",
    },
    {
      question: "What if a driver types the wrong amount?",
      answer:
        "You can fix the amount or delete the receipt in the dashboard. The receipt link shows the change.",
    },
    {
      question: "Does it read the amount from the photo?",
      answer:
        "No. The driver types the total. The photos stay with the receipt, so you can check the amount.",
    },
    {
      question: "What can drivers send?",
      answer:
        "Photos, PDFs, and videos. Up to 5 files on one receipt, up to 100 MB each. The amount is in US dollars.",
    },
    {
      question: "How long does the link work?",
      answer: "24 hours. After that, just type “receipt” again for a new link.",
    },
  ],
  start: {
    heading: "Start collecting receipts",
    body: "Get a demo. We’ll show you how it works and help set it up for your groups.",
  },
};

export type Copy = typeof en;
