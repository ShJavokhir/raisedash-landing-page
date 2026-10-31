// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Send One Message to All Your Drivers’ Telegram Groups",
    description:
      "Write a message once and we’ll post it in every driver Telegram group. Send company policies, pay changes, and holiday hours to all your drivers in a minute, not one group at a time.",
  },
  hero: {
    title: "Write it once. Every driver group gets it.",
    body: "Just write your message and pick your drivers’ Telegram groups, and we’ll post it in every one. No more pasting the same message into group after group.",
    note: "We’ll set it up for your groups.",
    motionLabel:
      "Someone at the office writes one message in Raisedash, selects all 148 driver groups, and the message shows up in every group's Telegram chat at once.",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  twoWays: {
    heading: "A new policy for 148 drivers",
  },
  how: {
    heading: "How it works",
    steps: [
      {
        title: "Write it once",
        description: "Type your message in Raisedash, the same way you’d write it in a group.",
      },
      {
        title: "Pick the groups",
        description: "Select all, or search and pick only the drivers who need it.",
      },
      {
        title: "Send",
        description:
          "We post it in every group you picked. Drivers read it in the chat they already use, and can reply right there.",
      },
    ],
  },
  examples: {
    heading: "What carriers send",
    policies: {
      title: "Company policies",
      text: "A new rule reaches every driver on the same day.",
    },
    pay: {
      title: "Pay changes",
      text: "Everyone hears it from you at once, not secondhand from another driver.",
    },
    holidays: {
      title: "Holiday hours",
      text: "Who to call while the office is closed.",
    },
    weather: {
      title: "Weather warnings",
      text: "Send it only to the drivers heading into it.",
    },
    safety: {
      title: "Safety reminders",
      text: "Before an inspection week, or after a close call everyone should hear about.",
    },
    phones: {
      title: "New phone numbers",
      text: "A new dispatch line in every group, before anyone needs it.",
    },
  },
  faq: {
    heading: "Questions",
    items: [
      {
        question: "Do drivers need an app?",
        answer:
          "No. Your message shows up in the Telegram group they already use. There’s nothing to install and nothing to log in to.",
      },
      {
        question: "Can I send to only some groups?",
        answer:
          "Yes. Select all, or search and pick the groups you need, like the drivers heading into bad weather.",
      },
      {
        question: "Can drivers reply?",
        answer:
          "Yes. They reply in their group like any other message, and your team answers them there.",
      },
      {
        question: "What do I need to set up?",
        answer: "Our bot needs to be in each group you send to. We’ll help you add it.",
      },
      {
        question: "How do I get started?",
        answer: "Get a demo. We’ll share pricing and help you set it up for your groups.",
      },
    ],
  },
  cta: {
    heading: "Tell every driver at once",
    body: "Get a demo. We’ll share pricing and help you set it up for your groups.",
    trademark:
      "Telegram is a trademark of Telegram Messenger Inc. Raisedash is not affiliated with or endorsed by Telegram.",
  },
};

export type Copy = typeof en;
