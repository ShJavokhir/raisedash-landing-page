import { useCopy } from "@/components/i18n/LocaleProvider";
import { sharedCopy } from "@/i18n/shared";
import { cn } from "@/lib/cn";

// The same figures as the homepage line (src/pages/index.tsx). They count all
// of Raisedash, so the copy never ties them to the one tool on the page.
const COMPANIES = "100+";
const DRIVERS = "1,000+";

/**
 * The homepage's "Trusted by" line for a tool page's hero, on the same white
 * card. It reads as one sentence (label, figure, noun, figure, noun) for
 * screen readers; on screen the two figures stand side by side.
 */
export function TrustedBy({ className }: { className?: string }) {
  const t = useCopy(sharedCopy).trust;

  return (
    <p
      className={cn(
        "bg-card border-border rounded-xs border px-5 py-4 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_10px_24px_-14px_rgb(0_0_0/0.18)] sm:w-fit sm:px-6 sm:py-5",
        className
      )}
    >
      <span className="text-muted-foreground block font-mono text-xs tracking-[0.14em] uppercase">
        {t.label}
      </span>
      <span className="mt-3 grid grid-cols-2">
        <span className="pr-5 sm:pr-6">
          <span className="text-foreground block text-[32px] leading-none font-normal tracking-[-0.03em] tabular-nums sm:text-[40px]">
            {COMPANIES}
          </span>
          <span className="text-muted-foreground mt-2 block text-sm leading-snug">
            {t.companies}
          </span>
        </span>
        <span className="sr-only"> {t.and} </span>
        <span className="border-border border-l pl-5 sm:pl-6">
          <span className="text-foreground block text-[32px] leading-none font-normal tracking-[-0.03em] tabular-nums sm:text-[40px]">
            {DRIVERS}
          </span>
          <span className="text-muted-foreground mt-2 block text-sm leading-snug">{t.drivers}</span>
        </span>
      </span>
    </p>
  );
}
