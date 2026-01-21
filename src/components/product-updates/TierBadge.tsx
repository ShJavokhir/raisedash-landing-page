import { ProductUpdateTier } from "@/lib/product-updates";
import { cn } from "@/lib/cn";

interface TierBadgeProps {
  tier: ProductUpdateTier;
  className?: string;
}

const tierConfig: Record<ProductUpdateTier, { label: string; className: string }> = {
  P0: {
    label: "Major",
    className: "bg-[#D04841]/10 text-[#D04841] dark:bg-[#D04841]/20",
  },
  P1: {
    label: "Enhancement",
    className: "bg-[#19224A]/10 text-[#19224A] dark:bg-[#1E293B]/30 dark:text-foreground",
  },
  P2: {
    label: "Improvement",
    className: "bg-muted text-muted-foreground",
  },
};

export function TierBadge({ tier, className }: TierBadgeProps) {
  const config = tierConfig[tier];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
