// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "RingCentral Call Recordings in Telegram",
    description:
      "Listen to your team’s RingCentral calls in Telegram. Missed calls and voicemails show up too, and managers don’t need a RingCentral login.",
  },
  hero: {
    eyebrow: "RingCentral → Telegram",
    title: "Your team’s RingCentral calls, right in Telegram.",
    body: "Your team’s recorded calls show up in a Telegram chat. Tap play to listen. No logging in to RingCentral, no digging through the call log.",
    note: "We’ll walk you through it and help you get set up.",
    motionLabel:
      "A dispatcher’s call with a broker ends, and a couple of minutes later its recording shows up in a Telegram chat, where the owner taps play to listen.",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  twoWays: {
    heading: "One call, two ways",
  },
  how: {
    heading: "How it works",
  },
  steps: {
    demo: {
      title: "Get a demo",
      description:
        "Tell us which RingCentral account to connect and which Telegram chat the calls should go to.",
    },
    connect: {
      title: "Connect RingCentral",
      description:
        "Your RingCentral admin gives us access to the call log, and we add our bot to your chat. We’ll walk you through it.",
    },
    listen: {
      title: "Listen",
      description:
        "New calls show up in the chat on their own. Open Telegram and tap play. Older calls stay in RingCentral.",
    },
  },
  features: {
    heading: "What you get",
    settle: {
      title: "Settle “he said, she said”",
      text: "A broker says the rate was $2,400. Your dispatcher says $2,600. Search the broker’s name in the chat and play the call.",
    },
    coach: {
      title: "Coach new people",
      text: "Listen to a new dispatcher’s calls from their first week. Catch the mistakes early, before a driver or a customer complains.",
    },
    missed: {
      title: "See the calls nobody took",
      text: "Missed calls and voicemails show up too, so you know when a customer couldn’t reach anyone.",
    },
    anywhere: {
      title: "Listen from anywhere",
      text: "From the truck, from home, or between meetings. All you need is Telegram on your phone.",
    },
    share: {
      title: "Share a call",
      text: "Forward a good call to a new hire as an example, or a bad one to your safety manager. Nothing to download.",
    },
    skip: {
      title: "Leave private lines out",
      text: "Some calls don’t belong in the chat, like HR or the owner’s line. Tell us whose calls to skip.",
    },
  },
  consent: {
    heading: "Privacy and consent",
    intro:
      "This is for quality and training, not for spying on people. Before you turn it on, make sure everyone knows.",
    employees: {
      title: "Tell your employees",
      text: "Let them know their calls are recorded and who will listen to them. Get their consent in writing before you turn this on.",
    },
    callers: {
      title: "Tell the people who call you",
      text: "Many states require everyone on a call to agree to the recording. RingCentral can play a short notice at the start of every call.",
    },
    smallChat: {
      title: "Keep the chat small",
      text: "Anyone in the chat can play every call. Add only the people who need to hear them, like owners and managers.",
    },
    noCopies: {
      title: "We don’t keep the recordings",
      text: "They go from RingCentral to your chat and are not saved on our server. You decide who gets in.",
    },
  },
  faq: {
    heading: "Questions",
  },
  faqs: [
    {
      question: "How do I get started?",
      answer:
        "Message us on Telegram at @raisedash. We’ll show you a demo, give you the price, and set it up with your RingCentral admin.",
    },
    {
      question: "Do our employees need to agree to this?",
      answer:
        "Yes. Tell them their calls are recorded and who listens to them, and get their written consent first. Many states also require the other person on the call to agree, so turn on RingCentral’s recording notice. This isn’t legal advice, so check the rules for the states you work in.",
    },
    {
      question: "How quickly does a call show up?",
      answer:
        "We check RingCentral for new calls every couple of minutes, so a call shows up shortly after it ends. It isn’t live.",
    },
    {
      question: "Do we need call recording turned on in RingCentral?",
      answer:
        "Yes, to get the audio. We send what RingCentral recorded. Calls without a recording still show up with who called, who answered, and what happened, like Missed or Voicemail.",
    },
    {
      question: "Where do the recordings go?",
      answer:
        "Straight from RingCentral to your Telegram chat. We don’t keep a copy. Once a call is in the chat, anyone in that chat can play it.",
    },
    {
      question: "Will we get our old calls?",
      answer: "No. We start from the day we connect. Older recordings stay in RingCentral.",
    },
    {
      question: "Does it turn calls into text?",
      answer:
        "Not today. You get the recording and the call details. To find a call, search a name or a phone number in the chat.",
    },
    {
      question: "We have more than one RingCentral account.",
      answer: "That works. Each account can go to its own Telegram chat.",
    },
  ],
  start: {
    heading: "Hear your office from your phone",
    body: "Get a demo. We’ll share pricing and help you set it up with your RingCentral admin.",
    trademark:
      "RingCentral is a trademark of RingCentral, Inc. This is an independent integration and is not affiliated with or endorsed by RingCentral. Telegram is a trademark of Telegram Messenger Inc.",
  },
};

export type Copy = typeof en;
