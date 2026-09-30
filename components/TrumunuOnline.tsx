export default function TrumunuOnline() {
  const transmissaoAtiva = false;

  return (
    <section className="bg-blue-950 text-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold">
            🎙️ Trumunu Online
          </h2>

          <p className="mt-3 text-blue-200 text-lg">
            Os grandes jogos, a nossa voz.
          </p>

        </div>


        <div className="bg-white text-gray-900 rounded-2xl shadow-xl p-8">

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">


            <div>

              <span
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase ${
                  transmissaoAtiva
                    ? "bg-red-600 text-white"
                    : "bg-blue-100 text-blue-900"
                }`}
              >

                {transmissaoAtiva ? (
                  <>
                    <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                    No Ar
                  </>
                ) : (
                  <>
                    🕒 Próxima Transmissão
                  </>
                )}

              </span>


              <h3 className="text-3xl font-bold mt-5">
                Petro de Luanda
              </h3>


              <p className="text-xl my-2">
                🆚
              </p>


              <h3 className="text-3xl font-bold">
                1.º de Agosto
              </h3>


              <p className="mt-4 text-gray-600">
                Domingo • 16h00
              </p>


              <p className="mt-2 text-sm font-semibold text-blue-900">
                🎙️ Relato exclusivo Rádio Relato
              </p>


            </div>



            <button
              className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-8
              py-4
              rounded-full
              font-bold
              text-lg
              transition
              "
            >
              🎧 Acompanhar o Relato
            </button>


          </div>


        </div>


      </div>


    </section>
  );
}