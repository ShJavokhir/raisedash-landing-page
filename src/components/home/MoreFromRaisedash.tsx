import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

const ACADEMY_URL = (
  process.env.NEXT_PUBLIC_ACADEMY_URL || "https://academy.raisedash.com"
).replace(/\/$/, "");

export function MoreFromRaisedash() {
  return (
    <Container className="pb-12 md:px-0">
      <p className="text-muted-foreground mb-1 text-sm font-normal tracking-wide uppercase">
        More from Raisedash
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <a
          href={ACADEMY_URL}
          className="border-border bg-card hover:bg-surface-2 group flex items-center justify-between gap-4 rounded-xs border p-5 transition-colors duration-150"
        >
          <div className="min-w-0">
            <span className="bg-surface-3 text-foreground mb-2 inline-block w-fit rounded-xs px-2 py-0.5 text-xs font-normal">
              Driver training
            </span>
            <h3 className="text-foreground text-base font-normal">Raisedash Academy</h3>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              CDL courses for drivers and small carriers.
            </p>
          </div>
          <ArrowRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0 transition-colors" />
        </a>

        <Link
          href="/tools/elp-practice"
          className="border-border bg-card hover:bg-surface-2 group flex items-center justify-between gap-4 rounded-xs border p-5 transition-colors duration-150"
        >
          <div className="min-w-0">
            <span className="bg-surface-3 text-foreground mb-2 inline-block w-fit rounded-xs px-2 py-0.5 text-xs font-normal">
              CDL English practice
            </span>
            <h3 className="text-foreground text-base font-normal">TruckTalk ELP Practice</h3>
            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
              Practice roadside English with an AI officer.
            </p>
          </div>
          <ArrowRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 shrink-0 transition-colors" />
        </Link>
      </div>
    </Container>
  );
}

export default MoreFromRaisedash;
