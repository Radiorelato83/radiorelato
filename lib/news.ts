export type EditorialArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  status: string;
  published_at: string | null;
  is_featured: boolean;
  hero_order: number | null;
  display_order: number;
  category: { name: string } | null;
};

const selectFields =
  "id,title,slug,excerpt,content,image_url,status,published_at,is_featured,hero_order,display_order,category:categories(name)";

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
    return null;
  }

  return { url: url.replace(/\/$/, ""), key };
}

async function queryArticles(query: string): Promise<EditorialArticle[]> {
  const config = getSupabaseConfig();
  if (!config) return [];

  try {
    const response = await fetch(
      `${config.url}/rest/v1/articles?${query}`,
      {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Erro ao consultar artigos no Supabase:", response.status);
      return [];
    }

    return (await response.json()) as EditorialArticle[];
  } catch (error) {
    console.error("Falha de ligação ao Supabase:", error);
    return [];
  }
}

export async function getPublishedArticleBySlug(
  slug: string
): Promise<EditorialArticle | null> {
  const rows = await queryArticles(
    `select=${encodeURIComponent(selectFields)}&slug=eq.${encodeURIComponent(slug)}&status=eq.published&published_at=not.is.null&order=published_at.desc&limit=1`
  );
  return rows[0] ?? null;
}

export async function getPublishedArticles(options?: {
  featured?: boolean;
  limit?: number;
}): Promise<EditorialArticle[]> {
  const filters = [
    `select=${encodeURIComponent(selectFields)}`,
    "status=eq.published",
    "published_at=not.is.null",
    "order=published_at.desc",
    `limit=${options?.limit ?? 20}`,
  ];

  if (options?.featured !== undefined) {
    filters.push(`is_featured=eq.${options.featured}`);
  }

  return queryArticles(filters.join("&"));
}

export function formatArticleDate(value: string | null): string {
  if (!value) return "";
  return new Intl.DateTimeFormat("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
