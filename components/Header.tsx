

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "Início", href: "/" },
  { label: "Notícias", href: "/noticias" },
  { label: "Programas", href: "/programas", id: "menu-programas" },
  { label: "Liga Unitel Girabola", href: "/girabola" },
  { label: "Modalidades", href: "/modalidades" },
  { label: "Internacional", href: "/internacional" },
  { label: "Podcasts", href: "/podcasts" },
  { label: "Quem Somos", href: "/quem-somos", id: "menu-quem-somos" },
  { label: "Contactos", href: "/contactos", id: "menu-contactos" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-[60] w-full bg-blue-950 text-white shadow-md">
      {/* IDENTIDADE DA RÁDIO */}
      <div className="flex flex-col items-center justify-center px-4 py-4 md:py-5">
        <Link
          href="/"
          className="group flex flex-col items-center"
          aria-label="Rádio Relato - Página inicial"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/logo-radio-relato.png"
            alt="Rádio Relato"
            width={250}
            height={200}
            priority
            className="h-auto w-[190px] transition-transform duration-300 group-hover:scale-[1.02] md:w-[220px]"
          />

          <span className="mt-1 text-center text-[13px] font-semibold italic tracking-[0.18em] text-blue-200 md:text-xs">
            Paixão pelo desporto!
          </span>
        </Link>
      </div>

      {/* MENU PRINCIPAL */}
      <div className="border-t border-white/10 bg-blue-950/95">
        <nav
          className="mx-auto max-w-[1600px] px-4 lg:px-8"
          aria-label="Navegação principal"
        >
          {/* COMPUTADOR */}
          <div className="hidden items-center justify-center gap-5 whitespace-nowrap py-3 text-sm font-bold md:flex md:gap-6 md:text-base lg:gap-7">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                id={item.id}
                className="shrink-0 transition-colors duration-200 hover:text-blue-300"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* TELEMÓVEL */}
          <div className="md:hidden">
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex min-h-12 w-full items-center justify-between py-3 text-sm font-bold"
            >
              <span>{mobileMenuOpen ? "Fechar menu" : "Menu de navegação"}</span>

              <span className="flex h-8 w-8 items-center justify-center rounded border border-white/30 text-xl">
                {mobileMenuOpen ? "×" : "☰"}
              </span>
            </button>

            {mobileMenuOpen && (
              <div
                id="mobile-navigation"
                className="border-t border-white/15 pb-2"
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    id={item.id}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-h-11 w-full items-center border-b border-white/10 px-3 py-3 text-sm font-semibold transition-colors hover:bg-white/10 hover:text-blue-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
