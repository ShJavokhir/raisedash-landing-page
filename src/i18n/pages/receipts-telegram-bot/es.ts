import type { Copy } from "./en";

// The bot only reacts to the English word "receipt", so “receipt” and the example
// request stay in English wherever the copy tells people what to type.
export const es: Copy = {
  seo: {
    title: "Recopile recibos de conductores en Telegram",
    description:
      "Escriba “receipt” en su grupo de Telegram y le enviamos un enlace para subir el recibo. Todos llegan a un solo panel y reembolsar es fácil. Sin app para los conductores.",
  },
  hero: {
    title: "Recopile los recibos de sus conductores en Telegram.",
    body: "Solo escriba la palabra “receipt” en su grupo de Telegram y le enviamos un enlace para subir el recibo. Cada recibo aparece en su panel, así sabe a quién reembolsar y cuánto.",
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
      title: "Pida el recibo",
      description:
        "Pídalo en su grupo de Telegram, por ejemplo: “Mike, could you share your receipt?”. Le respondemos con un enlace.",
    },
    photo: {
      title: "El conductor envía una foto",
      description:
        "El enlace se abre en el celular del conductor. Le toma una foto al recibo y escribe el total.",
    },
    dashboard: {
      title: "Todos los recibos en un solo panel",
      description:
        "Los recibos de cada conductor en una sola lista, con el monto y las fotos. Ya no tiene que buscar entre chats cuando llega la hora de reembolsar a los conductores.",
    },
  },
  features: {
    heading: "Qué incluye",
    files: {
      title: "Fotos, PDF y videos",
      text: "Hasta 5 archivos por recibo. Tome una foto nueva o elija una del celular.",
    },
    link: {
      title: "Un enlace para cada recibo",
      text: "Ábralo para ver las fotos y el monto. Envíelo a contabilidad o guárdelo para después.",
    },
    expenses: {
      title: "Lumpers, combustible, peajes y más",
      text: "Cualquier recibo que le den al conductor en el camino. Los tickets de báscula, el estacionamiento y las reparaciones funcionan igual.",
    },
    noApp: {
      title: "Sin app que instalar",
      text: "El enlace se abre directo en el celular. Sin app, sin cuenta, sin contraseña.",
    },
    fastPhotos: {
      title: "Las fotos se envían rápido",
      text: "Reducimos el tamaño de las fotos antes de subirlas, así se envían rápido aunque la señal sea débil.",
    },
    aiCheck: {
      title: "Revise si un recibo fue generado con IA",
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
        "Solicite una demo. Le mostramos a su equipo cómo funciona y le ayudamos a configurarlo en los grupos de sus conductores.",
    },
    {
      question: "¿Raisedash les reembolsa a los conductores?",
      answer:
        "No. Usted les paga a los conductores como lo hace ahora. Nosotros ponemos cada recibo en una sola lista con el conductor, el monto y las fotos, así sabe a quién pagarle y cuánto.",
    },
    {
      question: "¿Y si un conductor escribe mal el monto?",
      answer:
        "Puede corregir el monto o eliminar el recibo en el panel. El enlace del recibo muestra el cambio.",
    },
    {
      question: "¿Lee el monto de la foto?",
      answer:
        "No. El conductor escribe el total. Las fotos se quedan con el recibo, así usted puede verificar el monto.",
    },
    {
      question: "¿Qué pueden enviar los conductores?",
      answer:
        "Fotos, PDF y videos. Hasta 5 archivos por recibo, de hasta 100 MB cada uno. El monto es en dólares estadounidenses.",
    },
    {
      question: "¿Cuánto tiempo funciona el enlace?",
      answer: "24 horas. Después, solo escriba “receipt” otra vez para recibir un enlace nuevo.",
    },
  ],
  start: {
    heading: "Empiece a recopilar recibos",
    body: "Solicite una demo. Le mostramos cómo funciona y le ayudamos a configurarlo en sus grupos.",
  },
};
