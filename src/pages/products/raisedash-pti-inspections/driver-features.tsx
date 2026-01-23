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
  Smartphone,
  CheckCircle2,
  Shield,
  Zap,
  Camera,
  FileCheck,
  Play,
  Scan,
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
        alt="RaiseDash driver app feature screenshot expanded view"
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
          Driver App Features
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="dark:text-foreground mb-6 text-[48px] leading-[1.1] font-medium tracking-[-0.03em] text-[#2E2D2D] md:text-5xl lg:text-[3.5rem]"
        >
          Pre-Trip and Post-Trip Inspections Made{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Ultra Easy</span>
            <span className="dark:bg-border absolute right-0 bottom-1 left-0 h-3 -rotate-1 bg-[#EEEBEA]" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="dark:text-muted-foreground mx-auto mb-10 max-w-2xl text-xl leading-relaxed font-light text-[rgba(24,23,23,0.7)]"
        >
          We understand that drivers should{" "}
          <strong className="dark:text-foreground font-medium text-[#2E2D2D]">concentrate</strong>{" "}
          on their duties rather than spend time learning a new app. We designed the app to be{" "}
          <strong className="dark:text-foreground font-medium text-[#2E2D2D]">
            exceptionally user-friendly
          </strong>
          , allowing drivers to conduct inspections{" "}
          <strong className="dark:text-foreground font-medium text-[#2E2D2D]">effortlessly</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 flex flex-col gap-4 sm:flex-row"
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

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="dark:text-muted-foreground mb-16 flex flex-wrap items-center justify-center gap-6 text-sm text-[rgba(24,23,23,0.7)]"
        >
          {[
            { icon: CheckCircle2, text: "No app learning curve" },
            { icon: Shield, text: "DOT compliant" },
            { icon: Zap, text: "Works offline" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className="dark:text-foreground h-4 w-4 text-[#2E2D2D]" />
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
          <div className="dark:border-border relative overflow-hidden rounded-2xl border border-[#EEEBEA] bg-white shadow-2xl shadow-[#2E2D2D]/10 dark:bg-white">
            <Image
              src="https://pti.raisedash.com/wp-content/uploads/2024/06/app-ui.png"
              alt="RaiseDash mobile driver app interface showing pre-trip inspection checklist on iOS and Android"
              width={1440}
              height={1276}
              className="h-auto w-full"
              priority
            />
          </div>
        </motion.div>

        {/* App Store Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://apps.apple.com/us/app/raisedash/id6466733418"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              className="dark:border-border dark:text-foreground dark:hover:bg-secondary w-full gap-2 rounded-2xl border-[#EEEBEA] bg-white text-[#2E2D2D] hover:bg-[#F9F7F6] sm:w-auto dark:bg-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </Button>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=uz.jdsystems.checklist.checklist"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              className="dark:border-border dark:text-foreground dark:hover:bg-secondary w-full gap-2 rounded-2xl border-[#EEEBEA] bg-white text-[#2E2D2D] hover:bg-[#F9F7F6] sm:w-auto dark:bg-white"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
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
                alt={`RaiseDash driver app ${title.toLowerCase()} feature for CDL pre-trip inspections`}
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
            <Smartphone className="h-4 w-4" />
            Driver App Features
          </span>
          <h2 className="dark:text-foreground mb-4 text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D] md:text-4xl">
            Built for Drivers, By Industry Experts
          </h2>
          <p className="dark:text-muted-foreground text-lg font-light text-[rgba(24,23,23,0.7)]">
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
              <Smartphone className="h-8 w-8 text-[#19224A]" />
            </motion.div>

            <h2 className="mb-6 text-[28px] font-medium tracking-[-0.03em] text-white md:text-4xl">
              Start Your 14-Day Free Trial Today
            </h2>
            <p className="mb-10 text-lg font-light text-white/70">
              Experience the easiest way to manage driver inspections. Get started now!
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
              <a
                href="https://app.raisedash.com/auth/register"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full rounded-2xl border border-white/20 text-white hover:bg-white/10 sm:w-auto"
                >
                  Start Free Trial
                </Button>
              </a>
            </div>

            <div className="mt-8">
              <Link href="/products/raisedash-pti-inspections">
                <Button variant="ghost" className="rounded-2xl text-white/50 hover:text-white">
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
const DriverFeaturesPage: NextPage = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Driver App Features | RaiseDash PTI Inspections"
        description="See how RaiseDash makes it easy for drivers to handle their daily CDL Pre-Trip and Post-Trip (DVIR) inspections with an intuitive mobile app for iOS and Android."
        keywords={[
          "driver DVIR app",
          "truck driver inspection app",
          "CDL pre-trip app",
          "mobile DVIR",
          "driver inspection software",
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

export default DriverFeaturesPage;
