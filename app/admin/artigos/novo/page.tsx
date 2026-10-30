
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Category = {
  id: string;
  name: string;
};

export default function NovaNoticiaPage() {
  const router = useRouter();

  const [categorias, setCategorias] = useState<Category[]>([]);
  const [titulo, setTitulo] = useState("");
  const [slug, setSlug] = useState("");
  const [resumo, setResumo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagem, setImagem] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    let activo = true;

    async function inicializar() {
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

      const { data, error: categoriasError } = await supabase
        .from("categories")
        .select("id, name")
        .order("sort_order", { ascending: true });

      if (!activo) return;

      if (categoriasError) {
        setErro(
          `Não foi possível carregar as categorias: ${categoriasError.message}`
        );
      } else {
        setCategorias(data ?? []);
      }

      setVerificando(false);
    }

    void inicializar();

    return () => {
      activo = false;
    };
  }, [router]);

  function gerarSlug(valor: string) {
    return valor
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function guardarRascunho(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setMensagem("");

    if (!titulo.trim() || !conteudo.trim()) {
      setErro("O título e o conteúdo são obrigatórios.");
      return;
    }

    const slugFinal = gerarSlug(slug || titulo);

    if (!slugFinal) {
      setErro("Introduza um título válido para gerar o endereço da notícia.");
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
        setErro("A sua conta não tem autorização para criar notícias.");
        return;
      }

      const { data: existente, error: consultaError } = await supabase
        .from("articles")
        .select("id")
        .eq("slug", slugFinal)
        .maybeSingle();

      if (consultaError) {
        setErro(`Não foi possível validar o endereço: ${consultaError.message}`);
        return;
      }

      if (existente) {
        setErro("Este endereço já está a ser utilizado. Altere o slug.");
        return;
      }

      const { error: insertError } = await supabase.from("articles").insert({
        title: titulo.trim(),
        slug: slugFinal,
        excerpt: resumo.trim() || null,
        content: conteudo.trim(),
        image_url: imagem.trim() || null,
        category_id: categoriaId || null,
        author_id: user.id,
        status: "draft",
        is_featured: false,
      });

      if (insertError) {
        setErro(`Não foi possível guardar a notícia: ${insertError.message}`);
        return;
      }

      setMensagem("Rascunho guardado com sucesso.");
      router.push("/admin/artigos");
      router.refresh();
    } catch {
      setErro("Ocorreu um erro inesperado ao guardar a notícia.");
    } finally {
      setLoading(false);
    }
  }

  if (verificando) {
    return (
      <main className="min-h-screen bg-slate-100 p-8">
        <p className="text-slate-700">A verificar o acesso administrativo...</p>
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
          ← Voltar à gestão de notícias
        </Link>

        <h1 className="mt-4 text-3xl font-bold text-blue-950">
          Nova notícia
        </h1>
        <p className="mt-2 text-slate-600">
          Preencha os dados editoriais. A notícia será guardada como rascunho.
        </p>

        <form
          onSubmit={guardarRascunho}
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
              onChange={(event) => {
                const valor = event.target.value;
                setTitulo(valor);
                setSlug(gerarSlug(valor));
              }}
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
            <p className="mt-1 text-xs text-slate-500">
              Exemplo: /noticias/nome-da-noticia
            </p>
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
              Conteúdo da notícia *
            </label>
            <textarea
              id="conteudo"
              required
              rows={12}
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
              type="text"
              value={imagem}
              onChange={(event) => setImagem(event.target.value)}
              placeholder="/noticias/nome-da-imagem.jpg"
              className="w-full rounded-lg border border-slate-300 px-3 py-3"
            />
            <p className="mt-1 text-xs text-slate-500">
              Pode indicar uma imagem já existente na pasta public/noticias.
              O carregamento directo de imagens será implementado numa etapa seguinte.
            </p>
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
            {categorias.length === 0 && (
              <p className="mt-1 text-xs text-amber-700">
                Ainda não existem categorias cadastradas no Supabase.
              </p>
            )}
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
              {loading ? "A guardar..." : "Guardar rascunho"}
            </button>

            <Link
              href="/admin/artigos"
              className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
