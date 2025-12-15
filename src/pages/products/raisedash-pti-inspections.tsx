import Head from "next/head";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CheckCircle,
  Shield,
  Wrench,
  Scale,
  ShieldCheck,
  Camera,
  Video,
  Clock,
  Smartphone,
  LayoutGrid,
  Users,
  Truck,
  BarChart3,
  Filter,
  FileCheck,
  ChevronDown,
  ArrowRight,
  Play,
} from "lucide-react";

const useStartupReveal = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) {
      setReady(true);
      return;
    }

    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return ready;
};

const MinimalReveal: React.FC<{ ready: boolean; delay?: number; className?: string; children: React.ReactNode }> = ({
  ready,
  delay = 0,
  className = "",
  children,
}) => (
  <div
    className={className}
    style={{
      opacity: ready ? 1 : 0,
      transform: ready ? "translateY(0px)" : "translateY(12px)",
      transition: "opacity 260ms ease, transform 320ms ease",
      transitionDelay: `${delay}ms`,
      willChange: "opacity, transform",
    }}
  >
    {children}
  </div>
);

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
> = ({ children, variant = "primary", size = "md", className = "", ...props }) => {
  const baseStyles =
    "font-mono tracking-tight inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md";
  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold border border-transparent shadow-cal-md",
    secondary: "bg-white text-foreground hover:bg-muted border border-border shadow-cal-sm",
    outline: "bg-transparent text-foreground border border-border hover:bg-muted",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/60",
  };
  const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({
  children,
  className = "",
  id,
}) => (
  <section id={id} className={`py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const Navbar: React.FC<{ ready: boolean }> = ({ ready }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled ? "bg-white/90 backdrop-blur-md border-border shadow-cal-sm py-4" : "bg-background/60 border-transparent py-6"
      }`}
      style={{
        opacity: ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(-6px)",
        transition: "opacity 200ms ease, transform 260ms ease",
        willChange: "opacity, transform",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-foreground">Raisedash PTI Inspections</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://cal.com/javokhir/raisedash-demo-meeting" target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="hidden sm:inline-flex">
              Book a Demo
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ ready: boolean }> = ({ ready }) => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 grid-bg pointer-events-none z-0"></div>
    <Section className="relative z-10 pt-32 pb-16">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        <MinimalReveal ready={ready}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            Toward <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Safer Rides</span>
          </h1>
        </MinimalReveal>
        <MinimalReveal ready={ready} delay={80}>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            RaiseDash simplifies your Driver Vehicle Inspection Report (DVIR) and Pre-Trip inspections (PTIs) with easy-to-use digital tools. Fleet managers benefit from a centralized dashboard for real-time insights into all PTIs, while our mobile app simplifies inspections for drivers.
          </p>
        </MinimalReveal>
        <MinimalReveal ready={ready} delay={140}>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="https://cal.com/javokhir/raisedash-demo-meeting" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Book A Demo <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="https://www.youtube.com/watch?v=Vjem0ZQtGQc" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                <Play className="w-4 h-4" /> Take A Video Tour
              </Button>
            </a>
          </div>
        </MinimalReveal>
      </div>
      <MinimalReveal ready={ready} delay={220} className="w-full">
        <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-cal-lg">
          <Image
            src="https://pti.raisedash.com/wp-content/uploads/2024/06/screenshot-dashboard.png"
            alt="RaiseDash PTI Dashboard"
            width={1440}
            height={1276}
            className="w-full h-auto"
            priority
          />
        </div>
      </MinimalReveal>
    </Section>
  </div>
);

const UIShowcase: React.FC<{ ready: boolean }> = ({ ready }) => (
  <Section className="border-t border-border bg-white">
    <div className="grid md:grid-cols-3 gap-8">
      <MinimalReveal ready={ready} className="space-y-6">
        <div className="aspect-square relative w-full overflow-hidden rounded-lg border border-border">
          <Image
            src="https://pti.raisedash.com/wp-content/uploads/2024/06/screenshot-dashboard.png"
            alt="Fleet Manager UI"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Fleet Manager UI</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            One dashboard for your whole fleet. Effortlessly monitor and manage all PTIs with RaiseDash's centralized dashboard, providing real-time insights and comprehensive oversight for your entire fleet.
          </p>
          <a href="#features" className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium">
            See Awesome Features <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </MinimalReveal>

      <MinimalReveal ready={ready} delay={80} className="space-y-6">
        <div className="aspect-square relative w-full overflow-hidden rounded-lg border border-border">
          <Image
            src="https://pti.raisedash.com/wp-content/uploads/2024/06/safety-operator.png"
            alt="Safety Manager UI"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Safety Manager UI</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Tailor your inspection process with RaiseDash's customizable checklists, allowing fleet managers to set specific requirements and ensure thorough inspections, including the ability to mandate photos or videos for particular checklist items.
          </p>
          <a href="#features" className="text-primary hover:underline inline-flex items-center gap-1 text-sm font-medium">
            Find Out More <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </MinimalReveal>

      <MinimalReveal ready={ready} delay={160} className="space-y-6">
        <div className="aspect-square relative w-full overflow-hidden rounded-lg border border-border">
          <Image
            src="https://pti.raisedash.com/wp-content/uploads/2024/06/app-ui.png"
            alt="Driver App UI"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-3">Driver App UI</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Go paperless with intuitive mobile app to streamline the PTI process. Perform inspections easily on the go with the RaiseDash mobile app, ensuring safety and compliance with just a few taps.
          </p>
          <div className="flex gap-3">
            <a href="https://apps.apple.com/us/app/raisedash/id6466733418" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline">App Store</Button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=uz.jdsystems.checklist.checklist" target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline">Google Play</Button>
            </a>
          </div>
        </div>
      </MinimalReveal>
    </div>
  </Section>
);

const WhyRaisedash: React.FC<{ ready: boolean }> = ({ ready }) => (
  <Section className="border-t border-border">
    <MinimalReveal ready={ready} className="mb-16 text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">Why RaiseDash?</h2>
    </MinimalReveal>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          icon: Shield,
          title: "Safety First",
          desc: "PTIs are a critical safety net, uncovering potentially dangerous conditions before they lead to disaster. RaiseDash helps to ensure thorough, consistent inspections to keep your fleet safe.",
        },
        {
          icon: Wrench,
          title: "Maintenance Savvy",
          desc: "Proactive PTIs catch minor issues before they escalate into major problems. With RaiseDash, drivers can prevent breakdowns and reduce repair costs, keeping your fleet on the road and running smoothly.",
        },
        {
          icon: Scale,
          title: "FMCSA Compliance",
          desc: "DVIR ensures all truck parts are in working condition, helping companies stay compliant with FMCSA regulations. RaiseDash simplifies compliance with digital PTIs, offering easier audit trails, secure storage, and quick retrieval of records.",
        },
        {
          icon: ShieldCheck,
          title: "Liability Shield",
          desc: "Accidents can happen despite the best precautions. DVIRs serve as evidence that the vehicle passed inspection and the company followed regulations. With RaiseDash, you have legal protection against negligence claims.",
        },
      ].map((item, idx) => (
        <MinimalReveal key={idx} ready={ready} delay={idx * 60} className="h-full">
          <div className="bg-card p-6 rounded-lg border border-border hover:border-primary/30 transition-colors h-full shadow-cal-sm">
            <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center mb-4">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-foreground font-semibold mb-2 text-lg">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        </MinimalReveal>
      ))}
    </div>
  </Section>
);

const Features: React.FC<{ ready: boolean }> = ({ ready }) => (
  <Section id="features" className="border-t border-border bg-white">
    <MinimalReveal ready={ready} className="mb-16 text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">Comprehensive Features</h2>
      <p className="text-muted-foreground">
        Built with modern technology to provide comprehensive fleet management and inspection tools
      </p>
    </MinimalReveal>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 border border-border/70 rounded-lg overflow-hidden">
      {[
        { title: "Photo-Based DVIR Inspections", desc: "Allow drivers to precisely document any defects with high-quality photos, improving the precision of DVIR inspections.", icon: Camera },
        { title: "Video Inspections", desc: "Video-based inspections with audio save time for drivers and offer more precise live footage of the fleet.", icon: Video },
        { title: "Inspection Overview Graph", desc: "Visual display of all inspections using different colors to distinguish between successful inspections and those with defects.", icon: BarChart3 },
        { title: "Advanced Filters", desc: "Different filters allow you to find specific inspections and analyze your company's inspection trends efficiently.", icon: Filter },
        { title: "Fleet Management", desc: "Manage your fleet from the same dashboard with auto-generated data when you enter the VIN number.", icon: Truck },
        { title: "Driver Management", desc: "Efficiently manage your drivers from a single dashboard, keeping track of their performance, inspections, and compliance.", icon: Users },
        { title: "Customizable Checklists", desc: "Tailor your inspection protocols with fully customizable checklists that align with your company's standards.", icon: FileCheck },
        { title: "Mobile Apps", desc: "User-friendly mobile apps for both Android and iOS, designed for ease of use and quick inspections on the go.", icon: Smartphone },
        { title: "Real-time Updates", desc: "Get instant notifications and updates about inspections through integrated communication tools like Telegram and WhatsApp.", icon: Clock },
      ].map((f, idx) => (
        <MinimalReveal key={idx} ready={ready} delay={idx * 40} className="h-full">
          <div className="bg-card p-8 hover:bg-muted/60 transition-colors group h-full">
            <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center mb-6 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
              <f.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        </MinimalReveal>
      ))}
    </div>
  </Section>
);

const FAQ: React.FC<{ ready: boolean }> = ({ ready }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do drivers submit inspections?",
      answer: "Drivers can easily submit inspections using our mobile app, available for both Android and iOS devices. The app features a straightforward interface designed for quick and hassle-free usage.",
    },
    {
      question: "What's the difference between a checklist inspection and a video inspection?",
      answer: "The key difference lies in the method of performing the inspection. A checklist inspection mirrors the traditional DVIR format with checkboxes and allows drivers to attach photos of any vehicle issues. On the other hand, a video inspection is a quicker and more convenient option, requiring drivers to simply record a video around the vehicle.",
    },
    {
      question: "Can I customize the inspection checklist questions?",
      answer: "Yes, the inspection questions are fully customizable. You can tailor the inspection checklist to include your own questions. Additionally, RaiseDash offers a default checklist that aligns with the standard DVIR questions.",
    },
  ];

  return (
    <Section className="border-t border-border">
      <MinimalReveal ready={ready} className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">Frequently Asked Questions</h2>
      </MinimalReveal>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <MinimalReveal key={idx} ready={ready} delay={idx * 60}>
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-cal-sm">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-muted/60 transition-colors"
              >
                <h3 className="text-foreground font-medium pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          </MinimalReveal>
        ))}
      </div>
    </Section>
  );
};

const Pricing: React.FC<{ ready: boolean }> = ({ ready }) => (
  <Section className="border-t border-border bg-white">
    <MinimalReveal ready={ready} className="mb-16 text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-foreground tracking-tight mb-4">Simple, Transparent Pricing</h2>
      <p className="text-muted-foreground">Choose the plan that works best for your fleet</p>
    </MinimalReveal>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <MinimalReveal ready={ready} delay={60}>
        <div className="bg-card border border-border rounded-lg p-8 shadow-cal-sm hover:shadow-cal-lg transition-shadow h-full flex flex-col">
          <h3 className="text-xl font-bold text-foreground mb-2">Basic</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold text-foreground">$0</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Ideal for exploring essential features and experiencing the platform at no cost. Perfect for those just getting started.
          </p>
          <ul className="space-y-3 mb-8 flex-1">
            {["Video inspection", "Photo inspection", "Android & iOS support", "30 day inspection history retention", "8 inspections/month"].map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2">
            <a href="https://apps.apple.com/us/app/raisedash/id6466733418" target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="outline" className="w-full">App Store</Button>
            </a>
            <a href="https://play.google.com/store/apps/details?id=uz.jdsystems.checklist.checklist" target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="outline" className="w-full">Google Play</Button>
            </a>
          </div>
        </div>
      </MinimalReveal>

      <MinimalReveal ready={ready} delay={120}>
        <div className="bg-card border-2 border-primary rounded-lg p-8 shadow-cal-lg relative h-full flex flex-col">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold">
            POPULAR
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Plus</h3>
          <div className="mb-6">
            <span className="text-4xl font-bold text-foreground">$8</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Unlock the full potential of our platform with advanced features designed for enhanced functionality and productivity.
          </p>
          <ul className="space-y-3 mb-8 flex-1">
            {["Everything from Basic plan", "Priority support", "1 year inspection history retention", "Unlimited inspections", "Share inspection via link"].map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2">
            <a href="https://apps.apple.com/us/app/raisedash/id6466733418" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full">Get Started</Button>
            </a>
          </div>
        </div>
      </MinimalReveal>

      <MinimalReveal ready={ready} delay={180}>
        <div className="bg-card border border-border rounded-lg p-8 shadow-cal-sm hover:shadow-cal-lg transition-shadow h-full flex flex-col">
          <h3 className="text-xl font-bold text-foreground mb-2">Enterprise</h3>
          <div className="mb-6">
            <span className="text-lg text-muted-foreground">Pay-as-You-Go</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            You only pay for what you use. You pay monthly based on the number of PTI inspections conducted.
          </p>
          <ul className="space-y-3 mb-8 flex-1">
            {[
              "Everything from Plus plan",
              "Advanced Web dashboard",
              "Customizable inspection checklists",
              "Access for Fleet & Safety managers",
              "Analytics",
              "3rd party messenger integration",
              "Top priority support",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <a href="https://app.raisedash.com/auth/register" target="_blank" rel="noopener noreferrer" className="block">
            <Button className="w-full">Get Started Today</Button>
          </a>
          <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground space-y-2">
            <div>$1.40/inspection for first 150</div>
            <div>$1.30/inspection for next 151-300</div>
            <div>$1.10/inspection for next 301-900</div>
            <div>$0.75/inspection for over 900</div>
          </div>
        </div>
      </MinimalReveal>
    </div>
  </Section>
);

const CTA: React.FC<{ ready: boolean }> = ({ ready }) => (
  <Section className="border-t border-border">
    <MinimalReveal ready={ready} className="text-center">
      <h2 className="text-3xl font-bold text-foreground mb-6">Want To Learn More About RaiseDash?</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        Get in touch to schedule a demo and discover how RaiseDash can enhance your fleet's safety and efficiency!
      </p>
      <a href="https://cal.com/javokhir/raisedash-demo-meeting" target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="px-8">
          Book A Demo
        </Button>
      </a>
    </MinimalReveal>
  </Section>
);

const Footer: React.FC = () => (
  <footer className="border-t border-border bg-white py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} RaiseDash PTI Inspections. All rights reserved.</div>
      <div className="flex gap-6 text-sm">
        <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms-of-use" className="text-muted-foreground hover:text-foreground transition-colors">
          Terms of Use
        </Link>
      </div>
    </div>
  </footer>
);

const RaisedashPTIPage: NextPage = () => {
  const startupReady = useStartupReveal();

  useEffect(() => {
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
        <title>Raisedash PTI Inspections | Digitize DVIR & Pre-Trip Inspections</title>
        <meta
          name="description"
          content="RaiseDash simplifies your DVIR and Pre-Trip inspections with easy-to-use digital tools. Enhance your compliance and efficiency. Try it now!"
        />
      </Head>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/15 selection:text-primary">
        <Navbar ready={startupReady} />
        <main>
          <Hero ready={startupReady} />
          <UIShowcase ready={startupReady} />
          <WhyRaisedash ready={startupReady} />
          <Features ready={startupReady} />
          <Pricing ready={startupReady} />
          <FAQ ready={startupReady} />
          <CTA ready={startupReady} />
        </main>
        <Footer />
      </div>
      <style jsx global>{`
        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
        }
      `}</style>
    </>
  );
};

export default RaisedashPTIPage;
