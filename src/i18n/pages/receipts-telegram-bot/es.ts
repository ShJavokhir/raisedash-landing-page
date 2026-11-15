import type { Copy } from "./en";

// The bot only reacts to the English word "receipt", so “receipt” and the example
// request stay in English wherever the copy tells people what to type.
export const es: Copy = {
  seo: {
    title: "Recibos de conductores en Telegram",
    description:
      "Recopile recibos de combustible, lumper, peajes y reparaciones en Telegram. Sin app, sin cuenta. El conductor abre un enlace, toma la foto y escribe el total.",
  },
  hero: {
    title: "Recopile los recibos de sus conductores en Telegram.",
    body: "Escriba “receipt” en el grupo de Telegram de sus conductores y el bot responde con un enlace. El conductor lo abre, le toma foto al recibo y escribe el total en dólares. Cada recibo llega a un solo panel con el conductor, el monto y las fotos.",
    note: "Nosotros lo configuramos en sus grupos.",
    motionLabel:
      "En el grupo de Telegram de los conductores, la oficina le pide a Mike su recibo, Mike le toma una foto con su teléfono y escribe el total de $175, y el recibo llega al panel de recibos de la oficina, donde se actualizan los totales, la gráfica de gastos por día y los conductores con más gastos.",
    watchDemo: "Ver la demo completa en YouTube",
    pauseMotion: "Pausar la animación",
    playMotion: "Reproducir la animación",
  },
  demo: {
    heading: "Vea la demo",
    body: "Un recibo real, enviado desde un teléfono real. Vea cómo llega del grupo de Telegram a su panel.",
    youtube: "Ver en YouTube",
    title: "Demo del bot de recibos de Raisedash",
  },
  how: {
    heading: "Cómo funciona",
  },
  steps: {
    ask: {
      title: "Escriba “receipt” en el grupo",
      description:
        "El bot responde con un enlace. El conductor lo abre en el navegador de su celular. Sin app, sin cuenta, sin contraseña.",
    },
    photo: {
      title: "El conductor le toma foto al recibo",
      description:
        "Toma una foto o elige un archivo y escribe el total. Las fotos se comprimen antes de subirse, así se envían aunque la señal sea débil.",
    },
    dashboard: {
      title: "Todos los recibos en un solo panel",
      description:
        "Cada recibo muestra el conductor, el monto y los archivos. Cada recibo tiene su propio enlace que puede enviar a contabilidad.",
    },
  },
  features: {
    heading: "Qué incluye",
    expenses: {
      title: "Lumpers, combustible, peajes y más",
      text: "Cualquier recibo que le den al conductor en el camino: tickets de báscula, estacionamiento, reparaciones. Todos funcionan igual.",
    },
    fastPhotos: {
      title: "Las fotos se envían con señal débil",
      text: "Comprimimos las fotos antes de subirlas, así se envían rápido aunque la conexión sea lenta.",
    },
    aiCheck: {
      title: "Detección de recibos con IA, próximamente",
      text: "Revisaremos la foto de cada recibo y le avisaremos si parece generada con IA, antes de que le reembolse al conductor.",
      badge: "Próximamente",
    },
  },
  faq: {
    heading: "Preguntas",
  },
  faqs: [
    {
      question: "¿Cómo empiezo?",
      answer:
        "Solicite una demo. Le mostramos a su equipo cómo funciona y lo configuramos en los grupos de sus conductores.",
    },
    {
      question: "¿Les reembolsa a los conductores?",
      answer:
        "No. Usted les paga a los conductores como lo hace ahora. El panel pone cada recibo en una sola lista con el conductor, el monto y las fotos, así sabe a quién pagarle y cuánto.",
    },
    {
      question: "¿Y si un conductor escribe mal el monto?",
      answer:
        "Puede corregir el monto o eliminar el recibo en el panel. El enlace del recibo muestra el monto actualizado.",
    },
    {
      question: "¿Lee el monto de la foto?",
      answer:
        "No. El conductor escribe el total. Las fotos se quedan con el recibo, así usted puede verificar el número.",
    },
    {
      question: "¿Qué pueden enviar los conductores?",
      answer:
        "Fotos, PDF y videos. Hasta 5 archivos por recibo, de hasta 100 MB cada uno. El monto es en dólares estadounidenses.",
    },
    {
      question: "¿Cuánto tiempo funciona el enlace?",
      answer: "24 horas. Después, escriba “receipt” otra vez para recibir un enlace nuevo.",
    },
  ],
  start: {
    heading: "Empiece a recopilar recibos",
    body: "Solicite una demo. Le mostramos cómo funciona y lo configuramos en sus grupos.",
  },
};
