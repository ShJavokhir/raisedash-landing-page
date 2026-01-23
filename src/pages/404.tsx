import Link from "next/link";
import Head from "next/head";
import { Inter } from "next/font/google";
import { ArrowLeft, Home, FileText, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | Raisedash</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist or has been moved."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className={`${inter.className} font-sans antialiased`}>
        <Container className="py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            {/* 404 Visual */}
            <div className="mb-8">
              <span className="text-primary/20 text-[120px] leading-none font-bold md:text-[180px]">
                404
              </span>
            </div>

            {/* Content */}
            <h1 className="text-foreground mb-4 text-3xl font-normal tracking-[-0.02em] md:text-4xl">
              Page Not Found
            </h1>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
              you back on track.
            </p>

            {/* Primary CTA */}
            <div className="mb-12">
              <Link href="/">
                <Button size="lg">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Homepage
                </Button>
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="border-border bg-card rounded-xs border p-6">
              <p className="text-foreground mb-4 text-sm font-medium">Or try one of these pages:</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground hover:bg-surface-2 flex items-center justify-center gap-2 rounded-xs px-4 py-3 text-sm transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground hover:bg-surface-2 flex items-center justify-center gap-2 rounded-xs px-4 py-3 text-sm transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground hover:bg-surface-2 flex items-center justify-center gap-2 rounded-xs px-4 py-3 text-sm transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Container>

        <div className="mt-4 sm:mt-6">
          <Footer />
        </div>
      </div>
    </>
  );
}
