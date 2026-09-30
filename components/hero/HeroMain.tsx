"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { news } from "@/data/news";

export default function HeroMain() {
  const featuredNews = news.filter((item) => item.featured);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredNews.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((current) =>
        current === featuredNews.length - 1 ? 0 : current + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [featuredNews.length]);

  if (!featuredNews.length) {
    return (
      <section className="relative min-h-[500px] overflow-hidden rounded-3xl bg-blue-950 p-8 text-white md:p-12">
        <div className="flex h-full min-h-[420px] flex-col justify-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-400">
            Rádio Relato
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">
            Desporto com paixão e alma!
          </h1>

          <p className="mt-4 max-w-2xl text-gray-300">
            Informação, relato e acompanhamento do desporto nacional.
          </p>
        </div>
      </section>
    );
  }

  const headline = featuredNews[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? featuredNews.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((current) =>
      current === featuredNews.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="relative min-h-[500px] w-full overflow-hidden rounded-3xl bg-blue-950 md:min-h-[560px]">
      <Image
        key={headline.id}
        src={headline.image}
        alt={headline.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/10" />

      <div
        key={`content-${headline.id}`}
        className="relative z-10 flex min-h-[500px] flex-col justify-end p-6 md:min-h-[560px] md:p-10 lg:p-14"
      >
        <div className="max-w-5xl">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-red-600 px-5 py-2 text-sm font-black uppercase tracking-[0.08em] text-white shadow-lg">
              {headline.category}
            </span>

            <span className="text-base font-bold text-white drop-shadow-lg md:text-lg">
              {headline.date}
            </span>
          </div>

          <h1 className="max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] md:text-6xl lg:text-7xl">
            {headline.title}
          </h1>

          <p className="mt-6 max-w-4xl text-base font-medium leading-7 text-white drop-shadow-[0_3px_7px_rgba(0,0,0,0.9)] md:text-xl md:leading-8">
            {headline.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/noticias/${headline.slug}`}
              className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-base font-black text-blue-950 shadow-lg transition hover:bg-gray-200"
            >
              Ler notícia
              <span className="ml-2 text-lg">→</span>
            </Link>
          </div>
        </div>
      </div>

      {featuredNews.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Notícia anterior"
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur transition hover:bg-black/70 md:left-6"
          >
            ←
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Próxima notícia"
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-xl text-white backdrop-blur transition hover:bg-black/70 md:right-6"
          >
            →
          </button>

          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 md:right-10">
            {featuredNews.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para notícia ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}