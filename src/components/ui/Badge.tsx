import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-lg border px-3 py-1 text-xs font-medium transition-colors duration-150 focus:outline-none",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#1F1E1E] dark:bg-foreground text-white dark:text-background hover:opacity-90",
        secondary:
          "border-[#EEEBEA] dark:border-border bg-white dark:bg-card text-[#2E2D2D] dark:text-foreground hover:bg-[#F9F7F6] dark:hover:bg-secondary",
        destructive:
          "border-transparent bg-[#D04841] text-white hover:opacity-90",
        outline: "border-[#EEEBEA] text-[#2E2D2D] dark:border-border dark:text-foreground",
        accent:
          "border-transparent bg-[#D04841]/10 dark:bg-accent/10 text-[#D04841] dark:text-accent",
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
