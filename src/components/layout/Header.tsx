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
import {
  Menu,
  X,
  MapPin,
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  FileText,
  Building2,
  Users,
  Mail,
  LucideIcon,
} from "lucide-react";

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
  },
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
    <header className="sticky top-4 z-50 w-full bg-transparent md:top-6">
      <div className="">
        <Container className="border-border dark:bg-card rounded-xs border bg-white">
          <div className="flex h-[60px] items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-foreground hover:text-foreground-80 flex items-center gap-2 text-xl font-normal tracking-[-0.02em] transition-colors duration-[0.15s]"
              >
                <Image src="/logo.webp" alt="Raisedash logo" width={28} height={28} />
                Raisedash
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground hover:text-foreground-80 bg-transparent px-4 py-2 text-base font-normal transition-colors duration-[0.15s]">
                      Solutions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="flex w-[540px]">
                        {/* Left column - Product list */}
                        <div className="w-[270px] space-y-0.5 p-1">
                          {solutions.map((solution) => {
                            const Icon = solution.icon;
                            return (
                              <Link
                                key={solution.id}
                                href={solution.href}
                                className={`hover:bg-surface-3 flex items-start gap-3 rounded-xs p-3 transition-colors duration-[0.15s] ${
                                  hoveredSolution.id === solution.id ? "bg-surface-3" : ""
                                }`}
                                onMouseEnter={() => setHoveredSolution(solution)}
                              >
                                <div className="border-border bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border">
                                  <Icon className="text-foreground h-5 w-5" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-foreground text-sm font-normal">
                                      {solution.title}
                                    </span>
                                    {solution.comingSoon && (
                                      <span className="bg-surface-3 text-muted-foreground rounded-xs px-1.5 py-0.5 text-[10px] font-normal">
                                        Soon
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                                    {solution.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                        {/* Right column - Image preview */}
                        <div className="border-border w-[270px] border-l p-2">
                          <div className="bg-surface-3 relative h-full w-full overflow-hidden rounded-xs">
                            <Image
                              src={hoveredSolution.image}
                              alt={hoveredSolution.title}
                              fill
                              className="object-cover transition-opacity duration-[0.15s] dark:invert"
                            />
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-foreground hover:text-foreground-80 bg-transparent px-4 py-2 text-base font-normal transition-colors duration-[0.15s]">
                      Resources
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[300px] space-y-0.5 p-1">
                        {resources.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="hover:bg-surface-3 flex items-start gap-3 rounded-xs p-3 transition-colors duration-[0.15s]"
                            >
                              <div className="border-border bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border">
                                <Icon className="text-foreground h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-foreground text-sm font-normal">
                                  {item.title}
                                </span>
                                <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
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
                    <NavigationMenuTrigger className="text-foreground hover:text-foreground-80 bg-transparent px-4 py-2 text-base font-normal transition-colors duration-[0.15s]">
                      Company
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[300px] space-y-0.5 p-1">
                        {company.map((item) => {
                          const Icon = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              className="hover:bg-surface-3 flex items-start gap-3 rounded-xs p-3 transition-colors duration-[0.15s]"
                            >
                              <div className="border-border bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xs border">
                                <Icon className="text-foreground h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <span className="text-foreground text-sm font-normal">
                                  {item.title}
                                </span>
                                <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
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
            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <Link href="/get-started">
                <Button variant="primary" size="sm">
                  Request Demo
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hover:bg-surface-3 rounded-xs p-2 transition-colors duration-[0.15s]"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {mobileMenuOpen ? (
                  <X className="text-foreground h-5 w-5" />
                ) : (
                  <Menu className="text-foreground h-5 w-5" />
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
              className="border-border border-t md:hidden"
            >
              <div className="space-y-1 py-4">
                {/* Solutions Section */}
                <div className="px-3 py-2">
                  <span className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
                    Solutions
                  </span>
                </div>
                {solutions.map((solution) => {
                  const Icon = solution.icon;
                  return (
                    <Link
                      key={solution.id}
                      href={solution.href}
                      className="text-foreground hover:bg-surface-3 mx-2 flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-colors duration-[0.15s]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="border-border bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border">
                        <Icon className="text-foreground h-4 w-4" />
                      </div>
                      <span className="font-normal">{solution.title}</span>
                      {solution.comingSoon && (
                        <span className="bg-surface-3 text-muted-foreground ml-auto rounded-xs px-1.5 py-0.5 text-[10px] font-normal">
                          Soon
                        </span>
                      )}
                    </Link>
                  );
                })}

                {/* Resources Section */}
                <div className="px-3 py-2 pt-4">
                  <span className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
                    Resources
                  </span>
                </div>
                {resources.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-foreground hover:bg-surface-3 mx-2 flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-colors duration-[0.15s]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="border-border bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border">
                        <Icon className="text-foreground h-4 w-4" />
                      </div>
                      <span className="font-normal">{item.title}</span>
                    </Link>
                  );
                })}

                {/* Company Section */}
                <div className="px-3 py-2 pt-4">
                  <span className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
                    Company
                  </span>
                </div>
                {company.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="text-foreground hover:bg-surface-3 mx-2 flex items-center gap-3 rounded-xs px-3 py-2.5 text-sm transition-colors duration-[0.15s]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="border-border bg-background flex h-8 w-8 shrink-0 items-center justify-center rounded-xs border">
                        <Icon className="text-foreground h-4 w-4" />
                      </div>
                      <span className="font-normal">{item.title}</span>
                    </Link>
                  );
                })}

                <div className="px-3 pt-4">
                  <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
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
