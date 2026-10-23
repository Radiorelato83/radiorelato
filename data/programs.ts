export const programs = [
  {
    name: "Bola Informativa",
    schedule: [
      { day: 1, start: "07:45", end: "08:00" },
      { day: 3, start: "12:45", end: "13:00" },
      { day: 5, start: "19:45", end: "20:00" },
    ],
    description:
      "O espelho noticioso da Rádio Relato. Informação, atualidade e os principais acontecimentos do desporto.",
    image: "/programas/bola-informativa.jpg",
    type: "Informação Desportiva",
  },

  {
    name: "Bastidor Desportivo",
    schedule: [
      { day: 4, start: "19:45", end: "21:00" },
    ],
    description:
      "Um espaço dedicado aos bastidores, protagonistas, histórias e temas que marcam o desporto.",
    image: "/programas/bastidor-desportivo.jpg",
    type: "Análise Desportiva",
  },

  {
    name: "Trumunu Online",
    schedule: [
      { day: 6, start: "15:00", end: "19:00" },
      { day: 0, start: "15:00", end: "19:00" },
    ],
    description:
      "O espaço especial da Rádio Relato para acompanhar as grandes jornadas desportivas, aos sábados e domingos, das 15h00 às 19h00, e excepcionalmente durante a semana, em horário definido em função da transmissão.",
    image: "/programas/trumunu-online.jpg",
    type: "Especial Jornada",
  },
];

export const defaultProgram = {
  name: "Música Variada",
  description:
    "A melhor selecção musical enquanto aguardamos o próximo programa.",
};