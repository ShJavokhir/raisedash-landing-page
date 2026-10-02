/** Products share the homepage grid and company navigation, with a dedicated page for each. */
export const products = [
  {
    name: "Driver Orientation Platform",
    description:
      "Send orientation and company policies to your drivers’ phones before they arrive, track their progress, and keep their training records in one place.",
    href: "/products/orientation",
    plate: "#0064e6",
    icon: { src: "/brand/orientation-icon.webp", width: 329, height: 288 },
  },
  {
    name: "Driver Paperwork",
    description:
      "Send driver applications, documents to sign, and requests for files like a CDL or medical card. Drivers finish them on their phone and you get a clean PDF.",
    href: "/products/driver-paperwork",
    plate: "#0f7d8c",
    icon: { src: "/brand/paperwork-icon.webp", width: 284, height: 288 },
  },
  {
    name: "PTI & DVIR Collector",
    description:
      "Collect pre- and post-trip inspection photos, videos, and reported problems through your driver Telegram groups.",
    href: "/products/pti-telegram-bot",
    plate: "#9aa200",
    icon: { src: "/brand/pti-icon.webp", width: 298, height: 288 },
  },
  {
    name: "Receipts Collector",
    description:
      "Collect fuel, lumper, and repair receipts from drivers in your Telegram groups, with photos and the amount.",
    href: "/products/receipts-telegram-bot",
    plate: "#365c93",
    icon: { src: "/brand/receipts-icon.webp", width: 302, height: 288 },
  },
  {
    name: "Driver Feedback Collector",
    description:
      "Find out why drivers leave your company. Collect anonymous driver feedback through Telegram and use it to improve your company culture.",
    href: "/products/feedback-telegram-bot",
    plate: "#f87917",
    icon: { src: "/brand/feedback-icon.webp", width: 281, height: 288 },
  },
  {
    name: "Samsara to Telegram",
    description:
      "Get Samsara safety events, dashcam clips, speeding alerts, engine faults, and weekly fleet reports in Telegram.",
    href: "/tools/samsara-alerts",
    plate: "#009a74",
    icon: { src: "/brand/samsara-icon.webp", width: 370, height: 288 },
  },
  {
    name: "RingCentral to Telegram",
    description:
      "Monitor your team’s RingCentral call recordings in Telegram for quality assurance. Keep track of missed calls and voicemails too.",
    href: "/products/ringcentral-telegram",
    plate: "#a8325e",
    icon: { src: "/brand/ringcentral-icon.webp", width: 449, height: 288 },
  },
  {
    name: "DOT Compliance Course",
    description:
      "Learn about driver files, hours of service, audits, and other compliance tasks through short video lessons, quizzes, and practical forms.",
    href: "https://academy.raisedash.com",
    plate: "#cc3d33",
    icon: { src: "/brand/course-icon.webp", width: 414, height: 288 },
  },
  {
    name: "TruckTalk ELP Practice",
    description:
      "Help your company’s drivers improve their English for CDL driving. They learn trucking vocabulary and road signs, and practice roadside conversations with an AI DOT officer.",
    href: "/tools/elp-practice",
    plate: "#6d4bd8",
    icon: { src: "/brand/elp-icon.webp", width: 302, height: 288 },
  },
  {
    name: "Raisedash Shield",
    description:
      "Local browser warnings for freight phishing, disguised downloads and scam instructions. Preparing for public release.",
    href: "/products/shield",
    plate: "#315b50",
    icon: { src: "/brand/shield-icon.webp", width: 295, height: 288 },
  },
];

export type Product = (typeof products)[number];
