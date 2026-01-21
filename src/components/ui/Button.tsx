import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "light" | "ghost" | "destructive" | "accent";
type ButtonSize = "xs" | "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  pill?: boolean;
}

const focusRing =
  "outline outline-offset-2 outline-0 focus-visible:outline-2 outline-ring";

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "border border-primary",
    "text-primary-foreground",
    "bg-primary",
    "hover:bg-[#3b3a33] hover:border-[#3b3a33]",
    "disabled:bg-primary/50 disabled:border-primary/50 disabled:text-primary-foreground/70",
  ].join(" "),
  secondary: [
    "border border-border",
    "text-foreground",
    "bg-secondary",
    "hover:bg-surface-3",
    "disabled:text-muted-foreground disabled:bg-secondary/50",
  ].join(" "),
  light: [
    "border border-transparent",
    "text-foreground",
    "bg-muted",
    "hover:bg-surface-3",
    "disabled:bg-muted/50 disabled:text-muted-foreground",
  ].join(" "),
  ghost: [
    "border border-transparent",
    "text-foreground",
    "bg-transparent",
    "hover:bg-muted",
    "disabled:text-muted-foreground",
  ].join(" "),
  destructive: [
    "border border-destructive",
    "text-destructive-foreground",
    "bg-destructive",
    "hover:bg-destructive/90 hover:border-destructive/90",
    "disabled:bg-destructive/50 disabled:border-destructive/50 disabled:text-destructive-foreground/70",
  ].join(" "),
  accent: [
    "border border-accent",
    "text-accent-foreground",
    "bg-accent",
    "hover:bg-accent/90 hover:border-accent/90",
    "disabled:bg-accent/50 disabled:border-accent/50 disabled:text-accent-foreground/70",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "h-7 px-2.5 py-1 text-xs",
  sm: "h-8 px-3 py-1.5 text-sm",
  md: "h-9 px-4 py-2 text-sm",
  lg: "h-11 px-5 py-2.5 text-base",
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
      pill = true,
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
          "relative inline-flex items-center justify-center font-normal whitespace-nowrap cursor-pointer",
          "transition-[background-color,border-color,color] duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)]",
          "disabled:pointer-events-none disabled:cursor-not-allowed",
          focusRing,
          variantClasses[variant],
          sizeClasses[size],
          pill ? "rounded-full" : "rounded-xs",
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
