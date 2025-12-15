import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Header } from "@/components/layout/Header";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideHeader = router.pathname.startsWith("/products/raisedash-vertex") ||
                     router.pathname.startsWith("/products/raisedash-pti-inspections");

  return (
    <>
      {!hideHeader && <Header />}
      <Component {...pageProps} />
    </>
  );
}
