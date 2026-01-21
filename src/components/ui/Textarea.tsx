import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, required, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-[#2E2D2D] dark:text-foreground mb-2"
          >
            {label}
            {required && " *"}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          className={cn(
            "w-full px-4 py-3 border border-[#DAD6D5] dark:border-border rounded-lg bg-white dark:bg-card text-[#181717] dark:text-foreground",
            "placeholder:text-[rgba(24,23,23,0.5)] dark:placeholder:text-muted-foreground resize-none",
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

Textarea.displayName = "Textarea";

export default Textarea;
