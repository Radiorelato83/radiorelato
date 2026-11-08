
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { news } from "@/data/news";

const petroDossierSlug = "casamento-vias-divorcio-catetao";

const petroDossier = news.find(
  (item) => item.slug === petroDossierSlug
);

const otherFeaturedNews = news.filter(
  (item) =>
    item.featured === true &&
    item.slug !== petroDossierSlug
);

const featuredNews = petroDossier
  ? [petroDossier, ...otherFeaturedNews]
  : otherFeaturedNews;

export default function HeroMain() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredNews.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) =>
        current >= featuredNews.length - 1 ? 0 : current + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  if (featuredNews.length === 0) return null;

  const safeIndex = currentIndex % featuredNews.length;
  const currentNews = featuredNews[safeIndex];

  const previousSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? featuredNews.length - 1 : current - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((current) =>
      current >= featuredNews.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="bg-[#f4f7fb] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <article
          key={currentNews.id}
          className="group relative flex min-h-[440px] flex-col overflow-hidden rounded-3xl shadow-xl md:min-h-[540px] md:flex-row"
        >
          <div className="order-2 flex w-full flex-col justify-center bg-blue-950 px-6 py-10 md:order-1 md:w-1/2 md:px-12 md:py-14">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
                  {currentNews.category}
                </span>

                <span className="text-sm font-medium text-blue-100">
                  {currentNews.date}
                </span>
              </div>

              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-red-400">
                Rádio Relato · Destaque editorial
              </p>

              <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
                {currentNews.title}
              </h1>

              {currentNews.excerpt && (
                <p className="mt-5 text-base leading-7 text-blue-50 md:text-lg md:leading-8">
                  {currentNews.excerpt}
                </p>
              )}

              <p className="mt-4 text-sm font-semibold text-blue-100">
                Por {currentNews.author}
              </p>

              <div className="mt-7">
                <Link
                  href={`/noticias/${currentNews.slug}`}
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-black text-blue-950 transition hover:bg-red-600 hover:text-white"
                >
                  Ler dossier / notícia
                  <span className="ml-3">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative order-1 min-h-[280px] w-full bg-[#e9edf2] md:order-2 md:min-h-[540px] md:w-1/2">
            <Image
              src={currentNews.image}
              alt={currentNews.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>

          {featuredNews.length > 1 && (
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 md:bottom-6 md:right-6">
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Destaque anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-blue-950 text-xl font-bold text-white transition hover:bg-red-600"
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Próximo destaque"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-blue-950 text-xl font-bold text-white transition hover:bg-red-600"
              >
                →
              </button>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
