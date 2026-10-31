import type { Copy } from "./en";
import { plural } from "@/i18n/plural";

export const es: Copy = {
  tags: {
    driversPhone: "Celular del conductor",
    yourDashboard: "Su panel",
    yourPdf: "Su PDF",
    textMessage: "Mensaje de texto",
    setOnce: "Se configura una vez",
    whenItFires: "Cuando se activa",
  },
  twoWays: {
    before: "Antes de Raisedash",
    onPaper: "En papel",
    withUs: "Con Raisedash",
  },
  paperwork: {
    before: [
      "Imprimir los formularios",
      "Entregarlos en mano o enviarlos por correo",
      "Esperar a que el conductor firme",
      "Recibirlos escaneados o por fax",
      "Pedir por mensaje de texto una foto del CDL",
      "Llamar por la página que falta",
    ],
    beforeNote:
      "Y los papeles terminan en una carpeta, en un cajón del escritorio y en los mensajes de texto de alguien.",
    withUs: [
      "Elegir a los conductores y lo que necesita",
      "El conductor lo completa en su celular",
      "Descargar el PDF",
    ],
    withUsNote: "El papeleo de cada conductor queda en su página dentro del panel.",
  },
  coaching: {
    before: [
      "Ver el video",
      "Llamar al conductor. Buzón de voz.",
      "Esperar una semana a que le responda",
      "Hablarlo en la oficina",
      "No queda nada por escrito",
    ],
    withUs: [
      "La lección se envía junto con el video",
      "El conductor la completa en su celular",
      "Queda en su historial",
    ],
  },
  announcements: {
    before: (groups: number) => [
      "Abrir el grupo de un conductor",
      "Pegar el mensaje y enviarlo",
      "Abrir el siguiente grupo",
      `Repetir ${groups} ${plural("es", groups, { one: "vez", other: "veces" })}`,
      "Esperar no haberse saltado ninguno",
    ],
    withUs: ["Escribir el mensaje una vez", "Seleccionar todos los grupos", "Presionar “Send”"],
    yourTime: "Su tiempo:",
    beforeTime: "más de una hora",
    withUsTime: "alrededor de un minuto",
  },
  receiptsTour: {
    description:
      "Animación de un grupo de Telegram en dos celulares. En la oficina, Sarah escribe: Mike, could you share your receipt? El bot de Raisedash responde con un botón para registrar el recibo. En su celular, Mike lo toca. El formulario ya trae su nombre, el camión 104 y el tráiler 5317, así que escribe $175.00, toma una foto y lo envía. El bot publica Receipt submitted, $175.00, en el grupo, y Sarah le da las gracias.",
    play: "Reproducir la animación",
    pause: "Pausar la animación",
    office: "Oficina",
    driver: "Conductor",
  },
  samsaraBoards: {
    label: "Tableros semanales",
    safety: {
      tab: "Reporte semanal de seguridad",
      alt: "Reporte semanal de seguridad: total de eventos de la semana con el cambio respecto a la semana pasada, una barra por tipo de evento y una columna por día.",
      note: "Cada tipo de evento de la semana, y si cada uno va mejor o peor que la semana pasada.",
    },
    driver: {
      tab: "Tablero de seguridad de conductores",
      alt: "Tablero de seguridad de conductores: los conductores más seguros y los más riesgosos, ordenados por eventos por cada mil millas, con los nombres de los conductores ocultos.",
      note: "Los conductores más seguros y los más riesgosos, ordenados por eventos por cada 1,000 millas, no por el número total de eventos.",
    },
    fuel: {
      tab: "Tablero de rendimiento de combustible",
      alt: "Tablero de rendimiento de combustible: millas por galón de la flota, gasto estimado en combustible y los conductores más y menos eficientes con su porcentaje de tiempo en ralentí, con los nombres de los conductores ocultos.",
      note: "MPG y porcentaje de tiempo en ralentí (idle) por conductor, y cuánto le está costando la mitad que está por debajo del promedio.",
    },
  },
  feedbackDemo: {
    tryAgain: "Intentar de nuevo",
    exampleOnly: "Solo es un ejemplo. No se envía nada.",
  },
  ringcentral: {
    before: [
      "Abrir la laptop",
      "Iniciar sesión en RingCentral",
      "Abrir el historial de llamadas",
      "Elegir a la persona y el día",
      "Bajar hasta encontrar la llamada",
      "Presionar play",
    ],
    withUs: ["Abrir Telegram", "Tocar play"],
    anatomy: [
      "Quién llamó, con su número.",
      "A quién iba la llamada. NO NAME significa que RingCentral no tenía un nombre para ese número.",
      "Cuándo empezó la llamada. RingCentral da esta hora en UTC.",
      "La grabación. Si no hay, verá qué pasó, como “Missed” o “Voicemail”.",
    ],
    skipTitle: "Se publican en el chat",
    skipNote: "Lo tachado nunca se publica.",
    playCall: "Reproducir la llamada de ejemplo (sin sonido)",
    pauseCall: "Pausar la llamada de ejemplo",
  },
};
