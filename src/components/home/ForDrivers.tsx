import { Smartphone, KeyRound, Globe, PlayCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";

const points = [
  {
    icon: Smartphone,
    title: "Open from the invite",
    body: "A text or email takes the driver directly to the assigned work.",
  },
  {
    icon: KeyRound,
    title: "No password to remember",
    body: "A one-time code keeps sign-in simple.",
  },
  {
    icon: Globe,
    title: "Nothing to install",
    body: "Training opens in the phone's browser, with no app download.",
  },
  {
    icon: PlayCircle,
    title: "Clear progress",
    body: "Drivers can see what is left and return without losing completed work.",
  },
];

export function ForDrivers() {
  return (
    <Container className="pb-12 md:px-0">
      <div className="border-border bg-card rounded-xs border p-8 sm:p-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-muted-foreground mb-3 text-sm font-normal tracking-wide uppercase">
            For drivers
          </p>
          <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Simple for the driver from the first tap.
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            A clear path into training, without another app or account to manage.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title}>
                <div className="border-border bg-background mb-3 flex h-9 w-9 items-center justify-center rounded-xs border">
                  <Icon className="text-foreground h-5 w-5" />
                </div>
                <h3 className="text-foreground mb-1.5 text-base font-normal">{point.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{point.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default ForDrivers;
