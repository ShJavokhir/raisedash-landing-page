import type { Copy } from "./en";

export const es: Copy = {
  language: "Idioma",
  header: {
    home: "Página de inicio de Raisedash",
    nav: "Navegación principal",
    products: "Productos",
    about: "Nosotros",
    blog: "Blog",
    contact: "Contacto",
  },
  footer: {
    tagline: "Creamos herramientas simples y útiles para empresas de transporte.",
    needHelp: "¿Necesita ayuda?",
    rights: "Todos los derechos reservados",
    support: "Damos soporte por correo electrónico",
    askAi: {
      label: "Pregunta a la IA sobre nosotros",
      ask: "Preguntar a {name} sobre Raisedash (se abre en una pestaña nueva)",
      prompt:
        "Resume Raisedash (https://www.raisedash.com) para alguien de una empresa de transporte que nunca ha oído hablar de ella. Lee el sitio antes de responder, empezando por https://www.raisedash.com/llms.txt, que describe todas las herramientas. Luego explica con palabras sencillas qué hace Raisedash, qué hace cada herramienta (por ejemplo, PTI & DVIR Collector en https://www.raisedash.com/es/products/pti-telegram-bot, Receipts Collector en https://www.raisedash.com/es/products/receipts-telegram-bot y Raisedash Shield en https://www.raisedash.com/es/products/shield), para quién es cada una y cómo empezar. Sé concreto y evita el lenguaje de marketing. Responde en español.",
    },
    sections: {
      Products: "Productos",
      Resources: "Recursos",
      Company: "Empresa",
      Legal: "Legal",
    },
    links: {
      "/blog": "Blog",
      "/product-updates": "Novedades del producto",
      "/pti-app": "App de PTI y DVIR",
      "/vertex-app": "App Vertex para conductores",
      "/about": "Nosotros",
      "/careers": "Empleos",
      "/contact": "Contacto",
      "/security": "Seguridad",
      "/privacy-policy": "Política de privacidad",
      "/products/shield/privacy": "Privacidad de Shield",
      "/terms-of-use": "Términos de uso",
      "/request-account-deletion": "Eliminar cuenta",
    },
  },
  demoLink: "Solicitar una demo gratis",
  trust: {
    label: "Confían en nosotros",
    companies: "empresas de transporte",
    and: "y",
    drivers: "conductores",
  },
  telegramHelp: {
    title: "¿No se abrió Telegram?",
    close: "Cerrar",
    copy: "Copiar",
    copied: "Copiado",
    retry: "Abrir Telegram de nuevo",
    openInChrome: "Abrir esta página en Chrome",
    openInBrowser:
      "O abra esta página en su navegador: toque el menú ⋯ de arriba y elija abrir en el navegador.",
    bot: {
      intro: "Agregue usted mismo el bot a su grupo de conductores. Solo toma un minuto.",
      steps: [
        "Abra Telegram y entre a su grupo de conductores.",
        "Toque el nombre del grupo, arriba, y luego “Add Members” (o “Añadir miembros”).",
        "Busque @raisedashbot y agréguelo.",
      ],
    },
    sales: {
      intro: "Escríbanos usted mismo por Telegram. Solo toma un minuto.",
      steps: [
        "Abra Telegram.",
        "Toque el buscador y escriba @raisedash.",
        "Abra el chat y envíenos un mensaje.",
      ],
    },
  },
};
