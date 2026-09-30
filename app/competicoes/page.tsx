export default function Competicoes() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-4xl font-bold text-blue-950 mb-8">
        Competições
      </h1>

      <p className="text-gray-600 mb-10">
        Acompanhe todas as competições nacionais e internacionais
        com a Rádio Relato.
      </p>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="bg-blue-950 text-white rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-3">
            ⚽ Liga Unitel Girabola
          </h2>

          <p>
            Notícias, resultados, classificação e análise
            do futebol angolano.
          </p>
        </div>


        <div className="bg-blue-900 text-white rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-3">
            🏀 Modalidades
          </h2>

          <p>
            Basquetebol, andebol e outras modalidades
            acompanhadas pela Rádio Relato.
          </p>
        </div>


        <div className="bg-blue-800 text-white rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-3">
            🌍 Futebol Internacional
          </h2>

          <p>
            Mundial, CAN e grandes competições internacionais.
          </p>
        </div>

      </div>

    </main>
  );
}