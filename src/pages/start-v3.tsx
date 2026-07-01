import { useEffect, useState } from "react";
import Head from "next/head";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { SEO } from "@/components/seo/SEO";
import { Logo } from "@/components/start/logo";
import { MetaPixel } from "@/components/start/meta-pixel";
import { Card, CardContent } from "@/components/start/card";
import { buttonVariants } from "@/components/start/button";
import { trackPixel } from "@/lib/meta-pixel";
import { cn } from "@/lib/utils";

/**
 * Meta-ad landing for the paid course platform (Raisedash Academy). The Plan-B
 * "buy now" sibling of /start-v2: instead of capturing a lead for manual follow-up,
 * it sells the academy and hands the visitor off to the separate course app
 * (academy.raisedash.com) to sign up and pay. Self-contained so editing it can never
 * regress the live /start-v2 lead funnel.
 *
 * Attribution (fbclid + UTMs) is forwarded in the handoff URL so the course app's
 * Pixel + CAPI can attribute the eventual Purchase back to this ad. noindex/nofollow:
 * paid-traffic entry point, intentionally not in the sitemap.
 */

const ACADEMY_URL = (
  process.env.NEXT_PUBLIC_ACADEMY_URL || "https://academy.raisedash.com"
).replace(/\/$/, "");

const FORWARD_PARAMS = [
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

type Locale = "uz" | "en";

const MESSAGES: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    oneTime: string;
    included: string[];
    cta: string;
    haveAccess: string;
    signIn: string;
    secured: string;
  }
> = {
  uz: {
    eyebrow: "AQSH trucking haydovchilari va kompaniyalari uchun",
    title: "Trucking compliance va haydovchilikni telefoningizda o‘rganing",
    subtitle:
      "FMCSA qoidalari, ish soatlari, tekshiruvlar, giyohvand va alkogol, ingliz tili (ELP) — qisqa video va matnli darslar. Bir marta to‘lang, hammasi ochiladi.",
    oneTime: "Bir martalik to‘lov · abadiy kirish",
    included: [
      "20+ modul: compliance va safety",
      "Har bir darsning video va matn versiyasi",
      "Ingliz tili (ELP) va haydovchi tayyorlash",
      "Yangi darslar qo‘shimcha to‘lovsiz",
    ],
    cta: "Kirish olish",
    haveAccess: "Allaqachon sotib oldingizmi?",
    signIn: "Kirish",
    secured: "Xavfsiz to‘lov · Stripe",
  },
  en: {
    eyebrow: "For US trucking drivers & carriers",
    title: "Learn trucking compliance & driving — on your phone",
    subtitle:
      "FMCSA rules, hours of service, inspections, drug & alcohol, English (ELP) — short video and text lessons. Pay once, unlock everything.",
    oneTime: "One-time payment · lifetime access",
    included: [
      "20+ modules of compliance & safety",
      "Video and text version of every lesson",
      "English (ELP) practice & driver training",
      "New lessons at no extra cost",
    ],
    cta: "Get access",
    haveAccess: "Already bought?",
    signIn: "Sign in",
    secured: "Secure payment · Stripe",
  },
};

function buildAcademyUrl(path: string): string {
  const target = new URL(ACADEMY_URL + path);
  if (typeof window !== "undefined") {
    const src = new URLSearchParams(window.location.search);
    for (const key of FORWARD_PARAMS) {
      const value = src.get(key);
      if (value) target.searchParams.set(key, value);
    }
  }
  return target.toString();
}

export default function StartV3Page() {
  const [locale, setLocale] = useState<Locale>("uz");
  const t = MESSAGES[locale];

  // Build handoff URLs after mount so we can forward the click's attribution.
  const [signupHref, setSignupHref] = useState(`${ACADEMY_URL}/signup?next=/buy`);
  const [loginHref, setLoginHref] = useState(`${ACADEMY_URL}/login`);
  useEffect(() => {
    setSignupHref(buildAcademyUrl("/signup?next=/buy"));
    setLoginHref(buildAcademyUrl("/login"));
  }, []);

  return (
    <>
      <SEO
        title="Raisedash Academy — trucking compliance & driver training"
        description="Short video and text lessons on FMCSA rules, hours of service, inspections, and driver skills. One-time payment, lifetime access."
        noindex
        nofollow
      />
      <Head>
        <link rel="preconnect" href="https://connect.facebook.net" />
      </Head>

      <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5">
        <header className="relative flex items-center justify-center py-6">
          <Logo size={30} priority />
          <div className="border-border bg-card absolute right-0 inline-flex items-center gap-1 rounded-full border p-0.5 text-sm">
            {(["uz", "en"] as Locale[]).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocale(loc)}
                aria-pressed={loc === locale}
                className={cn(
                  "rounded-full px-2.5 py-1 font-medium transition-colors",
                  loc === locale ? "bg-foreground text-background" : "text-muted-foreground"
                )}
              >
                {loc === "uz" ? "O‘zbekcha" : "English"}
              </button>
            ))}
          </div>
        </header>

        <main className="flex flex-1 flex-col pb-10">
          <div className="pt-4 text-center">
            <p className="text-primary text-sm font-medium">{t.eyebrow}</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              {t.title}
            </h1>
            <p className="text-muted-foreground mx-auto mt-3 max-w-sm text-pretty">{t.subtitle}</p>
          </div>

          <Card className="mt-7">
            <CardContent className="space-y-5 py-6">
              <p className="text-muted-foreground text-sm font-medium">{t.oneTime}</p>
              <ul className="space-y-2.5">
                {t.included.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={signupHref}
                onClick={() => trackPixel("Lead", { content_name: "start_v3_get_access" })}
                className={cn(buttonVariants(), "h-12 w-full gap-2 rounded-xl text-base")}
              >
                {t.cta}
                <ArrowRight className="size-5" />
              </a>
              <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-xs">
                <ShieldCheck className="size-3.5" />
                {t.secured}
              </p>
            </CardContent>
          </Card>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            {t.haveAccess}{" "}
            <a href={loginHref} className="text-primary font-medium underline">
              {t.signIn}
            </a>
          </p>
        </main>

        <MetaPixel contentName="start_v3" />
      </div>
    </>
  );
}
