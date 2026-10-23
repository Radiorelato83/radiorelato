"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { programs, defaultProgram } from "@/data/programs";
import { useRadio } from "@/components/providers/RadioProvider";

type CurrentProgram = {
  name: string;
  description?: string;
  image?: string;
  type?: string;
  start?: string;
  end?: string;
};

type SlidePosition = {
  left: number;
  width: number;
};

function getCurrentProgram(): CurrentProgram {
  const now = new Date();

  const luandaParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Luanda",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const weekday = luandaParts.find(
    (part) => part.type === "weekday"
  )?.value;

  const hour = Number(
    luandaParts.find(
      (part) => part.type === "hour"
    )?.value
  );

  const minute = Number(
    luandaParts.find(
      (part) => part.type === "minute"
    )?.value
  );

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const currentDay = dayMap[weekday ?? ""];

  const currentMinutes =
    hour * 60 + minute;

  for (const program of programs) {
    const schedule = program.schedule.find((slot) => {
      if (slot.day !== currentDay) {
        return false;
      }

      const [startHour, startMinute] = slot.start
        .split(":")
        .map(Number);

      const [endHour, endMinute] = slot.end
        .split(":")
        .map(Number);

      const start =
        startHour * 60 + startMinute;

      const end =
        endHour * 60 + endMinute;

      return (
        currentMinutes >= start &&
        currentMinutes < end
      );
    });

    if (schedule) {
      return {
        ...program,
        start: schedule.start,
        end: schedule.end,
      };
    }
  }

  return defaultProgram;
}

export default function RadioPanel() {
  const {
    isPlaying,
    toggle,
    volume,
    setVolume,
  } = useRadio();

  const playerRef =
    useRef<HTMLDivElement>(null);

  const [currentProgram, setCurrentProgram] =
    useState<CurrentProgram>(
      getCurrentProgram()
    );

  const [showProgramInfo, setShowProgramInfo] =
    useState(false);

  const [slidePosition, setSlidePosition] =
    useState<SlidePosition | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgram(getCurrentProgram());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowProgramInfo(
        (previous) => !previous
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    function updateSlidePosition() {
      const player =
        playerRef.current;

      const programas =
        document.getElementById(
          "menu-programas"
        );

      const contactos =
        document.getElementById(
          "menu-contactos"
        );

      if (
        !player ||
        !programas ||
        !contactos
      ) {
        return;
      }

      const playerRect =
        player.getBoundingClientRect();

      const programasRect =
        programas.getBoundingClientRect();

      const contactosRect =
        contactos.getBoundingClientRect();

      const left =
        programasRect.left -
        playerRect.left;

      const right =
        contactosRect.right -
        playerRect.left;

      const width =
        right - left;

      if (width > 0) {
        setSlidePosition({
          left,
          width,
        });
      }
    }

    updateSlidePosition();

    const frame =
      requestAnimationFrame(
        updateSlidePosition
      );

    window.addEventListener(
      "resize",
      updateSlidePosition
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "resize",
        updateSlidePosition
      );
    };
  }, []);

  function handleVolumeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setVolume(
      Number(event.target.value)
    );
  }

  return (
    <div className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div
        ref={playerRef}
        className="relative mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8"
      >
        <div className="flex min-h-[70px] w-full items-center">
          <div className="flex w-[205px] shrink-0 items-center">
            <button
              type="button"
              onClick={toggle}
              aria-label={
                isPlaying
                  ? "Parar Rádio Relato"
                  : "Ouvir Rádio Relato"
              }
              className={`flex h-8 w-[138px] items-center justify-center gap-1.5 rounded-md text-[11px] font-black leading-none text-white shadow-sm transition-all duration-300 ${
                isPlaying
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <span className="text-[11px] leading-none">
                ▶
              </span>

              <span>
                OUVIR RÁDIO
              </span>
            </button>
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex w-full min-w-0 items-center">
              <div className="relative mr-5 flex h-8 w-[190px] shrink-0 items-center overflow-hidden">
                <div
                  className={`absolute left-0 flex items-center gap-2 transition-all duration-700 ease-out ${
                    showProgramInfo
                      ? "-translate-x-5 scale-95 opacity-0"
                      : "translate-x-0 scale-100 opacity-100"
                  }`}
                >
                  {isPlaying && (
                    <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                      <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-red-500 opacity-40" />
                      <span className="relative h-2 w-2 rounded-full bg-red-600" />
                    </span>
                  )}

                  <span
                    className={`text-sm font-semibold leading-none ${
                      isPlaying
                        ? "text-red-600"
                        : "text-blue-700"
                    }`}
                  >
                    {isPlaying
                      ? "No Ar"
                      : "Programação"}
                  </span>
                </div>

                <div
                  className={`absolute left-0 flex items-center gap-2 transition-all duration-700 ease-out ${
                    showProgramInfo
                      ? "translate-x-0 scale-100 opacity-100"
                      : "translate-x-5 scale-95 opacity-0"
                  }`}
                >
                  <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                    <span className="absolute h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400 opacity-40" />
                    <span className="relative h-2 w-2 rounded-full bg-blue-600" />
                  </span>

                  <span className="truncate text-[15px] font-medium leading-none text-gray-900">
                    {currentProgram.name}
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="flex h-[44px] w-[150px] shrink-0 items-center gap-2 border-l border-gray-200 pl-4">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center text-gray-700"
              aria-hidden="true"
            >
              🔊
            </span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume da Rádio Relato"
              className="h-1.5 w-20 cursor-pointer accent-blue-700"
            />

            <span className="w-8 text-right text-[10px] font-black text-gray-600">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {slidePosition && (
          <div
            className="pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 overflow-hidden"
            style={{
              left: `${slidePosition.left}px`,
              width: `${slidePosition.width}px`,
            }}
          >
            <div className="marquee-container w-full overflow-hidden">
              <div
                key={currentProgram.description}
                className="marquee-text whitespace-nowrap text-sm font-bold text-blue-600 xl:text-base"
              >
                {currentProgram.description}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}