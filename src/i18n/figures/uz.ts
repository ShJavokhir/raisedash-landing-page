import type { Copy } from "./en";

export const uz: Copy = {
  tags: {
    driversPhone: "Haydovchi telefoni",
    yourDashboard: "Boshqaruv panelingiz",
    yourPdf: "PDF faylingiz",
    textMessage: "SMS xabar",
    setOnce: "Bir marta sozlaysiz",
    whenItFires: "Qoida ishlaganda",
  },
  twoWays: {
    before: "Raisedashdan oldin",
    onPaper: "Qogʻozda",
    withUs: "Raisedash bilan",
  },
  paperwork: {
    before: [
      "Formalarni chop etish",
      "Qoʻlga berish yoki pochtada yuborish",
      "Haydovchi imzolashini kutish",
      "Skanerlab yoki faks orqali qaytarib olish",
      "CDL rasmini SMS orqali soʻrash",
      "Yetishmayotgan sahifa uchun qoʻngʻiroq qilish",
    ],
    beforeNote:
      "Oxir-oqibat hujjatlar papkada, stol tortmasida va kimningdir SMS xabarlarida qolib ketadi.",
    withUs: [
      "Haydovchilarni va kerakli hujjatni tanlash",
      "Haydovchi telefonida toʻldiradi",
      "PDFni yuklab olish",
    ],
    withUsNote: "Har bir haydovchining hujjatlari boshqaruv panelidagi oʻz sahifasida turadi.",
  },
  coaching: {
    before: [
      "Videoni koʻrish",
      "Haydovchiga qoʻngʻiroq qilish. Ovozli pochtaga tushadi.",
      "Javobini bir hafta kutish",
      "Ofisda gaplashib olish",
      "Hech narsa yozib qoʻyilmaydi",
    ],
    withUs: [
      "Dars video bilan birga yuboriladi",
      "Haydovchi uni telefonida tugatadi",
      "Haydovchining yozuvlarida saqlanadi",
    ],
  },
  announcements: {
    before: (groups: number) => [
      "Bitta haydovchi guruhini ochish",
      "Xabarni joylab, yuborish",
      "Keyingi guruhni ochish",
      `${groups} marta takrorlash`,
      "Birortasi qolib ketmagan boʻlsin, deb umid qilish",
    ],
    withUs: ["Xabarni bir marta yozish", "Barcha guruhlarni tanlash", "«Send» tugmasini bosish"],
    yourTime: "Ketadigan vaqt:",
    beforeTime: "bir soatdan koʻp",
    withUsTime: "bir daqiqacha",
  },
  receiptsTour: {
    description:
      "Ikki telefondagi Telegram guruhi animatsiyasi. Ofisda Sarah yozadi: Mike, could you share your receipt? Raisedash boti chek kiritish sahifasini ochadigan tugma bilan javob beradi. Mike telefonida shu tugmani bosadi. Uning ismi, 104-truck va 5317-treyler oldindan toʻldirilgan, u faqat $175.00 summasini yozadi, rasmga oladi va yuboradi. Bot guruhga Receipt submitted, $175.00 deb yozadi, Sarah esa rahmat aytadi.",
    play: "Animatsiyani boshlash",
    pause: "Animatsiyani toʻxtatish",
    office: "Ofis",
    driver: "Haydovchi",
  },
  samsaraBoards: {
    label: "Haftalik hisobotlar",
    safety: {
      tab: "Haftalik xavfsizlik hisoboti",
      alt: "Haftalik xavfsizlik hisoboti: haftadagi jami hodisalar va oʻtgan haftaga nisbatan oʻzgarish, har bir hodisa turi uchun alohida chiziq va har bir kun uchun ustun.",
      note: "Haftadagi har bir hodisa turi va ularning har biri oʻtgan haftaga nisbatan yaxshilangan yoki yomonlashgani.",
    },
    driver: {
      tab: "Haydovchilar xavfsizlik reytingi",
      alt: "Haydovchilar xavfsizlik reytingi: eng xavfsiz va eng xavfli haydovchilar har ming milyadagi hodisalar soni boʻyicha saralangan, haydovchilar ismi yashirilgan.",
      note: "Eng xavfsiz va eng xavfli haydovchilar shunchaki hodisalar soni boʻyicha emas, har 1,000 milyaga toʻgʻri keladigan hodisalar boʻyicha saralanadi.",
    },
    fuel: {
      tab: "Yoqilgʻi tejamkorligi reytingi",
      alt: "Yoqilgʻi tejamkorligi reytingi: kompaniya boʻyicha MPG (bir gallonga milya), taxminiy yoqilgʻi xarajati, eng tejamkor va eng kam tejamkor haydovchilar hamda ularning idle ulushi, haydovchilar ismi yashirilgan.",
      note: "Har bir haydovchining MPG va idle ulushi, hamda oʻrtachadan past yarmi sizga qanchaga tushayotgani.",
    },
  },
  feedbackDemo: {
    tryAgain: "Qaytadan sinash",
    exampleOnly: "Bu faqat namuna. Hech narsa yuborilmaydi.",
  },
  ringcentral: {
    before: [
      "Noutbukni ochish",
      "RingCentralga kirish",
      "Qoʻngʻiroqlar tarixini ochish",
      "Xodim va kunni tanlash",
      "Kerakli qoʻngʻiroqni qidirib topish",
      "Play tugmasini bosish",
    ],
    withUs: ["Telegramni ochish", "Play tugmasini bosish"],
    anatomy: [
      "Kim qoʻngʻiroq qilgani va uning raqami.",
      "Qoʻngʻiroq kimga kelgani. NO NAME chiqsa, demak RingCentralda bu raqamga ism biriktirilmagan.",
      "Qoʻngʻiroq boshlangan vaqt. RingCentral bu vaqtni UTC boʻyicha beradi.",
      "Qoʻngʻiroq yozuvi. Yozuv boʻlmasa, oʻrniga nima boʻlgani koʻrinadi, masalan, «Missed» yoki «Voicemail».",
    ],
    skipTitle: "Chatga joylanadi",
    skipNote: "Ustidan chizilganlari hech qachon joylanmaydi.",
    playCall: "Namunaviy qoʻngʻiroqni ijro etish (ovozsiz)",
    pauseCall: "Namunaviy qoʻngʻiroqni toʻxtatish",
  },
};
