import type { Copy } from "./en";

export const uz: Copy = {
  seo: {
    title: "Raisedash demo koʻrish",
    description:
      "Raisedash vositalarini demo rejimda koʻring. Qanday ishlashini koʻrsatamiz, narxlarni aytamiz va sozlashda yordam beramiz.",
  },
  hero: {
    title: "Demo koʻring va sozlashni boshlang",
    body: (productName?: string) =>
      productName
        ? `${productName} qanday ishlashini koʻrsatamiz, narxlarni aytamiz va sozlashda yordam beramiz. Biz bilan bogʻlanishning oʻzingizga eng qulay usulini tanlang.`
        : "Qaysi vosita sizni qiziqtirishini aytib bering. Raisedash jamoasi uning qanday ishlashini koʻrsatadi, narxlarni aytadi va sozlashda yordam beradi.",
  },
  choices: {
    aria: "Biz bilan bogʻlanish usullari",
    telegram: "Telegramda yozish",
    email: "Email yozish",
    booking: "Qoʻngʻiroq vaqtini belgilash",
    bookingNote: "Oʻzingizga qulay vaqtni tanlang.",
    details: "Maʼlumotlaringizni qoldirish",
    detailsNote: "Demoni kelishib olish uchun oʻzimiz bogʻlanamiz.",
  },
  emailHelp: {
    body: "Pochta ilovasi ochilmadimi? Manzilimizdan nusxa oling va istalgan ilovadan bizga email yuboring.",
    copy: "Nusxa olish",
    copied: "Nusxa olindi",
  },
  back: "Bogʻlanishning boshqa usullari",
  formSectionAria: "Demo soʻrovi",
  telegramHelp: {
    noTelegram: (email: string) =>
      `Telegram yoʻqmi? ${email} manziliga email yozing yoki maʼlumotlaringizni qoldiring, oʻzimiz bogʻlanamiz.`,
    leaveDetails: "Maʼlumotlaringizni qoldirish",
  },
  form: {
    heading: "Sizga nima kerakligini aytib bering.",
    intro: "Qaysi vositani koʻrsatishimizni bilishimiz uchun bir nechta maʼlumot kerak.",
    noscript:
      "Formadan foydalanish uchun brauzerda JavaScriptni yoqing yoki biz bilan email yoxud Telegram orqali bogʻlaning.",
    legend: "Aloqa maʼlumotlaringiz va sizni qiziqtirgan mahsulotlar",
    fullName: "Ism va familiya",
    email: "Email manzili",
    phone: "Telefon raqami (ixtiyoriy)",
    phonePlaceholder: "Mamlakat kodi bilan kiriting",
    company: "Kompaniya (ixtiyoriy)",
    interests: "Sizni qiziqtirgan mahsulotlar",
    interestsPlaceholder: "Qaysi vositalarni koʻrmoqchisiz? Qanday muammoni hal qilmoqchisiz?",
    submit: "Soʻrov yuborish",
    submitAria: "Soʻrov yuborish",
    sendingAria: "Soʻrov yuborilmoqda",
    sending: "Soʻrov yuborilmoqda…",
    privacyNote: "Maʼlumotlaringizdan soʻrovingizga javob berish uchun foydalanamiz.",
    privacyLink: "Maxfiylik siyosati",
  },
  errors: {
    verifyFirst: "Soʻrovni yuborishdan oldin pastdagi tasdiqlash qadamini bajaring.",
    sendFailed: "Soʻrovingizni yubora olmadik. Qaytadan urinib koʻring.",
    unconfirmed:
      "Soʻrovingiz yetib kelganini tasdiqlay olmadik. Qaytadan urinib koʻring yoki bizga email yoxud Telegram orqali yozing.",
    verifyLoad:
      "Tasdiqlash oynasi yuklanmadi. Qaytadan urinib koʻring yoki biz bilan email yoxud Telegram orqali bogʻlaning.",
  },
  success: {
    title: "Qabul qilindi. Siz bilan bogʻlanamiz.",
    body: "Maʼlumotlaringizni oldik. Demoni kelishib olish uchun siz bilan bogʻlanamiz.",
    explore: "Mahsulotlarimiz bilan tanishish",
  },
  serverMessages: {
    // src/lib/demo-request.ts (form validation)
    "Enter your full name.": "Ism va familiyangizni kiriting.",
    "Use 100 characters or fewer.": "Koʻpi bilan 100 ta belgi kiriting.",
    "Enter a valid email address.": "Toʻgʻri email manzilini kiriting.",
    "Use 150 characters or fewer.": "Koʻpi bilan 150 ta belgi kiriting.",
    "Enter a valid phone number, including your country code.":
      "Toʻgʻri telefon raqamini mamlakat kodi bilan kiriting.",
    "Tell us which products you’re interested in.":
      "Qaysi mahsulotlar sizni qiziqtirishini yozing.",
    "Use 1,200 characters or fewer.": "Koʻpi bilan 1,200 ta belgi kiriting.",
    // /api/product-demo
    "Please check the highlighted fields.": "Belgilangan maydonlarni tekshiring.",
    "The form is temporarily unavailable. Please email us or contact us on Telegram.":
      "Forma vaqtincha ishlamayapti. Bizga email yoki Telegram orqali yozing.",
    "Please complete the verification and try again.":
      "Tasdiqlash qadamini bajaring va qaytadan urinib koʻring.",
    "Verification expired or failed. Please try again.":
      "Tasdiqlash muddati oʻtdi yoki muvaffaqiyatsiz tugadi. Qaytadan urinib koʻring.",
    "We couldn’t confirm your request was received. Please try again, email us, or contact us on Telegram.":
      "Soʻrovingiz yetib kelganini tasdiqlay olmadik. Qaytadan urinib koʻring yoki bizga email yoxud Telegram orqali yozing.",
  },
};
