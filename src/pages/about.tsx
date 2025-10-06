import { Geist, Geist_Mono } from "next/font/google";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function About() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      {/* About Section */}
      <Container className="bg-white dark:bg-card mt-12 rounded-md border ui-corner-accents">
        <div className="py-16">
          {/* Hero Content */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
              About Raisedash
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              We're revolutionizing freight logistics safety and security through modern AI-powered solutions 
              that protect corporations and their valuable cargo.
            </p>
          </div>

          {/* Mission Content */}
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              To strengthen the safety and security of freight logistics through cutting-edge 
              technology that prevents theft, reduces losses, and ensures cargo reaches its 
              destination safely.
            </p>
            <p className="text-muted-foreground">
              We believe that every shipment deserves protection, and every corporation 
              deserves peace of mind when it comes to their valuable cargo.
            </p>
          </div>
        </div>
      </Container>

   

     

    

      <div className="mt-8 sm:mt-12">
        <Footer />
      </div>
    </div>
  );
}
