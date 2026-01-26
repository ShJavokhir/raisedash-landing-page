import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { FAQPageJsonLd, SEO, SoftwareApplicationJsonLd } from "@/components/seo/SEO";
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
  Users,
  Truck,
  BarChart3,
  Filter,
  FileCheck,
  ChevronDown,
  ArrowRight,
  Play,
  X as XIcon,
} from "lucide-react";

// --- Styles ---
// Utilizing global animations from globals.css: animate-fade-in-up, animate-fade-in-scale, etc.

// Local Navbar removed in favor of global Header

// --- Lightbox Component ---

const Lightbox: React.FC<{ isOpen: boolean; onClose: () => void; imageSrc: string | null }> = ({
  isOpen,
  onClose,
  imageSrc,
}) => {
  useEffect(() => {
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
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[101] rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
      >
        <XIcon className="h-8 w-8" />
      </button>
      <Image
        src={imageSrc}
        alt="RaiseDash PTI inspection screenshot expanded view"
        width={2560}
        height={1440}
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in-scale h-auto max-h-[95vh] w-auto max-w-[95vw] cursor-default rounded-xs object-contain shadow-2xl"
      />
    </div>
  );
};

// --- Page Sections ---

const Hero: React.FC = () => (
  <div className="bg-background dark:bg-secondary relative overflow-hidden">
    <div
      className="absolute inset-0 z-0 opacity-[0.3]"
      style={{
        backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    ></div>

    <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-24">
      <Container className="flex flex-col items-center text-center">
        <div className="animate-fade-in-up bg-card border-border text-muted-foreground mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-normal delay-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          The Modern Standard for DVIR
        </div>

        <h1 className="animate-fade-in-up text-foreground mb-6 max-w-4xl text-[48px] font-normal tracking-[-0.03em] delay-100 md:text-7xl">
          Toward{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            Safer Rides
          </span>
        </h1>

        <p className="animate-fade-in-up text-muted-foreground mx-auto mb-10 max-w-2xl text-xl leading-relaxed font-light delay-200">
          RaiseDash simplifies your Driver Vehicle Inspection Report (DVIR) and Pre-Trip inspections
          (PTIs) with easy-to-use digital tools. Fleet managers benefit from a centralized dashboard
          for real-time insights into all PTIs, while our mobile app simplifies inspections for
          drivers.
        </p>

        <div className="animate-fade-in-up flex w-full flex-col justify-center gap-4 delay-300 sm:w-auto sm:flex-row">
          <a
            href="https://cal.com/javokhir/raisedash-demo-meeting"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="hover:bg-foreground w-full rounded-xs bg-[#1F1E1E] text-white sm:w-auto"
            >
              Book A Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a
            href="https://www.youtube.com/watch?v=Vjem0ZQtGQc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              size="lg"
              className="border-border text-foreground hover:bg-surface-3 w-full gap-2 rounded-xs bg-white sm:w-auto"
            >
              <Play className="h-4 w-4" /> Take A Video Tour
            </Button>
          </a>
        </div>

        <div className="animate-fade-in-up relative z-10 mt-16 flex w-full justify-center delay-500 md:mt-24">
          <div className="border-border relative aspect-video w-full max-w-5xl overflow-hidden rounded-xs border bg-black shadow-2xl">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Vjem0ZQtGQc?rel=0"
              title="RaiseDash PTI Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
              allowFullScreen
              className="h-full w-full"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  </div>
);

const FeatureShowcase: React.FC<{
  title: string;
  description: string;
  image: string;
  align?: "left" | "right";
  linkText: string;
  linkHref?: string;
  buttons?: Array<{ text: string; href: string; variant?: "primary" | "secondary" | "ghost" }>;
  onImageClick?: (src: string) => void;
}> = ({ title, description, image, align = "left", linkText, linkHref, buttons, onImageClick }) => (
  <div className="grid items-center gap-12 py-12 md:grid-cols-2 md:py-20">
    <div className={`order-2 ${align === "right" ? "md:order-1" : "md:order-2"}`}>
      <div
        className="border-border bg-background dark:bg-secondary animate-fade-in-scale group relative cursor-pointer overflow-hidden rounded-xs border"
        onClick={() => onImageClick && onImageClick(image)}
      >
        <Image
          src={image}
          alt={`RaiseDash ${title} - fleet DVIR and pre-trip inspection software interface`}
          width={800}
          height={800}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors group-hover:bg-black/10 group-hover:opacity-100">
          <span className="text-foreground rounded-full bg-white/80 px-3 py-1 text-xs font-normal shadow-sm backdrop-blur-md dark:bg-white/80">
            Click to Zoom
          </span>
        </div>
      </div>
    </div>
    <div className={`order-1 ${align === "right" ? "md:order-2" : "md:order-1"}`}>
      <div className="animate-fade-in-up">
        <h3 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em]">{title}</h3>
        <p className="text-muted-foreground mb-8 text-lg leading-relaxed font-light">
          {description}
        </p>

        {buttons ? (
          <div className="flex gap-3">
            {buttons.map((btn, i) => (
              <a key={i} href={btn.href} target="_blank" rel="noopener noreferrer">
                <Button variant={btn.variant || "secondary"} className="rounded-xs">
                  {btn.text}
                </Button>
              </a>
            ))}
          </div>
        ) : (
          <a
            href={linkHref || "#"}
            className="inline-flex items-center font-normal text-[#19224A] transition-all hover:underline"
          >
            {linkText} <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  </div>
);

const UIShowcase: React.FC<{ onImageClick: (src: string) => void }> = ({ onImageClick }) => (
  <Container className="border-border mt-12 border-t pt-12">
    <FeatureShowcase
      title="Fleet Manager UI"
      description="One dashboard for your whole fleet. Effortlessly monitor and manage all PTIs with RaiseDash's centralized dashboard, providing real-time insights and comprehensive oversight for your entire fleet."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/screenshot-dashboard.png"
      linkText="See Awesome Features"
      linkHref="/products/raisedash-pti-inspections/fleet-safety-managers"
      onImageClick={onImageClick}
    />
    <FeatureShowcase
      align="right"
      title="Safety Manager UI"
      description="Tailor your inspection process with RaiseDash's customizable checklists, allowing fleet managers to set specific requirements and ensure thorough inspections, including the ability to mandate photos or videos for particular checklist items."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/safety-operator.png"
      linkText="Find Out More"
      linkHref="/products/raisedash-pti-inspections/fleet-safety-managers"
      onImageClick={onImageClick}
    />
    <FeatureShowcase
      title="Driver App UI"
      description="Go paperless with intuitive mobile app to streamline the PTI process. Perform inspections easily on the go with the RaiseDash mobile app, ensuring safety and compliance with just a few taps."
      image="https://pti.raisedash.com/wp-content/uploads/2024/06/app-ui.png"
      linkText="Explore Driver Features"
      linkHref="/products/raisedash-pti-inspections/driver-features"
      onImageClick={onImageClick}
    />
  </Container>
);

const WhyRaisedash: React.FC = () => (
  <Container className="border-border mt-20 border-t pt-20">
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em]">
        Why RaiseDash?
      </h2>
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        <div
          key={idx}
          className="bg-card border-border animate-fade-in-scale h-full rounded-xs border p-8 transition-all duration-[0.15s] hover:-translate-y-1 hover:shadow-lg"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          <div className="bg-surface-3 dark:bg-secondary mb-4 flex h-10 w-10 items-center justify-center rounded-xs">
            <item.icon className="dark:text-primary h-5 w-5 text-[#19224A]" />
          </div>
          <h3 className="text-foreground mb-2 text-lg font-normal">{item.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.desc}</p>
        </div>
      ))}
    </div>
  </Container>
);

const Features: React.FC = () => (
  <Container id="features" className="border-border mt-20 border-t pt-20">
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em]">
        Comprehensive Features
      </h2>
      <p className="text-muted-foreground text-lg font-light">
        Built with modern technology to provide comprehensive fleet management and inspection tools
      </p>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          title: "Photo-Based DVIR Inspections",
          desc: "Allow drivers to precisely document any defects with high-quality photos, improving the precision of DVIR inspections.",
          icon: Camera,
        },
        {
          title: "Video Inspections",
          desc: "Video-based inspections with audio save time for drivers and offer more precise live footage of the fleet.",
          icon: Video,
        },
        {
          title: "Inspection Overview Graph",
          desc: "Visual display of all inspections using different colors to distinguish between successful inspections and those with defects.",
          icon: BarChart3,
        },
        {
          title: "Advanced Filters",
          desc: "Different filters allow you to find specific inspections and analyze your company's inspection trends efficiently.",
          icon: Filter,
        },
        {
          title: "Fleet Management",
          desc: "Manage your fleet from the same dashboard with auto-generated data when you enter the VIN number.",
          icon: Truck,
        },
        {
          title: "Driver Management",
          desc: "Efficiently manage your drivers from a single dashboard, keeping track of their performance, inspections, and compliance.",
          icon: Users,
        },
        {
          title: "Customizable Checklists",
          desc: "Tailor your inspection protocols with fully customizable checklists that align with your company's standards.",
          icon: FileCheck,
        },
        {
          title: "Mobile Apps",
          desc: "User-friendly mobile apps for both Android and iOS, designed for ease of use and quick inspections on the go.",
          icon: Smartphone,
        },
        {
          title: "Real-time Updates",
          desc: "Get instant notifications and updates about inspections through integrated communication tools like Telegram and WhatsApp.",
          icon: Clock,
        },
      ].map((f, idx) => (
        <div
          key={idx}
          className="group bg-card border-border animate-fade-in-scale h-full rounded-xs border p-8 transition-all duration-[0.15s] hover:-translate-y-1 hover:shadow-lg"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <div className="bg-surface-3 dark:bg-secondary mb-4 flex h-10 w-10 items-center justify-center rounded-xs transition-colors duration-[0.15s] group-hover:bg-[#19224A]/10">
            <f.icon className="text-muted-foreground dark:group-hover:text-foreground h-5 w-5 transition-colors duration-[0.15s] group-hover:text-[#19224A]" />
          </div>
          <h3 className="text-foreground mb-2 text-lg font-normal">{f.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed font-light">{f.desc}</p>
        </div>
      ))}
    </div>
  </Container>
);

const PricingCard: React.FC<{
  plan: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  isPopular?: boolean;
  extraInfo?: React.ReactNode;
}> = ({
  plan,
  price,
  period,
  description,
  features,
  cta,
  ctaLink,
  isPopular = false,
  extraInfo,
}) => (
  <div
    className={`flex flex-col rounded-xs border p-8 ${isPopular ? "bg-card relative border-[#19224A] ring-1 ring-[#19224A]" : "bg-card border-border"} animate-fade-in-up h-full transition-all duration-[0.15s] hover:-translate-y-1 hover:shadow-lg`}
  >
    {isPopular && (
      <div className="absolute top-0 right-0 rounded-tr-xs rounded-bl-xs bg-[#19224A] px-3 py-1 text-xs font-normal text-white">
        POPULAR
      </div>
    )}
    <div className="mb-6">
      <h3 className="text-foreground mb-2 text-lg font-normal">{plan}</h3>
      <div className="flex items-baseline gap-1">
        <span
          className={`text-foreground font-normal tracking-[-0.03em] ${price === "Pay-as-You-Go" ? "text-2xl" : "text-3xl"}`}
        >
          {price}
        </span>
        {period && <span className="text-muted-foreground text-sm">{period}</span>}
      </div>
      <p className="text-muted-foreground mt-3 text-sm font-light">{description}</p>
    </div>
    <ul className="mb-8 flex-1 space-y-3">
      {features.map((feat, i) => (
        <li key={i} className="text-muted-foreground flex items-start gap-2 text-sm">
          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
          <span>{feat}</span>
        </li>
      ))}
    </ul>
    <a href={ctaLink} target="_blank" rel="noopener noreferrer" className="mt-auto">
      <Button
        variant={isPopular ? "primary" : "secondary"}
        className={`w-full rounded-xs ${isPopular ? "hover:bg-foreground bg-[#1F1E1E] text-white" : "border-border text-foreground hover:bg-surface-3 bg-white"}`}
      >
        {cta}
      </Button>
    </a>
    {extraInfo && (
      <div className="border-border text-muted-foreground mt-6 space-y-2 border-t pt-6 text-xs">
        {extraInfo}
      </div>
    )}
  </div>
);

const Pricing: React.FC = () => (
  <Container id="pricing" className="border-border mt-20 border-t pt-20">
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="text-foreground mb-4 text-[28px] font-normal tracking-[-0.03em]">
        Simple, Transparent Pricing
      </h2>
      <p className="text-muted-foreground text-lg font-light">
        Choose the plan that works best for your fleet
      </p>
    </div>
    <div className="grid items-start gap-6 md:grid-cols-3">
      <PricingCard
        plan="Basic"
        price="$0"
        period="/month"
        description="Ideal for exploring essential features and experiencing the platform at no cost. Perfect for those just getting started."
        features={[
          "Video inspection",
          "Photo inspection",
          "Android & iOS support",
          "30 day inspection history retention",
          "8 inspections/month",
        ]}
        cta="App Store"
        ctaLink="https://apps.apple.com/us/app/raisedash/id6466733418"
      />
      <PricingCard
        plan="Plus"
        price="$8"
        period="/month"
        description="Unlock the full potential of our platform with advanced features designed for enhanced functionality and productivity."
        features={[
          "Everything from Basic plan",
          "Priority support",
          "1 year inspection history retention",
          "Unlimited inspections",
          "Share inspection via link",
        ]}
        cta="Get Started"
        ctaLink="https://apps.apple.com/us/app/raisedash/id6466733418"
        isPopular
      />
      <PricingCard
        plan="Enterprise"
        price="Pay-as-You-Go"
        description="You only pay for what you use. You pay monthly based on the number of PTI inspections conducted."
        features={[
          "Everything from Plus plan",
          "Advanced Web dashboard",
          "Customizable inspection checklists",
          "Access for Fleet & Safety managers",
          "Analytics",
          "3rd party messenger integration",
          "Top priority support",
        ]}
        cta="Get Started Today"
        ctaLink="https://app.raisedash.com/auth/register"
        extraInfo={
          <>
            <div>$1.40/inspection for first 150</div>
            <div>$1.30/inspection for next 151-300</div>
            <div>$1.10/inspection for next 301-900</div>
            <div>$0.75/inspection for over 900</div>
          </>
        }
      />
    </div>
  </Container>
);

const FAQ_ITEMS = [
  {
    question: "How do drivers submit inspections?",
    answer:
      "Drivers can easily submit inspections using our mobile app, available for both Android and iOS devices. The app features a straightforward interface designed for quick and hassle-free usage.",
  },
  {
    question: "What's the difference between a checklist inspection and a video inspection?",
    answer:
      "The key difference lies in the method of performing the inspection. A checklist inspection mirrors the traditional DVIR format with checkboxes and allows drivers to attach photos of any vehicle issues. On the other hand, a video inspection is a quicker and more convenient option, requiring drivers to simply record a video around the vehicle.",
  },
  {
    question: "Can I customize the inspection checklist questions?",
    answer:
      "Yes, the inspection questions are fully customizable. You can tailor the inspection checklist to include your own questions. Additionally, RaiseDash offers a default checklist that aligns with the standard DVIR questions.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Container className="border-border mt-20 border-t pt-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-[28px] font-normal tracking-[-0.03em]">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => (
            <div
              key={idx}
              className="border-border bg-card animate-fade-in-up overflow-hidden rounded-xs border transition-all duration-[0.15s] hover:shadow-lg"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="hover:bg-surface-3/50 dark:hover:bg-secondary flex w-full items-center justify-between p-6 text-left transition-colors duration-[0.15s]"
              >
                <span className="text-foreground pr-4 font-normal">{faq.question}</span>
                <ChevronDown
                  className={`text-muted-foreground h-5 w-5 flex-shrink-0 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="text-muted-foreground p-6 pt-0 leading-relaxed font-light">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

const CTA: React.FC = () => (
  <>
    <Container className="border-border mt-20 border-t pt-20" />
    <Container className="relative mb-20 overflow-hidden rounded-xs bg-[#19224A] p-12 text-center md:p-16">
      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="mb-6 text-[28px] font-normal tracking-[-0.03em] text-white md:text-4xl">
          Want To Learn More About RaiseDash?
        </h2>
        <p className="mb-10 text-lg font-light text-white/70">
          Get in touch to schedule a demo and discover how RaiseDash can enhance your fleet's safety
          and efficiency!
        </p>
        <div className="flex justify-center">
          <a
            href="https://cal.com/javokhir/raisedash-demo-meeting"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="rounded-xs bg-white px-8 text-[#19224A] hover:bg-white/90">
              Book A Demo
            </Button>
          </a>
        </div>
      </div>
    </Container>
  </>
);

// Local Footer removed in favor of global Footer component

// --- Main Page ---

const RaisedashPTIPage: NextPage = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="PTI Inspections | Digitize DVIR & Pre-Trip Inspections"
        description="RaiseDash simplifies your DVIR and Pre-Trip inspections with easy-to-use digital tools. Enhance fleet safety, ensure FMCSA compliance, and boost efficiency."
        keywords={[
          "DVIR software",
          "pre-trip inspection",
          "fleet inspection app",
          "FMCSA compliance",
          "driver vehicle inspection report",
          "fleet safety software",
          "PTI app",
        ]}
        ogType="product"
      />
      <SoftwareApplicationJsonLd
        name="Raisedash PTI Inspections"
        description="Digital DVIR and Pre-Trip inspection software for fleet management. Mobile apps for iOS and Android with real-time dashboard for fleet managers."
        operatingSystem={["iOS", "Android", "Web"]}
        applicationCategory="BusinessApplication"
        offers={[
          { price: "0", priceCurrency: "USD" },
          { price: "8", priceCurrency: "USD" },
        ]}
      />
      <FAQPageJsonLd faqs={FAQ_ITEMS} />

      <Lightbox
        isOpen={!!lightboxImage}
        imageSrc={lightboxImage}
        onClose={() => setLightboxImage(null)}
      />

      <div className="bg-background dark:bg-secondary text-foreground min-h-screen font-sans selection:bg-[#19224A]/15 selection:text-[#19224A]">
        <main>
          <Hero />
          <UIShowcase onImageClick={setLightboxImage} />
          <WhyRaisedash />
          <Features />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RaisedashPTIPage;
