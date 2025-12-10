import Link from "next/link";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBeams } from "@/components/ui/background-beams";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      
      <div>
        <Container
          className="flex items-center bg-white dark:bg-card mt-12 rounded-md border relative overflow-hidden ui-corner-accents"
        >
          <BackgroundBeams className="will-change-transform" />
          
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
            
            <div className="hidden lg:block flex-shrink-0 overflow-hidden -mr-8 md:-mr-8">
              <Image
                src="/globe.svg"
                alt="Globe illustration"
                width={400}
                height={400}
                className="w-80 h-80 object-contain select-none translate-x-1/2"
                draggable={false}
              />
            </div>
          </div>
        </Container>
      </div>
      
      {/* Two clean horizontal lines with centered text between them */}
      <div className="py-6">
        <div className="flex items-center justify-center py-3">
          <span className="text-sm text-muted-foreground bg-background px-4">
            Trusted by leading logistics companies
          </span>
        </div>
      </div>
      
      <div className="">
        <Footer />
      </div>
    </div>
  );
}

