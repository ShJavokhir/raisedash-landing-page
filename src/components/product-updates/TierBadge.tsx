import { ProductUpdateTier } from "@/lib/product-updates";
import { cn } from "@/lib/cn";

interface TierBadgeProps {
  tier: ProductUpdateTier;
  className?: string;
}

const tierConfig: Record<ProductUpdateTier, { label: string; className: string }> = {
  P0: {
    label: "Major",
    className: "bg-accent/10 text-accent",
  },
  P1: {
    label: "Enhancement",
    className: "bg-surface-3 text-foreground",
  },
  P2: {
    label: "Improvement",
    className: "bg-surface-3 text-muted-foreground",
  },
};

export function TierBadge({ tier, className }: TierBadgeProps) {
  const config = tierConfig[tier];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-xs text-xs font-normal",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
