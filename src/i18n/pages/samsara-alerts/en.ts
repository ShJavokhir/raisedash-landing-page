// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Samsara Alerts in Telegram: Safety Events, Speeding and Engine Faults",
    description:
      "Get Samsara safety events, speeding and engine faults in your Telegram group, with the dashcam video attached. Plus advanced weekly fleet reports. 3 days free.",
  },
  hero: {
    eyebrow: "Samsara → Telegram",
    title: "Samsara alerts in your Telegram group.",
    body: "Safety events with the dashcam video, speeding, engine faults. Sent to the chat your team already has open all day.",
    motionLabel:
      "Mike’s truck is on the highway when its Samsara road camera flags a following-distance event. The clip lands in that event’s topic in the company’s Telegram group, where Sarah replies that she’s calling Mike, and every Friday three weekly boards sum up the week.",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  group: {
    altPhone:
      "A Telegram group with a separate topic for each event type: fault codes, following distance, obstructed camera, mobile usage, speeding, no seatbelt, battery voltage, harsh turn, coolant temperature, harsh braking, drowsy, rolling stop, tire pressure and crash.",
    altDesktop:
      "A Telegram group with a separate topic for each event type: fault codes, following distance, obstructed camera, mobile usage, speeding, no seatbelt, harsh turn, drowsy and more, next to a thread of alerts carrying dashcam clips.",
    caption:
      "Every event type gets its own topic, and every alert carries the truck number, so searching one truck pulls up everything it has ever done.",
    redacted:
      "Real screenshots from a fleet running this. Names, plates and locations are blurred for this page, not in your group.",
  },
  // Why the events sitting in Samsara are not already solving this. The same
  // argument runs as the first FAQ; this is the version a scroller sees.
  why: {
    heading: "Samsara already sees all of this. Nobody is watching it.",
    items: [
      {
        title: "The Samsara dashboard",
        body: "Someone has to be logged in and refreshing it. A busy week is thousands of events, and everyone you want looking needs their own seat.",
      },
      {
        title: "Email alerts",
        body: "They bury an inbox, they are not instant, and every one of them still ends with somebody opening the dashboard.",
      },
      {
        title: "The group chat you already have",
        body: "Open on every phone in the company. The video is in the message, and everybody sees the same thing at the same time.",
      },
    ],
  },
  sends: {
    video: {
      title: "Safety events, with the video",
      body: "Both camera angles play right in the message. Nobody logs in to watch fifteen seconds of a driver on their phone.",
    },
    speeding: {
      title: "Speeding, over your limit",
      body: "How fast, how long, and where. You pick the threshold, so 3 over stays quiet and 15 over does not.",
    },
    faults: {
      title: "Engine faults, in plain text",
      body: "Which warning light came on and what the code means, so your shop knows before the truck gets there.",
    },
    faultsAlt:
      "Two engine-fault alerts in Telegram, each listing the emissions, protect, stop and warning lamp states and spelling out every diagnostic trouble code.",
  },
  events: {
    heading: "Everything it watches for",
    // Every behaviour Samsara reports, in the words a dispatcher would use. Anything
    // not on this list still comes through, just under a generic label.
    list: [
      "Speeding",
      "Phone use",
      "Distracted driving",
      "Drowsy",
      "No seatbelt",
      "Blocked camera",
      "Following too close",
      "Tailgating",
      "Harsh braking",
      "Harsh acceleration",
      "Harsh turn",
      "Lane departure",
      "Rolling stop",
      "Ran a red light",
      "Railroad crossing",
      "Unsafe parking",
      "Roadside parking",
      "Passenger in the cab",
      "Near collision",
      "Forward collision warning",
      "Rollover protection",
      "Crash",
      "Defensive driving",
      "Engine fault codes",
    ],
    note: "Turn off the ones you do not want. Anything Samsara adds later still comes through, it just arrives without a nickname until we give it one.",
  },
  boards: {
    eyebrow: "Every Friday",
    heading: "Three boards get pinned in the group",
    body: "The last seven days: what happened, who drove clean, and who is burning the fuel.",
  },
  pricing: {
    trial: "Try 3 days for free",
    trialNote: "Pay only if it helps.",
    features: [
      "Everything above, for the whole group",
      "Advanced weekly reports",
      "Also supports separate driver groups",
      "Setup takes ~15 minutes, and we do it with you",
    ],
  },
  faqs: [
    {
      question: "Why not just watch the events in Samsara?",
      answer:
        "Because somebody has to be logged in and refreshing. A busy fleet throws thousands of events a week, and everyone you want watching needs their own Samsara seat. Email alerts are worse: they bury an inbox, they are not instant, and they still end with someone opening the dashboard. Your Telegram group is already open on every phone, and the video plays in the message.",
    },
    {
      question: "Where does our data go?",
      answer:
        "Onto our own server in AWS us-east-1, inside a private network. Nothing is written to a database and nothing leaves that server. Alerts pass straight through to your group and are gone. The weekly boards are built fresh from Samsara each time they run.",
    },
    {
      question: "Does this replace Samsara?",
      answer:
        "No. It reads the Samsara account you already pay for and posts what it finds to Telegram. Samsara stays exactly as it is.",
    },
    {
      question: "Will it spam our group?",
      answer:
        "No. Nothing is ever sent twice, speeding only posts past the limit you set, engine faults have to stay on before they alert, and anything your team already dismissed in Samsara never shows up. Each behaviour also gets its own topic, so phone-use alerts do not bury everything else.",
    },
    {
      question: "Can drivers get their own alerts?",
      answer:
        "Yes. You can send chosen events to a driver's own group chat, on a separate threshold from the main one, so a driver hears about 15 over without the whole office watching every 3 over.",
    },
    {
      question: "What if a truck has no camera, or the video will not load?",
      answer:
        "You still get the alert as text, with the driver, the truck, the time and a map link. The video is a bonus, never a requirement.",
    },
  ],
  finalCta: "Tell us how many trucks you run.",
  trademark:
    "Samsara is a trademark of Samsara Inc. This is an independent integration and is not affiliated with or endorsed by Samsara. Telegram is a trademark of Telegram Messenger Inc.",
};

export type Copy = typeof en;
