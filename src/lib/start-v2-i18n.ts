/**
 * Translations for the /start-v2 lead funnel (a Meta-ad destination for
 * driver-training campaigns whose audience is largely Uzbek-speaking carriers).
 *
 * SAFETY: this file translates ONLY what the user SEES. The canonical option
 * `value`s in src/lib/start-v2.ts are never touched — the funnel still POSTs those
 * exact values, the API route still validates against them, and the Telegram
 * notification still resolves its English labels server-side. So switching the UI
 * language can never change the lead payload, Meta Pixel/CAPI events, or what the
 * team reads in Telegram. Pure data (no React) so it is safe to import anywhere.
 *
 * Adding a language later = add a `Locale`, one `MESSAGES[locale]` block, and one
 * `OPTION_LABELS[locale]` block. The English option labels are derived from the
 * canonical lists, so they can never drift.
 */
import { DRIVER_PROBLEMS, FLEET_SIZES, ROLES, type Choice } from "@/lib/start-v2";

export const LOCALES = ["uz", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** The /start-v2 ad audience is Uzbek-speaking, so Uzbek is the default for everyone. */
export const DEFAULT_LOCALE: Locale = "uz";

/** Native-name labels shown in the language dropdown. */
export const LOCALE_LABELS: Record<Locale, string> = {
  uz: "Oʻzbekcha",
  en: "English",
};

// ── UI strings ───────────────────────────────────────────────────────────────

export interface StartV2Messages {
  nav: { language: string };
  /** Static <head> copy (rendered at DEFAULT_LOCALE; page is noindex/nofollow). */
  seo: { title: string; description: string };
  footer: { privacy: string; terms: string };
  progress: { back: string };
  common: { continue: string };
  error: { generic: string };
  fleet: { title: string };
  problems: { title: string; subtitle: string };
  role: { title: string };
  name: { title: string; label: string };
  contact: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailHint: string;
    phoneLabel: string;
    phoneHint: string;
  };
  company: {
    title: string;
    subtitle: string;
    dotLabel: string;
    dotPlaceholder: string;
    dotHint: string;
    companyLabel: string;
    companyPlaceholder: string;
    dontKnow: string;
    submit: string;
    sending: string;
    reassurance: string;
  };
  done: { title: string; body: string; cta: string };
}

/** English copy — kept byte-identical to the original hardcoded strings so that
 *  switching to English reproduces today's page exactly. */
const EN: StartV2Messages = {
  nav: { language: "Language" },
  seo: {
    title: "Get your drivers trained & road-ready",
    description:
      "Tell us about your fleet and we’ll reach out with a plan to train your drivers — English proficiency, road signs, safety, and more.",
  },
  footer: { privacy: "Privacy Policy", terms: "Terms of Use" },
  progress: { back: "Back" },
  common: { continue: "Continue" },
  error: { generic: "Something went wrong — please try again." },
  fleet: { title: "How many trucks does your company run?" },
  problems: {
    title: "What do your drivers need help with?",
    subtitle: "Pick all that apply.",
  },
  role: { title: "What’s your role in the company?" },
  name: { title: "What should we call you?", label: "Full name" },
  contact: {
    title: "How can we reach you?",
    subtitle: "We’ll use this to follow up about your drivers — no spam, ever.",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.com",
    emailHint: "Enter a valid email address.",
    phoneLabel: "Phone number",
    phoneHint: "Enter your phone number, including country code.",
  },
  company: {
    title: "Last step — your USDOT number.",
    subtitle: "It helps us pull your carrier’s record before we reach out. Optional.",
    dotLabel: "USDOT number (optional)",
    dotPlaceholder: "e.g. 1234567",
    dotHint: "A USDOT number is 5–8 digits.",
    companyLabel: "Company name",
    companyPlaceholder: "Your company’s legal name",
    dontKnow: "I don’t know my USDOT number",
    submit: "Request a callback",
    sending: "Sending…",
    reassurance: "We use your details only to reach out about your drivers. No spam, ever.",
  },
  done: {
    title: "Thanks — we’ll be in touch soon.",
    body: "We’ve got your details. A Raisedash specialist will reach out shortly to help get your drivers trained and road-ready.",
    cta: "See features",
  },
};

/** Uzbek copy (Latin script). */
const UZ: StartV2Messages = {
  nav: { language: "Til" },
  seo: {
    title: "Haydovchilaringizni tayyorlang va yoʻlga shay qiling",
    description:
      "Parkingiz haqida bizga ayting — haydovchilaringizni oʻqitish rejasi bilan bogʻlanamiz: ingliz tili, yoʻl belgilari, xavfsizlik va boshqalar.",
  },
  footer: { privacy: "Maxfiylik siyosati", terms: "Foydalanish shartlari" },
  progress: { back: "Orqaga" },
  common: { continue: "Davom etish" },
  error: { generic: "Xatolik yuz berdi — qaytadan urinib koʻring." },
  fleet: { title: "Kompaniyangizda nechta truck bor?" },
  problems: {
    title: "Haydovchilaringizga nimada yordam kerak?",
    subtitle: "Mos keladiganlarini belgilang.",
  },
  role: { title: "Kompaniyada sizning lavozimingiz qanday?" },
  name: { title: "To'liq ismingizni yozing", label: "Toʻliq ism" },
  contact: {
    title: "Platoforma bo'yicha siz bilan qanday bogʻlansak boʻladi?",
    subtitle: "Bundan faqat platforma boʻyicha bogʻlanish uchun foydalanamiz — spam yoʻq.",
    emailLabel: "Elektron pochta",
    emailPlaceholder: "siz@kompaniya.com",
    emailHint: "Toʻgʻri elektron pochta manzilini kiriting.",
    phoneLabel: "Telefon raqami",
    phoneHint: "Telefon raqamingizni mamlakat kodi bilan kiriting.",
  },
  company: {
    title: "Soʻnggi qadam — USDOT raqamingiz.",
    subtitle: "",
    dotLabel: "USDOT raqami (ixtiyoriy)",
    dotPlaceholder: "masalan, 1234567",
    dotHint: "USDOT raqami 5–8 ta raqamdan iborat.",
    companyLabel: "Kompaniya nomi",
    companyPlaceholder: "Kompaniyangizning rasmiy nomi",
    dontKnow: "USDOT raqamimni bilmayman",
    submit: "Jo'natish",
    sending: "Yuborilmoqda…",
    reassurance:
      "Maʼlumotlaringizdan faqat haydovchilaringiz boʻyicha bogʻlanish uchun foydalanamiz. Spam yoʻq.",
  },
  done: {
    title: "Rahmat — tez orada bogʻlanamiz.",
    body: "Maʼlumotlaringizni oldik. Raisedash mutaxassisi tez orada bogʻlanib, demo va haydovchilaringizni tayyorlashga yordam beradi.",
    cta: "Imkoniyatlarni koʻrish",
  },
};

export const MESSAGES: Record<Locale, StartV2Messages> = { uz: UZ, en: EN };

// ── Option labels (keyed by canonical value) ─────────────────────────────────
// English is derived from the canonical lists so it can never drift; only the
// Uzbek labels are hand-written. `value`s are NEVER translated.

type OptionLabels = {
  fleet: Record<string, string>;
  problems: Record<string, string>;
  roles: Record<string, string>;
};

const labelsFrom = (choices: Choice[]): Record<string, string> =>
  Object.fromEntries(choices.map((c) => [c.value, c.label]));

const UZ_FLEET: Record<string, string> = {
  "1": "1 ta — owner-operator",
  "2-5": "2–5 ta truck",
  "6-20": "6–20 ta truck",
  "21-50": "21–50 ta truck",
  "50+": "50 ta yoki undan ko'p",
};

const UZ_PROBLEMS: Record<string, string> = {
  english: "Ingliz tilini bilish (ELP)",
  road_signs: "Yo'l belgilari",
  general_training: "Umumiy haydovchi tayyorlash",
  safety: "Safety va compliance",
  hos: "Ish soatlari (HOS) qoidalari",
  onboarding: "Yangi haydovchini ishga olish",
  drug_alcohol: "Giyohvand moddalar va alkogol boʻyicha bilim",
};

const UZ_ROLES: Record<string, string> = {
  owner: "Egasi",
  manager: "Menejer",
  decision_maker: "Qaror qabul qiluvchi",
  employee: "Xodim",
  other: "Boshqa",
};

export const OPTION_LABELS: Record<Locale, OptionLabels> = {
  en: {
    fleet: labelsFrom(FLEET_SIZES),
    problems: labelsFrom(DRIVER_PROBLEMS),
    roles: labelsFrom(ROLES),
  },
  uz: { fleet: UZ_FLEET, problems: UZ_PROBLEMS, roles: UZ_ROLES },
};

/**
 * Map canonical choices to display choices in the active language. The `value`
 * is carried through unchanged; only the visible `label` is swapped (falling back
 * to the canonical English label if a translation is somehow missing).
 */
export function localizedChoices(choices: Choice[], labels: Record<string, string>): Choice[] {
  return choices.map((c) => ({ value: c.value, label: labels[c.value] ?? c.label }));
}
