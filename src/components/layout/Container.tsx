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
        // Below sm the 20px page gutter comes from the body padding in
        // globals.css — px-5 here on top of it left every section 40px inset
        // per side on a 390px phone. Card-style Containers (bg/border) that
        // need inner padding on mobile must bring their own px.
        "mx-auto w-full px-0 sm:px-5",
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
