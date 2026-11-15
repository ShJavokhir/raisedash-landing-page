// English is the source text; every other language is typed against it.
export const en = {
  seo: {
    title: "Trucking office payroll software",
    description:
      "Payroll software for trucking office teams: dispatchers, safety managers, fleet managers. Not for driver pay. Payslips go straight to Telegram.",
  },
  hero: {
    eyebrow: "Freight Payroll",
    title: "Payroll for your office team.",
    body: "Freight Payroll calculates pay for your dispatchers, safety managers, fleet managers and accounting team. Start the month, change what’s different, approve it, and everyone gets their payslip in Telegram.",
    motionLabel:
      "Someone at the office creates the October pay period in one click and every person’s pay fills in, with a salary advance and a loan payment already taken off. They change one person’s days worked and add a dispatcher’s load commission. The owner sees just those changes and approves, and the dispatcher’s payslip arrives in Telegram while all eight payslips are delivered.",
    pauseMotion: "Pause animation",
    playMotion: "Play animation",
  },
  handles: {
    heading: "What it takes care of",
    items: [
      {
        title: "Days off and new hires",
        text: "Type the days someone missed and we take off the right amount. People who start or leave mid-month are counted from their dates.",
      },
      {
        title: "Commission",
        text: "Per load or a percent of revenue. The math shows on the payslip.",
      },
      {
        title: "Advances",
        text: "Money paid early comes out of the next pay on its own.",
      },
      {
        title: "Loans",
        text: "A set amount comes out of every pay until the loan is paid off.",
      },
      {
        title: "Approval",
        text: "One person prepares payroll and another approves it. Once approved, nobody can change it by accident.",
      },
      {
        title: "Reports",
        text: "Pay by month, team or person. Download it as a spreadsheet.",
      },
    ],
  },
  closer: {
    heading: "The screens you work with",
    items: [
      {
        title: "The whole month in one table",
        text: "Days, salaries, advances and loan payments come in already filled. You change only what’s different.",
        alt: "The October 2026 pay period for eight office employees: days worked, base pay, two unpaid days for one person, a salary advance and a loan payment taken off, a load commission added, and $33,107.27 net pay in total.",
      },
      {
        title: "How each person’s pay adds up",
        text: "Open anyone to see every item: the commission with its loads and rate, and the loan payment we took off.",
        alt: "Sarah Lee’s October pay: $3,600.00 base pay, a load commission of 39 × $20.00, a $300.00 car repair loan payment added automatically, and $4,080.00 net pay.",
      },
      {
        title: "Approve what changed",
        text: "Before approving, you see whose pay is different from last month and why.",
        alt: "The review of October 2026, submitted by Dana Cole: three people worth a look, each compared with September, and a button to approve $33,107.27.",
      },
      {
        title: "A year at a glance",
        text: "Totals for any dates, and every month side by side.",
        alt: "A payroll report from November 2025 to October 2026: $399,279.74 gross pay, $4,100.00 in deductions, $395,179.74 net pay, and gross pay for each month.",
      },
    ],
  },
  portal: {
    heading: "Payslips in Telegram",
    body: "Each person opens your company’s payroll bot and sees their own pay, so nobody has to ask the office.",
    points: [
      "Their latest payslip and every one before it",
      "What’s left on an advance or a loan",
      "In English, Russian or Uzbek, whichever they pick",
    ],
  },
  faq: {
    heading: "Freight Payroll questions",
    items: [
      {
        question: "Who is it for?",
        answer:
          "Trucking companies paying their office team: dispatchers, safety and fleet managers, recruiters and accounting. It isn’t made for driver pay.",
      },
      {
        question: "Does it send the money or handle taxes?",
        answer:
          "No. We work out what each person is owed and send their payslip. You still pay them the way you do today.",
      },
      {
        question: "Does it work with hourly pay or overtime?",
        answer: "Not today. It works with salaries, commission, bonuses and deductions.",
      },
    ],
  },
  cta: {
    heading: "Try it on your next payday",
    body: "Get a demo. We’ll show you how it works and share pricing.",
    trademark:
      "Telegram is a trademark of Telegram Messenger Inc. Raisedash is not affiliated with or endorsed by Telegram.",
  },
};

export type Copy = typeof en;
