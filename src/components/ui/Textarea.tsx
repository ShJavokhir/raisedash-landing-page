import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, required, ...props }, ref) => {
    const textareaId = id || props.name;
    const errorId = error ? `${textareaId}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="text-foreground mb-2 block text-sm font-normal">
            {label}
            {required && " *"}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn(
            "border-border bg-background text-foreground w-full rounded-xs border px-4 py-2.5 text-sm",
            "placeholder:text-muted-foreground/50 resize-none",
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

Textarea.displayName = "Textarea";

export default Textarea;
