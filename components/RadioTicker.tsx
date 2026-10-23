
"use client";

import { useEffect, useState } from "react";
import { defaultProgram } from "@/data/programs";

import {
  getCurrentProgram,
  type DisplayProgram,
} from "@/data/program-schedule";

export default function RadioTicker() {
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
    <div className="overflow-hidden bg-red-600 text-white">
      <div className="mx-auto max-w-[1600px] px-4 py-3">
        <div className="flex items-center gap-8 whitespace-nowrap">
          <span className="flex items-center gap-2 font-bold">
            <span aria-hidden="true">●</span>
            Rádio Relato
          </span>

          <div className="animate-marquee">
            <span>NO AR AGORA:</span>

            <strong className="ml-2">
              {currentProgram.name}
            </strong>

            <span className="mx-4">•</span>

            <span>Desporto com paixão e alma!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
