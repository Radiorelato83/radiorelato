

import Image from "next/image";
import Link from "next/link";

export default function PodcastsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* CAPA PODCASTS */}
      <section className="w-full bg-blue-950">
        <div className="relative flex aspect-[16/5] min-h-[145px] w-full items-center justify-center overflow-hidden bg-blue-950 sm:min-h-[190px]">
          <Image
            src="/podcast/podcast-radio-relato.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="scale-110 object-cover opacity-25 blur-2xl"
          />

          <Image
            src="/podcast/podcast-radio-relato.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-blue-950/40" />

          <h1 className="relative z-10 px-4 text-center text-3xl font-black uppercase tracking-widest text-white drop-shadow-lg sm:text-5xl">
            Podcasts
          </h1>
        </div>
      </section>

      {/* INTRODUÇÃO */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">
            Rádio Relato
          </p>

          <h2 className="mt-2 text-2xl font-black text-gray-900 sm:text-3xl">
            Podcast e conteúdos especiais
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Entrevistas, conversas, análises e histórias do mundo do desporto.
            Um espaço dedicado a conteúdos para ouvir e acompanhar.
          </p>
        </div>

        {/* CATÁLOGO DE PODCASTS */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center sm:px-10 sm:py-14">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl"
            aria-hidden="true"
          >
            🎙️
          </div>

          <h3 className="mt-5 text-xl font-black text-blue-950">
            Catálogo de podcasts em preparação
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
            Os episódios serão disponibilizados nesta secção à medida que
            forem publicados. Por enquanto, pode consultar a programação da
            Rádio Relato.
          </p>

          <Link
            href="/programas"
            className="mt-6 inline-flex rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Consultar programas →
          </Link>
        </div>
      </section>
    </main>
  );
}
