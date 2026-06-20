import { type ReactNode } from "react";
import { Label } from "@/components/start/label";

/** Stacked label + control. Copied from the dashboard's components/ui/form-field.tsx. */
export function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  /** Associate the label with the control's id (focus-on-tap + a11y naming). */
  htmlFor?: string;
  /** Show a subtle required marker after the label. */
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={htmlFor}>
        {label}
        {required && (
          <span aria-hidden="true" className="text-destructive ml-0.5">
            *
          </span>
        )}
      </Label>
      {children}
    </div>
  );
}
