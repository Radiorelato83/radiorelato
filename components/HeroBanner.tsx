import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Conteúdo principal */}
          <div>
            <span className="inline-flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Rádio Relato
            </span>

            <h1 className="mt-6 text-4xl lg:text-6xl font-extrabold leading-tight">
              Desporto com
              <br />
              paixão e alma.
            </h1>

            <p className="mt-6 text-lg text-blue-100 max-w-xl leading-8">
              Acompanhe diariamente as principais notícias, resultados,
              entrevistas e transmissões do desporto angolano e internacional.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                href="/noticias"
                className="bg-white text-blue-900 hover:bg-blue-100 px-7 py-3 rounded-full font-semibold transition"
              >
                📰 Últimas Notícias
              </Link>

              <Link
                href="/ao-vivo"
                className="bg-red-600 hover:bg-red-700 px-7 py-3 rounded-full font-semibold transition"
              >
                🔴 Rádio Ao Vivo
              </Link>
            </div>
          </div>

          {/* Painel lateral */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">
              Em destaque
            </h2>

            <div className="space-y-5">

              <div className="border-b border-white/10 pb-4">
                <span className="text-red-400 text-sm font-semibold">
                  ÚLTIMA HORA
                </span>

                <p className="mt-2 font-medium">
                  Petro de Luanda prepara a nova jornada do Girabola.
                </p>
              </div>

              <div className="border-b border-white/10 pb-4">
                <span className="text-blue-200 text-sm font-semibold">
                  PODCAST
                </span>

                <p className="mt-2">
                  Nova análise disponível.
                </p>
              </div>

              <div>
                <span className="text-green-300 text-sm font-semibold">
                  PRÓXIMA TRANSMISSÃO
                </span>

                <p className="mt-2">
                  Domingo • Petro × Wiliete
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}