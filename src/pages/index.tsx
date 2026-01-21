import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

// Lazy load the globe component - D3.js is 868KB and only needed on desktop
const RotatingEarth = dynamic(
  () => import("@/components/ui/wireframe-dotted-globe"),
  {
    ssr: false,
    loading: () => (
      <div className="w-[24rem] h-[24rem] rounded-full bg-surface-3 animate-pulse" />
    ),
  }
);

export default function Home() {
  return (
    <PageLayout
      description="Safety & Security in Days. Raisedash strengthens safety and security of corporations in freight logistics with modern AI-powered solutions."
      keywords={["freight logistics", "fleet safety", "DVIR software", "pre-trip inspections", "fleet management", "cargo security"]}
    >
      {/* Hero Section */}
      <div className="pt-8 pb-12">
        <Container
          className="flex items-center bg-card py-12 sm:py-16 px-8 sm:px-12 rounded-xs border border-border relative overflow-hidden animate-fade-in-scale delay-0"
        >
          <div className="relative z-10 w-full flex items-center">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-[48px] font-normal tracking-[-0.03em] text-foreground leading-tight animate-fade-in-up delay-75">
                Safety & Security in Days.
              </h1>
              <p className="mt-6 max-w-xl text-xl font-normal text-muted-foreground leading-relaxed animate-fade-in-up delay-150">
                Raisedash strengthens safety and security of companies in freight logistics.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
                <Link href="/request-demo" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Request a Demo
                  </Button>
                </Link>
                <Link href="/about" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                    Learn more →
                  </Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block flex-shrink-0">
              <RotatingEarth width={380} height={380} className="w-[24rem] h-[24rem]" rotationSpeed={0.3} />
            </div>
          </div>
        </Container>
      </div>

      {/* Solutions Section */}
      <Container className="py-12 md:px-0">
        <div className="mb-10 text-center animate-fade-in-up delay-300">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-foreground">
            Our Solutions
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Comprehensive tools designed to enhance safety and efficiency in freight logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link href="/products/raisedash-shift" className="group animate-fade-in-scale delay-400">
            <div className="flex flex-col h-full rounded-xs border border-border bg-card overflow-hidden transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2">
              <div className="aspect-[4/3] relative w-full overflow-hidden bg-surface-3">
                <Image
                  src="https://cdn.raisedash.com/media/vertex/57c53ef5-ad1a-4508-89a5-329985846a89.webp"
                  alt="Shift (Driver Onboarding)"
                  fill
                  className="object-cover dark:invert"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-2">
                  Shift (Driver Onboarding)
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Driver onboarding platform for companies. Streamlined LMS solution for efficient driver training and compliance.
                </p>
                <span className="mt-4 text-foreground font-normal group-hover:text-foreground-80 transition-colors duration-[0.15s]">
                  Learn more →
                </span>
              </div>
            </div>
          </Link>

          <Link href="/products/raisedash-pti-inspections" className="group animate-fade-in-scale delay-500">
            <div className="flex flex-col h-full rounded-xs border border-border bg-card overflow-hidden transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2">
              <div className="aspect-[4/3] relative w-full overflow-hidden bg-surface-3">
                <Image
                  src="https://cdn.raisedash.com/media/vertex/5bbcc5ad-2b1c-4ddb-9fe6-e8e2bc2c8a1a.webp"
                  alt="PTI (PTI Inspections)"
                  fill
                  className="object-cover dark:invert"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-2">
                  PTI (PTI Inspections)
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Simplify Driver Vehicle Inspection Reports and Pre-Trip inspections with easy-to-use digital tools.
                </p>
                <span className="mt-4 text-foreground font-normal group-hover:text-foreground-80 transition-colors duration-[0.15s]">
                  Learn more →
                </span>
              </div>
            </div>
          </Link>

          <Link href="/products/raisedash-vertex" className="group animate-fade-in-scale delay-600">
            <div className="flex flex-col h-full rounded-xs border border-border bg-card overflow-hidden transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2">
              <div className="aspect-[4/3] relative w-full overflow-hidden bg-surface-3">
                <Image
                  src="https://cdn.raisedash.com/media/vertex/834f7f4b-6def-4090-bc16-6de5c21ff18d.webp"
                  alt="Vertex (Freight Tracking)"
                  fill
                  priority
                  className="object-cover dark:invert"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-2">
                  Vertex (Freight Tracking)
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  The Easiest Way to Track Freight. Get real-time visibility and automated arrival alerts in seconds.
                </p>
                <span className="mt-4 text-foreground font-normal group-hover:text-foreground-80 transition-colors duration-[0.15s]">
                  Learn more →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </Container>

      {/* Social Proof Section */}
      <Container className="py-16 animate-fade-in delay-700">
        <div className="text-center">
          <p className="text-sm font-normal text-muted-foreground tracking-wide uppercase">
            Trusted by leading logistics companies
          </p>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="pb-12 md:px-0">
        <div className="bg-primary rounded-xs p-8 sm:p-12 text-center animate-fade-in-scale delay-700">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-primary-foreground mb-4">
            Ready to strengthen your fleet safety?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Get started in days, not months. Our team is ready to help you modernize your operations.
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
