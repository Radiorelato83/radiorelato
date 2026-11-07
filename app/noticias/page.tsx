import BreakingNews from "@/components/BreakingNews";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";
import { getPublishedArticles } from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function Noticias() {
  const articles = await getPublishedArticles({ limit: 100 });

  return (
    <>
      <main>
        <BreakingNews />
        <NewsSection articles={articles} />
      </main>
      <Footer />
    </>
  );
}
