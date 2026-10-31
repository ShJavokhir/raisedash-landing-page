import type { Copy } from "./en";

export const es: Copy = {
  seo: {
    title: "Software de coaching de conductores para flotas",
    description:
      "Envíe al conductor una lección corta con el video de su dashcam tras un evento de seguridad. Asignación automática desde Samsara y Motive, y registro de cada coaching.",
  },
  hero: {
    title: "Coaching para sus conductores el mismo día del evento.",
    body: "Envíe una lección corta con el video de la dashcam. El conductor la termina en su celular.",
    worksWith: "Funciona con Samsara y Motive.",
    motionLabel:
      "En la lista Safety de Raisedash aparece un evento de distancia insuficiente de Mike y una regla le envía una lección; él ve en su celular su propio video de la dashcam y la lección, y el evento pasa a Coached.",
    pauseMotion: "Pausar la animación",
    playMotion: "Reproducir la animación",
  },
  twoWays: {
    heading: "La cámara lo vio. ¿Y después qué?",
  },
  parts: {
    clip: {
      title: "El conductor ve exactamente lo que usted vio",
      text: "Primero ve su propio video, luego una lección corta, y al final contesta unas preguntas.",
      points: ["Unos minutos, en su celular.", "Usted ve cuándo terminó y cómo contestó."],
    },
    automatic: {
      title: "Los eventos de Samsara y Motive asignan la lección por usted",
      text: "Configure una regla una sola vez, por ejemplo 3 eventos de distancia de seguimiento en 7 días, y nosotros enviamos la lección.",
      points: [
        "Se envía de inmediato o espera su aprobación.",
        "Un solo conjunto de reglas para una flota mixta.",
      ],
    },
    anyEvent: {
      title: "Coaching por lo que la cámara no ve",
      text: "Un accidente, una infracción en carretera, una queja de un cliente. Elija al conductor y la lección.",
      points: [
        "Funciona sin conexión a un sistema de telemática.",
        "Envíela a un conductor o a varios.",
      ],
    },
  },
  record: {
    heading: "Prueba de que hubo coaching, cuando más importa",
    body: "Después de un choque, los abogados piden los eventos de su dashcam. Si hay eventos marcados sin coaching después, parece que usted sabía y no hizo nada.",
    kept: "Raisedash guarda el evento, la lección y cuándo la terminó el conductor.",
    sourceBefore:
      "El monto promedio de los veredictos en juicios de transporte de carga subió de $2.3M en 2010 a $22.3M en 2018 (",
    sourceAfter: "). No es asesoría legal.",
  },
  features: {
    policy: {
      title: "Lecciones basadas en sus políticas",
      text: "Describa la regla. La IA redacta la lección y usted la aprueba.",
    },
    rank: {
      title: "Vea quién lo necesita más",
      text: "Conductores ordenados según sus eventos por cada 1,000 millas, no por el total de eventos.",
    },
    driverPage: {
      title: "Junto a la orientación",
      text: "La incorporación (onboarding) y cada coaching en una sola página del conductor.",
    },
  },
  fairness: {
    heading: "Justo con los conductores",
    items: [
      { title: "Ven el video", text: "No un resumen." },
      {
        title: "Usted descarta las alertas falsas",
        text: "Así el coaching solo se envía cuando corresponde.",
      },
      { title: "Solo los suyos", text: "Ningún conductor ve los eventos de un compañero." },
    ],
  },
  faq: {
    heading: "Preguntas",
    items: [
      {
        question: "¿Necesito Samsara o Motive?",
        answer:
          "No. Puede enviar coaching a mano por cualquier motivo. Si conecta Samsara o Motive, se agregan los videos y las reglas automáticas.",
      },
      {
        question: "Ya damos coaching en Samsara o Motive. ¿Para qué agregar esto?",
        answer:
          "Raisedash cubre los eventos que la cámara no ve, le da a una flota mixta un solo conjunto de reglas y guarda el coaching en el mismo historial que la capacitación. Si cambia de proveedor de cámaras, no pierde el historial.",
      },
      {
        question: "¿Los conductores necesitan una app?",
        answer:
          "No. Reciben un mensaje de texto con un enlace y entran con un código de 6 dígitos.",
      },
      {
        question: "¿Y si la cámara se equivocó?",
        answer:
          "Descarte el evento. Con las reglas que primero piden su aprobación, una alerta falsa nunca le llega al conductor.",
      },
      {
        question: "¿Raisedash decide quién tuvo la culpa o qué medida disciplinaria tomar?",
        answer:
          "No. Nosotros enviamos el coaching y guardamos el registro. Lo que pase después lo decide usted.",
      },
      {
        question: "¿Cómo empiezo?",
        answer:
          "Solicite una demo. Le damos los precios y le ayudamos a enviar su primer coaching.",
      },
    ],
  },
  cta: {
    heading: "Envíe el coaching mientras todo está fresco",
  },
};
