// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Get a risk-free demo",
    description:
      "See how Raisedash can help your trucking company. Contact our team on Telegram, email us, book a call, or leave your details for a product demo.",
  },
  hero: {
    title: "Get a risk-free demo.",
    body: (productName?: string) =>
      productName
        ? `See how ${productName} fits your trucking company. Choose the easiest way to talk to us.`
        : "See how our tools fit your trucking company. Choose the easiest way to talk to us.",
  },
  choices: {
    aria: "Ways to get a demo",
    telegram: "Contact us on Telegram",
    email: "Email us",
    booking: "Book a call",
    bookingNote: "Pick a time that works for you.",
    details: "Leave your details",
    detailsNote: "We’ll reach out to arrange your demo.",
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
    heading: "Tell us what you’re looking for.",
    intro: "A few details so we can help you get started.",
    noscript:
      "Please enable JavaScript to use this form, or use the email and Telegram links to contact us.",
    legend: "Your contact details and product interests",
    fullName: "Full name",
    email: "Email address",
    phone: "Phone number (optional)",
    phonePlaceholder: "Include country code",
    company: "Company (optional)",
    interests: "Products you’re interested in",
    interestsPlaceholder: "Tell us which products you’d like to see and what you need help with.",
    submit: "Request a demo",
    submitAria: "Request a demo",
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
    title: "Thanks. We’ll be in touch.",
    body: "We’ve received your details. Our team will reach out to learn more and arrange your demo.",
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
