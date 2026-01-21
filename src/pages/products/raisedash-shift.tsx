import { NextPage } from "next";
import Link from "next/link";
import { SEO, SoftwareApplicationJsonLd } from "@/components/seo/SEO";
import React, { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  FileText,
  BarChart3,
  Smartphone,
  Zap,
  Globe,
  WifiOff,
  Languages,
  BellRing,
  Lock,
  AlertTriangle,
  Clock,
  FileWarning,
  Search,
  Check,
  User,
  Shield,
  PlayCircle,
  FileCheck,
  Loader2,
  Download,
  ChevronDown,
  Gauge,
  Route,
  Award,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";

// --- Custom Styles for Tailscale-inspired Theme ---
const shiftStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  .shift-page {
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

// --- Inline Card Component ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div className={`bg-white dark:bg-card border border-[#EEEBEA] dark:border-border rounded-2xl p-8 ${className}`}>
      {children}
    </div>
  );
};

// --- Animated Counter Component ---
const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({
  value,
  suffix = "",
  duration = 2000
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// --- Constants ---
interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FEATURES: Feature[] = [
  {
    title: "Audit-Ready Documentation",
    description: "Every training session is logged with detailed timestamps, IP addresses, and completion metrics. Generate comprehensive compliance reports instantly for DOT audits.",
    icon: FileText
  },
  {
    title: "Mobile-First Experience",
    description: "Drivers can complete training on any device. No app download required—just a secure, magic link sent via SMS or email.",
    icon: Smartphone
  },
  {
    title: "Automated Certificates",
    description: "Professional, verifiable certificates are generated instantly upon course completion and stored indefinitely in the driver digital file.",
    icon: ShieldCheck
  },
  {
    title: "Real-Time Tracking & Scorecards",
    description: "Monitor progress in real-time. Visualize fleet safety performance with aggregate driver scorecards and identify high-risk behaviors early.",
    icon: BarChart3
  },
  {
    title: "Custom Content Engine",
    description: "Use our library of 50+ DOT courses or upload your own videos, PDFs, policies, and quizzes. Build a curriculum that fits your specific operations.",
    icon: Zap
  },
  {
    title: "Enterprise Integration",
    description: "Seamlessly sync with Samsara, Motive, Geotab, and your TMS via our robust API. Automate driver roster updates and training assignments.",
    icon: Globe
  },
  {
    title: "Offline Mode Support",
    description: "Drivers often operate in low-service areas. Our progressive web app technology allows training to be buffered and completed even with spotty connections.",
    icon: WifiOff
  },
  {
    title: "Multi-Language Support",
    description: "Automatically translate training interface and subtitles into Spanish, French, Punjabi, and Russian to support your diverse workforce.",
    icon: Languages
  },
  {
    title: "Automated Reminders",
    description: "Set it and forget it. The system automatically sends SMS and email reminders to drivers who haven't completed their assigned training by the due date.",
    icon: BellRing
  }
];

const FAQS: FAQItem[] = [
  {
    question: "Do drivers need to download an app?",
    answer: "No. RaiseDash Shift works entirely in a web browser to reduce friction. Drivers simply click a link to access their training — no downloads, no installations, no app store credentials required. This results in 40% higher adoption rates compared to native apps."
  },
  {
    question: "Will this help me pass a DOT audit?",
    answer: "Yes. The platform is specifically designed for compliance. We track start times, end times, quiz scores, and digital signatures. You can generate a 'DOT Audit Packet' for any driver or the entire fleet in one click."
  },
  {
    question: "How does the pricing model work?",
    answer: "We charge per active driver per month. You are not charged for archived drivers or administrative users. This ensures your costs scale predictably with your fleet size. Contact sales for volume discounts on fleets larger than 500 trucks."
  },
  {
    question: "Can I integrate with my ELD provider?",
    answer: "Absolutely. We support native integrations with major ELD providers like Samsara, Motive, and Geotab. We can automatically pull your driver roster so you never have to manually add or remove drivers."
  },
  {
    question: "Can I upload my own training content?",
    answer: "Yes. Our Content Builder allows you to upload videos, embed YouTube/Vimeo links, create text modules, and build interactive quizzes. You can mix and match our pre-built content with your custom company policies."
  },
  {
    question: "Is my data secure?",
    answer: "Security is our top priority. We use bank-grade 256-bit encryption for all data in transit and at rest."
  },
  {
    question: "Is support included?",
    answer: "We provide 24/7 customer support for all enterprise plans. You will also be assigned a dedicated Customer Success Manager to assist with onboarding, content strategy, and integration setup."
  }
];

const PROBLEMS = [
  {
    title: "Tracking Progress is a Nightmare",
    description: "Spreadsheets, emails, and sticky notes aren't enough. You lose track of who has completed what.",
    icon: Search
  },
  {
    title: "Audit Anxiety is Real",
    description: "When DOT arrives, can you prove every driver received training? Missing records leads to fines.",
    icon: AlertTriangle
  },
  {
    title: "Manual Certificates",
    description: "Generating, filing, and retrieving certificates manually eats up hours of valuable administrative time.",
    icon: FileWarning
  },
  {
    title: "Content Creation Takes Forever",
    description: "Turning handbooks into training materials is a project nobody has time for.",
    icon: Clock
  },
  {
    title: "Drivers Struggle with Complicated Systems",
    description: "You've tried other training software, but drivers can't figure it out. The technology is supposed to help, not create more problems.",
    icon: Smartphone
  },
  {
    title: "CSA Scores Keep Climbing",
    description: "Without consistent training, violations add up. CSA scores creep higher. Insurance premiums increase.",
    icon: BarChart3
  }
];

const PRODUCT_MODULES = [
  {
    title: "Small Fleet Training",
    headline: "Enterprise-Level Safety Training, Small Fleet Pricing",
    description: "Our Small Fleet Training program delivers the same comprehensive safety curriculum used by major carriers — without the enterprise price tag. Designed for fleets under 50 trucks.",
    benefits: [
      "Improve safety without breaking the bank",
      "Lower CSA scores with documented training",
      "Reduce insurance premiums",
      "Prepare for DOT audits with confidence"
    ]
  },
  {
    title: "Sexual Harassment Prevention",
    headline: "State-Compliant Sexual Harassment Training",
    description: "Specialized training to meet strict state regulations. Our courses satisfy mandatory requirements in California, New York, Illinois, Connecticut, Delaware, Maine, and other states.",
    benefits: [
      "Meet state-specific compliance requirements",
      "Protect your company from liability",
      "Document training completion for legal defense",
      "Available in multiple languages"
    ]
  },
  {
    title: "Driver/Dispatcher Training",
    headline: "Better Communication. Better Retention.",
    description: "Poor driver-dispatcher communication is a leading cause of driver turnover. Our program improves professional communication and creates a more positive working relationship.",
    benefits: [
      "Improve driver retention rates",
      "Reduce miscommunication and conflict",
      "Create a more professional operation",
      "Enhance customer service delivery"
    ]
  },
  {
    title: "Entry-Level Driver Training",
    headline: "Get New Drivers CDL-Ready, Faster",
    description: "Our ELDT theory curriculum helps aspiring drivers quickly master the knowledge required for CDL testing. Covers all FMCSA-required theory topics.",
    benefits: [
      "Comprehensive ELDT theory curriculum",
      "Self-paced learning for flexible scheduling",
      "Prepares drivers for CDL knowledge tests",
      "Certificate of completion upon finishing"
    ]
  }
];

const VALUE_PROPS = [
  {
    title: "Designed for Simplicity",
    tagline: "So Simple, Any Driver Can Use It",
    description: "We know not every driver is tech-savvy. That's why we built RaiseDash Shift with simplicity at its core. Drivers open a link, see their training, and get it done.",
    icon: User
  },
  {
    title: "Mobile-First Experience",
    tagline: "Train Anywhere. Complete Anywhere.",
    description: "Drivers aren't at desks — they're on the road. RaiseDash Shift works flawlessly on any phone or tablet, with a mobile experience so smooth it feels native.",
    icon: Smartphone
  },
  {
    title: "Audit-Ready Documentation",
    tagline: "Be Ready When DOT Comes Calling",
    description: "Every training session is automatically documented with complete audit trails. Generate reports instantly — no more digging through file cabinets.",
    icon: FileText
  },
  {
    title: "Verifiable Certificates",
    tagline: "Certificates That Stand Up to Scrutiny",
    description: "Professional, verifiable certificates generated automatically. Each includes completion details and can be verified by auditors or insurers.",
    icon: ShieldCheck
  },
  {
    title: "Built for Trucking",
    tagline: "We Know Trucking. We Built This for You.",
    description: "RaiseDash Shift was built from the ground up for trucking carriers. Every feature is designed around how carriers actually operate.",
    icon: Truck
  },
  {
    title: "Modern Platform",
    tagline: "Training Technology Built for Today",
    description: "We built something better using modern technology to deliver a faster, cleaner, more reliable experience than legacy systems.",
    icon: Zap
  },
  {
    title: "Flexible & Customizable",
    tagline: "Your Training. Your Way.",
    description: "Use our pre-built courses as-is, customize them to match your policies, or create entirely original content. The platform adapts to your needs.",
    icon: FileCheck
  },
  {
    title: "Enterprise Integration",
    tagline: "Connects to Your Existing Systems",
    description: "Connect to your TMS, HR systems, ELD platforms through our flexible API and webhook integrations. Keep your data synchronized.",
    icon: Globe
  }
];

// --- Hero Component ---
const Hero: React.FC = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-8 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-[#F9F7F6] dark:bg-secondary">
      {/* Industrial Grid Background */}
      <div className="absolute inset-0 industrial-grid" />

      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Text Content */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-card border border-[#EEEBEA] dark:border-border px-4 py-1.5 text-sm font-medium text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Compliance Made Simple
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[48px] md:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-6 leading-[1.1]"
            >
              Onboard Drivers in{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Days</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-[#EEEBEA] dark:bg-border -rotate-1" />
              </span>
              , Not Weeks
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-light max-w-xl mb-10 leading-relaxed"
            >
              The modern platform for trucking fleets to train, certify, and track driver compliance—all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto gap-2 group bg-[#1F1E1E] hover:bg-[#2E2D2D] text-white rounded-2xl">
                  Request a Demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 bg-white dark:bg-card border-[#EEEBEA] dark:border-border text-[#2E2D2D] dark:text-foreground hover:bg-[#F9F7F6] dark:hover:bg-secondary rounded-2xl" onClick={scrollToFeatures}>
                View Features
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground"
            >
              {[
                { icon: CheckCircle2, text: "Free 14-day trial" },
                { icon: Shield, text: "Audit-ready" },
                { icon: Zap, text: "Setup in 24h" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-[#2E2D2D] dark:text-foreground" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            <div className="relative rounded-2xl border border-[#EEEBEA] dark:border-border bg-white dark:bg-card shadow-2xl shadow-[#2E2D2D]/10 overflow-hidden">
              {/* Browser Header */}
              <div className="h-10 border-b border-[#EEEBEA] dark:border-border bg-[#F9F7F6] dark:bg-secondary flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#EEEBEA] dark:bg-border" />
                  <div className="h-3 w-3 rounded-full bg-[#EEEBEA] dark:bg-border" />
                  <div className="h-3 w-3 rounded-full bg-[#EEEBEA] dark:bg-border" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="h-6 w-48 rounded-xl bg-white dark:bg-card border border-[#EEEBEA] dark:border-border flex items-center justify-center">
                    <span className="text-[10px] text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-medium">app.raisedash.com/shift</span>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="font-medium text-lg text-[#2E2D2D] dark:text-foreground">Fleet Compliance Dashboard</h3>
                    <p className="text-xs text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mt-0.5">Real-time overview • Last synced just now</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white dark:bg-card text-[#2E2D2D] dark:text-foreground border border-[#EEEBEA] dark:border-border">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Audit Ready
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#F9F7F6] dark:bg-secondary rounded-2xl p-4 border border-[#EEEBEA] dark:border-border"
                  >
                    <p className="text-xs text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-medium mb-1">Compliance Rate</p>
                    <p className="text-2xl font-medium text-[#2E2D2D] dark:text-foreground">98.2%</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-[#F9F7F6] dark:bg-secondary rounded-2xl p-4 border border-[#EEEBEA] dark:border-border"
                  >
                    <p className="text-xs text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-medium mb-1">In Progress</p>
                    <p className="text-2xl font-medium text-[#2E2D2D] dark:text-foreground">12</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-[#F9F7F6] dark:bg-secondary rounded-2xl p-4 border border-[#EEEBEA] dark:border-border"
                  >
                    <p className="text-xs text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-medium mb-1">Total Drivers</p>
                    <p className="text-2xl font-medium text-[#2E2D2D] dark:text-foreground">247</p>
                  </motion.div>
                </div>

                {/* Driver List */}
                <div className="space-y-3">
                  {[
                    { initials: "MS", name: "Michael Scott", course: "Hours of Service", status: "Completed", time: "2m ago" },
                    { initials: "JH", name: "Jim Halpert", course: "Defensive Driving", status: "In Progress", time: "15m ago" },
                    { initials: "DS", name: "Dwight Schrute", course: "HazMat Basics", status: "Completed", time: "1h ago" },
                  ].map((driver, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-2xl border border-[#EEEBEA] dark:border-border hover:border-[#2E2D2D]/20 hover:bg-[#F9F7F6]/50 dark:hover:bg-secondary transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#F9F7F6] dark:bg-secondary flex items-center justify-center text-xs font-medium text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                          {driver.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">{driver.name}</p>
                          <p className="text-xs text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">{driver.course}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded-lg text-xs font-medium ${
                          driver.status === "Completed"
                            ? "bg-[#1F1E1E] text-white"
                            : "bg-[#F9F7F6] dark:bg-secondary text-[rgba(24,23,23,0.7)] dark:text-muted-foreground"
                        }`}>
                          {driver.status}
                        </span>
                        <p className="text-[10px] text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mt-0.5">{driver.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white dark:bg-card border border-[#EEEBEA] dark:border-border shadow-xl rounded-2xl p-4 z-10"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#1F1E1E] p-2.5 rounded-2xl">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">DOT Audit Passed</p>
                  <p className="text-xs text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">Zero violations found</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white dark:bg-card border border-[#EEEBEA] dark:border-border shadow-xl rounded-2xl p-3 z-10 hidden md:block"
            >
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-[rgba(24,23,23,0.7)] dark:text-muted-foreground" />
                <span className="text-sm font-medium text-[#2E2D2D] dark:text-foreground">CSA Score: <span className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">12.4</span></span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 md:mt-28"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { text: "100%", label: "Mobile-Friendly Training" },
              { text: "24/7", label: "Access Anywhere, Anytime" },
              { text: "<24h", label: "Quick Setup" },
              { text: "100%", label: "Audit-Ready Documentation" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground">
                  {stat.text}
                </p>
                <p className="text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mt-1 font-light">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

// --- Problem Section Component ---
const ProblemSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-card relative overflow-hidden">
      <div className="absolute inset-0 industrial-grid opacity-50" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[rgba(24,23,23,0.7)] dark:text-muted-foreground uppercase tracking-wider mb-4">
            <AlertTriangle className="h-4 w-4" />
            The Problem
          </span>
          <h2 className="text-[28px] md:text-4xl font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-4">
            Managing Driver Training Shouldn&apos;t Be This Hard
          </h2>
          <p className="text-lg text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-light">
            The trucking industry demands compliance, but the tools available are either too complicated or outdated.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.map((prob, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="h-12 w-12 rounded-2xl bg-[#F9F7F6] dark:bg-secondary border border-[#EEEBEA] dark:border-border flex items-center justify-center mb-5 text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                  <prob.icon size={22} />
                </div>
                <h3 className="font-medium text-lg text-[#2E2D2D] dark:text-foreground mb-2">{prob.title}</h3>
                <p className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground text-sm leading-relaxed font-light">{prob.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// --- Solution Overview Section ---
const SolutionOverview: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#F9F7F6] dark:bg-secondary relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-card border border-[#EEEBEA] dark:border-border text-sm font-medium text-[#2E2D2D] dark:text-foreground mb-6">
            <Zap className="w-4 h-4" />
            Introducing RaiseDash Shift
          </div>
          <h2 className="text-[28px] md:text-4xl font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-6">
            One Platform. Complete Compliance.
          </h2>
          <p className="text-lg text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
            RaiseDash Shift is a comprehensive driver training and onboarding platform built specifically for trucking carriers. Train new hires on company policies, safety procedures, and compliance requirements — then certify their completion with verifiable, audit-ready documentation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Shield, title: "For Safety Managers", description: "Stop chasing paperwork. See exactly who needs training, who's in progress, and who's certified — all in one dashboard." },
            { icon: Truck, title: "For Fleet Owners", description: "Reduce compliance risk, lower CSA scores, and protect your operating authority with documented training programs." },
            { icon: User, title: "For Drivers", description: "Complete training on your phone, on your schedule. No confusing interfaces. No wasted time." },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            >
              <Card className="text-center h-full hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#1F1E1E] flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-medium text-lg text-[#2E2D2D] dark:text-foreground mb-3">{item.title}</h3>
                <p className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground text-sm leading-relaxed font-light">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-8">
            <div className="absolute -top-3 left-8 w-6 h-6 bg-[#1F1E1E] rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-serif">&ldquo;</span>
            </div>
            <p className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground italic leading-relaxed font-light">
              Simplicity is the ultimate sophistication — We designed RaiseDash Shift with this principle at its core. Modern technology that works for everyone, even drivers who aren&apos;t tech-savvy.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

// --- Compliance & Regulatory Context Section (COLORFUL - for pros/cons) ---
const ComplianceSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#19224A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/60 uppercase tracking-wider mb-4">
              <FileText className="h-4 w-4" />
              Regulatory Context
            </span>
            <h2 className="text-[28px] md:text-4xl font-medium tracking-[-0.03em] mb-4">
              Why Driver Training Isn&apos;t Optional
            </h2>
            <p className="text-lg text-white/70 font-light">
              Federal regulations require carriers to maintain documented safety training programs.
            </p>
          </div>

          <div className="space-y-8">
            {/* FMCSA & CSA Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pros - Green themed */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-emerald-400" />
                  </div>
                  FMCSA Training Requirements
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  During DOT audits and compliance reviews, inspectors look for evidence that drivers have been properly trained and that training is documented.
                </p>
                <ul className="space-y-3">
                  {[
                    "Drivers trained on company safety policies and procedures",
                    "Training documented with the five W's: what, when, where, who, and why",
                    "Drivers understand Federal Motor Carrier Safety Regulations",
                    "Training records are accessible and organized"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Cons - Red/Orange themed */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-red-400" />
                  </div>
                  CSA Scores & Business Impact
                </h3>
                <p className="text-slate-300 text-sm mb-4">
                  FMCSA&apos;s Compliance, Safety, Accountability (CSA) program tracks carrier safety performance. High CSA scores (above 65%) can trigger:
                </p>
                <ul className="space-y-3">
                  {[
                    "Increased insurance premiums",
                    "Lost shipper/broker relationships",
                    "Out-of-service orders",
                    "Civil penalties (average $5,000+ per case)",
                    "Operating authority revocation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <AlertTriangle className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Bottom Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5"
              >
                <h4 className="font-bold text-emerald-300 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Entry-Level Driver Training (ELDT)
                </h4>
                <p className="text-sm text-slate-300">
                  Since February 2022, all first-time CDL applicants must complete ELDT from a registered training provider. Drivers cannot take their CDL skills test until FMCSA has a certificate of completion on file.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5"
              >
                <h4 className="font-bold text-blue-300 mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  State-Specific Requirements
                </h4>
                <p className="text-sm text-slate-300">
                  Sexual harassment prevention training is mandatory in California, Connecticut, Delaware, Illinois, Maine, and New York. Documented training provides legal protection in harassment claims.
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-2xl p-8 text-center"
            >
              <Lock className="w-12 h-12 mx-auto mb-4 text-[#2E2D2D]" />
              <h3 className="text-2xl font-medium mb-3 text-[#2E2D2D] tracking-[-0.03em]">The Bottom Line</h3>
              <p className="text-[rgba(24,23,23,0.7)] font-light max-w-2xl mx-auto">
                Compliance isn&apos;t just about avoiding fines — it&apos;s about protecting your business, your drivers, and everyone on the road. Proper documentation is your best defense in audits and litigation.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

// --- Product Modules Section ---
const ProductModules: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white dark:bg-card relative">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[rgba(24,23,23,0.7)] dark:text-muted-foreground uppercase tracking-wider mb-4">
            <Route className="h-4 w-4" />
            Training Programs
          </span>
          <h2 className="text-[28px] md:text-4xl font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-4">
            Specialized Training Solutions
          </h2>
          <p className="text-lg text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-light max-w-3xl mx-auto">
            Choose from our specialized training programs designed for specific carrier needs and compliance requirements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {PRODUCT_MODULES.map((module, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all border-l-4 border-l-[#19224A]">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#F9F7F6] dark:bg-secondary text-[#2E2D2D] dark:text-foreground text-xs font-medium mb-3">
                    {module.title}
                  </span>
                  <h3 className="text-xl font-medium text-[#2E2D2D] dark:text-foreground">{module.headline}</h3>
                </div>
                <p className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-light mb-6 text-sm leading-relaxed">
                  {module.description}
                </p>
                <div className="space-y-2">
                  {module.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#19224A] dark:text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// --- Value Propositions Section ---
const ValuePropositions: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#F9F7F6] dark:bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 industrial-grid opacity-50" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[rgba(24,23,23,0.7)] dark:text-muted-foreground uppercase tracking-wider mb-4">
            <Award className="h-4 w-4" />
            Why Choose Us
          </span>
          <h2 className="text-[28px] md:text-4xl font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-4">
            Why Carriers Choose RaiseDash Shift
          </h2>
          <p className="text-lg text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-light">
            Built different. Built better. Built for trucking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {VALUE_PROPS.map((prop, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group"
            >
              <div className="bg-white dark:bg-card border border-[#EEEBEA] dark:border-border rounded-2xl p-6 h-full hover:border-[#2E2D2D]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#F9F7F6] dark:bg-secondary border border-[#EEEBEA] dark:border-border flex items-center justify-center mb-4 text-[rgba(24,23,23,0.7)] dark:text-muted-foreground group-hover:bg-[#1F1E1E] group-hover:text-white group-hover:border-[#1F1E1E] transition-colors">
                  <prop.icon size={22} />
                </div>
                <h3 className="font-medium text-[#2E2D2D] dark:text-foreground mb-1">{prop.title}</h3>
                <p className="text-xs text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-medium mb-3">{prop.tagline}</p>
                <p className="text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-light leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// --- Interactive Workflow Component ---
type Role = "manager" | "driver";

const InteractiveWorkflow: React.FC = () => {
  const [activeRole, setActiveRole] = useState<Role>("manager");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Interaction States
  const [reportState, setReportState] = useState<"idle" | "generating" | "done">("idle");
  const [trainingState, setTrainingState] = useState<"idle" | "playing" | "completed">("idle");
  const [progress, setProgress] = useState(0);

  const handleGenerateReport = () => {
    setReportState("generating");
    setTimeout(() => {
      setReportState("done");
    }, 1500);
  };

  const handleStartTraining = () => {
    setTrainingState("playing");
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setTrainingState("completed"), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const resetTraining = () => {
    setTrainingState("idle");
    setProgress(0);
  };

  return (
    <section ref={ref} id="how-it-works" className="py-24 bg-white dark:bg-card relative overflow-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            <PlayCircle className="h-4 w-4" />
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Seamless Experience for Everyone
          </h2>
          <p className="text-lg text-gray-600">
            A seamless experience for your office team and your drivers on the road.
          </p>
        </motion.div>

        {/* Role Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1.5 rounded-xl inline-flex">
            <button
              onClick={() => setActiveRole("manager")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeRole === "manager"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Shield size={18} />
              For Safety Managers
            </button>
            <button
              onClick={() => setActiveRole("driver")}
              className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                activeRole === "driver"
                  ? "bg-white text-gray-900 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User size={18} />
              For Drivers
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Steps List */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              {activeRole === "manager" ? (
                <motion.div
                  key="manager-steps"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {[
                    { num: 1, title: "Set Up Program", desc: "Choose from pre-built DOT compliance courses or build your own custom modules." },
                    { num: 2, title: "Invite Drivers", desc: "Add drivers individually or in bulk. They receive a secure link instantly via email or SMS." },
                    { num: 3, title: "Track Compliance", desc: "Watch real-time progress. Certificates are auto-generated and stored for audits." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        step.num === 1
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}>
                        {step.num}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="driver-steps"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {[
                    { num: 1, title: "Click the Link", desc: "No app to download. Just click the secure link sent to your phone or tablet." },
                    { num: 2, title: "Watch & Learn", desc: "Complete short video modules and simple quizzes on your schedule." },
                    { num: 3, title: "Get Certified", desc: "Pass the quiz and receive your digital certificate instantly." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        step.num === 1
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}>
                        {step.num}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simulated Interface */}
          <div className="relative">
            <div className="absolute inset-0 bg-gray-100 rounded-xl transform rotate-2 scale-105 -z-10" />
            <Card className="shadow-2xl min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeRole === "manager" ? (
                  <motion.div
                    key="manager-ui"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-gray-900">Driver Status</h4>
                      <span className="text-xs bg-gray-900 text-white px-2.5 py-1 rounded-xl font-semibold">Audit Ready</span>
                    </div>
                    {[
                      { name: "Michael Scott", status: "Completed", course: "Hours of Service", time: "2m ago" },
                      { name: "Jim Halpert", status: "In Progress", course: "Defensive Driving", time: "15m ago" },
                      { name: "Dwight Schrute", status: "Completed", course: "HazMat Basics", time: "1h ago" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                         <div className="flex gap-3">
                           <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">{row.name.charAt(0)}</div>
                           <div>
                             <p className="text-sm font-semibold text-gray-900">{row.name}</p>
                             <p className="text-xs text-gray-500">{row.course}</p>
                           </div>
                         </div>
                         <div className="text-right">
                           <p className={`text-xs font-semibold ${row.status === "Completed" ? "text-gray-900" : "text-gray-500"}`}>{row.status}</p>
                           <p className="text-[10px] text-gray-400">{row.time}</p>
                         </div>
                      </div>
                    ))}
                    <div className="pt-2">
                       <button
                        className={`w-full h-11 px-4 text-sm rounded-xl font-semibold transition-all duration-300 ${
                          reportState === "done"
                            ? "bg-gray-900 text-white"
                            : "bg-gray-900 text-white hover:bg-gray-800"
                        } ${reportState === "generating" ? "opacity-80" : ""}`}
                        onClick={handleGenerateReport}
                        disabled={reportState === "generating" || reportState === "done"}
                       >
                         {reportState === "idle" && "Generate Compliance Report"}
                         {reportState === "generating" && (
                           <span className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" /> Generating...
                           </span>
                         )}
                         {reportState === "done" && (
                           <span className="flex items-center justify-center gap-2">
                            <Check className="h-4 w-4" /> Report Sent to Email
                           </span>
                         )}
                       </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="driver-ui"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                    {trainingState === "idle" && (
                      <div className="flex flex-col items-center text-center space-y-6 py-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-2">
                           <Smartphone className="w-8 h-8 text-gray-700" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">Welcome, Alex</h4>
                          <p className="text-sm text-gray-500">You have 1 assigned training.</p>
                        </div>

                        <div className="w-full bg-gray-50 p-5 rounded-xl border border-gray-200 text-left">
                           <div className="flex justify-between items-start mb-3">
                             <span className="text-xs font-bold text-gray-900 bg-gray-200 px-2.5 py-1 rounded-xl">Due Today</span>
                             <span className="text-xs text-gray-500">15 min</span>
                           </div>
                           <h5 className="font-bold text-gray-900 mb-3">Winter Driving Safety</h5>
                           <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                             <div className="bg-gray-900 h-2 rounded-full w-0" />
                           </div>
                           <button
                             className="w-full h-10 px-4 text-sm rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                             onClick={handleStartTraining}
                           >
                             <PlayCircle size={16} /> Start Training
                           </button>
                        </div>
                      </div>
                    )}

                    {trainingState === "playing" && (
                      <div className="flex flex-col items-center justify-center space-y-4 py-4 h-full">
                        <div className="w-full aspect-video bg-gray-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-white animate-spin" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                             <motion.div
                                className="h-full bg-white"
                                style={{ width: `${progress}%` }}
                             />
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">Playing: Module 1 of 3</p>
                      </div>
                    )}

                    {trainingState === "completed" && (
                      <div className="flex flex-col items-center justify-center space-y-6 py-4 h-full">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                          className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center"
                        >
                           <Check className="w-10 h-10 text-white" />
                        </motion.div>
                        <div className="text-center">
                           <h4 className="font-bold text-xl text-gray-900 mb-2">Training Complete!</h4>
                           <p className="text-gray-500">Your certificate has been generated.</p>
                        </div>
                        <button
                          className="h-10 px-5 text-sm rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2 font-semibold text-gray-700"
                          onClick={resetTraining}
                        >
                           <Download size={16} /> Download Certificate
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
};

// --- Features Component ---
const Features: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="features" className="py-24 bg-white dark:bg-card relative">
      <div className="absolute inset-0 industrial-grid opacity-30" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-[rgba(24,23,23,0.7)] dark:text-muted-foreground uppercase tracking-wider mb-4">
            <Zap className="h-4 w-4" />
            Features
          </span>
          <h2 className="text-[28px] md:text-4xl font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-4">
            Everything You Need for Fleet Compliance
          </h2>
          <p className="text-lg text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-light">
            From entry-level driver training to ongoing safety education — manage your entire program from a single, intuitive platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Card className="feature-card h-full hover:shadow-lg">
                <div className="h-14 w-14 rounded-2xl bg-[#1F1E1E] flex items-center justify-center text-white mb-6">
                  <feature.icon size={26} />
                </div>
                <h3 className="text-lg font-medium text-[#2E2D2D] dark:text-foreground mb-3">{feature.title}</h3>
                <p className="text-[rgba(24,23,23,0.7)] dark:text-muted-foreground font-light text-sm leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// --- FAQ Component ---
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faq" className="py-24 bg-white dark:bg-card">
      <Container className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            <FileText className="h-4 w-4" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about getting started.
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`border rounded-xl bg-white transition-all duration-200 ${
                openIndex === index
                  ? "border-gray-300 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? "transform rotate-180 text-gray-900" : ""
                  }`}
                />
              </button>
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// --- CTA Component ---
const CTA: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-[#F9F7F6] dark:bg-secondary">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl bg-[#19224A] p-12 md:p-16 text-center"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-white flex items-center justify-center"
            >
              <Truck className="w-8 h-8 text-[#19224A]" />
            </motion.div>

            <h2 className="text-[28px] md:text-4xl font-medium text-white mb-6 tracking-[-0.03em]">
              Ready to Transform Your Driver Training?
            </h2>
            <p className="text-lg text-white/70 font-light mb-10">
              See how RaiseDash Shift can streamline your compliance and get drivers trained faster. No credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto bg-white text-[#19224A] hover:bg-white/90 border-0 rounded-2xl">
                  Request Your Free Demo
                </Button>
              </Link>
              <Link href="/request-demo">
                <Button size="lg" variant="ghost" className="w-full sm:w-auto text-white hover:bg-white/10 border border-white/20 rounded-2xl">
                  Talk to Sales
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm text-white/50 font-light">
              Free 14-day trial included • 24/7 Support • Setup in 24 hours
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

// --- Main Page Component ---
const RaisedashShiftPage: NextPage = () => {
  useEffect(() => {
    // Maintain forced light mode behavior consistent with vertex page
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
        title="Raisedash Shift | Driver Training & Certification Platform"
        description="Modern driver training platform for trucking fleets. Train, certify, and track driver compliance with DOT-compliant LMS, automatic certificates, and audit-ready documentation."
        keywords={["driver training software", "trucking LMS", "driver onboarding", "DOT compliance training", "fleet training platform", "driver certification", "trucking compliance"]}
        ogType="product"
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Shift"
        description="Driver training and certification platform for trucking fleets. DOT-compliant LMS with automatic certificates and audit-ready documentation."
        operatingSystem={["iOS", "Android", "Web"]}
        applicationCategory="BusinessApplication"
      />
      <style dangerouslySetInnerHTML={{ __html: shiftStyles }} />
      <div className="shift-page min-h-screen bg-[#F9F7F6] dark:bg-secondary text-[#2E2D2D] dark:text-foreground selection:bg-[#19224A]/15 selection:text-[#19224A]">
        <main>
          <Hero />
          <ProblemSection />
          <SolutionOverview />
          <ComplianceSection />
          <InteractiveWorkflow />
          <ProductModules />
          <ValuePropositions />
          <Features />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RaisedashShiftPage;
