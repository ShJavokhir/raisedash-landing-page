import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, required, options, ...props }, ref) => {
    const selectId = id || props.name;
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
            {required && " *"}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          required={required}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={errorId}
          className={cn(
            "w-full px-4 py-3 border border-input rounded-lg bg-white dark:bg-card text-foreground",
            "focus:outline-none focus:border-foreground",
            "transition-colors duration-150",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-destructive focus:border-destructive",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="mt-2 text-sm text-destructive" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
