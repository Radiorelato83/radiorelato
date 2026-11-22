

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EditorialArticle, formatArticleDate } from "@/lib/news";

function getSafeImageSrc(value: string | null): string {
  const fallback = "/noticias/petro-dossier.jpg";

  if (!value) return fallback;

  const image = value.trim();

  if (image.startsWith("/") && !image.startsWith("//")) {
    return image;
  }

  try {
    const url = new URL(image);

    if (url.protocol === "https:" || url.protocol === "http:") {
      return image;
    }
  } catch {
    return fallback;
  }

  return fallback;
}

export default function HeroMain({
  articles,
}: {
  articles: EditorialArticle[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (articles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) =>
        current >= articles.length - 1 ? 0 : current + 1
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [articles.length]);

  if (!articles.length) return null;

  const safeIndex = currentIndex % articles.length;
  const currentNews = articles[safeIndex];

  const isRelaunch = currentNews.title
    .toUpperCase()
    .includes("ESTAMOS DE VOLTA");

  const image = isRelaunch
    ? "/images/jose-sebastiao.jpg"
    : getSafeImageSrc(currentNews.image_url);

  const previousSlide = () =>
    setCurrentIndex((current) =>
      current === 0 ? articles.length - 1 : current - 1
    );

  const nextSlide = () =>
    setCurrentIndex((current) =>
      current >= articles.length - 1 ? 0 : current + 1
    );

  return (
    <section className="w-full bg-[#f4f7fb] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <article
          key={currentNews.id}
          className="group relative min-h-[560px] overflow-hidden rounded-3xl bg-blue-950 shadow-xl md:min-h-[540px]"
        >
          <Image
            src={image}
            alt={isRelaunch ? "José Sebastião" : currentNews.title}
            fill
            priority
            sizes="100vw"
            className={
              isRelaunch
                ? "object-cover object-center"
                : "object-cover object-center"
            }
          />

         <div className="absolute inset-0 bg-gradient-to-t from-blue-950/55 via-blue-950/15 to-transparent" />
          <div className="relative z-10 flex min-h-[560px] max-w-4xl flex-col justify-end px-6 pb-24 pt-24 md:min-h-[540px] md:justify-center md:px-12 md:py-16 lg:px-16">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white">
                {currentNews.category?.name ?? "Notícias"}
              </span>

              <span className="text-sm font-medium text-white">
                {formatArticleDate(currentNews.published_at)}
              </span>
            </div>

            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-red-400">
              Rádio Relato · Destaque editorial
            </p>

            <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              {currentNews.title}
            </h1>

            {currentNews.excerpt && (
              <p className="mt-5 max-w-3xl text-base leading-7 text-white md:text-lg md:leading-8">
                {currentNews.excerpt}
              </p>
            )}

            {isRelaunch && (
              <div className="mt-6">
                <Image
                  src="/images/logo-radio-relato.jpg"
                  alt="Rádio Relato"
                  width={230}
                  height={163}
                  className="h-auto w-36 rounded-lg object-contain md:w-48"
                />
              </div>
            )}

            <p className="mt-4 text-sm font-semibold text-white">
              Redacção Rádio Relato
            </p>

            <div className="mt-7">
              <Link
                href={`/noticias/${currentNews.slug}`}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-black text-blue-950 transition hover:bg-red-600 hover:text-white"
              >
                Ler artigo
                <span className="ml-3">→</span>
              </Link>
            </div>
          </div>

          {articles.length > 1 && (
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
