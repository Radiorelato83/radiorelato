export default function GirabolaPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Cabeçalho */}
      <section className="bg-blue-900 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">

          <p className="text-blue-300 font-semibold uppercase tracking-wider mb-3">
            Rádio Relato
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Liga Unitel Girabola
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl">
            Acompanhe tudo sobre o principal campeonato de futebol de Angola.
          </p>

        </div>
      </section>

      {/* Destaque principal */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          <div className="h-80 bg-green-800 rounded-2xl flex items-center justify-center">
            <span className="text-8xl">⚽</span>
          </div>

          <div className="flex flex-col justify-center">

            <p className="text-sm text-blue-700 font-bold uppercase mb-3">
              Campeonato Nacional
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Toda a emoção da Liga Unitel Girabola
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              Notícias, análise, clubes, jogadores e tudo o que acontece
              no futebol nacional.
            </p>

            <button
              type="button"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full font-semibold w-fit transition-colors"
            >
              Ver últimas notícias
            </button>

          </div>

        </div>

        {/* Notícias do Girabola */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Últimas notícias
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

          {/* Campeonato */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            <div className="h-48 bg-green-700 flex items-center justify-center">
              <span className="text-6xl">🏆</span>
            </div>

            <div className="p-6">

              <p className="text-sm text-blue-700 font-semibold mb-2">
                CAMPEONATO
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Acompanhe a actualidade do campeonato
              </h3>

              <p className="text-gray-600 mb-5">
                Todas as novidades das equipas e da competição.
              </p>

              <button
                type="button"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Ler mais →
              </button>

            </div>

          </article>

          {/* Clubes */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            <div className="h-48 bg-green-700 flex items-center justify-center">
              <span className="text-6xl">⚽</span>
            </div>

            <div className="p-6">

              <p className="text-sm text-blue-700 font-semibold mb-2">
                CLUBES
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Os clubes em destaque
              </h3>

              <p className="text-gray-600 mb-5">
                Conheça as principais equipas do futebol nacional.
              </p>

              <button
                type="button"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Ver clubes →
              </button>

            </div>

          </article>

          {/* Classificação */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            <div className="h-48 bg-green-700 flex items-center justify-center">
              <span className="text-6xl">📊</span>
            </div>

            <div className="p-6">

              <p className="text-sm text-blue-700 font-semibold mb-2">
                CLASSIFICAÇÃO
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                A tabela do campeonato
              </h3>

              <p className="text-gray-600 mb-5">
                Acompanhe a classificação e a luta pelos primeiros lugares.
              </p>

              <button
                type="button"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Ver classificação →
              </button>

            </div>

          </article>

        </div>

        {/* Secção de clubes */}
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Clubes em destaque
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-5xl mb-3">⚽</div>
            <h3 className="font-bold text-gray-900">
              Clubes
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Em actualização
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="font-bold text-gray-900">
              Campeonato
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Em actualização
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-5xl mb-3">📊</div>
            <h3 className="font-bold text-gray-900">
              Classificação
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Em actualização
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
            <div className="text-5xl mb-3">🎙️</div>
            <h3 className="font-bold text-gray-900">
              Relatos
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Rádio Relato
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}
