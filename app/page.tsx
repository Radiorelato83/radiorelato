import HeroPremium from "@/components/hero/HeroPremium";
import NewsSection from "@/components/NewsSection";
import TodayCenter from "@/components/TodayCenter";
import ProgramsSection from "@/components/ProgramsSection";
import AdBanner from "@/components/AdBanner";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import TrumunuLiveTickerGate from "@/components/girabola/TrumunuLiveTickerGate";
import { getPublishedArticles } from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function Home() {
  const published = await getPublishedArticles({ limit: 20 });
  const secondaryNews = published.filter((article) => !article.is_featured);

  return (
    <main className="w-full">
      <HeroPremium />

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
