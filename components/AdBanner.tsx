import Link from "next/link";

export default function AdBanner() {
  return (
    <section className="bg-[#f4f7fb] py-10 md:py-12">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">

        <div className="overflow-hidden rounded-2xl bg-blue-950 shadow-lg">

          <Link
            href="/contactos"
            className="group block"
          >

            <div className="relative flex min-h-[180px] items-center justify-center px-6 py-10 text-center md:min-h-[210px] md:px-10">

              {/* ELEMENTOS DECORATIVOS */}

              <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-red-600/20" />

              <div className="absolute -bottom-20 -right-10 h-52 w-52 rounded-full bg-blue-500/20" />

              {/* CONTEÚDO */}

              <div className="relative z-10 max-w-4xl">

                <p className="text-[16px] font-black uppercase tracking-[0.25em] text-red-400">
                  Publicidade
                </p>

                <h2 className="mt-3 text-2xl font-black leading-tight text-white md:text-4xl">
                  A sua marca também pode estar onde o desporto acontece.
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-blue-200 md:text-base">
                  Divulgue a sua empresa, produto ou serviço através da Rádio
                  Relato e alcance uma audiência apaixonada pelo desporto.
                </p>

                <div className="mt-6">

                  <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-black text-blue-950 transition group-hover:bg-red-600 group-hover:text-white">
                    Anuncie na Rádio Relato
                    <span className="ml-2 text-lg">→</span>
                  </span>

                </div>

              </div>

            </div>

          </Link>

        </div>

      </div>
    </section>
  );
}