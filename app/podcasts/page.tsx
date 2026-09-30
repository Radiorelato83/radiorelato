export default function PodcastsPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      <section className="bg-blue-900 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">

          <p className="text-blue-300 font-semibold uppercase tracking-wider mb-3">
            Rádio Relato
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Podcasts
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl">
            Ouça os melhores programas, entrevistas e conteúdos
            desportivos da Rádio Relato.
          </p>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Últimos episódios
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">

            <div className="h-48 bg-blue-800 flex items-center justify-center">
              <span className="text-6xl">🎙️</span>
            </div>

            <div className="p-6">

              <p className="text-sm text-blue-700 font-semibold mb-2">
                BOLA INFORMATIVA
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                As principais notícias do desporto
              </h3>

              <p className="text-gray-600 mb-5">
                Informação, análise e actualidade desportiva.
              </p>

              <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full font-semibold transition-colors">
                ▶ Ouvir episódio
              </button>

            </div>

          </article>

          <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">

            <div className="h-48 bg-blue-800 flex items-center justify-center">
              <span className="text-6xl">⚽</span>
            </div>

            <div className="p-6">

              <p className="text-sm text-blue-700 font-semibold mb-2">
                ANÁLISE DESPORTIVA
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                O futebol angolano em análise
              </h3>

              <p className="text-gray-600 mb-5">
                Comentários e análise sobre o futebol nacional.
              </p>

              <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full font-semibold transition-colors">
                ▶ Ouvir episódio
              </button>

            </div>

          </article>

          <article className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">

            <div className="h-48 bg-blue-800 flex items-center justify-center">
              <span className="text-6xl">🏆</span>
            </div>

            <div className="p-6">

              <p className="text-sm text-blue-700 font-semibold mb-2">
                ESPECIAL DESPORTO
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Grandes histórias do desporto
              </h3>

              <p className="text-gray-600 mb-5">
                Histórias, protagonistas e momentos inesquecíveis.
              </p>

              <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-full font-semibold transition-colors">
                ▶ Ouvir episódio
              </button>

            </div>

          </article>

        </div>

      </section>

    </main>
  );
}
