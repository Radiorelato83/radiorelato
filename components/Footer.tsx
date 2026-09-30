
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Início", href: "/" },
  { name: "Notícias", href: "/noticias" },
  { name: "Programas", href: "/programas" },
  { name: "Girabola", href: "/girabola" },
  { name: "Modalidades", href: "/modalidades" },
  { name: "Podcasts", href: "/podcasts" },
  { name: "Contactos", href: "/contactos" },
];

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">

      {/* Área principal */}
      <div className="mx-auto w-full max-w-[1600px] px-4 py-12 md:px-6 md:py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo e identidade */}
          <div>
            <Link href="/" className="inline-block">
              <Image
            src="/logo-radio-relato.png"
                alt="Rádio Relato"
                width={220}
                height={90}
                className="h-auto w-[200px] object-contain"
              />
            </Link>

            <p className="mt-4 text-base font-semibold italic text-white/90">
              Desporto com paixão e alma!
            </p>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              Informação, análise e acompanhamento do desporto,
              com a paixão de quem vive o jogo.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-red-500">
              Navegação
            </h3>

            <nav className="mt-5">
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/65 transition hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Rádio Relato */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-red-500">
              Rádio Relato
            </h3>

            <div className="mt-5 space-y-3 text-sm leading-6 text-white/65">
              <p>
                A sua rádio de desporto.
              </p>

              <p>
                Informação desportiva, análise,
                programas e acompanhamento das
                principais competições.
              </p>

              <p className="font-semibold text-white/90">
                Desporto com paixão e alma!
              </p>
            </div>
          </div>

          {/* Contactos e redes sociais */}
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-red-500">
              Contactos
            </h3>

            <div className="mt-5 space-y-4 text-sm text-white/65">

              {/* Telefone */}
              <a
                href="tel:+244924390528"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5 shrink-0 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.09l-4.14-1.035a1.125 1.125 0 0 0-1.173.417l-.908 1.11a1.125 1.125 0 0 1-1.21.337 12.035 12.035 0 0 1-7.5-7.5 1.125 1.125 0 0 1 .337-1.21l1.11-.908c.36-.294.52-.766.417-1.173L6.806 2.94A1.125 1.125 0 0 0 5.716 2.09H4.5A2.25 2.25 0 0 0 2.25 4.34v2.41Z"
                  />
                </svg>

                <span>+244 924 390 528</span>
              </a>

              {/* Email */}
              <a
                href="mailto:radiorelato01@gmail.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5 shrink-0 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7.5 10.94 13a1.875 1.875 0 0 0 2.12 0L21 7.5M5.25 19.5h13.5A2.25 2.25 0 0 0 21 17.25v-10.5A2.25 2.25 0 0 0 18.75 4.5H5.25A2.25 2.25 0 0 0 3 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>

                <span className="break-all">
                  radiorelato01@gmail.com
                </span>
              </a>
            </div>

            {/* Redes sociais */}
            <div className="mt-7">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/50">
                Siga a Rádio Relato
              </p>

              <div className="flex items-center gap-3">

                {/* Facebook */}
                <a
                  href="https://facebook.com/radiorelato.1893"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook da Rádio Relato"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-red-500 hover:bg-red-600 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M14 8h3V4h-3c-3.314 0-5 1.686-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.552.448-1 1-1Z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/radio_relato/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Rádio Relato"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-red-500 hover:bg-red-600 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="5"
                    />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@radio-relato.1893"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube da Rádio Relato"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-red-500 hover:bg-red-600 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M23.5 6.2a3 3 0 0 0-2.11-2.12C19.52 3.5 12 3.5 12 3.5s-7.52 0-9.39.58A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.12c1.87.58 9.39.58 9.39.58s7.52 0 9.39-.58a3 3 0 0 0 2.11-2.12A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.75 15.75v-7.5L16.25 12l-6.5 3.75Z" />
                  </svg>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 px-4 py-5 text-center md:flex-row md:items-center md:justify-between md:px-6 md:text-left lg:px-8">

          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Rádio Relato. Todos os direitos reservados.
          </p>

          <p className="text-xs text-white/45">
            Design:{" "}
            <span className="font-semibold text-white/75">
              JS Prime Design
            </span>
          </p>

        </div>
      </div>

      {/* Linha final */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-700" />

    </footer>
  );
}

