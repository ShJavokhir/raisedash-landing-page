import { CalendarClock, FileCheck2, Smartphone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { DemoFunnel } from "@/components/demo-funnel/DemoFunnel";

const CAL_LINK = "https://cal.com/javokhir/raisedash-demo-meeting";

const DEMO_COVERS = [
  {
    icon: CalendarClock,
    title: "Training progress",
    body: "See how to invite a new hire and track whether assigned training has not started, is in progress, or is complete.",
  },
  {
    icon: FileCheck2,
    title: "The PDF training report",
    body: "Review assignments, completion details, quiz attempts, active time, and certificates for one driver.",
  },
  {
    icon: Smartphone,
    title: "The driver's phone experience",
    body: "Open an SMS or email invite, sign in with a one-time code, and complete training in a mobile browser.",
  },
];

export default function DemoPage() {
  return (
    <PageLayout
      title="Book a demo"
      description="Book a demo of Raisedash driver orientation software. See the mobile driver experience, progress tracking, and PDF training report."
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
              See how to send driver orientation by SMS or email, track progress, and download a PDF
              training report. Answer a few quick questions and we&apos;ll reach out within one
              business day.
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
                Prefer to pick a time yourself?{" "}
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
