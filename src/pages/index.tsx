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
      <div className="w-[24rem] h-[24rem] rounded-full bg-muted/30 animate-pulse" />
    ),
  }
);

export default function Home() {
  return (
    <PageLayout
      description="Safety & Security in Days. Raisedash strengthens safety and security of corporations in freight logistics with modern AI-powered solutions."
      keywords={["freight logistics", "fleet safety", "DVIR software", "pre-trip inspections", "fleet management", "cargo security"]}
    >
      <div>
        <Container
          className="flex items-center bg-white dark:bg-card mt-12 mb-12 min-h-[50vh] rounded-md border relative overflow-hidden ui-corner-accents animate-fade-in-scale delay-0"
        >
          <div className="relative z-10 w-full flex items-center">
            <div className="flex-1">
              <h1 className="text-4xl md:text-4xl font-semibold tracking-[-0.01em] text-foreground animate-fade-in-up delay-75">
                Safety & Security in Days.
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground animate-fade-in-up delay-150">
                Raisedash strengthens safety and security of corporations in freight logistics.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-200">
                {/* <Button className="w-full sm:w-auto">See in Action</Button> */}
                <Link href="/request-demo" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full">Request a Demo</Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block flex-shrink-0">
              <RotatingEarth width={380} height={380} className="w-[24rem] h-[24rem]" rotationSpeed={0.3} />
            </div>
          </div>
        </Container>
      </div>

      <Container className="mt-8 px-0 sm:px-0 md:px-0">
        <div className="mb-8 text-center animate-fade-in-up delay-300">
          <h2 className="text-3xl font-semibold tracking-tight">Our Solutions</h2>
          {/* <p className="text-muted-foreground mt-2">
            Explore our suite of tools designed to enhance safety and efficiency in freight logistics.
          </p> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/products/raisedash-shift" className="group animate-fade-in-scale delay-600">
            <div className="flex flex-col h-full rounded-md border bg-card text-card-foreground overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
              <div className="aspect-square relative w-full overflow-hidden bg-muted p-3">
                <Image
                  src="https://cdn.raisedash.com/media/vertex/57c53ef5-ad1a-4508-89a5-329985846a89.webp"
                  alt="Shift (Driver Onboarding)"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 dark:invert"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Shift (Driver Onboarding)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Driver onboarding platform for companies. Streamlined LMS solution for efficient driver training and compliance.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/products/raisedash-pti-inspections" className="group animate-fade-in-scale delay-500">
            <div className="flex flex-col h-full rounded-md border bg-card text-card-foreground overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
              <div className="aspect-square relative w-full overflow-hidden bg-muted p-3">
                <Image
                  src="https://cdn.raisedash.com/media/vertex/5bbcc5ad-2b1c-4ddb-9fe6-e8e2bc2c8a1a.webp"
                  alt="PTI (PTI Inspections)"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105 dark:invert"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">PTI (PTI Inspections)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Simplify Driver Vehicle Inspection Reports and Pre-Trip inspections with easy-to-use digital tools.
                </p>
              </div>
            </div>
          </Link>
          <Link href="/products/raisedash-vertex" className="group animate-fade-in-scale delay-400">
            <div className="flex flex-col h-full rounded-md border bg-card text-card-foreground overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
              <div className="aspect-square relative w-full overflow-hidden bg-muted p-3">
                <Image
                  src="https://cdn.raisedash.com/media/vertex/834f7f4b-6def-4090-bc16-6de5c21ff18d.webp"
                  alt="Vertex (Freight Tracking)"
                  fill
                  priority
                  className="object-cover transition-transform duration-300 group-hover:scale-105 dark:invert"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Vertex (Freight Tracking)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Easiest Way to Track Freight. Get real-time visibility and automated arrival alerts in seconds.
                </p>
              </div>
            </div>
          </Link>

      

         
        </div>
      </Container>

      {/* Two clean horizontal lines with centered text between them */}
      <div className="pt-6 pb-4 animate-fade-in delay-700">
        <div className="flex items-center justify-center py-3">
          <span className="text-sm text-muted-foreground bg-background px-4">
            Trusted by leading logistics companies
          </span>
        </div>
      </div>
    </PageLayout>
  );
}

