import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { cn } from "@/lib/cn";
import { products } from "@/data/products";

/** Light-source rotations for the color plates (see .product-plate in globals.css). */
const PLATE_LIGHT = ["", "product-plate-light-b", "product-plate-light-c"];

export default function Home() {
  const router = useRouter();

  // Keep previously shared orientation calculator links working after the move.
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#calc=") || hash === "#orientation-cost-calculator") {
      void router.replace(`/products/orientation${hash}`);
    }
  }, [router]);

  return (
    <PageLayout
      title="Simple and useful tools for trucking companies"
      description="We make simple and useful tools for trucking companies. Explore driver orientation, Telegram inspection and Samsara bots, DOT compliance training, and TruckTalk English practice."
    >
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
            We make simple and useful tools for trucking companies.
          </h1>
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section
          id="products"
          // The visible "Our products" heading and its rule were dropped, so
          // the section carries its own name instead of aria-labelledby.
          aria-label="Our products"
          className="scroll-mt-8 sm:scroll-mt-28"
        >
          <ul className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-6">
            {products.map(({ name, description, href, plate }, index) => (
              <li
                key={href}
                className={`min-w-0 lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""}`}
              >
                <Link
                  href={href}
                  aria-label={`Explore ${name}`}
                  style={{ "--plate-bg": plate } as React.CSSProperties}
                  className={cn(
                    "product-plate group focus-visible:outline-foreground flex h-full flex-col rounded-xs p-6 text-white focus-visible:outline-2 focus-visible:outline-offset-4 sm:p-8",
                    // Rotates the plate's light source so five cards in one
                    // grid don't look stamped from a single template.
                    PLATE_LIGHT[index % PLATE_LIGHT.length]
                  )}
                >
                  {/* Hierarchy on a saturated plate comes from size and
                      weight, not color: both are white, so a 24/14 size jump
                      and a 500/400 weight step do the separating. */}
                  <h3 className="text-2xl leading-snug font-medium tracking-[-0.02em]">{name}</h3>
                  <p className="mt-2.5 max-w-[46ch] text-sm leading-relaxed text-white/90">
                    {description}
                  </p>
                  <span className="mt-auto flex justify-end pt-8">
                    {/* Literal white and ink: the plate hue is fixed, so the
                        inverted pill must not follow the light/dark tokens. */}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm text-[#26251e] transition-transform duration-150 group-active:scale-[0.97] motion-reduce:transition-none motion-reduce:group-active:scale-100">
                      Learn more
                      {href.startsWith("https:") ? (
                        <ArrowUpRight
                          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      ) : (
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </PageLayout>
  );
}
