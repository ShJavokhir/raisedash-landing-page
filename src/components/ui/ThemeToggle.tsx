"use client";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import { getCurrentTheme, toggleTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    setMounted(true);
    setTheme(getCurrentTheme());
  }, []);

  // Prevent hydration mismatch by rendering placeholder until mounted
  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <Button
      variant="primary"
      size="sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(toggleTheme())}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}

export default ThemeToggle;


