import HeroMain from "./HeroMain";
import { getPublishedArticles } from "@/lib/news";

export default async function HeroPremium() {
  const featured = await getPublishedArticles({ featured: true, limit: 5 });

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-6 lg:px-8 lg:py-8">
        <HeroMain articles={featured} />
      </div>
    </section>
  );
}
