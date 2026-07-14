import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * Illustrative UI "chrome" wrappers used by the platform-page vignettes. These
 * render small, obviously-generic product mockups built from styled divs and
 * design tokens only — no screenshots, no real customer data. Placeholder
 * driver names are initials-only so they read as examples, not real people.
 */

interface BrowserFrameProps {
  /** The URL shown in the fake address bar, e.g. "app.raisedash.com/readiness". */
  url: string;
  children: React.ReactNode;
  className?: string;
}

export function BrowserFrame({ url, children, className }: BrowserFrameProps) {
  return (
    <div
      className={cn("border-border bg-card overflow-hidden rounded-xs border shadow-lg", className)}
    >
      {/* Window chrome */}
      <div className="border-border bg-surface-2 flex h-9 items-center gap-2 border-b px-3">
        <div className="flex gap-1.5">
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
          <span className="bg-border h-2.5 w-2.5 rounded-full" />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="border-border bg-background flex h-5 items-center rounded-full border px-3">
            <span className="text-muted-foreground text-[10px] leading-none">{url}</span>
          </div>
        </div>
      </div>
      {/* Screen */}
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

interface PhoneFrameProps {
  /** Small caption above the screen, e.g. a carrier name or SMS sender. */
  caption?: string;
  children: React.ReactNode;
  className?: string;
}

export function PhoneFrame({ caption, children, className }: PhoneFrameProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[280px]", className)}>
      <div className="border-border bg-card rounded-[1.75rem] border p-2.5 shadow-lg">
        <div className="border-border bg-background overflow-hidden rounded-[1.35rem] border">
          {/* Status bar */}
          <div className="text-muted-foreground flex items-center justify-between px-4 pt-2.5 pb-1 text-[10px]">
            <span>9:41</span>
            <span className="bg-border/60 h-1.5 w-10 rounded-full" />
            <span>5G</span>
          </div>
          {caption ? (
            <div className="border-border border-b px-4 py-2">
              <p className="text-muted-foreground text-[10px] tracking-wide uppercase">{caption}</p>
            </div>
          ) : null}
          <div className="px-4 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
