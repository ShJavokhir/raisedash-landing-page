import type { Copy } from "./en";

export const ru: Copy = {
  language: "Язык",
  header: {
    home: "Главная страница Raisedash",
    nav: "Основное меню",
    products: "Продукты",
    about: "О нас",
    blog: "Блог",
    contact: "Контакты",
  },
  footer: {
    tagline: "Мы делаем простые и полезные инструменты для транспортных компаний.",
    needHelp: "Нужна помощь?",
    rights: "Все права защищены",
    support: "Поддержка доступна по email",
    askAi: {
      label: "Спросите о нас у ИИ",
      ask: "Спросить {name} о Raisedash (откроется в новой вкладке)",
      prompt:
        "Кратко расскажи о Raisedash (https://www.raisedash.com) человеку из траковой компании, который о нём никогда не слышал. Прежде чем отвечать, прочитай сайт, начиная с https://www.raisedash.com/llms.txt, где описаны все инструменты. Затем простыми словами объясни, что делает Raisedash, что делает каждый инструмент (например, PTI & DVIR Collector: https://www.raisedash.com/ru/products/pti-telegram-bot, Receipts Collector: https://www.raisedash.com/ru/products/receipts-telegram-bot и Raisedash Shield: https://www.raisedash.com/ru/products/shield), для кого каждый из них и как начать. Пиши конкретно и без рекламных слов. Отвечай на русском языке.",
    },
    sections: {
      Products: "Продукты",
      Resources: "Ресурсы",
      Company: "Компания",
      Legal: "Правовая информация",
    },
    links: {
      "/blog": "Блог",
      "/product-updates": "Обновления продуктов",
      "/pti-app": "Приложение для PTI и DVIR",
      "/vertex-app": "Приложение Vertex для водителей",
      "/pricing": "Цены на Orientation",
      "/about": "О нас",
      "/careers": "Вакансии",
      "/contact": "Контакты",
      "/get-a-demo": "Запросить демо",
      "/security": "Безопасность",
      "/privacy-policy": "Политика конфиденциальности",
      "/products/shield/privacy": "Конфиденциальность Shield",
      "/terms-of-use": "Условия использования",
      "/request-account-deletion": "Удаление аккаунта",
    },
  },
  demoLink: "Запросить демо",
  trust: {
    label: "Нам доверяют",
    companies: "транспортных компаний",
    and: "и",
    drivers: "водителей",
  },
  telegramHelp: {
    title: "Telegram не открылся?",
    close: "Закрыть",
    copy: "Скопировать",
    copied: "Скопировано",
    retry: "Открыть Telegram ещё раз",
    openInChrome: "Открыть страницу в Chrome",
    openInBrowser: "Или откройте эту страницу в обычном браузере через меню ⋯ вверху экрана.",
    bot: {
      intro: "Добавьте бота в группу водителей сами. Это займёт минуту.",
      steps: [
        "Откройте Telegram и перейдите в группу водителей.",
        "Нажмите на название группы вверху, затем «Добавить участников» (Add Members).",
        "Найдите через поиск @raisedashbot и добавьте его.",
      ],
    },
    sales: {
      intro: "Напишите нам в Telegram сами. Это займёт минуту.",
      steps: [
        "Откройте Telegram.",
        "Нажмите на поиск и введите @raisedash.",
        "Откройте чат и отправьте нам сообщение.",
      ],
    },
  },
};
