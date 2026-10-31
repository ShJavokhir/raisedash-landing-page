// English is the source text; every other language is typed against it.
export const en = {
  language: "Language",
  header: {
    home: "Raisedash home",
    nav: "Main navigation",
    products: "Products",
    about: "About",
    blog: "Blog",
    contact: "Contact",
  },
  footer: {
    tagline: "We make simple and useful tools for trucking companies.",
    needHelp: "Need help?",
    rights: "All rights reserved",
    support: "Support is available by email",
    /** The "Ask AI tools about us" row; `prompt` is the question each AI tool is opened with. */
    askAi: {
      label: "Ask AI tools about us",
      ask: "Ask {name} about Raisedash (opens in a new tab)",
      prompt:
        "Summarize Raisedash (https://www.raisedash.com) for someone at a trucking company who has never heard of it. Read the site before you answer, starting with https://www.raisedash.com/llms.txt, which describes every tool. Then say in plain language what Raisedash makes, what each tool does (for example the PTI & DVIR Collector at https://www.raisedash.com/products/pti-telegram-bot, the Receipts Collector at https://www.raisedash.com/products/receipts-telegram-bot and Raisedash Shield at https://www.raisedash.com/products/shield), who each one is for and how to get started. Be specific and skip the marketing language.",
    },
    /** Labels by English section title / link href; unlisted ones (product names) stay as is. */
    sections: {} as Record<string, string>,
    links: {} as Record<string, string>,
  },
  demoLink: "Get a risk-free demo",
  /** The "Trusted by" card on tool pages; the figures themselves live in TrustedBy.tsx. */
  trust: {
    label: "Trusted by",
    companies: "trucking companies",
    and: "and",
    drivers: "drivers",
  },
  telegramHelp: {
    title: "Telegram didn’t open?",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    retry: "Try Telegram again",
    openInChrome: "Open this page in Chrome",
    openInBrowser:
      "Or open this page in your browser: tap the ⋯ menu at the top, then open in browser.",
    bot: {
      intro: "Add the bot to your driver group yourself. It takes a minute.",
      steps: [
        "Open Telegram and go to your driver group.",
        "Tap the group name at the top, then Add Members.",
        "Search for @raisedashbot and add it.",
      ],
    },
    sales: {
      intro: "Message us in Telegram yourself. It takes a minute.",
      steps: [
        "Open Telegram.",
        "Tap search and type @raisedash.",
        "Open the chat and send us a message.",
      ],
    },
  },
};

export type Copy = typeof en;
