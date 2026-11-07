import Image from "next/image";
import Link from "next/link";
import {
  EditorialArticle,
  formatArticleDate,
} from "@/lib/news";

const FALLBACK_IMAGE = "/noticias/petro-dossier.jpg";

function getSafeImageSrc(value: string | null | undefined): string {
  if (!value || !value.trim()) return FALLBACK_IMAGE;

  const imageUrl = value.trim();

  if (imageUrl === "null" || imageUrl === "undefined") {
    return FALLBACK_IMAGE;
  }

  if (imageUrl.startsWith("/") && !imageUrl.startsWith("//")) {
    return imageUrl;
  }

  try {
    const parsedUrl = new URL(imageUrl);

    if (
      parsedUrl.protocol === "http:" ||
      parsedUrl.protocol === "https:"
    ) {
      return imageUrl;
    }
  } catch {
    return FALLBACK_IMAGE;
  }

  return FALLBACK_IMAGE;
}

export default function NewsSection({
  articles,
  variant = "home",
}: {
  articles: EditorialArticle[];
  variant?: "home" | "archive";
}) {
  const isArchive = variant === "archive";

  const availableArticles = isArchive
    ? articles
    : articles.filter(
        (article) =>
          article.category?.name !== "Exclusivo Dossier Rádio Relato"
      );

  const visibleArticles = isArchive
    ? availableArticles
    : availableArticles.slice(0, 6);

  if (visibleArticles.length === 0) {
    if (isArchive) {
      return (
        <section className="bg-[#f4f7fb] px-4 py-14 text-center">
          <h2 className="text-2xl font-extrabold text-blue-950">
            Ainda não existem notícias publicadas.
          </h2>
        </section>
      );
    }

    return null;
  }

  return (
    <section className="bg-[#f4f7fb] py-10 md:py-14">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
              Rádio Relato
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-blue-950 md:text-4xl">
              {isArchive ? "Todas as Notícias" : "Mais Notícias"}
            </h2>

            {isArchive && (
              <p className="mt-2 text-sm text-gray-600">
                Acompanhe as notícias do desporto nacional e internacional.
              </p>
            )}
          </div>

          {!isArchive && (
            <Link
              href="/noticias"
              className="hidden rounded-full border border-blue-900 px-5 py-2.5 text-sm font-semibold text-blue-900 transition hover:bg-blue-900 hover:text-white md:inline-flex"
            >
              Ver todas →
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article, index) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Link
                href={`/noticias/${article.slug}`}
                className="block"
                aria-label={`Ler notícia: ${article.title}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <Image
                    src={getSafeImageSrc(article.image_url)}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 3}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow">
                    {article.category?.name ?? "Notícias"}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {formatArticleDate(article.published_at)}
                  </p>

                  <h3 className="mt-3 line-clamp-3 text-xl font-extrabold leading-snug text-blue-950 transition-colors group-hover:text-red-600">
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                      {article.excerpt}
                    </p>
                  )}

                  <span className="mt-5 inline-flex items-center text-sm font-bold text-blue-900 transition-colors group-hover:text-red-600">
                    Ler notícia <span className="ml-2">→</span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {!isArchive && (
          <div className="mt-7 md:hidden">
            <Link
              href="/noticias"
              className="text-sm font-semibold text-blue-800"
            >
              Ver todas as notícias →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
