
export type NewsArticle = {
  id: number;
  slug: string;
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  excerpt: string;
  featured?: boolean;
  readingTime?: string;
  imageFit?: "cover" | "contain";
};

export const news: NewsArticle[] = [
  {
    id: 8,
    slug: "casamento-vias-divorcio-catetao",
    title: "Bruno Vicente no centro do poder: quem decide no futebol do Petro?",
    category: "Dossier Exclusivo",
    image: "/noticias/petro-dossier.jpg",
    date: "21 Out 2026",
    author: "Sebastião Júnior · Editor-chefe e Director da Rádio Relato",
    excerpt:
      "Qual é o peso de Bruno Vicente nas decisões desportivas do Petro de Luanda? A Rádio Relato investiga o seu papel na composição do plantel, na escolha dos treinadores e na estrutura de decisão do clube, distinguindo factos documentados de questões que exigem esclarecimento.",
    featured: true,
    readingTime: "Dossier editorial",
  },
  {
    id: 9,
    slug: "alexandre-santos-regresso-petro-recarburar",
    title: "Regresso de Alexandre para recarburar o Petroleiro",
    category: "Girabola",
    image: "/noticias/petro-dossier.jpg",
    date: "21 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "O regresso de Alexandre Santos recoloca o comando técnico do Petro de Luanda no centro das atenções. O treinador regressa com o desafio de recuperar a consistência competitiva da equipa e responder às expectativas dos adeptos tricolores.",
    readingTime: "3 min",
  },
  {
    id: 2,
    slug: "angola-marrocos-final-can-futsal-2026",
    title: "Africano de futsal — Angola quer contrariar o favoritismo caseiro dos marroquinos",
    category: "Futsal",
    image: "/noticias/angola-futsal.jpg",
    date: "21 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "Angola disputa a final do Campeonato Africano de futsal frente ao anfitrião Marrocos. Os Palancas Negras procuram contrariar o factor casa e transformar a campanha continental numa conquista histórica.",
    readingTime: "3 min",
  },
  {
    id: 6,
    slug: "nba-campeao-entra-a-perder-epoca-2026-27",
    title: "NBA: campeão entra a perder no arranque da fase regular",
    category: "NBA",
    image: "/noticias/nba-abertura-2026-27.jpg",
    date: "21 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "Os New York Knicks começaram a defesa do título com uma derrota por 106–100 frente aos Philadelphia 76ers. A noite de abertura da temporada 2026/27 ficou marcada pela vitória de Philadelphia na casa do campeão.",
    readingTime: "3 min",
  },
  {
    id: 1,
    slug: "militares-salvam-honra-convento",
    title: "Afrotaças: Militares salvam a honra do convento nacional",
    category: "Afrotaças",
    image: "/noticias/primeiro-agosto-virunga.jpg",
    date: "18 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "O 1.º de Agosto venceu o DC Virunga por 2–1, em Kinshasa, na primeira mão da segunda pré-eliminatória da Taça da Confederação da CAF. Os militares regressam a Luanda com vantagem na eliminatória.",
    readingTime: "3 min",
  },
  {
    id: 10,
    slug: "petro-scottland-afrotaças-2026",
    title: "Petro procura reagir depois do desaire frente ao Scottland",
    category: "Afrotaças",
    image: "/noticias/petro-dossier.jpg",
    date: "20 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "A derrota do Petro de Luanda por 0–2 frente ao Scottland FC aumenta a pressão sobre os tricolores. A equipa precisa de uma resposta competitiva para manter vivas as suas ambições continentais.",
    readingTime: "3 min",
  },
  {
    id: 11,
    slug: "wiliete-sundowns-afrotaças-2026",
    title: "Wiliete empata com o Mamelodi Sundowns e deixa eliminatória em aberto",
    category: "Afrotaças",
    image: "/noticias/wiliete-sundowns-2026.jpg",
    date: "18 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "O Wiliete Sport Clube empatou 0–0 com o Mamelodi Sundowns na primeira mão. A decisão da eliminatória fica adiada para o encontro da segunda mão.",
    readingTime: "3 min",
  },
  {
    id: 12,
    slug: "kabuscorp-maniema-union-afrotaças-2026",
    title: "Kabuscorp enfrenta tarefa difícil depois da derrota diante do Maniema Union",
    category: "Afrotaças",
    image: "/noticias/kabuscorp-maniema-2026.jpg",
    date: "18 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "O Kabuscorp do Palanca perdeu por 1–4 diante do AS Maniema Union. A equipa angolana terá de procurar uma resposta na segunda mão, perante uma desvantagem significativa.",
    readingTime: "3 min",
  },
  {
    id: 4,
    slug: "petro-interclube-supertaca-vladimiro-romero-2026",
    title: "Basquetebol: Petro conquista a Supertaça Vladimiro Romero",
    category: "Basquetebol",
    image: "/noticias/petro-basquetebol.jpg",
    date: "17 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "O Petro de Luanda venceu o Interclube por 81–64 e conquistou a Supertaça Vladimiro Romero de basquetebol sénior masculino, reforçando o seu protagonismo nas competições nacionais.",
    readingTime: "3 min",
  },
  {
    id: 3,
    slug: "angola-quinto-lugar-mundial-hoquei-2026",
    title: "Hóquei em patins: Angola fecha o Mundial no quinto lugar",
    category: "Hóquei em Patins",
    image: "/noticias/angola-hoquei.jpg",
    date: "18 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "A selecção angolana venceu o Chile por 5–4 na disputa pelo quinto lugar do Campeonato do Mundo de hóquei em patins, em Assunção, terminando a competição entre as melhores selecções.",
    readingTime: "3 min",
  },
  {
    id: 13,
    slug: "psg-barcelona-noite-campeoes-champions-2026",
    title: "Liga dos Campeões: noite de campeões e chuva de golos no Parque dos Príncipes",
    category: "Futebol Internacional",
    image: "/noticias/psg-barcelona-2026.jpg",
    date: "20 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "O Paris Saint-Germain venceu o Barcelona por 4–2 num duelo intenso da Liga dos Campeões. Désiré Doué, Lucas Hernández, Vitinha e Fabián Ruiz marcaram para os parisienses, enquanto Xavi Espart e Lamine Yamal fizeram os golos catalães.",
    readingTime: "4 min",
  },
  {
    id: 5,
    slug: "el-clasico-barcelona-real-madrid-outubro-2026",
    title: "El Clásico: Barcelona e Real Madrid preparam novo duelo",
    category: "Futebol Internacional",
    image: "/noticias/el-clasico.png",
    imageFit: "contain",
    date: "19 Out 2026",
    author: "Redacção Rádio Relato",
    excerpt:
      "Barcelona e Real Madrid preparam-se para novo confronto no futebol espanhol. A antevisão acompanha o momento das duas equipas, os protagonistas disponíveis e os factores que podem decidir um dos jogos mais aguardados da temporada.",
    readingTime: "4 min",
  },
];
