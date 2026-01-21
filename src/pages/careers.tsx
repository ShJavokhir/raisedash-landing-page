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
      "Join our engineering team to build the next generation of freight security solutions.",
    requirements: [
      "5+ years of software development experience",
      "Expertise in React, Node.js, and cloud technologies",
      "Experience with security-focused applications",
      "Strong problem-solving and communication skills",
    ],
  },
  {
    title: "Security Solutions Architect",
    department: "Product",
    location: "San Francisco Bay Area / Remote",
    type: "Full-time",
    description: "Design and implement security solutions for enterprise freight logistics.",
    requirements: [
      "7+ years in security architecture or related field",
      "Deep understanding of logistics and supply chain",
      "Experience with enterprise security solutions",
      "Strong client-facing and presentation skills",
    ],
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "San Francisco Bay Area / Remote",
    type: "Full-time",
    description: "Help our clients maximize the value of our security platform.",
    requirements: [
      "3+ years in customer success or account management",
      "Experience with B2B SaaS platforms",
      "Strong relationship-building skills",
      "Background in logistics or security preferred",
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
      description="Join the Raisedash team. Explore career opportunities and help us revolutionize freight logistics safety and security."
      keywords={["raisedash careers", "logistics tech jobs", "fleet software jobs", "san francisco startup jobs"]}
    >
      {/* Hero Section */}
      <section className="bg-[#19224A] dark:bg-[#1E293B] py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-[48px] font-medium tracking-[-0.03em] text-white leading-tight">
              Join Our Team
            </h1>
            <p className="mt-6 text-lg font-light text-white/70 leading-relaxed">
              Help us revolutionize freight logistics safety and security. We're looking for talented
              individuals who are passionate about making a difference.
            </p>
          </div>
        </Container>
      </section>

      {/* Open Positions Section */}
      <section className="bg-[#F9F7F6] dark:bg-secondary py-16 md:py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-lg font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground max-w-2xl mx-auto">
              Explore our current openings and find the perfect role for your next career move.
            </p>
          </div>

          <div className="space-y-4">
            {jobOpenings.map((job) => (
              <div
                key={job.title}
                className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-6 md:p-8 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                      <h3 className="text-xl font-medium text-[#2E2D2D] dark:text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-[#19224A]/10 dark:bg-[#1E293B]/30 text-[#19224A] dark:text-foreground text-sm font-medium rounded-full">
                          {job.department}
                        </span>
                        <span className="px-3 py-1 bg-[#F9F7F6] dark:bg-secondary text-[rgba(24,23,23,0.7)] dark:text-muted-foreground text-sm rounded-full border border-[#EEEBEA] dark:border-border">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-3">{job.location}</p>
                    <p className="text-base text-[#2E2D2D] dark:text-foreground mb-4 font-light">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="font-medium text-[#2E2D2D] dark:text-foreground mb-2 text-sm">Key Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-[rgba(24,23,23,0.7)] dark:text-muted-foreground space-y-1 font-light">
                        {job.requirements.map((req) => (
                          <li key={req}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                    <Button onClick={() => handleApplyClick(job.title)}>Apply Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-white dark:bg-card py-16 md:py-20">
        <Container>
          <div className="bg-[#F9F7F6] dark:bg-secondary rounded-2xl border border-[#EEEBEA] dark:border-border p-8 md:p-12 text-center">
            <h2 className="text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-4">
              Don't See Your Perfect Role?
            </h2>
            <p className="text-lg font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and let us know how
              you'd like to contribute to our mission.
            </p>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Why Join Us Section */}
      <section className="bg-[#F9F7F6] dark:bg-secondary py-16 md:py-20">
        <Container>
          <h2 className="text-[28px] font-medium tracking-[-0.03em] text-[#2E2D2D] dark:text-foreground mb-12 text-center">
            Why Join Raisedash?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-8">
              <h3 className="text-xl font-medium text-[#2E2D2D] dark:text-foreground mb-3">Impactful Work</h3>
              <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                Your work directly contributes to protecting billions of dollars in freight and keeping supply chains secure.
              </p>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-8">
              <h3 className="text-xl font-medium text-[#2E2D2D] dark:text-foreground mb-3">Growth Opportunity</h3>
              <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                Join a fast-growing company where you can shape the future of logistics security technology.
              </p>
            </div>
            <div className="bg-white dark:bg-card rounded-2xl border border-[#EEEBEA] dark:border-border p-8">
              <h3 className="text-xl font-medium text-[#2E2D2D] dark:text-foreground mb-3">Flexible Culture</h3>
              <p className="text-base font-light text-[rgba(24,23,23,0.7)] dark:text-muted-foreground">
                Remote-friendly environment with competitive benefits and a team that values work-life balance.
              </p>
            </div>
          </div>
        </Container>
      </section>

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
