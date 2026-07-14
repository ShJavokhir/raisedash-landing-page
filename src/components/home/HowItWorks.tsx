import { Container } from "@/components/layout/Container";

const steps = [
  {
    number: "1",
    title: "Hire an approved driver",
    body: "Add them in seconds and pick a program. Their pre-arrival orientation is assigned automatically, no support call required.",
  },
  {
    number: "2",
    title: "They finish it on their phone",
    body: "The driver gets a text link and completes lessons, quizzes, and signatures before they ever reach the terminal.",
  },
  {
    number: "3",
    title: "You see who's ready, and keep the proof",
    body: "Watch the ready board fill in, then keep a permanent, version-locked record of everything, ready to produce in one click.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24">
      <Container className="pb-12 md:px-0">
        <div className="mb-8 max-w-2xl">
          <p className="text-muted-foreground mb-3 text-sm font-normal tracking-wide uppercase">
            How it works
          </p>
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Set up before lunch. Not after a six-week implementation.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="border-border bg-card rounded-xs border p-6 sm:p-8">
              <div className="border-border bg-background text-foreground mb-5 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-normal">
                {step.number}
              </div>
              <h3 className="text-foreground mb-3 text-lg font-normal tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;
