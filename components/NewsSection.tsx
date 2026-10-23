"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { news } from "@/data/news";

export default function NewsSection() {
  // Exclui da secção secundária todas as notícias
  // que estejam marcadas como destaque principal.
  const secondaryNews = news.filter(
    (item) => !("featured" in item && item.featured === true)
  );

  const totalNews = secondaryNews.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Slider automático.
  useEffect(() => {
    if (totalNews <= 1 || isPaused) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((current) =>
        current >= totalNews - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [totalNews, isPaused]);

  if (totalNews === 0) {
    return null;
  }

  const safeIndex = currentIndex % totalNews;
  const currentNews = secondaryNews[safeIndex];

  const previousSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? totalNews - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((current) =>
      current >= totalNews - 1 ? 0 : current + 1
    );
  };

  const readingTime =
    "readingTime" in currentNews
      ? currentNews.readingTime
      : undefined;

  return (
    <section className="bg-[#f4f7fb] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-6 flex items-end justify-between gap-4">
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
            className="hidden rounded-full border border-blue-900 px-5 py-2.5 text-sm font-semibold text-blue-900 transition hover:bg-blue-900 hover:text-white md:inline-flex"
          >
            Ver todas →
          </Link>
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <article
            key={currentNews.id}
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-500 hover:shadow-xl"
          >
            <div className="grid md:grid-cols-[42%_58%]">
              {/* Imagem */}
              <div className="relative h-[260px] overflow-hidden bg-gray-100 md:h-[330px]">
                <Link
                  href={`/noticias/${currentNews.slug}`}
                  aria-label={`Ler notícia: ${currentNews.title}`}
                  className="absolute inset-0 block"
                >
                  <Image
                    src={currentNews.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="scale-110 object-cover opacity-25 blur-md"
                  />

                  <Image
                    src={currentNews.image}
                    alt={currentNews.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-contain object-center p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </Link>

                {/* Categoria */}
                <div className="pointer-events-none absolute left-5 top-5 z-10">
                  <span className="rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                    {currentNews.category}
                  </span>
                </div>

                {/* Número do slide */}
                <div className="pointer-events-none absolute bottom-5 right-5 z-10 rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                  {String(safeIndex + 1).padStart(2, "0")} /{" "}
                  {String(totalNews).padStart(2, "0")}
                </div>

                {/* Controlos sobre a imagem */}
                {totalNews > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={previousSlide}
                      aria-label="Notícia anterior"
                      className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-lg text-white transition hover:bg-black"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Próxima notícia"
                      className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-lg text-white transition hover:bg-black"
                    >
                      →
                    </button>
                  </>
                )}
              </div>

              {/* Texto */}
              <div className="flex flex-col justify-center p-6 md:p-10">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
                  <span>{currentNews.date}</span>

                  {readingTime && (
                    <>
                      <span className="text-red-500">•</span>
                      <span>{readingTime}</span>
                    </>
                  )}
                </div>

                <h3 className="text-2xl font-extrabold leading-tight text-blue-950 md:text-3xl lg:text-4xl">
                  {currentNews.title}
                </h3>

                <div className="mt-5 h-1 w-12 rounded-full bg-red-600" />

                <p className="mt-5 max-w-3xl text-sm leading-6 text-gray-600 md:text-base md:leading-7">
                  {currentNews.excerpt}
                </p>

                <Link
                  href={`/noticias/${currentNews.slug}`}
                  className="mt-6 inline-flex w-fit items-center rounded-full bg-blue-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-600"
                >
                  Ler notícia
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>

            {/* Barra de progresso */}
            {!isPaused && totalNews > 1 && (
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200">
                <div
                  key={currentNews.id}
                  className="h-full bg-red-600"
                  style={{
                    animation: "newsProgress 5s linear",
                  }}
                />
              </div>
            )}
          </article>

          {/* Indicadores */}
          {totalNews > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {secondaryNews.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Ver notícia ${index + 1}`}
                    aria-current={index === safeIndex ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === safeIndex
                        ? "w-9 bg-red-600"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Notícia anterior"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-900 bg-white text-blue-900 transition hover:bg-blue-900 hover:text-white"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Próxima notícia"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-900 bg-white text-blue-900 transition hover:bg-blue-900 hover:text-white"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Ligação para todas as notícias em telemóveis */}
        <div className="mt-5 md:hidden">
          <Link
            href="/noticias"
            className="text-sm font-semibold text-blue-800"
          >
            Ver todas as notícias →
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes newsProgress {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}