

import Image from "next/image";
import Link from "next/link";
import { news } from "@/data/news";

const modalityNewsSlugs = [
  "angola-marrocos-final-can-futsal-2026",
  "nba-campeao-entra-a-perder-epoca-2026-27",
  "petro-interclube-supertaca-vladimiro-romero-2026",
  "angola-quinto-lugar-mundial-hoquei-2026",
];

const modalityNews = modalityNewsSlugs
  .map((slug) => news.find((item) => item.slug === slug))
  .filter((article) => article !== undefined);

export default function ModalidadesPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="w-full bg-blue-950">
        <div className="relative flex aspect-[16/5] min-h-[145px] w-full items-center justify-center overflow-hidden bg-blue-950 sm:min-h-[190px]">
          <Image
            src="/modalidades/modalidades.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="scale-110 object-cover opacity-25 blur-2xl"
          />

          <Image
            src="/modalidades/modalidades.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-blue-950/40" />

          <h1 className="relative z-10 px-4 text-center text-3xl font-black uppercase tracking-widest text-white drop-shadow-lg sm:text-5xl">
            Modalidades
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 sm:text-3xl">
            Últimas notícias de Modalidades
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Acompanhe as principais notícias do basquetebol, futsal e de outras
            disciplinas desportivas.
          </p>
        </div>

        {modalityNews.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {modalityNews.map((article) => (
              <article
                key={article.id}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
              >
                <Link
                  href={`/noticias/${article.slug}`}
                  className="block h-full"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={800}
                      height={600}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-red-600">
                      {article.category}
                    </p>

                    <h3 className="mt-2 text-base font-black leading-snug text-gray-900">
                      {article.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {article.excerpt}
                    </p>

                    <p className="mt-3 text-xs text-gray-500">
                      {article.date}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-6 text-gray-600">
            Não existem notícias de modalidades disponíveis neste momento.
          </p>
        )}

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
          <h2 className="text-xl font-black text-blue-950">
            Mais informação desportiva
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Consulte também as restantes notícias e acompanhe a actualidade
            desportiva na Rádio Relato.
          </p>

          <Link
            href="/noticias"
            className="mt-4 inline-flex font-bold text-blue-700 hover:text-red-600"
          >
            Consultar todas as notícias →
          </Link>
        </div>
      </section>
    </main>
  );
}
