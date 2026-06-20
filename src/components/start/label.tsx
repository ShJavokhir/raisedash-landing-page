import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Ported from the dashboard's components/ui/label.tsx. Radix's Label primitive
 * is swapped for a native <label> (identical click-to-focus + a11y association
 * via htmlFor) so the funnel needs no extra dependency. Classes are verbatim.
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Label };
