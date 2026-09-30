import { programs, defaultProgram } from "@/data/programs";

export default function HeroLiveCard() {

  const currentProgram = programs[0] || defaultProgram;
  const nextProgram = programs[1];


  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-white flex flex-col justify-between min-h-[300px]">

      {/* Estado da rádio */}
      <div>

        <div className="flex items-center gap-2 mb-5">

          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>

          <span className="text-sm font-bold text-red-300 uppercase">
            No Ar Agora
          </span>

        </div>


        <h2 className="text-2xl font-extrabold">
          {currentProgram.name}
        </h2>


        <p className="mt-3 text-blue-100 text-sm">
          {currentProgram.description}
        </p>

      </div>


      {/* Próximo programa */}
      {nextProgram && (
        <div className="mt-8 border-t border-white/20 pt-5">

          <span className="text-xs text-blue-200 uppercase">
            A seguir
          </span>


          <h3 className="mt-2 text-lg font-bold">
            {nextProgram.name}
          </h3>


          <p className="text-sm text-blue-200 mt-1">
            {nextProgram.start}
          </p>

        </div>
      )}

    </div>
  );
}