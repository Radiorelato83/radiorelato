export default function InternacionalPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="bg-blue-900 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-300 font-semibold uppercase tracking-wider mb-3">
            Rádio Relato
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Futebol Internacional
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl">
            Acompanhe as principais notícias, competições e protagonistas
            do futebol internacional.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Em destaque
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="h-48 bg-blue-800 flex items-center justify-center">
              <span className="text-7xl">🏆</span>
            </div>

            <div className="p-6">
              <p className="text-sm text-blue-700 font-bold uppercase mb-2">
                Grandes competições
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Mundial
              </h3>

              <p className="text-gray-600 mb-5">
                Notícias, resultados e protagonistas das grandes competições
                mundiais.
              </p>

              <button className="text-blue-700 font-bold hover:text-blue-900">
                Ver notícias →
              </button>
            </div>
          </article>

          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="h-48 bg-green-700 flex items-center justify-center">
              <span className="text-7xl">🌍</span>
            </div>

            <div className="p-6">
              <p className="text-sm text-blue-700 font-bold uppercase mb-2">
                África
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                CAN
              </h3>

              <p className="text-gray-600 mb-5">
                Acompanhe a principal competição de selecções do futebol
                africano.
              </p>

              <button className="text-blue-700 font-bold hover:text-blue-900">
                Ver notícias →
              </button>
            </div>
          </article>

          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="h-48 bg-red-700 flex items-center justify-center">
              <span className="text-7xl">⚽</span>
            </div>

            <div className="p-6">
              <p className="text-sm text-blue-700 font-bold uppercase mb-2">
                Futebol mundial
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Futebol Europeu
              </h3>

              <p className="text-gray-600 mb-5">
                Os principais clubes, campeonatos e estrelas do futebol
                internacional.
              </p>

              <button className="text-blue-700 font-bold hover:text-blue-900">
                Ver notícias →
              </button>
            </div>
          </article>

        </div>
      </section>
    </main>
  );
}
