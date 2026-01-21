import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "light" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
}

const focusRing =
  "outline outline-offset-2 outline-0 focus-visible:outline-2 outline-primary dark:outline-primary";

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "border-transparent",
    "text-white",
    "bg-primary",
    "hover:bg-primary/90",
    "disabled:bg-primary/50 disabled:text-white/70",
    "shadow-sm",
  ].join(" "),
  secondary: [
    "border border-border",
    "text-foreground",
    "bg-white dark:bg-card",
    "hover:bg-muted dark:hover:bg-secondary",
    "disabled:text-muted-foreground",
    "shadow-sm",
  ].join(" "),
  light: [
    "border-transparent",
    "text-foreground",
    "bg-muted",
    "hover:bg-muted/70",
    "disabled:bg-muted/50 disabled:text-muted-foreground",
    "shadow-none",
  ].join(" "),
  ghost: [
    "border-transparent",
    "text-foreground",
    "bg-transparent",
    "hover:bg-muted",
    "disabled:text-muted-foreground",
    "shadow-none",
  ].join(" "),
  destructive: [
    "border-transparent",
    "text-white",
    "bg-destructive",
    "hover:bg-destructive/90",
    "disabled:bg-destructive/50 disabled:text-white/70",
    "shadow-sm",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 py-2 text-sm rounded-md",
  md: "h-10 px-4 py-2 text-sm rounded-md",
  lg: "h-12 px-5 py-3 text-base rounded-md",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center border font-medium whitespace-nowrap transition-all duration-100 ease-in-out cursor-pointer",
          "disabled:pointer-events-none disabled:cursor-not-allowed",
          focusRing,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="pointer-events-none flex shrink-0 items-center justify-center gap-2">
            <svg
              className="size-4 shrink-0 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">{loadingText ?? "Loading"}</span>
            {loadingText ?? children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

export default Button;



