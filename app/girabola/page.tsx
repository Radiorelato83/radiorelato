
import Image from "next/image";
import Link from "next/link";

import GirabolaClubsBar from "@/components/girabola/GirabolaClubsBar";
import GirabolaNewsSlider from "@/components/girabola/GirabolaNewsSlider";

import {
  girabolaStandings as fallbackGirabolaStandings,
  recentGirabolaResults as fallbackRecentGirabolaResults,
  upcomingGirabolaMatches as fallbackUpcomingGirabolaMatches,
} from "@/data/girabola";

import { getGirabolaLiveData } from "@/data/girabola-live";

const API_URL =
  "https://www.ligaunitelgirabola.com/api/ancaf?format=matches";

const RESULTS_ROUND = 6;
const AGENDA_ROUND = 7;

type ApiMatch = {
  id: string;
  round: number;
  homeTeamId: string;
  awayTeamId: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  stadium?: string | null;
  status: string;
};

type ResultCardMatch = {
  home: string;
  away: string;
  date: string;
  homeScore: number;
  awayScore: number;
};

type AgendaCardMatch = {
  home: string;
  away: string;
  date: string;
  time: string;
  venue: string;
  homeScore: number | null;
  awayScore: number | null;
  status: string;
};

type JourneyData = {
  resultsRound: number;
  agendaRound: number;
  results: ResultCardMatch[];
  agenda: AgendaCardMatch[];
};

const topScorers = [
  { position: 1, player: "Dagó Tshibamba", team: "1.º de Agosto", goals: 5 },
  { position: 2, player: "Mabululu", team: "Wiliete", goals: 4 },
  { position: 3, player: "Ningui", team: "Wiliete", goals: 3 },
  { position: 4, player: "Lito", team: "Bravos do Maquis", goals: 3 },
  { position: 5, player: "Tiago Azulão", team: "Petro de Luanda", goals: 2 },
];

function normalizeTeamName(team: string): string {
  return team
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function displayTeamName(team: string): string {
  const normalized = normalizeTeamName(team);

  const names: Record<string, string> = {
    "clube desportivo da lunda-sul": "Desportivo da Lunda Sul",
    "desportivo da lunda-sul": "Desportivo da Lunda Sul",
    "desportivo da lunda sul": "Desportivo da Lunda Sul",
    "lunda-sul": "Desportivo da Lunda Sul",
    "lunda sul": "Desportivo da Lunda Sul",

    "futebol clube de cabinda": "FC. Cabinda",
    "fc cabinda": "FC. Cabinda",
    "fc. cabinda": "FC. Cabinda",
    cabinda: "FC. Cabinda",

    "clube desportivo 1.º de agosto": "1.º de Agosto",
    "clube desportivo 1º de agosto": "1.º de Agosto",
    "1 de agosto": "1.º de Agosto",
    "1.º de agosto": "1.º de Agosto",
    "1º de agosto": "1.º de Agosto",

    "atletico petroleos de luanda": "Petro de Luanda",
    "atletico petróleo de luanda": "Petro de Luanda",
    "petro de luanda": "Petro de Luanda",

    "futebol clube bravos do maquis": "Bravos do Maquis",
    "bravos do maquis": "Bravos do Maquis",

    "grupo desportivo interclube": "Interclube",
    interclube: "Interclube",

    "clube desportivo da huila": "Desportivo da Huíla",
    "desportivo da huila": "Desportivo da Huíla",

    "clube recreativo e desportivo do libolo": "Recreativo do Libolo",
    "recreativo do libolo": "Recreativo do Libolo",

    "kabuscorp sport clube do palanca": "Kabuscorp",
    kabuscorp: "Kabuscorp",

    "clube recreativo da caala": "Recreativo da Caála",
    "recreativo da caala": "Recreativo da Caála",

    "futebol clube de luanda": "FC Luanda",
    "fc luanda": "FC Luanda",

    "sao salvador do kongo futebol clube": "São Salvador",
    "sao salvador": "São Salvador",

    "clube desportivo sagrada esperanca": "Sagrada Esperança",
    "sagrada esperanca": "Sagrada Esperança",

    "academica petroleos clube do lobito": "Académica do Lobito",
    "academica do lobito": "Académica do Lobito",

    "estrela clube primeiro de maio": "1.º de Maio",
    "1 de maio": "1.º de Maio",

    "wiliete sport clube de benguela": "Wiliete",
    wiliete: "Wiliete",
  };

  return names[normalized] ?? team;
}

function getClubLogo(team: string): string {
  const normalized = normalizeTeamName(team);

  if (normalized.includes("wiliete")) return "/clubs/wiliete.png";

  if (
    normalized.includes("1.º de agosto") ||
    normalized.includes("1º de agosto") ||
    normalized.includes("1 de agosto") ||
    normalized.includes("primeiro de agosto")
  ) {
    return "/clubs/1-de-agosto.png";
  }

  if (normalized.includes("petro")) return "/clubs/petro-de-luanda.png";
  if (normalized.includes("bravos")) return "/clubs/bravos-do-maquis.png";
  if (normalized.includes("interclube")) return "/clubs/interclube.png";
  if (normalized.includes("huila")) return "/clubs/desportivo-da-huila.png";
  if (normalized.includes("libolo")) return "/clubs/recreativo-do-libolo.png";
  if (normalized.includes("kabuscorp")) return "/clubs/kabuscorp.png";
  if (normalized.includes("lunda")) return "/clubs/lunda-sul.png";
  if (normalized.includes("caala")) return "/clubs/recreativo-da-caala.png";
  if (normalized.includes("luanda")) return "/clubs/fc-luanda.png";
  if (normalized.includes("sao salvador")) return "/clubs/sao-salvador.png";
  if (normalized.includes("sagrada")) return "/clubs/sagrada-esperanca.png";
  if (normalized.includes("cabinda")) return "/clubs/cabinda.png";

  if (normalized.includes("academica") || normalized.includes("lobito")) {
    return "/clubs/academica-do-lobito.png";
  }

  if (normalized.includes("maio")) return "/clubs/1-de-maio.png";

  return "/clubs/wiliete.png";
}

function repairText(value: string): string {
  if (!/[ÃÂâ]/.test(value)) return value;

  try {
    const bytes = Uint8Array.from(
      Array.from(value, (character) =>
        character.charCodeAt(0) & 255,
      ),
    );

    const repaired = new TextDecoder("utf-8").decode(bytes);

    return repaired.includes("\uFFFD") ? value : repaired;
  } catch {
    return value;
  }
}

function formatMatchDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-AO", {
    timeZone: "Africa/Luanda",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatMatchTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "--:--";

  return new Intl.DateTimeFormat("pt-AO", {
    timeZone: "Africa/Luanda",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

async function getJourneyData(): Promise<JourneyData> {
  try {
    const response = await fetch(API_URL, {
      next: { revalidate: 300 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API respondeu com estado ${response.status}`);
    }

    const payload = (await response.json()) as {
      matches?: ApiMatch[];
    };

    const matches = payload.matches;

    if (!Array.isArray(matches) || matches.length === 0) {
      throw new Error("A API não devolveu jogos válidos.");
    }

    // RESULTADOS: apenas jogos concluídos da 6.ª jornada.
    const results = matches
      .filter(
        (match) =>
          match.round === RESULTS_ROUND &&
          match.status === "finished" &&
          typeof match.homeScore === "number" &&
          typeof match.awayScore === "number",
      )
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime(),
      )
      .map((match) => ({
        home: repairText(match.homeTeam),
        away: repairText(match.awayTeam),
        date: formatMatchDate(match.date),
        homeScore: match.homeScore as number,
        awayScore: match.awayScore as number,
      }));

    // AGENDA: todos os jogos da 7.ª jornada, concluídos ou agendados.
    // Assim, Petro x Kabuscorp não desaparece por já ter sido disputado.
    const agenda = matches
      .filter((match) => match.round === AGENDA_ROUND)
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime(),
      )
      .map((match) => ({
        home: repairText(match.homeTeam),
        away: repairText(match.awayTeam),
        date: formatMatchDate(match.date),
        time: formatMatchTime(match.date),
        venue: repairText(
          match.stadium || "Estádio por confirmar",
        ),
        homeScore:
          typeof match.homeScore === "number"
            ? match.homeScore
            : null,
        awayScore:
          typeof match.awayScore === "number"
            ? match.awayScore
            : null,
        status: match.status,
      }));

    if (results.length === 0) {
      throw new Error(
        "A API não devolveu resultados concluídos da 6.ª jornada.",
      );
    }

    if (agenda.length === 0) {
      throw new Error(
        "A API não devolveu jogos da 7.ª jornada.",
      );
    }

    return {
      resultsRound: RESULTS_ROUND,
      agendaRound: AGENDA_ROUND,
      results,
      agenda,
    };
  } catch (error) {
    console.error(
      "Erro ao carregar os jogos das jornadas 6 e 7:",
      error,
    );

    // Se a API falhar, utiliza os dados de reserva disponíveis.
    const fallbackResults = fallbackRecentGirabolaResults
      .filter((match) => match.round.includes("6"))
      .map((match) => ({
        home: match.home,
        away: match.away,
        date: match.date,
        homeScore: match.homeScore,
        awayScore: match.awayScore,
      }));

    const fallbackAgenda = fallbackUpcomingGirabolaMatches
      .filter((match) => match.round.includes("7"))
      .map((match) => ({
        home: match.home,
        away: match.away,
        date: match.date,
        time: match.time,
        venue: match.venue,
        homeScore: null,
        awayScore: null,
        status: "scheduled",
      }));

    return {
      resultsRound: RESULTS_ROUND,
      agendaRound: AGENDA_ROUND,
      results:
        fallbackResults.length > 0
          ? fallbackResults
          : fallbackRecentGirabolaResults.map((match) => ({
              home: match.home,
              away: match.away,
              date: match.date,
              homeScore: match.homeScore,
              awayScore: match.awayScore,
            })),
      agenda:
        fallbackAgenda.length > 0
          ? fallbackAgenda
          : fallbackUpcomingGirabolaMatches.map((match) => ({
              home: match.home,
              away: match.away,
              date: match.date,
              time: match.time,
              venue: match.venue,
              homeScore: null,
              awayScore: null,
              status: "scheduled",
            })),
    };
  }
}

function isMatchFinished(match: AgendaCardMatch): boolean {
  return (
    match.status === "finished" &&
    typeof match.homeScore === "number" &&
    typeof match.awayScore === "number"
  );
}

function isMatchLive(match: AgendaCardMatch): boolean {
  return (
    match.status === "live" ||
    match.status === "in_progress" ||
    match.status === "in-progress"
  );
}

export default async function GirabolaPage() {
  const [liveData, journeyData] = await Promise.all([
    getGirabolaLiveData({
      girabolaStandings: fallbackGirabolaStandings,
      recentGirabolaResults: fallbackRecentGirabolaResults,
      upcomingGirabolaMatches: fallbackUpcomingGirabolaMatches,
    }),
    getJourneyData(),
  ]);

  const { girabolaStandings } = liveData;

  const {
    resultsRound,
    agendaRound,
    results,
    agenda,
  } = journeyData;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-blue-950">
        <div className="absolute inset-0">
          <Image
            src="/liga-girabola.jpg"
            alt="Girabola"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-blue-950/40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-red-400">
              Futebol Angolano
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-6xl">
              Girabola
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
              Resultados, classificação, próximos jogos, goleadores e as
              principais notícias do campeonato nacional de futebol.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#resultados"
                className="rounded-full bg-red-600 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-red-500"
              >
                Resultados
              </a>

              <a
                href="#classificacao"
                className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-blue-950"
              >
                Classificação
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="clubes">
        <GirabolaClubsBar />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <GirabolaNewsSlider />

        <section
          id="resultados"
          className="mt-12 grid gap-6 lg:grid-cols-2"
        >
          {/* RESULTADOS DA 6.ª JORNADA */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                    Resultados
                  </p>
                  <h2 className="mt-1 text-xl font-black text-blue-950 md:text-2xl">
                    {resultsRound}.ª Jornada
                  </h2>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-blue-950">
                  Finalizados
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {results.length > 0 ? (
                results.map((match, index) => (
                  <div
                    key={`${match.home}-${match.away}-${index}`}
                    className="px-6 py-4"
                  >
                    <div className="mb-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {match.date}
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                      <div className="flex items-center justify-end gap-2 text-right">
                        <span className="text-xs font-black text-blue-950 md:text-sm">
                          {displayTeamName(match.home)}
                        </span>

                        <div className="relative hidden h-8 w-8 shrink-0 sm:block">
                          <Image
                            src={getClubLogo(match.home)}
                            alt={`Logótipo ${displayTeamName(match.home)}`}
                            fill
                            sizes="32px"
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="min-w-[54px] rounded-lg bg-blue-950 px-3 py-2 text-center text-sm font-black text-white">
                        {match.homeScore}
                        <span className="mx-1 text-blue-300">-</span>
                        {match.awayScore}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="relative hidden h-8 w-8 shrink-0 sm:block">
                          <Image
                            src={getClubLogo(match.away)}
                            alt={`Logótipo ${displayTeamName(match.away)}`}
                            fill
                            sizes="32px"
                            className="object-contain"
                          />
                        </div>

                        <span className="text-xs font-black text-blue-950 md:text-sm">
                          {displayTeamName(match.away)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="px-6 py-8 text-center text-sm text-slate-500">
                  Ainda não existem resultados disponíveis para esta jornada.
                </p>
              )}
            </div>
          </div>

          {/* TODOS OS JOGOS DA 7.ª JORNADA */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                    Agenda
                  </p>
                  <h2 className="mt-1 text-xl font-black text-blue-950 md:text-2xl">
                    {agendaRound}.ª Jornada
                  </h2>
                </div>

                <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-red-600">
                  Calendário
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {agenda.length > 0 ? (
                agenda.map((match, index) => {
                  const finished = isMatchFinished(match);
                  const live = isMatchLive(match);

                  return (
                    <div
                      key={`${match.home}-${match.away}-${index}`}
                      className="px-6 py-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        <span>{match.date}</span>
                        <span>
                          {finished
                            ? "Finalizado"
                            : live
                              ? "Em direto"
                              : match.time}
                        </span>
                      </div>

                      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <div className="flex items-center justify-end gap-2 text-right">
                          <span className="text-xs font-black text-blue-950 md:text-sm">
                            {displayTeamName(match.home)}
                          </span>

                          <div className="relative hidden h-8 w-8 shrink-0 sm:block">
                            <Image
                              src={getClubLogo(match.home)}
                              alt={`Logótipo ${displayTeamName(match.home)}`}
                              fill
                              sizes="32px"
                              className="object-contain"
                            />
                          </div>
                        </div>

                        {typeof match.homeScore === "number" &&
                        typeof match.awayScore === "number" ? (
                          <div className="min-w-[54px] rounded-lg bg-blue-950 px-3 py-2 text-center text-sm font-black text-white">
                            {match.homeScore}
                            <span className="mx-1 text-blue-300">-</span>
                            {match.awayScore}
                          </div>
                        ) : (
                          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-[10px] font-black uppercase text-blue-950">
                            vs
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <div className="relative hidden h-8 w-8 shrink-0 sm:block">
                            <Image
                              src={getClubLogo(match.away)}
                              alt={`Logótipo ${displayTeamName(match.away)}`}
                              fill
                              sizes="32px"
                              className="object-contain"
                            />
                          </div>

                          <span className="text-xs font-black text-blue-950 md:text-sm">
                            {displayTeamName(match.away)}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 text-center text-[10px] font-medium text-slate-400">
                        {match.venue}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="px-6 py-8 text-center text-sm text-slate-500">
                  Não existem jogos disponíveis para esta jornada.
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          id="classificacao"
          className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]"
        >
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                Campeonato
              </p>
              <h2 className="mt-1 text-xl font-black text-blue-950 md:text-2xl">
                Classificação
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-wider text-slate-500">
                    <th className="px-4 py-3 text-center">#</th>
                    <th className="px-4 py-3">Clube</th>
                    <th className="px-3 py-3 text-center">J</th>
                    <th className="px-3 py-3 text-center">V</th>
                    <th className="px-3 py-3 text-center">E</th>
                    <th className="px-3 py-3 text-center">D</th>
                    <th className="px-3 py-3 text-center">GM</th>
                    <th className="px-3 py-3 text-center">GS</th>
                    <th className="px-4 py-3 text-center">Pts</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {girabolaStandings.map((team) => (
                    <tr
                      key={team.position}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
                            team.position <= 4
                              ? "bg-blue-950 text-white"
                              : team.position >= 15
                                ? "bg-red-50 text-red-600"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {team.position}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-8 w-8 shrink-0">
                            <Image
                              src={getClubLogo(team.team)}
                              alt={`Logótipo ${displayTeamName(team.team)}`}
                              fill
                              sizes="32px"
                              className="object-contain"
                            />
                          </div>
                          <span className="text-xs font-black text-blue-950 md:text-sm">
                            {displayTeamName(team.team)}
                          </span>
                        </div>
                      </td>

                      <td className="px-3 py-3 text-center text-xs font-bold text-slate-600">
                        {team.played}
                      </td>
                      <td className="px-3 py-3 text-center text-xs font-bold text-slate-600">
                        {team.wins}
                      </td>
                      <td className="px-3 py-3 text-center text-xs font-bold text-slate-600">
                        {team.draws}
                      </td>
                      <td className="px-3 py-3 text-center text-xs font-bold text-slate-600">
                        {team.losses}
                      </td>
                      <td className="px-3 py-3 text-center text-xs font-bold text-slate-600">
                        {team.goalsFor}
                      </td>
                      <td className="px-3 py-3 text-center text-xs font-bold text-slate-600">
                        {team.goalsAgainst}
                      </td>
                      <td className="px-4 py-3 text-center text-sm font-black text-blue-950">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-4 border-t border-slate-200 px-6 py-4 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <span>J = Jogos</span>
              <span>V = Vitórias</span>
              <span>E = Empates</span>
              <span>D = Derrotas</span>
              <span>GM = Golos marcados</span>
              <span>GS = Golos sofridos</span>
              <span>Pts = Pontos</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                Artilharia
              </p>
              <h2 className="mt-1 text-xl font-black text-blue-950 md:text-2xl">
                Melhores Marcadores
              </h2>
            </div>

            <div className="divide-y divide-slate-100">
              {topScorers.map((scorer) => (
                <div
                  key={`${scorer.player}-${scorer.team}`}
                  className="flex items-center gap-4 px-6 py-4"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                      scorer.position === 1
                        ? "bg-red-600 text-white"
                        : "bg-blue-50 text-blue-950"
                    }`}
                  >
                    {scorer.position}
                  </div>

                  <div className="relative h-9 w-9 shrink-0">
                    <Image
                      src={getClubLogo(scorer.team)}
                      alt={`Logótipo ${displayTeamName(scorer.team)}`}
                      fill
                      sizes="36px"
                      className="object-contain"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-blue-950">
                      {scorer.player}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      {displayTeamName(scorer.team)}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-black text-red-600">
                      {scorer.goals}
                    </span>
                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      golos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-2xl bg-blue-950 shadow-lg">
          <div className="relative">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-600/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative px-6 py-8 md:px-10 md:py-10">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3">
                  <span className="h-1 w-10 rounded-full bg-red-600" />
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400">
                    Rádio Relato
                  </p>
                </div>

                <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
                  Acompanhe o Girabola com a Rádio Relato
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100 md:text-base">
                  Informação, análise e acompanhamento dos principais jogos
                  do futebol angolano, com o olhar e a voz da Rádio Relato.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/programas/trumunu-online"
                    className="inline-flex rounded-full bg-red-600 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-blue-950"
                  >
                    Trumunu Online →
                  </Link>

                  <Link
                    href="/programas"
                    className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-blue-950"
                  >
                    Ver programas
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
