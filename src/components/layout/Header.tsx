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
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Menu, X, MapPin, ClipboardCheck, GraduationCap, BookOpen, FileText, Building2, Users, Mail, Newspaper } from "lucide-react";

const solutions = [
  {
    id: "vertex",
    title: "Raisedash Vertex",
    description: "Real-time freight tracking with automated arrival alerts.",
    href: "/products/raisedash-vertex",
    image: "https://cdn.raisedash.com/media/vertex/834f7f4b-6def-4090-bc16-6de5c21ff18d.webp",
    icon: MapPin,
  },
  {
    id: "pti",
    title: "PTI Inspections",
    description: "Digital driver vehicle inspection reports and pre-trip tools.",
    href: "/products/raisedash-pti-inspections",
    image: "https://cdn.raisedash.com/media/vertex/5bbcc5ad-2b1c-4ddb-9fe6-e8e2bc2c8a1a.webp",
    icon: ClipboardCheck,
  },
  {
    id: "onboarding",
    title: "Raisedash Onboarding",
    description: "Streamlined driver training and compliance platform.",
    href: "/products/raisedash-shift",
    image: "https://cdn.raisedash.com/media/vertex/57c53ef5-ad1a-4508-89a5-329985846a89.webp",
    icon: GraduationCap,
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
  {
    title: "Press",
    description: "News, media resources, and company announcements.",
    href: "#",
    icon: Newspaper,
    comingSoon: true,
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [hoveredSolution, setHoveredSolution] = React.useState(solutions[0]);

  return (
    <header className="sticky top-4 md:top-6 z-50 w-full bg-transparent">
      <div className="" style={{ '--rails-offset': '2rem' } as React.CSSProperties}>
        <Container className="rounded-md border bg-white dark:bg-card ui-corner-accents">
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
                    <div className="flex w-[520px]">
                      {/* Left column - Product list */}
                      <div className="w-[260px] p-2 space-y-1">
                        {solutions.map((solution) => {
                          const Icon = solution.icon;
                          return (
                            <Link
                              key={solution.id}
                              href={solution.href}
                              className={`flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent ${
                                hoveredSolution.id === solution.id ? "bg-accent" : ""
                              }`}
                              onMouseEnter={() => setHoveredSolution(solution)}
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-background">
                                <Icon className="h-4 w-4 text-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{solution.title}</span>
                                  {(solution as any).comingSoon && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                      Soon
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                  {solution.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                      {/* Right column - Image preview */}
                      <div className="w-[260px] p-2 border-l">
                        <div className="relative h-full w-full rounded-md overflow-hidden bg-muted">
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
                    <div className="w-[280px] p-2 space-y-1">
                      {resources.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-background">
                              <Icon className="h-4 w-4 text-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium">{item.title}</span>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
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
                    <div className="w-[280px] p-2 space-y-1">
                      {company.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-accent"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border bg-background">
                              <Icon className="h-4 w-4 text-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{item.title}</span>
                                {item.comingSoon && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                    Soon
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
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
              className="p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-1">
              {/* Solutions Section */}
              <div className="px-3 py-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Solutions</span>
              </div>
              {solutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Link
                    key={solution.id}
                    href={solution.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{solution.title}</span>
                    {(solution as any).comingSoon && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground ml-auto">
                        Soon
                      </span>
                    )}
                  </Link>
                );
              })}

              {/* Resources Section */}
              <div className="px-3 py-2 pt-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Resources</span>
              </div>
              {resources.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}

              {/* Company Section */}
              <div className="px-3 py-2 pt-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Company</span>
              </div>
              {company.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span>{item.title}</span>
                    {item.comingSoon && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground ml-auto">
                        Soon
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 px-3">
                <Link href="/request-demo" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="sm" className="w-full">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
        </Container>
      </div>
    </header>
  );
}

export default Header;