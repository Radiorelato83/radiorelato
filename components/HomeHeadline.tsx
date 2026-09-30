import Image from "next/image";
import Link from "next/link";
import { news } from "@/data/news";

export default function HomeHeadline() {
  const destaque = news[0];

  return (
    <section className="bg-white py-10">

      <div className="w-full px-4 md:px-6 lg:px-8">

        <div className="grid lg:grid-cols-3 gap-6">


          {/* NOTÍCIA PRINCIPAL */}
          <article className="lg:col-span-2 bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">

            <div className="relative h-[330px] lg:h-[380px]">

              <Image
                src={destaque.image}
                alt={destaque.title}
                fill
                sizes="(max-width:768px) 100vw, 66vw"
                className="object-cover"
              />

            </div>


            <div className="p-6 lg:p-8">

              <span className="inline-flex bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                {destaque.category}
              </span>


              <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-950 mt-5 leading-tight">
                {destaque.title}
              </h1>


              <p className="mt-5 text-lg text-gray-600 leading-8">
                {destaque.excerpt}
              </p>


              <Link
                href={`/noticias/${destaque.slug}`}
                className="inline-flex mt-8 bg-blue-950 hover:bg-blue-900 text-white px-7 py-3 rounded-full font-semibold transition"
              >
                Ler notícia →
              </Link>

            </div>

          </article>



          {/* RÁDIO RELATO PREMIUM */}
          <aside className="rounded-3xl overflow-hidden shadow-xl text-white bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 p-8 flex flex-col justify-between">


            <div>


              <span className="inline-flex items-center gap-2 text-red-400 font-bold uppercase text-sm tracking-wide">

                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>

                Rádio Relato

              </span>



              <h2 className="text-4xl font-extrabold mt-5 leading-tight">
                Desporto com paixão e alma
              </h2>


              <p className="text-blue-100 mt-5 leading-7">
                Informação desportiva, relatos, entrevistas e análises
                para acompanhar o desporto angolano.
              </p>


            </div>



            <div className="space-y-5 mt-10">


              <div className="border-l-4 border-red-500 pl-4">

                <p className="text-sm text-blue-200">
                  Programa
                </p>

                <h3 className="font-bold text-lg">
                  Bola Informativa
                </h3>

              </div>



              <div className="border-l-4 border-yellow-400 pl-4">

                <p className="text-sm text-blue-200">
                  Próxima transmissão
                </p>

                <h3 className="font-bold text-lg">
                  Petro × Wiliete
                </h3>

              </div>



              <div className="border-l-4 border-white pl-4">

                <p className="text-sm text-blue-200">
                  Conteúdo
                </p>

                <h3 className="font-bold text-lg">
                  Podcasts e entrevistas
                </h3>

              </div>


            </div>



            <Link
              href="/programas"
              className="mt-10 bg-white text-blue-950 text-center py-3 rounded-full font-bold hover:bg-blue-50 transition"
            >
              Ver programação →
            </Link>


          </aside>


        </div>

      </div>

    </section>
  );
}