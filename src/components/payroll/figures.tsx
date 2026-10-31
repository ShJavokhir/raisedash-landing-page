/**
 * The figure for /products/freight-payroll: Sarah's chat with her company's
 * payroll bot (~/dev/projects/freight-payroll). The payslip is exactly what
 * the bot writes (src/bot/format.ts renderPayslip, i18n/en.ts) and the menu
 * is the bot's own reply keyboard; the numbers match the hero film. When the
 * bot's wording changes, change it here too. The plate is dark in both
 * themes, so everything on it uses literal colors.
 */

const MENU = [
  "🧾 Latest payslip",
  "📚 Payslips",
  "💵 Advances",
  "🏦 Loans",
  "🌐 Language",
  "❓ Help",
];

/**
 * Sarah's chat with the company's payroll bot: the payslip exactly as the bot
 * writes it, the "All payslips" button, and the bot's menu underneath.
 */
export function PortalFigure() {
  return (
    <div className="w-full max-w-[320px] overflow-hidden rounded-[22px] bg-white shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]">
      <div className="flex items-center gap-2.5 border-b border-black/[0.07] px-4 py-2.5 text-black">
        <span className="grid size-8 place-items-center rounded-full bg-black text-[13px] font-bold text-white">
          R
        </span>
        <span>
          <span className="block text-[13px] font-semibold">Ridgeline Payroll</span>
          <span className="block text-[11px] text-black/45">bot</span>
        </span>
      </div>
      <div className="tg-wallpaper px-2.5 pt-3 pb-2.5">
        <div className="max-w-[268px] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[11.5px] leading-[1.4] text-black shadow-sm">
          <p className="font-semibold">🧾 Your payslip for October 2026 is ready</p>
          <p>Oct 1 – 31, 2026</p>
          <p>Pay date: Nov 5, 2026</p>
          <p className="mt-1.5">Base pay: $3,600.00</p>
          <p className="italic">Days worked: 22 of 22</p>
          <p className="mt-1.5 font-semibold">Earnings</p>
          <p>• Load commission: +$780.00</p>
          <p className="pl-3 italic">39 × $20.00</p>
          <p className="mt-1.5 font-semibold">Deductions</p>
          <p>• Loan repayment · Car repair: −$300.00</p>
          <p className="mt-1.5 font-semibold">💰 Net pay: $4,080.00</p>
          <p className="mt-0.5 text-right text-[10px] text-black/40">5:12 PM</p>
        </div>
        <div className="mt-1 max-w-[268px] rounded-xl bg-white/85 py-1.5 text-center text-[11.5px] font-medium text-[#3a8fd6] shadow-sm">
          📚 All payslips
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5 bg-[#f1f1f4] p-2">
        {MENU.map((item) => (
          <span
            key={item}
            className="rounded-md bg-white py-1.5 text-center text-[11px] text-black shadow-[0_1px_0_rgba(0,0,0,0.08)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
