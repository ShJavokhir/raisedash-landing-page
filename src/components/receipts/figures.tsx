import Image from "next/image";
import {
  ArrowDown,
  Camera,
  Check,
  ExternalLink,
  FileText,
  ImagePlus,
  Link2,
  Lock,
  Play,
  Trash2,
  TriangleAlert,
  Video,
} from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Figures for /products/receipts-telegram-bot, after the feature cards on the
 * Bookr homepage: small white pieces of the real product on a dark graphite
 * plate (`.graphite-plate` in globals.css).
 *
 * Wording is copied from the product, not paraphrased: the driver's pages
 * (learner-web app/pti/receipts) and the office's receipt list (dashboard
 * components/pti/receipts-tab.tsx). When one of those changes, change it here
 * too. The AI check is not built yet, so its figure has nothing to copy.
 *
 * The plate is dark in both themes, so everything on it uses literal colors.
 * People and the fleet are made up; Mike Ruiz, truck 104 and trailer 5317 also
 * star in the hero (ReceiptTour.tsx).
 */

const surface =
  "rounded-lg border border-black/10 bg-white text-[#26251e] shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]";

export interface PlateCrop {
  /** Which part of the graphite photo this panel shows (background-position). */
  pos: string;
  /** Mirror the photo, so neighbouring panels never look stamped. */
  flip?: boolean;
  size?: string;
}

export function plateStyle({ pos, flip, size }: PlateCrop): React.CSSProperties {
  return {
    "--plate-pos": pos,
    ...(flip ? { "--plate-flip": "scaleX(-1)" } : {}),
    ...(size ? { "--plate-size": size } : {}),
  } as React.CSSProperties;
}

/** The dark panel itself. Figures on it are decoration; the text says it all. */
export function GraphitePlate({
  crop,
  className,
  children,
}: {
  crop: PlateCrop;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      style={plateStyle(crop)}
      className={cn("graphite-plate border-border rounded-xs border", className)}
    >
      {children}
    </div>
  );
}

/** A graphite panel with a figure on it, and a title and one line under it. */
export function GraphiteCard({
  title,
  text,
  figure,
  crop,
  badge,
}: {
  title: string;
  text: string;
  figure: React.ReactNode;
  crop: PlateCrop;
  /** A tag like "Coming soon", in the plate's corner. */
  badge?: string;
}) {
  return (
    <li className="min-w-0">
      <GraphitePlate crop={crop} className="grid h-[232px] place-items-center p-4">
        {badge ? (
          <span className="absolute top-3 left-3 rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            {badge}
          </span>
        ) : null}
        {figure}
      </GraphitePlate>
      <h3 className="text-foreground mt-5 text-lg leading-6 font-normal tracking-tight">
        {title}
        {/* The plate is hidden from screen readers, so say it here too. */}
        {badge ? <span className="sr-only">{` (${badge})`}</span> : null}
      </h3>
      <p className="text-muted-foreground mt-2 max-w-[46ch] text-base leading-relaxed">{text}</p>
    </li>
  );
}

/* ── How it works ────────────────────────────────────────────────────────── */

const DASHBOARD_ROWS = [
  {
    submitted: "Sep 23, 9:41 AM",
    driver: "Mike Ruiz",
    units: "104 / 5317",
    amount: "$175.00",
    files: 1,
  },
  {
    submitted: "Sep 22, 5:12 PM",
    driver: "Anna Kim",
    units: "212 / 5290",
    amount: "$486.20",
    files: 2,
  },
  { submitted: "Sep 22, 9:03 AM", driver: "Dan Novak", units: "118", amount: "$14.50", files: 1 },
  {
    submitted: "Sep 21, 3:27 PM",
    driver: "Luis Ortega",
    units: "131 / 5302",
    amount: "$92.75",
    files: 3,
  },
  {
    submitted: "Sep 21, 7:15 AM",
    driver: "Mike Ruiz",
    units: "104 / 5317",
    amount: "$38.40",
    files: 1,
  },
];

/**
 * The office's receipt list: every group's receipts in one table, newest
 * first. On phones the truck and file columns drop out so the rest still fits.
 */
export function DashboardFigure() {
  const wide = "hidden sm:table-cell";
  return (
    <div className={cn(surface, "w-full max-w-[560px] overflow-hidden")}>
      <div className="flex h-10 items-center gap-2 border-b border-black/10 px-4">
        <Image src="/logo.webp" alt="" width={18} height={18} className="rounded-[4px]" />
        <span className="text-[12px] font-semibold">Raisedash</span>
        <span className="ml-auto text-[11px] text-[#26251e]/55">Ridgeline Freight</span>
      </div>
      <div className="px-4 pt-3.5 pb-3">
        <p className="text-[15px] font-semibold">Receipts</p>
        <table className="mt-2 w-full text-left text-[11.5px]">
          <thead className="text-[10.5px] text-[#26251e]/55">
            <tr>
              <th className="py-1.5 pr-3 font-medium">Submitted</th>
              <th className="py-1.5 pr-3 font-medium">Driver</th>
              <th className={cn(wide, "py-1.5 pr-3 font-medium")}>Truck / trailer</th>
              <th className="py-1.5 pr-3 font-medium">Amount</th>
              <th className={cn(wide, "py-1.5 pr-3 font-medium")}>Files</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {DASHBOARD_ROWS.map((row) => (
              <tr key={row.submitted} className="border-t border-black/[0.07]">
                <td className="py-2 pr-3 whitespace-nowrap text-[#26251e]/70">{row.submitted}</td>
                <td className="py-2 pr-3 whitespace-nowrap">{row.driver}</td>
                <td className={cn(wide, "py-2 pr-3 tabular-nums")}>{row.units}</td>
                <td className="py-2 pr-3 font-medium tabular-nums">{row.amount}</td>
                <td className={cn(wide, "py-2 pr-3 tabular-nums")}>{row.files}</td>
                <td className="py-2 text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium">
                    View <ExternalLink className="h-3 w-3" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── What you get ────────────────────────────────────────────────────────── */

/** A paper receipt, drawn small, for file thumbnails. */
function ReceiptThumb({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center overflow-hidden rounded-md bg-[#d8d4c8]",
        className
      )}
    >
      <span className="flex h-[78%] w-[52%] -rotate-6 flex-col gap-[3px] rounded-[2px] bg-white px-[3px] pt-[5px] shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
        <i className="h-[2px] w-[70%] self-center bg-black/55" />
        <i className="h-[2px] w-full bg-black/15" />
        <i className="h-[2px] w-[80%] bg-black/15" />
        <i className="h-[2px] w-full bg-black/15" />
        <i className="mt-auto mb-[4px] h-[2px] w-[55%] self-end bg-black/55" />
      </span>
    </span>
  );
}

function PdfThumb({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-11 shrink-0 flex-col items-center justify-center gap-0.5 rounded-md border border-black/10 bg-[#f7f7f4] text-[#cf2d56]",
        className
      )}
    >
      <FileText className="h-4 w-4" strokeWidth={1.75} />
      <span className="text-[8px] leading-none font-semibold tracking-wide">PDF</span>
    </span>
  );
}

function VideoThumb({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-md bg-gradient-to-br from-[#5b6166] to-[#2c3134] text-white",
        className
      )}
    >
      <Play className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
    </span>
  );
}

function FileRow({ thumb, name, size }: { thumb: React.ReactNode; name: string; size: string }) {
  return (
    <li className="flex items-center gap-2.5 rounded-md border border-black/10 p-1 pr-2.5">
      {thumb}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-medium">{name}</span>
        <span className="block text-[10.5px] text-[#26251e]/55">{size}</span>
      </span>
      <Trash2 className="h-3.5 w-3.5 shrink-0 text-[#26251e]/40" />
    </li>
  );
}

export function FilesFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[272px] p-2.5")}>
      <div className="flex items-center justify-between px-1 pb-2 text-[11px]">
        <span className="font-medium">Receipt files</span>
        <span className="text-[#26251e]/55 tabular-nums">3 / 5</span>
      </div>
      <ul className="space-y-1">
        <FileRow thumb={<ReceiptThumb className="size-8" />} name="IMG_4107.jpg" size="0.9 MB" />
        <FileRow thumb={<PdfThumb className="size-8" />} name="lumper-receipt.pdf" size="0.2 MB" />
        <FileRow thumb={<VideoThumb className="size-8" />} name="IMG_4108.mov" size="14.6 MB" />
      </ul>
    </div>
  );
}

export function LinkFigure() {
  return (
    <div className="flex w-full max-w-[264px] flex-col items-center gap-2.5">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] text-white">
        <Link2 className="h-3 w-3" />
        View receipt
      </span>
      <div className={cn(surface, "w-full p-3")}>
        <p className="text-[10.5px] text-[#26251e]/55">Ridgeline Freight</p>
        <p className="text-[14px] font-semibold">Receipt</p>
        <p className="mt-2 text-[10.5px] text-[#26251e]/55">Total amount · USD</p>
        <p className="text-[22px] leading-tight font-semibold tabular-nums">$175.00</p>
        <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-[11px]">
          <dt className="text-[#26251e]/55">Driver</dt>
          <dd>Mike Ruiz</dd>
          <dt className="text-[#26251e]/55">Truck / unit</dt>
          <dd>104</dd>
          <dt className="text-[#26251e]/55">Trailer</dt>
          <dd>5317</dd>
        </dl>
      </div>
    </div>
  );
}

// The middle receipt sits higher, so the totals on the outer two show below it.
const PAPERS = [
  { name: "LUMPER", total: "$175.00", className: "-rotate-[8deg] translate-y-4" },
  { name: "DIESEL", total: "$486.20", className: "z-10 -translate-y-3" },
  { name: "SCALE", total: "$14.50", className: "rotate-[7deg] translate-y-5" },
];

/** Three paper receipts from the road, for three kinds of expense. */
export function ExpensesFigure() {
  return (
    <div className="flex items-center -space-x-3">
      {PAPERS.map((paper) => (
        <div
          key={paper.name}
          className={cn(
            "relative flex h-[134px] w-[98px] flex-col rounded-[3px] bg-white px-2.5 pt-3 pb-2.5 text-[#26251e] shadow-[0_14px_28px_-12px_rgba(0,0,0,0.6)]",
            paper.className
          )}
        >
          <p className="text-center text-[9.5px] font-bold tracking-[0.14em]">{paper.name}</p>
          <i className="mt-2 border-t border-dashed border-black/25" />
          <i className="mt-2.5 h-[3px] w-[82%] rounded-full bg-black/10" />
          <i className="mt-1.5 h-[3px] w-[64%] rounded-full bg-black/10" />
          <i className="mt-1.5 h-[3px] w-[74%] rounded-full bg-black/10" />
          <i className="mt-auto border-t border-dashed border-black/25" />
          <p className="mt-1.5 flex justify-between text-[9.5px] font-bold tabular-nums">
            <span>TOTAL</span>
            {paper.total}
          </p>
        </div>
      ))}
    </div>
  );
}

function OutlineButton({
  icon: Icon,
  children,
  className,
}: {
  icon: typeof Camera;
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex h-8 items-center justify-center gap-1.5 rounded-md border border-black/15 text-[11.5px] font-medium",
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

export function NoAppFigure() {
  return (
    <div className="flex w-full max-w-[256px] flex-col items-center gap-2.5">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] text-white">
        <Lock className="h-3 w-3" />
        on.raisedash.com
      </span>
      <div className={cn(surface, "w-full p-3")}>
        <p className="text-[10.5px] text-[#26251e]/55">Ridgeline Freight</p>
        <p className="text-[15px] font-semibold">Upload a receipt</p>
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          <OutlineButton icon={Camera}>Take photo</OutlineButton>
          <OutlineButton icon={ImagePlus}>Choose files</OutlineButton>
          <OutlineButton icon={Video} className="col-span-2">
            Record video
          </OutlineButton>
        </div>
      </div>
    </div>
  );
}

function PhotoRow({ name, size, done }: { name: string; size: string; done?: boolean }) {
  return (
    <div
      className={cn(
        surface,
        "flex w-full items-center gap-2.5 p-1.5 pr-3",
        !done && "bg-white/80 shadow-none"
      )}
    >
      <ReceiptThumb className="size-8" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-medium">{name}</span>
        <span className="block text-[10.5px] text-[#26251e]/55 tabular-nums">{size}</span>
      </span>
      {done ? <Check className="h-3.5 w-3.5 shrink-0 text-[#1f8a65]" strokeWidth={2.5} /> : null}
    </div>
  );
}

/**
 * The capture page downscales a photo to a ~1 MB JPEG before upload
 * (learner-web receipt-api.ts prepareReceiptFile), so an iPhone HEIC arrives
 * as a JPG. Sizes are typical for a 12 MP phone photo.
 */
export function FastPhotosFigure() {
  return (
    <div className="flex w-full max-w-[248px] flex-col items-center gap-1.5">
      <PhotoRow name="IMG_4107.HEIC" size="2.6 MB" />
      <ArrowDown className="h-4 w-4 text-white/80" />
      <PhotoRow name="IMG_4107.jpg" size="0.7 MB" done />
    </div>
  );
}

function CheckRow({ name, verdict, ok }: { name: string; verdict: string; ok?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 p-2">
      <ReceiptThumb className="size-9" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-medium">{name}</span>
        <span
          className={cn(
            "mt-1 inline-flex items-center gap-1 rounded-full px-1.5 py-px text-[10.5px] font-medium",
            ok ? "bg-[#1f8a65]/10 text-[#1f8a65]" : "bg-[#c2410c]/10 text-[#c2410c]"
          )}
        >
          {ok ? (
            <Check className="h-3 w-3" strokeWidth={2.5} />
          ) : (
            <TriangleAlert className="h-3 w-3" />
          )}
          {verdict}
        </span>
      </span>
    </div>
  );
}

/** Coming soon. The product has no AI check yet, so this one is drawn, not copied. */
export function AiCheckFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[248px] divide-y divide-black/10")}>
      <CheckRow name="IMG_4107.jpg" verdict="Looks real" ok />
      <CheckRow name="IMG_4112.jpg" verdict="Looks AI generated" />
    </div>
  );
}
