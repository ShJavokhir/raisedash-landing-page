import { CalendarClock, FileCheck2, Smartphone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { DemoFunnel } from "@/components/demo-funnel/DemoFunnel";

const CAL_LINK = "https://cal.com/javokhir/raisedash-demo-meeting";

const DEMO_COVERS = [
  {
    icon: CalendarClock,
    title: "The readiness board",
    body: "Watch a new hire go from a text message to trained, signed, and road-ready — so you know who's ready before orientation day.",
  },
  {
    icon: FileCheck2,
    title: "A one-click evidence packet",
    body: "Every lesson version, quiz score, signature, and timestamp — assembled into one court-ready record in seconds.",
  },
  {
    icon: Smartphone,
    title: "The driver's phone experience",
    body: "No passwords, no app store, no email. A text message and a phone — that's the whole thing, in English and Spanish.",
  },
];

export default function DemoPage() {
  return (
    <PageLayout
      title="Book a demo"
      description="Book a demo of Raisedash — the driver readiness platform for modern fleets. See how new drivers arrive trained, signed, and road-ready before day one, with court-ready proof of every step."
      keywords={[
        "book a demo",
        "driver readiness platform",
        "trucking fleet onboarding",
        "driver orientation software",
        "training records for fleets",
      ]}
    >
      {/* Hero */}
      <div className="pt-8 pb-12">
        <Container className="bg-card border-border animate-fade-in-scale rounded-xs border px-8 py-12 delay-0 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
              Book a demo
            </h1>
            <p className="text-muted-foreground animate-fade-in-up mt-6 max-w-2xl text-xl leading-relaxed font-normal delay-150">
              See how Raisedash gets every new driver trained, signed, and road-ready before they
              arrive at the terminal — and keeps court-ready proof of all of it. Answer a few quick
              questions and we'll reach out within one business day.
            </p>
          </div>
        </Container>
      </div>

      {/* Pitch + funnel */}
      <Container className="pb-16 md:px-0">
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          {/* What a demo covers */}
          <div className="animate-fade-in-scale delay-200">
            <p className="text-muted-foreground mb-6 text-sm font-normal tracking-wide uppercase">
              What a demo covers
            </p>
            <div className="space-y-5">
              {DEMO_COVERS.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="bg-primary text-primary-foreground flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xs">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground mb-1 text-lg font-normal tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-border mt-8 border-t pt-6">
              <p className="text-muted-foreground text-sm">
                Set up before lunch — not after a six-week implementation. Prefer to pick a time
                yourself?{" "}
                <a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-normal transition-colors"
                >
                  Grab a slot on the calendar
                </a>
                .
              </p>
            </div>
          </div>

          {/* Multi-step funnel */}
          <div className="animate-fade-in-scale delay-300">
            <DemoFunnel />
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
