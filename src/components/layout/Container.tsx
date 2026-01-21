import * as React from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  size?: "default" | "narrow" | "wide";
}

export function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5",
        size === "default" && "max-w-[1200px]",
        size === "narrow" && "max-w-[768px]",
        size === "wide" && "max-w-[1300px]",
        className
      )}
      {...props}
    />
  );
}

export default Container;
