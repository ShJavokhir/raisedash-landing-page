import * as React from "react";
import { cn } from "@/lib/cn";

export interface PlatformStep {
  title: string;
  description: string;
}

interface StepListProps {
  steps: PlatformStep[];
  className?: string;
}

/**
 * Numbered "how it works" steps. Renders as a connected vertical list that
 * stays legible from 3 to 5 steps. Numbers are decorative; the copy carries
 * the meaning.
 */
export function StepList({ steps, className }: StepListProps) {
  return (
    <ol className={cn("relative space-y-6", className)}>
      {steps.map((step, index) => (
        <li key={step.title} className="relative flex gap-5">
          <div className="flex flex-col items-center">
            <span className="border-border bg-card text-foreground flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border text-sm">
              {index + 1}
            </span>
            {index < steps.length - 1 ? (
              <span className="bg-border mt-1 w-px flex-1" aria-hidden="true" />
            ) : null}
          </div>
          <div className="pb-2">
            <h3 className="text-foreground text-lg font-normal tracking-[-0.01em]">{step.title}</h3>
            <p className="text-muted-foreground mt-1.5 max-w-2xl text-base leading-relaxed font-normal">
              {step.description}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
