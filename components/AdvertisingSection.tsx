export default function AdvertisingSection() {
  return (
    <section className="bg-gray-100 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6">

        {/* Identificação */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-10 bg-gray-300" />

          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold">
            Publicidade
          </p>

          <span className="h-px w-10 bg-gray-300" />
        </div>

        {/* Espaço publicitário */}
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white min-h-[140px] md:min-h-[180px] flex items-center justify-center">

          <div className="text-center px-6">

            <p className="text-lg md:text-xl font-semibold text-gray-700">
              Espaço publicitário
            </p>

            <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
              Divulgue a sua marca junto da audiência da Rádio Relato.
            </p>

            <button className="mt-5 inline-flex items-center rounded-full bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-900">
              Anuncie na Rádio Relato
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}