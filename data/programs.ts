export const programs = [
  {
    name: "Bola Informativa",
    schedule: [
      { day: 1, start: "07:45", end: "08:00" },
      { day: 3, start: "12:45", end: "13:00" },
      { day: 5, start: "19:45", end: "20:00" },
    ],
    description:
      "Informação desportiva, análise e opinião com a Rádio Relato.",
    image: "/programas/bola-informativa.jpg",
    type: "Informação",
  },

  {
    name: "Radar Desportivo",
    schedule: [
      { day: 2, start: "12:45", end: "13:00" },
    ],
    description:
      "As principais notícias, resultados, agenda e acontecimentos do mundo desportivo.",
    image: "/programas/radar-desportivo.jpg",
    type: "Actualidade desportiva",
  },

  {
    name: "Bastidor Desportivo",
    schedule: [
      { day: 4, start: "19:45", end: "21:00" },
    ],
    description:
      "Entrevistas, debate e opinião sobre o desporto angolano.",
    image: "/programas/bastidores-desportivos.jpg",
    type: "Análise e debate",
  },
];

export const defaultProgram = {
  name: "Música Variada",
  description:
    "A melhor selecção musical enquanto aguardamos o próximo programa.",
};