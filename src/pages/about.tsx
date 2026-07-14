import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";

const principles = [
  {
    title: "Proof over volume",
    body: "We measure ourselves by the strength of the record we keep, not the size of a video library. A defensible evidence trail matters more than a bigger catalog.",
    delay: "delay-400",
  },
  {
    title: "We never rewrite history",
    body: "When a policy or lesson changes, we never silently alter what a driver already completed. A finished record stays exactly as it was, with its original version and timestamp, forever.",
    delay: "delay-500",
  },
  {
    title: "The driver is a user, not a suspect",
    body: "Drivers deserve a clear, respectful experience, a plain reason for every assignment, and their privacy protected. We build for the person holding the phone.",
    delay: "delay-600",
  },
  {
    title: "Self-serve first",
    body: "You should be able to add a driver, launch a program, or pull a record without a support call. Software should do the basic work so people can add strategy.",
    delay: "delay-700",
  },
  {
    title: "Vendor-neutral by design",
    body: "Fleets switch cameras, ELDs, and recruiting systems. Your readiness workflow and evidence archive should survive every switch, not reset with it.",
    delay: "delay-800",
  },
  {
    title: "Honest, transparent pricing",
    body: "Plain prices, an honest definition of an active driver, and your own records exportable any time. No quote games, no hostage data.",
    delay: "delay-900",
  },
];

export default function About() {
  return (
    <PageLayout
      title="About Us"
      description="Raisedash is the driver readiness platform for modern trucking fleets. We get every new driver road-ready before day one and keep court-ready proof of every bit of training, forever."
      keywords={[
        "about raisedash",
        "driver readiness platform",
        "trucking fleet software",
        "driver onboarding company",
        "training evidence records",
      ]}
    >
      {/* Hero Section */}
      <div className="pt-8 pb-12">
        <Container className="bg-card border-border animate-fade-in-scale rounded-xs border px-8 py-12 delay-0 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
              About Raisedash
            </h1>
            <p className="text-muted-foreground animate-fade-in-up mt-6 text-xl leading-relaxed font-normal delay-150">
              We build the driver readiness platform for modern trucking fleets. Our job is to get
              every new driver trained, signed, and road-ready before they arrive at the terminal,
              and to keep the proof of it for as long as a fleet needs it.
            </p>
          </div>
        </Container>
      </div>

      {/* Mission Section */}
      <Container className="py-12 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 delay-200 sm:p-12">
          <h2 className="text-foreground mb-6 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Our Mission
          </h2>
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed font-normal">
            Get every driver road-ready before day one, and keep proof that lasts forever. A new
            driver should finish orientation on their phone before they ever walk in the door, and a
            safety director should see exactly who is ready before orientation morning.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed font-normal">
            When an insurer, an auditor, or a lawyer asks what a driver was trained on, the answer
            should take one click, not one week. Every lesson version, signature, score, and
            timestamp preserved, and a complete record assembled in seconds. That is the promise we
            build toward every day.
          </p>
        </div>
      </Container>

      {/* Problem Section */}
      <Container className="py-12 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 delay-300 sm:p-12">
          <h2 className="text-foreground mb-6 text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            The problem we saw
          </h2>
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed font-normal">
            A mid-size fleet hires constantly, and every new driver goes through orientation,
            usually one to three days of paid classroom time, often with travel and a hotel on top.
            Too often, half the class shows up having done nothing in advance, and the safety
            director burns a paid day walking people through a handbook they could have read at
            home. Some scheduled drivers never show up at all, after the fleet already paid for the
            room.
          </p>
          <p className="text-muted-foreground mb-6 text-base leading-relaxed font-normal">
            The records are worse. Policy acknowledgments, quiz results, road-test forms, and
            certificates end up scattered across paper folders, spreadsheets, email threads, and
            someone's desk drawer. When a crash leads to a discovery request, or an insurer or
            auditor asks, reconstructing exactly what one driver was trained on two years ago can
            take days, if it is possible at all.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed font-normal">
            And the software built to fix this mostly looks like it shipped twenty years ago:
            desktop portals and passwords for people who live on their phones, and a support call
            for the simplest task. We thought a fleet running on one overloaded safety director
            deserved better.
          </p>
        </div>
      </Container>

      {/* Principles Section */}
      <Container className="py-12 md:px-0">
        <div className="animate-fade-in-up mb-10 text-center delay-300">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            What we believe
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
            The principles that guide every product and pricing decision we make.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className={`bg-card border-border hover:bg-surface-2 animate-fade-in-scale rounded-xs border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 ${principle.delay}`}
            >
              <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
                {principle.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">{principle.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Refocus Note Section */}
      <Container className="py-12 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 delay-1000 sm:p-12">
          <h2 className="text-foreground mb-6 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Where we're headed
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed font-normal">
            Raisedash refocused on driver readiness in July 2026. We used to frame our work around
            continuous compliance and safety monitoring. Today we build the system that gets drivers
            ready before day one and keeps the proof, because that is where the real pain, the
            paperwork, and the risk sit for the fleets we serve. You can read the full story in our{" "}
            <Link
              href="/blog/raisedash-driver-readiness-platform-pivot"
              className="text-foreground underline underline-offset-4 hover:no-underline"
            >
              announcement
            </Link>
            .
          </p>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="pb-12 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 text-center delay-1100 sm:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Ready to get your drivers road-ready?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            Book a demo and we'll walk you through the readiness board and a one-click evidence
            packet, built around your own orientation.
          </p>
          <Link href="/demo">
            <Button size="lg">Book a demo</Button>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
