import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatArticleDate,
  getPublishedArticleBySlug,
} from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) notFound();

  const paragraphs = article.content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f4f7fb]">
      <div className="mx-auto w-full max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <Link
          href="/noticias"
          className="inline-flex text-sm font-bold text-blue-900 transition hover:text-red-600"
        >
          ← Todas as notícias
        </Link>

        <article className="mt-6 overflow-hidden rounded-3xl bg-white p-5 shadow-sm md:p-10">
          <span className="text-sm font-black uppercase tracking-wider text-red-600">
            {article.category?.name ?? "Notícias"}
          </span>

          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-blue-950 md:text-5xl">
            {article.title}
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            {formatArticleDate(article.published_at)} · Redacção Rádio Relato
          </p>

          {article.image_url && (
            <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>
          )}

          {article.excerpt && (
            <p className="mx-auto mt-8 max-w-3xl text-xl font-semibold leading-8 text-slate-800">
              {article.excerpt}
            </p>
          )}

          <div className="mx-auto mt-7 max-w-3xl space-y-6 text-lg leading-8 text-slate-700">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
