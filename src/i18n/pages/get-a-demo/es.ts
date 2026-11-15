import type { Copy } from "./en";

export const es: Copy = {
  seo: {
    title: "Solicite una demo de Raisedash",
    description:
      "Vea cualquier herramienta de Raisedash en una demo para su empresa de transporte. Le mostramos cómo funciona, los precios y le ayudamos a configurarla.",
  },
  hero: {
    title: "Solicite una demo y comience a usar la herramienta",
    body: (productName?: string) =>
      productName
        ? `Le mostraremos cómo funciona ${productName}, le compartiremos los precios y le ayudaremos a configurarlo. Elija la forma más fácil de contactarnos.`
        : "Díganos qué herramienta le interesa. El equipo de Raisedash le mostrará cómo funciona, le compartirá los precios y le ayudará a configurarla.",
  },
  choices: {
    aria: "Formas de contactarnos",
    telegram: "Escríbanos en Telegram",
    email: "Envíenos un correo electrónico",
    booking: "Agende una llamada",
    bookingNote: "Elija el horario que mejor le convenga.",
    details: "Deje sus datos",
    detailsNote: "Nos pondremos en contacto para coordinar su demo.",
  },
  emailHelp: {
    body: "¿No se abrió su app de correo? Copie nuestra dirección y escríbanos desde cualquier app.",
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
    heading: "Cuéntenos qué necesita.",
    intro: "Unos cuantos datos para saber qué herramienta mostrarle.",
    noscript:
      "Active JavaScript para usar este formulario, o use los enlaces de correo electrónico y de Telegram para contactarnos.",
    legend: "Sus datos de contacto y los productos que le interesan",
    fullName: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono (opcional)",
    phonePlaceholder: "Incluya el código de país",
    company: "Empresa (opcional)",
    interests: "Productos que le interesan",
    interestsPlaceholder: "¿Qué herramientas quiere ver? ¿Qué problema quiere resolver?",
    submit: "Enviar solicitud",
    submitAria: "Enviar solicitud",
    sendingAria: "Enviando solicitud",
    sending: "Enviando solicitud…",
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
    title: "Listo. Nos pondremos en contacto.",
    body: "Recibimos sus datos y nos comunicaremos con usted para coordinar la demo.",
    explore: "Explorar nuestros productos",
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
