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
      description="Join the Raisedash team. Explore career opportunities and help us revolutionize freight logistics security."
    >
      {/* Open Positions Section */}
      <Container className="bg-white dark:bg-card mt-18 rounded-md border ui-corner-accents">
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our current openings and find the perfect role for your next career move.
            </p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div
                key={job.title}
                className="border border-border rounded-lg p-6 hover:shadow-cal-sm transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-md">
                          {job.department}
                        </span>
                        <span className="px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded-md">
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{job.location}</p>
                    <p className="text-foreground mb-4">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Key Requirements:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {job.requirements.map((req) => (
                          <li key={req}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={() => handleApplyClick(job.title)}>Apply Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
        <div className="py-16 text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground mb-4">
            Don't See Your Perfect Role?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional talent. Send us your resume and let us know how
            you'd like to contribute to our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Contact Our Team
              </Button>
            </Link>
          </div>
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
