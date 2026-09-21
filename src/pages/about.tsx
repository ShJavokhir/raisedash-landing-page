import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

export default function About() {
  return (
    <PageLayout
      title="About Raisedash"
      description="We’re an independent, bootstrapped company making simple and useful tools for trucking companies and their drivers."
    >
      <Container size="narrow" className="py-16 sm:py-24">
        <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
          About Raisedash
        </h1>
        <div className="text-muted-foreground mt-8 space-y-6 text-lg leading-relaxed">
          <p>
            Over the last few years, we’ve built tools for trucking companies and their drivers.
            Each starts with a practical job: preparing a new driver, collecting an inspection,
            bringing an alert into the team’s chat, or learning something useful.
          </p>
          <p>
            Raisedash is the home for those tools. Our products cover driver orientation,
            inspections in Telegram, Samsara alerts, DOT compliance training, and English practice
            for truck drivers.
          </p>
          <p>
            We’re independent and bootstrapped. We want to build a company around simple, useful
            products that we can keep improving over time.
          </p>
        </div>
        <div className="border-border mt-12 flex flex-wrap gap-6 border-t pt-8">
          <Link
            href="/#products"
            className="text-foreground inline-flex min-h-11 items-center gap-2 font-normal underline-offset-4 hover:underline"
          >
            Explore our products <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="text-foreground inline-flex min-h-11 items-center underline-offset-4 hover:underline"
          >
            Get in touch
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
