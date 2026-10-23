
"use client";

import { useEffect, useState } from "react";
import { defaultProgram } from "@/data/programs";

import {
  getCurrentProgram,
  getDayName,
  getNextProgram,
  type DisplayProgram,
} from "@/data/program-schedule";

export default function HeroLiveCard() {
  const [currentProgram, setCurrentProgram] =
    useState<DisplayProgram>(defaultProgram);

  const [nextProgram, setNextProgram] =
    useState<DisplayProgram | null>(null);

  useEffect(() => {
    function updatePrograms() {
      setCurrentProgram(getCurrentProgram());
      setNextProgram(getNextProgram());
    }

    updatePrograms();

    const interval = window.setInterval(
      updatePrograms,
      30_000,
    );

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-[300px] flex-col justify-between rounded-3xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-md">
      <div>
        <div className="mb-5 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600" />
          </span>

          <span className="text-sm font-bold uppercase text-red-300">
            No Ar Agora
          </span>
        </div>

        <h2 className="text-2xl font-extrabold">
          {currentProgram.name}
        </h2>

        <p className="mt-3 text-sm text-blue-100">
          {currentProgram.description}
        </p>
      </div>

      {nextProgram && (
        <div className="mt-8 border-t border-white/20 pt-5">
          <span className="text-xs uppercase text-blue-200">
            A seguir
          </span>

          <h3 className="mt-2 text-lg font-bold">
            {nextProgram.name}
          </h3>

          <p className="mt-2 text-sm text-blue-100">
            {getDayName(nextProgram.day)} · {nextProgram.start}
          </p>
        </div>
      )}
    </div>
  );
}
