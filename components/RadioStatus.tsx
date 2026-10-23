
"use client";

import { useEffect, useState } from "react";
import { defaultProgram } from "@/data/programs";

import {
  getCurrentProgram,
  type DisplayProgram,
} from "@/data/program-schedule";

export default function RadioStatus() {
  const [currentProgram, setCurrentProgram] =
    useState<DisplayProgram>(defaultProgram);

  useEffect(() => {
    function updateProgram() {
      setCurrentProgram(getCurrentProgram());
    }

    updateProgram();

    const interval = window.setInterval(
      updateProgram,
      30_000,
    );

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
      </span>

      <div className="flex flex-col leading-tight">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-100">
          No Ar Agora
        </span>

        <span className="text-sm font-semibold tracking-wide text-white">
          {currentProgram.name}
        </span>
      </div>
    </div>
  );
}
