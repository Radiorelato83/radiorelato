"use client";

import { useEffect, useState } from "react";
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

function getCurrentProgram(): CurrentProgram {
  const now = new Date();

  const currentDay = now.getDay();

  const currentMinutes =
    now.getHours() * 60 + now.getMinutes();

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

      const start = startHour * 60 + startMinute;
      const end = endHour * 60 + endMinute;

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

  const [currentProgram, setCurrentProgram] =
    useState<CurrentProgram>(getCurrentProgram());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgram(getCurrentProgram());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  function handleVolumeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setVolume(Number(event.target.value));
  }

  return (
    <div className="w-full border-b border-gray-200 bg-white shadow-sm">

      {/* =====================================================
          MESMO PERÍMETRO HORIZONTAL DA CAPA
      ===================================================== */}
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 lg:px-8">

        <div className="relative flex min-h-[76px] w-full items-center md:min-h-[82px]">

          {/* =====================================================
              BOTÃO PLAY
          ===================================================== */}
          <button
            type="button"
            onClick={toggle}
            aria-label={
              isPlaying
                ? "Parar Rádio Relato"
                : "Emissão em Directo"
            }
            className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-black leading-none text-white shadow-md transition ${
              isPlaying
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            <span className="text-base leading-none">
              ▶
            </span>

            <span>
              {isPlaying
                ? "EMISSÃO EM DIRECTO"
                : "OUVIR RÁDIO RELATO"}
            </span>
          </button>

          {/* =====================================================
              PROGRAMA ATUAL
          ===================================================== */}
          <div className="ml-4 min-w-[170px]">

            <div className="mb-0.5 flex items-center gap-2">

              {isPlaying && (
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
              )}

              <span
                className={`text-xs font-black uppercase tracking-[0.14em] ${
                  isPlaying
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {isPlaying
                  ? "NO AR"
                  : "PROGRAMAÇÃO"}
              </span>

            </div>

            <div className="truncate text-lg font-black leading-tight text-gray-950 md:text-xl">
              {currentProgram.name}
            </div>

            {currentProgram.start &&
              currentProgram.end && (
                <div className="mt-0.5 text-xs font-semibold text-gray-500 md:text-sm">
                  {currentProgram.start} —{" "}
                  {currentProgram.end}
                </div>
              )}

          </div>

          {/* =====================================================
              DESCRIÇÃO EM MOVIMENTO

              ESTE AJUSTE JÁ ESTAVA PERFEITO.
              NÃO ALTERAR.
          ===================================================== */}
          <div
            className="
              absolute
              left-[27.5%]
              hidden
              w-[45%]
              overflow-hidden
              lg:block
            "
          >
            <div className="marquee-container">

              <div
                key={currentProgram.description}
                className="marquee-text text-sm font-bold text-blue-600 xl:text-base"
              >
                {currentProgram.description}
              </div>

            </div>
          </div>

          {/* =====================================================
              VOLUME

              Fica preso ao lado direito do mesmo perímetro
              da capa.
          ===================================================== */}
          <div className="ml-auto flex h-full shrink-0 items-center gap-2 border-l border-gray-200 pl-3 sm:gap-3 sm:pl-4">

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
              className="h-1.5 w-16 cursor-pointer accent-blue-700 sm:w-24 md:w-28"
            />

            <span className="w-8 text-right text-[11px] font-black text-gray-600 sm:w-9">
              {Math.round(volume * 100)}%
            </span>

          </div>

        </div>
      </div>
    </div>
  );
}