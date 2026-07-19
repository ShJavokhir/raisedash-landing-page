import type { CSSProperties } from "react";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface VignetteCursorProps {
  className?: string;
  fromX?: string;
  fromY?: string;
}

type CursorStyle = CSSProperties & {
  "--cursor-from-x": string;
  "--cursor-from-y": string;
};

/**
 * A visual-only cursor for looping product figures. Position the component's
 * top-left corner on the click target; the shared animation handles approach,
 * press feedback, and exit.
 */
export function VignetteCursor({ className, fromX = "4rem", fromY = "3rem" }: VignetteCursorProps) {
  const style: CursorStyle = {
    "--cursor-from-x": fromX,
    "--cursor-from-y": fromY,
  };

  return (
    <span
      aria-hidden="true"
      className={cn(
        "text-foreground animate-figure-cursor-click pointer-events-none absolute z-20",
        className
      )}
      style={style}
    >
      <MousePointer2
        className="h-5 w-5 [stroke:var(--background)] drop-shadow-sm"
        fill="currentColor"
      />
      <span className="border-foreground/40 animate-figure-cursor-ring absolute -top-2 -left-2 h-5 w-5 rounded-full border" />
    </span>
  );
}

export default VignetteCursor;
