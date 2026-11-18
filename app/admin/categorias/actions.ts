
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || profile?.role !== "admin") {
    redirect("/admin/login?error=sem-permissao");
  }

  return supabase;
}

function normalizarSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function actualizarPaginas() {
  revalidatePath("/admin");
  revalidatePath("/admin/categorias");
  revalidatePath("/admin/artigos");
  revalidatePath("/");
  revalidatePath("/noticias");
}

async function verificarDuplicados(
  supabase: Awaited<ReturnType<typeof createClient>>,
  name: string,
  slug: string,
  excluirId?: string
) {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug");

  if (error) {
    throw new Error(
      `Não foi possível verificar as categorias: ${error.message}`
    );
  }

  const duplicada = (data ?? []).find((categoria) => {
    if (excluirId && categoria.id === excluirId) {
      return false;
    }

    return (
      categoria.name.trim().toLowerCase() === name.toLowerCase() ||
      categoria.slug.toLowerCase() === slug.toLowerCase()
    );
  });

  if (duplicada) {
    throw new Error("Já existe uma categoria com esse nome ou endereço.");
  }
}

export async function criarCategoria(formData: FormData) {
  const supabase = await verifyAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const description =
    String(formData.get("description") ?? "").trim() || null;
  const slug = normalizarSlug(name);

  if (!name || name.length > 100) {
    throw new Error("O nome deve ter entre 1 e 100 caracteres.");
  }

  if (!slug) {
    throw new Error("Não foi possível gerar um endereço válido.");
  }

  if (description && description.length > 500) {
    throw new Error("A descrição não pode ultrapassar 500 caracteres.");
  }

  await verificarDuplicados(supabase, name, slug);

  const { error } = await supabase.from("categories").insert({
    name,
    slug,
    description,
    sort_order: 0,
  });

  if (error) {
    throw new Error(`Não foi possível criar a categoria: ${error.message}`);
  }

  actualizarPaginas();
  redirect("/admin/categorias?sucesso=criada");
}

export async function editarCategoria(formData: FormData) {
  const supabase = await verifyAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const slugOriginal = String(formData.get("slug") ?? "").trim();
  const description =
    String(formData.get("description") ?? "").trim() || null;
  const slug = normalizarSlug(slugOriginal);

  if (!id) {
    throw new Error("Identificador da categoria inválido.");
  }

  if (!name || name.length > 100) {
    throw new Error("O nome deve ter entre 1 e 100 caracteres.");
  }

  if (!slug) {
    throw new Error("O endereço da categoria é inválido.");
  }

  if (description && description.length > 500) {
    throw new Error("A descrição não pode ultrapassar 500 caracteres.");
  }

  await verificarDuplicados(supabase, name, slug, id);

  const { error } = await supabase
    .from("categories")
    .update({ name, slug, description })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Não foi possível actualizar a categoria: ${error.message}`
    );
  }

  actualizarPaginas();
  redirect("/admin/categorias?sucesso=actualizada");
}

export async function ordenarCategoria(formData: FormData) {
  const supabase = await verifyAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const rawOrder = String(formData.get("sort_order") ?? "").trim();
  const sortOrder = Number(rawOrder);

  if (!id) {
    throw new Error("Identificador da categoria inválido.");
  }

  if (
    rawOrder === "" ||
    !Number.isInteger(sortOrder) ||
    sortOrder < 0 ||
    sortOrder > 9999
  ) {
    throw new Error("A ordem deve ser um número inteiro entre 0 e 9999.");
  }

  const { error } = await supabase
    .from("categories")
    .update({ sort_order: sortOrder })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Não foi possível alterar a ordem: ${error.message}`
    );
  }

  actualizarPaginas();
  redirect("/admin/categorias?sucesso=ordem");
}

export async function eliminarCategoria(formData: FormData) {
  const supabase = await verifyAdmin();

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    throw new Error("Identificador da categoria inválido.");
  }

  const { count, error: countError } = await supabase
    .from("articles")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);

  if (countError) {
    throw new Error(
      `Não foi possível verificar os artigos associados: ${countError.message}`
    );
  }

  if ((count ?? 0) > 0) {
    throw new Error(
      "Esta categoria não pode ser eliminada porque tem artigos associados."
    );
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Não foi possível eliminar a categoria: ${error.message}`
    );
  }

  actualizarPaginas();
  redirect("/admin/categorias?sucesso=eliminada");
}
