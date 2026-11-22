
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  toggleTransmissionBanner,
  toggleLiveTransmission,
} from "./actions";
import NewTransmissionBannerForm from "./NewTransmissionBannerForm";
import EditTransmissionBannerForm from "./EditTransmissionBannerForm";
import TransmissionSectionEditor from "./TransmissionSectionEditor";

export const dynamic = "force-dynamic";

type TransmissionSectionConfig = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  fontFamily: string;
  titleSize: number;
  subtitleSize: number;
  bodySize: number;
  titleColor: string;
  textColor: string;
  accentColor: string;
  backgroundColor: string;
  alignment: "left" | "center" | "right";
  gradient: boolean;
  overlayOpacity: number;
};

export default async function TransmissionBannersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
    throw new Error("Utilizador não autenticado.");
  }

  const userId = user.id;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError || profile?.role !== "admin") {
    redirect("/admin");
    throw new Error("Acesso reservado ao administrador.");
  }

  const [
    { data: banners, error: bannersError },
    { data: draft },
    { data: settings },
  ] = await Promise.all([
    supabase
      .from("transmission_banners")
      .select(
        "id, title, home_team, away_team, competition, match_date, image_url, is_active, is_live, display_order, created_at"
      )
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false }),

    supabase
      .from("transmission_section_drafts")
      .select("config")
      .eq("id", true)
      .maybeSingle(),

    supabase
      .from("transmission_section_settings")
      .select("config")
      .eq("id", true)
      .maybeSingle(),
  ]);

  const initialConfig = (
    draft?.config || settings?.config || null
  ) as Partial<TransmissionSectionConfig> | null;

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Gestão de Transmissões
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Administre os banners dos jogos e a apresentação da secção
            Trumunu Online.
          </p>
        </div>

        <Link
          href="/admin"
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Voltar ao painel
        </Link>
      </div>

      <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Editor da secção Trumunu Online
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Personalize os títulos, textos, fontes, tamanhos, cores e
            alinhamento da secção apresentada na página inicial.
          </p>
        </div>

        <TransmissionSectionEditor initialConfig={initialConfig} />
      </section>

      <section className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Adicionar transmissão
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Registe um novo jogo ou transmissão para aparecer na página inicial.
          </p>
        </div>

        <NewTransmissionBannerForm />
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Banners de transmissão
          </h2>

          <p className="mt-1 text-sm text-slate-600">
            Edite, active ou desactive os banners e controle o início e o fim
            das emissões especiais.
          </p>
        </div>

        {bannersError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Erro ao carregar os banners: {bannersError.message}
          </div>
        )}

        {!bannersError && (!banners || banners.length === 0) && (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
            Ainda não existem banners de transmissão registados.
          </div>
        )}

        <div className="space-y-5">
          {banners?.map((banner) => (
            <article
              key={banner.id}
              className="space-y-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {banner.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {banner.home_team} vs {banner.away_team}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      banner.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {banner.is_active ? "Activo" : "Inactivo"}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      banner.is_live
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {banner.is_live ? "Em directo" : "Não está em directo"}
                  </span>
                </div>
              </div>

              {banner.image_url && (
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={banner.image_url}
                    alt={banner.title}
                    className="max-h-64 w-full object-cover"
                  />
                </div>
              )}

              <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                <p>
                  <strong>Competição:</strong>{" "}
                  {banner.competition || "Não definida"}
                </p>

                <p>
                  <strong>Data:</strong>{" "}
                  {banner.match_date
                    ? new Date(banner.match_date).toLocaleString("pt-AO")
                    : "Não definida"}
                </p>

                <p>
                  <strong>Ordem:</strong> {banner.display_order}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                <form action={toggleTransmissionBanner}>
                  <input
                    type="hidden"
                    name="id"
                    value={banner.id}
                  />

                  <input
                    type="hidden"
                    name="enabled"
                    value={String(!banner.is_active)}
                  />

                  <button
                    type="submit"
                    disabled={banner.is_live}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${
                      banner.is_active
                        ? "bg-amber-600 hover:bg-amber-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {banner.is_active ? "Desactivar banner" : "Activar banner"}
                  </button>
                </form>

                <form action={toggleLiveTransmission}>
                  <input
                    type="hidden"
                    name="id"
                    value={banner.id}
                  />

                  <input
                    type="hidden"
                    name="live"
                    value={String(!banner.is_live)}
                  />

                  <button
                    type="submit"
                    disabled={!banner.is_active && !banner.is_live}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 ${
                      banner.is_live
                        ? "bg-red-700 hover:bg-red-800"
                        : "bg-blue-700 hover:bg-blue-800"
                    }`}
                  >
                    {banner.is_live
                      ? "Terminar emissão"
                      : "Iniciar emissão especial"}
                  </button>
                </form>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <h4 className="mb-3 font-semibold text-slate-800">
                  Editar este banner
                </h4>

                <EditTransmissionBannerForm banner={banner} />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
