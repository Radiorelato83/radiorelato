

import Image from "next/image";
import Link from "next/link";
import { news } from "@/data/news";

const internationalNews = [
  news.find((item) => item.slug === "psg-barcelona-noite-campeoes-champions-2026")!,
  news.find((item) => item.slug === "el-clasico-barcelona-real-madrid-outubro-2026")!,
  news.find((item) => item.slug === "nba-campeao-entra-a-perder-epoca-2026-27")!,
];

export default function InternacionalPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* CAPA INTERNACIONAL */}
      <section className="w-full bg-blue-950">
        <div className="relative flex aspect-[16/5] min-h-[145px] w-full items-center justify-center overflow-hidden bg-blue-950 sm:min-h-[190px]">
          <Image
            src="/internacional/futebol-internacional.png"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="scale-110 object-cover opacity-25 blur-2xl"
          />

          <Image
            src="/internacional/futebol-internacional.png"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-blue-950/40" />

          <h1 className="relative z-10 px-4 text-center text-2xl font-black uppercase tracking-widest text-white drop-shadow-lg sm:text-5xl">
            Desporto Internacional
          </h1>
        </div>
      </section>

      {/* INTRODUÇÃO */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-red-600">
            Rádio Relato
          </p>

          <h2 className="mt-2 text-2xl font-black text-blue-950 sm:text-3xl">
            Desporto Internacional
          </h2>

          <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600">
            Acompanhe os principais acontecimentos do futebol internacional,
            das competições europeias e do basquetebol mundial.
          </p>
        </div>

        {/* NOTÍCIAS INTERNACIONAIS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {internationalNews.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <Link
                href={`/noticias/${item.slug}`}
                className="block"
                aria-label={`Ler notícia: ${item.title}`}
              >
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <Image
                    src={
                      item.slug === "psg-barcelona-noite-campeoes-champions-2026"
                        ? "/noticias/psg-barcelona-2026.avif"
                        : item.image
                    }
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={
                      item.imageFit === "contain"
                        ? "object-contain p-3"
                        : "object-cover transition-transform duration-500 hover:scale-105"
                    }
                  />
                </div>

                <div className="p-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-red-600">
                    {item.category}
                  </span>

                  <h3 className="mt-2 text-lg font-extrabold leading-snug text-blue-950">
                    {item.title}
                  </h3>

                  {item.date && (
                    <p className="mt-2 text-xs text-gray-500">
                      {item.date}
                    </p>
                  )}

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item.excerpt}
                  </p>

                  <span className="mt-4 inline-block text-sm font-bold text-blue-800">
                    Ler notícia →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* LIGAÇÃO PARA TODAS AS NOTÍCIAS */}
        <div className="mt-9 text-center">
          <Link
            href="/noticias"
            className="inline-flex rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Ver todas as notícias →
          </Link>
        </div>
      </section>
    </main>
  );
}
