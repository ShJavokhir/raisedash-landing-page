/**
 * Focus ring utilities for consistent keyboard focus styles
 */

export const focusRing = [
  "outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-primary/50",
  "focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background",
].join(" ");

export const focusInput = [
  "outline-none",
  "focus:ring-2",
  "focus:ring-primary/20",
  "focus:border-primary",
].join(" ");

export const focusVisible = [
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-primary",
  "focus-visible:ring-offset-2",
].join(" ");
