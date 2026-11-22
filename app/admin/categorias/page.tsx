
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  criarCategoria,
  editarCategoria,
  ordenarCategoria,
  eliminarCategoria,
} from "./actions";

export const dynamic = "force-dynamic";

type Categoria = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  artigos: { count: number }[];
};

type Props = {
  searchParams: Promise<{
    sucesso?: string;
  }>;
};

export default async function AdminCategoriasPage({ searchParams }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    redirect("/admin/login?error=sem-permissao");
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description, sort_order, artigos:articles(count)")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Não foi possível carregar as categorias: ${error.message}`);
  }

  const categorias = (data ?? []) as unknown as Categoria[];
  const params = await searchParams;

  const mensagens: Record<string, string> = {
    criada: "Categoria criada com sucesso.",
    actualizada: "Categoria actualizada com sucesso.",
    ordem: "Ordem da categoria actualizada.",
    eliminada: "Categoria eliminada com sucesso.",
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header>
          <Link
            href="/admin"
            className="text-sm font-medium text-blue-800 underline"
          >
            Voltar ao Painel editorial
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Gestão de categorias
          </h1>

          <p className="mt-2 text-slate-600">
            Crie, edite, ordene e acompanhe as categorias das notícias.
          </p>
        </header>

        {params.sucesso && mensagens[params.sucesso] && (
          <p
            role="status"
            className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800"
          >
            {mensagens[params.sucesso]}
          </p>
        )}

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Criar nova categoria
          </h2>

          <form action={criarCategoria} className="mt-5 space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Nome da categoria
              </label>
              <input
                id="name"
                name="name"
                required
                maxLength={100}
                placeholder="Ex.: Futebol Nacional"
                className="w-full rounded-lg border border-slate-300 px-3 py-3"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium"
              >
                Descrição
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                maxLength={500}
                placeholder="Descrição opcional da categoria"
                className="w-full rounded-lg border border-slate-300 px-3 py-3"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white hover:bg-blue-900"
            >
              Criar categoria
            </button>
          </form>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">
              Categorias existentes
            </h2>
            <span className="text-sm text-slate-500">
              {categorias.length} categorias
            </span>
          </div>

          {categorias.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center text-slate-600">
              Ainda n├úo existem categorias.
            </div>
          ) : (
            <div className="space-y-5">
              {categorias.map((categoria) => {
                const totalArtigos = categoria.artigos?.[0]?.count ?? 0;

                return (
                  <article
                    key={categoria.id}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {categoria.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Slug: {categoria.slug}
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                          {categoria.description || "Sem descrição."}
                        </p>
                        <p className="mt-2 text-sm font-medium text-blue-800">
                          {totalArtigos} artigo(s) associado(s)
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-5 border-t border-slate-100 pt-5 md:grid-cols-2">
                      <form action={editarCategoria} className="space-y-3">
                        <input
                          type="hidden"
                          name="id"
                          value={categoria.id}
                        />

                        <h4 className="font-semibold text-slate-800">
                          Editar categoria
                        </h4>

                        <input
                          name="name"
                          required
                          maxLength={100}
                          defaultValue={categoria.name}
                          aria-label="Nome da categoria"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <input
                          name="slug"
                          required
                          defaultValue={categoria.slug}
                          aria-label="Endereço da categoria"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <textarea
                          name="description"
                          rows={2}
                          maxLength={500}
                          defaultValue={categoria.description ?? ""}
                          aria-label="Descrição da categoria"
                          className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        />

                        <button
                          type="submit"
                          className="rounded-lg border border-blue-700 px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-50"
                        >
                          Guardar alterações
                        </button>
                      </form>

                      <div className="space-y-4">
                        <form
                          action={ordenarCategoria}
                          className="space-y-3"
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={categoria.id}
                          />

                          <label
                            htmlFor={`ordem-${categoria.id}`}
                            className="block font-semibold text-slate-800"
                          >
                            Ordem de apresentação
                          </label>

                          <div className="flex gap-2">
                            <input
                              id={`ordem-${categoria.id}`}
                              type="number"
                              name="sort_order"
                              min="0"
                              max="9999"
                              required
                              defaultValue={categoria.sort_order}
                              className="w-28 rounded-lg border border-slate-300 px-3 py-2"
                            />

                            <button
                              type="submit"
                              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Alterar ordem
                            </button>
                          </div>
                        </form>

                        <form
                          action={eliminarCategoria}
                          onSubmit={undefined}
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={categoria.id}
                          />

                          <button
                            type="submit"
                            disabled={totalArtigos > 0}
                            className="rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            {totalArtigos > 0
                              ? "Não pode eliminar: tem artigos"
                              : "Eliminar categoria"}
                          </button>

                          {totalArtigos === 0 && (
                            <p className="mt-2 text-xs text-slate-500">
                              Esta categoria não tem artigos associados.
                            </p>
                          )}
                        </form>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
