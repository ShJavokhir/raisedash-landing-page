import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

const COMPLIANCE_CHALLENGES = {
  "Driver Qualification Files (DQF)": [
    "Forgot to pull pre-employment MVR?",
    "Driver's medical card expired yesterday?",
    "Missing documents in your driver files?",
    "Driver's CDL expired and no one noticed?",
    "Driver file wouldn't survive an audit?",
    "Employment application missing required fields?",
  ],
  "Drug & Alcohol Testing": [
    "Need to run a Clearinghouse query?",
    "Missed the annual limited query deadline?",
    "Random testing pool selections overdue?",
    "Post-accident test window closing in hours?",
    "Pre-employment drug test results lost in email?",
    "Not hitting your 50% drug / 10% alcohol testing rates?",
  ],
  "Employer Verification": [
    "Previous employer won't respond to your inquiry?",
    "30-day deadline for employment verification approaching?",
    "Can't prove 'good faith effort' to contact employers?",
    "Safety performance history investigation incomplete?",
  ],
  "Medical Certificates": [
    "Medical certificate expiring this month?",
    "Driver operating with an expired DOT physical?",
    "Forgot to check if examiner is on National Registry?",
    "CDLIS MVR doesn't match driver's medical card?",
  ],
  "Motor Vehicle Records (MVR)": [
    "Annual MVR pull date missed?",
    "Driver had violations you didn't know about?",
    "No documented review of the MVR you pulled?",
    "MVR shows suspension but driver is still driving?",
  ],
  "Hours of Service (HOS)": [
    "Unassigned drive time piling up?",
    "HOS violations hurting your CSA score?",
    "ELD data scattered across multiple providers?",
    "30-minute break violations mounting?",
  ],
  "Vehicle Maintenance": [
    "Annual inspection due date missed?",
    "DVIR defects not certified before operation?",
    "Pre-trip inspection completion not tracked?",
  ],
  "CSA Scores & Safety": [
    "Don't know which drivers are hurting your score?",
    "DataQs dispute deadline missed?",
    "Unsafe Driving BASIC over 65%?",
  ],
  "DOT Audits": [
    "DOT audit notice arrived with 48-hour deadline?",
    "Can't find the documents auditors requested?",
    "No idea if you'd pass a mock audit?",
    "Safety rating downgraded to Conditional?",
  ],
  "Driver Training": ["Onboarding training checklist incomplete?"],
  "Accident Management": [
    "Accident register not maintained?",
    "Post-accident drug test window expired?",
    "Crash rate trending above industry average?",
    "Root cause analysis not documented?",
  ],
  "General Compliance Chaos": [
    "Compliance spread across spreadsheets and emails?",
    "No single source of truth for driver status?",
    "Expiration dates tracked on sticky notes?",
    "Audit prep takes weeks instead of minutes?",
    "Can't answer 'are we compliant?' in one click?",
    "Small fleet, no dedicated safety department?",
    "New driver onboarding takes weeks instead of days?",
    "No idea if you're actually DOT-ready right now?",
  ],
};

function ChallengeBadge({ text }: { text: string }) {
  return (
    <span className="bg-card text-muted-foreground border-border inline-flex items-center rounded-xs border px-3 py-2 text-base">
      {text}
    </span>
  );
}

export default function ComplianceChallenges() {
  const categories = Object.entries(COMPLIANCE_CHALLENGES);
  const totalChallenges = categories.reduce((sum, [, items]) => sum + items.length, 0);

  return (
    <PageLayout
      title="Fleet Compliance Challenges"
      description={`${totalChallenges} common DOT compliance challenges facing trucking companies. From DQF management to CSA scores, drug testing to audit prep. See how Raisedash solves each one.`}
      keywords={[
        "DOT compliance challenges",
        "trucking compliance issues",
        "fleet safety problems",
        "driver qualification files",
        "CSA score management",
        "DOT audit preparation",
        "drug alcohol testing compliance",
        "MVR tracking",
        "HOS violations",
        "FMCSA compliance",
      ]}
    >
      <Container className="py-16">
        <div className="mb-12 text-center">
          <h1 className="text-foreground text-3xl font-normal tracking-[-0.02em] sm:text-4xl">
            Fleet Compliance Challenges
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            {totalChallenges} common compliance headaches that keep fleet managers up at night.
            Sound familiar?
          </p>
        </div>

        <div className="space-y-10">
          {categories.map(([category, challenges]) => (
            <section key={category} className="bg-card border-border rounded-xs border p-6 sm:p-8">
              <h2 className="text-foreground mb-5 text-xl font-normal">{category}</h2>
              <div className="flex flex-wrap gap-3">
                {challenges.map((challenge) => (
                  <ChallengeBadge key={challenge} text={challenge} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6 text-lg">
            Raisedash eliminates these headaches with continuous compliance automation.
          </p>
          <Link href="/">
            <Button variant="primary" size="lg">
              See How We Solve This <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Container>
    </PageLayout>
  );
}
