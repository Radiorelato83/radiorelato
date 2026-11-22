
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type TransmissionBanner = {
  id: string;
  title: string;
  home_team: string;
  away_team: string;
  competition: string | null;
  match_date: string | null;
  image_url: string;
  is_active: boolean;
  is_live: boolean;
  display_order: number;
};

type Props = {
  initialBanners: TransmissionBanner[];
};

export default function TransmissionBanners({
  initialBanners,
}: Props) {
  const [banners, setBanners] =
    useState<TransmissionBanner[]>(initialBanners);

  useEffect(() => {
    const supabase = createClient();

    async function refreshBanners() {
      const { data, error } = await supabase
        .from("transmission_banners")
        .select(
          "id, title, home_team, away_team, competition, match_date, image_url, is_active, is_live, display_order"
        )
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data) {
        setBanners(data as TransmissionBanner[]);
      }
    }

    const channel = supabase
      .channel("public-transmission-banners")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transmission_banners",
        },
        () => {
          void refreshBanners();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  if (banners.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6">
      {banners.map((banner) => (
        <article
          key={banner.id}
          className="overflow-hidden rounded-2xl bg-blue-950 shadow-lg"
        >
          <div className="relative">
            <img
              src={banner.image_url}
              alt={banner.title}
              className="h-auto max-h-[520px] w-full object-contain"
            />

            {banner.is_live && (
              <div className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
                EMISSÃO ESPECIAL NO AR
              </div>
            )}
          </div>

          <div className="p-5 text-white md:p-7">
            <h2 className="text-xl font-extrabold md:text-2xl">
              {banner.title}
            </h2>

            <p className="mt-3 text-lg font-bold md:text-2xl">
              {banner.home_team} <span className="text-red-400">VS</span>{" "}
              {banner.away_team}
            </p>

            {banner.competition && (
              <p className="mt-2 text-sm text-blue-200">
                {banner.competition}
              </p>
            )}

            {banner.match_date && (
              <p className="mt-1 text-sm text-blue-200">
                {new Date(banner.match_date).toLocaleString("pt-AO", {
                  dateStyle: "long",
                  timeStyle: "short",
                  timeZone: "Africa/Luanda",
                })}
              </p>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
