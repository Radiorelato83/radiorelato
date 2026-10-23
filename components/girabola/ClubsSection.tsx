import Image from "next/image";
import Link from "next/link";

import { girabolaClubs } from "@/data/girabola-clubs";

export default function ClubsSection() {
  return (
    <section className="mt-12">
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-red-600">
          Equipas
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight text-blue-950 md:text-4xl">
          Clubes
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
          Conheça os clubes, a sua história, os estádios e os respetivos
          plantéis.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {girabolaClubs.map((club) => (
          <Link
            key={club.id}
            href={`/girabola/${club.slug}`}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
          >
            <div className="relative flex h-[170px] items-center justify-center bg-slate-50">
              <div className="absolute left-0 top-0 h-1 w-full bg-blue-950 transition-colors duration-300 group-hover:bg-red-600" />

              <div className="relative h-[105px] w-[105px]">
                <Image
                  src={club.logo}
                  alt={club.name}
                  fill
                  sizes="105px"
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 px-5 py-4">
              <h3 className="text-base font-black text-blue-950 transition-colors group-hover:text-red-600">
                {club.shortName}
              </h3>

              <p className="mt-1 text-sm text-gray-500">{club.city}</p>

              <span className="mt-4 inline-flex text-xs font-black uppercase tracking-wide text-blue-950">
                Ver clube →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}