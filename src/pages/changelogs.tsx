import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/Button";

interface ChangelogEntry {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  changes: {
    type: "feature" | "improvement" | "fix" | "breaking";
    title: string;
    description: string;
  }[];
}

const changelogData: ChangelogEntry[] = [
  {
    version: "2.1.0",
    date: "2024-01-15",
    type: "minor",
    changes: [
      {
        type: "feature",
        title: "Real-time Analytics Dashboard",
        description:
          "New comprehensive dashboard showing live security metrics and threat detection statistics.",
      },
      {
        type: "improvement",
        title: "Enhanced API Performance",
        description:
          "Reduced API response times by 40% through optimized database queries and caching.",
      },
      {
        type: "feature",
        title: "Mobile App Support",
        description: "Native mobile applications for iOS and Android with full feature parity.",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "2023-12-20",
    type: "major",
    changes: [
      {
        type: "breaking",
        title: "New Authentication System",
        description:
          "Migrated to OAuth 2.0 with enhanced security. Existing API keys will need to be regenerated.",
      },
      {
        type: "feature",
        title: "AI-Powered Threat Detection",
        description:
          "Machine learning algorithms now automatically detect and classify security threats.",
      },
      {
        type: "feature",
        title: "Multi-tenant Architecture",
        description: "Support for multiple organizations with isolated data and configurations.",
      },
      {
        type: "improvement",
        title: "Redesigned User Interface",
        description: "Complete UI overhaul with improved usability and accessibility features.",
      },
    ],
  },
  {
    version: "1.8.3",
    date: "2023-11-28",
    type: "patch",
    changes: [
      {
        type: "fix",
        title: "Security Vulnerability Patch",
        description: "Fixed critical security issue in user authentication flow.",
      },
      {
        type: "fix",
        title: "Data Export Bug",
        description:
          "Resolved issue where large data exports would fail for datasets over 100k records.",
      },
      {
        type: "improvement",
        title: "Error Handling",
        description: "Improved error messages and logging for better debugging experience.",
      },
    ],
  },
  {
    version: "1.8.0",
    date: "2023-11-10",
    type: "minor",
    changes: [
      {
        type: "feature",
        title: "Advanced Reporting",
        description:
          "New reporting engine with customizable templates and automated scheduling.",
      },
      {
        type: "feature",
        title: "Integration Hub",
        description: "Pre-built integrations with popular logistics platforms and ERP systems.",
      },
      {
        type: "improvement",
        title: "Database Optimization",
        description: "Significant performance improvements for large-scale deployments.",
      },
    ],
  },
];

export default function Changelogs() {
  return (
    <PageLayout
      title="Changelog"
      description="Stay up to date with the latest features, improvements, and fixes in Raisedash."
    >
      {/* Hero Section */}
      <Container className="flex items-center bg-white dark:bg-card mt-12 rounded-md border ui-corner-accents">
        <div className="w-full py-16">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            Changelog
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Stay up to date with the latest features, improvements, and fixes in Raisedash.
          </p>
        </div>
      </Container>

      {/* Changelog Entries */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
        <div className="py-16">
          <div className="space-y-12">
            {changelogData.map((entry) => (
              <div key={entry.version} className="border-l-2 border-border pl-8">
                {/* Version Header */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl font-bold text-foreground">v{entry.version}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Changes */}
                <div className="space-y-4">
                  {entry.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{change.title}</h3>
                        <p className="text-muted-foreground">{change.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border ui-corner-accents">
        <div className="py-16 text-center">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Want to be notified of updates?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified about new features, security updates, and
            important announcements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/request-demo">
              <Button>Request Demo</Button>
            </Link>
            <a href="mailto:support@raisedash.com">
              <Button variant="secondary">Contact Support</Button>
            </a>
          </div>
        </div>
      </Container>
    </PageLayout>
  );
}
