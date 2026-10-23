import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/data/news";

export default function NewsCard({
  article,
}: {
  article: NewsArticle;
}) {
  const imageClass =
    article.imageFit === "contain"
      ? "object-contain p-3"
      : "object-cover";

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/noticias/${article.slug}`}
        aria-label={`Ler notícia: ${article.title}`}
        className="block"
      >
        <div className="relative aspect-video overflow-hidden bg-slate-100">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className={`${imageClass} transition-transform duration-500 group-hover:scale-[1.02]`}
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
          <span className="text-red-600">{article.category}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500">{article.date}</span>
        </div>

        <h3 className="mt-3 text-xl font-extrabold leading-tight text-blue-950">
          <Link
            href={`/noticias/${article.slug}`}
            className="transition hover:text-red-600"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {article.excerpt}
        </p>

        <Link
          href={`/noticias/${article.slug}`}
          className="mt-5 inline-flex items-center text-sm font-bold text-blue-950 transition hover:text-red-600"
        >
          Ler notícia <span className="ml-2">→</span>
        </Link>
      </div>
    </article>
  );
}