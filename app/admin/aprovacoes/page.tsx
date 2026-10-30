import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  created_at: string;
  editor_note: string | null;
  categories: { name: string } | null;
};

export default async function ApprovalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    redirect("/admin/login?error=sem-permissao");
  }

  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, title, slug, excerpt, created_at, editor_note, categories(name)"
    )
    .eq("status", "submitted")
    .order("created_at", { ascending: true });

  const articles = (data ?? []) as unknown as Article[];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/admin"
          className="text-sm font-medium text-blue-800 underline"
        >
          ← Painel editorial
        </Link>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Aprovações editoriais
        </h1>
        <p className="mt-2 text-slate-600">
          Artigos submetidos e pendentes de revisão.
        </p>

        {error && (
          <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-800">
            Não foi possível carregar os artigos. Verifique as políticas de
            acesso do Supabase.
          </p>
        )}

        <section className="mt-8 space-y-4">
          {articles.map((article) => (
            <article
              key={article.id}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-medium text-amber-700">
                A aguardar aprovação
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {article.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Categoria: {article.categories?.name ?? "Sem categoria"} ·
                Submetido em{" "}
                {new Date(article.created_at).toLocaleDateString("pt-PT")}
              </p>
              {article.excerpt && (
                <p className="mt-4 text-slate-700">{article.excerpt}</p>
              )}
              {article.editor_note && (
                <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                  Nota editorial: {article.editor_note}
                </p>
              )}
              <p className="mt-3 text-xs text-slate-500">
                Identificador: {article.id}
              </p>
            </article>
          ))}

          {!error && articles.length === 0 && (
            <div className="rounded-xl bg-white p-8 text-center text-slate-600 shadow-sm">
              Não existem artigos pendentes de aprovação.
            </div>
          )}
        </section>

        <p className="mt-5 text-sm text-slate-500">
          Artigos pendentes: {articles.length}
        </p>
      </div>
    </main>
  );
}
