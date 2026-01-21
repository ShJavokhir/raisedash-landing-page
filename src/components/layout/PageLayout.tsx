import { Inter } from "next/font/google";
import { SEO, SEOProps } from "@/components/seo/SEO";
import { Footer } from "./Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

interface PageLayoutProps extends SEOProps {
  children: React.ReactNode;
}

export function PageLayout({
  children,
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType,
  noindex,
  nofollow,
  article,
  product,
  jsonLd,
}: PageLayoutProps) {
  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        ogImage={ogImage}
        ogType={ogType}
        noindex={noindex}
        nofollow={nofollow}
        article={article}
        product={product}
        jsonLd={jsonLd}
      />
      <div className={`${inter.className} font-sans antialiased`}>
        {children}
        <div className="mt-4 sm:mt-6">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default PageLayout;
