
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewTransmissionBannerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = String(formData.get("title") || "").trim();
    const homeTeam = String(formData.get("home_team") || "").trim();
    const awayTeam = String(formData.get("away_team") || "").trim();
    const competition = String(formData.get("competition") || "").trim();
    const matchDate = String(formData.get("match_date") || "");
    const displayOrder = Number(formData.get("display_order") || 0);
    const image = formData.get("image");

    if (
      !title ||
      !homeTeam ||
      !awayTeam ||
      !(image instanceof File) ||
      image.size === 0
    ) {
      setMessageType("error");
      setMessage("Preenche os campos obrigatórios e selecciona uma imagem.");
      setLoading(false);
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    if (!allowedTypes.includes(image.type)) {
      setMessageType("error");
      setMessage("Formato inválido. Usa JPG, PNG, WebP ou AVIF.");
      setLoading(false);
      return;
    }

    if (image.size > 10 * 1024 * 1024) {
      setMessageType("error");
      setMessage("A imagem não pode ultrapassar 10 MB.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("Sessão expirada. Volta a entrar no painel.");
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (profile?.role !== "admin") {
        throw new Error("Não tens autorização para criar banners.");
      }

      const safeName = image.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9.-]/g, "-");

      const filePath = `${user.id}/transmissions/${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("editorial-images")
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: false,
          contentType: image.type,
        });

      if (uploadError) {
        throw new Error(
          `Falha no carregamento da imagem: ${uploadError.message}`
        );
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("editorial-images")
        .getPublicUrl(filePath);

      const { error: insertError } = await supabase
        .from("transmission_banners")
        .insert({
          title,
          home_team: homeTeam,
          away_team: awayTeam,
          competition: competition || null,
          match_date: matchDate
            ? new Date(matchDate).toISOString()
            : null,
          image_url: publicUrl,
          is_active: false,
          display_order: Number.isFinite(displayOrder) ? displayOrder : 0,
          created_by: user.id,
        });

      if (insertError) {
        throw new Error(
          `Falha ao guardar o banner: ${insertError.message}`
        );
      }

      setMessageType("success");
      setMessage(
        "Banner registado com sucesso. Está inactivo até ser activado."
      );
      form.reset();
      router.refresh();
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao registar o banner."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">
        Registar novo banner
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Carrega o cartaz do jogo e indica os dados da transmissão.
        O banner será criado inicialmente como inactivo.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Título do banner *
          </label>
          <input
            name="title"
            required
            maxLength={150}
            placeholder="Ex.: Clássico 92 — Transmissão em directo"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Equipa da casa *
            </label>
            <input
              name="home_team"
              required
              maxLength={100}
              placeholder="Ex.: Petro de Luanda"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Equipa visitante *
            </label>
            <input
              name="away_team"
              required
              maxLength={100}
              placeholder="Ex.: 1º de Agosto"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Competição
            </label>
            <input
              name="competition"
              maxLength={150}
              placeholder="Ex.: Liga Unitel Girabola"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Data e hora do jogo
            </label>
            <input
              type="datetime-local"
              name="match_date"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Imagem promocional *
          </label>
          <input
            type="file"
            name="image"
            required
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="w-full rounded-lg border border-slate-300 p-3 text-sm"
          />
          <p className="mt-2 text-xs text-slate-500">
            JPG, PNG, WebP ou AVIF. Tamanho máximo: 10 MB.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Ordem de apresentação
          </label>
          <input
            type="number"
            name="display_order"
            defaultValue="0"
            min="0"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 sm:max-w-xs"
          />
        </div>

        {message && (
          <p
            role="status"
            className={`rounded-lg p-3 text-sm ${
              messageType === "success"
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-950 px-6 py-3 font-semibold text-white hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "A carregar e guardar..." : "Registar banner"}
        </button>
      </form>
    </section>
  );
}
