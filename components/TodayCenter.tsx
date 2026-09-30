import { todayMatch } from "@/data/matches";

// =====================================================
// CONTROLO EDITORIAL
// false = Centro do Dia oculto
// true  = Centro do Dia ativo
// =====================================================

const showTodayCenter = false;

export default function TodayCenter() {
  if (!showTodayCenter || !todayMatch) {
    return null;
  }

  return (
    <section className="bg-blue-950 py-12 text-white md:py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">

        {/* =====================================================
            CABEÇALHO
        ===================================================== */}

        <div className="mb-8 text-center">

          <div className="mb-3 flex items-center justify-center gap-3">

            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />

              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>

            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300">
              O que acontece hoje
            </p>

          </div>

          <h2 className="text-3xl font-black tracking-tight md:text-4xl">
            Centro do Dia
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-200 md:text-base">
            O acontecimento desportivo que merece a atenção da Rádio Relato.
          </p>

        </div>

        {/* =====================================================
            ACONTECIMENTO PRINCIPAL
        ===================================================== */}

        <article className="group relative min-h-[430px] overflow-hidden rounded-3xl border border-blue-800 shadow-2xl md:min-h-[480px]">

          <img
            src="/matches/petro-sagrada.jpg"
            alt={`${todayMatch.home} vs ${todayMatch.away}`}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-blue-950/75" />

          <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/45 to-blue-950/20" />

          {/* =================================================
              CONTEÚDO
          ================================================= */}

          <div className="relative z-10 flex min-h-[430px] flex-col items-center justify-center px-5 py-12 text-center md:min-h-[480px] md:px-10">

            {/* ETIQUETAS */}

            <div className="mb-7 flex flex-wrap items-center justify-center gap-3">

              <span className="rounded-full bg-red-600 px-5 py-2 text-xs font-black uppercase tracking-[0.08em] text-white shadow-lg">
                Jogo do Dia
              </span>

              <span className="rounded-full border border-white/20 bg-black/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                {todayMatch.competition}
              </span>

            </div>

            {/* CONFRONTO */}

            <div className="flex w-full max-w-4xl flex-col items-center justify-center">

              <h3 className="text-3xl font-black leading-tight tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                {todayMatch.home}
              </h3>

              <div className="my-3 flex items-center gap-4">

                <span className="h-px w-12 bg-white/30 md:w-20" />

                <span className="text-sm font-black uppercase tracking-[0.2em] text-red-400">
                  VS
                </span>

                <span className="h-px w-12 bg-white/30 md:w-20" />

              </div>

              <h3 className="text-2xl font-extrabold leading-tight text-blue-100 md:text-4xl lg:text-5xl">
                {todayMatch.away}
              </h3>

            </div>

            {/* DATA E HORA */}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

              <div className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm">
                {todayMatch.date}
              </div>

              <div className="rounded-full bg-red-600 px-6 py-2.5 text-lg font-black text-white shadow-lg">
                {todayMatch.time}
              </div>

            </div>

            {/* MENSAGEM EDITORIAL */}

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">
              A Rádio Relato acompanha este encontro e prepara a cobertura
              através do{" "}
              <strong className="font-bold text-white">
                Trumunu Online
              </strong>
              .
            </p>

            {/* IDENTIDADE */}

            <div className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white/60">

              <span className="h-2 w-2 rounded-full bg-red-500" />

              Rádio Relato

              <span>•</span>

              Desporto com paixão e alma!

            </div>

          </div>

        </article>

      </div>
    </section>
  );
}