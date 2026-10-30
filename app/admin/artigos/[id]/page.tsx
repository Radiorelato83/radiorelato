
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Category = {
  id: string;
  name: string;
};

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  category_id: string | null;
  status: string;
};

const statusLabels: Record<string, string> = {
  draft: "Rascunho",
  submitted: "A aguardar aprovação",
  changes_requested: "Alterações solicitadas",
  published: "Publicado",
  archived: "Arquivado",
};

function gerarSlug(valor: string) {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EditarArtigoPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();

  const [categorias, setCategorias] = useState<Category[]>([]);
  const [titulo, setTitulo] = useState("");
  const [slug, setSlug] = useState("");
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [estado, setEstado] = useState("draft");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [verificando, setVerificando] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let activo = true;

    async function carregar() {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!activo) return;

      if (authError || !user) {
        router.replace("/admin/login");
        return;
      }

      const { data: perfil, error: perfilError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (!activo) return;

      if (perfilError || perfil?.role !== "admin") {
        router.replace("/admin/login?error=sem-permissao");
        return;
      }

      const [artigoResult, categoriasResult] = await Promise.all([
        supabase
          .from("articles")
          .select(
            "id, title, slug, excerpt, content, image_url, category_id, status"
          )
          .eq("id", id)
          .maybeSingle(),
        supabase
          .from("categories")
          .select("id, name")
          .order("sort_order", { ascending: true }),
      ]);

      if (!activo) return;

      if (artigoResult.error || !artigoResult.data) {
        setErro(
          artigoResult.error?.message ??
            "O artigo não foi encontrado ou não está acessível."
        );
        setVerificando(false);
        return;
      }

      if (categoriasResult.error) {
        setErro(
          `Não foi possível carregar as categorias: ${categoriasResult.error.message}`
        );
      }

      const artigo = artigoResult.data as Article;

      setTitulo(artigo.title);
      setSlug(artigo.slug);
      setResumo(artigo.excerpt ?? "");
      setConteudo(artigo.content ?? "");
      setImagem(artigo.image_url ?? "");
      setCategoriaId(artigo.category_id ?? "");
      setEstado(artigo.status);
      setCategorias(categoriasResult.data ?? []);
      setVerificando(false);
    }

    void carregar();

    return () => {
      activo = false;
    };
  }, [id, router]);

  async function guardarAlteracoes(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    if (!titulo.trim() || !conteudo.trim()) {
      setErro("O título e o conteúdo são obrigatórios.");
      return;
    }

    const slugFinal = gerarSlug(slug);

    if (!slugFinal) {
      setErro("Introduza um endereço válido para o artigo.");
      return;
    }

    if (
      !["draft", "submitted", "changes_requested", "published", "archived"].includes(
        estado
      )
    ) {
      setErro("Seleccione um estado editorial válido.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.replace("/admin/login");
        return;
      }

      const { data: perfil, error: perfilError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (perfilError || perfil?.role !== "admin") {
        setErro("A sua conta não tem autorização para editar artigos.");
        return;
      }

      const { data: existente, error: consultaError } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", slugFinal)
        .neq("id", id)
        .maybeSingle();

      if (consultaError) {
        setErro(
          `Não foi possível validar o endereço: ${consultaError.message}`
        );
        return;
      }

      if (existente) {
        setErro("Este endereço já está a ser utilizado por outro artigo.");
        return;
      }

      const { data: artigoActual, error: artigoError } = await supabase
        .from("articles")
        .select("status, published_at")
        .eq("id", id)
        .maybeSingle();

      if (artigoError || !artigoActual) {
        setErro("Não foi possível confirmar o estado actual do artigo.");
        return;
      }

      const agora = new Date().toISOString();

      const publishedAt =
        estado === "published"
          ? artigoActual.published_at ?? agora
          : null;

      const { data: actualizado, error: updateError } = await supabase
        .from("articles")
        .update({
          title: titulo.trim(),
          slug: slugFinal,
          excerpt: resumo.trim() || null,
          content: conteudo.trim(),
          image_url: imagem.trim() || null,
          category_id: categoriaId || null,
          status: estado,
          published_at: publishedAt,
          updated_at: agora,
        })
        .eq("id", id)
        .select("id, status")
        .maybeSingle();

      if (updateError) {
        setErro(
          `Não foi possível guardar as alterações: ${updateError.message}`
        );
        return;
      }

      if (!actualizado) {
        setErro(
          "O artigo não foi actualizado. Verifique as políticas RLS de edição no Supabase."
        );
        return;
      }

      setEstado(actualizado.status);
      setMensagem(
        estado === "published"
          ? "Artigo publicado. Se tiver imagem e as políticas públicas permitirem a leitura, ficará disponível no site."
          : "Alterações guardadas com sucesso."
      );

      router.refresh();
    } catch {
      setErro("Ocorreu um erro inesperado ao guardar as alterações.");
    } finally {
      setLoading(false);
    }
  }

  if (verificando) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-700">A carregar o artigo...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/artigos"
          className="text-sm font-medium text-blue-800 underline"
        >
          ← Voltar à gestão de artigos
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-blue-950">
          Editar artigo
        </h1>

        {estado && (
          <p className="mt-2 text-sm text-slate-600">
            Estado actual: {statusLabels[estado] ?? estado}
          </p>
        )}

        {erro && !titulo && (
          <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-red-800">
            {erro}
          </p>
        )}

        {titulo && (
          <form
            onSubmit={guardarAlteracoes}
            className="mt-8 space-y-6 rounded-xl bg-white p-6 shadow-sm md:p-8"
          >
            <div>
              <label htmlFor="titulo" className="mb-2 block font-medium">
                Título *
              </label>
              <input
                id="titulo"
                required
                maxLength={250}
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-3"
              />
            </div>

            <div>
              <label htmlFor="slug" className="mb-2 block font-medium">
                Endereço da notícia (slug) *
              </label>
              <input
                id="slug"
                required
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-3"
              />
            </div>

            <div>
              <label htmlFor="resumo" className="mb-2 block font-medium">
                Resumo
              </label>
              <textarea
                id="resumo"
                rows={3}
                maxLength={500}
                value={resumo}
                onChange={(event) => setResumo(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-3"
              />
            </div>

            <div>
              <label htmlFor="conteudo" className="mb-2 block font-medium">
                Conteúdo *
              </label>
              <textarea
                id="conteudo"
                required
                rows={14}
                value={conteudo}
                onChange={(event) => setConteudo(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-3"
              />
            </div>

            <div>
              <label htmlFor="imagem" className="mb-2 block font-medium">
                Endereço da imagem
              </label>
              <input
                id="imagem"
                value={imagem}
                onChange={(event) => setImagem(event.target.value)}
                placeholder="/noticias/nome-da-imagem.jpg"
                className="w-full rounded-lg border border-slate-300 px-3 py-3"
              />
            </div>

            <div>
              <label htmlFor="categoria" className="mb-2 block font-medium">
                Categoria
              </label>
              <select
                id="categoria"
                value={categoriaId}
                onChange={(event) => setCategoriaId(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3"
              >
                <option value="">Sem categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="estado" className="mb-2 block font-medium">
                Estado editorial
              </label>
              <select
                id="estado"
                value={estado}
                onChange={(event) => setEstado(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3"
              >
                <option value="draft">Rascunho</option>
                <option value="submitted">A aguardar aprovação</option>
                <option value="changes_requested">Alterações solicitadas</option>
                <option value="published">Publicado</option>
                <option value="archived">Arquivado</option>
              </select>
              <p className="mt-2 text-sm text-slate-500">
                Publicar torna o artigo elegível para aparecer no site. A
                visibilidade depende também das políticas de acesso do Supabase
                e de o artigo ter imagem para aparecer na secção de notícias.
              </p>
            </div>

            {mensagem && (
              <p role="status" className="text-sm text-green-700">
                {mensagem}
              </p>
            )}

            {erro && (
              <p role="alert" className="text-sm text-red-700">
                {erro}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-blue-950 px-5 py-3 font-semibold text-white disabled:opacity-60"
              >
                {loading ? "A guardar..." : "Guardar alterações"}
              </button>

              <Link
                href="/admin/artigos"
                className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700"
              >
                Cancelar
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
