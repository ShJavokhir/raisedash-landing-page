import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PlatformCTA, PlatformHero, PlatformSection } from "@/components/platform";
import { BreadcrumbJsonLd } from "@/components/seo/SEO";
import { FEATURE_PAGES } from "@/components/features/pages";

export default function Features() {
  return (
    <PageLayout
      title="AI training features for trucking fleets"
      description="Four AI tools that generate driver training: videos, full programs, voice roleplays, and interactive simulations. Built into the Raisedash orientation platform."
      keywords={[
        "ai training for trucking fleets",
        "ai driver training software",
        "generate driver training",
        "trucking training content generator",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.raisedash.com/" },
          { name: "Features", url: "https://www.raisedash.com/features" },
        ]}
      />

      <PlatformHero
        eyebrow="AI features"
        eyebrowIcon={Sparkles}
        title="Four AI features that generate driver training"
        subhead="Generate narrated training videos, full multi-lesson programs, scored voice roleplays with an AI inspector or dispatcher, and tap-through simulations of software like an ELD. All four are part of the Raisedash Driver Orientation Platform: you assign the training, drivers finish it on their phone, and completion is recorded."
        howItWorksHref="#generators"
      />

      <PlatformSection id="generators" eyebrow="The four features" title="What each one makes">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURE_PAGES.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.slug}
                href={page.path}
                className="group bg-card border-border hover:bg-surface-2 flex flex-col rounded-xs border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 sm:p-8"
              >
                <div className="bg-surface-2 border-border text-foreground mb-4 flex h-10 w-10 items-center justify-center rounded-xs border">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-normal tracking-[-0.02em]">
                  {page.label}
                </h3>
                <p className="text-muted-foreground mb-5 flex-1 text-sm leading-relaxed font-normal">
                  {page.tagline}
                </p>
                <span className="text-foreground mt-auto inline-flex items-center gap-1 text-sm">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </PlatformSection>

      <PlatformSection
        eyebrow="Your team approves everything"
        title="How review works for each feature"
      >
        <div className="bg-card border-border rounded-xs border p-6 sm:p-8">
          <p className="text-muted-foreground text-base leading-relaxed">
            Nothing reaches a driver until someone at your fleet publishes and assigns it. Video
            briefs are reviewed before generation starts. Program outlines are approved item by item
            before a single lesson is written. Roleplay rubrics are written by your team.
            Simulations are automatically tested end to end before they can be published. Drafts
            stay drafts until you say otherwise.
          </p>
        </div>
      </PlatformSection>

      <PlatformCTA
        title="See all four in one demo"
        subtitle="Book a short demo and watch a brief become a video, a program, a conversation, and a practice simulation."
        footnote="Raisedash generates drafts and practice. Your fleet decides what gets assigned and what counts as qualified."
      />
    </PageLayout>
  );
}
