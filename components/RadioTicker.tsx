import { programs, defaultProgram } from "@/data/programs";


function getCurrentProgram() {

  const now = new Date();

  const currentTime =
    now.getHours() * 60 + now.getMinutes();


  const activeProgram = programs.find((program) => {

    const [startHour, startMinute] =
      program.start.split(":").map(Number);

    const [endHour, endMinute] =
      program.end.split(":").map(Number);


    const start =
      startHour * 60 + startMinute;

    const end =
      endHour * 60 + endMinute;


    return currentTime >= start && currentTime <= end;

  });


  return activeProgram || defaultProgram;
}


export default function RadioTicker() {

  const currentProgram = getCurrentProgram();


  return (

    <div className="bg-red-600 text-white overflow-hidden">


      <div className="max-w-[1600px] mx-auto px-4 py-3">


        <div className="flex items-center gap-8 whitespace-nowrap">


          <span className="font-bold flex items-center gap-2">

            🔴 Rádio Relato

          </span>


          <div className="animate-marquee">

            NO AR AGORA:
            <strong className="ml-2">
              {currentProgram.name}
            </strong>

            <span className="mx-4">
              •
            </span>


            Desporto com paixão e alma

          </div>


        </div>


      </div>


    </div>

  );
}