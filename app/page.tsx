import HeroPremium from "@/components/hero/HeroPremium";
import NewsSection from "@/components/NewsSection";
import TodayCenter from "@/components/TodayCenter";
import ProgramsSection from "@/components/ProgramsSection";
import AdBanner from "@/components/AdBanner";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full">

      {/* Destaque */}
      <HeroPremium />

      {/* Mais Notícias */}
      <NewsSection />

      {/* Centro do Dia */}
      <TodayCenter />

      {/* Programas em Destaque */}
      <ProgramsSection />

      {/* Publicidade */}
      <AdBanner />

      {/* Parceiros */}
      <Partners />

      {/* Rodapé */}
      <Footer />

    </main>
  );
}