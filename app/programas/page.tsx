
import Image from "next/image";
import Link from "next/link";
import { programs } from "@/data/programs";

const days = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export default function Programas() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* CABEÇALHO */}
      <section className="bg-blue-950 px-4 py-12 text-white md:py-16">
        <div className="mx-auto max-w-7xl">

          <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-blue-300">
            Rádio Relato
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Programas
          </h1>

          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-blue-100 md:text-lg">
            Conheça os programas da Rádio Relato, os seus horários e os
            conteúdos que fazem parte da nossa programação desportiva.
          </p>

        </div>
      </section>

      {/* PROGRAMAS */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {programs.map((program) => (

            <article
              key={program.name}
              className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* IMAGEM */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-200">

                <Image
                  src={program.image}
                  alt={program.name}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                />

              </div>

              {/* CONTEÚDO */}
              <div className="p-6">

                <div className="mb-3 flex items-center justify-between gap-3">

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-800">
                    {program.type}
                  </span>

                </div>

                <h2 className="text-2xl font-black text-gray-950">
                  {program.name}
                </h2>

                <p className="mt-3 text-sm font-medium leading-relaxed text-gray-600">
                  {program.description}
                </p>

                {/* HORÁRIOS */}
                <div className="mt-5 border-t border-gray-100 pt-4">

                  <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-gray-900">
                    Horários
                  </h3>

                  <div className="space-y-2">

                    {program.schedule.map((slot) => (

                      <div
                        key={`${slot.day}-${slot.start}`}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                      >

                        <span className="text-sm font-bold text-gray-700">
                          {days[slot.day]}
                        </span>

                        <span className="text-sm font-black text-blue-700">
                          {slot.start} — {slot.end}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

      {/* CHAMADA PARA OUVIR */}
      <section className="border-t border-gray-200 bg-white px-4 py-10">
        <div className="mx-auto max-w-7xl text-center">

          <h2 className="text-2xl font-black text-gray-950 md:text-3xl">
            Acompanhe a Rádio Relato
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-gray-600 md:text-base">
            Fique ligado na nossa programação e acompanhe o melhor do
            desporto com paixão e alma.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-blue-700 px-6 py-3 text-sm font-black text-white shadow-md transition hover:bg-blue-800"
          >
            Ouvir Rádio Relato
          </Link>

        </div>
      </section>

    </main>
  );
}

