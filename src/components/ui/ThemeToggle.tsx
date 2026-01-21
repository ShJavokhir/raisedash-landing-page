"use client";
import * as React from "react";
import { getCurrentTheme, toggleTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/cn";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    setMounted(true);
    setTheme(getCurrentTheme());
  }, []);

  // Prevent hydration mismatch by rendering placeholder until mounted
  if (!mounted) {
    return <div className="w-8 h-8" />;
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(toggleTheme())}
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-xs",
        "bg-transparent hover:bg-surface-3",
        "text-foreground hover:text-foreground-80",
        "transition-colors duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default ThemeToggle;
