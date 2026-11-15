// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Get a demo of Raisedash",
    description:
      "See any Raisedash tool in a demo for your trucking company. We’ll show you how it works, share pricing, and help you set it up.",
  },
  hero: {
    title: "Get a demo and get set up",
    body: (productName?: string) =>
      productName
        ? `We’ll show you how ${productName} works, share pricing, and help you set it up. Pick the easiest way to reach us.`
        : "Tell us which tool you’re interested in. The Raisedash team will show you how it works, share pricing, and help you set it up.",
  },
  choices: {
    aria: "Ways to reach us",
    telegram: "Message us on Telegram",
    email: "Email us",
    booking: "Book a call",
    bookingNote: "Pick a time that works for you.",
    details: "Leave your details",
    detailsNote: "We’ll reach out to set up your demo.",
  },
  emailHelp: {
    body: "Email app didn’t open? Copy our address and send us an email from any app.",
    copy: "Copy",
    copied: "Copied",
  },
  back: "Other ways to reach us",
  formSectionAria: "Request a demo",
  telegramHelp: {
    noTelegram: (email: string) =>
      `No Telegram? Email us at ${email}, or leave your details and we’ll reach out.`,
    leaveDetails: "Leave your details",
  },
  form: {
    heading: "Tell us what you need.",
    intro: "A few details so we know which tool to show you.",
    noscript:
      "Please enable JavaScript to use this form, or use the email and Telegram links to contact us.",
    legend: "Your contact details and product interests",
    fullName: "Full name",
    email: "Email address",
    phone: "Phone number (optional)",
    phonePlaceholder: "Include country code",
    company: "Company (optional)",
    interests: "Products you’re interested in",
    interestsPlaceholder: "Which tools do you want to see? What problem are you trying to solve?",
    submit: "Send request",
    submitAria: "Send request",
    sendingAria: "Sending request",
    sending: "Sending request…",
    privacyNote: "We’ll use your details to respond to your request.",
    privacyLink: "Privacy policy",
  },
  errors: {
    verifyFirst: "Please complete the verification below before sending your request.",
    sendFailed: "We couldn’t send your request. Please try again.",
    unconfirmed:
      "We couldn’t confirm your request was received. Please try again, email us, or contact us on Telegram.",
    verifyLoad: "Verification couldn’t load. Try again, or use email or Telegram to reach us.",
  },
  success: {
    title: "Got it. We’ll be in touch.",
    body: "We have your details and will reach out to arrange the demo.",
    explore: "Explore our products",
  },
  /**
   * Messages that arrive in English from code we don't translate: the form's zod
   * validation (src/lib/demo-request.ts) and /api/product-demo errors. Keyed by the
   * exact English text and applied at render; an unknown message shows as sent.
   */
  serverMessages: {} as Record<string, string>,
};

export type Copy = typeof en;
