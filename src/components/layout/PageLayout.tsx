import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import { Footer } from "./Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PageLayout({
  children,
  title = "Raisedash",
  description = "Safety & Security in Days. Raisedash strengthens safety and security of corporations in freight logistics.",
}: PageLayoutProps) {
  const fullTitle = title === "Raisedash" ? title : `${title} | Raisedash`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
