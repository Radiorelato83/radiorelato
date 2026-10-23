import HeroPremium from "@/components/hero/HeroPremium";
import NewsSection from "@/components/NewsSection";
import TodayCenter from "@/components/TodayCenter";
import ProgramsSection from "@/components/ProgramsSection";
import AdBanner from "@/components/AdBanner";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import TrumunuLiveTickerGate from "@/components/girabola/TrumunuLiveTickerGate";

export default function Home() {
  return (
    <main className="w-full">
      <HeroPremium />

      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
        <TrumunuLiveTickerGate />
      </div>

      <NewsSection />
      <ProgramsSection />
      <TodayCenter />
      <AdBanner />
      <Partners />
      <Footer />
    </main>
  );
}
