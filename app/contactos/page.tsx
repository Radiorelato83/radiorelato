export default function ContactosPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Cabeçalho */}
      <section className="bg-blue-900 text-white px-6 py-16">
        <div className="max-w-7xl mx-auto">

          <p className="text-blue-300 font-semibold uppercase tracking-wider mb-3">
            Rádio Relato
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contactos
          </h1>

          <p className="text-lg text-blue-100 max-w-2xl">
            Entre em contacto com a Rádio Relato.
          </p>

        </div>
      </section>

      {/* Conteúdo */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Informações */}
          <div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Fale connosco
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              Tem uma sugestão, quer anunciar na Rádio Relato ou pretende
              estabelecer uma parceria? Estamos disponíveis para ouvir.
            </p>

            <div className="space-y-8">

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="text-3xl">📧</div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Email
                  </h3>

                  <p className="text-gray-600">
                    contacto@radiorelato.ao
                  </p>
                </div>
              </div>

              {/* Redes sociais */}
              <div>

                <h3 className="font-bold text-gray-900 text-lg mb-2">
                  Siga-nos nas nossas redes sociais
                </h3>

                <p className="text-gray-600 mb-5">
                  Acompanhe a Rádio Relato nas principais plataformas digitais.
                </p>

                <div className="grid grid-cols-2 gap-3">

                  <a
                    href="#"
                    className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <span className="text-xl">f</span>
                    Facebook
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-3 bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <span className="text-xl">◎</span>
                    Instagram
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <span className="text-xl">▶</span>
                    YouTube
                  </a>

                  <a
                    href="#"
                    className="flex items-center gap-3 bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <span className="text-xl">♪</span>
                    TikTok
                  </a>

                </div>

              </div>

              {/* Rádio */}
              <div className="flex items-start gap-4">
                <div className="text-3xl">📻</div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Rádio Relato
                  </h3>

                  <p className="text-gray-600">
                    Informação desportiva com paixão e alma.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-sm p-8">

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Envie uma mensagem
            </h2>

            <form className="space-y-5">

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome
                </label>

                <input
                  type="text"
                  placeholder="O seu nome"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="O seu email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assunto
                </label>

                <input
                  type="text"
                  placeholder="Assunto da mensagem"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensagem
                </label>

                <textarea
                  rows={5}
                  placeholder="Escreva a sua mensagem"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                type="button"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-full font-semibold transition-colors"
              >
                Enviar mensagem
              </button>

            </form>

          </div>

        </div>

      </section>

    </main>
  );
}