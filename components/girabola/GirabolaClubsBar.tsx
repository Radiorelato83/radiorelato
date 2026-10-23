
import Image from "next/image";
import Link from "next/link";

import { girabolaClubs } from "@/data/girabola-clubs";

export default function GirabolaClubsBar() {
  const clubs = [...girabolaClubs].sort((a, b) =>
    a.name.localeCompare(b.name, "pt", {
      sensitivity: "base",
    })
  );

  return (
    <section
      id="clubes"
      className="border-y border-slate-200 bg-white"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-5 md:px-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
              Liga Unitel Girabola
            </p>

            <h2 className="mt-1 text-xl font-black text-blue-950 md:text-2xl">
              Clubes
            </h2>
          </div>

          <a
            href="#clubes"
            className="text-xs font-black uppercase tracking-wide text-blue-950 transition hover:text-red-600"
          >
            Ver clubes →
          </a>
        </div>

        <div className="overflow-x-auto pb-3">
          <div className="flex min-w-max gap-3">
            {clubs.map((club) => (
              <Link
                key={club.id}
                href={`/girabola/${club.slug}`}
                className="group flex w-[112px] shrink-0 flex-col items-center rounded-xl border border-slate-200 bg-white px-3 py-3 transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
              >
                <div className="relative h-16 w-16">
                  <Image
                    src={club.logo}
                    alt={club.name}
                    fill
                    sizes="64px"
                    className="object-contain transition-transform duration-200 group-hover:scale-110"
                  />
                </div>

                <span className="mt-2 min-h-8 text-center text-[11px] font-black leading-4 text-blue-950 transition-colors group-hover:text-red-600">
                  {club.shortName}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-3 text-center text-[10px] font-bold text-slate-400">
          Deslize horizontalmente para ver todos os clubes →
        </p>
      </div>
    </section>
  );
}
