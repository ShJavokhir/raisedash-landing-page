import { Geist, Geist_Mono } from "next/font/google";
import { SEO, SEOProps } from "@/components/seo/SEO";
import { Footer } from "./Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
        {children}
        <div className="mt-4 sm:mt-6">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default PageLayout;
