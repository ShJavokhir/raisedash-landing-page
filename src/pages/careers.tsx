import { Geist, Geist_Mono } from "next/font/google";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { JobApplicationForm } from "@/components/JobApplicationForm";
import { useState } from "react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jobOpenings = [
  {
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco Bay Area / Remote",
    type: "Full-time",
    description: "Join our engineering team to build the next generation of freight security solutions.",
    requirements: [
      "5+ years of software development experience",
      "Expertise in React, Node.js, and cloud technologies",
      "Experience with security-focused applications",
      "Strong problem-solving and communication skills"
    ]
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
      "Strong client-facing and presentation skills"
    ]
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
      "Background in logistics or security preferred"
    ]
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
      "Strong automation and scripting skills"
    ]
  }
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
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      {/* Hero Section */}
      {/* <Container 
        className="flex items-center bg-white dark:bg-card mt-12 rounded-md border"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23efefef' fill-opacity='0.16' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        <div className="w-full py-16 sm:py-24 md:py-28">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            Join Our Team
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Help us revolutionize freight security. We're building the future of logistics 
            protection and need talented individuals to join our mission.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg">View Open Positions</Button>
            <Button variant="secondary" size="lg">Learn About Our Culture</Button>
          </div>
        </div>
      </Container> */}

      {/* Culture Section */}
      {/* <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground mb-4">
              Our Culture
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              At Raisedash, we believe that great products come from great teams. 
              We foster an environment of innovation, collaboration, and continuous learning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Collaborative</h3>
              <p className="text-muted-foreground">
                We work together across teams to solve complex problems and deliver exceptional results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Innovative</h3>
              <p className="text-muted-foreground">
                We encourage creative thinking and embrace new technologies to stay ahead of the curve.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Learning-Focused</h3>
              <p className="text-muted-foreground">
                We invest in our team's growth with learning opportunities and professional development.
              </p>
            </div>
          </div>
        </div>
      </Container> */}

    

      {/* Open Positions Section */}
      <Container className="bg-white dark:bg-card mt-18 rounded-md border">
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
            {jobOpenings.map((job, index) => (
              <div key={index} className="border border-border rounded-lg p-6 hover:shadow-cal-sm transition-shadow">
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
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={() => handleApplyClick(job.title)}>Apply Now</Button>
                    {/* <Button variant="secondary">Learn More</Button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-16 text-center">
          <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground mb-4">
            Don't See Your Perfect Role?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional talent. Send us your resume and let us know 
            how you'd like to contribute to our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {/* <Button size="lg">Send Your Resume</Button> */}
              <Link href="/contact">
                <Button variant="secondary" size="lg">Contact Our Team</Button>
              </Link>
          </div>
        </div>
      </Container>

      <div className="mt-8 sm:mt-12">
        <Footer />
      </div>

      {/* Job Application Form Modal */}
      {selectedJob && (
        <JobApplicationForm
          jobTitle={selectedJob}
          isOpen={isApplicationFormOpen}
          onClose={handleCloseApplicationForm}
        />
      )}
    </div>
  );
}
