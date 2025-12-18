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
          Solutions for Fleet & Safety Managers
        </div>

        <h1 className="animate-fade-in-up delay-100 text-5xl md:text-7xl font-semibold tracking-[-0.02em] text-foreground mb-6 max-w-4xl">
          Safety & Fleet Managers <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">UI</span>
        </h1>

        <p className="animate-fade-in-up delay-200 text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          See how RaiseDash solve problems for Fleet and Safety managers. The advanced dashboard provides full control over Pre-Trip and DVIR inspections.
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
          <div className="relative rounded-lg overflow-hidden border border-border bg-muted/20 shadow-2xl">
            <Image
              src="https://pti.raisedash.com/wp-content/uploads/2024/06/screenshot-dashboard.png"
              alt="RaiseDash Dashboard"
              width={1440}
              height={1276}
              className="w-full h-auto"
              priority
            />
          </div>
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
      title="Inspection Overview Graph"
      description="The graph displays all inspections, using different colors to distinguish between successful inspections and those with defects. This allows for easy identification of when and which driver had defects."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature1.png"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="Photo-Based DVIR Inspections"
      description="RaiseDash offers high-quality photo inspections where drivers can document exact defects, enhancing the accuracy of DVIR inspections."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature3.png"
      align="right"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="Video Inspections"
      description="You can utilize video-based inspections with audio, saving drivers time and providing more accurate live footage of the fleet."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature4.png"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="Inspections List"
      description="Different filters allow you to find specific inspections and analyze your company's inspection trends efficiently"
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature2.png"
      align="right"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="Advanced Filters"
      description="Different filters allow you to find specific inspections and analyze your company's inspection trends efficiently"
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature5.png"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="Fleet Management"
      description="Manage your fleet from the same dashboard. Adding fleet vehicles is made easier with RaiseDash's auto-generated data when you enter the VIN number."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature6.png"
      align="right"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="Driver Management"
      description="Efficiently manage your drivers from a single dashboard, keeping track of their performance, inspections, and compliance with ease."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature8.png"
      onImageClick={onImageClick}
    />

    <FeatureItem
      title="User Management"
      description="Easily add fleet and safety managers to your dashboard, streamlining user roles and permissions for better team coordination."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature7.png"
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
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">Ready to streamline your fleet management?</h2>
        <p className="text-lg text-muted-foreground mb-10">
          Get in touch to schedule a demo and discover how RaiseDash can enhance your fleet's safety and efficiency!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://cal.com/javokhir/raisedash-demo-meeting" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="px-8 w-full sm:w-auto">Book A Demo</Button>
          </a>
          <Link href="/products/raisedash-pti-inspections">
            <Button size="lg" variant="secondary" className="px-8 w-full sm:w-auto">
              Back to PTI Overview
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  </>
);

const FleetSafetyManagersPage: NextPage = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Fleet & Safety Manager Dashboard | RaiseDash Features"
        description="See how RaiseDash solves problems for Fleet and Safety managers. The advanced dashboard provides full control over Pre-Trip and DVIR inspections with real-time analytics."
        keywords={["fleet manager dashboard", "safety manager software", "DVIR management", "fleet inspection dashboard", "compliance management"]}
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

export default FleetSafetyManagersPage;
