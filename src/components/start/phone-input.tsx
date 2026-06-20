import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { formatPhone, toE164, displayPhone, isValidPhone } from "@/lib/phone";

/**
 * One phone field for the funnel. Copied from the dashboard's
 * components/ui/phone-input.tsx. Shows a fixed `+1` (US/Canada share the NANP
 * country code), auto-formats to `(555) 123-4567` as you type, and emits a
 * canonical E.164 string (`+15551234567`) — or `''` while incomplete — so every
 * caller stores something SMS-deliverable. An inline hint flags a partially-typed
 * number instead of silently dropping it.
 */
export function PhoneInput({
  value,
  onChange,
  id,
  placeholder = "(555) 123-4567",
  disabled,
  className,
}: {
  /** Canonical value: E.164 (e.g. "+15551234567") or "". */
  value: string;
  /** Called with E.164 when 10 digits are present, otherwise "". */
  onChange: (e164OrEmpty: string) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [display, setDisplay] = useState(() => displayPhone(value));
  const focused = useRef(false);

  // Re-sync the visible text when the canonical value changes from outside
  // (edit-form load, parent form reset) and the user isn't mid-edit.
  useEffect(() => {
    if (focused.current) return;
    const current = toE164(display) ?? "";
    // Intentional external-sync: mirror the canonical `value` prop into the
    // visible text, but only when the user isn't mid-edit (focus ref guards it).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (current !== (value ?? "")) setDisplay(displayPhone(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const digits = display.replace(/\D/g, "").length;
  const incomplete = digits > 0 && !isValidPhone(display);

  return (
    <div className={className}>
      <div
        className={cn(
          "border-input focus-within:border-ring focus-within:ring-ring/50 dark:bg-input/30 flex h-8 w-full items-center rounded-lg border bg-transparent text-base transition-colors focus-within:ring-3 md:text-sm",
          incomplete &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <span className="text-muted-foreground pr-1.5 pl-2.5 select-none">+1</span>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          disabled={disabled}
          value={display}
          placeholder={placeholder}
          onFocus={() => (focused.current = true)}
          onBlur={() => (focused.current = false)}
          onChange={(e) => {
            const next = formatPhone(e.target.value);
            setDisplay(next);
            onChange(toE164(next) ?? "");
          }}
          className="placeholder:text-muted-foreground h-full w-full min-w-0 rounded-r-lg bg-transparent pr-2.5 outline-none disabled:cursor-not-allowed"
        />
      </div>
      {incomplete && (
        <p className="text-destructive mt-1 text-xs">Enter a 10-digit US or Canada number.</p>
      )}
    </div>
  );
}
