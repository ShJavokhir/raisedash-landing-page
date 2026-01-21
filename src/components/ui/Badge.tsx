import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-3 py-1 text-xs font-medium transition-colors duration-150 focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary dark:bg-foreground text-white dark:text-background hover:opacity-90",
        secondary:
          "border-border bg-white dark:bg-card text-foreground hover:bg-background dark:hover:bg-secondary",
        destructive:
          "border-transparent bg-destructive text-white hover:opacity-90",
        outline: "border-border text-foreground",
        accent:
          "border-transparent bg-destructive/10 dark:bg-accent/10 text-destructive dark:text-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
