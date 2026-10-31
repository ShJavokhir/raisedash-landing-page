import type { Copy } from "./en";
import { plural } from "@/i18n/plural";

const dias = (days: number) => `${days} ${plural("es", days, { one: "día", other: "días" })}`;

export const es: Copy = {
  seo: {
    title: "Inspección previa al viaje (PTI) gratis en Telegram",
    description:
      "Los conductores hacen la PTI con su lista de revisión y envían fotos o video a su grupo de Telegram. Programe las solicitudes. Empiece gratis; hay un panel de pago para flotas.",
  },
  hero: {
    title: "Inspecciones previas al viaje en Telegram.",
    body: "Los conductores siguen su lista de revisión. Usted recibe las fotos, los videos y las fallas reportadas en su grupo.",
    cta: "Agregar @raisedashbot",
    note: "Gratis. No tiene que registrarse ni pagar.",
    motionLabel:
      "El bot de Raisedash pide la inspección en un grupo de Telegram, el conductor fotografía cada paso de la lista en su teléfono y el reporte con 12 fotos vuelve al grupo.",
    watchDemo: "Ver la demo completa en YouTube",
    pauseMotion: "Pausar la animación",
    playMotion: "Reproducir la animación",
  },
  demo: {
    heading: "Vea la demo completa",
    body: "Vea cómo los conductores envían su PTI en un grupo real de Telegram con @raisedashbot.",
    youtube: "Ver en YouTube",
    title: "Demo del bot de PTI de Raisedash para Telegram",
  },
  benefits: {
    heading: "¿Por qué usar el bot?",
    noApp: {
      title: "Sin instalar otra app",
      description:
        "Los conductores abren el enlace de inspección desde Telegram, en su navegador. No hay otra app ocupando espacio en el celular.",
    },
    noAccounts: {
      title: "Sin crear cuentas para los conductores",
      description:
        "Los conductores no tienen que registrarse, aceptar invitaciones ni recordar contraseñas.",
    },
    schedule: {
      title: "Deje de enviar cada solicitud a mano",
      description:
        "Programe un horario y deje que el bot les pida la inspección a los conductores.",
    },
    checklist: {
      title: "Una lista de revisión para el conductor",
      description:
        "Cada paso indica qué revisar y qué fotografiar, así el conductor no depende de su memoria.",
    },
    problems: {
      title: "Reporte de fallas antes de salir",
      description:
        "Los conductores pueden marcar llantas gastadas, luces rotas o daños visibles y enviar fotos a la oficina.",
    },
    record: {
      title: "Un registro para después",
      description:
        "Las fotos, las fallas reportadas y la hora de cada inspección quedan juntas para auditorías o para revisar lo que pasó después de un accidente.",
    },
  },
  faq: {
    question: "¿Son obligatorias las inspecciones previas al viaje?",
    required:
      "Sí. La FMCSA exige que los conductores verifiquen que el vehículo esté en condiciones seguras antes de manejar.",
    and: "y",
    dvir: "Por lo general, no se requiere un DVIR por escrito si no se encontraron ni se reportaron fallas.",
    scope:
      "El bot registra lo que envían los conductores. No certifica que un camión sea seguro ni reemplaza las firmas obligatorias del DVIR ni los registros de reparación.",
  },
  screenshots: {
    request: {
      title: "En su grupo de conductores",
      description: "El bot envía el enlace de inspección directamente a su grupo de Telegram.",
      alt: "Un grupo de Telegram de conductores con una solicitud de PTI y el bot de Raisedash respondiendo con un enlace de inspección.",
    },
    settings: {
      title: "Lista de revisión y solicitudes automáticas",
      description:
        "Elija qué revisan los conductores. Pida las inspecciones según un horario o cuando pasen unos días sin ninguna.",
      alt: "Configuración del grupo con solicitudes de inspección programadas y por inactividad, y una lista de revisión.",
    },
    report: {
      title: "Reportes de inspección",
      description:
        "Revise las fotos, los videos y las fallas reportadas. Comparta el reporte con un enlace.",
      alt: "Un reporte de inspección previa al viaje enviado, con la hora de la inspección, fotos del camión y ninguna falla reportada. Los datos de identificación están ocultos.",
    },
  },
  plans: {
    heading: "Gratis y de pago",
    free: {
      name: "Gratis",
      label: "Versión gratuita",
      cta: "Empezar gratis en Telegram",
      features: [
        "Inspecciones guiadas con fotos y video",
        "Lista de revisión personalizada",
        "Solicitudes programadas o por inactividad",
      ],
      history: (days: number) => `${dias(days)} de historial de inspecciones`,
    },
    paid: {
      name: "De pago",
      label: "Versión de pago",
      cta: "Preguntar por el precio",
      features: [
        "Todo lo de la versión gratuita",
        "Cambiar la configuración de todos los grupos a la vez",
        "Historial de inspecciones ilimitado",
        "Descargar los reportes de inspección en PDF",
        "Pedir funciones a la medida",
        "Ayuda para que su equipo empiece",
        "Acuerdo de procesamiento de datos (DPA)",
        "Acceso a la API",
        "Webhooks",
        "Uso de su propio almacenamiento para máxima privacidad",
      ],
    },
    storageNote: (days: number) =>
      `Guardamos los registros de inspección de la versión gratuita hasta ${dias(days)}. Suscríbase para ver los registros más antiguos que todavía estén guardados.`,
  },
  gallery: {
    close: "Cerrar el visor de capturas",
    previous: "Captura anterior",
    next: "Captura siguiente",
    zoomIn: "Acercar",
    fitImage: "Ajustar imagen",
    enlarge: (title: string) => `Ampliar captura de pantalla: ${title}`,
  },
};
