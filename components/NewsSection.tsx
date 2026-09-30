"use client";

import Image from "next/image";
import Link from "next/link";
import { news } from "@/data/news";

export default function NewsSection() {
  // =====================================================
  // MAIS NOTÍCIAS
  // ID 1 = 1.º DE AGOSTO
  // FICA RESERVADO PARA O DESTAQUE PRINCIPAL
  // =====================================================

  const secondaryNews = news.filter((item) => item.id !== 1);

  const mainNews = secondaryNews[0];
  const sideNews = secondaryNews.slice(1, 4);

  // =====================================================
  // SEGURANÇA
  // =====================================================

  if (!mainNews) {
    return null;
  }

  return (
    <section className="bg-[#f4f7fb] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">

        {/* =================================================
            CABEÇALHO
        ================================================= */}

        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
              Informação
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-blue-950 md:text-4xl">
              Mais Notícias
            </h2>
          </div>

          <Link
            href="/noticias"
            className="hidden rounded-full border border-blue-900 px-5 py-2.5 text-sm font-bold text-blue-900 transition hover:bg-blue-900 hover:text-white md:inline-flex"
          >
            Ver todas →
          </Link>
        </div>

        {/* =================================================
            GRELHA PRINCIPAL
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">

          {/* =================================================
              NOTÍCIA PRINCIPAL
          ================================================= */}

          <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition duration-300 hover:shadow-xl">

            <Link
              href={`/noticias/${mainNews.slug}`}
              className="block"
            >
              <div className="relative h-[300px] overflow-hidden bg-gray-100 md:h-[410px]">

                <Image
                  src={mainNews.image}
                  alt={mainNews.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-lg">
                    {mainNews.category}
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">

                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                    {mainNews.date}
                  </p>

                  <h3 className="max-w-4xl text-2xl font-black leading-tight text-white drop-shadow-lg md:text-4xl">
                    {mainNews.title}
                  </h3>

                </div>
              </div>
            </Link>

            <div className="p-6 md:p-7">

              <p className="max-w-4xl text-sm leading-6 text-gray-600 md:text-base md:leading-7">
                {mainNews.excerpt}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">

                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.1em] text-gray-400">
                  <span>{mainNews.date}</span>

                  {mainNews.readingTime && (
                    <>
                      <span className="text-red-500">•</span>
                      <span>{mainNews.readingTime}</span>
                    </>
                  )}
                </div>

                <Link
                  href={`/noticias/${mainNews.slug}`}
                  className="inline-flex items-center rounded-full bg-blue-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
                >
                  Ler notícia
                  <span className="ml-2">→</span>
                </Link>

              </div>
            </div>
          </article>

          {/* =================================================
              NOTÍCIAS SECUNDÁRIAS
          ================================================= */}

          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">

            {sideNews.map((item) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >

                <Link
                  href={`/noticias/${item.slug}`}
                  className="flex h-full flex-col sm:flex-row lg:flex-row"
                >

                  {/* =================================================
                      ÁREA DA IMAGEM
                  ================================================= */}

                  <div className="relative h-[210px] w-full shrink-0 overflow-hidden bg-gray-200 sm:h-[165px] sm:w-[48%] lg:h-[155px] lg:w-[46%]">

                    {/* FUNDO AMPLIADO */}

                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 360px"
                      className="scale-110 object-cover object-center opacity-35 blur-md"
                    />

                    {/* IMAGEM COMPLETA */}

                    <div className="absolute inset-0 flex items-center justify-center p-2">

                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 360px"
                        className="object-contain object-center p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                      />

                    </div>

                    {/* CATEGORIA */}

                    <div className="absolute left-3 top-3 z-10">
                      <span className="rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow">
                        {item.category}
                      </span>
                    </div>

                  </div>

                  {/* =================================================
                      TEXTO
                  ================================================= */}

                  <div className="flex flex-1 flex-col justify-center p-4 sm:p-4 md:p-5">

                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-gray-400">
                      {item.date}
                    </p>

                    <h3 className="text-lg font-extrabold leading-tight text-blue-950 transition group-hover:text-red-600 md:text-xl">
                      {item.title}
                    </h3>

                    <span className="mt-3 text-sm font-bold text-blue-900">
                      Ler notícia →
                    </span>

                  </div>

                </Link>
              </article>
            ))}

          </div>
        </div>

        {/* =================================================
            BOTÃO MOBILE
        ================================================= */}

        <div className="mt-6 md:hidden">
          <Link
            href="/noticias"
            className="inline-flex rounded-full border border-blue-900 px-5 py-2.5 text-sm font-bold text-blue-900 transition hover:bg-blue-900 hover:text-white"
          >
            Ver todas as notícias →
          </Link>
        </div>

      </div>
    </section>
  );
}