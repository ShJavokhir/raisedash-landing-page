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
import { Menu, X, BookOpen, FileText, Building2, Users, Mail } from "lucide-react";

const resources = [
  {
    title: "Blog",
    description: "Insights on logistics, safety, and industry trends.",
    href: "/blog",
    icon: BookOpen,
  },
  {
    title: "Product Updates",
    description: "Latest features and improvements.",
    href: "/product-updates",
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
              <a href="https://my.raisedash.com" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="sm">
                  Sign in
                </Button>
              </a>
              <Link href="/get-started">
                <Button variant="primary" size="sm">
                  See a demo
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

                <div className="flex flex-col gap-2 px-3 pt-4">
                  <a
                    href="https://my.raisedash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="secondary" size="sm" className="w-full">
                      Sign in
                    </Button>
                  </a>
                  <Link href="/get-started" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" size="sm" className="w-full">
                      See a demo
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
