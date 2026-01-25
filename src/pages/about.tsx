import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";

export default function About() {
  return (
    <PageLayout
      title="About Us"
      description="Learn about Raisedash and our mission to revolutionize freight logistics safety and security through AI-powered solutions."
      keywords={[
        "about raisedash",
        "freight logistics company",
        "fleet safety company",
        "logistics technology",
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
              We're revolutionizing freight logistics safety and security through modern AI-powered
              solutions that protect corporations and their valuable cargo.
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
            To strengthen the safety and security of freight logistics through cutting-edge
            technology that prevents theft, reduces losses, and ensures cargo reaches its
            destination safely.
          </p>
          <p className="text-muted-foreground text-base leading-relaxed font-normal">
            We believe that every shipment deserves protection, and every corporation deserves peace
            of mind when it comes to their valuable cargo.
          </p>
        </div>
      </Container>

      {/* Values Section */}
      <Container className="py-12 md:px-0">
        <div className="animate-fade-in-up mb-10 text-center delay-300">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Our Values
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
            The principles that guide everything we do at Raisedash.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="bg-card border-border hover:bg-surface-2 animate-fade-in-scale rounded-xs border p-6 transition-all delay-400 duration-[0.15s] hover:-translate-y-0.5">
            <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
              Security First
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Every decision we make prioritizes the safety and security of our clients' cargo and
              operations.
            </p>
          </div>
          <div className="bg-card border-border hover:bg-surface-2 animate-fade-in-scale rounded-xs border p-6 transition-all delay-500 duration-[0.15s] hover:-translate-y-0.5">
            <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
              Innovation
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              We continuously push the boundaries of what's possible with AI and technology in
              logistics security.
            </p>
          </div>
          <div className="bg-card border-border hover:bg-surface-2 animate-fade-in-scale rounded-xs border p-6 transition-all delay-600 duration-[0.15s] hover:-translate-y-0.5">
            <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
              Partnership
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              We work closely with our clients to understand their unique needs and deliver tailored
              solutions.
            </p>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="pb-12 md:px-0">
        <div className="bg-primary animate-fade-in-scale rounded-xs p-8 text-center delay-700 sm:p-12">
          <h2 className="text-primary-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Ready to work with us?
          </h2>
          <p className="text-primary-foreground/80 mx-auto mb-8 max-w-xl text-lg">
            Get in touch to learn how Raisedash can help protect your freight operations.
          </p>
          <Link href="/get-started">
            <Button variant="secondary" size="lg">
              See a demo
            </Button>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
