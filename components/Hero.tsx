import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-blue-950 text-white">

      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <Image
    src="/hero-radio.jpg"
          alt="Rádio Relato - A voz do desporto angolano"
          fill
          priority
          className="object-cover"
        />

        {/* Camadas cinematográficas */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-transparent" />

        <div className="absolute inset-0 bg-black/30" />
      </div>


      {/* Conteúdo */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:py-32">

        <div className="max-w-2xl">

          {/* Indicador directo */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold">
            <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
            EM DIRETO
          </div>


          {/* Título principal */}
          <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
            A Voz do
            <span className="block text-blue-300">
              Desporto Angolano
            </span>
          </h1>


          {/* Descrição */}
          <p className="mt-6 max-w-xl text-lg text-gray-200 md:text-xl">
            Informação, emoção e análise desportiva.
            Acompanhe os grandes momentos do futebol angolano
            com paixão e alma.
          </p>


          {/* Botões */}
          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/direto"
              className="rounded-lg bg-red-600 px-7 py-3 font-bold transition hover:bg-red-700"
            >
              🎙 Ouvir Rádio
            </Link>


            <Link
              href="/noticias"
              className="rounded-lg border border-white/40 bg-white/10 px-7 py-3 font-bold backdrop-blur-sm transition hover:bg-white/20"
            >
              📰 Últimas Notícias
            </Link>

          </div>


          {/* Frase de marca */}
          <div className="mt-10 border-l-4 border-red-500 pl-4">
            <p className="text-sm uppercase tracking-wider text-gray-300">
              Rádio Relato
            </p>

            <p className="text-lg font-semibold">
              Desporto com paixão e alma
            </p>
          </div>

        </div>

      </div>


      {/* Barra inferior do Hero */}
      <div className="relative z-10 border-t border-white/10 bg-blue-950/80 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">

          <span className="rounded bg-red-600 px-3 py-1 text-xs font-bold">
            ÚLTIMA HORA
          </span>

          <p className="text-sm text-gray-200">
            Petro prepara novo desafio no Girabola • Seleção Nacional em preparação • Mercado de transferências movimenta clubes
          </p>

        </div>

      </div>

    </section>
  );
}
