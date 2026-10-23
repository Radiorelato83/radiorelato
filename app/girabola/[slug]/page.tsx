

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { girabolaClubs } from "@/data/girabola-clubs";
import squadsJson from "@/data/girabola-squads.json";

type Player = {
  name: string;
  number?: number | null;
  position?: string | null;
  nationality?: string | null;
};

type StaffMember = {
  role: string;
  name: string;
};

type ExtendedClub = (typeof girabolaClubs)[number] & {
  nickname?: string | null;
  president?: string | null;
  coach?: string | null;
  colors?: string | null;
  officialSource?: string | null;
  squad?: Player[];
  technicalStaff?: StaffMember[];
};

type ExtractedPlayer = {
  id: string | null;
  name: string;
  fullName: string;
  number: number | null;
  position: string;
  nationality: string;
};

type ExtractedTeam = {
  sourceName: string;
  teamId: string;
  club: string;
  players: ExtractedPlayer[];
};

const extractedSquads = squadsJson as ExtractedTeam[];

const sourceTeamIdBySlug: Record<string, string> = {
  wiliete: "wiliete",
  "1-de-agosto": "dago",
  "bravos-do-maquis": "bravos",
  "petro-de-luanda": "petro",
  interclube: "interclube",
  "desportivo-da-huila": "desphuila",
  "1-de-maio": "primeiromaio",
  "recreativo-do-libolo": "libolo",
  kabuscorp: "kabuscorp",
  "lunda-sul": "lundasul",
  "recreativo-da-caala": "caala",
  "fc-luanda": "fcluanda",
  "sao-salvador": "saosalvador",
  "sagrada-esperanca": "sagrada",
  cabinda: "cabinda",
  "academica-do-lobito": "lobito",
};

// Limites confirmados para corrigir os registos excessivos
// que a fonte extraída devolveu para estes dois clubes.
const squadLimitsBySlug: Record<string, number> = {
  "lunda-sul": 28,
  "sagrada-esperanca": 32,
};

function normalizeName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function normalizePosition(value?: string | null): string {
  if (!value || /confirmar/i.test(value)) {
    return "Por confirmar";
  }

  const positions: Record<string, string> = {
    GK: "Guarda-redes",
    DF: "Defesa",
    MF: "Médio",
    FWD: "Avançado",
  };

  return positions[value.trim().toUpperCase()] ?? value;
}

function getSquadForClub(slug: string): Player[] {
  const sourceTeamId = sourceTeamIdBySlug[slug];

  if (!sourceTeamId) {
    return [];
  }

  const sourceTeam = extractedSquads.find(
    (team) => team.teamId === sourceTeamId,
  );

  if (!sourceTeam || !Array.isArray(sourceTeam.players)) {
    return [];
  }

  const seen = new Set<string>();

  const uniquePlayers = sourceTeam.players
    .map((player, index) => ({
      ...player,
      originalIndex: index,
    }))
    .filter((player) => {
      if (!player.name?.trim()) {
        return false;
      }

      const identity = player.id?.trim()
        ? player.id.trim().toLowerCase()
        : `${normalizeName(player.fullName || player.name)}-${player.number ?? "sem-numero"}`;

      if (seen.has(identity)) {
        return false;
      }

      seen.add(identity);
      return true;
    });

  // Prioriza jogadores com número de camisola identificado.
  // Os jogadores sem número ficam depois e continuam identificados
  // como informação por confirmar na tabela.
  uniquePlayers.sort((a, b) => {
    const numberA = a.number ?? Number.MAX_SAFE_INTEGER;
    const numberB = b.number ?? Number.MAX_SAFE_INTEGER;

    return numberA - numberB || a.originalIndex - b.originalIndex;
  });

  const limit = squadLimitsBySlug[slug];
  const selectedPlayers =
    typeof limit === "number"
      ? uniquePlayers.slice(0, limit)
      : uniquePlayers;

  return selectedPlayers.map((player) => ({
    name: player.name,
    number: player.number,
    position: normalizePosition(player.position),
    nationality:
      player.nationality?.trim() || "Por confirmar",
  }));
}

export function generateStaticParams() {
  return girabolaClubs.map((club) => ({
    slug: club.slug,
  }));
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const club = girabolaClubs.find(
    (item) => item.slug === slug,
  ) as ExtendedClub | undefined;

  if (!club) {
    notFound();
  }

  const importedSquad = getSquadForClub(club.slug);

  // Mantém o plantel já existente como alternativa, caso não
  // existam dados importados para determinado clube.
  const squad =
    importedSquad.length > 0
      ? importedSquad
      : club.squad ?? [];

  const staff =
    club.technicalStaff && club.technicalStaff.length > 0
      ? club.technicalStaff
      : club.coach
        ? [{ role: "Treinador principal", name: club.coach }]
        : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <Link
        href="/girabola"
        className="mb-6 inline-block text-sm font-semibold text-blue-700 hover:underline"
      >
        ← Voltar ao Girabola
      </Link>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <div className="relative h-28 w-28 shrink-0">
            <Image
              src={club.logo}
              alt={`Emblema do ${club.name}`}
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>

          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              {club.name}
            </h1>

            {club.nickname && (
              <p className="mt-1 text-gray-600">
                {club.nickname}
              </p>
            )}

            <p className="mt-2 text-sm text-gray-500">
              {club.city}
              {club.founded
                ? ` · Fundação: ${club.founded}`
                : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Ficha do clube
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Info label="Nome oficial" value={club.name} />
          <Info label="Cidade" value={club.city} />
          <Info label="Ano de fundação" value={club.founded} />
          <Info label="Estádio" value={club.stadium} />
          <Info label="Presidente" value={club.president} />
          <Info label="Treinador" value={club.coach} />
          <Info label="Cores oficiais" value={club.colors} />
          <Info label="Palmarés" value={club.titles} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Ficha técnica
        </h2>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          {staff.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {staff.map((member, index) => (
                <div
                  key={`${member.role}-${index}`}
                  className="grid gap-1 p-4 sm:grid-cols-2"
                >
                  <span className="text-sm text-gray-500">
                    {member.role}
                  </span>

                  <span className="font-semibold text-gray-900">
                    {member.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4 text-sm text-gray-600">
              Informação da equipa técnica por confirmar.
            </p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900">
            Plantel
          </h2>

          <span className="text-sm text-gray-500">
            {squad.length} jogadores apresentados
          </span>
        </div>

        {squad.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-gray-500">
              Os campos sem informação confirmada estão assinalados
              como «Por confirmar».
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full min-w-[540px] text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3">N.º</th>
                    <th className="px-4 py-3">Jogador</th>
                    <th className="px-4 py-3">Posição</th>
                    <th className="px-4 py-3">Nacionalidade</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {squad.map((player, index) => (
                    <tr key={`${player.name}-${index}`}>
                      <td className="px-4 py-3">
                        {player.number ?? "—"}
                      </td>

                      <td className="px-4 py-3 font-medium text-gray-900">
                        {player.name}
                      </td>

                      <td className="px-4 py-3">
                        {normalizePosition(player.position)}
                      </td>

                      <td className="px-4 py-3">
                        {player.nationality || "Por confirmar"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-gray-200 p-5">
            <p className="font-medium text-gray-800">
              Plantel em atualização
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Ainda não existem jogadores disponíveis para esta ficha.
            </p>
          </div>
        )}
      </section>

      {club.officialSource && (
        <p className="mt-8 text-sm text-gray-500">
          Fonte para consulta:{" "}
          <a
            href={club.officialSource}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-blue-700 hover:underline"
          >
            Portal oficial da Liga Unitel Girabola
          </a>
        </p>
      )}
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-1 font-semibold text-gray-900">
        {value || "Por confirmar"}
      </p>
    </div>
  );
}
