
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

type Standing = {
  position: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

type Result = {
  round: string;
  home: string;
  away: string;
  date: string;
  homeScore: number;
  awayScore: number;
};

type Fixture = {
  round: string;
  home: string;
  away: string;
  date: string;
  time: string;
  venue: string;
  radioCommentary?: boolean;
};

type FallbackData = {
  girabolaStandings: Standing[];
  recentGirabolaResults: Result[];
  upcomingGirabolaMatches: Fixture[];
};

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

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-AO", {
    timeZone: "Africa/Luanda",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatTime(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "--:--";

  return new Intl.DateTimeFormat("pt-AO", {
    timeZone: "Africa/Luanda",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function roundLabel(round: number): string {
  return `${round}.ª Jornada`;
}

export async function getGirabolaLiveData(
  fallback: FallbackData,
): Promise<FallbackData> {
  try {
    const response = await fetch(
      "https://www.ligaunitelgirabola.com/api/ancaf?format=matches",
      {
        next: { revalidate: 300 },
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `API respondeu com estado ${response.status}`,
      );
    }

    const payload = (await response.json()) as {
      matches?: ApiMatch[];
    };

    const matches = payload.matches;

    if (!Array.isArray(matches) || matches.length === 0) {
      throw new Error("A API não devolveu jogos válidos.");
    }

    const teams = new Map<
      string,
      {
        team: string;
        played: number;
        wins: number;
        draws: number;
        losses: number;
        goalsFor: number;
        goalsAgainst: number;
        points: number;
      }
    >();

    for (const match of matches) {
      if (!match.homeTeamId || !match.awayTeamId) continue;

      if (!teams.has(match.homeTeamId)) {
        teams.set(match.homeTeamId, {
          team: repairText(match.homeTeam),
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        });
      }

      if (!teams.has(match.awayTeamId)) {
        teams.set(match.awayTeamId, {
          team: repairText(match.awayTeam),
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          points: 0,
        });
      }
    }

    const finished = matches.filter(
      (match) =>
        match.status === "finished" &&
        typeof match.homeScore === "number" &&
        typeof match.awayScore === "number",
    );

    for (const match of finished) {
      const home = teams.get(match.homeTeamId);
      const away = teams.get(match.awayTeamId);

      if (!home || !away) continue;

      const homeGoals = match.homeScore as number;
      const awayGoals = match.awayScore as number;

      home.played++;
      away.played++;

      home.goalsFor += homeGoals;
      home.goalsAgainst += awayGoals;

      away.goalsFor += awayGoals;
      away.goalsAgainst += homeGoals;

      if (homeGoals > awayGoals) {
        home.wins++;
        home.points += 3;
        away.losses++;
      } else if (homeGoals < awayGoals) {
        away.wins++;
        away.points += 3;
        home.losses++;
      } else {
        home.draws++;
        away.draws++;
        home.points++;
        away.points++;
      }
    }

    const standings = Array.from(teams.values())
      .sort((a, b) => {
        const differenceA = a.goalsFor - a.goalsAgainst;
        const differenceB = b.goalsFor - b.goalsAgainst;

        return (
          b.points - a.points ||
          differenceB - differenceA ||
          b.goalsFor - a.goalsFor ||
          a.team.localeCompare(b.team, "pt")
        );
      })
      .map((team, index) => ({
        position: index + 1,
        ...team,
      }));

    // Conta quantos jogos foram concluídos em cada jornada.
    const finishedByRound = new Map<number, ApiMatch[]>();

    for (const match of finished) {
      const roundMatches =
        finishedByRound.get(match.round) ?? [];

      roundMatches.push(match);
      finishedByRound.set(match.round, roundMatches);
    }

    // A 7.ª jornada pode ter começado sem a 6.ª estar totalmente concluída.
    // Consideramos como jornada de resultados a mais recente com pelo
    // menos cinco jogos concluídos.
    const completedRounds = Array.from(
      finishedByRound.entries(),
    )
      .filter(([, roundMatches]) => roundMatches.length >= 5)
      .sort(([roundA], [roundB]) => roundB - roundA);

    const latestFinishedRound =
      completedRounds[0]?.[0] ??
      Math.max(...finished.map((match) => match.round));

    const selectedRoundMatches =
      finishedByRound.get(latestFinishedRound) ?? [];

    const recentResults = [...selectedRoundMatches]
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime(),
      )
      .map((match) => ({
        round: roundLabel(match.round),
        home: repairText(match.homeTeam),
        away: repairText(match.awayTeam),
        date: formatDate(match.date),
        homeScore: match.homeScore as number,
        awayScore: match.awayScore as number,
      }));

    const upcomingMatches = matches
      .filter(
        (match) =>
          match.status === "scheduled" &&
          new Date(match.date).getTime() >= Date.now(),
      )
      .sort(
        (a, b) =>
          new Date(a.date).getTime() -
          new Date(b.date).getTime(),
      )
      .slice(0, 8)
      .map((match) => ({
        round: roundLabel(match.round),
        home: repairText(match.homeTeam),
        away: repairText(match.awayTeam),
        date: formatDate(match.date),
        time: formatTime(match.date),
        venue: repairText(
          match.stadium || "Estádio por confirmar",
        ),
        radioCommentary: false,
      }));

    if (standings.length === 0 || finished.length === 0) {
      throw new Error(
        "Não foi possível calcular a classificação.",
      );
    }

    return {
      girabolaStandings: standings,
      recentGirabolaResults:
        recentResults.length > 0
          ? recentResults
          : fallback.recentGirabolaResults,
      upcomingGirabolaMatches:
        upcomingMatches.length > 0
          ? upcomingMatches
          : fallback.upcomingGirabolaMatches,
    };
  } catch (error) {
    console.error(
      "Erro ao atualizar dados do Girabola:",
      error,
    );

    return fallback;
  }
}
