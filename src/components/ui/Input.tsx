import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, required, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#2E2D2D] dark:text-foreground mb-2"
          >
            {label}
            {required && " *"}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={cn(
            "w-full px-4 py-3 border border-[#DAD6D5] dark:border-border rounded-lg bg-white dark:bg-card text-[#181717] dark:text-foreground",
            "placeholder:text-[rgba(24,23,23,0.5)] dark:placeholder:text-muted-foreground",
            "focus:outline-none focus:border-[#2E2D2D] dark:focus:border-foreground",
            "transition-colors duration-150",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[#D04841] dark:border-destructive focus:border-[#D04841] dark:focus:border-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-[#D04841] dark:text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
