import BreakingNews from "@/components/BreakingNews";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

export default function Noticias() {
  return (
    <>
      <main>

        {/* Última Hora */}
        <BreakingNews />

        {/* Notícias */}
        <NewsSection />

      </main>

      <Footer />
    </>
  );
}
