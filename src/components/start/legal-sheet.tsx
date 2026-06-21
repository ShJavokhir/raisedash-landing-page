import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Loader2, X } from "lucide-react";
import { Button } from "@/components/start/button";
import { LEGAL_TITLES, type LegalDoc } from "@/components/legal/legal-docs";

/**
 * In-funnel legal viewer for /start. Shows the Privacy Policy / Terms of Use in a
 * bottom sheet INSTEAD of navigating away, because the funnel runs in the FB/IG
 * in-app browser where opening a link (even target="_blank") can replace the only
 * tab and silently discard the user's in-progress answers. The funnel stays
 * mounted underneath, so closing the sheet returns the user exactly where they
 * were. The legal copy is lazy-loaded (next/dynamic) so it never weighs down the
 * funnel's first paint — it's fetched only if someone actually taps a link.
 */
const LegalContent = dynamic(
  () => import("@/components/legal/legal-content").then((m) => m.LegalContent),
  {
    loading: () => (
      <div className="flex justify-center py-12">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    ),
  }
);

export function LegalSheet({ doc, onClose }: { doc: LegalDoc | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = doc !== null;

  // While open: lock the page behind from scrolling, close on Escape, and move
  // focus into the sheet. Everything is restored on close/unmount.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!doc) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={LEGAL_TITLES[doc]}
    >
      <div
        className="animate-in fade-in-0 absolute inset-0 bg-black/50 duration-200"
        onClick={onClose}
        aria-hidden
      />
      <div className="animate-in slide-in-from-bottom-4 bg-card relative flex max-h-[88dvh] w-full max-w-md flex-col rounded-t-2xl border shadow-xl duration-300">
        <header className="flex items-center justify-between gap-3 border-b px-5 py-4">
          <h2 className="text-base font-semibold tracking-tight">{LEGAL_TITLES[doc]}</h2>
          <Button
            ref={closeRef}
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground -mr-2 size-10 shrink-0"
          >
            <X className="size-5" />
          </Button>
        </header>
        <div className="overflow-y-auto overscroll-contain px-5 py-5">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <LegalContent doc={doc} />
          </div>
        </div>
      </div>
    </div>
  );
}
