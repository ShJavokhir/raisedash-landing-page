import { Smartphone, KeyRound, Languages, PlayCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";

const points = [
  {
    icon: Smartphone,
    title: "A text and a phone",
    body: "Hire approved, driver gets an SMS link. No app store, no download.",
  },
  {
    icon: KeyRound,
    title: "No passwords, no email",
    body: "Passwordless sign-in built for drivers who live on their phones.",
  },
  {
    icon: Languages,
    title: "English and Spanish",
    body: "The full driver experience, with captions and transcripts on everything.",
  },
  {
    icon: PlayCircle,
    title: "Short lessons",
    body: "Three to ten minutes each, low-bandwidth, and resume where you left off.",
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
            Built for the driver, not the office.
          </h2>
          <p className="text-muted-foreground mt-3 text-lg">
            No passwords. No app store. No email. A text message and a phone, that&apos;s it.
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
