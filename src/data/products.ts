/**
 * The five products on the homepage grid. Each keeps its own landing page and
 * purchase/get-started flow.
 *
 * `plate` is the card's flat background, taken unchanged from the 37signals
 * palette. All five cards carry white type. Contrast against white, for the
 * record: cobalt 5.3, brick 4.9, orchid 3.6, olive 2.8, orange 2.7 — the last
 * three are below WCAG AA, chosen deliberately for the look.
 */
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
