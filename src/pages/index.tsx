import Link from "next/link";
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

