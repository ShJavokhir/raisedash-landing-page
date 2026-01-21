import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Menu, X, MapPin, ClipboardCheck, GraduationCap, BookOpen, FileText, Building2, Users, Mail, LucideIcon } from "lucide-react";

interface Solution {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

const solutions: Solution[] = [

  {
    id: "onboarding",
    title: "Shift (Driver Onboarding)",
    description: "Streamlined driver training and compliance platform.",
    href: "/products/raisedash-shift",
    image: "https://cdn.raisedash.com/media/vertex/57c53ef5-ad1a-4508-89a5-329985846a89.webp",
    icon: GraduationCap,
  },
  {
    id: "pti",
    title: "PTI (PTI Inspections)",
    description: "Digital driver vehicle inspection reports and pre-trip tools.",
    href: "/products/raisedash-pti-inspections",
    image: "https://cdn.raisedash.com/media/vertex/5bbcc5ad-2b1c-4ddb-9fe6-e8e2bc2c8a1a.webp",
    icon: ClipboardCheck,
  },
  {
    id: "vertex",
    title: "Vertex (Freight Tracking)",
    description: "Real-time freight tracking with automated arrival alerts.",
    href: "/products/raisedash-vertex",
    image: "https://cdn.raisedash.com/media/vertex/834f7f4b-6def-4090-bc16-6de5c21ff18d.webp",
    icon: MapPin,
  }
];

const resources = [
  {
    title: "Blog",
    description: "Insights on logistics, safety, and industry trends.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "Changelogs",
    description: "Latest updates and product improvements.",
    href: "/changelogs",
    icon: FileText,
  },
];

const company = [
  {
    title: "About",
    description: "Our mission, vision, and the team behind Raisedash.",
    href: "/about",
    icon: Building2,
  },
  {
    title: "Careers",
    description: "Join our team and help shape the future of logistics.",
    href: "/careers",
    icon: Users,
  },
  {
    title: "Contact",
    description: "Get in touch with our sales and support teams.",
    href: "/contact",
    icon: Mail,
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [hoveredSolution, setHoveredSolution] = React.useState(solutions[0]);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  // Close mobile menu on Escape key and trap focus
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-4 md:top-6 z-50 w-full bg-transparent">
      <div className="">
        <Container className="rounded-xs border border-border bg-white dark:bg-card">
        <div className="h-[60px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-normal text-xl tracking-[-0.02em] text-foreground hover:text-foreground-80 transition-colors duration-[0.15s]">
              <Image src="/logo.webp" alt="Raisedash logo" width={28} height={28} />
              Raisedash
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-base font-normal text-foreground hover:text-foreground-80 px-4 py-2 transition-colors duration-[0.15s]">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex w-[540px]">
                      {/* Left column - Product list */}
                      <div className="w-[270px] p-1 space-y-0.5">
                        {solutions.map((solution) => {
                          const Icon = solution.icon;
                          return (
                            <Link
                              key={solution.id}
                              href={solution.href}
                              className={`flex items-start gap-3 rounded-xs p-3 transition-colors duration-[0.15s] hover:bg-surface-3 ${
                                hoveredSolution.id === solution.id ? "bg-surface-3" : ""
                              }`}
                              onMouseEnter={() => setHoveredSolution(solution)}
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border border-border bg-background">
                                <Icon className="h-5 w-5 text-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-normal text-foreground">{solution.title}</span>
                                  {solution.comingSoon && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-surface-3 text-muted-foreground font-normal">
                                      Soon
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                  {solution.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      {/* Right column - Image preview */}
                      <div className="w-[270px] p-2 border-l border-border">
                        <div className="relative h-full w-full rounded-xs overflow-hidden bg-surface-3">
                          <Image
                            src={hoveredSolution.image}
                            alt={hoveredSolution.title}
                            fill
                            className="object-cover dark:invert transition-opacity duration-[0.15s]"
                          />
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-base font-normal text-foreground hover:text-foreground-80 px-4 py-2 transition-colors duration-[0.15s]">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[300px] p-1 space-y-0.5">
                      {resources.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 rounded-xs p-3 transition-colors duration-[0.15s] hover:bg-surface-3"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border border-border bg-background">
                              <Icon className="h-5 w-5 text-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-normal text-foreground">{item.title}</span>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-base font-normal text-foreground hover:text-foreground-80 px-4 py-2 transition-colors duration-[0.15s]">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[300px] p-1 space-y-0.5">
                      {company.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 rounded-xs p-3 transition-colors duration-[0.15s] hover:bg-surface-3"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border border-border bg-background">
                              <Icon className="h-5 w-5 text-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-normal text-foreground">{item.title}</span>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link href="/request-demo">
              <Button variant="primary" size="sm">
                Request Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xs hover:bg-surface-3 transition-colors duration-[0.15s]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile navigation"
            ref={mobileMenuRef}
            className="md:hidden border-t border-border"
          >
            <div className="py-4 space-y-1">
              {/* Solutions Section */}
              <div className="px-3 py-2">
                <span className="text-xs font-normal text-muted-foreground uppercase tracking-wide">Solutions</span>
              </div>
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Link
                    key={solution.id}
                    href={solution.href}
                    className="flex items-center gap-3 mx-2 px-3 py-2.5 text-sm text-foreground hover:bg-surface-3 rounded-xs transition-colors duration-[0.15s]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-border bg-background">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <span className="font-normal">{solution.title}</span>
                    {solution.comingSoon && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-surface-3 text-muted-foreground font-normal ml-auto">
                        Soon
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Resources Section */}
              <div className="px-3 py-2 pt-4">
                <span className="text-xs font-normal text-muted-foreground uppercase tracking-wide">Resources</span>
              </div>
              {resources.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 mx-2 px-3 py-2.5 text-sm text-foreground hover:bg-surface-3 rounded-xs transition-colors duration-[0.15s]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-border bg-background">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <span className="font-normal">{item.title}</span>
                  </Link>
                );
              })}

              {/* Company Section */}
              <div className="px-3 py-2 pt-4">
                <span className="text-xs font-normal text-muted-foreground uppercase tracking-wide">Company</span>
              </div>
              {company.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 mx-2 px-3 py-2.5 text-sm text-foreground hover:bg-surface-3 rounded-xs transition-colors duration-[0.15s]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border border-border bg-background">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <span className="font-normal">{item.title}</span>
                  </Link>
                );
              })}

              <div className="pt-4 px-3">
                <Link href="/request-demo" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        )}
        </Container>
      </div>
    </header>
  );
}

export default Header;
