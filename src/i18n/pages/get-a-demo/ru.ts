import type { Copy } from "./en";

export const ru: Copy = {
  seo: {
    title: "Демо Raisedash",
    description:
      "Посмотрите любой инструмент Raisedash в демо. Покажем, как он работает, расскажем о ценах и поможем настроить.",
  },
  hero: {
    title: "Посмотрите демо и начните работу",
    body: (productName?: string) =>
      productName
        ? `Мы покажем, как работает ${productName}, расскажем о ценах и поможем настроить. Выберите удобный способ связаться с нами.`
        : "Напишите, какой инструмент вас интересует. Команда Raisedash покажет, как он работает, расскажет о ценах и поможет настроить.",
  },
  choices: {
    aria: "Способы связаться с нами",
    telegram: "Написать в Telegram",
    email: "Написать на email",
    booking: "Записаться на звонок",
    bookingNote: "Выберите удобное для вас время.",
    details: "Оставить контакты",
    detailsNote: "Мы свяжемся с вами и договоримся о демо.",
  },
  emailHelp: {
    body: "Почтовое приложение не открылось? Скопируйте наш адрес и напишите нам из любого приложения.",
    copy: "Скопировать",
    copied: "Скопировано",
  },
  back: "Другие способы связаться с нами",
  formSectionAria: "Запрос демо",
  telegramHelp: {
    noTelegram: (email: string) =>
      `Нет Telegram? Напишите нам на ${email} или оставьте контакты, и мы свяжемся с вами.`,
    leaveDetails: "Оставить контакты",
  },
  form: {
    heading: "Расскажите, что вам нужно.",
    intro: "Несколько вопросов, чтобы мы знали, какой инструмент вам показать.",
    noscript:
      "Чтобы воспользоваться формой, включите JavaScript или свяжитесь с нами по email или в Telegram.",
    legend: "Ваши контакты и продукты, которые вас интересуют",
    fullName: "Имя и фамилия",
    email: "Email",
    phone: "Телефон (необязательно)",
    phonePlaceholder: "С кодом страны",
    company: "Компания (необязательно)",
    interests: "Какие продукты вас интересуют",
    interestsPlaceholder: "Какие инструменты хотите посмотреть? Какую задачу нужно решить?",
    submit: "Отправить запрос",
    submitAria: "Отправить запрос",
    sendingAria: "Отправляем запрос",
    sending: "Отправляем запрос…",
    privacyNote: "Мы используем ваши данные, чтобы ответить на запрос.",
    privacyLink: "Политика конфиденциальности",
  },
  errors: {
    verifyFirst: "Перед отправкой запроса пройдите проверку ниже.",
    sendFailed: "Не удалось отправить запрос. Попробуйте ещё раз.",
    unconfirmed:
      "Не удалось подтвердить, что запрос дошёл. Попробуйте ещё раз, напишите нам на email или в Telegram.",
    verifyLoad:
      "Проверка не загрузилась. Попробуйте ещё раз или свяжитесь с нами по email или в Telegram.",
  },
  success: {
    title: "Готово. Мы свяжемся с вами.",
    body: "Мы получили ваши данные и свяжемся с вами, чтобы договориться о демо.",
    explore: "Посмотреть наши продукты",
  },
  serverMessages: {
    // src/lib/demo-request.ts (form validation)
    "Enter your full name.": "Введите имя и фамилию.",
    "Use 100 characters or fewer.": "Не больше 100 символов.",
    "Enter a valid email address.": "Введите корректный email.",
    "Use 150 characters or fewer.": "Не больше 150 символов.",
    "Enter a valid phone number, including your country code.":
      "Введите корректный номер телефона с кодом страны.",
    "Tell us which products you’re interested in.": "Напишите, какие продукты вас интересуют.",
    "Use 1,200 characters or fewer.": "Не больше 1200 символов.",
    // /api/product-demo
    "Please check the highlighted fields.": "Проверьте выделенные поля.",
    "The form is temporarily unavailable. Please email us or contact us on Telegram.":
      "Форма временно не работает. Напишите нам на email или в Telegram.",
    "Please complete the verification and try again.": "Пройдите проверку и попробуйте ещё раз.",
    "Verification expired or failed. Please try again.":
      "Проверка не прошла или истекла. Попробуйте ещё раз.",
    "We couldn’t confirm your request was received. Please try again, email us, or contact us on Telegram.":
      "Не удалось подтвердить, что запрос дошёл. Попробуйте ещё раз, напишите нам на email или в Telegram.",
  },
};
