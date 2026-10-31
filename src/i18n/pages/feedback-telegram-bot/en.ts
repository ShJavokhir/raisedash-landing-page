// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Anonymous Driver Surveys in Telegram",
    description:
      "Find out why drivers leave. Send an anonymous survey to your drivers’ Telegram groups and see pay, home time, and dispatch scores in one dashboard. No app for drivers.",
  },
  hero: {
    title: "Find out why drivers leave. Before the next one does.",
    body: "Just pick a survey and your Telegram groups, and we’ll post the link. Drivers answer anonymously on their phone. You see if it’s pay, home time, dispatch, or the truck.",
    note: "We’ll set it up for your groups.",
    motionLabel:
      "The office sends the Pay and home time survey to 48 drivers’ Telegram groups, drivers answer anonymously on their phones, and the results show home time scoring lowest.",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  how: {
    heading: "How it works",
    steps: [
      {
        title: "Pick a survey",
        description:
          "Start from a ready-made one like “Pay and home time”, or write your own. Choose anonymous or named.",
      },
      {
        title: "Send it to your groups",
        description:
          "Just pick your drivers’ Telegram groups, and we’ll post the link in each one. Drivers answer on their phone in about a minute.",
      },
      {
        title: "See what to fix first",
        description:
          "Every score, percentage, and written answer in one dashboard. Start with the lowest score.",
      },
    ],
  },
  features: {
    heading: "What you get",
    leaving: {
      title: "Hear it before they quit",
      text: "Ask “Are you thinking about leaving?” every month. When “Maybe” starts to grow, you still have time to fix it.",
    },
    anonymous: {
      title: "Anonymous, so they’re honest",
      text: "We don’t save a name, a group, or a Telegram account with the answer. Drivers tell you what they won’t tell dispatch.",
    },
    templates: {
      title: "Six ready-made surveys",
      text: "Pay, home time, dispatch, equipment, safety, and new drivers. Pick one, change what you like, and send it.",
    },
    groups: {
      title: "Every group at once",
      text: "Search by group, driver, or truck, then select all. We post the link in every group, even if you have hundreds.",
    },
    noApp: {
      title: "No app for drivers",
      text: "Drivers tap the link in the group and answer on their phone. No app, no account, no password.",
    },
    newDrivers: {
      title: "Check on new drivers",
      text: "Ask at 30 days how the first month went and whether the office has their back.",
    },
  },
  faq: {
    heading: "Questions",
    items: [
      {
        question: "How do I get started?",
        answer:
          "Request a demo. We’ll show you how it works, share pricing, and help set it up for your groups.",
      },
      {
        question: "Can I see who is thinking about leaving?",
        answer:
          "Not in an anonymous survey. You see how many and why, not who. If you need names to follow up, send a named survey. Drivers add their name to their answers.",
      },
      {
        question: "Is it really anonymous?",
        answer:
          "We don’t save a name, a Telegram account, or the group with an anonymous answer. In a very small group, or if a driver writes about something only they did, you may still guess who wrote it.",
      },
      {
        question: "Can I write my own questions?",
        answer:
          "Yes. Written answers, single or multiple choice, and 1 to 5 ratings. Up to 20 questions in one survey.",
      },
      {
        question: "Can I ask the same questions next month?",
        answer:
          "Yes. Duplicate the survey and send it again. Each round keeps its own answers, so you can see if things got better.",
      },
      {
        question: "Can a driver answer twice?",
        answer:
          "The page stops accidental double sends. It doesn’t check who the driver is, so anyone with the link can answer while the survey is open.",
      },
    ],
  },
  cta: {
    heading: "Ask your drivers what would make them stay",
    body: "Get a demo. We’ll show you how it works, share pricing, and help set it up for your groups.",
  },
};

export type Copy = typeof en;
