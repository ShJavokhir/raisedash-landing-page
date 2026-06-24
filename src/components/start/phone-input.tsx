import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  formatPhone,
  toE164,
  displayPhone,
  isValidPhone,
  formatIntlPhone,
  toIntlE164,
  displayIntlPhone,
  isValidIntlPhone,
} from "@/lib/phone";

/**
 * One phone field for the funnel. Copied from the dashboard's
 * components/ui/phone-input.tsx. By default shows a fixed `+1` (US/Canada share
 * the NANP country code), auto-formats to `(555) 123-4567` as you type, and emits
 * a canonical E.164 string (`+15551234567`) — or `''` while incomplete — so every
 * caller stores something SMS-deliverable. An inline hint flags a partially-typed
 * number instead of silently dropping it.
 *
 * Pass `international` for the /start-v2 lead funnel (no SMS, just a callback):
 * the prefix becomes an editable `+`, the user types their own country code, and
 * validation/formatting use the permissive *Intl helpers. The default is off, so
 * the live /start funnel renders and behaves exactly as before.
 */
export function PhoneInput({
  value,
  onChange,
  id,
  placeholder,
  disabled,
  className,
  international = false,
}: {
  /** Canonical value: E.164 (e.g. "+15551234567") or "". */
  value: string;
  /** Called with E.164 when the number is complete, otherwise "". */
  onChange: (e164OrEmpty: string) => void;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Accept any country code instead of forcing US/Canada (+1). */
  international?: boolean;
}) {
  const format = international ? formatIntlPhone : formatPhone;
  const toCanonical = international ? toIntlE164 : toE164;
  const toDisplay = international ? displayIntlPhone : displayPhone;
  const isComplete = international ? isValidIntlPhone : isValidPhone;
  const prefix = international ? "+" : "+1";
  const fieldPlaceholder = placeholder ?? (international ? "1 555 123 4567" : "(555) 123-4567");
  const incompleteHint = international
    ? "Enter your phone number, including country code."
    : "Enter a 10-digit US or Canada number.";

  const [display, setDisplay] = useState(() => toDisplay(value));
  const focused = useRef(false);

  // Re-sync the visible text when the canonical value changes from outside
  // (edit-form load, parent form reset) and the user isn't mid-edit.
  useEffect(() => {
    if (focused.current) return;
    const current = toCanonical(display) ?? "";
    // Intentional external-sync: mirror the canonical `value` prop into the
    // visible text, but only when the user isn't mid-edit (focus ref guards it).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (current !== (value ?? "")) setDisplay(toDisplay(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const digits = display.replace(/\D/g, "").length;
  const incomplete = digits > 0 && !isComplete(display);

  return (
    <div className={className}>
      <div
        className={cn(
          "border-input focus-within:border-ring focus-within:ring-ring/50 bg-card flex h-12 w-full items-center rounded-xl border text-base transition-colors focus-within:ring-3",
          incomplete &&
            "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <span className="text-muted-foreground pr-2 pl-4 select-none">{prefix}</span>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete={international ? "tel" : "tel-national"}
          disabled={disabled}
          value={display}
          placeholder={fieldPlaceholder}
          onFocus={() => (focused.current = true)}
          onBlur={() => (focused.current = false)}
          onChange={(e) => {
            const next = format(e.target.value);
            setDisplay(next);
            onChange(toCanonical(next) ?? "");
          }}
          className="placeholder:text-muted-foreground h-full w-full min-w-0 rounded-r-xl bg-transparent pr-4 outline-none disabled:cursor-not-allowed"
        />
      </div>
      {incomplete && <p className="text-destructive mt-1 text-xs">{incompleteHint}</p>}
    </div>
  );
}
