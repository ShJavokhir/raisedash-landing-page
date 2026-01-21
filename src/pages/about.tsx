import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";

export default function About() {
  return (
    <PageLayout
      title="About Us"
      description="Learn about Raisedash and our mission to revolutionize freight logistics safety and security through AI-powered solutions."
      keywords={["about raisedash", "freight logistics company", "fleet safety company", "logistics technology"]}
    >
      {/* Hero Section */}
      <div className="pt-8 pb-12">
        <Container className="bg-white py-12 sm:py-16 px-8 sm:px-12 rounded-xs border border-border animate-fade-in-scale delay-0">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-[48px] font-normal tracking-[-0.03em] text-foreground leading-tight animate-fade-in-up delay-75">
              About Raisedash
            </h1>
            <p className="mt-6 text-xl font-normal text-muted-foreground leading-relaxed animate-fade-in-up delay-150">
              We're revolutionizing freight logistics safety and security through modern AI-powered solutions
              that protect corporations and their valuable cargo.
            </p>
          </div>
        </Container>
      </div>

      {/* Mission Section */}
      <Container className="py-12 md:px-0">
        <div className="bg-white rounded-xs border border-border p-8 sm:p-12 animate-fade-in-scale delay-200">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-foreground mb-6">
            Our Mission
          </h2>
          <p className="text-lg font-normal text-muted-foreground mb-6 leading-relaxed">
            To strengthen the safety and security of freight logistics through cutting-edge
            technology that prevents theft, reduces losses, and ensures cargo reaches its
            destination safely.
          </p>
          <p className="text-base font-normal text-muted-foreground leading-relaxed">
            We believe that every shipment deserves protection, and every corporation
            deserves peace of mind when it comes to their valuable cargo.
          </p>
        </div>
      </Container>

      {/* Values Section */}
      <Container className="py-12 md:px-0">
        <div className="mb-10 text-center animate-fade-in-up delay-300">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-foreground">
            Our Values
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            The principles that guide everything we do at Raisedash.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xs border border-border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2 animate-fade-in-scale delay-400">
            <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-2">Security First</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Every decision we make prioritizes the safety and security of our clients' cargo and operations.
            </p>
          </div>
          <div className="bg-white rounded-xs border border-border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2 animate-fade-in-scale delay-500">
            <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-2">Innovation</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              We continuously push the boundaries of what's possible with AI and technology in logistics security.
            </p>
          </div>
          <div className="bg-white rounded-xs border border-border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2 animate-fade-in-scale delay-600">
            <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-2">Partnership</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              We work closely with our clients to understand their unique needs and deliver tailored solutions.
            </p>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="pb-12 md:px-0">
        <div className="bg-primary rounded-xs p-8 sm:p-12 text-center animate-fade-in-scale delay-700">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-primary-foreground mb-4">
            Ready to work with us?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Get in touch to learn how Raisedash can help protect your freight operations.
          </p>
          <Link href="/request-demo">
            <Button variant="secondary" size="lg">
              Request a Demo
            </Button>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
