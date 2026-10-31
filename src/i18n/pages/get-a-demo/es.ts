import type { Copy } from "./en";

export const es: Copy = {
  seo: {
    title: "Solicite una demo gratis y sin compromiso",
    description:
      "Vea cómo Raisedash puede ayudar a su empresa de transporte. Escríbanos por correo electrónico, agende una llamada, deje sus datos para ver una demo o contáctenos en Telegram.",
  },
  hero: {
    title: "Solicite una demo gratis y sin compromiso.",
    body: (productName?: string) =>
      productName
        ? `Vea cómo ${productName} se adapta a su empresa de transporte. Elija la forma más fácil de hablar con nosotros.`
        : "Vea cómo nuestras herramientas se adaptan a su empresa de transporte. Elija la forma más fácil de hablar con nosotros.",
  },
  choices: {
    aria: "Formas de solicitar una demo",
    telegram: "Contáctenos en Telegram",
    email: "Envíenos un correo electrónico",
    booking: "Agende una llamada",
    bookingNote: "Elija el horario que mejor le convenga.",
    details: "Deje sus datos",
    detailsNote: "Nos pondremos en contacto para coordinar su demo.",
  },
  emailHelp: {
    body: "¿No se abrió su app de correo electrónico? Copie nuestra dirección y escríbanos desde cualquier app.",
    copy: "Copiar",
    copied: "Copiado",
  },
  back: "Otras formas de contactarnos",
  formSectionAria: "Solicitar una demo",
  telegramHelp: {
    noTelegram: (email: string) =>
      `¿No tiene Telegram? Escríbanos a ${email} o deje sus datos y nos pondremos en contacto.`,
    leaveDetails: "Deje sus datos",
  },
  form: {
    heading: "Cuéntenos qué está buscando.",
    intro: "Unos cuantos datos para ayudarle a empezar.",
    noscript:
      "Active JavaScript para usar este formulario, o use los enlaces de correo electrónico y de Telegram para contactarnos.",
    legend: "Sus datos de contacto y los productos que le interesan",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono (opcional)",
    phonePlaceholder: "Incluya el código de país",
    company: "Empresa (opcional)",
    interests: "Productos que le interesan",
    interestsPlaceholder: "Cuéntenos qué productos le gustaría ver y en qué necesita ayuda.",
    submit: "Solicitar una demo",
    submitAria: "Solicitar una demo",
    sendingAria: "Enviando la solicitud",
    sending: "Enviando la solicitud…",
    privacyNote: "Usaremos sus datos para responder a su solicitud.",
    privacyLink: "Política de privacidad",
  },
  errors: {
    verifyFirst: "Complete la verificación de abajo antes de enviar su solicitud.",
    sendFailed: "No pudimos enviar su solicitud. Intente de nuevo.",
    unconfirmed:
      "No pudimos confirmar que recibimos su solicitud. Intente de nuevo, escríbanos por correo electrónico o contáctenos en Telegram.",
    verifyLoad:
      "No se pudo cargar la verificación. Intente de nuevo o comuníquese con nosotros por correo electrónico o por Telegram.",
  },
  success: {
    title: "Gracias. Nos pondremos en contacto.",
    body: "Recibimos sus datos. Nuestro equipo se comunicará con usted para conocer más detalles y coordinar su demo.",
    explore: "Ver nuestros productos",
  },
  serverMessages: {
    // src/lib/demo-request.ts (form validation)
    "Enter your full name.": "Escriba su nombre completo.",
    "Use 100 characters or fewer.": "Use 100 caracteres o menos.",
    "Enter a valid email address.": "Escriba un correo electrónico válido.",
    "Use 150 characters or fewer.": "Use 150 caracteres o menos.",
    "Enter a valid phone number, including your country code.":
      "Escriba un número de teléfono válido, con el código de país.",
    "Tell us which products you’re interested in.": "Díganos qué productos le interesan.",
    "Use 1,200 characters or fewer.": "Use 1,200 caracteres o menos.",
    // /api/product-demo
    "Please check the highlighted fields.": "Revise los campos marcados.",
    "The form is temporarily unavailable. Please email us or contact us on Telegram.":
      "El formulario no está disponible por el momento. Escríbanos por correo electrónico o contáctenos en Telegram.",
    "Please complete the verification and try again.":
      "Complete la verificación e intente de nuevo.",
    "Verification expired or failed. Please try again.":
      "La verificación venció o falló. Intente de nuevo.",
    "We couldn’t confirm your request was received. Please try again, email us, or contact us on Telegram.":
      "No pudimos confirmar que recibimos su solicitud. Intente de nuevo, escríbanos por correo electrónico o contáctenos en Telegram.",
  },
};
