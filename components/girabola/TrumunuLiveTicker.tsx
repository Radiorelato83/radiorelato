
"use client";

import { useEffect, useRef, useState } from "react";

type Match = {
  id?: string;
  round: number;
  homeTeamId?: string;
  awayTeamId?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  stadium?: string | null;
  status: string;
};

type Score = {
  home: number | null;
  away: number | null;
};

type Props = {
  active: boolean;
};

function matchKey(match: Match): string {
  return (
    match.id ??
    `${match.round}-${match.homeTeamId ?? match.homeTeam}-${match.awayTeamId ?? match.awayTeam}-${match.date}`
  );
}

function normalizeStatus(status: string): string {
  return status
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .trim();
}

function isLive(match: Match): boolean {
  const status = normalizeStatus(match.status);

  return /live|in progress|playing|in play|first half|second half|half time|intervalo|em direto|em jogo/.test(
    status,
  );
}

function isFinished(match: Match): boolean {
  const status = normalizeStatus(match.status);

  return /finished|completed|full time|finalizado|encerrado|concluido|terminado/.test(
    status,
  );
}

function timestamp(match: Match): number {
  const value = new Date(match.date).getTime();

  return Number.isNaN(value) ? 0 : value;
}

function formatDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data por confirmar";
  }

  return new Intl.DateTimeFormat("pt-AO", {
    timeZone: "Africa/Luanda",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function selectMatches(matches: Match[]): Match[] {
  const now = Date.now();
  const yesterday = now - 24 * 60 * 60 * 1000;
  const tomorrow = now + 36 * 60 * 60 * 1000;

  const live = matches
    .filter(isLive)
    .sort((a, b) => timestamp(a) - timestamp(b));

  const recent = matches
    .filter(
      (match) =>
        isFinished(match) &&
        timestamp(match) >= yesterday &&
        timestamp(match) <= now,
    )
    .sort((a, b) => timestamp(b) - timestamp(a));

  const upcoming = matches
    .filter(
      (match) =>
        !isLive(match) &&
        !isFinished(match) &&
        timestamp(match) >= now &&
        timestamp(match) <= tomorrow,
    )
    .sort((a, b) => timestamp(a) - timestamp(b));

  const selected = [
    ...live,
    ...recent,
    ...upcoming,
  ];

  const unique = Array.from(
    new Map(
      selected.map((match) => [matchKey(match), match]),
    ).values(),
  );

  if (unique.length > 0) {
    return unique.slice(0, 16);
  }

  // Se não houver jogos em directo, apresenta os resultados
  // mais recentes e, depois, os próximos jogos disponíveis.
  const latestResults = matches
    .filter(isFinished)
    .sort((a, b) => timestamp(b) - timestamp(a))
    .slice(0, 6);

  const nextMatches = matches
    .filter(
      (match) =>
        !isLive(match) &&
        !isFinished(match) &&
        timestamp(match) > now,
    )
    .sort((a, b) => timestamp(a) - timestamp(b))
    .slice(0, 6);

  return [...latestResults, ...nextMatches].slice(0, 12);
}

export default function TrumunuLiveTicker({
  active,
}: Props) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [goalAlert, setGoalAlert] = useState("");
  const [connectionError, setConnectionError] = useState(false);

  const previousScores = useRef<Map<string, Score>>(
    new Map(),
  );

  const alertTimer =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setGoalAlert("");
      previousScores.current.clear();
      return;
    }

    let stopped = false;
    let pollTimer: ReturnType<typeof setTimeout> | null = null;

    async function loadScores() {
      try {
        const response = await fetch("/api/girabola-live", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(
            `O serviço respondeu com o estado ${response.status}.`,
          );
        }

        const data = (await response.json()) as {
          matches?: Match[];
        };

        const incoming = Array.isArray(data.matches)
          ? data.matches
          : [];

        if (stopped) return;

        const previous = previousScores.current;
        const goalEvents: string[] = [];

        for (const match of incoming) {
          const oldScore = previous.get(matchKey(match));

          // A primeira consulta cria uma referência inicial.
          // O alerta só é emitido quando um resultado aumenta
          // numa consulta posterior.
          if (!oldScore) continue;

          const homeScored =
            typeof match.homeScore === "number" &&
            typeof oldScore.home === "number" &&
            match.homeScore > oldScore.home;

          const awayScored =
            typeof match.awayScore === "number" &&
            typeof oldScore.away === "number" &&
            match.awayScore > oldScore.away;

          if (homeScored || awayScored) {
            const teams = [
              ...(homeScored ? [match.homeTeam] : []),
              ...(awayScored ? [match.awayTeam] : []),
            ];

            goalEvents.push(
              `GOLO! ${teams.join(" e ")} — ` +
                `${match.homeTeam} ${match.homeScore}–${match.awayScore} ${match.awayTeam}`,
            );
          }
        }

        previousScores.current = new Map(
          incoming.map((match) => [
            matchKey(match),
            {
              home: match.homeScore,
              away: match.awayScore,
            },
          ]),
        );

        setMatches(selectMatches(incoming));
        setConnectionError(false);

        if (goalEvents.length > 0) {
          setGoalAlert(goalEvents[goalEvents.length - 1]);

          if (alertTimer.current) {
            clearTimeout(alertTimer.current);
          }

          alertTimer.current = setTimeout(() => {
            setGoalAlert("");
          }, 10_000);
        }
      } catch (error) {
        if (!stopped) {
          console.error(
            "Erro ao actualizar o slide do Girabola:",
            error,
          );

          setConnectionError(true);
        }
      } finally {
        // Consulta os resultados novamente enquanto o
        // Trumunu Online estiver activo.
        if (!stopped) {
          pollTimer = setTimeout(loadScores, 15_000);
        }
      }
    }

    void loadScores();

    return () => {
      stopped = true;

      if (pollTimer) {
        clearTimeout(pollTimer);
      }

      if (alertTimer.current) {
        clearTimeout(alertTimer.current);
        alertTimer.current = null;
      }
    };
  }, [active]);

  useEffect(() => {
    if (!active || matches.length < 2) {
      setSlideIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setSlideIndex(
        (current) => (current + 1) % matches.length,
      );
    }, 6_000);

    return () => clearInterval(timer);
  }, [active, matches.length]);

  if (!active) {
    return null;
  }

  const currentMatch =
    matches.length > 0
      ? matches[slideIndex % matches.length]
      : null;

  const currentIsLive = currentMatch
    ? isLive(currentMatch)
    : false;

  const currentIsFinished = currentMatch
    ? isFinished(currentMatch)
    : false;

  return (
    <section
      aria-label="Resultados do Girabola durante o Trumunu Online"
      className="overflow-hidden rounded-2xl border border-blue-900 bg-blue-950 text-white shadow-lg"
    >
      {goalAlert && (
        <div
          role="alert"
          aria-live="assertive"
          className="border-b border-red-400/30 bg-red-600 px-4 py-3 text-center"
        >
          <p className="text-xs font-black uppercase tracking-[0.2em]">
            Alerta de golo
          </p>

          <p className="mt-1 text-sm font-black md:text-base">
            {goalAlert}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-400">
              Rádio Relato
            </p>

            <h2 className="text-sm font-black md:text-base">
              Trumunu Online · Girabola
            </h2>
          </div>
        </div>

        <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-100">
          Actualização automática
        </span>
      </div>

      <div className="min-h-[170px] px-4 py-5 md:px-6">
        {currentMatch ? (
          <div
            key={matchKey(currentMatch)}
            className="ticker-slide"
          >
            <div className="mb-5 flex items-center justify-between gap-3 text-xs">
              <span
                className={`rounded-full px-3 py-1 font-black uppercase tracking-wide ${
                  currentIsLive
                    ? "bg-red-600 text-white"
                    : currentIsFinished
                      ? "bg-white/15 text-blue-100"
                      : "bg-blue-800 text-blue-100"
                }`}
              >
                {currentIsLive
                  ? "Em directo"
                  : currentIsFinished
                    ? "Finalizado"
                    : "A seguir"}
              </span>

              <span className="text-blue-200">
                {formatDate(currentMatch.date)}
              </span>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
              <span className="break-words text-right text-sm font-black md:text-lg">
                {currentMatch.homeTeam}
              </span>

              <div className="min-w-[82px] rounded-xl bg-white px-4 py-3 text-center text-xl font-black text-blue-950 md:min-w-[100px] md:text-2xl">
                {typeof currentMatch.homeScore === "number" &&
                typeof currentMatch.awayScore === "number"
                  ? `${currentMatch.homeScore} – ${currentMatch.awayScore}`
                  : "VS"}
              </div>

              <span className="break-words text-sm font-black md:text-lg">
                {currentMatch.awayTeam}
              </span>
            </div>

            {currentMatch.stadium && (
              <p className="mt-4 text-center text-xs text-blue-200">
                {currentMatch.stadium}
              </p>
            )}
          </div>
        ) : (
          <div className="flex min-h-[120px] items-center justify-center text-center">
            <p className="max-w-md text-sm text-blue-100">
              {connectionError
                ? "Não foi possível actualizar os resultados. O sistema tentará novamente."
                : "A carregar os resultados do Girabola…"}
            </p>
          </div>
        )}
      </div>

      {matches.length > 1 && (
        <div className="flex justify-center gap-2 pb-4">
          {matches.map((match, index) => (
            <button
              key={matchKey(match)}
              type="button"
              aria-label={`Mostrar jogo ${index + 1}`}
              aria-current={
                index === slideIndex % matches.length
              }
              onClick={() => setSlideIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === slideIndex % matches.length
                  ? "w-6 bg-red-500"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        .ticker-slide {
          animation: ticker-enter 450ms ease-out;
        }

        @keyframes ticker-enter {
          from {
            opacity: 0;
            transform: translateX(14px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-slide {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
