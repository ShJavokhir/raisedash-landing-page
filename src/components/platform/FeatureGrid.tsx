import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PlatformFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export type FeatureAccent = "blue" | "amber" | "green" | "violet";

const ACCENT_CHIP: Record<FeatureAccent, string> = {
  blue: "bg-accent-blue-soft border-accent-blue/20 text-accent-blue",
  amber: "bg-accent-amber-soft border-accent-amber/20 text-accent-amber",
  green: "bg-success/10 border-success/20 text-success",
  violet: "bg-accent-violet-soft border-accent-violet/20 text-accent-violet",
};

interface FeatureGridProps {
  features: PlatformFeature[];
  /** Columns at the lg breakpoint. Defaults to 3. */
  columns?: 2 | 3 | 4;
  /** Page accent for the icon chips — keeps each platform page's identity. */
  accent?: FeatureAccent;
  className?: string;
}

/**
 * Responsive grid of short feature cards, styled to match the homepage value
 * cards (icon chip, title, one-line description, subtle hover lift).
 */
export function FeatureGrid({ features, columns = 3, accent, className }: FeatureGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
        className
      )}
    >
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <div
            key={feature.title}
            className="group bg-card border-border hover:bg-surface-2 flex flex-col rounded-xs border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5"
          >
            <div
              className={cn(
                "group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary mb-4 flex h-10 w-10 items-center justify-center rounded-xs border transition-colors duration-[0.15s]",
                accent ? ACCENT_CHIP[accent] : "bg-surface-2 border-border text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-foreground mb-2 text-base font-normal tracking-[-0.01em]">
              {feature.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-normal">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
