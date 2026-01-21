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
      <div className="pt-8 pb-12">
        <Container className="bg-primary py-12 sm:py-16 px-8 sm:px-12 rounded-xs border border-border animate-fade-in-scale delay-0">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-[48px] font-normal tracking-[-0.03em] text-primary-foreground leading-tight animate-fade-in-up delay-75">
              Join Our Team
            </h1>
            <p className="mt-6 text-xl font-normal text-primary-foreground/80 leading-relaxed animate-fade-in-up delay-150">
              Help us revolutionize freight logistics safety and security. We're looking for talented
              individuals who are passionate about making a difference.
            </p>
          </div>
        </Container>
      </div>

      {/* Open Positions Section */}
      <Container className="py-12 md:px-0">
        <div className="mb-10 text-center animate-fade-in-up delay-200">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-foreground">
            Open Positions
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Explore our current openings and find the perfect role for your next career move.
          </p>
        </div>

        <div className="space-y-5">
          {jobOpenings.map((job, index) => (
            <div
              key={job.title}
              className={`bg-white rounded-xs border border-border p-6 sm:p-8 transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2 animate-fade-in-scale delay-${300 + index * 100}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                    <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground">{job.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-normal rounded-xs">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-surface-3 text-muted-foreground text-sm font-normal rounded-xs border border-border">
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{job.location}</p>
                  <p className="text-base text-foreground mb-4">{job.description}</p>
                  <div className="mb-4">
                    <h4 className="font-normal text-foreground mb-2 text-sm">Key Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
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

      {/* Why Join Us Section */}
      <Container className="py-12 md:px-0">
        <div className="mb-10 text-center animate-fade-in-up delay-700">
          <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.02em] text-foreground">
            Why Join Raisedash?
          </h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            Be part of a team that's making a real impact in logistics security.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xs border border-border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2 animate-fade-in-scale delay-800">
            <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-2">Impactful Work</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Your work directly contributes to protecting billions of dollars in freight and keeping supply chains secure.
            </p>
          </div>
          <div className="bg-white rounded-xs border border-border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2 animate-fade-in-scale delay-900">
            <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-2">Growth Opportunity</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Join a fast-growing company where you can shape the future of logistics security technology.
            </p>
          </div>
          <div className="bg-white rounded-xs border border-border p-6 transition-all duration-[0.15s] hover:-translate-y-0.5 hover:bg-surface-2 animate-fade-in-scale delay-1000">
            <h3 className="font-normal text-xl tracking-[-0.01em] text-foreground mb-2">Flexible Culture</h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Remote-friendly environment with competitive benefits and a team that values work-life balance.
            </p>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="pb-12 md:px-0">
        <div className="bg-white rounded-xs border border-border p-8 sm:p-12 text-center animate-fade-in-scale delay-1100">
          <h2 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-foreground mb-4">
            Don't See Your Perfect Role?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
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
