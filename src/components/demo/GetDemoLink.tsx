import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDemoHref } from "@/data/demo";
import { cn } from "@/lib/cn";

export function GetDemoLink({ product, className }: { product: string; className?: string }) {
  return (
    <Link
      href={getDemoHref(product)}
      className={cn(
        "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-base transition-[background-color,transform] duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 active:scale-[0.97] motion-reduce:active:scale-100",
        className
      )}
    >
      Get a demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}
