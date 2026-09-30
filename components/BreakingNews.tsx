"use client";

export default function BreakingNews() {
  const noticiaUrgente = {
    active: false,
    text: "Petro vence por 2-0 o Sagrada Esperança",
  };

  if (!noticiaUrgente.active) {
    return null;
  }

  return (
    <section className="bg-white border-y border-red-100 py-3">

      <div className="w-full px-4 md:px-6 lg:px-8 flex items-center gap-4">

        <div className="flex-shrink-0">

          <span className="bg-red-600 text-white px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap animate-pulse">
            ÚLTIMA HORA
          </span>

        </div>

        <div className="overflow-hidden flex-1 whitespace-nowrap">

          <div className="inline-block animate-[ticker_35s_linear_infinite]">

            <span className="text-blue-950 font-semibold">
              {noticiaUrgente.text}
            </span>

          </div>

        </div>

      </div>

    </section>
  );
}
