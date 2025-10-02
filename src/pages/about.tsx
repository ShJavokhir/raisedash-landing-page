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
      {/* Hero Section */}
      <Container 
        className="flex items-center bg-white dark:bg-card mt-12 rounded-md border"
        // style={{
        //   backgroundColor: '#ffffff',
        //   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23efefef' fill-opacity='0.16' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        // }}
      >
        <div className="w-full py-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            About Raisedash
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            We're revolutionizing freight logistics safety and security through modern AI-powered solutions 
            that protect corporations and their valuable cargo.
          </p>
        </div>
      </Container>

      {/* Mission Section */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-16">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> */}
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
            {/* <div className="bg-muted rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">99.7%</div>
                  <div className="text-sm text-muted-foreground">Security Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">$2.4B</div>
                  <div className="text-sm text-muted-foreground">Cargo Protected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Corporations Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </Container>

   

     

    

      <Footer />
    </div>
  );
}
