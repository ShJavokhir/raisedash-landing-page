import type { Copy } from "./en";

export const uz: Copy = {
  seo: {
    title: "Telegramda bepul PTI tekshiruvlari",
    description:
      "Haydovchilar roʻyxat boʻyicha tekshirib, rasmlarni Telegram guruhingizga yuboradi. Bepul boshlang, ilova shart emas. Pullik rejada PDF va cheksiz tarix bor.",
  },
  hero: {
    title: "Telegramda PTI tekshiruvlari.",
    body: "Haydovchilar siz bergan roʻyxat boʻyicha qadamma-qadam tekshiradi. Rasmlar, videolar va bildirilgan nosozliklar toʻgʻridan-toʻgʻri Telegram guruhingizga keladi.",
    cta: "@raisedashbot botini qoʻshish",
    note: "Bepul. Roʻyxatdan oʻtish va toʻlov shart emas.",
    motionLabel:
      "Raisedash boti Telegram guruhida tekshiruv soʻraydi, haydovchi roʻyxatdagi har bir bandni telefonida suratga oladi va 12 ta rasmli hisobot guruhga qaytadi.",
    watchDemo: "Toʻliq demoni YouTubeda koʻrish",
    pauseMotion: "Animatsiyani toʻxtatish",
    playMotion: "Animatsiyani ishga tushirish",
  },
  demo: {
    heading: "Toʻliq demoni koʻring",
    body: "Haydovchilar haqiqiy Telegram guruhida @raisedashbot orqali PTI qanday yuborishini koʻring.",
    youtube: "YouTubeda koʻrish",
    title: "Raisedash PTI Telegram boti demosi",
  },
  benefits: {
    heading: "Bot parkingiz uchun nima qiladi",
    noApp: {
      title: "Haydovchilarga ilova yoki akkaunt kerak emas",
      description:
        "Haydovchilar tekshiruv havolasini Telegramdan brauzerda ochadi. Qoʻshimcha ilova, roʻyxatdan oʻtish yoki parol yoʻq.",
    },
    problems: {
      title: "Nosozliklar yoʻlga chiqishdan oldin bildiriladi",
      description:
        "Yeyilgan shina, ishlamayotgan chiroq yoki koʻrinib turgan shikast: haydovchilar nosozlikni belgilab, rasmini ofisga yuboradi.",
    },
    record: {
      title: "Rasmlar va nosozliklar bir joyda saqlanadi",
      description:
        "Har bir tekshiruvda rasmlar, bildirilgan nosozliklar va vaqt belgilari bir joyda turadi. Audit paytida yoki avariyadan keyin koʻrib chiqishda asqotadi.",
    },
  },
  faq: {
    question: "PTI tekshiruvi majburiymi?",
    required:
      "Ha. FMCSA qoidalariga koʻra, haydovchi yoʻlga chiqishdan oldin transport vositasi xavfsiz ekanini tekshirishi shart.",
    and: "va",
    dvir: "Nosozlik topilmagan yoki bildirilmagan boʻlsa, yozma DVIR odatda talab qilinmaydi.",
    scope:
      "Bot haydovchilar yuborgan maʼlumotlarni saqlaydi. U truck xavfsiz ekanini tasdiqlamaydi va majburiy DVIR imzolari hamda taʼmirlash hujjatlari oʻrnini bosmaydi.",
  },
  screenshots: {
    request: {
      title: "Haydovchilar guruhingizda",
      description: "Bot tekshiruv havolasini toʻgʻridan-toʻgʻri Telegram guruhingizga yuboradi.",
      alt: "Haydovchilarning Telegram guruhi: PTI soʻrovi va Raisedash boti yuborgan tekshiruv havolasi.",
    },
    settings: {
      title: "Roʻyxat va avtomatik soʻrovlar",
      description:
        "Haydovchilar nimani tekshirishini oʻzingiz tanlaysiz. Tekshiruvni jadval boʻyicha yoki bir necha kun tekshiruv boʻlmaganda soʻrang.",
      alt: "Guruh sozlamalari: jadval boʻyicha va faollik boʻlmaganda yuboriladigan tekshiruv soʻrovlari hamda tekshiruv roʻyxati.",
    },
    report: {
      title: "Tekshiruv hisobotlari",
      description:
        "Rasmlar, videolar va bildirilgan nosozliklarni koʻrib chiqing. Hisobotni havola orqali ulashing.",
      alt: "Yuborilgan PTI hisoboti: tekshiruv vaqti, truck rasmlari, nosozlik bildirilmagan. Shaxsiy maʼlumotlar yashirilgan.",
    },
  },
  plans: {
    heading: "Bepul va pullik rejalar",
    free: {
      name: "Bepul",
      label: "Bepul reja",
      cta: "Telegramda bepul boshlash",
      features: [
        "Qadamma-qadam rasm va video tekshiruvlar",
        "Oʻzingizga mos tekshiruv roʻyxati",
        "Jadval boʻyicha yoki faollik boʻlmaganda soʻrovlar",
      ],
      history: (days: number) => `${days} kunlik tekshiruv tarixi`,
    },
    paid: {
      name: "Pullik",
      label: "Pullik reja",
      cta: "Narxini soʻrash",
      features: [
        "Bepul rejadagi hamma narsa",
        "Barcha guruhlar sozlamalarini birdaniga oʻzgartirish",
        "Cheksiz tekshiruv tarixi",
        "Tekshiruv hisobotlarini PDF shaklida yuklab olish",
        "Oʻzingizga kerakli funksiyalarni soʻrash",
        "Jamoangizga ishni boshlashda yordam",
        "Maʼlumotlarni qayta ishlash shartnomasi (DPA)",
        "API orqali ulanish",
        "Webhooklar",
        "Maksimal maxfiylik uchun maʼlumotlarni oʻz omboringizda saqlash",
      ],
    },
    storageNote: (days: number) =>
      `Bepul tekshiruv yozuvlarini ${days} kungacha saqlaymiz. Obuna boʻlsangiz, hali saqlanayotgan eskiroq yozuvlarni ham koʻra olasiz.`,
  },
  gallery: {
    close: "Skrinshotni yopish",
    previous: "Oldingi skrinshot",
    next: "Keyingi skrinshot",
    zoomIn: "Kattalashtirish",
    fitImage: "Ekranga moslash",
    enlarge: (title: string) => `Skrinshotni kattalashtirish: ${title}`,
  },
};
