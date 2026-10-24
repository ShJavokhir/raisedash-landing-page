import type { Copy } from "./en";

export const es: Copy = {
  seo: {
    title: "Raisedash Shield",
    description:
      "Una extensión de Chrome que advierte a las empresas de transporte sobre sitios de estafa confirmados, sitios recién creados que piden contraseñas o documentos, y descargas disfrazadas de documentos.",
  },
  hero: {
    status: "Extensión de Chrome · Gratis",
    title: "Raisedash Shield",
    lead: "Detecte un sitio de estafa de carga antes de escribir una contraseña, subir sus documentos o abrir una descarga.",
    body: "Hecha para despachadores, conductores y equipos de oficina de empresas de transporte. Los sitios de estafa suelen tener pocos días, piden la contraseña del load board o los documentos de la empresa y envían “rate confirmations” que en realidad son programas. Shield advierte sobre lo que puede confirmar y guarda silencio en todo lo demás.",
    release:
      "No se necesita cuenta ni pago. Instálela desde la Chrome Web Store y ya está funcionando; no hay nada que configurar.",
    privacyLink: "Leer el aviso de privacidad de Shield",
    contactSupport: "Contactar a soporte",
  },
  checks: {
    heading: "Cuatro revisiones, cada una con su razón",
    items: [
      [
        "Sitios de estafa confirmados",
        "Una advertencia en cualquier sitio de la lista de sitios de estafa confirmados de Raisedash. Cada entrada fue reportada por una empresa de transporte y confirmada por una persona antes de agregarse.",
      ],
      [
        "Sitios recién creados que piden contraseñas o documentos",
        "Cuando una página pide su contraseña o la carga de un archivo, Shield revisa cuándo se registró el sitio y le advierte si tiene solo días o semanas.",
      ],
      [
        "Programas disfrazados de documentos",
        "Una descarga que en realidad es un programa (como “RateConfirmation.pdf.exe”) o un instalador de acceso remoto se pausa hasta que usted decida.",
      ],
      [
        "Comandos de estafa en el portapapeles",
        "Cuando una página pone en su portapapeles un comando del tipo “presione Windows + R y pegue”, Shield lo reemplaza con una advertencia y le permite restaurarlo.",
      ],
    ],
  },
  consent: {
    heading: "Activa desde la instalación, y qué sale de su computadora",
    local:
      "La revisión contra la lista de estafas, la pausa de descargas y la protección del portapapeles funcionan en su computadora y no envían nada sobre los sitios que visita. Shield nunca lee lo que usted escribe en un campo de contraseña ni el contenido de un archivo descargado.",
    updates:
      "La revisión de antigüedad del sitio es lo único que envía algo: solo cuando una página pide una contraseña o la carga de un archivo, o después de que Shield detiene en ella una descarga o un comando copiado, Shield envía el nombre de host de ese sitio —nunca el resto de la dirección, lo que usted escribe ni el contenido de la página— para saber qué tan nuevo es el sitio. Está activa desde la instalación y puede desactivarse en cualquier momento en el menú del escudo. La lista de estafas se descarga aproximadamente cada 30 minutos; el servicio de actualizaciones ve datos de conexión ordinarios, como su dirección IP. Un reporte se envía solo cuando usted presiona “Send report” o “This warning is wrong”.",
  },
  limits: {
    heading: "Una revisión extra, con límites",
    coverage:
      "Shield no puede detectar todas las estafas, verificar a una empresa de transporte, un broker o una carga, ni garantizar que una página sea segura. No reemplaza al antivirus ni al proceso que usted ya usa para verificar empresas de transporte. Las advertencias nunca bloquean un sitio; siempre puede continuar.",
    gaps: "Algunas descargas pequeñas terminan antes de que se puedan pausar. A veces una página puede copiar un comando antes de que se pueda revisar un marco incrustado (iframe). Confirme por teléfono cualquier solicitud inesperada de contraseña, documentos, pago o descarga, usando un número que ya tenga.",
    operator:
      "LoadHunter Inc. opera Raisedash Shield. Las menciones de servicios de carga describen la cobertura de detección y no implican afiliación ni respaldo.",
  },
};
