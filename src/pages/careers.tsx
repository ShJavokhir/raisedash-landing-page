import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";
import { JobApplicationForm } from "@/components/JobApplicationForm";

const jobOpenings = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco Bay Area / Remote",
    type: "Full-time",
    description:
      "Join our engineering team to build the driver readiness platform for modern trucking fleets.",
    requirements: [
      "5+ years of software development experience",
      "Expertise in React, Node.js, and cloud technologies",
      "Experience building mobile-first, product-led web applications",
      "Strong problem-solving and communication skills",
    ],
  },
  {
    title: "Solutions Architect",
    department: "Product",
    location: "San Francisco Bay Area / Remote",
    type: "Full-time",
    description:
      "Design and implement the readiness workflows and evidence records that fleets rely on.",
    requirements: [
      "7+ years in solutions architecture or related field",
      "Comfort partnering with operations and safety teams",
      "Experience with data-rich, records-heavy enterprise systems",
      "Strong client-facing and presentation skills",
    ],
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "San Francisco Bay Area / Remote",
    type: "Full-time",
    description: "Help fleets get up and running and get the most out of Raisedash.",
    requirements: [
      "3+ years in customer success or account management",
      "Experience with B2B SaaS platforms",
      "Strong relationship-building skills",
      "Background in trucking, logistics, or fleet safety preferred",
    ],
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "San Francisco Bay Area / Remote",
    type: "Full-time",
    description: "Build and maintain our cloud infrastructure and deployment pipelines.",
    requirements: [
      "4+ years of DevOps or infrastructure experience",
      "Expertise in AWS, Docker, and Kubernetes",
      "Experience with monitoring and security tools",
      "Strong automation and scripting skills",
    ],
  },
];

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  const handleApplyClick = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsApplicationFormOpen(true);
  };

  const handleCloseApplicationForm = () => {
    setIsApplicationFormOpen(false);
    setSelectedJob(null);
  };

  return (
    <PageLayout
      title="Careers"
      description="Join the Raisedash team. Explore career opportunities and help us build the driver readiness platform for modern trucking fleets."
      keywords={[
        "raisedash careers",
        "trucking software jobs",
        "fleet software jobs",
        "driver readiness platform jobs",
        "san francisco startup jobs",
      ]}
    >
      {/* Hero Section */}
      <div className="pt-8 pb-12">
        <Container className="bg-card border-border animate-fade-in-scale rounded-xs border px-8 py-12 delay-0 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-foreground animate-fade-in-up text-4xl leading-tight font-normal tracking-[-0.03em] delay-75 sm:text-[48px]">
              Join Our Team
            </h1>
            <p className="text-muted-foreground animate-fade-in-up mt-6 text-xl leading-relaxed font-normal delay-150">
              Help us build the driver readiness platform for modern trucking fleets. We're looking
              for people who want to ship great product in an industry that has been waiting decades
              for it.
            </p>
          </div>
        </Container>
      </div>

      {/* Open Positions Section */}
      <Container className="py-12 md:px-0">
        <div className="animate-fade-in-up mb-10 text-center delay-200">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Open Positions
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
            Explore our current openings and find the perfect role for your next career move.
          </p>
        </div>

        <div className="space-y-5">
          {jobOpenings.map((job, index) => (
            <div
              key={job.title}
              className={`bg-card border-border hover:bg-surface-2 animate-fade-in-scale rounded-xs border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 sm:p-8 delay-${300 + index * 100}`}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <h3 className="text-foreground text-xl font-normal tracking-[-0.01em]">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="bg-primary/10 text-primary rounded-xs px-3 py-1 text-sm font-normal">
                        {job.department}
                      </span>
                      <span className="bg-surface-3 text-muted-foreground border-border rounded-xs border px-3 py-1 text-sm font-normal">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-3 text-sm">{job.location}</p>
                  <p className="text-foreground mb-4 text-base">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="text-foreground mb-2 text-sm font-normal">Key Requirements:</h4>
                    <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                      {job.requirements.map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row lg:flex-shrink-0">
                  <Button onClick={() => handleApplyClick(job.title)}>Apply Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Why Join Us Section */}
      <Container className="py-12 md:px-0">
        <div className="animate-fade-in-up mb-10 text-center delay-700">
          <h2 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Why Join Raisedash?
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-lg">
            Modern product engineering in an industry still running on twenty-year-old software.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="bg-card border-border hover:bg-surface-2 animate-fade-in-scale rounded-xs border p-6 transition-all delay-800 duration-[0.15s] hover:-translate-y-0.5">
            <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
              Impactful Work
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Your work helps drivers complete orientation on a phone, and gives fleets a complete,
              defensible record of every bit of training.
            </p>
          </div>
          <div className="bg-card border-border hover:bg-surface-2 animate-fade-in-scale rounded-xs border p-6 transition-all delay-900 duration-[0.15s] hover:-translate-y-0.5">
            <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
              Growth Opportunity
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Join a fast-growing company where you can shape the driver readiness platform for
              trucking fleets from the ground up.
            </p>
          </div>
          <div className="bg-card border-border hover:bg-surface-2 animate-fade-in-scale rounded-xs border p-6 transition-all delay-1000 duration-[0.15s] hover:-translate-y-0.5">
            <h3 className="text-foreground mb-2 text-xl font-normal tracking-[-0.01em]">
              Flexible Culture
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              Remote-friendly environment with competitive benefits and a team that values work-life
              balance.
            </p>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="pb-12 md:px-0">
        <div className="bg-card border-border animate-fade-in-scale rounded-xs border p-8 text-center delay-1100 sm:p-12">
          <h2 className="text-foreground mb-4 text-2xl font-normal tracking-[-0.02em] sm:text-3xl">
            Don't See Your Perfect Role?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
            We're always looking for exceptional talent. Send us your resume and let us know how
            you'd like to contribute to our mission.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Contact Our Team
            </Button>
          </Link>
        </div>
      </Container>

      {/* Job Application Form Modal */}
      {selectedJob && (
        <JobApplicationForm
          jobTitle={selectedJob}
          isOpen={isApplicationFormOpen}
          onClose={handleCloseApplicationForm}
        />
      )}
    </PageLayout>
  );
}
