import { NextPage } from "next";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { ArrowRight, X as XIcon, Smartphone, CheckCircle2, Shield, Zap, Camera, FileCheck, Play, Scan } from "lucide-react";
import { motion, useInView } from "motion/react";

// --- Custom Styles for Industrial Theme ---
const ptiStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .pti-page {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  .industrial-grid {
    background-image:
      linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .feature-card {
    transition: all 0.2s ease;
  }

  .feature-card:hover {
    transform: translateY(-2px);
  }
`;

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors z-[101]"
      >
        <XIcon className="w-8 h-8" />
      </button>
      <Image
        src={imageSrc}
        alt="Preview"
        width={2560}
        height={1440}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[95vw] max-h-[95vh] w-auto h-auto object-contain rounded-xl shadow-2xl cursor-default"
      />
    </div>
  );
};

// --- Hero Component ---
const Hero: React.FC = () => (
  <section className="relative pt-8 pb-24 md:pt-16 md:pb-32 overflow-hidden">
    {/* Industrial Grid Background */}
    <div className="absolute inset-0 industrial-grid" />

    <Container className="relative z-10">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-100 border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-700 mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Driver App Features
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]"
        >
          Pre-Trip and Post-Trip Inspections Made{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Ultra Easy</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-gray-200 -rotate-1" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We understand that drivers should <strong className="text-gray-900">concentrate</strong> on their duties rather than spend time learning a new app. We designed the app to be <strong className="text-gray-900">exceptionally user-friendly</strong>, allowing drivers to conduct inspections <strong className="text-gray-900">effortlessly</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <a href="https://cal.com/javokhir/raisedash-demo-meeting" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full sm:w-auto gap-2 group">
              Book A Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <a href="https://app.raisedash.com/auth/register" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Start Free Trial
            </Button>
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 mb-16"
        >
          {[
            { icon: CheckCircle2, text: "No app learning curve" },
            { icon: Shield, text: "DOT compliant" },
            { icon: Zap, text: "Works offline" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="h-4 w-4 text-gray-900" />
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* App Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-4xl"
        >
          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-2xl shadow-gray-900/10">
            <Image
              src="https://pti.raisedash.com/wp-content/uploads/2024/06/app-ui.png"
              alt="RaiseDash Driver App"
              width={1440}
              height={1276}
              className="w-full h-auto"
              priority
            />
          </div>
        </motion.div>

        {/* App Store Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="https://apps.apple.com/us/app/raisedash/id6466733418" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="w-full sm:w-auto gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </Button>
          </a>
          <a href="https://play.google.com/store/apps/details?id=uz.jdsystems.checklist.checklist" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="w-full sm:w-auto gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              Google Play
            </Button>
          </a>
        </motion.div>
      </div>
    </Container>
  </section>
);

// --- Feature Item Component ---
const FeatureItem: React.FC<{
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  align?: "left" | "right";
  onImageClick?: (src: string) => void;
  index: number;
}> = ({ title, description, image, icon: Icon, align = "left", onImageClick, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="py-16 md:py-24">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${align === "right" ? "md:order-2" : "md:order-1"}`}
          >
            <div
              className="relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-xl cursor-pointer group"
              onClick={() => onImageClick && onImageClick(image)}
            >
              <Image
                src={image}
                alt={title}
                width={800}
                height={800}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-xl text-sm font-semibold shadow-lg">
                  Click to Zoom
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: align === "left" ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${align === "right" ? "md:order-1" : "md:order-2"}`}
          >
            <div className="h-14 w-14 rounded-xl bg-gray-900 flex items-center justify-center text-white mb-6">
              <Icon size={26} />
            </div>
            <span className="inline-block px-3 py-1 rounded-xl bg-gray-100 text-gray-600 text-xs font-semibold mb-4">
              Feature {index}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">{title}</h3>
            <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

// --- Features Section ---
const Features: React.FC<{ onImageClick: (src: string) => void }> = ({ onImageClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-gray-50 relative">
      <div className="absolute inset-0 industrial-grid opacity-50" />

      <Container className="relative z-10 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            <Smartphone className="h-4 w-4" />
            Driver App Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Built for Drivers, By Industry Experts
          </h2>
          <p className="text-lg text-gray-600">
            Every feature designed to make inspections faster, easier, and fully compliant.
          </p>
        </motion.div>
      </Container>

      <FeatureItem
        title="Photo-Based DVIR Inspections"
        description="RaiseDash provides photo inspections that allow drivers to precisely document any defects, improving the precision of DVIR inspections. High-quality images ensure nothing gets missed."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/app0.png"
        icon={Camera}
        onImageClick={onImageClick}
        index={1}
      />

      <FeatureItem
        title="DOT Standards Compliance"
        description="Inspections are conducted based on official DOT standards, ensuring thoroughness and compliance. Our checklist covers all required inspection points."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/app3.png"
        icon={FileCheck}
        align="right"
        onImageClick={onImageClick}
        index={2}
      />

      <FeatureItem
        title="Video Inspections"
        description="Video-based inspections with audio save time for drivers and offer more precise live footage of the fleet. Walk around the vehicle and narrate issues in real-time."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/app2.png"
        icon={Play}
        onImageClick={onImageClick}
        index={3}
      />

      <FeatureItem
        title="Easy Inspection Start"
        description="Initiating an inspection is straightforward. Simply enter your fleet's VIN number and the app guides you through every step of the inspection process."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/app4.png"
        icon={Scan}
        align="right"
        onImageClick={onImageClick}
        index={4}
      />
    </section>
  );
};

// --- CTA Component ---
const CTA: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl bg-gray-900 p-12 md:p-16 text-center"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-8 rounded-xl bg-white flex items-center justify-center"
            >
              <Smartphone className="w-8 h-8 text-gray-900" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Start Your 14-Day Free Trial Today
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Experience the easiest way to manage driver inspections. Get started now!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://cal.com/javokhir/raisedash-demo-meeting" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 border-0">
                  Book A Demo
                </Button>
              </a>
              <a href="https://app.raisedash.com/auth/register" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/20">
                  Start Free Trial
                </Button>
              </a>
            </div>

            <div className="mt-8">
              <Link href="/products/raisedash-pti-inspections">
                <Button variant="ghost" className="text-gray-500 hover:text-white">
                  ← Back to PTI Overview
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

// --- Main Page Component ---
const DriverFeaturesPage: NextPage = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    // Force light mode
    const root = document.documentElement;
    const wasDark = root.classList.contains("dark");
    if (wasDark) {
      root.classList.remove("dark");
    }
    return () => {
      if (wasDark) {
        root.classList.add("dark");
      }
    };
  }, []);

  return (
    <>
      <SEO
        title="Driver App Features | RaiseDash PTI Inspections"
        description="See how RaiseDash makes it easy for drivers to handle their daily CDL Pre-Trip and Post-Trip (DVIR) inspections with an intuitive mobile app for iOS and Android."
        keywords={["driver DVIR app", "truck driver inspection app", "CDL pre-trip app", "mobile DVIR", "driver inspection software"]}
      />
      <style dangerouslySetInnerHTML={{ __html: ptiStyles }} />

      <Lightbox
        isOpen={!!lightboxImage}
        imageSrc={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      <div className="pti-page min-h-screen bg-white text-gray-900 selection:bg-gray-200 selection:text-gray-900">
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
