import { GetDemoLink } from "@/components/demo/GetDemoLink";
import { Check, ChevronDown, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { StepList, type PlatformStep } from "@/components/platform/StepList";
import {
  BreadcrumbJsonLd,
  FAQPageJsonLd,
  SoftwareApplicationJsonLd,
  type FAQItem,
} from "@/components/seo/SEO";
import { GraphiteCard, GraphitePlate, type PlateCrop } from "@/components/receipts/figures";
import {
  ApplicationsFigure,
  CertificateFigure,
  CompanyDetailsFigure,
  DocumentsFigure,
  DriverPageFigure,
  FileRequestsFigure,
  HeroFigure,
  ReadFirstFigure,
  StatusFigure,
  TemplatesFigure,
  TextMessageFigure,
  TwoWays,
} from "@/components/paperwork/figures";

/**
 * Driver paperwork: the dashboard's Paperwork section (Documents, Applications,
 * File requests) and the driver portal where drivers finish each one.
 *
 * The pitch is for the person who hires and onboards drivers: stop printing,
 * faxing and texting for paperwork. Only claim what the product does today.
 * It collects and stores. It does not run MVRs, PSP reports or background
 * checks, does not contact past employers, and has no approve or reject step
 * (a bad file means asking again). Don't sell it as "stay compliant" or
 * "audit-ready": the site is a driver-readiness platform, not compliance
 * automation (see CLAUDE.md, product guardrails).
 *
 * Facts this page leans on, and where they live: 25 templates in four
 * categories (backend src/policies/template-library.ts); 9 application steps
 * with autosave, SSN and date of birth encrypted, only the last 4 shown
 * (src/driver-applications); up to 5 files, 25 MB each, PDF/JPG/PNG/HEIC/WebP
 * (src/file-requests/file-request.constants.ts); every request sends an email
 * and a text; drivers sign in with a 6-digit code; the sign button waits for
 * the end of the document; a published document is locked, changes go in a
 * new version; downloads use 15-minute links. When one changes, change it here.
 *
 * Copy: plain words a person would say out loud, no em dashes, "we" for what
 * the product does. No public price: the CTA goes to the demo request page.
 */

const parts: {
  id: string;
  label: string;
  title: string;
  text: string;
  points: string[];
  figure: React.ReactNode;
  crop: PlateCrop;
}[] = [
  {
    id: "applications",
    label: "Applications",
    title: "A full driver application, on their phone",
    text: "Request an application with one click. The driver fills it out one step at a time: address history, licenses, experience, accidents, traffic violations and work history. Then they sign it.",
    points: [
      "It saves after every step, so drivers can stop and finish later.",
      "Social Security numbers and dates of birth are encrypted.",
      "You download one clean PDF with every answer and the signature.",
    ],
    figure: <ApplicationsFigure />,
    crop: { pos: "15% 55%" },
  },
  {
    id: "documents",
    label: "Documents",
    title: "Policies and agreements, signed",
    text: "Start from one of 25 ready-made trucking documents, like a drug and alcohol policy receipt or a PSP authorization. Or upload a PDF you already use. Drivers read it and sign by typing their name.",
    points: [
      "Your company name, phone and DOT number are filled in for you.",
      "Drivers can only sign after they reach the end of the document.",
      "Every signature comes with a signed copy you can download.",
    ],
    figure: <DocumentsFigure />,
    crop: { pos: "75% 20%", flip: true },
  },
  {
    id: "file-requests",
    label: "File requests",
    title: "Ask for any file",
    text: "Need a CDL, a medical card or an MVR? Type what you need and pick the drivers. They take a photo or choose a file on their phone, then tap Send.",
    points: [
      "Drivers can send up to 5 photos or PDFs for each request.",
      "Ask one driver or your whole list at once.",
      "Open and download every file from your dashboard.",
    ],
    figure: <FileRequestsFigure />,
    crop: { pos: "45% 90%" },
  },
];

const steps: PlatformStep[] = [
  {
    title: "Pick what you need",
    description:
      "A driver application, a document to sign, or a file. Choose the drivers and, if you like, a due date.",
  },
  {
    title: "Drivers get a text and an email",
    description:
      "The link opens on their phone. They sign in with a 6-digit code. No app to install and no password.",
  },
  {
    title: "They finish it on their phone",
    description:
      "Signing a document or sending a photo is quick. The full application takes about 10 minutes.",
  },
  {
    title: "You download the PDF",
    description:
      "See who’s done and who isn’t. Send a reminder to anyone who still has something open.",
  },
];

const features: { title: string; text: string; figure: React.ReactNode; crop: PlateCrop }[] = [
  {
    title: "25 ready-made documents",
    text: "Background check and PSP authorizations, a drug and alcohol policy receipt, cell phone and personal conveyance policies, and more.",
    figure: <TemplatesFigure />,
    crop: { pos: "0% 8%" },
  },
  {
    title: "Your details, already filled in",
    text: "Templates fill in your company name, address, phone and DOT number. Change any of the wording before you send it.",
    figure: <CompanyDetailsFigure />,
    crop: { pos: "60% 80%" },
  },
  {
    title: "Proof of every signature",
    text: "Each signed copy ends with a certificate page that shows who signed, when they signed, and how they signed in.",
    figure: <CertificateFigure />,
    crop: { pos: "100% 25%", flip: true },
  },
  {
    title: "Read before they sign",
    text: "The sign button stays locked until the driver reaches the end of the document.",
    figure: <ReadFirstFigure />,
    crop: { pos: "90% 95%" },
  },
  {
    title: "See who’s behind",
    text: "Every request shows Requested, In progress or Submitted. One tap sends a reminder by text and email.",
    figure: <StatusFigure />,
    crop: { pos: "10% 40%", flip: true },
  },
  {
    title: "Paperwork next to training",
    text: "Each driver’s page in your dashboard shows their training and their paperwork in one list.",
    figure: <DriverPageFigure />,
    crop: { pos: "30% 60%", flip: true },
  },
];

/** Applications hold the most sensitive details a fleet collects. Say how we treat them. */
const privacy = [
  {
    title: "Social Security numbers are encrypted",
    text: "We encrypt the SSN and date of birth as soon as they’re saved. Your dashboard shows only the last 4 digits. The full number appears only in the application PDF.",
  },
  {
    title: "Your drivers are only yours",
    text: "Each company sees only its own drivers and their paperwork. Nobody else can open them.",
  },
  {
    title: "Download links expire",
    text: "Files and PDFs open through private links that stop working after 15 minutes, so a forwarded link doesn’t stay open.",
  },
  {
    title: "Drivers keep a copy",
    text: "After they sign, drivers can download their own signed copy of the document from their phone.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "How do I get started?",
    answer:
      "Request a demo. We’ll show you how it works, share pricing, and help you send your first request.",
  },
  {
    question: "Do drivers need to download an app?",
    answer:
      "No. They get a text and an email with a link. They sign in with a 6-digit code sent to their phone or email. There’s no password to remember.",
  },
  {
    question: "Are electronic signatures legal?",
    answer:
      "Yes. In the US, a typed-name electronic signature is legally valid under the federal ESIGN Act and state e-signature laws, and FMCSA allows electronic signatures on the records it requires. Each signed copy shows when the driver signed and how they signed in. This isn’t legal advice, so check with your lawyer if you’re unsure.",
  },
  {
    question: "What does the driver application ask?",
    answer:
      "The usual driver employment application questions: contact details, addresses from the last 3 years, licenses, the equipment they’ve driven, accidents and traffic violations from the last 3 years, any license suspensions, and their work history. The driver signs it at the end.",
  },
  {
    question: "Can I use my own documents?",
    answer:
      "Yes. Upload any PDF and send it for signature. Or start from one of our templates and change the wording to fit your company.",
  },
  {
    question: "Can I change a document after I send it?",
    answer:
      "No. Once a document is ready to send, its wording is locked, so every driver signs the same text. To change it, make a new version and send that.",
  },
  {
    question: "What files can drivers send?",
    answer:
      "Photos and PDFs, up to 5 files for each request and 25 MB each. Photos straight from an iPhone work too.",
  },
  {
    question: "What if a driver sends a blurry photo?",
    answer:
      "Request it again. There’s no approve or reject step, so a new request is how you ask for a better copy.",
  },
  {
    question: "Do you run background checks or call past employers?",
    answer:
      "No. We collect the application and the driver’s signed authorizations, like the background check and PSP release. Ordering reports and checking with past employers is still up to you.",
  },
  {
    question: "Does it work with Raisedash training?",
    answer:
      "Yes. Paperwork uses the same driver list and the same driver portal as training, so a new driver can finish orientation and their paperwork in one place.",
  },
];

export default function DriverPaperworkPage() {
  return (
    <PageLayout
      title="Driver Applications, E-Signatures and Document Requests"
      description="Send driver applications, policies to sign, and requests for files like a CDL or medical card. Drivers finish them on their phone, and you download clean PDFs."
      keywords={[
        "driver employment application",
        "online cdl driver application",
        "trucking e-signature",
        "driver onboarding paperwork",
        "collect driver documents",
        "drug and alcohol policy acknowledgment",
      ]}
    >
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Driver Paperwork", url: "/products/driver-paperwork" },
        ]}
      />
      <SoftwareApplicationJsonLd
        name="Raisedash Driver Paperwork"
        description="Driver applications, documents to e-sign, and file requests that drivers finish on their phone. The office downloads clean PDFs."
        operatingSystem={["Web", "iOS", "Android"]}
      />
      <FAQPageJsonLd faqs={faqs} />

      <Container className="py-12 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-accent mb-4 font-mono text-xs tracking-[0.14em] uppercase">
              Driver paperwork
            </p>
            <h1 className="text-foreground text-4xl leading-tight font-normal tracking-tight sm:text-5xl">
              Driver paperwork, done on their phone.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">
              Send a driver application, a policy to sign, or a request for a photo of their CDL.
              Drivers finish it on their phone. You get a clean PDF.
            </p>
            <GetDemoLink product="driver-paperwork" className="mt-7 text-sm" />
            <p className="text-muted-foreground mt-3 text-sm">
              We’ll walk you through it and help you send your first request.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <HeroFigure />
            <p className="text-muted-foreground/80 mt-3 text-center text-xs leading-relaxed">
              The driver’s phone and your dashboard, rebuilt for this page. The people and the
              company are made up.
            </p>
          </div>
        </div>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="pw-two-ways-heading">
          <h2
            id="pw-two-ways-heading"
            className="text-foreground mb-2 text-2xl font-normal tracking-tight"
          >
            One link instead of a stack of paper
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl text-base leading-relaxed">
            Every new driver comes with a pile of paperwork. Most of it still moves by printer, fax
            and text message.
          </p>
          <TwoWays />
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="pw-parts-heading">
          <h2
            id="pw-parts-heading"
            className="text-foreground mb-2 text-2xl font-normal tracking-tight"
          >
            Three kinds of paperwork, one place
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl text-base leading-relaxed">
            Use one, or all three. They work the same way: you send, the driver finishes it on their
            phone, and you download the result.
          </p>
          <div className="space-y-14 sm:space-y-20">
            {parts.map((part, index) => (
              <article
                key={part.id}
                aria-labelledby={`pw-${part.id}-heading`}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className={`min-w-0 lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <p className="text-accent mb-3 font-mono text-xs tracking-[0.14em] uppercase">
                    {part.label}
                  </p>
                  <h3
                    id={`pw-${part.id}-heading`}
                    className="text-foreground text-2xl leading-snug font-normal tracking-tight sm:text-3xl"
                  >
                    {part.title}
                  </h3>
                  <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                    {part.text}
                  </p>
                  <ul className="mt-5 space-y-3">
                    {part.points.map((point) => (
                      <li
                        key={point}
                        className="text-foreground flex gap-3 text-base leading-relaxed"
                      >
                        <Check
                          className="text-accent mt-1 h-4 w-4 shrink-0"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <GraphitePlate
                  crop={part.crop}
                  className={`grid min-h-[400px] place-items-center px-4 py-8 sm:p-10 lg:col-span-7 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  {part.figure}
                </GraphitePlate>
              </article>
            ))}
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="pw-how-heading">
          <h2
            id="pw-how-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            How it works
          </h2>
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <StepList steps={steps} className="lg:col-span-5" />
            <GraphitePlate
              crop={{ pos: "20% 70%", flip: true }}
              className="grid place-items-center px-4 py-8 sm:p-10 lg:col-span-7"
            >
              <TextMessageFigure />
            </GraphitePlate>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="pw-features-heading">
          <h2
            id="pw-features-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            What you get
          </h2>
          <ul className="grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <GraphiteCard key={feature.title} {...feature} />
            ))}
          </ul>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section
          aria-labelledby="pw-privacy-heading"
          className="bg-card border-border rounded-xs border p-6 sm:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <ShieldCheck className="text-accent h-6 w-6" aria-hidden="true" />
              <h2
                id="pw-privacy-heading"
                className="text-foreground mt-4 text-2xl font-normal tracking-tight"
              >
                Driver information stays private
              </h2>
              <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                A driver application holds some of the most personal details a driver will share.
                Here’s how we look after them.
              </p>
            </div>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
              {privacy.map((item) => (
                <li key={item.title} className="border-border border-t pt-5">
                  <h3 className="text-foreground text-lg font-normal tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground mt-1.5 text-base leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <section aria-labelledby="pw-faq-heading">
          <h2
            id="pw-faq-heading"
            className="text-foreground mb-6 text-2xl font-normal tracking-tight"
          >
            Questions
          </h2>
          <div className="border-border divide-border divide-y border-y">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="text-foreground flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-base [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown
                    className="text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="text-muted-foreground max-w-3xl pb-5 text-base leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </Container>

      <Container id="get-started" className="scroll-mt-24 pb-12 sm:pb-16">
        <section
          aria-labelledby="pw-start-heading"
          className="bg-card border-border rounded-xs border px-6 py-10 text-center sm:px-12 sm:py-14"
        >
          <h2
            id="pw-start-heading"
            className="text-foreground text-2xl font-normal tracking-tight sm:text-3xl"
          >
            Get the paperwork done before day one
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance">
            Get a demo. We’ll share pricing and help you send your first request.
          </p>
          <GetDemoLink product="driver-paperwork" className="mt-7 text-sm" />
        </section>
      </Container>
    </PageLayout>
  );
}
