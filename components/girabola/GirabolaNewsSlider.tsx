
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { news } from "@/data/news";

const girabolaSlugs = [
  "ancaf-altera-petro-caala-estadio-22-junho",
  "sao-salvador-crise-financeira",
  "kabuscorp-testa-invencibilidade-wiliete",
];

const girabolaNews = news.filter((article) =>
  girabolaSlugs.includes(article.slug)
);

export default function GirabolaNewsSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (girabolaNews.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((previous) => (previous + 1) % girabolaNews.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  function nextSlide() {
    setCurrent((previous) => (previous + 1) % girabolaNews.length);
  }

  function previousSlide() {
    setCurrent(
      (previous) =>
        (previous - 1 + girabolaNews.length) % girabolaNews.length
    );
  }

  if (girabolaNews.length === 0) return null;

  const activeNews = girabolaNews[current];

  const secondaryNews = girabolaNews.filter(
    (_, index) => index !== current
  );

  return (
    <section className="mt-8">
      {/* Cabeçalho */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            RÁDIO RELATO
          </p>

          <h2 className="mt-1 text-2xl font-black tracking-tight text-blue-950 md:text-3xl">
            Notícias do Girabola
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Notícia anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-bold text-blue-950 transition hover:border-blue-950 hover:bg-blue-950 hover:text-white"
          >
            ←
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Próxima notícia"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-bold text-blue-950 transition hover:border-blue-950 hover:bg-blue-950 hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      {/* Slide principal */}
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Link
          href={`/noticias/${activeNews.slug}`}
          className="group block"
          aria-label={`Ler notícia: ${activeNews.title}`}
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            <Image
              src={activeNews.image}
              alt={activeNews.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <span className="inline-block rounded bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                {activeNews.category}
              </span>

              <h3 className="mt-3 max-w-4xl text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl">
                {activeNews.title}
              </h3>

              <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-white/90 sm:text-base">
                {activeNews.excerpt}
              </p>

              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
                Ler notícia completa
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-2">
            {girabolaNews.map((article, index) => (
              <button
                key={article.slug}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Ver notícia ${index + 1}: ${article.title}`}
                aria-current={current === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all ${
                  current === index
                    ? "w-8 bg-red-600"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {current + 1} / {girabolaNews.length}
          </span>
        </div>
      </article>

      {/* Faixa compacta de notícias secundárias */}
      {secondaryNews.length > 0 && (
        <div className="mt-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-wide text-blue-950">
              Mais notícias
            </h3>

            <span className="text-xs text-slate-500">
              Girabola
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3">
            {secondaryNews.map((article) => {
              const originalIndex = girabolaNews.findIndex(
                (item) => item.slug === article.slug
              );

              return (
                <Link
                  key={article.slug}
                  href={`/noticias/${article.slug}`}
                  onClick={() => setCurrent(originalIndex)}
                  className="group flex w-[260px] shrink-0 gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-blue-300 hover:shadow-sm sm:w-[300px]"
                >
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="96px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-wide text-red-600">
                      {article.category}
                    </p>

                    <h4 className="mt-1 line-clamp-3 text-sm font-bold leading-5 text-blue-950">
                      {article.title}
                    </h4>

                    <span className="mt-2 inline-block text-xs font-semibold text-slate-500 group-hover:text-red-600">
                      Ler notícia →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
