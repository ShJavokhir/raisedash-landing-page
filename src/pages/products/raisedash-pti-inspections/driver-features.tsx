import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { ArrowRight, X as XIcon } from "lucide-react";

// --- Lightbox Component ---
const Lightbox: React.FC<{ isOpen: boolean; onClose: () => void; imageSrc: string | null }> = ({ isOpen, onClose, imageSrc }) => {
  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-[101]"
      >
        <XIcon className="w-8 h-8" />
      </button>
      <Image
        src={imageSrc}
        alt="Preview"
        width={2560}
        height={1440}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-md shadow-2xl animate-fade-in-scale cursor-default"
      />
    </div>
  );
};

const Hero: React.FC = () => (
  <div className="relative overflow-hidden bg-background">
    <div className="absolute inset-0 z-0 opacity-[0.4]"
      style={{ backgroundImage: 'radial-gradient(var(--muted-foreground) 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
    </div>

    <div className="pt-32 pb-20 md:pt-40 md:pb-24 relative z-10">
      <Container className="flex flex-col items-center text-center">
        <div className="animate-fade-in-up delay-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border text-xs font-medium text-muted-foreground mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Driver App Features
        </div>

        <h1 className="animate-fade-in-up delay-100 text-5xl md:text-7xl font-semibold tracking-[-0.02em] text-foreground mb-6 max-w-4xl">
          Pre-Trip and Post-Trip inspections made ultra <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">EASY!</span>
        </h1>

        <p className="animate-fade-in-up delay-200 text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          We understand that drivers should <strong>concentrate</strong> on their duties rather than spend time learning a new app. For this reason, we have designed the app to be <strong>exceptionally user-friendly</strong>, allowing drivers to conduct inspections <strong>effortlessly</strong>, even on their first use.
        </p>

        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <a href="https://cal.com/javokhir/raisedash-demo-meeting" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full sm:w-auto">
              Book A Demo <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <a href="https://app.raisedash.com/auth/register" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Start now
            </Button>
          </a>
        </div>

        <div className="animate-fade-in-up delay-500 w-full mt-16 md:mt-24 relative z-10">
          <div className="relative rounded-lg overflow-hidden border border-border bg-muted/20 shadow-2xl max-w-4xl mx-auto">
            <Image
              src="https://pti.raisedash.com/wp-content/uploads/2024/06/app-ui.png"
              alt="RaiseDash Driver App"
              width={1440}
              height={1276}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        <div className="animate-fade-in-up delay-600 mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://apps.apple.com/us/app/raisedash/id6466733418" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="w-full sm:w-auto">
              App Store
            </Button>
          </a>
          <a href="https://play.google.com/store/apps/details?id=uz.jdsystems.checklist.checklist" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="w-full sm:w-auto">
              Google Play
            </Button>
          </a>
        </div>
      </Container>
    </div>
  </div>
);

const FeatureItem: React.FC<{
  title: string;
  description: string;
  image: string;
  align?: "left" | "right";
  onImageClick?: (src: string) => void;
}> = ({ title, description, image, align = "left", onImageClick }) => (
  <div className="py-12 md:py-20">
    <Container>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={`${align === "right" ? "md:order-2" : "md:order-1"}`}>
          <div
            className="relative rounded-lg overflow-hidden border border-border bg-muted/20 animate-fade-in-scale cursor-pointer group"
            onClick={() => onImageClick && onImageClick(image)}
          >
            <Image
              src={image}
              alt={title}
              width={800}
              height={800}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="bg-background/80 backdrop-blur-md text-foreground px-3 py-1 rounded-full text-xs font-medium shadow-sm">Click to Zoom</span>
            </div>
          </div>
        </div>
        <div className={`${align === "right" ? "md:order-1" : "md:order-2"}`}>
          <div className="animate-fade-in-up">
            <h3 className="text-3xl font-semibold text-foreground mb-4 tracking-tight">{title}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </Container>
  </div>
);

const Features: React.FC<{ onImageClick: (src: string) => void }> = ({ onImageClick }) => (
  <div className="border-t border-border mt-12">
    <Container className="pt-20">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-foreground tracking-tight mb-4">Features</h2>
      </div>
    </Container>

    <FeatureItem
      title="Photo-Based DVIR Inspections"
      description="RaiseDash provides photo inspections that allow drivers to precisely document any defects, improving the precision of DVIR inspections."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/app0.png"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="DOT Standards"
      description="Inspections are conducted based on official DOT standards, ensuring thoroughness and compliance."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/app3.png"
      align="right"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="Video Inspections"
      description="Video-based inspections with audio save time for drivers and offer more precise live footage of the fleet."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/app2.png"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="Starting Inspection"
      description="Initiating an inspection is straightforward. You simply need your fleet's VIN number."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/app4.png"
      align="right"
      onImageClick={onImageClick}
    />
  </div>
);

const CTA: React.FC = () => (
  <>
    <Container className="border-t border-border mt-20 pt-20" />
    <Container className="bg-card border border-border rounded-lg p-12 md:p-16 text-center relative overflow-hidden shadow-sm mb-20 ui-corner-accents">
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">Start Your 14-Day Free Trial Today</h2>
        <p className="text-lg text-muted-foreground mb-10">
          Experience the easiest way to manage driver inspections. Get started now!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://cal.com/javokhir/raisedash-demo-meeting" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="px-8 w-full sm:w-auto">Book A Demo</Button>
          </a>
          <a href="https://app.raisedash.com/auth/register" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="secondary" className="px-8 w-full sm:w-auto">
              Start now
            </Button>
          </a>
        </div>
        <div className="mt-8">
          <Link href="/products/raisedash-pti-inspections">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              ← Back to PTI Overview
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  </>
);

const DriverFeaturesPage: NextPage = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Driver App Features | RaiseDash PTI Inspections"
        description="See how RaiseDash makes it easy for drivers to handle their daily CDL Pre-Trip and Post-Trip (DVIR) inspections with an intuitive mobile app for iOS and Android."
        keywords={["driver DVIR app", "truck driver inspection app", "CDL pre-trip app", "mobile DVIR", "driver inspection software"]}
      />

      <Lightbox
        isOpen={!!lightboxImage}
        imageSrc={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      <div className="min-h-screen bg-background text-foreground font-sans">
        <main>
          <Hero />
          <Features onImageClick={setLightboxImage} />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DriverFeaturesPage;
