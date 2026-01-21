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

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-[#2E2D2D] dark:text-foreground mb-2"
          >
            {label}
            {required && " *"}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          required={required}
          className={cn(
            "w-full px-4 py-3 border border-[#DAD6D5] dark:border-border rounded-lg bg-white dark:bg-card text-[#181717] dark:text-foreground",
            "focus:outline-none focus:border-[#2E2D2D] dark:focus:border-foreground",
            "transition-colors duration-150",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[#D04841] dark:border-destructive focus:border-[#D04841] dark:focus:border-destructive",
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
          <p className="mt-2 text-sm text-[#D04841] dark:text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
