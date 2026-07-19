import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PlatformCTA, PlatformHero, PlatformSection } from "@/components/platform";
import { BreadcrumbJsonLd } from "@/components/seo/SEO";
import { FEATURE_PAGES } from "@/components/features/pages";

export default function Features() {
  return (
    <PageLayout
      title="AI Training Features for Trucking Fleets"
      description="Generate training videos, build whole programs, run voice roleplays, and compile interactive practice simulations. AI features built for trucking fleets."
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
        title="Training your fleet actually has time to make."
        subhead="Raisedash generates the four kinds of training content fleets never have time to produce — videos, whole programs, spoken practice, and hands-on app practice — and every one lands in the same assignment, tracking, and evidence system."
        howItWorksHref="#generators"
      />

      <PlatformSection
        id="generators"
        eyebrow="The generators"
        title="Pick the shape of the training, not the tool"
        lede="Each generator produces a different kind of learning. All four end up as normal Raisedash content: assigned by you, completed on the driver's phone, recorded under the driver."
      >
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
        eyebrow="Human in the loop"
        title="Generated does not mean unreviewed"
        lede="AI drafts. Your team decides."
      >
        <div className="bg-card border-border rounded-xs border p-6 sm:p-8">
          <p className="text-muted-foreground text-base leading-relaxed">
            Every generator in Raisedash puts a person in the approval seat. Video briefs are
            reviewed before generation, program outlines are approved item by item before a single
            lesson is written, roleplay rubrics are authored by your team, and simulations are
            automatically tested end-to-end before they can be published.
          </p>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed">
            Nothing reaches a driver because an AI decided it should. Drafts stay drafts until
            someone at your fleet publishes and assigns them.
          </p>
        </div>
      </PlatformSection>

      <PlatformCTA
        title="See all four in one demo."
        subtitle="Book a short demo and watch a brief become a video, a program, a conversation, and a practice sim."
        footnote="Raisedash generates drafts and practice. Your fleet decides what gets assigned and what counts as qualified."
      />
    </PageLayout>
  );
}
