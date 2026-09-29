/** Products share the homepage grid and company navigation, with a dedicated page for each. */
export const products = [
  {
    name: "Raisedash Orientation",
    description:
      "Send orientation to drivers’ phones before they arrive, track their progress, and keep their training records in one place.",
    href: "/products/orientation",
    plate: "#0064e6",
  },
  {
    name: "PTI & DVIR Bot",
    description:
      "Collect pre- and post-trip inspection photos, videos, and reported problems through your driver Telegram groups.",
    href: "/products/pti-telegram-bot",
    plate: "#9aa200",
  },
  {
    name: "Receipts Bot",
    description:
      "Collect fuel, lumper, and repair receipts from drivers in your Telegram groups, with photos and the amount.",
    href: "/products/receipts-telegram-bot",
    plate: "#009a74",
  },
  {
    name: "Feedback Bot",
    description:
      "Find out why drivers leave. Send anonymous surveys to their Telegram groups and see what to fix in one dashboard.",
    href: "/products/feedback-telegram-bot",
    plate: "#365c93",
  },
  {
    name: "Samsara to Telegram",
    description:
      "Get Samsara safety events, dashcam clips, speeding alerts, engine faults, and weekly fleet reports in Telegram.",
    href: "/tools/samsara-alerts",
    plate: "#f87917",
  },
  {
    name: "DOT Compliance Course",
    description:
      "Learn about driver files, hours of service, audits, and other compliance tasks through short video lessons, quizzes, and practical forms.",
    href: "https://academy.raisedash.com",
    plate: "#cc3d33",
  },
  {
    name: "TruckTalk ELP Practice",
    description:
      "Practice trucking vocabulary and roadside conversations in English, including spoken roleplay with an AI DOT officer.",
    href: "/tools/elp-practice",
    plate: "#be52ff",
  },
];

export type Product = (typeof products)[number];
