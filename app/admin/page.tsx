
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile || profile.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin/login?error=sem-permissao");
  }

  const { count: drafts } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft");

  const { count: pending } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("status", "submitted");

  const { count: published } = await supabase
    .from("articles")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
              Rádio Relato
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Administração editorial
            </h1>
            <p className="mt-2 text-slate-600">
              Bem-vindo, {profile.display_name || user.email}.
            </p>
          </div>

          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Terminar sessão
            </button>
          </form>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Rascunhos</p>
            <p className="mt-2 text-3xl font-bold">{drafts ?? 0}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Aguardam aprovação</p>
            <p className="mt-2 text-3xl font-bold">{pending ?? 0}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Publicados no sistema</p>
            <p className="mt-2 text-3xl font-bold">{published ?? 0}</p>
          </div>
        </section>

        <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Gestão da redacção
          </h2>
          <p className="mt-2 text-slate-600">
            Esta área será expandida para gerir notícias, imagens, categorias,
            autores, destaques e aprovações.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/artigos"
              className="rounded-lg bg-blue-950 px-4 py-3 font-semibold text-white hover:bg-blue-900"
            >
              Gerir artigos
            </Link>
            <Link
              href="/admin/aprovacoes"
              className="rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Aprovações editoriais
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
