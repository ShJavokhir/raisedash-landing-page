import * as React from "react";
import { cn } from "@/lib/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "destructive";

type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary dark:bg-foreground text-white dark:text-background hover:opacity-90 border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:focus-visible:ring-foreground/50 transition-all duration-150 ease-in-out",
  secondary:
    "bg-white dark:bg-card text-foreground border border-border hover:bg-background dark:hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 transition-all duration-150 ease-in-out",
  ghost:
    "bg-transparent text-foreground underline hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 transition-all duration-150 ease-in-out",
  destructive:
    "bg-destructive text-white hover:opacity-90 border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/50 transition-all duration-150 ease-in-out",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm rounded-lg min-h-[44px] sm:min-h-0",
  md: "h-10 px-4 text-sm rounded-lg min-h-[44px] sm:min-h-0",
  lg: "h-12 px-5 text-base rounded-lg min-h-[48px] sm:min-h-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { className, variant = "primary", size = "md", ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

export default Button;



