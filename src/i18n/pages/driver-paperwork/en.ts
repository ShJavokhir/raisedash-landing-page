// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Driver application and e-signature tool",
    description:
      "Send driver applications, policies to e-sign, and file requests. Drivers finish on their phone. You download clean PDFs.",
  },
  hero: {
    eyebrow: "Driver paperwork",
    title: "Driver paperwork, done on their phone.",
    body: "Send a driver application, a policy to sign, or a request for a CDL photo. The driver gets a text and an email, opens the link, and finishes on their phone with a 6-digit code. No app, no password. You download a clean PDF.",
    note: "We’ll walk you through it and help you send your first request.",
    motionLabel:
      "Someone at the office requests a driver application, the driver gets a text, fills in each step on his phone and signs by typing his name, and every answer lands in one clean PDF while his row in Applications changes to Submitted.",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  parts: {
    heading: "Three kinds of paperwork, one place",
    applications: {
      label: "Applications",
      title: "A full driver employment application, on their phone",
      text: "Request an application with one click. The driver fills it out step by step: 3 years of addresses, licenses, experience, the equipment they’ve driven, accidents, traffic violations and work history. Then they sign.",
      points: [
        "Progress saves after every step. Drivers can stop and finish later.",
        "You download one clean PDF with every answer and the signature.",
      ],
    },
    documents: {
      label: "Documents",
      title: "Policies and agreements, signed on the phone",
      text: "Pick from 25 ready-made trucking documents (drug and alcohol policy receipt, PSP authorization, cell phone policy, personal conveyance policy and more), or upload any PDF you already use. Your company name, address, phone and DOT number are filled in automatically. Change any wording before you send.",
      points: [
        "The sign button stays locked until the driver reaches the end.",
        "Every signed copy ends with a certificate page: who signed, when, and how they signed in.",
      ],
    },
    fileRequests: {
      label: "File requests",
      title: "Ask for a CDL, medical card, MVR or any file",
      text: "Type what you need and pick the drivers. They take a photo or choose a file on their phone, then tap Send.",
      points: [
        "Up to 5 photos or PDFs per request.",
        "Ask one driver or your whole list at once.",
        "Open and download every file from your dashboard.",
      ],
    },
  },
  how: {
    heading: "How it works",
    steps: [
      {
        title: "Pick what you need",
        description:
          "A driver application, a document to sign, or a file. Choose the drivers and, if you like, a due date.",
      },
      {
        title: "They finish it on their phone",
        description:
          "Signing a document or sending a photo is quick. The full application takes about 10 minutes.",
      },
      {
        title: "Track progress and send reminders",
        description:
          "Every request shows Requested, In progress or Submitted. One tap sends a reminder by text and email.",
      },
    ],
  },
  /** Applications hold the most sensitive details a fleet collects. Say how we treat them. */
  privacy: {
    heading: "How we protect driver information",
    body: "A driver application holds some of the most personal details a driver will share. Here’s how we look after them.",
    items: [
      {
        title: "SSN and date of birth are encrypted",
        text: "We encrypt the SSN and date of birth as soon as they’re saved. Your dashboard shows only the last 4 digits. The full number appears only in the application PDF.",
      },
      {
        title: "Your drivers are only yours",
        text: "Each company sees only its own drivers and their paperwork. Nobody else can open them.",
      },
      {
        title: "Download links expire in 15 minutes",
        text: "Files and PDFs open through private links that stop working after 15 minutes, so a forwarded link doesn’t stay open.",
      },
      {
        title: "Drivers keep a copy",
        text: "After signing, drivers can download their own signed copy of the document from their phone.",
      },
    ],
  },
  faq: {
    heading: "Questions",
    items: [
      {
        question: "How do I get started?",
        answer:
          "Request a demo. We’ll show you how it works, share pricing, and help you send your first request.",
      },
      {
        question: "Are electronic signatures legal?",
        answer:
          "Yes. In the US, a typed-name electronic signature is legally valid under the federal ESIGN Act and state e-signature laws, and FMCSA allows electronic signatures on the records it requires. Each signed copy shows when the driver signed and how they signed in. This isn’t legal advice, so check with your lawyer if you’re unsure.",
      },
      {
        question: "What does the driver application ask?",
        answer:
          "The usual driver employment application questions: contact details, addresses from the last 3 years, licenses, the equipment they’ve driven, accidents and traffic violations from the last 3 years, any license suspensions, and their work history. The driver signs it at the end.",
      },
      {
        question: "Can I use my own documents?",
        answer:
          "Yes. Upload any PDF and send it for signature. Or start from one of our 25 templates and change the wording.",
      },
      {
        question: "Can I change a document after I send it?",
        answer:
          "No. Once a document is ready to send, its wording is locked, so every driver signs the same text. To change it, make a new version and send that instead.",
      },
      {
        question: "What files can drivers send?",
        answer:
          "Photos and PDFs, up to 5 files per request and 25 MB each. Photos straight from an iPhone work too.",
      },
      {
        question: "What if a driver sends a blurry photo?",
        answer:
          "Send the request again. There’s no approve or reject step, so a new request is how you ask for a better copy.",
      },
      {
        question: "Do you run background checks or call past employers?",
        answer:
          "No. We collect the application and the driver’s signed authorizations, like the background check and PSP release. Ordering reports and contacting past employers is still up to you.",
      },
      {
        question: "Does it work with Raisedash training?",
        answer:
          "Yes. Paperwork uses the same driver list and the same driver portal as training, so a new driver can finish orientation and paperwork in one place.",
      },
    ],
  },
  start: {
    heading: "Get the paperwork done before day one",
    body: "Request a demo. We’ll share pricing and help you set it up.",
  },
};

export type Copy = typeof en;
