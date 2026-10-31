// English is the source text; every other language is typed against it.
export const en = {
  tags: {
    driversPhone: "Driver’s phone",
    yourDashboard: "Your dashboard",
    yourPdf: "Your PDF",
    textMessage: "Text message",
    setOnce: "Set once",
    whenItFires: "When it fires",
  },
  twoWays: {
    before: "Before Raisedash",
    onPaper: "On paper",
    withUs: "With Raisedash",
  },
  paperwork: {
    before: [
      "Print the forms",
      "Hand them over or mail them",
      "Wait for the driver to sign",
      "Scan or fax them back",
      "Ask for a photo of the CDL by text",
      "Call about the missing page",
    ],
    beforeNote: "And the papers end up in a folder, a desk drawer, and someone’s text messages.",
    withUs: [
      "Pick the drivers and what you need",
      "They finish it on their phone",
      "Download the PDF",
    ],
    withUsNote: "Every driver’s paperwork stays on their page in your dashboard.",
  },
  coaching: {
    before: [
      "Watch the clip",
      "Call the driver. Voicemail.",
      "Wait a week for them to get back",
      "Talk it over in the office",
      "Nothing gets written down",
    ],
    withUs: [
      "The lesson goes out with the clip",
      "The driver finishes it on their phone",
      "It’s on their record",
    ],
  },
  announcements: {
    before: (groups: number) => [
      "Open a driver’s group",
      "Paste the message and send",
      "Open the next group",
      `Repeat ${groups} times`,
      "Hope you didn’t skip one",
    ],
    withUs: ["Write the message once", "Select all groups", "Press Send"],
    yourTime: "Your time:",
    beforeTime: "over an hour",
    withUsTime: "about a minute",
  },
  receiptsTour: {
    description:
      "Animation of a Telegram group on two phones. In the office, Sarah writes: Mike, could you share your receipt? The Raisedash bot answers with a button to open receipt capture. On his phone, Mike taps it. His name, truck 104 and trailer 5317 are already filled in, so he types $175.00, takes a photo, and submits. The bot posts Receipt submitted, $175.00, in the group, and Sarah says thanks.",
    play: "Play animation",
    pause: "Pause animation",
    office: "Office",
    driver: "Driver",
  },
  samsaraBoards: {
    label: "Weekly boards",
    safety: {
      tab: "Weekly safety report",
      alt: "Weekly safety report: total events for the week with the change against last week, a bar per event type, and a column per day.",
      note: "Every event type for the week, and whether each one is better or worse than last week.",
    },
    driver: {
      tab: "Driver safety board",
      alt: "Driver safety board: safest and riskiest drivers ranked by events per thousand miles, with driver names redacted.",
      note: "Safest and riskiest drivers, ranked by events per 1,000 miles, not by raw counts.",
    },
    fuel: {
      tab: "Fuel efficiency board",
      alt: "Fuel efficiency board: fleet miles per gallon, estimated fuel spend, and the most and least efficient drivers with idle share, driver names redacted.",
      note: "MPG and idle share per driver, plus what the below-average half is costing you.",
    },
  },
  feedbackDemo: {
    tryAgain: "Try again",
    exampleOnly: "Example only. Nothing is sent.",
  },
  ringcentral: {
    before: [
      "Open your laptop",
      "Log in to RingCentral",
      "Open the call log",
      "Pick the person and the day",
      "Scroll to the right call",
      "Press play",
    ],
    withUs: ["Open Telegram", "Tap play"],
    anatomy: [
      "Who called, with their number.",
      "Who it went to. NO NAME means RingCentral had no name for that number.",
      "When the call started. RingCentral gives this time in UTC.",
      "The recording. If there isn’t one, you see what happened instead, like Missed or Voicemail.",
    ],
    skipTitle: "Posted to the chat",
    skipNote: "Crossed out: never posted.",
    playCall: "Play the example call (no sound)",
    pauseCall: "Pause the example call",
  },
};

export type Copy = typeof en;
