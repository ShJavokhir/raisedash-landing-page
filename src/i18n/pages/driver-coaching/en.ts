// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Driver Coaching Software for Trucking Fleets",
    description:
      "Send drivers a short coaching lesson with their dashcam clip after a safety event. Assign it automatically from Samsara and Motive, and keep a record of every coaching.",
  },
  hero: {
    title: "Coach drivers the day it happens.",
    body: "Send a short lesson with the dashcam clip. The driver finishes it on their phone.",
    worksWith: "Works with Samsara and Motive.",
    motionLabel:
      "A following-distance event for Mike shows up in the Raisedash Safety list and a rule sends him a lesson, he watches his own dashcam clip and the lesson on his phone, and the event turns to Coached.",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  twoWays: {
    heading: "The camera saw it. Then what?",
  },
  parts: {
    clip: {
      title: "The driver sees exactly what you saw",
      text: "They watch their own clip, then a short lesson, then answer a few questions.",
      points: [
        "A few minutes, on their phone.",
        "You see when they finished and how they answered.",
      ],
    },
    automatic: {
      title: "Samsara and Motive events assign it for you",
      text: "Set a rule once, like 3 following-distance events in 7 days, and we send the lesson.",
      points: ["Send right away, or wait for your OK.", "One set of rules for a mixed fleet."],
    },
    anyEvent: {
      title: "Coach for what the camera can’t see",
      text: "An accident, a roadside violation, a customer complaint. Pick the driver and the lesson.",
      points: ["Works without a telematics connection.", "Send to one driver or many."],
    },
  },
  record: {
    heading: "Proof you coached, when it matters",
    body: "After a crash, lawyers ask for your dashcam events. Flagged events with no coaching after them look like you knew and did nothing.",
    kept: "Raisedash keeps the event, the lesson, and when the driver finished it.",
    /** Around the "ATRI" source link: "… 2018 (ATRI). Not legal advice." */
    sourceBefore: "Average trucking verdicts grew from $2.3M in 2010 to $22.3M in 2018 (",
    sourceAfter: "). Not legal advice.",
  },
  features: {
    policy: {
      title: "Lessons from your policy",
      text: "Describe the rule. AI drafts the lesson, you approve it.",
    },
    rank: {
      title: "See who needs it most",
      text: "Drivers ranked by events per 1,000 miles, not raw counts.",
    },
    driverPage: {
      title: "Next to orientation",
      text: "Onboarding and every coaching on one driver page.",
    },
  },
  /** Cameras already make drivers wary. Say why this feels fair, briefly. */
  fairness: {
    heading: "Fair to drivers",
    items: [
      { title: "They see the clip", text: "Not a summary of it." },
      { title: "You skip false alerts", text: "So coaching only goes out when it fits." },
      { title: "Only theirs", text: "No driver sees a coworker’s events." },
    ],
  },
  faq: {
    heading: "Questions",
    items: [
      {
        question: "Do I need Samsara or Motive?",
        answer:
          "No. You can send coaching by hand for anything. Connecting Samsara or Motive adds the clips and automatic rules.",
      },
      {
        question: "We already coach in Samsara or Motive. Why add this?",
        answer:
          "Raisedash covers events the camera doesn’t see, gives a mixed fleet one set of rules, and keeps coaching on the same record as training. Switch camera vendors and your history stays.",
      },
      {
        question: "Do drivers need an app?",
        answer: "No. They get a text with a link and sign in with a 6-digit code.",
      },
      {
        question: "What if the camera got it wrong?",
        answer: "Skip it. With approve-first rules, a false alert never reaches the driver.",
      },
      {
        question: "Does Raisedash decide fault or discipline?",
        answer: "No. We send coaching and keep the record. What happens next is up to you.",
      },
      {
        question: "How do I get started?",
        answer: "Get a demo. We’ll share pricing and help you send your first coaching.",
      },
    ],
  },
  cta: {
    heading: "Coach it while it’s still fresh",
  },
};

export type Copy = typeof en;
