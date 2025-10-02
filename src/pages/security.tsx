import { Geist, Geist_Mono } from "next/font/google";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Security() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      {/* Hero Section */}
      <Container 
        className="flex items-center bg-white dark:bg-card mt-12 rounded-md border"
        style={{
          backgroundColor: '#ffffff',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23efefef' fill-opacity='0.16' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        <div className="w-full py-16 sm:py-24 md:py-28">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.01em] text-foreground">
            Security
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Security is a top priority at Raisedash. As an early-stage startup, we're building robust 
            security foundations to protect your freight logistics data with industry best practices.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </Container>

      {/* Security Content */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-16">
          <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Our Security Approach</h2>
              <p className="text-muted-foreground mb-4">
                As a growing startup, we take security seriously and are building our security foundation 
                with industry best practices. We understand that freight logistics involves sensitive cargo 
                information that needs protection.
              </p>
              <p className="text-muted-foreground mb-4">
                We're committed to implementing robust security measures as we scale, starting with the 
                fundamentals and continuously improving our security posture.
              </p>
              <div className="bg-muted rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Current Security Focus</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Data Encryption:</strong> All data encrypted in transit and at rest</li>
                  <li><strong>Secure Infrastructure:</strong> AWS-based secure hosting</li>
                  <li><strong>Access Controls:</strong> Strong authentication and authorization</li>
                  <li><strong>Regular Updates:</strong> Keeping systems and dependencies current</li>
                  <li><strong>Security Monitoring:</strong> Basic monitoring and alerting in place</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Infrastructure Security</h2>
              <p className="text-muted-foreground mb-4">
                Our platform is built on Amazon Web Services (AWS), leveraging their secure infrastructure 
                and security features to protect your data.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Current AWS Security Setup</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>AWS VPC:</strong> Isolated network environment</li>
                <li><strong>Security Groups:</strong> Firewall rules for application access</li>
                <li><strong>SSL/TLS:</strong> Encrypted connections for all traffic</li>
                <li><strong>AWS KMS:</strong> Encryption key management</li>
                <li><strong>CloudTrail:</strong> Basic logging and monitoring</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Planned Security Enhancements</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>AWS WAF for additional application protection</li>
                <li>Enhanced monitoring with AWS CloudWatch</li>
                <li>Automated security scanning and vulnerability assessment</li>
                <li>Advanced threat detection capabilities</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Data Protection and Encryption</h2>
              <p className="text-muted-foreground mb-4">
                We implement strong encryption to protect your data both in transit and at rest.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Current Encryption</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>TLS 1.2+:</strong> All data transmission encrypted</li>
                <li><strong>AES-256:</strong> Database and file encryption at rest</li>
                <li><strong>HTTPS Everywhere:</strong> Secure web connections</li>
                <li><strong>Secure APIs:</strong> All API endpoints use encryption</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Data Handling</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Minimal data collection - only what's necessary</li>
                <li>Secure data storage with access controls</li>
                <li>Regular data backups with encryption</li>
                <li>Data retention policies in development</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Access Control and Authentication</h2>
              <p className="text-muted-foreground mb-4">
                We implement strong access controls to ensure only authorized users can access your data.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Current Authentication</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Strong Passwords:</strong> Enforced password complexity requirements</li>
                <li><strong>Email Verification:</strong> Account verification required</li>
                <li><strong>Session Management:</strong> Secure session handling with timeouts</li>
                <li><strong>Password Reset:</strong> Secure password recovery process</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Planned Enhancements</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Multi-factor authentication (MFA) implementation</li>
                <li>Single sign-on (SSO) integration</li>
                <li>Role-based access controls</li>
                <li>Advanced session security</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Security Monitoring</h2>
              <p className="text-muted-foreground mb-4">
                We implement basic security monitoring to detect and respond to potential threats.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Current Monitoring</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Application Logs:</strong> Basic logging of security events</li>
                <li><strong>Error Monitoring:</strong> Tracking of application errors and anomalies</li>
                <li><strong>Uptime Monitoring:</strong> Service availability tracking</li>
                <li><strong>Basic Alerts:</strong> Notification of critical security events</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Incident Response</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Designated security contact for incidents</li>
                <li>Basic incident response procedures</li>
                <li>Customer notification process</li>
                <li>Post-incident review and improvement</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Security Roadmap</h2>
              <p className="text-muted-foreground mb-4">
                As we grow, we're committed to implementing additional security measures and working toward 
                industry certifications.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Current Focus</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Implementing security best practices</li>
                <li>Regular security assessments</li>
                <li>Employee security training</li>
                <li>Basic compliance with data protection laws</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Future Goals</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>SOC 2 Type I certification (planned for next year)</li>
                <li>Enhanced security monitoring and alerting</li>
                <li>Advanced threat detection capabilities</li>
                <li>Comprehensive security audit program</li>
                <li>Industry-specific compliance certifications</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Security Testing</h2>
              <p className="text-muted-foreground mb-4">
                We conduct regular security testing to identify and address potential vulnerabilities.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Current Testing</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Code Reviews:</strong> Regular security-focused code reviews</li>
                <li><strong>Dependency Scanning:</strong> Automated scanning for vulnerable dependencies</li>
                <li><strong>Basic Penetration Testing:</strong> Internal security assessments</li>
                <li><strong>Security Updates:</strong> Regular updates and patches</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Planned Enhancements</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Third-party security audits</li>
                <li>Automated vulnerability scanning</li>
                <li>Security training for development team</li>
                <li>Bug bounty program launch</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Data Backup and Recovery</h2>
              <p className="text-muted-foreground mb-4">
                We maintain regular backups and have basic disaster recovery procedures in place.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Current Backup Strategy</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Regular Backups:</strong> Daily automated backups of critical data</li>
                <li><strong>Encrypted Storage:</strong> All backups encrypted and stored securely</li>
                <li><strong>Multiple Locations:</strong> Backups stored in separate AWS regions</li>
                <li><strong>Retention Policy:</strong> 30-day backup retention</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Service Availability</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>AWS infrastructure with high availability</li>
                <li>Basic monitoring and alerting</li>
                <li>Automated failover capabilities</li>
                <li>Regular service health checks</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have security concerns, questions, or need to report a security issue, please contact us:
              </p>
              <div className="bg-muted rounded-lg p-6">
                <p className="text-foreground mb-2"><strong>Security Contact</strong></p>
                <p className="text-muted-foreground mb-2">Email: security@raisedash.com</p>
                <p className="text-muted-foreground mb-2">General Support: support@raisedash.com</p>
                <p className="text-muted-foreground">Response Time: 24-48 hours</p>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Security Issue Reporting</h3>
              <p className="text-muted-foreground mb-4">
                If you discover a security vulnerability, please report it responsibly:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Email: security@raisedash.com with "SECURITY ISSUE" in the subject</li>
                <li>Include detailed description of the issue</li>
                <li>Provide steps to reproduce if applicable</li>
                <li>Include your contact information for follow-up</li>
                <li>Allow us time to address the issue before public disclosure</li>
              </ul>
            </section>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
