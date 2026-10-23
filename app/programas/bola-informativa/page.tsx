import Image from "next/image";
import Link from "next/link";

export default function BolaInformativaPage() {
  return (
    <main className="bg-white">
      <section className="bg-blue-950 py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
          <Link
            href="/programas"
            className="inline-flex items-center text-sm font-bold text-blue-200 transition hover:text-white"
          >
            ← Voltar aos programas
          </Link>

          <div className="mt-8 grid overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
            <div className="relative min-h-[320px] bg-blue-950 md:min-h-[430px]">
              <Image
                src="/programas/bola-informativa.jpg"
                alt="Bola Informativa"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center"
                priority
              />
            </div>

            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-red-600 md:text-base">
                Informação Desportiva
              </p>

              <h1 className="mt-3 text-4xl font-black leading-tight text-blue-950 md:text-5xl">
                Bola Informativa
              </h1>

              <p className="mt-5 text-base leading-7 text-gray-600 md:text-lg">
                O espelho noticioso da Rádio Relato. Informação, atualidade e
                os principais acontecimentos do desporto.
              </p>

              <div className="mt-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-gray-500">
                  Emissão
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-blue-950 px-4 py-2.5 text-sm font-bold text-white">
                    Segunda-feira · 07h45
                  </span>

                  <span className="rounded-full bg-blue-950 px-4 py-2.5 text-sm font-bold text-white">
                    Quarta-feira · 12h45
                  </span>

                  <span className="rounded-full bg-blue-950 px-4 py-2.5 text-sm font-bold text-white">
                    Sexta-feira · 19h45
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/programas"
                  className="inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-black text-white transition hover:bg-red-700"
                >
                  Ver outros programas →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}