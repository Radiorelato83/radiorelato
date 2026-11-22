
import HeroPremium from "@/components/hero/HeroPremium";
import NewsSection from "@/components/NewsSection";
import TodayCenter from "@/components/TodayCenter";
import ProgramsSection from "@/components/ProgramsSection";
import AdBanner from "@/components/AdBanner";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import TrumunuLiveTickerGate from "@/components/girabola/TrumunuLiveTickerGate";
import TransmissionBanners from "@/components/TransmissionBanners";
import { getPublishedArticles } from "@/lib/news";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const published = await getPublishedArticles({ limit: 20 });
  const secondaryNews = published.filter((article) => !article.is_featured);

  const supabase = await createClient();

  const { data: transmissionBanners, error } = await supabase
    .from("transmission_banners")
    .select(
      "id, title, home_team, away_team, competition, match_date, image_url, is_active, is_live, display_order"
    )
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Erro ao carregar banners de transmissÃ£o:", error.message);
  }

  return (
    <main className="w-full">
      <HeroPremium />

      <TransmissionBanners initialBanners={transmissionBanners ?? []} />

      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <TrumunuLiveTickerGate />
      </div>

      <NewsSection articles={secondaryNews} />



      <ProgramsSection />

      <TodayCenter />

      <AdBanner />

      <Partners />

      <Footer />
    </main>
  );
}
