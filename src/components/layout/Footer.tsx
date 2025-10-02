import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Footer() {
  return (
    <footer className="w-full bg-transparent mt-8 sm:mt-12">
      <Container className="rounded-md border bg-white dark:bg-card py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 md:col-span-2">
            <h3 className="text-lg font-semibold text-foreground mb-3 sm:mb-4">
              Raisedash
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-md text-sm sm:text-base leading-relaxed">
              Strengthening safety and security of corporations in freight logistics. 
              Get started in days, not months.
            </p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <span>Need help? <a href="mailto:support@raisedash.com" className="text-foreground hover:underline">support@raisedash.com</a></span>
            </div>
            {/* <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                See in Action
              </Button>
              <Button variant="ghost" size="sm">
                Request Demo
              </Button>
            </div> */}
          </div>

         

          {/* Company Links */}
          <div>
            <h4 className="font-medium text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="/about" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
               <li>
                 <a 
                   href="/blog" 
                   className="text-muted-foreground hover:text-foreground transition-colors"
                 >
                   Blog
                 </a>
               </li>
               <li>
                 <a 
                   href="/changelogs" 
                   className="text-muted-foreground hover:text-foreground transition-colors"
                 >
                   Changelog
                 </a>
               </li>
               <li>
                 <a 
                   href="/careers" 
                   className="text-muted-foreground hover:text-foreground transition-colors"
                 >
                   Careers
                 </a>
               </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
           {/* Product Links */}
           <div>
            <h4 className="font-medium text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a 
                  href="/terms-of-use" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </a>
              </li>
              <li>
                <a 
                  href="/privacy-policy" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a 
                  href="/security" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Security
                </a>
              </li>
             
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
               <span>© {new Date().getFullYear()} Raisedash</span>
               <span className="hidden sm:inline">|</span>
               <span>All rights reserved</span>
               <span className="hidden sm:inline">|</span>
               <span className="hidden sm:inline">Headquartered in San Francisco, California</span>
             </div>
             
             <div className="flex items-center gap-2 text-xs sm:text-sm">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                 <span className="text-green-700 dark:text-green-400 font-medium">All Systems Operational</span>
               </div>
             </div>
            
            {/* <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Theme</span>
                <ThemeToggle />
              </div>
              
               <div className="flex items-center gap-4">
                 <a 
                   href="/privacy-policy" 
                   className="text-muted-foreground hover:text-foreground transition-colors"
                 >
                   Privacy Policy
                 </a>
                 <span className="text-muted-foreground">|</span>
                 <a 
                   href="/terms-of-use" 
                   className="text-muted-foreground hover:text-foreground transition-colors"
                 >
                   Terms of Use
                 </a>
                 
               </div>
            </div> */}
          </div>
        </div>
      </Container>
    </footer>
  );
}