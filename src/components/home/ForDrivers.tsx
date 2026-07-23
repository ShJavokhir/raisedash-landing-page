import Link from "next/link";
import { ArrowRight, KeyRound, Smartphone, Globe } from "lucide-react";
import { Container } from "@/components/layout/Container";

const points = [
  {
    icon: Smartphone,
    title: "Open from a text",
  },
  {
    icon: KeyRound,
    title: "No password",
  },
  {
    icon: Globe,
    title: "No app to install",
  },
];

export function ForDrivers() {
  return (
    <Container className="pb-12 md:px-0">
      <div className="border-border bg-card rounded-xs border p-6 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-end">
          <div className="max-w-xl">
            <p className="text-muted-foreground mb-3 text-sm font-normal tracking-wide uppercase">
              For drivers
            </p>
            <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
              Easy from the first tap.
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">
              Open the invite, enter a one-time code, and start.
            </p>
            <Link
              href="/platform/driver-experience"
              className="text-foreground group mt-5 inline-flex items-center gap-1.5 text-sm"
            >
              See the driver experience
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {points.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.title}
                  className="border-border bg-background flex items-center gap-3 rounded-xs border p-4"
                >
                  <div className="border-border bg-card flex h-9 w-9 shrink-0 items-center justify-center rounded-xs border">
                    <Icon className="text-foreground h-5 w-5" />
                  </div>
                  <h3 className="text-foreground text-sm font-normal">{point.title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ForDrivers;
