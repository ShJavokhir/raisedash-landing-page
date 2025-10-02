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
    "bg-gradient-to-b from-slate-800 to-slate-900 text-white hover:from-slate-700 hover:to-slate-800 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 shadow-lg shadow-slate-900/20 transition-all duration-200 ease-out border border-slate-700/50",
  secondary:
    "bg-gradient-to-b from-slate-100 to-slate-200 text-slate-900 hover:from-slate-50 hover:to-slate-100 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 transition-all duration-200 ease-out border border-slate-300/50",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100/80 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 transition-all duration-200 ease-out",
  destructive:
    "bg-gradient-to-b from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-900/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 transition-all duration-200 ease-out border border-red-600/50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm rounded-md min-h-[44px] sm:min-h-0",
  md: "h-10 px-4 text-sm rounded-lg min-h-[44px] sm:min-h-0",
  lg: "h-12 px-5 text-base rounded-xl min-h-[48px] sm:min-h-0",
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



