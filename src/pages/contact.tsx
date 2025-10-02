import { Geist, Geist_Mono } from "next/font/google";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const contactMethods = [
  {
    title: "Sales Inquiries",
    description: "Get in touch with our sales team to learn more about our solutions.",
    email: "sales@raisedash.com",
    phone: "+1 (555) 123-4567",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Support",
    description: "Need help with your existing Raisedash implementation?",
    email: "support@raisedash.com",
    phone: "+1 (555) 123-4568",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
      </svg>
    )
  },
  {
    title: "Partnerships",
    description: "Interested in partnering with us? Let's explore opportunities.",
    email: "partnerships@raisedash.com",
    phone: "+1 (555) 123-4569",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

const offices = [
  {
    city: "San Francisco",
    address: "123 Market Street, Suite 400",
    address2: "San Francisco, CA 94105",
    phone: "+1 (555) 123-4567"
  },
  {
    city: "New York",
    address: "456 Broadway, Floor 12",
    address2: "New York, NY 10013",
    phone: "+1 (555) 123-4568"
  },
  {
    city: "Chicago",
    address: "789 Michigan Avenue, Suite 200",
    address2: "Chicago, IL 60611",
    phone: "+1 (555) 123-4569"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    inquiryType: 'sales'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

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
            Get in Touch
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Ready to secure your freight operations? We're here to help. 
            Contact us to learn more about our solutions or get started today.
          </p>
        </div>
      </Container>

      {/* Contact Form Section */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground mb-6">
                Send us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="Your Company"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-foreground mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    >
                      <option value="sales">Sales Inquiry</option>
                      <option value="support">Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                      placeholder="Tell us more about your needs..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="bg-muted rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-primary-foreground flex-shrink-0">
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {method.title}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {method.description}
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Email:</span> {method.email}
                          </p>
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Phone:</span> {method.phone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Office Locations */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground mb-4">
              Our Offices
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We have offices across the United States to serve our clients better.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{office.city}</h3>
                <div className="text-muted-foreground space-y-1">
                  <p>{office.address}</p>
                  <p>{office.address2}</p>
                  <p className="font-medium">{office.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* FAQ Section */}
      <Container className="bg-white dark:bg-card mt-8 rounded-md border">
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold tracking-[-0.01em] text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our services and solutions.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                How quickly can we get started with Raisedash?
              </h3>
              <p className="text-muted-foreground">
                Most implementations can be completed within 2-4 weeks, depending on your specific requirements and infrastructure setup.
              </p>
            </div>
            
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Do you offer 24/7 support?
              </h3>
              <p className="text-muted-foreground">
                Yes, we provide 24/7 monitoring and support for all our security solutions to ensure your cargo is always protected.
              </p>
            </div>
            
            <div className="border-b border-border pb-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Can Raisedash integrate with our existing systems?
              </h3>
              <p className="text-muted-foreground">
                Absolutely. Our solutions are designed to integrate seamlessly with most logistics and ERP systems through our comprehensive API.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                What makes Raisedash different from other security solutions?
              </h3>
              <p className="text-muted-foreground">
                Our AI-powered approach provides real-time threat detection and predictive analytics, going beyond traditional security measures to prevent incidents before they occur.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
