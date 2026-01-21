import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-xs border px-2 py-0.5 text-xs font-normal transition-colors duration-[0.15s] ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-[#3b3a33]",
        secondary:
          "border-border bg-secondary text-secondary-foreground hover:bg-surface-3",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/90",
        outline:
          "border-border bg-transparent text-foreground hover:bg-muted",
        accent:
          "border-transparent bg-accent/10 text-accent dark:bg-accent/20",
        muted:
          "border-transparent bg-surface-3 text-muted-foreground",
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
