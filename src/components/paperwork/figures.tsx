import Image from "next/image";
import {
  ArrowDown,
  Bell,
  Check,
  ChevronRight,
  ClipboardList,
  Download,
  FileSignature,
  FileUp,
  Lock,
  PenLine,
  Plus,
  Smartphone,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { GraphitePlate } from "@/components/receipts/figures";

/**
 * Figures for /products/driver-paperwork: the dashboard's Paperwork section
 * (Documents, Applications, File requests) and the driver portal at
 * on.raisedash.com where drivers finish each one.
 *
 * Wording is copied from the product, not paraphrased: dashboard page headers,
 * status badges, the "Request a file" dialog and its five suggestion chips
 * (raisedash-dashboard components/file-requests, applications, documents,
 * learners/detail/documents-tasks-card.tsx), the driver portal's home cards,
 * application step titles and upload page (raisedash-learner-web
 * app/(portal)), the template library names and the drug & alcohol body
 * (raisedash-backend src/policies/template-library.ts), and the signature
 * certificate (signature-certificate.hbs, signed-copy.service.ts). The one
 * change: em dashes in product strings become periods here, per the site's
 * no-dash rule. When the product changes, change it here too.
 *
 * The plate is dark in both themes, so everything on it uses literal colors.
 * People and the fleet are made up and match the receipts page (Ridgeline
 * Freight, Mike Ruiz). Phone numbers are 555-01xx, which never ring anyone.
 */

const INK = "#26251e";
const surface =
  "rounded-lg border border-black/10 bg-white text-[#26251e] shadow-[0_16px_32px_-16px_rgba(0,0,0,0.55)]";
const muted = "text-[#26251e]/55";
/** A system script, standing in for the Great Vibes font on the real PDF. */
const script = {
  fontFamily: '"Snell Roundhand", "Segoe Script", "Brush Script MT", "URW Chancery L", cursive',
};

/* ── Shared bits ─────────────────────────────────────────────────────────── */

type Status = "Requested" | "In progress" | "Submitted" | "Signed" | "Complete" | "Pending";

/** The dashboard's badge colors, as literals (the plate ignores theme tokens). */
const BADGE: Record<Status, string> = {
  Requested: "bg-[#fef3c7] text-[#92400e]",
  Pending: "bg-[#fef3c7] text-[#92400e]",
  "In progress": "bg-[#e0f2fe] text-[#075985]",
  Submitted: "bg-[#d1fae5] text-[#065f46]",
  Signed: "bg-[#d1fae5] text-[#065f46]",
  Complete: "bg-[#d1fae5] text-[#065f46]",
};

function Badge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md px-1.5 py-px text-[10.5px] font-medium whitespace-nowrap",
        BADGE[status],
        className
      )}
    >
      {status}
    </span>
  );
}

/** A label floating above a panel: who is looking at it. */
function Tag({ icon: Icon, children }: { icon: typeof Lock; children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] whitespace-nowrap text-white">
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

function Checkbox({ on = true }: { on?: boolean }) {
  return on ? (
    <span className="grid size-3.5 shrink-0 place-items-center rounded-[3px] bg-[#26251e] text-white">
      <Check className="h-2.5 w-2.5" strokeWidth={3} />
    </span>
  ) : (
    <span className="size-3.5 shrink-0 rounded-[3px] border border-black/25" />
  );
}

function InkButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-8 items-center justify-center gap-1.5 rounded-md bg-[#26251e] px-3 text-[11.5px] font-medium text-white",
        className
      )}
    >
      {children}
    </span>
  );
}

function OutlineButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-8 items-center justify-center gap-1.5 rounded-md border border-black/15 px-3 text-[11.5px] font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Grey bars standing in for paragraph text. */
function Lines({ widths, className }: { widths: string[]; className?: string }) {
  return (
    <span className={cn("flex flex-col gap-[5px]", className)}>
      {widths.map((w, i) => (
        <i key={i} className="h-[3px] rounded-full bg-black/10" style={{ width: w }} />
      ))}
    </span>
  );
}

/** A plastic card photographed on a table: a license, front or back. */
function LicenseThumb({ back, className }: { back?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-9 shrink-0 place-items-center overflow-hidden rounded-md bg-[#c9c4b6]",
        className
      )}
    >
      <span className="relative flex h-[56%] w-[84%] -rotate-[4deg] gap-[2px] rounded-[2px] bg-[#e7eef4] p-[2px] shadow-[0_2px_3px_rgba(0,0,0,0.3)]">
        {back ? (
          <span className="mt-auto h-[38%] w-full bg-[repeating-linear-gradient(90deg,#26251e_0_1px,transparent_1px_2px)] opacity-70" />
        ) : (
          <>
            <span className="h-full w-[34%] rounded-[1px] bg-[#9fb2c2]" />
            <span className="flex flex-1 flex-col gap-[2px] pt-[1px]">
              <i className="h-[2px] w-full bg-[#365c93]/70" />
              <i className="h-[1.5px] w-[80%] bg-black/25" />
              <i className="h-[1.5px] w-[60%] bg-black/25" />
            </span>
          </>
        )}
      </span>
    </span>
  );
}

/** Office window chrome, as on the receipts page's dashboard figure. */
function DashboardChrome({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(surface, "overflow-hidden", className)}>
      <div className="flex h-9 items-center gap-2 border-b border-black/10 px-3.5">
        <Image src="/logo.webp" alt="" width={16} height={16} className="rounded-[4px]" />
        <span className="text-[11.5px] font-semibold">Raisedash</span>
        <span className={cn("ml-auto text-[10.5px]", muted)}>Ridgeline Freight</span>
      </div>
      {children}
    </div>
  );
}

const PHONE_W = 248;
const PHONE_H = 492;

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-[40px] bg-[#1b1b1d] p-[6px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_30px_60px_-24px_rgba(0,0,0,0.75)]",
        className
      )}
      style={{ width: PHONE_W, height: PHONE_H }}
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-[34px] bg-[#f7f7f4] antialiased"
        style={{
          color: INK,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        <div className="relative flex h-[30px] shrink-0 items-center justify-between px-[22px] pt-[2px] text-[11px] font-semibold">
          <span>9:41</span>
          <span className="absolute top-[7px] left-1/2 h-[18px] w-[62px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-[3px]">
            <i className="h-[7px] w-[3px] rounded-[1px] bg-current" />
            <i className="h-[8px] w-[3px] rounded-[1px] bg-current" />
            <i className="h-[9px] w-[3px] rounded-[1px] bg-current" />
            <i className="ml-1 h-[9px] w-[18px] rounded-[3px] border border-current p-[1px]">
              <i className="block h-full w-[70%] rounded-[1px] bg-current" />
            </i>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Hero: the driver's phone and the office's list ──────────────────────── */

function PortalSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Lock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-1.5">
      <p className="flex items-center gap-1.5 text-[12px] font-semibold">
        <Icon className="h-3.5 w-3.5 text-[#26251e]/55" />
        {title}
      </p>
      {children}
    </section>
  );
}

/** The driver portal's home: every open task, top to bottom, as drivers see it. */
function PortalHome() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-black/10 bg-white px-4">
        <Image src="/logo.webp" alt="" width={16} height={16} className="rounded-[4px]" />
        <span className="text-[12px] font-semibold">Ridgeline Freight</span>
        <span className="ml-auto grid size-6 place-items-center rounded-full bg-[#26251e]/10 text-[10px] font-semibold">
          MR
        </span>
      </div>
      <div className="relative min-h-0 flex-1 space-y-4 overflow-hidden px-3 pt-4">
        <PortalSection icon={ClipboardList} title="Driver application">
          <div className="rounded-lg border border-black/10 bg-white p-2.5">
            <p className="text-[12px] font-semibold">Driver application</p>
            <p className={cn("mt-0.5 text-[10.5px] leading-snug", muted)}>
              Tell us about your driving history. Takes about 10 minutes.
            </p>
            <InkButton className="mt-2 h-7 text-[11px]">Continue</InkButton>
          </div>
        </PortalSection>

        <PortalSection icon={FileSignature} title="Needs your signature">
          <div className="flex items-center gap-2 rounded-lg border border-black/10 bg-white p-2">
            <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#26251e]/[0.06]">
              <PenLine className="h-3.5 w-3.5 text-[#26251e]/60" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11.5px] font-semibold">
                Drug &amp; Alcohol Policy Receipt
              </span>
              <span className={cn("block text-[10px]", muted)}>Requested Sep 30</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-[#26251e]/40" />
          </div>
        </PortalSection>

        <PortalSection icon={FileUp} title="Files your company needs">
          <div className="rounded-lg border border-[#26251e]/40 bg-white p-2.5">
            <div className="flex gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#26251e]/[0.08]">
                <FileUp className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[11.5px] font-semibold">DOT Medical Card</span>
                <span className={cn("block text-[10px] leading-snug", muted)}>
                  Take a photo of it, or pick a file from your phone.
                </span>
                <span className="mt-0.5 block text-[10px]">Due Oct 9</span>
              </span>
            </div>
            <InkButton className="mt-2 h-7 text-[11px]">Send files</InkButton>
          </div>
        </PortalSection>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#f7f7f4] to-transparent" />
      </div>
    </div>
  );
}

const HERO_ROWS: { driver: string; doc: string; status: Status }[] = [
  { driver: "Anna Kim", doc: "CDL (front and back)", status: "Submitted" },
  { driver: "Dan Novak", doc: "DOT Medical Card", status: "Submitted" },
  { driver: "Mike Ruiz", doc: "CDL (front and back)", status: "In progress" },
  { driver: "Luis Ortega", doc: "Motor Vehicle Record (MVR)", status: "Submitted" },
  { driver: "Mike Ruiz", doc: "DOT Medical Card", status: "Requested" },
  { driver: "Sam Patel", doc: "Proof of work authorization", status: "Requested" },
];

/** The office's File requests page: who sent what, and what is still out. */
function OfficeList({ className }: { className?: string }) {
  return (
    <DashboardChrome className={className}>
      <div className="px-3.5 pt-3 pb-2">
        <p className="text-[14px] font-semibold">File requests</p>
        <p className={cn("text-[10.5px]", muted)}>
          Ask drivers for a document and download it once they upload.
        </p>
        <ul className="mt-2">
          {HERO_ROWS.map((row) => (
            <li
              key={`${row.driver}-${row.doc}`}
              className="flex items-center gap-2 border-t border-black/[0.07] py-1.5"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-medium">{row.driver}</span>
                <span className={cn("block truncate text-[10px]", muted)}>{row.doc}</span>
              </span>
              <Badge status={row.status} />
              <span className="grid w-4 shrink-0 place-items-center">
                {row.status === "Submitted" ? (
                  <Download className="h-3 w-3 text-[#26251e]/60" />
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </DashboardChrome>
  );
}

/**
 * The hero: the driver's phone, and the office's list beside it, tucked just
 * behind the phone's edge. On phones the office list drops out so the phone
 * stays readable.
 */
export function HeroFigure() {
  return (
    <GraphitePlate crop={{ pos: "35% 30%" }} className="relative h-[540px] overflow-hidden">
      <div className="relative mx-auto flex h-full w-full max-w-[720px] items-center justify-center sm:justify-start sm:pl-6">
        <OfficeList className="absolute top-1/2 right-5 left-[276px] hidden max-w-[400px] -translate-y-1/2 sm:block" />
        <Phone className="relative z-10">
          <PortalHome />
        </Phone>
      </div>
    </GraphitePlate>
  );
}

/* ── The three parts ─────────────────────────────────────────────────────── */

/**
 * A pair of panels side by side, each under a tag saying whose screen it is.
 * Phones only have room for one: the driver's, named by `mobile`.
 */
function Pair({
  left,
  right,
  leftTag,
  rightTag,
  mobile = "right",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  leftTag: React.ReactNode;
  rightTag: React.ReactNode;
  mobile?: "left" | "right";
}) {
  const side = "min-w-0 flex-col items-center gap-2.5";
  return (
    <div className="flex w-full items-start justify-center gap-4 sm:gap-5">
      <div className={cn(side, mobile === "left" ? "flex" : "hidden sm:flex")}>
        {leftTag}
        {left}
      </div>
      <div className={cn(side, mobile === "right" ? "flex" : "hidden sm:flex")}>
        {rightTag}
        {right}
      </div>
    </div>
  );
}

const EQUIPMENT: { label: string; on?: boolean }[] = [
  { label: "Straight truck" },
  { label: "Tractor-semitrailer", on: true },
  { label: "Tractor with two trailers" },
  { label: "Tanker" },
  { label: "Flatbed" },
  { label: "Refrigerated", on: true },
  { label: "Dry van", on: true },
  { label: "Other" },
];

function ApplicationStep() {
  return (
    <div className={cn(surface, "w-[264px] p-3.5")}>
      <div className="flex items-center justify-between text-[10.5px]">
        <span className={muted}>Step 4 of 9</span>
        <span className={muted}>Ridgeline Freight</span>
      </div>
      <span className="mt-1.5 block h-1 overflow-hidden rounded-full bg-black/10">
        <span className="block h-full w-[44%] rounded-full bg-[#26251e]" />
      </span>
      <p className="mt-3 text-[15px] font-semibold">Driving experience</p>
      <p className={cn("mt-0.5 text-[11px] leading-snug", muted)}>
        Choose every type of equipment you have operated.
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {EQUIPMENT.map((item) => (
          <span
            key={item.label}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10.5px]",
              item.on
                ? "border-[#26251e] bg-[#26251e] text-white"
                : "border-black/15 text-[#26251e]/75"
            )}
          >
            {item.on ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
            {item.label}
          </span>
        ))}
      </div>
      <div className="mt-3.5 grid grid-cols-[auto_1fr] gap-1.5">
        <OutlineButton>Back</OutlineButton>
        <InkButton>Save and continue</InkButton>
      </div>
    </div>
  );
}

const PDF_SECTIONS = [
  { title: "Applicant", lines: ["70%", "52%"] },
  { title: "Address history", lines: ["82%", "60%"] },
  { title: "Licenses", lines: ["66%"] },
  { title: "Employment history", lines: ["88%", "74%", "58%"] },
];

function ApplicationPdf() {
  return (
    <div className={cn(surface, "w-[200px] rounded-[3px] px-4 pt-4 pb-3")}>
      <p className={cn("text-[8.5px] tracking-[0.08em] uppercase", muted)}>Ridgeline Freight</p>
      <p className="text-[13px] font-semibold">Driver application</p>
      <p className={cn("text-[9.5px]", muted)}>Mike Ruiz</p>
      <div className="mt-2.5 space-y-2.5">
        {PDF_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="mb-1 border-b border-black/10 pb-0.5 text-[9px] font-semibold">
              {section.title}
            </p>
            <Lines widths={section.lines} />
          </div>
        ))}
      </div>
      <div className="mt-3 border-t border-black/15 pt-1">
        <p className="text-[19px] leading-none" style={script}>
          Mike Ruiz
        </p>
        <p className={cn("mt-1 text-[8.5px]", muted)}>Signed Oct 2, 2026</p>
      </div>
    </div>
  );
}

export function ApplicationsFigure() {
  return (
    <Pair
      mobile="left"
      leftTag={<Tag icon={Smartphone}>Driver’s phone</Tag>}
      left={<ApplicationStep />}
      rightTag={<Tag icon={Download}>Your PDF</Tag>}
      right={<ApplicationPdf />}
    />
  );
}

const GALLERY = [
  "Drug & Alcohol Policy Receipt",
  "Clearinghouse Limited Query Consent",
  "Conviction & License Notification Duties",
  "Accident Reporting Procedure",
  "Anti-Coercion Notice",
];

function TemplateGallery() {
  return (
    <DashboardChrome className="w-[236px]">
      <div className="p-3">
        <p className="text-[13px] font-semibold">Start from a template</p>
        <p className={cn("mt-2 text-[10px] font-medium tracking-wide uppercase", muted)}>
          Safety &amp; compliance
        </p>
        <ul className="mt-1.5 space-y-1">
          {GALLERY.map((name, i) => (
            <li
              key={name}
              className={cn(
                "truncate rounded-md border px-2 py-1.5 text-[10.5px]",
                i === 0 ? "border-[#26251e] font-medium" : "border-black/10"
              )}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </DashboardChrome>
  );
}

function SignCard() {
  return (
    <div className={cn(surface, "w-[252px] p-3.5")}>
      <p className={cn("text-[10.5px]", muted)}>Ridgeline Freight</p>
      <p className="text-[14px] leading-tight font-semibold">
        Drug &amp; Alcohol Policy: Receipt &amp; Acknowledgment
      </p>
      <div className="mt-2.5 flex items-start gap-2 rounded-md bg-[#26251e]/[0.04] p-2">
        <Checkbox />
        <p className="text-[10px] leading-snug text-[#26251e]/75">
          I agree that my electronic signature is the legal equivalent of my handwritten signature…
        </p>
      </div>
      <p className="mt-2.5 text-[10.5px] font-medium">Type your full legal name</p>
      <div className="mt-1 flex h-8 items-center rounded-md border border-black/15 px-2.5 text-[12px]">
        Mike Ruiz
      </div>
      <InkButton className="mt-2.5">Sign document</InkButton>
    </div>
  );
}

export function DocumentsFigure() {
  return (
    <Pair
      leftTag={<Tag icon={FileSignature}>Your dashboard</Tag>}
      left={<TemplateGallery />}
      rightTag={<Tag icon={Smartphone}>Driver’s phone</Tag>}
      right={<SignCard />}
    />
  );
}

const CHIPS = [
  "CDL (front and back)",
  "DOT Medical Card",
  "Motor Vehicle Record (MVR)",
  "Social Security Card",
  "Proof of work authorization",
];

function RequestDialog() {
  return (
    <DashboardChrome className="w-[244px]">
      <div className="p-3">
        <p className="text-[13px] font-semibold">Request a file</p>
        <p className="mt-2 text-[10.5px] font-medium">Document</p>
        <div className="mt-1 flex h-7 items-center rounded-md border border-black/15 px-2 text-[11px]">
          CDL (front and back)
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {CHIPS.map((chip, i) => (
            <span
              key={chip}
              className={cn(
                "rounded-full border px-1.5 py-px text-[9.5px]",
                i === 0
                  ? "border-[#26251e] bg-[#26251e] text-white"
                  : "border-black/15 text-[#26251e]/65"
              )}
            >
              {chip}
            </span>
          ))}
        </div>
        <ul className="mt-2.5 space-y-1 border-t border-black/10 pt-2 text-[11px]">
          <li className="flex items-center gap-2">
            <Checkbox /> Mike Ruiz
          </li>
          <li className="flex items-center gap-2">
            <Checkbox /> Dan Novak
          </li>
          <li className="flex items-center gap-2">
            <Checkbox on={false} /> Anna Kim
          </li>
        </ul>
        <InkButton className="mt-2.5">Request (2)</InkButton>
      </div>
    </DashboardChrome>
  );
}

function UploadRow({ name, size, back }: { name: string; size: string; back?: boolean }) {
  return (
    <li className="flex items-center gap-2.5 rounded-md border border-black/10 p-1 pr-2.5">
      <LicenseThumb back={back} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[11.5px] font-medium">{name}</span>
        <span className={cn("block text-[10px]", muted)}>{size}</span>
      </span>
      <Trash2 className="h-3.5 w-3.5 shrink-0 text-[#26251e]/40" />
    </li>
  );
}

function UploadCard() {
  return (
    <div className={cn(surface, "w-[244px] p-3")}>
      <p className={cn("text-[10.5px]", muted)}>Ridgeline Freight</p>
      <p className="text-[15px] font-semibold">CDL (front and back)</p>
      <div className="mt-2.5 flex items-center justify-between text-[10.5px]">
        <span className="font-medium">Your files</span>
        <span className={cn("tabular-nums", muted)}>2 / 5</span>
      </div>
      <ul className="mt-1.5 space-y-1">
        <UploadRow name="IMG_2231.jpg" size="0.8 MB" />
        <UploadRow name="IMG_2232.jpg" size="0.7 MB" back />
      </ul>
      <OutlineButton className="mt-2">
        <Plus className="h-3.5 w-3.5" /> Add another file
      </OutlineButton>
      <InkButton className="mt-1.5">Send files</InkButton>
      <p className={cn("mt-1.5 text-center text-[9.5px]", muted)}>
        Nothing goes to your company until you tap Send.
      </p>
    </div>
  );
}

export function FileRequestsFigure() {
  return (
    <Pair
      leftTag={<Tag icon={FileUp}>Your dashboard</Tag>}
      left={<RequestDialog />}
      rightTag={<Tag icon={Smartphone}>Driver’s phone</Tag>}
      right={<UploadCard />}
    />
  );
}

/* ── How it works: the text a driver gets ────────────────────────────────── */

/**
 * The request text (renderFileRequestSms), then the sign-in code. The real
 * link also carries a sign-in method param, and the text ends "— sign in with
 * this phone number"; the dash is a period here.
 */
export function TextMessageFigure() {
  return (
    <div className="flex w-full max-w-[300px] flex-col items-stretch gap-2.5">
      <div className="self-center">
        <Tag icon={Smartphone}>Text message</Tag>
      </div>
      <div className="max-w-[92%] rounded-[18px] rounded-bl-[5px] bg-[#e9e9eb] px-3.5 py-2.5 text-[12.5px] leading-snug text-black shadow-[0_12px_24px_-14px_rgba(0,0,0,0.6)]">
        Ridgeline Freight needs a copy of your “DOT Medical Card”. Upload it here:{" "}
        <span className="text-[#0a6cff] underline">https://on.raisedash.com</span>. Sign in with
        this phone number.
      </div>
      <ArrowDown className="h-4 w-4 self-center text-white/70" />
      <div className={cn(surface, "p-3.5")}>
        <p className="text-[13px] font-semibold">Sign in to your training</p>
        <p className={cn("mt-0.5 text-[10.5px]", muted)}>
          We sent a 6-digit code to (555) 014-2210.
        </p>
        <div className="mt-2.5 grid grid-cols-6 gap-1.5">
          {["4", "1", "8", "2", "7", "5"].map((digit, i) => (
            <span
              key={i}
              className="grid h-9 place-items-center rounded-md border border-black/15 text-[15px] font-semibold tabular-nums"
            >
              {digit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── What you get ────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { name: "Hiring & screening", count: 5 },
  { name: "Safety & compliance", count: 6 },
  { name: "On the road", count: 8 },
  { name: "Company policies", count: 6 },
];

export function TemplatesFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[250px] p-3")}>
      <p className="text-[12.5px] font-semibold">Start from a template</p>
      <p className={cn("text-[10.5px]", muted)}>25 templates</p>
      <ul className="mt-2 space-y-1">
        {CATEGORIES.map((category) => (
          <li
            key={category.name}
            className="flex items-center justify-between rounded-md border border-black/10 px-2.5 py-1.5 text-[11.5px]"
          >
            {category.name}
            <span className="rounded-full bg-[#26251e]/[0.07] px-1.5 text-[10.5px] tabular-nums">
              {category.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Filled({ children }: { children: string }) {
  return (
    <mark className="rounded-[3px] bg-[#f54e00]/15 px-0.5 whitespace-nowrap text-[#b03a00]">
      {children}
    </mark>
  );
}

/** The drug & alcohol template's first line, with the company filled in. */
export function CompanyDetailsFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[262px] rounded-[3px] p-3.5")}>
      <p className="text-[11.5px] font-semibold">About this document</p>
      <p className="mt-1 text-[10.5px] leading-[1.55] text-[#26251e]/80">
        <Filled>Ridgeline Freight</Filled> (USDOT <Filled>1234567</Filled>) operates commercial
        motor vehicles and is required by federal regulation…
      </p>
      <Lines widths={["100%", "86%", "92%"]} className="mt-2" />
      <p className="mt-2 text-[10.5px] leading-[1.55] text-[#26251e]/80">
        Questions go to the company at <Filled>(555) 014-2210</Filled>.
      </p>
    </div>
  );
}

export function CertificateFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[250px] rounded-[3px] p-3")}>
      <div className="flex items-baseline justify-between border-b border-black/10 pb-1.5">
        <span className="text-[9.5px] font-semibold">Ridgeline Freight</span>
        <span className={cn("text-[9px] tracking-[0.08em] uppercase", muted)}>
          Signature Certificate
        </span>
      </div>
      <p className="mt-2 text-[22px] leading-none" style={script}>
        Mike Ruiz
      </p>
      <p className={cn("mt-1 text-[9.5px]", muted)}>Typed signature: Mike Ruiz</p>
      <p className="mt-2 text-[9.5px] leading-snug">
        Signed in with a one-time code sent by SMS to +15550142210
      </p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-[9.5px]">
        <dt className={muted}>Sent</dt>
        <dd>Sep 30, 2026, 14:05 UTC</dd>
        <dt className={muted}>First viewed</dt>
        <dd>Sep 30, 2026, 18:41 UTC</dd>
        <dt className={muted}>Signed</dt>
        <dd>Sep 30, 2026, 18:47 UTC</dd>
      </dl>
    </div>
  );
}

/** The sign button waits until the driver reaches the end of the document. */
export function ReadFirstFigure() {
  return (
    <div className={cn(surface, "flex w-full max-w-[250px] flex-col p-3")}>
      <div className="relative h-[92px] overflow-hidden rounded-md border border-black/10 bg-[#fbfbf9] p-2.5 pr-4">
        <p className="mb-1.5 text-[10px] font-semibold">What you are acknowledging</p>
        <Lines widths={["100%", "94%", "88%", "97%", "72%", "100%", "90%", "84%"]} />
        <span className="absolute top-1.5 right-1 bottom-1.5 w-[3px] rounded-full bg-black/[0.06]">
          <span className="block h-[34%] rounded-full bg-black/30" />
        </span>
      </div>
      <p className={cn("mt-2.5 text-center text-[10.5px]", muted)}>
        Scroll to the end of the document to sign it.
      </p>
      <span className="mt-2 flex h-8 items-center justify-center gap-1.5 rounded-md bg-[#26251e]/25 text-[11.5px] font-medium text-white">
        <Lock className="h-3 w-3" /> Sign document
      </span>
    </div>
  );
}

const STATUS_ROWS: { driver: string; status: Status }[] = [
  { driver: "Anna Kim", status: "Submitted" },
  { driver: "Mike Ruiz", status: "In progress" },
  { driver: "Dan Novak", status: "Requested" },
];

export function StatusFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[264px] p-3")}>
      <p className="text-[12.5px] font-semibold">Applications</p>
      <ul className="mt-1.5">
        {STATUS_ROWS.map((row) => (
          <li
            key={row.driver}
            className="flex items-center gap-2 border-t border-black/[0.07] py-2 text-[11.5px]"
          >
            <span className="flex-1">{row.driver}</span>
            <Badge status={row.status} />
          </li>
        ))}
      </ul>
      <div className="mt-1 flex justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-black/10 px-2.5 py-1.5 text-[11px] font-medium shadow-[0_6px_14px_-8px_rgba(0,0,0,0.45)]">
          <Bell className="h-3 w-3" /> Remind
        </span>
      </div>
    </div>
  );
}

const TASKS: { title: string; kind: string; status: Status }[] = [
  { title: "Hours of Service basics", kind: "Training", status: "Complete" },
  { title: "Drug & Alcohol Policy Receipt", kind: "Signature", status: "Signed" },
  { title: "DOT Medical Card", kind: "Document", status: "Pending" },
];

/** One driver's page: training and paperwork in the same list. */
export function DriverPageFigure() {
  return (
    <div className={cn(surface, "w-full max-w-[268px] p-3")}>
      <div className="flex items-center gap-2">
        <span className="grid size-6 place-items-center rounded-full bg-[#26251e]/10 text-[9.5px] font-semibold">
          MR
        </span>
        <span className="text-[12.5px] font-semibold">Mike Ruiz</span>
      </div>
      <p className={cn("mt-2 text-[10.5px] font-medium", muted)}>Documents &amp; tasks</p>
      <ul className="mt-1">
        {TASKS.map((task) => (
          <li
            key={task.title}
            className="flex items-center gap-2 border-t border-black/[0.07] py-1.5 text-[11px]"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate">{task.title}</span>
              <span className={cn("block text-[9.5px]", muted)}>{task.kind}</span>
            </span>
            <Badge status={task.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Today vs. with Raisedash ────────────────────────────────────────────── */

const TODAY = [
  "Print the forms",
  "Hand them over or mail them",
  "Wait for the driver to sign",
  "Scan or fax them back",
  "Ask for a photo of the CDL by text",
  "Call about the missing page",
];

const WITH_US = [
  "Pick the drivers and what you need",
  "They finish it on their phone",
  "Download the PDF",
];

export function TwoWays() {
  return (
    <div className="grid gap-4 md:grid-cols-[1.25fr_1fr]">
      <div className="bg-card border-border rounded-xs border p-6 sm:p-8">
        <p className="text-muted-foreground font-mono text-xs tracking-[0.14em] uppercase">
          On paper
        </p>
        <ol className="mt-5 grid gap-2 sm:grid-cols-2">
          {TODAY.map((step, i) => (
            <li
              key={step}
              className="border-border text-muted-foreground flex min-h-11 items-center gap-3 rounded-xs border px-3 py-2 text-sm"
            >
              <span className="text-muted-foreground/70 w-4 shrink-0 text-right font-mono text-xs tabular-nums">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
          And the papers end up in a folder, a desk drawer, and someone’s text messages.
        </p>
      </div>
      <div className="border-accent/30 bg-accent/[0.04] flex flex-col rounded-xs border p-6 sm:p-8">
        <p className="text-accent font-mono text-xs tracking-[0.14em] uppercase">With Raisedash</p>
        <ol className="mt-5 grid gap-2">
          {WITH_US.map((step, i) => (
            <li
              key={step}
              className="border-accent/30 bg-card text-foreground flex min-h-11 items-center gap-3 rounded-xs border px-3 py-2 text-sm"
            >
              <span className="text-accent w-4 shrink-0 text-right font-mono text-xs tabular-nums">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <p className="text-muted-foreground mt-auto pt-5 text-sm leading-relaxed">
          Every driver’s paperwork stays on their page in your dashboard.
        </p>
      </div>
    </div>
  );
}
