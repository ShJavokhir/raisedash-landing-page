"use client";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import { getCurrentTheme, toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  return (
    <Button
      variant="secondary"
      size="sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(toggleTheme())}
    >
      {theme === "dark" ? "Switch to light" : "Switch to dark"}
    </Button>
  );
}

export default ThemeToggle;


