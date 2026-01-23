import { NextPage } from "next";
import Link from "next/link";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import {
  ArrowRight,
  X as XIcon,
  Shield,
  BarChart3,
  Filter,
  Truck,
  Users,
  UserCog,
  Camera,
  Play,
  LayoutDashboard,
} from "lucide-react";
import { motion, useInView } from "motion/react";

// --- Custom Styles for Tailscale-inspired Theme ---
const ptiStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  .pti-page {
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  }

  .industrial-grid {
    background-image:
      linear-gradient(rgba(46,45,45,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(46,45,45,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  .feature-card {
    transition: all 0.2s ease;
  }

  .feature-card:hover {
    transform: translateY(-4px);
  }
`;

// --- Lightbox Component ---
const Lightbox: React.FC<{ isOpen: boolean; onClose: () => void; imageSrc: string | null }> = ({
  isOpen,
  onClose,
  imageSrc,
}) => {
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] rounded-2xl bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      >
        <XIcon className="h-8 w-8" />
      </button>
      <Image
        src={imageSrc}
        alt="RaiseDash fleet safety manager dashboard feature expanded view"
        width={2560}
        height={1440}
        onClick={(e) => e.stopPropagation()}
        className="h-auto max-h-[95vh] w-auto max-w-[95vw] cursor-default rounded-2xl object-contain shadow-2xl"
      />
    </div>
  );
};

// --- Hero Component ---
const Hero: React.FC = () => (
  <section className="dark:bg-secondary relative overflow-hidden bg-[#F9F7F6] pt-8 pb-24 md:pt-16 md:pb-32">
    {/* Industrial Grid Background */}
    <div className="industrial-grid absolute inset-0" />

    <Container className="relative z-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="dark:border-border dark:text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border border-[#EEEBEA] bg-white px-4 py-1.5 text-sm font-medium text-[rgba(24,23,23,0.7)] dark:bg-white"
        >
          <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          Solutions for Fleet & Safety Managers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="dark:text-foreground mb-6 text-[48px] leading-[1.1] font-medium tracking-[-0.03em] text-[#2E2D2D] md:text-5xl lg:text-[3.5rem]"
        >
          Fleet & Safety Manager{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Dashboard</span>
            <span className="dark:bg-border absolute right-0 bottom-1 left-0 h-3 -rotate-1 bg-[#EEEBEA]" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="dark:text-muted-foreground mx-auto mb-10 max-w-2xl text-xl leading-relaxed font-light text-[rgba(24,23,23,0.7)]"
        >
          See how RaiseDash solves problems for Fleet and Safety managers. The advanced dashboard
          provides full control over Pre-Trip and DVIR inspections with real-time analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="https://cal.com/javokhir/raisedash-demo-meeting"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="group w-full gap-2 rounded-2xl bg-[#1F1E1E] text-white hover:bg-[#2E2D2D] sm:w-auto"
            >
              Book A Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <a
            href="https://app.raisedash.com/auth/register"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              size="lg"
              className="dark:border-border dark:text-foreground dark:hover:bg-secondary w-full rounded-2xl border-[#EEEBEA] bg-white text-[#2E2D2D] hover:bg-[#F9F7F6] sm:w-auto dark:bg-white"
            >
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
          <div className="dark:border-border relative overflow-hidden rounded-2xl border border-[#EEEBEA] bg-white shadow-2xl shadow-[#2E2D2D]/10 dark:bg-white">
            <Image
              src="https://pti.raisedash.com/wp-content/uploads/2024/06/screenshot-dashboard.png"
              alt="RaiseDash fleet safety manager dashboard showing real-time DVIR inspection analytics and compliance metrics"
              width={1440}
              height={1276}
              className="h-auto w-full"
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
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`${align === "right" ? "md:order-2" : "md:order-1"}`}
          >
            <div
              className="dark:border-border group relative cursor-pointer overflow-hidden rounded-2xl border border-[#EEEBEA] bg-white shadow-xl dark:bg-white"
              onClick={() => onImageClick && onImageClick(image)}
            >
              <Image
                src={image}
                alt={`RaiseDash ${title.toLowerCase()} dashboard feature for fleet DVIR compliance management`}
                width={800}
                height={800}
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors group-hover:bg-black/5 group-hover:opacity-100">
                <span className="dark:text-foreground rounded-2xl bg-white/90 px-4 py-2 text-sm font-medium text-[#2E2D2D] shadow-lg backdrop-blur-sm dark:bg-white/90">
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
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1F1E1E] text-white">
              <Icon size={26} />
            </div>
            <span className="dark:bg-secondary dark:border-border dark:text-muted-foreground mb-4 inline-block rounded-full border border-[#EEEBEA] bg-[#F9F7F6] px-3 py-1 text-xs font-medium text-[rgba(24,23,23,0.7)]">
              Feature {index}
            </span>
            <h3 className="dark:text-foreground mb-4 text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D]">
              {title}
            </h3>
            <p className="dark:text-muted-foreground text-lg leading-relaxed font-light text-[rgba(24,23,23,0.7)]">
              {description}
            </p>
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
    <section ref={ref} className="relative bg-white dark:bg-white">
      <div className="industrial-grid absolute inset-0 opacity-50" />

      <Container className="relative z-10 pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8 max-w-3xl text-center"
        >
          <span className="dark:text-muted-foreground mb-4 inline-flex items-center gap-2 text-sm font-medium tracking-wider text-[rgba(24,23,23,0.7)] uppercase">
            <Shield className="h-4 w-4" />
            Dashboard Features
          </span>
          <h2 className="dark:text-foreground mb-4 text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D] md:text-4xl">
            Complete Control Over Your Fleet Inspections
          </h2>
          <p className="dark:text-muted-foreground text-lg font-light text-[rgba(24,23,23,0.7)]">
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
    <section ref={ref} className="dark:bg-secondary bg-[#F9F7F6] py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-[#19224A] p-12 text-center md:p-16"
        >
          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white"
            >
              <Shield className="h-8 w-8 text-[#19224A]" />
            </motion.div>

            <h2 className="mb-6 text-[28px] font-medium tracking-[-0.03em] text-white md:text-4xl">
              Ready to Streamline Your Fleet Management?
            </h2>
            <p className="mb-10 text-lg font-light text-white/70">
              Get in touch to schedule a demo and discover how RaiseDash can enhance your
              fleet&apos;s safety and efficiency!
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="https://cal.com/javokhir/raisedash-demo-meeting"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="w-full rounded-2xl border-0 bg-white text-[#19224A] hover:bg-white/90 sm:w-auto"
                >
                  Book A Demo
                </Button>
              </a>
              <Link href="/products/raisedash-pti-inspections">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full rounded-2xl border border-white/20 text-white hover:bg-white/10 sm:w-auto"
                >
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

  return (
    <>
      <SEO
        title="Fleet & Safety Manager Dashboard | RaiseDash Features"
        description="See how RaiseDash solves problems for Fleet and Safety managers. The advanced dashboard provides full control over Pre-Trip and DVIR inspections with real-time analytics."
        keywords={[
          "fleet manager dashboard",
          "safety manager software",
          "DVIR management",
          "fleet inspection dashboard",
          "compliance management",
        ]}
      />
      <style dangerouslySetInnerHTML={{ __html: ptiStyles }} />

      <Lightbox
        isOpen={!!lightboxImage}
        imageSrc={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      <div className="pti-page dark:bg-secondary dark:text-foreground min-h-screen bg-[#F9F7F6] text-[#2E2D2D] selection:bg-[#19224A]/15 selection:text-[#19224A]">
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
