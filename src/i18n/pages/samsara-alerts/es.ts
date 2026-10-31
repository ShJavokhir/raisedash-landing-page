import type { Copy } from "./en";

export const es: Copy = {
  seo: {
    title: "Alertas de Samsara en Telegram con video de dashcam",
    description:
      "Eventos de seguridad con video de la dashcam, exceso de velocidad y fallas del motor de Samsara en Telegram, más reportes semanales. 3 días gratis.",
  },
  hero: {
    eyebrow: "Samsara → Telegram",
    title: "Las alertas de Samsara, en su grupo de Telegram.",
    body: "Eventos de seguridad con el video de la dashcam, exceso de velocidad, fallas del motor. Llegan al chat que su equipo ya tiene abierto todo el día.",
    motionLabel:
      "El camión de Mike va por la autopista cuando la cámara de Samsara detecta que va demasiado cerca del vehículo de adelante. El video llega al tema de ese evento en el grupo de Telegram de la empresa, donde Sarah responde que va a llamar a Mike, y cada viernes tres reportes semanales resumen la semana.",
    pauseMotion: "Pausar la animación",
    playMotion: "Reproducir la animación",
  },
  group: {
    altPhone:
      "Un grupo de Telegram con un tema aparte para cada tipo de evento: códigos de falla, distancia de seguimiento, cámara obstruida, uso del celular, exceso de velocidad, sin cinturón de seguridad, voltaje de la batería, giro brusco, temperatura del refrigerante, frenado brusco, somnolencia, alto incompleto, presión de las llantas y choque.",
    altDesktop:
      "Un grupo de Telegram con un tema aparte para cada tipo de evento: códigos de falla, distancia de seguimiento, cámara obstruida, uso del celular, exceso de velocidad, sin cinturón de seguridad, giro brusco, somnolencia y más, junto a una conversación llena de alertas con videos de la dashcam.",
    caption:
      "Cada tipo de evento tiene su propio tema y cada alerta lleva el número del camión. Así, al buscar un camión, aparece todo lo que ha hecho hasta hoy.",
    redacted:
      "Capturas de pantalla reales de una flota que ya lo usa. Los nombres, las placas y las ubicaciones están difuminados solo en esta página, no en su grupo.",
  },
  why: {
    heading: "Samsara ya lo ve todo. Pero nadie lo está mirando.",
    items: [
      {
        title: "El panel de Samsara",
        body: "Alguien tiene que estar conectado y actualizándolo. Una semana con mucho movimiento son miles de eventos, y cada persona que usted quiera que lo revise necesita su propio usuario de Samsara.",
      },
      {
        title: "Alertas por correo electrónico",
        body: "Saturan la bandeja de entrada, no llegan al instante y, aun así, cada una termina con alguien abriendo el panel.",
      },
      {
        title: "El chat de grupo que ya tiene",
        body: "Está abierto en todos los celulares de la empresa. El video viene en el mensaje y todos ven lo mismo al mismo tiempo.",
      },
    ],
  },
  sends: {
    video: {
      title: "Eventos de seguridad, con el video",
      body: "Los dos ángulos de cámara se reproducen ahí mismo, en el mensaje. Nadie tiene que iniciar sesión para ver quince segundos de un conductor usando el celular.",
    },
    speeding: {
      title: "Exceso de velocidad, por encima de su límite",
      body: "Qué tan rápido, por cuánto tiempo y dónde. Usted decide a partir de cuánto se avisa: ir 3 mph por encima del límite no hace ruido; 15 por encima, sí.",
    },
    faults: {
      title: "Fallas del motor, en palabras claras",
      body: "Qué luz de advertencia se encendió y qué significa el código, para que su taller lo sepa antes de que llegue el camión.",
    },
    faultsAlt:
      "Dos alertas de falla del motor en Telegram. Cada una muestra el estado de las luces emissions, protect, stop y warning, y explica uno por uno los códigos de diagnóstico de fallas.",
  },
  events: {
    heading: "Todo lo que vigila",
    list: [
      "Exceso de velocidad",
      "Uso del celular",
      "Manejo distraído",
      "Somnolencia",
      "Sin cinturón de seguridad",
      "Cámara bloqueada",
      "Seguir demasiado cerca",
      "Ir pegado al de adelante",
      "Frenado brusco",
      "Aceleración brusca",
      "Giro brusco",
      "Salida de carril",
      "Alto incompleto",
      "Pasarse el semáforo en rojo",
      "Cruce de vías del tren",
      "Estacionamiento inseguro",
      "Estacionado a la orilla del camino",
      "Pasajero en la cabina",
      "Casi choque",
      "Alerta de colisión frontal",
      "Protección contra vuelco",
      "Choque",
      "Manejo defensivo",
      "Códigos de falla del motor",
    ],
    note: "Desactive los que no quiera. Lo que Samsara agregue más adelante también llega, solo que con un nombre genérico hasta que le pongamos uno.",
  },
  boards: {
    eyebrow: "Todos los viernes",
    heading: "Tres tableros quedan fijados en el grupo",
    body: "Los últimos siete días: qué pasó, quién manejó sin incidentes y quién está gastando más combustible.",
  },
  pricing: {
    trial: "Pruébelo 3 días gratis",
    trialNote: "Pague solo si le sirve.",
    features: [
      "Todo lo anterior, para todo el grupo",
      "Reportes semanales avanzados",
      "También funciona con grupos aparte para los conductores",
      "La configuración toma unos 15 minutos, y la hacemos con usted",
    ],
  },
  faqs: [
    {
      question: "¿Por qué no ver los eventos directamente en Samsara?",
      answer:
        "Porque alguien tiene que estar conectado y actualizando la página. Una flota con mucho movimiento genera miles de eventos por semana, y cada persona que usted quiera que los revise necesita su propio usuario de Samsara. Las alertas por correo electrónico son peores: saturan la bandeja de entrada, no llegan al instante y, aun así, terminan con alguien abriendo el panel. Su grupo de Telegram ya está abierto en todos los celulares, y el video se reproduce en el mensaje.",
    },
    {
      question: "¿A dónde van nuestros datos?",
      answer:
        "A nuestro propio servidor en AWS us-east-1, dentro de una red privada. Nada se guarda en una base de datos y nada sale de ese servidor. Las alertas pasan directo a su grupo, sin quedarse en el servidor. Los tableros semanales se arman desde cero con los datos de Samsara cada vez que se generan.",
    },
    {
      question: "¿Esto reemplaza a Samsara?",
      answer:
        "No. Lee los datos de la cuenta de Samsara que usted ya paga y publica en Telegram lo que encuentra. Samsara se queda exactamente como está.",
    },
    {
      question: "¿Va a llenar nuestro grupo de spam?",
      answer:
        "No. Nada se envía dos veces, las alertas de velocidad solo se publican cuando se pasa el límite que usted fijó, las fallas del motor tienen que seguir activas antes de generar una alerta, y lo que su equipo ya descartó en Samsara nunca aparece. Además, cada tipo de comportamiento tiene su propio tema, así que las alertas por uso del celular no tapan todo lo demás.",
    },
    {
      question: "¿Los conductores pueden recibir sus propias alertas?",
      answer:
        "Sí. Puede enviar los eventos que elija al chat de grupo de cada conductor, con un límite distinto al del grupo principal. Así, el conductor se entera cuando va 15 mph por encima, sin que toda la oficina vea cada vez que va 3 por encima.",
    },
    {
      question: "¿Y si un camión no tiene cámara o el video no carga?",
      answer:
        "Igual recibe la alerta como texto, con el conductor, el camión, la hora y un enlace al mapa. El video es un extra, nunca un requisito.",
    },
  ],
  finalCta: "Díganos con cuántos camiones trabaja.",
  trademark:
    "Samsara es una marca comercial de Samsara Inc. Esta es una integración independiente y no está afiliada a Samsara ni cuenta con su respaldo. Telegram es una marca comercial de Telegram Messenger Inc.",
};
