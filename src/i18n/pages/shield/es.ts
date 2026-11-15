import type { Copy } from "./en";

export const es: Copy = {
  seo: {
    title: "Shield: protección contra fraude de carga",
    description:
      "Extensión gratuita de Chrome para su empresa de transporte. Advierte sobre páginas de phishing y rate confirmations falsas que llevan al robo de carga.",
  },
  hero: {
    eyebrow: "Raisedash Shield · Extensión gratuita de Chrome",
    title: "El fraude empieza con un clic. Shield le advierte antes.",
    body: "Para todos en su empresa que trabajan en internet todo el día: despacho, safety, facturación, contabilidad y el dueño. A los ladrones les basta con que una persona haga clic. Shield le advierte cuando un sitio recién creado pide su contraseña o sus documentos, cuando una “rate confirmation” en realidad es un programa y cuando una página intenta que usted ejecute un comando.",
    cta: "Agregar a Chrome, es gratis",
    note: "Sin cuenta y sin nada que configurar.",
    motionLabel:
      "Una despachadora recibe una oferta de carga por correo y hace clic en View load. Se abre una página de inicio de sesión que parece un load board. Antes de que escriba su contraseña, Raisedash Shield muestra una advertencia en la esquina: este sitio se registró hace 3 días y pide su contraseña. Ella sale del sitio. Después, una rate confirmation que está descargando resulta ser un programa, RateConfirmation.pdf.exe. Shield la pausa y ella la elimina.",
    pauseMotion: "Pausar animación",
    playMotion: "Reproducir animación",
  },
  problem: {
    heading: "El robo de carga ahora empieza en una computadora",
    body: "Los ladrones ya no necesitan forzar un tráiler. Roban un inicio de sesión o meten un programa en una computadora de la oficina, y luego reservan cargas a su nombre, cambian a dónde le llegan los pagos o mandan una carga al lugar equivocado.",
    stats: [
      {
        value: "$725M",
        text: "Casi eso se perdió por robo de carga en Estados Unidos y Canadá en 2025, 60% más que en 2024.",
        source: "CargoNet, citado por el FBI",
      },
      {
        value: "$273,990",
        text: "La pérdida promedio por robo en 2025, 36% más en un año.",
        source: "CargoNet, citado por el FBI",
      },
      {
        value: "25%",
        text: "De los robos de carga en 2023 se hicieron con fraude, como identidades robadas y credenciales falsas. En 2018 era el 2.2%.",
        source: "ATRI",
      },
    ],
    quote:
      "Al hacer clic, el usuario es redirigido a un sitio de phishing que imita al legítimo. El sitio de phishing aloja un archivo ejecutable malicioso…",
    quoteSource: "Alerta del FBI a brokers y transportistas, 30 de abril de 2026",
    quoteAfter:
      "Ese clic, esa página de inicio de sesión y ese archivo son los momentos que Shield vigila.",
    sourcesLabel: "Fuentes",
    sources: [
      {
        label: "FBI IC3: Cyber-Enabled Strategic Cargo Theft Surging (abril de 2026, en inglés)",
        href: "https://www.ic3.gov/PSA/2026/PSA260430",
      },
      {
        label:
          "Investigación de ATRI, en el testimonio de la ATA ante el Comité Judicial de la Cámara (diciembre de 2025, en inglés)",
        href: "https://judiciary.house.gov/sites/evo-subsites/republicans-judiciary.house.gov/files/evo-media-document/spear-testimony.pdf",
      },
    ],
  },
  guards: {
    heading: "Cuándo interviene Shield",
    items: [
      {
        title: "Páginas falsas de inicio de sesión",
        text: "Cuando una página pide su contraseña, Shield revisa cuándo se registró el sitio. Los load boards y portales de brokers reales llevan años funcionando. Los sitios de phishing suelen tener días.",
        alt: "Una página de inicio de sesión en loadboard-signin.com con la advertencia de Raisedash Shield: This site is brand new. Se registró hace 3 días y pide su contraseña.",
      },
      {
        title: "Solicitudes de sus documentos",
        text: "Su CDL, certificado de seguro y cheque anulado reciben primero una advertencia cuando el sitio que los pide es nuevo.",
        alt: "Una página que pide subir la CDL, el certificado de seguro y un cheque anulado, con la advertencia de Raisedash Shield: This site is brand new. Se registró hoy y pide subir archivos.",
      },
      {
        title: "Rate confirmations falsas",
        text: "Un “RateConfirmation.pdf.exe” es un programa, no un documento. Shield lo pausa, igual que los instaladores de acceso remoto, hasta que usted decida.",
        alt: "Una página de rate confirmation con la advertencia de Raisedash Shield: Don’t open this file. RateConfirmation.pdf.exe en realidad es un programa y Shield lo pausó.",
      },
      {
        title: "Verificaciones falsas de “confirme que es humano”",
        text: "Cuando una página copia un comando y le pide presionar Windows + R y pegar, Shield lo cambia por una advertencia. Puede recuperarlo.",
        alt: "Una verificación de seguridad falsa que pide presionar Windows + R y luego Ctrl + V, con la advertencia de Raisedash Shield: Don’t paste what this page copied.",
      },
    ],
  },
  quiet: {
    heading: "En silencio hasta que importa",
    body: "En los demás sitios no sabrá de Shield. La advertencia aparece en la esquina y nunca bloquea la página. Usted siempre decide.",
    points: [
      "Gratis y sin cuenta. La instala y ya funciona.",
      "Shield nunca lee sus contraseñas ni lo que hay dentro de sus archivos.",
      "Cada sitio de nuestra lista de estafas lo reportó un transportista y lo confirmó una persona. Su navegador recibe la lista aproximadamente cada 30 minutos.",
      "La revisión de antigüedad del sitio se puede desactivar en el menú en cualquier momento.",
    ],
    alt: "El menú de Raisedash Shield en un sitio normal: Protection on, No warnings, la hora de actualización de la lista y el interruptor de la revisión de antigüedad del sitio.",
  },
  faq: {
    heading: "Preguntas",
    items: [
      {
        question: "¿Para quién es?",
        answer:
          "Para todos en su empresa que trabajan en Chrome en una computadora: despachadores, safety y cumplimiento, facturación y contabilidad, reclutamiento y dueños. Los ladrones buscan el inicio de sesión que necesitan, ya sea el load board, el correo de la empresa, el portal de factoring o el banco, así que instálela en cada computadora de la oficina. Shield funciona en Chrome en una computadora, no en teléfonos.",
      },
      {
        question: "¿Qué sale de mi computadora?",
        answer:
          "La revisión contra la lista de estafas, la pausa de descargas y la protección del portapapeles funcionan en su computadora y no envían nada sobre los sitios que visita. Shield nunca lee lo que usted escribe en un campo de contraseña ni el contenido de un archivo descargado. La revisión de antigüedad del sitio es lo único que envía algo: solo cuando una página pide una contraseña o la carga de un archivo, o después de que Shield detiene en ella una descarga o un comando copiado, Shield envía el nombre de host de ese sitio (nunca el resto de la dirección, lo que usted escribe ni el contenido de la página) para saber qué tan nuevo es el sitio. Está activa desde la instalación y puede desactivarse en cualquier momento en el menú del escudo. La lista de estafas se descarga aproximadamente cada 30 minutos; el servicio de actualizaciones ve datos de conexión ordinarios, como su dirección IP. Un reporte se envía solo cuando usted presiona “Send report” o “This warning is wrong”.",
      },
      {
        question: "¿Qué no puede hacer?",
        answer:
          "Shield no puede detectar todas las estafas, verificar a un transportista, un broker o una carga, ni garantizar que una página sea segura. No reemplaza al antivirus ni al proceso que usted ya usa para verificar transportistas. Las advertencias nunca bloquean un sitio; siempre puede continuar. Algunas descargas pequeñas terminan antes de que se puedan pausar. A veces una página puede copiar un comando antes de que se pueda revisar un marco incrustado. Confirme por teléfono cualquier solicitud inesperada de contraseña, documentos, pago o descarga, usando un número que ya tenga.",
      },
    ],
  },
  cta: {
    heading: "Agregue Shield a Chrome",
    body: "Gratis y sin cuenta. Empieza a funcionar en cuanto se instala.",
    privacyLink: "Leer el aviso de privacidad de Shield",
    contactSupport: "Contactar a soporte",
    operator:
      "LoadHunter Inc. opera Raisedash Shield. Las menciones de servicios de carga describen la cobertura de detección y no implican afiliación ni respaldo.",
  },
};
