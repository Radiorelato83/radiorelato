import Link from "next/link";

export default function UltimaHora() {
  return (
    <section className="w-full bg-slate-950 border-y border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-8">
        <Link
          href="/noticias"
          className="flex shrink-0 items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white transition hover:bg-red-500"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          Última Hora
        </Link>

        <div className="min-w-0 overflow-hidden">
          <p className="truncate text-sm font-medium text-white">
            Petro vence por 2-0 o Sagrada Esperança
            <span className="mx-3 text-slate-500">•</span>
            Girabola arranca sábado
            <span className="mx-3 text-slate-500">•</span>
            CAN 2027 já tem calendário
          </p>
        </div>
      </div>
    </section>
  );
}