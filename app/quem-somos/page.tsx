
export default function QuemSomosPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* CABEÇALHO */}
      <section className="w-full bg-blue-950">
        <div className="relative flex min-h-[190px] w-full items-center justify-center overflow-hidden px-5 py-12 sm:min-h-[250px]">
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-950 to-black"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-red-600/10" aria-hidden="true" />
          <div className="relative z-10 max-w-4xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-red-400">
              Rádio Relato
            </p>
            <h1 className="mt-3 text-3xl font-black uppercase tracking-wide text-white sm:text-5xl">
              Quem Somos
            </h1>
            <p className="mt-4 text-base font-medium italic text-gray-200 sm:text-xl">
              Desporto com paixão e alma!
            </p>
          </div>
        </div>
      </section>

      {/* APRESENTAÇÃO */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              A nossa identidade
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-blue-950 sm:text-4xl">
              Uma voz dedicada ao desporto
            </h2>
            <p className="mt-6 text-base leading-8 text-gray-700">
              A Rádio Relato é uma plataforma angolana de comunicação, fundada aos 21 de Setembro de 2014
              especializada em informação e conteúdos desportivos. Nascemos
              da paixão pelo desporto e do compromisso de acompanhar os
              acontecimentos que marcam a vida dos atletas, clubes,
              selecções e adeptos.
            </p>
            <p className="mt-4 text-base leading-8 text-gray-700">
              Através da rádio, do jornalismo e das plataformas digitais,
              procuramos aproximar o público do desporto, promover a análise
              e o debate e dar visibilidade às diferentes modalidades e aos
              seus protagonistas.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="h-1.5 w-16 rounded-full bg-red-600" />
            <p className="mt-6 text-2xl font-black leading-snug text-blue-950">
              Desporto com paixão e alma!
            </p>
            <p className="mt-4 leading-7 text-gray-600">
              Informação, acompanhamento e valorização do desporto angolano
              e internacional.
            </p>
          </div>
        </div>
      </section>

      {/* HISTÓRIA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-600">
              O nosso percurso
            </p>
            <h2 className="mt-3 text-3xl font-black text-blue-950 sm:text-4xl">
              Uma história de paixão pelo desporto
            </h2>
            <p className="mt-6 text-base leading-8 text-gray-700">
              A Rádio Relato nasceu da paixão pela comunicação e pelo
              desporto, construindo o seu percurso com a ambição de
              acompanhar os principais acontecimentos desportivos e
              aproximar os adeptos das suas equipas e competições favoritas.
            </p>
            <p className="mt-4 text-base leading-8 text-gray-700">
              Em setembro de 2026, a Rádio Relato assinalou 12 anos de
              percurso e iniciou uma nova etapa de renovação editorial e
              digital, reforçando a sua presença e a ligação com o público.
            </p>
          </div>
        </div>
      </section>

      {/* MISSÃO, VISÃO E VALORES */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="mb-9 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            O que nos orienta
          </p>
          <h2 className="mt-3 text-3xl font-black text-blue-950 sm:text-4xl">
            Missão, visão e valores
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="mb-5 h-1.5 w-12 rounded-full bg-red-600" />
            <h3 className="text-xl font-black text-blue-950">A nossa missão</h3>
            <p className="mt-4 leading-7 text-gray-600">
              Informar com rigor, acompanhar os acontecimentos desportivos,
              promover a análise e dar visibilidade a atletas, clubes,
              competições e modalidades.
            </p>
          </article>

          <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="mb-5 h-1.5 w-12 rounded-full bg-red-600" />
            <h3 className="text-xl font-black text-blue-950">A nossa visão</h3>
            <p className="mt-4 leading-7 text-gray-600">
              Ser uma referência da comunicação desportiva em Angola,
              desenvolvendo a presença da Rádio Relato na rádio, no
              jornalismo e nas plataformas digitais.
            </p>
          </article>

          <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="mb-5 h-1.5 w-12 rounded-full bg-red-600" />
            <h3 className="text-xl font-black text-blue-950">Os nossos valores</h3>
            <p className="mt-4 leading-7 text-gray-600">
              Rigor na informação, compromisso com o público, paixão pelo
              desporto, valorização dos seus protagonistas e respeito pela
              diversidade das modalidades.
            </p>
          </article>
        </div>
      </section>

      {/* O QUE FAZEMOS */}
      <section className="bg-blue-950">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-red-400">
              A nossa cobertura
            </p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              O desporto em várias dimensões
            </h2>
            <p className="mt-5 leading-8 text-gray-300">
              Acompanhamos o futebol angolano, as selecções nacionais, as
              diferentes modalidades e as principais competições
              internacionais, através de informação, relatos, entrevistas,
              análise e conteúdos digitais.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Futebol angolano",
              "Selecções nacionais",
              "Outras modalidades",
              "Competições internacionais",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/15 bg-white/5 p-5"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-red-500" />
                <p className="font-bold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPA */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Quem faz a Rádio Relato
          </p>
          <h2 className="mt-3 text-3xl font-black text-blue-950 sm:text-4xl">
            Uma paixão partilhada pelo desporto
          </h2>
          <p className="mt-5 leading-8 text-gray-600">
            A Rádio Relato é construída através do trabalho de comunicação,
            produção e acompanhamento da actualidade desportiva. Os perfis
            dos membros da equipa serão apresentados nesta página após a
            confirmação dos respectivos nomes, funções e fotografias.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-6 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-red-600">
            Estamos ligados a si
          </p>
          <h2 className="mt-3 text-3xl font-black text-blue-950 sm:text-4xl">
            Acompanhe a Rádio Relato
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Siga as nossas publicações e acompanhe as notícias, os programas
            e os conteúdos dedicados ao desporto.
          </p>

          <a
            href="mailto:radiorelato01@gmail.com"
            className="mt-7 inline-flex rounded-full bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
          >
            Contactar a Rádio Relato
          </a>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-bold text-blue-900">
            <a
              href="https://www.facebook.com/radiorelato.1893"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-600"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/radio_relato/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-600"
            >
              Instagram
            </a>
            <a
              href="https://www.youtube.com/@radio-relato.1893"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-600"
            >
              YouTube
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
