
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
    throw new Error("Utilizador n├úo autenticado.");
  }

  const userId = user.id;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (profileError || profile?.role !== "admin") {
    redirect("/admin/login?error=sem-permissao");
    throw new Error("Acesso reservado ao administrador.");
  }

  return { supabase, user };
}

function refreshTransmissionPages() {
  revalidatePath("/admin/transmissoes");
  revalidatePath("/");
}

function parseSectionConfig(formData: FormData) {
  const rawConfig = String(formData.get("config") || "");

  if (!rawConfig) {
    throw new Error("A configura├º├úo da sec├º├úo est├í vazia.");
  }

  let config: unknown;

  try {
    config = JSON.parse(rawConfig);
  } catch {
    throw new Error("A configura├º├úo enviada n├úo ├® v├ílida.");
  }

  if (
    !config ||
    typeof config !== "object" ||
    Array.isArray(config)
  ) {
    throw new Error("O formato da configura├º├úo ├® inv├ílido.");
  }

  return config;
}

export async function saveTransmissionSectionDraft(
  formData: FormData
) {
  const config = parseSectionConfig(formData);
  const { supabase, user } = await verifyAdmin();

  const { error } = await supabase
    .from("transmission_section_drafts")
    .upsert(
      {
        id: true,
        config,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      },
      { onConflict: "id" }
    );

  if (error) {
    throw new Error(
      `N├úo foi poss├¡vel guardar o rascunho: ${error.message}`
    );
  }

  revalidatePath("/admin/transmissoes");
}

export async function publishTransmissionSection(
  formData: FormData
) {
  const config = parseSectionConfig(formData);
  const { supabase, user } = await verifyAdmin();

  const { error } = await supabase
    .from("transmission_section_settings")
    .upsert(
      {
        id: true,
        config,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      },
      { onConflict: "id" }
    );

  if (error) {
    throw new Error(
      `N├úo foi poss├¡vel publicar a sec├º├úo: ${error.message}`
    );
  }

  refreshTransmissionPages();
}

export async function toggleTransmissionBanner(
  formData: FormData
) {
  const id = String(formData.get("id") || "").trim();
  const enabled = formData.get("enabled") === "true";

  if (!id) {
    throw new Error("Identificador do banner inv├ílido.");
  }

  const { supabase } = await verifyAdmin();

  if (!enabled) {
    const { data: banner, error: checkError } = await supabase
      .from("transmission_banners")
      .select("is_live")
      .eq("id", id)
      .maybeSingle();

    if (checkError) {
      throw new Error(
        `N├úo foi poss├¡vel verificar a emiss├úo: ${checkError.message}`
      );
    }

    if (banner?.is_live) {
      throw new Error(
        "Termine a emiss├úo em directo antes de desactivar este banner."
      );
    }
  }

  const { error } = await supabase
    .from("transmission_banners")
    .update({
      is_active: enabled,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `N├úo foi poss├¡vel actualizar o estado do banner: ${error.message}`
    );
  }

  refreshTransmissionPages();
}

export async function updateTransmissionBanner(
  formData: FormData
) {
  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const homeTeam = String(formData.get("home_team") || "").trim();
  const awayTeam = String(formData.get("away_team") || "").trim();
  const competition = String(formData.get("competition") || "").trim();
  const matchDate = String(formData.get("match_date") || "").trim();
  const imageUrl = String(formData.get("image_url") || "").trim();
  const streamUrl = String(formData.get("stream_url") || "").trim();
  const displayOrder = Number(formData.get("display_order") || 0);

  if (!id || !title || !homeTeam || !awayTeam || !imageUrl) {
    throw new Error("Preenche todos os campos obrigat├│rios.");
  }

  if (!Number.isInteger(displayOrder) || displayOrder < 0) {
    throw new Error(
      "A ordem de apresenta├º├úo deve ser um n├║mero igual ou superior a zero."
    );
  }

  try {
    const parsedImageUrl = new URL(imageUrl);

    if (!["http:", "https:"].includes(parsedImageUrl.protocol)) {
      throw new Error();
    }

    if (streamUrl) {
      const parsedStreamUrl = new URL(streamUrl);

      if (!["http:", "https:"].includes(parsedStreamUrl.protocol)) {
        throw new Error();
      }
    }
  } catch {
    throw new Error("Verifica o endere├ºo da imagem ou da transmiss├úo.");
  }

  let matchDateISO: string | null = null;

  if (matchDate) {
    const parsedDate = new Date(`${matchDate}:00+01:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new Error("A data e hora do jogo s├úo inv├ílidas.");
    }

    matchDateISO = parsedDate.toISOString();
  }

  const { supabase } = await verifyAdmin();

  const { error } = await supabase
    .from("transmission_banners")
    .update({
      title,
      home_team: homeTeam,
      away_team: awayTeam,
      competition: competition || null,
      match_date: matchDateISO,
      image_url: imageUrl,
      stream_url: streamUrl || null,
      display_order: displayOrder,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `N├úo foi poss├¡vel guardar as altera├º├Áes: ${error.message}`
    );
  }

  refreshTransmissionPages();
}

export async function toggleLiveTransmission(
  formData: FormData
) {
  const id = String(formData.get("id") || "").trim();
  const live = formData.get("live") === "true";

  if (!id) {
    throw new Error("Identificador da transmiss├úo inv├ílido.");
  }

  const { supabase } = await verifyAdmin();

  if (live) {
    const { data: banner, error: checkError } = await supabase
      .from("transmission_banners")
      .select("is_active")
      .eq("id", id)
      .maybeSingle();

    if (checkError) {
      throw new Error(
        `N├úo foi poss├¡vel verificar o banner: ${checkError.message}`
      );
    }

    if (!banner?.is_active) {
      throw new Error(
        "Active o banner antes de iniciar a emiss├úo especial."
      );
    }
  }

  const { error } = await supabase
    .from("transmission_banners")
    .update({
      is_live: live,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      throw new Error(
        "J├í existe outra transmiss├úo em directo. Termine-a antes de iniciar esta."
      );
    }

    throw new Error(
      `N├úo foi poss├¡vel actualizar o estado da emiss├úo: ${error.message}`
    );
  }

  refreshTransmissionPages();
}

