"use client";

import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    id: 1,
    title: "Bola Informativa",
    category: "Informação Desportiva",
    description:
      "O espelho noticioso da Rádio Relato. Informação, atualidade e os principais acontecimentos do desporto.",
    schedule: [
      "Segunda-feira · 07h45",
      "Quarta-feira · 12h45",
      "Sexta-feira · 19h45",
    ],
    image: "/programas/bola-informativa.jpg",
    href: "/programas/bola-informativa",
    type: "principal",
  },
  {
    id: 2,
    title: "Bastidor Desportivo",
    category: "Análise Desportiva",
    description:
      "Um espaço dedicado aos bastidores, protagonistas, histórias e temas que marcam o desporto.",
    schedule: ["Quinta-feira · 19h45 — 21h00"],
    image: "/programas/bastidor-desportivo.jpg",
    href: "/programas/bastidor-desportivo",
    type: "regular",
  },
  {
    id: 3,
    title: "Trumunu Online",
    category: "Especial Jornada",
    description:
      "O espaço especial da Rádio Relato para acompanhar as grandes jornadas desportivas, ao fim de semana ou em edições extraordinárias durante a semana.",
    schedule: ["Fim de semana", "Edições extraordinárias"],
    image: "/programas/trumunu-online.jpg",
    href: "/programas/trumunu-online",
    type: "especial",
  },
];

export default function ProgramsSection() {
  const mainProgram = programs.find(
    (program) => program.type === "principal"
  );

  const regularPrograms = programs.filter(
    (program) => program.type !== "principal"
  );

  if (!mainProgram) {
    return null;
  }

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">

        {/* =====================================================
            CABEÇALHO
        ===================================================== */}

        <div className="mb-8 flex items-end justify-between gap-4">

          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-red-600">
              Rádio Relato
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-blue-950 md:text-4xl">
              Programas em Destaque
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
              Informação, análise e acompanhamento das principais jornadas
              desportivas.
            </p>
          </div>

          <Link
            href="/programas"
            className="hidden rounded-full border border-blue-950 px-5 py-2.5 text-sm font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white md:inline-flex"
          >
            Ver todos →
          </Link>

        </div>

        {/* =====================================================
            BOLA INFORMATIVA — PROGRAMA PRINCIPAL
        ===================================================== */}

        <article className="group overflow-hidden rounded-3xl bg-blue-950 shadow-xl">

          <Link
            href={mainProgram.href}
            className="grid lg:grid-cols-[1.15fr_1fr]"
          >

            {/* IMAGEM */}

            <div className="relative min-h-[300px] overflow-hidden bg-blue-900 md:min-h-[400px] lg:min-h-[440px]">

              <Image
                src={mainProgram.image}
                alt={mainProgram.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-blue-950/95" />

              {/* ETIQUETA */}

              <div className="absolute left-5 top-5 md:left-7 md:top-7">

                <span className="rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-[0.08em] text-white shadow-lg">
                  Programa principal
                </span>

              </div>

            </div>

            {/* CONTEÚDO */}

            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">

              <p className="text-sm font-black uppercase tracking-[0.14em] text-red-400 md:text-base">
                Informação Desportiva
              </p>

              <h3 className="mt-3 text-4xl font-black leading-tight text-white md:text-5xl">
                {mainProgram.title}
              </h3>

              <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 md:text-lg">
                {mainProgram.description}
              </p>

              {/* HORÁRIOS */}

              <div className="mt-7">

                <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-blue-300">
                  Emissão
                </p>

                <div className="flex flex-wrap gap-2">

                  {mainProgram.schedule.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white/10 px-4 py-2.5 text-sm font-bold text-white"
                    >
                      {item}
                    </span>
                  ))}

                </div>

              </div>

              {/* CTA */}

              <div className="mt-8">

                <span className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-black text-blue-950 transition group-hover:bg-red-600 group-hover:text-white">
                  Conhecer o programa
                  <span className="ml-2 text-lg">→</span>
                </span>

              </div>

            </div>

          </Link>

        </article>

        {/* =====================================================
            BASTIDOR DESPORTIVO + TRUMUNU ONLINE
        ===================================================== */}

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          {regularPrograms.map((program) => {

            const isSpecial = program.type === "especial";

            return (
              <article
                key={program.id}
                className={`group overflow-hidden rounded-2xl shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isSpecial
                    ? "bg-blue-950"
                    : "border border-gray-400 bg-white"
                }`}
              >

                <Link
                  href={program.href}
                  className="flex min-h-[210px]"
                >

                  {/* IMAGEM */}

                  <div className="relative w-[42%] shrink-0 overflow-hidden bg-blue-950">

                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      sizes="320px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-950/60" />

                  </div>

                  {/* CONTEÚDO */}

                  <div className="flex flex-1 flex-col justify-center p-5 md:p-6">

                    <p
                      className={`text-sm font-black uppercase tracking-[0.12em] md:text-base ${
                        isSpecial ? "text-red-400" : "text-red-600"
                      }`}
                    >
                      {program.category}
                    </p>

                    <h3
                      className={`mt-2 text-xl font-black leading-tight ${
                        isSpecial
                          ? "text-white"
                          : "text-blue-950 group-hover:text-red-600"
                      }`}
                    >
                      {program.title}
                    </h3>

                    <p
                      className={`mt-2 line-clamp-3 text-sm leading-5 ${
                        isSpecial ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {program.description}
                    </p>

                    {/* HORÁRIO */}

                    <div className="mt-4 flex flex-wrap gap-2">

                      {program.schedule.map((item) => (
                        <span
                          key={item}
                          className={`text-xs font-bold ${
                            isSpecial
                              ? "text-blue-200"
                              : "text-gray-800"
                          }`}
                        >
                          {item}
                        </span>
                      ))}

                    </div>

                    <span
                      className={`mt-4 text-sm font-black ${
                        isSpecial
                          ? "text-white"
                          : "text-blue-950"
                      }`}
                    >
                      Ver programa →
                    </span>

                  </div>

                </Link>

              </article>
            );
          })}

        </div>

        {/* =====================================================
            MOBILE
        ===================================================== */}

        <div className="mt-6 md:hidden">

          <Link
            href="/programas"
            className="inline-flex rounded-full border border-blue-950 px-5 py-2.5 text-sm font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
          >
            Ver todos os programas →
          </Link>

        </div>

      </div>
    </section>
  );
}