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
        <Container className="rounded-lg border border-border bg-white dark:bg-card dark:border-border shadow-sm">
        <div className="h-14 md:h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold text-2xl tracking-[-0.01em] text-foreground">
              Raisedash
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
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
                              className={`flex items-start gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-muted dark:hover:bg-accent ${
                                hoveredSolution.id === solution.id ? "bg-muted dark:bg-accent" : ""
                              }`}
                              onMouseEnter={() => setHoveredSolution(solution)}
                            >
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border dark:border-border bg-white dark:bg-background">
                                <Icon className="h-5 w-5 text-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-foreground">{solution.title}</span>
                                  {solution.comingSoon && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted dark:bg-muted text-muted-foreground font-medium">
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
                      <div className="w-[270px] p-2 border-l border-border dark:border-border">
                        <div className="relative h-full w-full rounded-lg overflow-hidden bg-muted dark:bg-muted">
                          <Image
                            src={hoveredSolution.image}
                            alt={hoveredSolution.title}
                            fill
                            className="object-cover dark:invert transition-opacity duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
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
                            className="flex items-start gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-muted dark:hover:bg-accent"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border dark:border-border bg-white dark:bg-background">
                              <Icon className="h-5 w-5 text-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-foreground">{item.title}</span>
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
                  <NavigationMenuTrigger className="bg-transparent">
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
                            className="flex items-start gap-3 rounded-lg p-3 transition-all duration-200 hover:bg-muted dark:hover:bg-accent"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border dark:border-border bg-white dark:bg-background">
                              <Icon className="h-5 w-5 text-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-foreground">{item.title}</span>
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
              className="p-2 rounded-lg hover:bg-muted dark:hover:bg-accent transition-all duration-200"
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
            className="md:hidden border-t border-border dark:border-border"
          >
            <div className="py-4 space-y-1">
              {/* Solutions Section */}
              <div className="px-3 py-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Solutions</span>
              </div>
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Link
                    key={solution.id}
                    href={solution.href}
                    className="flex items-center gap-3 mx-2 px-3 py-2.5 text-sm text-foreground hover:bg-muted dark:hover:bg-accent rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border dark:border-border bg-white dark:bg-background">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <span className="font-medium">{solution.title}</span>
                    {solution.comingSoon && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted dark:bg-muted text-muted-foreground font-medium ml-auto">
                        Soon
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Resources Section */}
              <div className="px-3 py-2 pt-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</span>
              </div>
              {resources.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 mx-2 px-3 py-2.5 text-sm text-foreground hover:bg-muted dark:hover:bg-accent rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border dark:border-border bg-white dark:bg-background">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}

              {/* Company Section */}
              <div className="px-3 py-2 pt-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Company</span>
              </div>
              {company.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 mx-2 px-3 py-2.5 text-sm text-foreground hover:bg-muted dark:hover:bg-accent rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border dark:border-border bg-white dark:bg-background">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <span className="font-medium">{item.title}</span>
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