
const results = [
  ["Fenerbahçe", "2–2", "Slavia Praha"],
  ["Sabah", "1–2", "Borussia Dortmund"],
  ["Roma", "4–0", "Slovan Bratislava"],
  ["Porto", "0–1", "PSV Eindhoven"],
  ["Liverpool", "4–3", "Villarreal"],
  ["Manchester City", "5–1", "AEK Atenas"],
  ["PSG", "4–2", "Barcelona"],
  ["Napoli", "4–3", "Bodø/Glimt"],
  ["Stuttgart", "1–1", "Atlético de Madrid"],
];

const fixtures = [
  ["17h45", "Como", "Manchester United"],
  ["17h45", "Lille", "Galatasaray"],
  ["20h00", "Aston Villa", "Viking"],
  ["20h00", "Club Brugge", "Lens"],
  ["20h00", "Bayern Munique", "Arsenal"],
  ["20h00", "Inter", "Shakhtar Donetsk"],
  ["20h00", "Real Madrid", "RB Leipzig"],
  ["20h00", "Real Betis", "Feyenoord"],
  ["20h00", "Sporting CP", "LASK"],
];

export default function ChampionsLeagueSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Futebol internacional
          </p>
          <h2 className="text-2xl font-black md:text-3xl">
            Liga dos Campeões
          </h2>
        </div>
        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
          Jornada 3
        </span>
      </div>

      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="bg-gray-950 p-5 text-white md:p-7">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-red-400">
            Destaque da jornada · 20 de Outubro
          </p>
          <h3 className="max-w-3xl text-2xl font-black leading-tight md:text-4xl">
            Noite de campeões no Parque dos Príncipes: PSG vence Barcelona por 4–2
          </h3>
          <div className="my-5 flex flex-wrap items-center justify-center gap-5 md:gap-10">
            <div className="text-center">
              <p className="text-lg font-bold md:text-2xl">PSG</p>
              <p className="text-5xl font-black md:text-6xl">4</p>
            </div>
            <span className="text-gray-400">—</span>
            <div className="text-center">
              <p className="text-lg font-bold md:text-2xl">Barcelona</p>
              <p className="text-5xl font-black md:text-6xl">2</p>
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-gray-300 md:text-base">
            Désiré Doué, Lucas Hernández, Vitinha e Fabián Ruiz marcaram para
            os parisienses. Xavi Espart e Lamine Yamal fizeram os golos do
            Barcelona, numa partida de seis golos.
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-2">
          <div className="p-5 md:p-6">
            <h3 className="mb-4 text-lg font-extrabold">
              Resultados de ontem
            </h3>
            <p className="mb-4 text-xs text-gray-500">20 de Outubro de 2026</p>
            <ul className="space-y-3">
              {results.map(([home, score, away]) => (
                <li
                  key={home}
                  className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3 text-sm dark:border-gray-800"
                >
                  <span className="min-w-0 flex-1">{home}</span>
                  <strong className="rounded-md bg-gray-100 px-2 py-1 text-gray-950 dark:bg-gray-800 dark:text-white">
                    {score}
                  </strong>
                  <span className="min-w-0 flex-1 text-right">{away}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 p-5 dark:border-gray-800 md:border-l md:border-t-0 md:p-6">
            <h3 className="mb-4 text-lg font-extrabold">Jogos de hoje</h3>
            <p className="mb-4 text-xs text-gray-500">
              21 de Outubro de 2026 · Hora de Angola
            </p>
            <ul className="space-y-3">
              {fixtures.map(([time, home, away]) => (
                <li
                  key={`${home}-${away}`}
                  className="flex items-center gap-3 border-b border-gray-100 pb-3 text-sm dark:border-gray-800"
                >
                  <span className="w-14 shrink-0 rounded-md bg-red-50 px-2 py-1 text-center font-bold text-red-700 dark:bg-red-950 dark:text-red-300">
                    {time}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{home}</span>
                    <span className="block text-gray-500">vs. {away}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
}
