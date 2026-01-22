import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailCaptureProps {
  className?: string;
  variant?: "default" | "dark";
  buttonText?: string;
  placeholder?: string;
  source?: string;
}

export function EmailCapture({
  className,
  variant = "default",
  buttonText = "Get Started Today",
  placeholder = "What's your work email?",
  source = "Homepage",
}: EmailCaptureProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string): boolean => {
    return email.includes("@") && email.includes(".");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Please enter your email");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    // Log email capture to Telegram (fire and forget)
    fetch("/api/email-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmedEmail, source }),
    }).catch(() => {
      // Silently fail - don't block navigation
    });

    router.push({
      pathname: "/get-started",
      query: { email: trimmedEmail },
    });
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-md", className)}>
      <div
        className={cn(
          "relative inline-flex w-full items-center gap-x-1 rounded-md p-1",
          "flex-col lg:flex-row",
          "transition-colors duration-150",
          // Default variant
          !isDark && ["bg-card border-border border", "focus-within:border-foreground/30"],
          // Dark variant (for primary bg)
          isDark && ["border border-white/20 bg-white/10", "focus-within:border-white/40"]
        )}
      >
        <label className="sr-only" htmlFor="email-capture">
          Email
        </label>

        {/* Input wrapper */}
        <div className="block w-full grow">
          <input
            id="email-capture"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder={placeholder}
            aria-label="Enter your work email"
            className={cn(
              "w-full text-sm transition-all duration-150",
              "focus:ring-0 focus:outline-none",
              "placeholder:text-muted-foreground/60",
              // Mobile: has border
              "h-10 rounded-sm px-3 text-center",
              "border-border bg-background border",
              // Desktop: no border, transparent bg
              "lg:h-10 lg:rounded-sm lg:border-none lg:bg-transparent lg:pr-2 lg:pl-3 lg:text-left",
              // Default variant
              !isDark && "text-foreground",
              // Dark variant
              isDark && [
                "text-white placeholder:text-white/50",
                "border-white/20 bg-white/5",
                "lg:border-none lg:bg-transparent",
              ]
            )}
          />
        </div>

        {/* Button */}
        <div className="mt-1 w-full shrink-0 whitespace-nowrap lg:mt-0 lg:w-auto">
          <button
            type="submit"
            className={cn(
              "group relative flex w-full cursor-pointer items-center justify-center",
              "h-10 rounded-sm px-4 text-sm font-medium",
              "transition-colors duration-150",
              "focus:ring-2 focus:ring-offset-2 focus:outline-none",
              // Default variant
              !isDark && [
                "bg-primary text-primary-foreground",
                "hover:bg-[#3b3a33]",
                "focus:ring-ring focus:ring-offset-card",
              ],
              // Dark variant
              isDark && [
                "text-primary bg-white",
                "hover:bg-white/90",
                "focus:ring-offset-primary focus:ring-white/30",
              ]
            )}
          >
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {error && (
        <p className={cn("mt-2 text-sm", isDark ? "text-red-300" : "text-destructive")}>{error}</p>
      )}
    </form>
  );
}

export default EmailCapture;
