import { programs, defaultProgram } from "@/data/programs";


function getCurrentProgram() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  const activeProgram = programs.find((program) => {
    const [startHour, startMinute] = program.start.split(":").map(Number);
    const [endHour, endMinute] = program.end.split(":").map(Number);

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    return currentTime >= start && currentTime <= end;
  });

  return activeProgram || defaultProgram;
}


function getNextProgram() {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  return (
    programs.find((program) => {
      const [hour, minute] = program.start.split(":").map(Number);

      return hour * 60 + minute > currentTime;
    }) || null
  );
}



export default function RadioScheduleBar() {

  const currentProgram = getCurrentProgram();
  const nextProgram = getNextProgram();


  return (
    <section className="
      bg-white
      border-y
      border-blue-100
      shadow-sm
    ">

      <div className="
        max-w-[1600px]
        mx-auto
        px-4
        lg:px-8
        py-4
      ">


        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          gap-4
        ">


          {/* Identificação */}
          <div className="
            flex
            items-center
            gap-3
            font-bold
            text-blue-950
          ">

            <span className="
              h-3
              w-3
              rounded-full
              bg-red-600
            "/>


            <span className="
              uppercase
              tracking-wider
              text-sm
            ">
              Programação
            </span>

          </div>



          {/* Programas */}
          <div className="text-sm">

            <span className="text-blue-500 font-semibold">
              Agora no ar:
            </span>


            <strong className="
              ml-2
              text-blue-950
            ">
              {currentProgram.name}
            </strong>


            {nextProgram && (

              <span className="
                ml-6
                text-blue-500
              ">

                Próximo:


                <strong className="
                  ml-2
                  text-blue-950
                ">
                  {nextProgram.name} • {nextProgram.start}
                </strong>

              </span>

            )}

          </div>


        </div>


      </div>

    </section>
  );
}