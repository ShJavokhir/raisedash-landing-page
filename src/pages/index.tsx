import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";

export default function Home() {
  return (
    <PageLayout>
      <div>
        <Container
          className="flex items-center bg-white dark:bg-card mt-12 rounded-md border relative overflow-hidden ui-corner-accents"
        >
          <div className="relative z-10 w-full flex items-center">
            <div className="flex-1 py-16 sm:py-24 md:py-28">
              <h1 className="text-4xl md:text-4xl font-semibold tracking-[-0.01em] text-foreground">
                Safety & Security in Days.
              </h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Raisedash strengthens safety and security of corporations in freight logistics.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button className="w-full sm:w-auto">See in Action</Button>
                <Link href="/request-demo" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full">Request a Demo</Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block flex-shrink-0">
              <RotatingEarth width={380} height={380} className="w-[24rem] h-[24rem]" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="mt-8 px-0 sm:px-0 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/products/raisedash-vertex" className="group">
              <div className="flex flex-col h-full rounded-md border bg-card text-card-foreground overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
                <div className="aspect-square relative w-full overflow-hidden bg-muted p-3">
                  <Image
                    src="https://cdn.raisedash.com/media/vertex/834f7f4b-6def-4090-bc16-6de5c21ff18d.webp"
                    alt="Raisedash Vertex"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 dark:invert"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">Raisedash Vertex</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The Easiest Way to Track Freight. Get real-time visibility and automated arrival alerts in seconds.
                  </p>
                </div>
              </div>
            </Link>
          </div>
      </Container>

      {/* Two clean horizontal lines with centered text between them */}
      <div className="pt-6 pb-4">
        <div className="flex items-center justify-center py-3">
          <span className="text-sm text-muted-foreground bg-background px-4">
            Trusted by leading logistics companies
          </span>
        </div>
      </div>
    </PageLayout>
  );
}

