import { news } from "@/data/news";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = news.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const isPetroDossier =
    article.slug === "casamento-vias-divorcio-catetao";

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
            {article.category}
          </span>

          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-blue-950 md:text-5xl">
            {article.title}
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            {article.date} · {article.author}
          </p>

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-contain"
              priority
            />
          </div>

          <div className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-700">
            <p>{article.excerpt}</p>

            {isPetroDossier && (
              <p className="mt-6 border-l-4 border-red-600 pl-4 text-base leading-7 text-slate-500">
                Esta é a introdução do dossier editorial. O desenvolvimento
                integral será realizado pela Redacção da Rádio Relato.
              </p>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}