
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { updateTransmissionBanner } from "./actions";

type Banner = {
  id: string;
  title: string;
  home_team: string;
  away_team: string;
  competition: string | null;
  match_date: string | null;
  image_url: string;
  display_order: number;
};

function formatDateForInput(value: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date
    .toLocaleString("sv-SE", {
      timeZone: "Africa/Luanda",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(" ", "T");
}

export default function EditTransmissionBannerForm({
  banner,
}: {
  banner: Banner;
}) {
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(banner.image_url);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const image = formData.get("image");

    try {
      let imageUrl = banner.image_url;

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
        throw new Error("Não tens autorização para editar banners.");
      }

      if (image instanceof File && image.size > 0) {
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "image/avif",
        ];

        if (!allowedTypes.includes(image.type)) {
          throw new Error("Usa uma imagem JPG, PNG, WebP ou AVIF.");
        }

        if (image.size > 10 * 1024 * 1024) {
          throw new Error("A imagem não pode ultrapassar 10 MB.");
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
            `Falha ao carregar a nova imagem: ${uploadError.message}`
          );
        }

        const { data } = supabase.storage
          .from("editorial-images")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      formData.set("image_url", imageUrl);

      await updateTransmissionBanner(formData);

      setMessage("Banner actualizado com sucesso.");
      setImagePreview(imageUrl);
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível actualizar o banner."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => {
          setEditing(!editing);
          setMessage("");
        }}
        className="rounded-lg border border-blue-800 px-5 py-2 font-semibold text-blue-900 hover:bg-blue-50"
      >
        {editing ? "Fechar edição" : "Editar banner"}
      </button>

      {editing && (
        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-5 rounded-xl border border-blue-200 bg-blue-50 p-5"
        >
          <h4 className="text-lg font-bold text-blue-950">
            Editar dados da transmissão
          </h4>

          <input type="hidden" name="id" value={banner.id} />
          <input
            type="hidden"
            name="image_url"
            value={imagePreview}
            readOnly
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Título do banner *
            </label>
            <input
              name="title"
              required
              maxLength={150}
              defaultValue={banner.title}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
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
                defaultValue={banner.home_team}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
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
                defaultValue={banner.away_team}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
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
                defaultValue={banner.competition || ""}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Data e hora do jogo
              </label>
              <input
                type="datetime-local"
                name="match_date"
                defaultValue={formatDateForInput(banner.match_date)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              Imagem actual
            </p>
            <img
              src={imagePreview}
              alt={banner.title}
              className="mb-3 aspect-video w-full max-w-md rounded-lg bg-white object-cover"
            />

            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Substituir imagem (opcional)
            </label>
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                } else {
                  setImagePreview(banner.image_url);
                }
              }}
            />
            <p className="mt-2 text-xs text-slate-500">
              Se não seleccionares outra imagem, será mantida a actual.
              Máximo: 10 MB.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Ordem de apresentação
            </label>
            <input
              type="number"
              name="display_order"
              min="0"
              defaultValue={banner.display_order}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 sm:max-w-xs"
            />
          </div>

          {message && (
            <p
              role="status"
              className="rounded-lg bg-white p-3 text-sm text-slate-800"
            >
              {message}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-950 px-6 py-3 font-semibold text-white hover:bg-blue-900 disabled:opacity-60"
            >
              {loading ? "A guardar..." : "Guardar alterações"}
            </button>

            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setImagePreview(banner.image_url);
                setMessage("");
              }}
              disabled={loading}
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
