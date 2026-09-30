import Image from "next/image";
import Link from "next/link";
import { news } from "@/data/news";

export default function HeroSidebar() {
  const highlights = news.slice(1, 3);

  return (
    <aside className="space-y-5">

      {/* TÍTULO */}
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <span className="h-7 w-1 rounded-full bg-red-600" />

        <h2 className="text-xl font-black tracking-tight text-blue-950">
          Últimas Notícias
        </h2>
      </div>

      {/* NOTÍCIAS */}
      <div className="space-y-6">

        {highlights.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            <Link href={`/noticias/${item.slug}`}>

              {/* IMAGEM */}
              <div className="relative h-40 overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* CATEGORIA */}
                <span className="absolute bottom-3 left-3 rounded-full bg-red-600 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                  {item.category}
                </span>

              </div>

              {/* CONTEÚDO */}
              <div className="p-4">

                <h3 className="line-clamp-3 text-base font-extrabold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-blue-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs font-medium text-gray-500">
                  {item.date}
                </p>

              </div>

            </Link>

          </article>
        ))}

      </div>

    </aside>
  );
}
