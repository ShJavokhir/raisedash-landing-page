import Head from "next/head";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  FileText,
  BarChart3,
  Smartphone,
  Zap,
  Users,
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
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";

// --- Inline Card Component ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  withAccents?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = "", withAccents = false }) => {
  return (
    <div className={`bg-card text-card-foreground border border-border rounded-lg shadow-cal-sm ${withAccents ? "ui-corner-accents p-1" : ""} ${className}`}>
      <div className={`h-full w-full ${withAccents ? "bg-card rounded-[inherit] p-5" : "p-6"}`}>
        {children}
      </div>
    </div>
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
    answer: "Security is our top priority. We use bank-grade 256-bit encryption for all data in transit and at rest. We are SOC 2 Type II compliant and perform regular penetration testing."
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 50
      }
    }
  };

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Text Content */}
          <div className="flex-1 max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-muted-foreground mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              Safety and Compliance in Days
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-foreground mb-6 leading-[1.1]">
              Onboard Drivers in Days, Not Weeks
            </h1>

            <p className="text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              The modern platform for trucking fleets to train, certify, and track driver compliance—all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/request-demo">
                <Button size="lg" className="w-full sm:w-auto gap-2 group">
                  Request a Demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2" onClick={scrollToFeatures}>
                View Features
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Audit-ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Setup in 24h</span>
              </div>
            </div>
          </div>

          {/* Visual/Image Content - Abstract Representation of Dashboard */}
          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
            >
               {/* Header of fake browser */}
               <div className="h-8 border-b border-border bg-muted/30 flex items-center px-4 space-x-2">
                 <div className="h-3 w-3 rounded-full bg-red-400/50"></div>
                 <div className="h-3 w-3 rounded-full bg-yellow-400/50"></div>
                 <div className="h-3 w-3 rounded-full bg-green-400/50"></div>
               </div>
               {/* Content of fake app */}
               <div className="p-6 md:p-8">
                 <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="font-semibold text-lg">Fleet Safety Overview</h3>
                      <p className="text-xs text-muted-foreground">Updated just now</p>
                    </div>
                    <button className="h-8 px-3 text-xs rounded-md border border-border bg-background hover:bg-muted/60 transition-colors">
                      Export Report
                    </button>
                 </div>

                 <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-2 gap-4 mb-8"
                 >
                   <motion.div variants={itemVariants} className="p-4 bg-muted/20 rounded-lg border border-border">
                     <p className="text-xs text-muted-foreground mb-1">Compliance Rate</p>
                     <p className="text-2xl font-bold text-green-600">98.2%</p>
                   </motion.div>
                   <motion.div variants={itemVariants} className="p-4 bg-muted/20 rounded-lg border border-border">
                     <p className="text-xs text-muted-foreground mb-1">Pending Courses</p>
                     <p className="text-2xl font-bold text-orange-500">12</p>
                   </motion.div>
                 </motion.div>

                 <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-3"
                 >
                   {[1, 2, 3].map((i) => (
                     <motion.div
                        key={i}
                        variants={itemVariants}
                        className="flex items-center justify-between p-3 border border-border rounded-md hover:bg-muted/10 transition-colors"
                      >
                       <div className="flex items-center gap-3">
                         <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">JD</div>
                         <div>
                           <p className="text-sm font-medium">Driver John Doe</p>
                           <p className="text-xs text-muted-foreground">Completed: HazMat Safety</p>
                         </div>
                       </div>
                       <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                         Verified
                       </span>
                     </motion.div>
                   ))}
                 </motion.div>
               </div>

               {/* Floating Badge */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 1.2, duration: 0.4 }}
                 className="absolute -bottom-6 -left-6 md:bottom-8 md:-left-8 bg-background border border-border shadow-cal-lg p-4 rounded-lg z-10 hidden md:block"
               >
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Audit Passed</p>
                      <p className="text-xs text-muted-foreground">No violations found</p>
                    </div>
                  </div>
               </motion.div>
            </motion.div>

            {/* Background decorations */}
            <div className="absolute -z-10 top-1/2 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
            <div className="absolute -z-10 bottom-0 left-10 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

// --- Problem Section Component ---
const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 bg-background border-y border-border">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Managing Driver Training Shouldn't Be This Hard</h2>
          <p className="text-lg text-muted-foreground">
            The trucking industry demands compliance, but the tools available are either too complicated or outdated.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.map((prob, idx) => (
            <Card key={idx} className="bg-muted/20 border-border/50 hover:border-border transition-colors">
              <div className="h-10 w-10 bg-background border border-border rounded-lg flex items-center justify-center mb-4 text-foreground">
                <prob.icon size={20} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{prob.title}</h3>
              <p className="text-sm text-muted-foreground">{prob.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-muted-foreground italic">
            The trucking industry demands compliance, but the tools available are either too complicated, too expensive, or weren't built with carriers in mind. You need something better.
          </p>
        </div>
      </Container>
    </section>
  );
};

// --- Solution Overview Section ---
const SolutionOverview: React.FC = () => {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-muted-foreground mb-6">
            <Zap className="w-3 h-3 text-primary" />
            Introducing RaiseDash Shift
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">One Platform. Complete Compliance.</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            RaiseDash Shift is a comprehensive driver training and onboarding platform built specifically for trucking carriers. Train new hires on company policies, safety procedures, and compliance requirements — then certify their completion with verifiable, audit-ready documentation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="bg-background text-center">
            <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">For Safety Managers</h3>
            <p className="text-sm text-muted-foreground">
              Stop chasing paperwork. See exactly who needs training, who's in progress, and who's certified — all in one dashboard.
            </p>
          </Card>
          <Card className="bg-background text-center">
            <Truck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">For Fleet Owners</h3>
            <p className="text-sm text-muted-foreground">
              Reduce compliance risk, lower CSA scores, and protect your operating authority with documented training programs.
            </p>
          </Card>
          <Card className="bg-background text-center">
            <User className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">For Drivers</h3>
            <p className="text-sm text-muted-foreground">
              Complete training on your phone, on your schedule. No confusing interfaces. No wasted time.
            </p>
          </Card>
        </div>

        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-sm text-muted-foreground italic border-l-4 border-primary pl-4 py-2">
            "Simplicity is the ultimate sophistication" — We designed RaiseDash Shift with this principle at its core. Modern technology that works for everyone, even drivers who aren't tech-savvy.
          </p>
        </div>
      </Container>
    </section>
  );
};

// --- Compliance & Regulatory Context Section ---
const ComplianceSection: React.FC = () => {
  return (
    <section className="py-24 bg-background border-y border-border">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Why Driver Training Isn't Optional</h2>
            <p className="text-lg text-muted-foreground">
              Federal regulations require carriers to maintain documented safety training programs.
            </p>
          </div>

          <div className="space-y-12">
            {/* FMCSA Requirements */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  FMCSA Training Requirements
                </h3>
                <p className="text-muted-foreground mb-4">
                  During DOT audits and compliance reviews, inspectors look for evidence that drivers have been properly trained and that training is documented.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Drivers trained on company safety policies and procedures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Training documented with the five W's: what, when, where, who, and why</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Drivers understand Federal Motor Carrier Safety Regulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Training records are accessible and organized</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  CSA Scores & Business Impact
                </h3>
                <p className="text-muted-foreground mb-4">
                  FMCSA's Compliance, Safety, Accountability (CSA) program tracks carrier safety performance. High CSA scores (above 65%) can trigger:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Increased insurance premiums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Lost shipper/broker relationships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Out-of-service orders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Civil penalties (average $5,000+ per case)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Operating authority revocation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Entry-Level Driver Training */}
            <Card className="bg-muted/20">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Entry-Level Driver Training (ELDT)
              </h3>
              <p className="text-sm text-muted-foreground">
                Since February 2022, all first-time CDL applicants must complete ELDT from a registered training provider. This includes theory training and behind-the-wheel instruction. Drivers cannot take their CDL skills test until FMCSA has a certificate of completion on file.
              </p>
            </Card>

            {/* State Requirements */}
            <Card className="bg-muted/20">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                State-Specific Requirements
              </h3>
              <p className="text-sm text-muted-foreground">
                Sexual harassment prevention training is mandatory in California, Connecticut, Delaware, Illinois, Maine, and New York for private employers. Documented training provides legal protection in harassment claims.
              </p>
            </Card>

            {/* Bottom Line */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
              <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">The Bottom Line</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Compliance isn't just about avoiding fines — it's about protecting your business, your drivers, and everyone on the road. Proper documentation is your best defense in audits and litigation.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

// --- Product Modules Section ---
const ProductModules: React.FC = () => {
  return (
    <section className="py-24 bg-muted/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Specialized Training Solutions</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose from our specialized training programs designed for specific carrier needs and compliance requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {PRODUCT_MODULES.map((module, idx) => (
            <Card key={idx} className="bg-background hover:shadow-cal-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                <p className="text-sm text-primary font-medium">{module.headline}</p>
              </div>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {module.description}
              </p>
              <div className="space-y-2">
                {module.benefits.map((benefit, bidx) => (
                  <div key={bidx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

// --- Value Propositions Section ---
const ValuePropositions: React.FC = () => {
  return (
    <section className="py-24 bg-background border-y border-border">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Why Carriers Choose RaiseDash Shift</h2>
          <p className="text-lg text-muted-foreground">
            Built different. Built better. Built for trucking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {VALUE_PROPS.map((prop, idx) => (
            <div key={idx} className="group">
              <div className="bg-card border border-border rounded-lg p-5 h-full hover:border-primary/30 hover:shadow-cal-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/10 transition-colors">
                  <prop.icon size={20} />
                </div>
                <h3 className="font-semibold mb-1 text-sm">{prop.title}</h3>
                <p className="text-xs text-primary mb-3">{prop.tagline}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {prop.description}
                </p>
              </div>
            </div>
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
    // Simulate progress
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
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            A seamless experience for your office team and your drivers on the road.
          </p>
        </div>

        {/* Role Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-secondary/50 p-1 rounded-lg inline-flex border border-border">
            <button
              onClick={() => setActiveRole("manager")}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeRole === "manager"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Shield size={16} />
              For Safety Managers
            </button>
            <button
              onClick={() => setActiveRole("driver")}
              className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeRole === "driver"
                  ? "bg-background text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User size={16} />
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
                  className="space-y-8"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Set Up Program</h3>
                      <p className="text-muted-foreground">Choose from pre-built DOT compliance courses or build your own custom modules.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Invite Drivers</h3>
                      <p className="text-muted-foreground">Add drivers individually or in bulk. They receive a secure link instantly via email or SMS.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Track Compliance</h3>
                      <p className="text-muted-foreground">Watch real-time progress. Certificates are auto-generated and stored for audits.</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="driver-steps"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Click the Link</h3>
                      <p className="text-muted-foreground">No app to download. Just click the secure link sent to your phone or tablet.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center font-bold text-sm">2</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Watch & Learn</h3>
                      <p className="text-muted-foreground">Complete short video modules and simple quizzes on your schedule.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground border border-border flex items-center justify-center font-bold text-sm">3</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Get Certified</h3>
                      <p className="text-muted-foreground">Pass the quiz and receive your digital certificate instantly.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Simulated Interface */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-50 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
            <Card withAccents className="bg-background shadow-xl h-full min-h-[400px]">
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
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <h4 className="font-semibold">Driver Status</h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Audit Ready</span>
                    </div>
                    {[
                      { name: "Michael Scott", status: "Completed", course: "Hours of Service", time: "2m ago" },
                      { name: "Jim Halpert", status: "In Progress", course: "Defensive Driving", time: "15m ago" },
                      { name: "Dwight Schrute", status: "Completed", course: "HazMat Basics", time: "1h ago" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                         <div className="flex gap-3">
                           <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">{row.name.charAt(0)}</div>
                           <div>
                             <p className="text-sm font-medium">{row.name}</p>
                             <p className="text-xs text-muted-foreground">{row.course}</p>
                           </div>
                         </div>
                         <div className="text-right">
                           <p className={`text-xs font-medium ${row.status === "Completed" ? "text-green-600" : "text-blue-600"}`}>{row.status}</p>
                           <p className="text-[10px] text-muted-foreground">{row.time}</p>
                         </div>
                      </div>
                    ))}
                    <div className="pt-2">
                       <button
                        className={`w-full h-10 px-4 text-sm rounded-md font-medium transition-all duration-300 ${
                          reportState === "done"
                            ? "bg-primary text-primary-foreground shadow-cal-sm"
                            : "border border-border bg-background hover:bg-muted/60"
                        } ${reportState === "generating" || reportState === "done" ? "opacity-50 pointer-events-none" : ""}`}
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
                        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-2">
                           <Smartphone className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">Welcome, Alex</h4>
                          <p className="text-sm text-muted-foreground">You have 1 assigned training.</p>
                        </div>

                        <div className="w-full bg-muted/30 p-4 rounded-lg border border-border text-left">
                           <div className="flex justify-between items-start mb-2">
                             <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">Due Today</span>
                             <span className="text-xs text-muted-foreground">15 min</span>
                           </div>
                           <h5 className="font-medium mb-1">Winter Driving Safety</h5>
                           <div className="w-full bg-gray-200 h-1.5 rounded-full mb-4">
                             <div className="bg-primary h-1.5 rounded-full w-0"></div>
                           </div>
                           <button
                             className="w-full h-8 px-3 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                             onClick={handleStartTraining}
                           >
                             <PlayCircle size={14} /> Start Training
                           </button>
                        </div>
                      </div>
                    )}

                    {trainingState === "playing" && (
                      <div className="flex flex-col items-center justify-center space-y-4 py-4 h-full">
                        <div className="w-full aspect-video bg-black/90 rounded-md flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-white animate-spin" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                             <motion.div
                                className="h-full bg-red-600"
                                style={{ width: `${progress}%` }}
                             />
                          </div>
                        </div>
                        <p className="text-sm font-medium">Playing: Module 1 of 3</p>
                      </div>
                    )}

                    {trainingState === "completed" && (
                      <div className="flex flex-col items-center justify-center space-y-6 py-4 h-full">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
                        >
                           <Check className="w-10 h-10 text-green-600" />
                        </motion.div>
                        <div className="text-center">
                           <h4 className="font-bold text-xl mb-2">Training Complete!</h4>
                           <p className="text-muted-foreground">Your certificate has been generated.</p>
                        </div>
                        <button
                          className="h-8 px-3 text-xs rounded-md border border-border bg-background hover:bg-muted/60 transition-colors flex items-center gap-2"
                          onClick={resetTraining}
                        >
                           <Download size={14} /> Download Certificate
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
  return (
    <section id="features" className="py-24 bg-muted/30">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Everything You Need for Fleet Compliance</h2>
          <p className="text-lg text-muted-foreground">
            From entry-level driver training to ongoing safety education — manage your entire program from a single, intuitive platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <Card key={idx} className="bg-background hover:shadow-cal-md transition-shadow duration-300">
              <div className="h-12 w-12 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

// --- FAQ Component ---
const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-background border-t border-border">
      <Container className="max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">
            Everything you need to know about getting started.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={`border border-border rounded-lg bg-card transition-all duration-200 ${openIndex === index ? "shadow-cal-sm" : ""}`}
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${openIndex === index ? "transform rotate-180" : ""}`}
                />
              </button>
              <div
                className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

// --- CTA Component ---
const CTA: React.FC = () => {
  return (
    <>
      <Container className="border-t border-border mt-20 pt-20" />
      <Container className="bg-card border border-border rounded-lg p-12 md:p-16 text-center relative overflow-hidden shadow-sm mb-20 ui-corner-accents">
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6 tracking-tight">
            Ready to Transform Your Driver Training?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            See how RaiseDash Shift can streamline your compliance and get drivers trained faster. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/request-demo">
              <Button size="lg" className="w-full sm:w-auto">
                Request Your Free Demo
              </Button>
            </Link>
            <Link href="/request-demo">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Talk to Sales
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Free 14-day trial included • 24/7 Support • Setup in 24 hours
          </p>
        </div>
      </Container>
    </>
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
      <Head>
        <title>Raisedash Shift | Driver Training & Certification</title>
        <meta name="description" content="Modern driver training platform for trucking fleets. Train, certify, and track driver compliance—all in one place." />
      </Head>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/15 selection:text-primary">
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
