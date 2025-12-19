import { NextPage } from "next";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { ArrowRight, X as XIcon, Shield, BarChart3, Filter, Truck, Users, UserCog, Camera, Play, LayoutDashboard } from "lucide-react";
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
          Solutions for Fleet & Safety Managers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]"
        >
          Fleet & Safety Manager{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Dashboard</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-gray-200 -rotate-1" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          See how RaiseDash solves problems for Fleet and Safety managers. The advanced dashboard provides full control over Pre-Trip and DVIR inspections with real-time analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
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

        {/* Dashboard Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full"
        >
          <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-2xl shadow-gray-900/10">
            <Image
              src="https://pti.raisedash.com/wp-content/uploads/2024/06/screenshot-dashboard.png"
              alt="RaiseDash Dashboard"
              width={1440}
              height={1276}
              className="w-full h-auto"
              priority
            />
          </div>
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
            <Shield className="h-4 w-4" />
            Dashboard Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Complete Control Over Your Fleet Inspections
          </h2>
          <p className="text-lg text-gray-600">
            Powerful analytics and management tools designed for fleet safety professionals.
          </p>
        </motion.div>
      </Container>

      <FeatureItem
        title="Inspection Overview Graph"
        description="The graph displays all inspections, using different colors to distinguish between successful inspections and those with defects. This allows for easy identification of when and which driver had defects."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature1.png"
        icon={BarChart3}
        onImageClick={onImageClick}
        index={1}
      />

      <FeatureItem
        title="Photo-Based DVIR Inspections"
        description="RaiseDash offers high-quality photo inspections where drivers can document exact defects, enhancing the accuracy of DVIR inspections. Review photos directly from the dashboard."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature3.png"
        icon={Camera}
        align="right"
        onImageClick={onImageClick}
        index={2}
      />

      <FeatureItem
        title="Video Inspections"
        description="You can utilize video-based inspections with audio, saving drivers time and providing more accurate live footage of the fleet. Watch inspection videos directly in the dashboard."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature4.png"
        icon={Play}
        onImageClick={onImageClick}
        index={3}
      />

      <FeatureItem
        title="Inspections List"
        description="Different filters allow you to find specific inspections and analyze your company's inspection trends efficiently. View detailed inspection history for every vehicle."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature2.png"
        icon={LayoutDashboard}
        align="right"
        onImageClick={onImageClick}
        index={4}
      />

      <FeatureItem
        title="Advanced Filters"
        description="Different filters allow you to find specific inspections and analyze your company's inspection trends efficiently. Filter by date, driver, vehicle, defect type, and more."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature5.png"
        icon={Filter}
        onImageClick={onImageClick}
        index={5}
      />

      <FeatureItem
        title="Fleet Management"
        description="Manage your fleet from the same dashboard. Adding fleet vehicles is made easier with RaiseDash's auto-generated data when you enter the VIN number."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature6.png"
        icon={Truck}
        align="right"
        onImageClick={onImageClick}
        index={6}
      />

      <FeatureItem
        title="Driver Management"
        description="Efficiently manage your drivers from a single dashboard, keeping track of their performance, inspections, and compliance with ease."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature8.png"
        icon={Users}
        onImageClick={onImageClick}
        index={7}
      />

      <FeatureItem
        title="User Management"
        description="Easily add fleet and safety managers to your dashboard, streamlining user roles and permissions for better team coordination."
        image="https://pti.raisedash.com/wp-content/uploads/2024/06/feature7.png"
        icon={UserCog}
        align="right"
        onImageClick={onImageClick}
        index={8}
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
              <Shield className="w-8 h-8 text-gray-900" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Ready to Streamline Your Fleet Management?
            </h2>
            <p className="text-lg text-gray-400 mb-10">
              Get in touch to schedule a demo and discover how RaiseDash can enhance your fleet&apos;s safety and efficiency!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://cal.com/javokhir/raisedash-demo-meeting" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 border-0">
                  Book A Demo
                </Button>
              </a>
              <Link href="/products/raisedash-pti-inspections">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/20">
                  Back to PTI Overview
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
const FleetSafetyManagersPage: NextPage = () => {
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
        title="Fleet & Safety Manager Dashboard | RaiseDash Features"
        description="See how RaiseDash solves problems for Fleet and Safety managers. The advanced dashboard provides full control over Pre-Trip and DVIR inspections with real-time analytics."
        keywords={["fleet manager dashboard", "safety manager software", "DVIR management", "fleet inspection dashboard", "compliance management"]}
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

export default FleetSafetyManagersPage;
