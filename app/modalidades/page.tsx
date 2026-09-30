export default function ModalidadesPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Cabeçalho */}
      <section className="bg-blue-900 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">

          <p className="text-blue-300 font-semibold uppercase tracking-wider mb-3">
            Rádio Relato
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Modalidades
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl">
            Acompanhe as principais modalidades desportivas e os seus protagonistas.
          </p>

        </div>
      </section>

      {/* Conteúdo */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Explore as modalidades
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Basquetebol */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            <div className="h-48 bg-orange-600 flex items-center justify-center">
              <span className="text-7xl">🏀</span>
            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Basquetebol
              </h3>

              <p className="text-gray-600 mb-5">
                Notícias, resultados e protagonistas do basquetebol
                nacional e internacional.
              </p>

              <button
                type="button"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Ver notícias →
              </button>

            </div>

          </article>

          {/* Andebol */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            <div className="h-48 bg-red-700 flex items-center justify-center">
              <span className="text-7xl">🤾</span>
            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Andebol
              </h3>

              <p className="text-gray-600 mb-5">
                Acompanhe o andebol e as suas principais competições.
              </p>

              <button
                type="button"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Ver notícias →
              </button>

            </div>

          </article>

          {/* Atletismo */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            <div className="h-48 bg-green-700 flex items-center justify-center">
              <span className="text-7xl">🏃</span>
            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Atletismo
              </h3>

              <p className="text-gray-600 mb-5">
                Provas, atletas e os grandes momentos do atletismo.
              </p>

              <button
                type="button"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Ver notícias →
              </button>

            </div>

          </article>

          {/* Futebol Internacional */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            <div className="h-48 bg-blue-700 flex items-center justify-center">
              <span className="text-7xl">🌍</span>
            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Futebol Internacional
              </h3>

              <p className="text-gray-600 mb-5">
                As principais notícias do futebol internacional.
              </p>

              <button
                type="button"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Ver notícias →
              </button>

            </div>

          </article>

          {/* Voleibol */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            <div className="h-48 bg-purple-700 flex items-center justify-center">
              <span className="text-7xl">🏐</span>
            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Voleibol
              </h3>

              <p className="text-gray-600 mb-5">
                Notícias e actualidade do voleibol nacional e internacional.
              </p>

              <button
                type="button"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Ver notícias →
              </button>

            </div>

          </article>

          {/* Outras modalidades */}
          <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">

            <div className="h-48 bg-gray-700 flex items-center justify-center">
              <span className="text-7xl">🏆</span>
            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Outras modalidades
              </h3>

              <p className="text-gray-600 mb-5">
                Descubra outras modalidades e histórias do mundo do desporto.
              </p>

              <button
                type="button"
                className="text-blue-700 font-bold hover:text-blue-900"
              >
                Explorar →
              </button>

            </div>

          </article>

        </div>

      </section>

    </main>
  );
}
