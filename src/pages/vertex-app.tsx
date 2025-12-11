import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { PageLayout } from "@/components/layout/PageLayout";

export default function VertexApp() {
  return (
    <PageLayout
      title="Download Raisedash Vertex"
      description="Download Raisedash Vertex for Drivers - Real-time freight tracking and automated arrival alerts."
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Container className="py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.01em] text-foreground mb-4">
                Download Raisedash Vertex
              </h1>

            </div>

            <div className="space-y-4">
              <Link
                href="https://apps.apple.com/us/app/raisedash-vertex-for-drivers/id6756031243"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  size="lg"
                  className="w-full flex items-center justify-center gap-3"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Download for iOS
                </Button>
              </Link>

              <Link
                href="https://play.google.com/store/apps/details?id=com.raisedash.vertex.raisedash_vertex&hl=en_US"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-3"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.53 20.75,12C20.75,12.47 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  Download for Android
                </Button>
              </Link>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              <p>Available on App Store and Google Play Store</p>
            </div>
          </div>
        </Container>
      </div>
    </PageLayout>
  );
}
