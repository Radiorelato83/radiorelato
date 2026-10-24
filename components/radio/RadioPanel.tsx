
"use client";

import { useCallback, useEffect, useState } from "react";
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
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Luanda",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  const minute = Number(parts.find((part) => part.type === "minute")?.value);

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const currentMinutes = hour * 60 + minute;
  const currentDay = dayMap[weekday ?? ""];

  for (const program of programs) {
    const slot = program.schedule.find((item) => {
      if (item.day !== currentDay) return false;

      const [sh, sm] = item.start.split(":").map(Number);
      const [eh, em] = item.end.split(":").map(Number);

      return (
        currentMinutes >= sh * 60 + sm &&
        currentMinutes < eh * 60 + em
      );
    });

    if (slot) {
      return { ...program, start: slot.start, end: slot.end };
    }
  }

  return defaultProgram;
}

export default function RadioPanel() {
  const { isPlaying, toggle, volume, setVolume } = useRadio();

  const [currentProgram, setCurrentProgram] =
    useState<CurrentProgram>(() => getCurrentProgram());

  const [showProgramInfo, setShowProgramInfo] = useState(false);
  const [slidePosition, setSlidePosition] =
    useState<SlidePosition | null>(null);

  const updateSlidePosition = useCallback(() => {
    if (window.innerWidth < 768) {
      setSlidePosition(null);
      return;
    }

    const quemSomosLink = document.getElementById("menu-quem-somos");
    const programsLink = document.getElementById("menu-programas");
    const panelContent = document.getElementById("radio-panel-content");

    if (!quemSomosLink || !programsLink || !panelContent) {
      setSlidePosition(null);
      return;
    }

    const quemRect = quemSomosLink.getBoundingClientRect();
const programsRect = programsLink.getBoundingClientRect();
const contentRect = panelContent.getBoundingClientRect();

// Limita o slide ao espaço entre "Quem Somos" e "Programas".
const leftEdge = Math.min(quemRect.right, programsRect.right);
const rightEdge = Math.max(quemRect.left, programsRect.left);

const left = leftEdge - contentRect.left;
const width = rightEdge - leftEdge;

    if (width <= 0) {
      setSlidePosition(null);
      return;
    }

    setSlidePosition({ left, width });
  }, []);

  useEffect(() => {
    const programTimer = window.setInterval(() => {
      setCurrentProgram(getCurrentProgram());
    }, 30000);

    const infoTimer = window.setInterval(() => {
      setShowProgramInfo((previous) => !previous);
    }, 3000);

    return () => {
      window.clearInterval(programTimer);
      window.clearInterval(infoTimer);
    };
  }, []);

  useEffect(() => {
    updateSlidePosition();

    const observer = new ResizeObserver(updateSlidePosition);
    observer.observe(document.body);

    window.addEventListener("resize", updateSlidePosition);
    window.addEventListener("scroll", updateSlidePosition, true);

    const frame = window.requestAnimationFrame(updateSlidePosition);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSlidePosition);
      window.removeEventListener("scroll", updateSlidePosition, true);
      window.cancelAnimationFrame(frame);
    };
  }, [updateSlidePosition]);

  function handleVolumeChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setVolume(Number(event.target.value));
  }

  return (
    <div
      id="radio-panel"
      className="relative z-50 w-full border-b border-gray-200 bg-white shadow-sm"
    >
      <div className="mx-auto w-full max-w-[1600px] px-3 md:px-6 lg:px-8">
        <div
          id="radio-panel-content"
          className="relative flex min-h-[70px] w-full flex-wrap items-center gap-x-4 gap-y-2 py-2 md:flex-nowrap md:py-0"
        >
          <div className="flex shrink-0 items-center">
            <button
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? "Parar Rádio Relato" : "Ouvir Rádio Relato"}
              className={`flex h-9 w-[138px] shrink-0 items-center justify-center gap-1.5 rounded-md text-[11px] font-black leading-none text-white shadow-sm transition-colors ${
                isPlaying
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              <span aria-hidden="true">▶</span>
              <span>{isPlaying ? "A OUVIR" : "OUVIR RÁDIO"}</span>
            </button>
          </div>

          <div className="relative flex h-9 min-w-0 flex-1 items-center overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 flex min-w-0 items-center gap-2 transition-all duration-500 ${
                showProgramInfo
                  ? "-translate-x-3 opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              {isPlaying && (
                <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                  <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-red-500 opacity-40" />
                  <span className="relative h-2 w-2 rounded-full bg-red-600" />
                </span>
              )}

              <span
                className={`truncate text-sm font-semibold ${
                  isPlaying ? "text-red-600" : "text-blue-700"
                }`}
              >
                {isPlaying ? "No Ar" : "Programação"}
              </span>
            </div>

            <div
              className={`absolute inset-y-0 left-0 flex min-w-0 max-w-full items-center gap-2 transition-all duration-500 ${
                showProgramInfo
                  ? "translate-x-0 opacity-100"
                  : "translate-x-3 opacity-0"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
                <span className="absolute h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400 opacity-40" />
                <span className="relative h-2 w-2 rounded-full bg-blue-600" />
              </span>

              <span className="truncate text-sm font-medium text-gray-900">
                {currentProgram.name}
              </span>
            </div>
          </div>

          <div className="flex h-9 w-full shrink-0 items-center gap-3 border-t border-gray-100 pt-2 md:h-[44px] md:w-[150px] md:border-l md:border-t-0 md:pl-4 md:pt-0">
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
              className="h-1.5 min-w-0 flex-1 cursor-pointer accent-blue-700 md:w-20 md:flex-none"
            />

            <span className="w-9 shrink-0 text-right text-[10px] font-black text-gray-600">
              {Math.round(volume * 100)}%
            </span>
          </div>

          {slidePosition && (
            <div
              className="pointer-events-none absolute top-1/2 z-10 hidden -translate-y-1/2 overflow-hidden md:block"
              style={{
                left: `${slidePosition.left}px`,
                width: `${slidePosition.width}px`,
              }}
              aria-label="Informação do programa"
            >
              <div className="marquee-container w-full overflow-hidden">
                <div
                  key={currentProgram.description || currentProgram.name}
                  className="marquee-text whitespace-nowrap text-xs font-bold text-blue-600 md:text-sm"
                >
                  {currentProgram.description || currentProgram.name}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 py-2 md:hidden">
          <div className="marquee-container w-full overflow-hidden">
            <div
              key={currentProgram.description || currentProgram.name}
              className="marquee-text whitespace-nowrap text-xs font-bold text-blue-600"
            >
              {currentProgram.description || currentProgram.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
