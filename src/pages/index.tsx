import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
      <Container className="min-h-screen flex items-center">
        <div className="w-full py-16 sm:py-24 md:py-28">
          <div className="mb-8">
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={160}
              height={34}
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            Build your landing fast with Cal.com-inspired tokens
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Tokens, breakpoints, and base components are set. Replace this hero with
            your actual marketing content.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary</Button>
          </div>

          <div className="mt-6">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
}
