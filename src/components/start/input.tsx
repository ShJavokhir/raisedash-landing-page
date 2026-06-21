import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Based on the dashboard's components/ui/input.tsx, but sized up for the public
 * /start funnel: this only ever renders inside the Meta-ad mobile in-app browser,
 * so it's a tall (h-12) field with `text-base` kept at every breakpoint — 16px
 * input text is what stops iOS Safari from zooming on focus. Sits on `bg-card`
 * (white) like the choice buttons, so fields read as solid against the cream page.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 bg-card h-12 w-full min-w-0 rounded-xl border px-4 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-3",
        className
      )}
      {...props}
    />
  );
}

export { Input };
