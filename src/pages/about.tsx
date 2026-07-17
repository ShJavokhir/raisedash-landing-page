import * as React from "react";
import Link from "next/link";
import {
  Boxes,
  Eye,
  FileText,
  HeartHandshake,
  Milestone,
  MousePointerClick,
  Receipt,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { PlatformCTA } from "@/components/platform";
import { HalftoneTruck } from "@/components/ui/HalftoneTruck";
import { cn } from "@/lib/cn";

const principles: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: FileText,
    title: "Clear records over a large catalog",
    body: "We focus on making your own training easy to send, track, and review. A useful driver record matters more than a long list of generic courses.",
  },
  {
    icon: Eye,
    title: "Be clear about what the product does",
    body: "We explain current features as current and planned features as planned. Fleet teams should know exactly what they are buying.",
  },
  {
    icon: HeartHandshake,
    title: "The driver is a user, not a suspect",
    body: "Drivers deserve a clear, respectful experience, a plain reason for every assignment, and their privacy protected. We build for the person holding the phone.",
  },
  {
    icon: MousePointerClick,
    title: "Self-serve first",
    body: "You should be able to add a driver, send training, or download a report without a support call. Software should make the basic work easier.",
  },
  {
    icon: Boxes,
    title: "Vendor-neutral by design",
    body: "Fleets use different cameras, ELDs, and recruiting systems. Training software should not force a fleet into one hardware vendor.",
  },
  {
    icon: Receipt,
    title: "Honest, transparent pricing",
    body: "Our whole price list is public: one plan, $149/month including 25 managed drivers, then $6 per additional driver. No quote calls, no contracts, and data exports are free in every plan.",
  },
];

/**
 * A titled prose band: heading held in a narrow left column, body text flowing
 * in the wider right column. Keeps the section rhythm editorial and consistent
 * with the platform pages instead of stacking identical full-width cards.
 */
function StorySection({ title, paragraphs }: { title: string; paragraphs: React.ReactNode[] }) {
  return (
    <Container className="py-12 md:px-0">
      <div className="grid gap-x-10 gap-y-5 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            {title}
          </h2>
        </div>
        <div className="max-w-2xl space-y-4 md:col-span-8">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={cn(
                "text-muted-foreground leading-relaxed font-normal",
                index === 0 ? "text-lg" : "text-base"
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default function About() {
  return (
    <PageLayout
      title="About Us"
      description="Raisedash helps U.S. trucking fleets send driver orientation, track training progress, and download a clear PDF report."
      keywords={[
        "about raisedash",
        "driver readiness platform",
        "trucking fleet software",
        "driver onboarding company",
        "training evidence records",
      ]}
    >
      {/* Hero */}
      <div className="pt-8 pb-8">
        <Container className="bg-card border-border animate-fade-in-scale relative overflow-hidden rounded-xs border px-6 py-12 delay-0 sm:px-12 sm:py-16">
          <HalftoneTruck
            flip
            className="text-foreground pointer-events-none absolute -right-10 -bottom-10 hidden w-72 opacity-[0.09] sm:block sm:w-96"
          />
          <div className="relative max-w-3xl">
            <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
              About Raisedash
            </h1>
            <p className="text-muted-foreground animate-fade-in-up mt-6 max-w-2xl text-lg leading-relaxed font-normal delay-150 sm:text-xl">
              We build simple driver orientation software for U.S. trucking fleets. Safety teams
              send training by SMS or email, drivers complete it on a phone, and the fleet tracks
              the record in one place.
            </p>
          </div>
        </Container>
      </div>

      {/* Mission */}
      <StorySection
        title="Our mission"
        paragraphs={[
          "Make driver orientation easier for the people running it and the drivers completing it. Online lessons should work on a phone, and safety teams should be able to see progress without chasing several files.",
          "Raisedash records the online training activity it handles and lets the fleet download a PDF report for one driver. It does not decide whether a driver is legally qualified or replace the carrier’s other required records.",
        ]}
      />

      {/* Problem */}
      <StorySection
        title="The problem we saw"
        paragraphs={[
          "Trucking fleets repeat the same orientation material for each group of new hires. Safety teams spend time sending links, checking progress, answering sign-in questions, and pulling records together by hand.",
          "Training assignments, quiz results, completion dates, and certificates can end up split across paper, spreadsheets, email, and separate course tools. That makes a simple driver training review harder than it needs to be.",
          "Drivers need a simple mobile experience. Safety teams need a clear progress view and a report they can download without rebuilding the record by hand.",
        ]}
      />

      {/* Principles */}
      <Container className="py-12 md:px-0">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            What we believe
          </h2>
          <p className="text-muted-foreground mt-3 text-lg leading-relaxed font-normal">
            The principles that guide every product and pricing decision we make.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group bg-card border-border hover:bg-surface-2 flex flex-col rounded-xs border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5"
            >
              <div className="bg-surface-2 border-border text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary mb-4 flex h-10 w-10 items-center justify-center rounded-xs border transition-colors duration-[0.15s]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-foreground mb-2 text-base font-normal tracking-[-0.01em]">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-normal">{body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Where we're headed — a distinct note band before the CTA */}
      <Container className="py-12 md:px-0">
        <div className="bg-surface-2 border-border rounded-xs border p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="text-muted-foreground mb-4 flex items-center gap-2">
              <span className="border-border bg-card text-foreground flex h-8 w-8 items-center justify-center rounded-xs border">
                <Milestone className="h-4 w-4" />
              </span>
              <span className="text-xs tracking-wide uppercase">The 2026 refocus</span>
            </div>
            <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
              Where we&apos;re headed
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed font-normal">
              Raisedash refocused on driver readiness in July 2026. We used to frame our work around
              continuous compliance and safety monitoring. Today we focus on phone-based driver
              orientation and training records because that is a clear, everyday job for the fleets
              we serve. You can read the full story in our{" "}
              <Link
                href="/blog/raisedash-driver-readiness-platform-pivot"
                className="text-foreground underline underline-offset-4 hover:no-underline"
              >
                announcement
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>

      {/* CTA */}
      <PlatformCTA
        title="Ready to simplify driver orientation?"
        subtitle="Book a demo and we'll show you the driver experience, progress tracking, and PDF report."
      />
    </PageLayout>
  );
}
