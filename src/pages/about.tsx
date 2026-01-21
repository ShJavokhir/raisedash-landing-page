import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

export default function About() {
  return (
    <PageLayout
      title="About Us"
      description="Learn about Raisedash and our mission to revolutionize freight logistics safety and security through AI-powered solutions."
      keywords={["about raisedash", "freight logistics company", "fleet safety company", "logistics technology"]}
    >
      {/* Hero Section */}
      <section className="bg-[#F9F7F6] dark:bg-secondary">
        <Container className="py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-[48px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground leading-tight">
              About Raisedash
            </h1>
            <p className="mt-6 text-lg font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground leading-relaxed">
              We're revolutionizing freight logistics safety and security through modern AI-powered solutions
              that protect corporations and their valuable cargo.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="bg-[#F9F7F6] dark:bg-secondary pb-16 md:pb-24">
        <Container>
          <div className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-8 md:p-12">
            <h2 className="text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-6 leading-relaxed">
              To strengthen the safety and security of freight logistics through cutting-edge
              technology that prevents theft, reduces losses, and ensures cargo reaches its
              destination safely.
            </p>
            <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground leading-relaxed">
              We believe that every shipment deserves protection, and every corporation
              deserves peace of mind when it comes to their valuable cargo.
            </p>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="bg-[#19224A] dark:bg-[#1E293B] py-16 md:py-20">
        <Container>
          <h2 className="text-[28px] font-medium tracking-[-0.03em] text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-xl font-medium text-white mb-3">Security First</h3>
              <p className="text-white/70 font-light">
                Every decision we make prioritizes the safety and security of our clients' cargo and operations.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-xl font-medium text-white mb-3">Innovation</h3>
              <p className="text-white/70 font-light">
                We continuously push the boundaries of what's possible with AI and technology in logistics security.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-xl font-medium text-white mb-3">Partnership</h3>
              <p className="text-white/70 font-light">
                We work closely with our clients to understand their unique needs and deliver tailored solutions.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
}
