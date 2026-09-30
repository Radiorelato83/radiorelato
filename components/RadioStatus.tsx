import { programs, defaultProgram } from "@/data/programs";

function getCurrentProgram() {
  const now = new Date();

  const currentTime =
    now.getHours() * 60 + now.getMinutes();


  const activeProgram = programs.find((program) => {

    const [startHour, startMinute] = program.start.split(":").map(Number);
    const [endHour, endMinute] = program.end.split(":").map(Number);


    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;


    return currentTime >= startTime && currentTime <= endTime;

  });


  return activeProgram || defaultProgram;
}



export default function RadioStatus() {

  const currentProgram = getCurrentProgram();


  return (
    <div className="flex items-center gap-3">

      <span className="relative flex h-3 w-3">

        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-70 animate-ping"></span>

        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>

      </span>


      <div className="flex flex-col leading-tight">

        <span className="text-[10px] uppercase font-medium tracking-[0.18em] text-red-100">
          No Ar Agora
        </span>


        <span className="text-sm font-semibold tracking-wide text-white">
          {currentProgram.name}
        </span>

      </div>

    </div>
  );
}