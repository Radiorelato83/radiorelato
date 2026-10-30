import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Article = {
  id: string;
  title: string;
  slug: string;
  status: string;
  created_at: string;
  published_at: string | null;
  categories: { name: string } | null;
};

const statusLabels: Record<string, string> = {
  draft: "Rascunho",
  submitted: "A aguardar aprovação",
  changes_requested: "Alterações solicitadas",
  published: "Publicado",
  archived: "Arquivado",
};

export default async function AdminArticlesPage() {
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
      "id, title, slug, status, created_at, published_at, categories(name)"
    )
    .order("created_at", { ascending: false });

  const articles = (data ?? []) as unknown as Article[];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/admin"
              className="text-sm font-medium text-blue-800 underline"
            >
              ← Painel editorial
            </Link>

            <h1 className="mt-3 text-3xl font-bold text-slate-900">
              Gestão de artigos
            </h1>

            <p className="mt-2 text-slate-600">
              Consulte e edite os artigos registados no sistema editorial.
            </p>
          </div>

          <Link
            href="/admin/artigos/novo"
            className="rounded-lg bg-blue-950 px-4 py-3 font-semibold text-white hover:bg-blue-900"
          >
            Novo artigo
          </Link>
        </header>

        {error && (
          <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-800">
            Não foi possível carregar os artigos. Verifique as permissões da
            base de dados.
          </p>
        )}

        <section className="mt-8 overflow-x-auto rounded-xl bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="p-4">Título</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Data</th>
                <th className="p-4">Acções</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {articles.map((article) => (
                <tr key={article.id}>
                  <td className="p-4">
                    <p className="font-semibold text-slate-900">
                      {article.title}
                    </p>
                    <p className="mt-1 text-slate-500">{article.slug}</p>
                  </td>

                  <td className="p-4">
                    {article.categories?.name ?? "Sem categoria"}
                  </td>

                  <td className="p-4">
                    {statusLabels[article.status] ?? article.status}
                  </td>

                  <td className="p-4">
                    {new Date(article.created_at).toLocaleDateString("pt-PT")}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/artigos/${article.id}`}
                      className="inline-block rounded-lg bg-blue-950 px-4 py-2 font-semibold text-white hover:bg-blue-800"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}

              {!error && articles.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-slate-500"
                  >
                    Ainda não existem artigos para apresentar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <p className="mt-4 text-sm text-slate-500">
          Total de artigos: {articles.length}
        </p>
      </div>
    </main>
  );
}
