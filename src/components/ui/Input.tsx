import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, required, ...props }, ref) => {
    const inputId = id || props.name;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="text-foreground mb-2 block text-sm font-normal">
            {label}
            {required && " *"}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn(
            "border-border bg-background text-foreground w-full rounded-xs border px-4 py-2.5 text-sm",
            "placeholder:text-muted-foreground/50",
            "focus:ring-ring focus:ring-offset-background focus:ring-2 focus:ring-offset-2 focus:outline-none",
            "transition-[border-color,box-shadow] duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive focus:ring-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-destructive mt-2 text-sm" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
