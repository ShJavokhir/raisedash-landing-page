import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FAQPageJsonLd } from "@/components/seo/SEO";

export interface PlatformFaq {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  id?: string;
  title?: string;
  faqs: PlatformFaq[];
}

/**
 * Mini-FAQ built on native <details>/<summary> (no client JS needed) plus
 * matching FAQPage structured data for SEO. Answers are written to address real
 * buyer objections honestly.
 */
export function FaqSection({ id, title = "Questions, answered", faqs }: FaqSectionProps) {
  return (
    <Container id={id} className="scroll-mt-24 py-12 md:px-0">
      <FAQPageJsonLd faqs={faqs} />
      <div className="mb-10">
        <p className="text-muted-foreground mb-3 text-xs tracking-wide uppercase">FAQ</p>
        <h2 className="text-foreground text-2xl font-normal tracking-[-0.02em] sm:text-3xl md:text-4xl">
          {title}
        </h2>
      </div>
      <div className="divide-border border-border divide-y overflow-hidden rounded-xs border">
        {faqs.map((faq) => (
          <details key={faq.question} className="group bg-card">
            <summary className="hover:bg-surface-2 flex cursor-pointer items-center justify-between gap-4 px-5 py-4 transition-colors duration-[0.15s] [&::-webkit-details-marker]:hidden">
              <span className="text-foreground text-base font-normal">{faq.question}</span>
              <ChevronDown className="text-muted-foreground h-4 w-4 flex-shrink-0 transition-transform duration-[0.15s] group-open:rotate-180" />
            </summary>
            <div className="px-5 pb-5">
              <p className="text-muted-foreground max-w-3xl text-base leading-relaxed font-normal">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </Container>
  );
}
