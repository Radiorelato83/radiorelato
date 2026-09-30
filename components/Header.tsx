import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-blue-950 text-white shadow-md">

      {/* IDENTIDADE DA RÁDIO */}
      <div className="flex flex-col items-center justify-center px-4 py-4 md:py-5">

        <Link
          href="/"
          className="group flex flex-col items-center"
          aria-label="Rádio Relato - Página inicial"
        >
          <Image
            src="/logo-radio-relato.png"
            alt="Rádio Relato"
            width={250}
            height={200}
            priority
            className="h-auto w-[190px] transition-transform duration-300 group-hover:scale-[1.02] md:w-[220px]"
          />

          <span className="mt-1 text-center text-[11px] font-semibold italic tracking-[0.18em] text-blue-200 md:text-xs">
            Desporto com paixão e alma!
          </span>
        </Link>

      </div>

      {/* MENU PRINCIPAL */}
      <div className="border-t border-white/10 bg-blue-950/95">

        <nav
          className="mx-auto max-w-[1600px] px-4 lg:px-8"
          aria-label="Navegação principal"
        >

          <div
            className="
              flex
              items-center
              justify-center
              gap-5
              overflow-x-auto
              whitespace-nowrap
              py-3
              text-sm
              font-bold
              md:gap-7
              md:text-base
            "
          >

            <Link
              href="/"
              className="shrink-0 transition-colors duration-200 hover:text-blue-300"
            >
              Início
            </Link>

            <Link
              href="/noticias"
              className="shrink-0 transition-colors duration-200 hover:text-blue-300"
            >
              Notícias
            </Link>

            <Link
              href="/programas"
              className="shrink-0 transition-colors duration-200 hover:text-blue-300"
            >
              Programas
            </Link>

            <Link
              href="/girabola"
              className="shrink-0 transition-colors duration-200 hover:text-blue-300"
            >
              Liga Unitel Girabola
            </Link>

            <Link
              href="/modalidades"
              className="shrink-0 transition-colors duration-200 hover:text-blue-300"
            >
              Modalidades
            </Link>

            <Link
              href="/internacional"
              className="shrink-0 transition-colors duration-200 hover:text-blue-300"
            >
              Internacional
            </Link>

            <Link
              href="/podcasts"
              className="shrink-0 transition-colors duration-200 hover:text-blue-300"
            >
              Podcasts
            </Link>

            <Link
              href="/contactos"
              className="shrink-0 transition-colors duration-200 hover:text-blue-300"
            >
              Contactos
            </Link>

          </div>

        </nav>

      </div>

    </header>
  );
}
