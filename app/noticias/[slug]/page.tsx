import { news } from "@/data/news";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const article = news.find((n) => n.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Categoria */}
      <span className="text-red-600 font-semibold">
        {article.category}
      </span>

      {/* Título */}
      <h1 className="text-5xl font-bold mt-4 leading-tight">
        {article.title}
      </h1>

      {/* Data e autor */}
      <p className="text-gray-500 mt-3">
        {article.date} • {article.author}
      </p>

      {/* Imagem principal */}
      <div className="relative w-full aspect-video mt-8 rounded-3xl overflow-hidden bg-gray-100">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Conteúdo da notícia */}
      <div className="mt-10 text-lg leading-8 text-gray-800">
        <p>{article.excerpt}</p>
      </div>
    </main>
  );
}