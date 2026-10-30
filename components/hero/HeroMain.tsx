"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { EditorialArticle, formatArticleDate } from "@/lib/news";

export default function HeroMain({ articles }: { articles: EditorialArticle[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (articles.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((current) => current >= articles.length - 1 ? 0 : current + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, [articles.length]);

  if (!articles.length) return null;
  const safeIndex = currentIndex % articles.length;
  const currentNews = articles[safeIndex];
  const image = currentNews.image_url || "/noticias/petro-dossier.jpg";
  const previousSlide = () => setCurrentIndex((current) => current === 0 ? articles.length - 1 : current - 1);
  const nextSlide = () => setCurrentIndex((current) => current >= articles.length - 1 ? 0 : current + 1);

  return (
    <section className="bg-[#f4f7fb] px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <article key={currentNews.id} className="group relative min-h-[440px] overflow-hidden rounded-3xl bg-blue-950 shadow-xl md:min-h-[540px]">
          <Image src={image} alt="" fill priority sizes="100vw" className="scale-110 object-cover opacity-35 blur-xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-blue-950/35" />
          <div className="absolute inset-0"><Image src={image} alt={currentNews.title} fill priority sizes="100vw" className="object-contain object-right p-4 opacity-70 md:p-8" /></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/75 to-transparent" />
          <div className="relative z-10 flex min-h-[440px] items-center px-6 py-10 md:min-h-[540px] md:px-12 md:py-14">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white">{currentNews.category?.name ?? "Notícias"}</span>
                <span className="text-sm font-medium text-blue-100">{formatArticleDate(currentNews.published_at)}</span>
              </div>
              <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-red-400">Rádio Relato · Destaque editorial</p>
              <h1 className="mt-3 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">{currentNews.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-blue-50 md:text-lg md:leading-8">{currentNews.excerpt}</p>
              <p className="mt-4 text-sm font-semibold text-blue-100">Redacção Rádio Relato</p>
              <div className="mt-7"><Link href={`/noticias/${currentNews.slug}`} className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-black text-blue-950 transition hover:bg-red-600 hover:text-white">Ler dossier / notícia <span className="ml-3">→</span></Link></div>
            </div>
          </div>
          {articles.length > 1 && <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 md:bottom-8 md:right-8">
            <button type="button" onClick={previousSlide} aria-label="Destaque anterior" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-blue-950/60 text-xl font-bold text-white backdrop-blur transition hover:bg-red-600">←</button>
            <button type="button" onClick={nextSlide} aria-label="Próximo destaque" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-blue-950/60 text-xl font-bold text-white backdrop-blur transition hover:bg-red-600">→</button>
          </div>}
        </article>
      </div>
    </section>
  );
}
