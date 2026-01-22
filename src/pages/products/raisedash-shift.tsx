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
    transition: all 0.15s ease;
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
    <div className={`bg-card border-border rounded-xs border p-8 ${className}`}>{children}</div>
  );
};

// --- Animated Counter Component ---
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({
  value,
  suffix = "",
  duration = 2000,
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

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
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
    description:
      "Every training session is logged with detailed timestamps, IP addresses, and completion metrics. Generate comprehensive compliance reports instantly for DOT audits.",
    icon: FileText,
  },
  {
    title: "Mobile-First Experience",
    description:
      "Drivers can complete training on any device. No app download required—just a secure, magic link sent via SMS or email.",
    icon: Smartphone,
  },
  {
    title: "Automated Certificates",
    description:
      "Professional, verifiable certificates are generated instantly upon course completion and stored indefinitely in the driver digital file.",
    icon: ShieldCheck,
  },
  {
    title: "Real-Time Tracking & Scorecards",
    description:
      "Monitor progress in real-time. Visualize fleet safety performance with aggregate driver scorecards and identify high-risk behaviors early.",
    icon: BarChart3,
  },
  {
    title: "Custom Content Engine",
    description:
      "Use our library of 50+ DOT courses or upload your own videos, PDFs, policies, and quizzes. Build a curriculum that fits your specific operations.",
    icon: Zap,
  },
  {
    title: "Enterprise Integration",
    description:
      "Seamlessly sync with Samsara, Motive, Geotab, and your TMS via our robust API. Automate driver roster updates and training assignments.",
    icon: Globe,
  },
  {
    title: "Offline Mode Support",
    description:
      "Drivers often operate in low-service areas. Our progressive web app technology allows training to be buffered and completed even with spotty connections.",
    icon: WifiOff,
  },
  {
    title: "Multi-Language Support",
    description:
      "Automatically translate training interface and subtitles into Spanish, French, Punjabi, and Russian to support your diverse workforce.",
    icon: Languages,
  },
  {
    title: "Automated Reminders",
    description:
      "Set it and forget it. The system automatically sends SMS and email reminders to drivers who haven't completed their assigned training by the due date.",
    icon: BellRing,
  },
];

const FAQS: FAQItem[] = [
  {
    question: "Do drivers need to download an app?",
    answer:
      "No. RaiseDash Shift works entirely in a web browser to reduce friction. Drivers simply click a link to access their training — no downloads, no installations, no app store credentials required. This results in 40% higher adoption rates compared to native apps.",
  },
  {
    question: "Will this help me pass a DOT audit?",
    answer:
      "Yes. The platform is specifically designed for compliance. We track start times, end times, quiz scores, and digital signatures. You can generate a 'DOT Audit Packet' for any driver or the entire fleet in one click.",
  },
  {
    question: "How does the pricing model work?",
    answer:
      "We charge per active driver per month. You are not charged for archived drivers or administrative users. This ensures your costs scale predictably with your fleet size. Contact sales for volume discounts on fleets larger than 500 trucks.",
  },
  {
    question: "Can I integrate with my ELD provider?",
    answer:
      "Absolutely. We support native integrations with major ELD providers like Samsara, Motive, and Geotab. We can automatically pull your driver roster so you never have to manually add or remove drivers.",
  },
  {
    question: "Can I upload my own training content?",
    answer:
      "Yes. Our Content Builder allows you to upload videos, embed YouTube/Vimeo links, create text modules, and build interactive quizzes. You can mix and match our pre-built content with your custom company policies.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Security is our top priority. We use bank-grade 256-bit encryption for all data in transit and at rest.",
  },
  {
    question: "Is support included?",
    answer:
      "We provide 24/7 customer support for all enterprise plans. You will also be assigned a dedicated Customer Success Manager to assist with onboarding, content strategy, and integration setup.",
  },
];

const PROBLEMS = [
  {
    title: "Tracking Progress is a Nightmare",
    description:
      "Spreadsheets, emails, and sticky notes aren't enough. You lose track of who has completed what.",
    icon: Search,
  },
  {
    title: "Audit Anxiety is Real",
    description:
      "When DOT arrives, can you prove every driver received training? Missing records leads to fines.",
    icon: AlertTriangle,
  },
  {
    title: "Manual Certificates",
    description:
      "Generating, filing, and retrieving certificates manually eats up hours of valuable administrative time.",
    icon: FileWarning,
  },
  {
    title: "Content Creation Takes Forever",
    description: "Turning handbooks into training materials is a project nobody has time for.",
    icon: Clock,
  },
  {
    title: "Drivers Struggle with Complicated Systems",
    description:
      "You've tried other training software, but drivers can't figure it out. The technology is supposed to help, not create more problems.",
    icon: Smartphone,
  },
  {
    title: "CSA Scores Keep Climbing",
    description:
      "Without consistent training, violations add up. CSA scores creep higher. Insurance premiums increase.",
    icon: BarChart3,
  },
];

const PRODUCT_MODULES = [
  {
    title: "Small Fleet Training",
    headline: "Enterprise-Level Safety Training, Small Fleet Pricing",
    description:
      "Our Small Fleet Training program delivers the same comprehensive safety curriculum used by major carriers — without the enterprise price tag. Designed for fleets under 50 trucks.",
    benefits: [
      "Improve safety without breaking the bank",
      "Lower CSA scores with documented training",
      "Reduce insurance premiums",
      "Prepare for DOT audits with confidence",
    ],
  },
  {
    title: "Sexual Harassment Prevention",
    headline: "State-Compliant Sexual Harassment Training",
    description:
      "Specialized training to meet strict state regulations. Our courses satisfy mandatory requirements in California, New York, Illinois, Connecticut, Delaware, Maine, and other states.",
    benefits: [
      "Meet state-specific compliance requirements",
      "Protect your company from liability",
      "Document training completion for legal defense",
      "Available in multiple languages",
    ],
  },
  {
    title: "Driver/Dispatcher Training",
    headline: "Better Communication. Better Retention.",
    description:
      "Poor driver-dispatcher communication is a leading cause of driver turnover. Our program improves professional communication and creates a more positive working relationship.",
    benefits: [
      "Improve driver retention rates",
      "Reduce miscommunication and conflict",
      "Create a more professional operation",
      "Enhance customer service delivery",
    ],
  },
  {
    title: "Entry-Level Driver Training",
    headline: "Get New Drivers CDL-Ready, Faster",
    description:
      "Our ELDT theory curriculum helps aspiring drivers quickly master the knowledge required for CDL testing. Covers all FMCSA-required theory topics.",
    benefits: [
      "Comprehensive ELDT theory curriculum",
      "Self-paced learning for flexible scheduling",
      "Prepares drivers for CDL knowledge tests",
      "Certificate of completion upon finishing",
    ],
  },
];

const VALUE_PROPS = [
  {
    title: "Designed for Simplicity",
    tagline: "So Simple, Any Driver Can Use It",
    description:
      "We know not every driver is tech-savvy. That's why we built RaiseDash Shift with simplicity at its core. Drivers open a link, see their training, and get it done.",
    icon: User,
  },
  {
    title: "Mobile-First Experience",
    tagline: "Train Anywhere. Complete Anywhere.",
    description:
      "Drivers aren't at desks — they're on the road. RaiseDash Shift works flawlessly on any phone or tablet, with a mobile experience so smooth it feels native.",
    icon: Smartphone,
  },
  {
    title: "Audit-Ready Documentation",
    tagline: "Be Ready When DOT Comes Calling",
    description:
      "Every training session is automatically documented with complete audit trails. Generate reports instantly — no more digging through file cabinets.",
    icon: FileText,
  },
  {
    title: "Verifiable Certificates",
    tagline: "Certificates That Stand Up to Scrutiny",
    description:
      "Professional, verifiable certificates generated automatically. Each includes completion details and can be verified by auditors or insurers.",
    icon: ShieldCheck,
  },
  {
    title: "Built for Trucking",
    tagline: "We Know Trucking. We Built This for You.",
    description:
      "RaiseDash Shift was built from the ground up for trucking carriers. Every feature is designed around how carriers actually operate.",
    icon: Truck,
  },
  {
    title: "Modern Platform",
    tagline: "Training Technology Built for Today",
    description:
      "We built something better using modern technology to deliver a faster, cleaner, more reliable experience than legacy systems.",
    icon: Zap,
  },
  {
    title: "Flexible & Customizable",
    tagline: "Your Training. Your Way.",
    description:
      "Use our pre-built courses as-is, customize them to match your policies, or create entirely original content. The platform adapts to your needs.",
    icon: FileCheck,
  },
  {
    title: "Enterprise Integration",
    tagline: "Connects to Your Existing Systems",
    description:
      "Connect to your TMS, HR systems, ELD platforms through our flexible API and webhook integrations. Keep your data synchronized.",
    icon: Globe,
  },
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
    <section className="bg-background dark:bg-secondary relative overflow-hidden pt-8 pb-24 md:pt-16 md:pb-32">
      {/* Industrial Grid Background */}
      <div className="industrial-grid absolute inset-0" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-20">
          {/* Text Content */}
          <div className="max-w-2xl flex-1">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card border-border text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-normal"
            >
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
              Compliance Made Simple
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-foreground mb-6 text-[48px] leading-[1.1] font-normal tracking-[-0.03em] md:text-5xl lg:text-[3.5rem]"
            >
              Onboard Drivers in{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Days</span>
                <span className="bg-border absolute right-0 bottom-1 left-0 h-3 -rotate-1" />
              </span>
              , Not Weeks
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground mb-10 max-w-xl text-xl leading-relaxed font-light"
            >
              The modern platform for trucking fleets to train, certify, and track driver
              compliance—all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12 flex flex-col gap-4 sm:flex-row"
            >
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="group hover:bg-foreground w-full gap-2 rounded-xs bg-[#1F1E1E] text-white sm:w-auto"
                >
                  Request a Demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="lg"
                className="border-border text-foreground hover:bg-surface-3 w-full gap-2 rounded-xs bg-white sm:w-auto"
                onClick={scrollToFeatures}
              >
                View Features
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm"
            >
              {[
                { icon: CheckCircle2, text: "Free 14-day trial" },
                { icon: Shield, text: "Audit-ready" },
                { icon: Zap, text: "Setup in 24h" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="text-foreground h-4 w-4" />
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
            className="relative w-full flex-1"
          >
            <div className="border-border bg-card shadow-foreground/10 relative overflow-hidden rounded-xs border shadow-2xl">
              {/* Browser Header */}
              <div className="border-border bg-surface-3 dark:bg-secondary flex h-10 items-center gap-2 border-b px-4">
                <div className="flex gap-1.5">
                  <div className="bg-border h-3 w-3 rounded-full" />
                  <div className="bg-border h-3 w-3 rounded-full" />
                  <div className="bg-border h-3 w-3 rounded-full" />
                </div>
                <div className="flex flex-1 justify-center">
                  <div className="border-border flex h-6 w-48 items-center justify-center rounded-xs border bg-white">
                    <span className="text-muted-foreground text-[10px] font-normal">
                      app.raisedash.com/shift
                    </span>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 md:p-8">
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h3 className="text-foreground text-lg font-normal">
                      Fleet Compliance Dashboard
                    </h3>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Real-time overview • Last synced just now
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-card text-foreground border-border inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-normal">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Audit Ready
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-surface-3 dark:bg-secondary border-border rounded-xs border p-4"
                  >
                    <p className="text-muted-foreground mb-1 text-xs font-normal">
                      Compliance Rate
                    </p>
                    <p className="text-foreground text-2xl font-normal">98.2%</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-surface-3 dark:bg-secondary border-border rounded-xs border p-4"
                  >
                    <p className="text-muted-foreground mb-1 text-xs font-normal">In Progress</p>
                    <p className="text-foreground text-2xl font-normal">12</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-surface-3 dark:bg-secondary border-border rounded-xs border p-4"
                  >
                    <p className="text-muted-foreground mb-1 text-xs font-normal">Total Drivers</p>
                    <p className="text-foreground text-2xl font-normal">247</p>
                  </motion.div>
                </div>

                {/* Driver List */}
                <div className="space-y-3">
                  {[
                    {
                      initials: "MS",
                      name: "Michael Scott",
                      course: "Hours of Service",
                      status: "Completed",
                      time: "2m ago",
                    },
                    {
                      initials: "JH",
                      name: "Jim Halpert",
                      course: "Defensive Driving",
                      status: "In Progress",
                      time: "15m ago",
                    },
                    {
                      initials: "DS",
                      name: "Dwight Schrute",
                      course: "HazMat Basics",
                      status: "Completed",
                      time: "1h ago",
                    },
                  ].map((driver, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="border-border hover:border-foreground/20 hover:bg-surface-3/50 dark:hover:bg-secondary flex cursor-pointer items-center justify-between rounded-xs border p-3 transition-all duration-[0.15s]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-surface-3 dark:bg-secondary text-muted-foreground flex h-9 w-9 items-center justify-center rounded-full text-xs font-normal">
                          {driver.initials}
                        </div>
                        <div>
                          <p className="text-foreground text-sm font-normal">{driver.name}</p>
                          <p className="text-muted-foreground text-xs">{driver.course}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex rounded-xs px-2 py-0.5 text-xs font-normal ${
                            driver.status === "Completed"
                              ? "bg-[#1F1E1E] text-white"
                              : "bg-surface-3 dark:bg-secondary text-muted-foreground"
                          }`}
                        >
                          {driver.status}
                        </span>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">{driver.time}</p>
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
              className="bg-card border-border absolute -bottom-4 -left-4 z-10 rounded-xs border p-4 shadow-xl md:-bottom-6 md:-left-6"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xs bg-[#1F1E1E] p-2.5">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-normal">DOT Audit Passed</p>
                  <p className="text-muted-foreground text-xs">Zero violations found</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5, type: "spring" }}
              className="bg-card border-border absolute -top-4 -right-4 z-10 hidden rounded-xs border p-3 shadow-xl md:-top-6 md:-right-6 md:block"
            >
              <div className="flex items-center gap-2">
                <Gauge className="text-muted-foreground h-4 w-4" />
                <span className="text-foreground text-sm font-normal">
                  CSA Score: <span className="text-muted-foreground">12.4</span>
                </span>
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
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {[
              { text: "100%", label: "Mobile-Friendly Training" },
              { text: "24/7", label: "Access Anywhere, Anytime" },
              { text: "<24h", label: "Quick Setup" },
              { text: "100%", label: "Audit-Ready Documentation" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-foreground text-3xl font-normal tracking-[-0.03em] md:text-4xl">
                  {stat.text}
                </p>
                <p className="text-muted-foreground mt-1 text-sm font-light">{stat.label}</p>
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
    <section ref={ref} className="bg-card relative overflow-hidden py-24">
      <div className="industrial-grid absolute inset-0 opacity-50" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-muted-foreground mb-4 inline-flex items-center gap-2 text-sm font-normal tracking-wider uppercase">
            <AlertTriangle className="h-4 w-4" />
            The Problem
          </span>
          <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em] md:text-4xl">
            Managing Driver Training Shouldn&apos;t Be This Hard
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            The trucking industry demands compliance, but the tools available are either too
            complicated or outdated.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((prob, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full transition-all duration-[0.15s] hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-surface-3 dark:bg-secondary border-border text-muted-foreground mb-5 flex h-12 w-12 items-center justify-center rounded-xs border">
                  <prob.icon size={22} />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-normal">{prob.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  {prob.description}
                </p>
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
    <section ref={ref} className="bg-background dark:bg-secondary relative overflow-hidden py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <div className="bg-card border-border text-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-normal">
            <Zap className="h-4 w-4" />
            Introducing RaiseDash Shift
          </div>
          <h2 className="text-foreground mb-6 text-[28px] font-normal tracking-[-0.03em] md:text-4xl">
            One Platform. Complete Compliance.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed font-light">
            RaiseDash Shift is a comprehensive driver training and onboarding platform built
            specifically for trucking carriers. Train new hires on company policies, safety
            procedures, and compliance requirements — then certify their completion with verifiable,
            audit-ready documentation.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "For Safety Managers",
              description:
                "Stop chasing paperwork. See exactly who needs training, who's in progress, and who's certified — all in one dashboard.",
            },
            {
              icon: Truck,
              title: "For Fleet Owners",
              description:
                "Reduce compliance risk, lower CSA scores, and protect your operating authority with documented training programs.",
            },
            {
              icon: User,
              title: "For Drivers",
              description:
                "Complete training on your phone, on your schedule. No confusing interfaces. No wasted time.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
            >
              <Card className="h-full text-center transition-all duration-[0.15s] hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xs bg-[#1F1E1E]">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-foreground mb-3 text-lg font-normal">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="bg-card border-border relative rounded-xs border p-8">
            <div className="absolute -top-3 left-8 flex h-6 w-6 items-center justify-center rounded-full bg-[#1F1E1E]">
              <span className="font-serif text-lg text-white">&ldquo;</span>
            </div>
            <p className="text-muted-foreground leading-relaxed font-light italic">
              Simplicity is the ultimate sophistication — We designed RaiseDash Shift with this
              principle at its core. Modern technology that works for everyone, even drivers who
              aren&apos;t tech-savvy.
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
    <section ref={ref} className="relative overflow-hidden bg-[#19224A] py-24 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-normal tracking-wider text-white/60 uppercase">
              <FileText className="h-4 w-4" />
              Regulatory Context
            </span>
            <h2 className="mb-4 text-[28px] font-normal tracking-[-0.03em] md:text-4xl">
              Why Driver Training Isn&apos;t Optional
            </h2>
            <p className="text-lg font-light text-white/70">
              Federal regulations require carriers to maintain documented safety training programs.
            </p>
          </div>

          <div className="space-y-8">
            {/* FMCSA & CSA Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Pros - Green themed */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-xs border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-4 flex items-center gap-3 text-xl font-bold">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xs bg-emerald-500/20">
                    <FileText className="h-5 w-5 text-emerald-400" />
                  </div>
                  FMCSA Training Requirements
                </h3>
                <p className="mb-4 text-sm text-slate-300">
                  During DOT audits and compliance reviews, inspectors look for evidence that
                  drivers have been properly trained and that training is documented.
                </p>
                <ul className="space-y-3">
                  {[
                    "Drivers trained on company safety policies and procedures",
                    "Training documented with the five W's: what, when, where, who, and why",
                    "Drivers understand Federal Motor Carrier Safety Regulations",
                    "Training records are accessible and organized",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
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
                className="rounded-xs border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-4 flex items-center gap-3 text-xl font-bold">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xs bg-red-500/20">
                    <BarChart3 className="h-5 w-5 text-red-400" />
                  </div>
                  CSA Scores & Business Impact
                </h3>
                <p className="mb-4 text-sm text-slate-300">
                  FMCSA&apos;s Compliance, Safety, Accountability (CSA) program tracks carrier
                  safety performance. High CSA scores (above 65%) can trigger:
                </p>
                <ul className="space-y-3">
                  {[
                    "Increased insurance premiums",
                    "Lost shipper/broker relationships",
                    "Out-of-service orders",
                    "Civil penalties (average $5,000+ per case)",
                    "Operating authority revocation",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Bottom Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-xs border border-emerald-500/20 bg-emerald-500/10 p-5"
              >
                <h4 className="mb-2 flex items-center gap-2 font-bold text-emerald-300">
                  <ShieldCheck className="h-5 w-5" />
                  Entry-Level Driver Training (ELDT)
                </h4>
                <p className="text-sm text-slate-300">
                  Since February 2022, all first-time CDL applicants must complete ELDT from a
                  registered training provider. Drivers cannot take their CDL skills test until
                  FMCSA has a certificate of completion on file.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-xs border border-blue-500/20 bg-blue-500/10 p-5"
              >
                <h4 className="mb-2 flex items-center gap-2 font-bold text-blue-300">
                  <Globe className="h-5 w-5" />
                  State-Specific Requirements
                </h4>
                <p className="text-sm text-slate-300">
                  Sexual harassment prevention training is mandatory in California, Connecticut,
                  Delaware, Illinois, Maine, and New York. Documented training provides legal
                  protection in harassment claims.
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-card rounded-xs p-8 text-center"
            >
              <Lock className="text-foreground mx-auto mb-4 h-12 w-12" />
              <h3 className="text-foreground mb-3 text-2xl font-normal tracking-[-0.03em]">
                The Bottom Line
              </h3>
              <p className="text-muted-foreground mx-auto max-w-2xl font-light">
                Compliance isn&apos;t just about avoiding fines — it&apos;s about protecting your
                business, your drivers, and everyone on the road. Proper documentation is your best
                defense in audits and litigation.
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
    <section ref={ref} className="bg-card relative py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-muted-foreground mb-4 inline-flex items-center gap-2 text-sm font-normal tracking-wider uppercase">
            <Route className="h-4 w-4" />
            Training Programs
          </span>
          <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em] md:text-4xl">
            Specialized Training Solutions
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg font-light">
            Choose from our specialized training programs designed for specific carrier needs and
            compliance requirements.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {PRODUCT_MODULES.map((module, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="h-full border-l-4 border-l-[#19224A] transition-all duration-[0.15s] hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4">
                  <span className="bg-surface-3 dark:bg-secondary text-foreground mb-3 inline-block rounded-full px-3 py-1 text-xs font-normal">
                    {module.title}
                  </span>
                  <h3 className="text-foreground text-xl font-normal">{module.headline}</h3>
                </div>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed font-light">
                  {module.description}
                </p>
                <div className="space-y-2">
                  {module.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="dark:text-primary mt-0.5 h-4 w-4 flex-shrink-0 text-[#19224A]" />
                      <span className="text-muted-foreground">{benefit}</span>
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
    <section ref={ref} className="bg-background dark:bg-secondary relative overflow-hidden py-24">
      <div className="industrial-grid absolute inset-0 opacity-50" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-muted-foreground mb-4 inline-flex items-center gap-2 text-sm font-normal tracking-wider uppercase">
            <Award className="h-4 w-4" />
            Why Choose Us
          </span>
          <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em] md:text-4xl">
            Why Carriers Choose RaiseDash Shift
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Built different. Built better. Built for trucking.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((prop, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group"
            >
              <div className="bg-card border-border hover:border-foreground/20 h-full rounded-xs border p-6 transition-all duration-[0.15s] hover:-translate-y-1 hover:shadow-lg">
                <div className="bg-surface-3 dark:bg-secondary border-border text-muted-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-xs border transition-colors duration-[0.15s] group-hover:border-[#1F1E1E] group-hover:bg-[#1F1E1E] group-hover:text-white">
                  <prop.icon size={22} />
                </div>
                <h3 className="text-foreground mb-1 font-normal">{prop.title}</h3>
                <p className="text-muted-foreground mb-3 text-xs font-normal">{prop.tagline}</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
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
      setProgress((prev) => {
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
    <section ref={ref} id="how-it-works" className="bg-card relative overflow-hidden py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
            <PlayCircle className="h-4 w-4" />
            How It Works
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Seamless Experience for Everyone
          </h2>
          <p className="text-lg text-gray-600">
            A seamless experience for your office team and your drivers on the road.
          </p>
        </motion.div>

        {/* Role Switcher */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-xs bg-gray-100 p-1.5">
            <button
              onClick={() => setActiveRole("manager")}
              className={`flex items-center gap-2 rounded-xs px-6 py-3 text-sm font-semibold transition-all duration-[0.15s] ${
                activeRole === "manager"
                  ? "bg-card text-foreground shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Shield size={18} />
              For Safety Managers
            </button>
            <button
              onClick={() => setActiveRole("driver")}
              className={`flex items-center gap-2 rounded-xs px-6 py-3 text-sm font-semibold transition-all duration-[0.15s] ${
                activeRole === "driver"
                  ? "bg-card text-foreground shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User size={18} />
              For Drivers
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
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
                    {
                      num: 1,
                      title: "Set Up Program",
                      desc: "Choose from pre-built DOT compliance courses or build your own custom modules.",
                    },
                    {
                      num: 2,
                      title: "Invite Drivers",
                      desc: "Add drivers individually or in bulk. They receive a secure link instantly via email or SMS.",
                    },
                    {
                      num: 3,
                      title: "Track Compliance",
                      desc: "Watch real-time progress. Certificates are auto-generated and stored for audits.",
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xs text-lg font-bold ${
                          step.num === 1
                            ? "bg-gray-900 text-white"
                            : "border border-gray-200 bg-gray-100 text-gray-500"
                        }`}
                      >
                        {step.num}
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-gray-900">{step.title}</h3>
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
                    {
                      num: 1,
                      title: "Click the Link",
                      desc: "No app to download. Just click the secure link sent to your phone or tablet.",
                    },
                    {
                      num: 2,
                      title: "Watch & Learn",
                      desc: "Complete short video modules and simple quizzes on your schedule.",
                    },
                    {
                      num: 3,
                      title: "Get Certified",
                      desc: "Pass the quiz and receive your digital certificate instantly.",
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xs text-lg font-bold ${
                          step.num === 1
                            ? "bg-gray-900 text-white"
                            : "border border-gray-200 bg-gray-100 text-gray-500"
                        }`}
                      >
                        {step.num}
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-bold text-gray-900">{step.title}</h3>
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
            <div className="absolute inset-0 -z-10 scale-105 rotate-2 transform rounded-xs bg-gray-100" />
            <Card className="min-h-[400px] shadow-2xl">
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
                      <span className="rounded-xs bg-gray-900 px-2.5 py-1 text-xs font-semibold text-white">
                        Audit Ready
                      </span>
                    </div>
                    {[
                      {
                        name: "Michael Scott",
                        status: "Completed",
                        course: "Hours of Service",
                        time: "2m ago",
                      },
                      {
                        name: "Jim Halpert",
                        status: "In Progress",
                        course: "Defensive Driving",
                        time: "15m ago",
                      },
                      {
                        name: "Dwight Schrute",
                        status: "Completed",
                        course: "HazMat Basics",
                        time: "1h ago",
                      },
                    ].map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-xs bg-gray-50 p-3 transition-colors duration-[0.15s] hover:bg-gray-100"
                      >
                        <div className="flex gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                            {row.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{row.name}</p>
                            <p className="text-xs text-gray-500">{row.course}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-xs font-semibold ${row.status === "Completed" ? "text-gray-900" : "text-gray-500"}`}
                          >
                            {row.status}
                          </p>
                          <p className="text-[10px] text-gray-400">{row.time}</p>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2">
                      <button
                        className={`h-11 w-full rounded-xs px-4 text-sm font-semibold transition-all duration-[0.15s] ${
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
                    className="flex h-full flex-col"
                  >
                    {trainingState === "idle" && (
                      <div className="flex flex-col items-center space-y-6 py-4 text-center">
                        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-xs bg-gray-100">
                          <Smartphone className="h-8 w-8 text-gray-700" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">Welcome, Alex</h4>
                          <p className="text-sm text-gray-500">You have 1 assigned training.</p>
                        </div>

                        <div className="w-full rounded-xs border border-gray-200 bg-gray-50 p-5 text-left">
                          <div className="mb-3 flex items-start justify-between">
                            <span className="rounded-xs bg-gray-200 px-2.5 py-1 text-xs font-bold text-gray-900">
                              Due Today
                            </span>
                            <span className="text-xs text-gray-500">15 min</span>
                          </div>
                          <h5 className="mb-3 font-bold text-gray-900">Winter Driving Safety</h5>
                          <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
                            <div className="h-2 w-0 rounded-full bg-gray-900" />
                          </div>
                          <button
                            className="flex h-10 w-full items-center justify-center gap-2 rounded-xs bg-gray-900 px-4 text-sm font-semibold text-white transition-colors duration-[0.15s] hover:bg-gray-800"
                            onClick={handleStartTraining}
                          >
                            <PlayCircle size={16} /> Start Training
                          </button>
                        </div>
                      </div>
                    )}

                    {trainingState === "playing" && (
                      <div className="flex h-full flex-col items-center justify-center space-y-4 py-4">
                        <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xs bg-gray-900">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-10 w-10 animate-spin text-white" />
                          </div>
                          <div className="absolute right-0 bottom-0 left-0 h-1 bg-gray-700">
                            <motion.div
                              className="h-full bg-white"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          Playing: Module 1 of 3
                        </p>
                      </div>
                    )}

                    {trainingState === "completed" && (
                      <div className="flex h-full flex-col items-center justify-center space-y-6 py-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                          className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-900"
                        >
                          <Check className="h-10 w-10 text-white" />
                        </motion.div>
                        <div className="text-center">
                          <h4 className="mb-2 text-xl font-bold text-gray-900">
                            Training Complete!
                          </h4>
                          <p className="text-gray-500">Your certificate has been generated.</p>
                        </div>
                        <button
                          className="flex h-10 items-center gap-2 rounded-xs border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-700 transition-colors duration-[0.15s] hover:bg-gray-50"
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
    <section ref={ref} id="features" className="bg-card relative py-24">
      <div className="industrial-grid absolute inset-0 opacity-30" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="text-muted-foreground mb-4 inline-flex items-center gap-2 text-sm font-normal tracking-wider uppercase">
            <Zap className="h-4 w-4" />
            Features
          </span>
          <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em] md:text-4xl">
            Everything You Need for Fleet Compliance
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            From entry-level driver training to ongoing safety education — manage your entire
            program from a single, intuitive platform.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Card className="feature-card h-full hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xs bg-[#1F1E1E] text-white">
                  <feature.icon size={26} />
                </div>
                <h3 className="text-foreground mb-3 text-lg font-normal">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-light">
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
    <section ref={ref} id="faq" className="bg-card py-24">
      <Container className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-gray-500 uppercase">
            <FileText className="h-4 w-4" />
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">Everything you need to know about getting started.</p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`bg-card rounded-xs border transition-all duration-[0.15s] ${
                openIndex === index
                  ? "border-gray-300 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="pr-4 font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-[0.15s] ${
                    openIndex === index ? "rotate-180 transform text-gray-900" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden px-5 transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm leading-relaxed text-gray-600">{faq.answer}</p>
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
    <section ref={ref} className="bg-background dark:bg-secondary py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xs bg-[#19224A] p-12 text-center md:p-16"
        >
          <div className="relative z-10 mx-auto max-w-3xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-xs bg-white"
            >
              <Truck className="h-8 w-8 text-[#19224A]" />
            </motion.div>

            <h2 className="mb-6 text-[28px] font-normal tracking-[-0.03em] text-white md:text-4xl">
              Ready to Transform Your Driver Training?
            </h2>
            <p className="mb-10 text-lg font-light text-white/70">
              See how RaiseDash Shift can streamline your compliance and get drivers trained faster.
              No credit card required.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="w-full rounded-xs border-0 bg-white text-[#19224A] hover:bg-white/90 sm:w-auto"
                >
                  Request Your Free Demo
                </Button>
              </Link>
              <Link href="/get-started">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full rounded-xs border border-white/20 text-white hover:bg-white/10 sm:w-auto"
                >
                  Talk to Sales
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-sm font-light text-white/50">
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
        keywords={[
          "driver training software",
          "trucking LMS",
          "driver onboarding",
          "DOT compliance training",
          "fleet training platform",
          "driver certification",
          "trucking compliance",
        ]}
        ogType="product"
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Shift"
        description="Driver training and certification platform for trucking fleets. DOT-compliant LMS with automatic certificates and audit-ready documentation."
        operatingSystem={["iOS", "Android", "Web"]}
        applicationCategory="BusinessApplication"
      />
      <style dangerouslySetInnerHTML={{ __html: shiftStyles }} />
      <div className="shift-page bg-background dark:bg-secondary text-foreground min-h-screen selection:bg-[#19224A]/15 selection:text-[#19224A]">
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
