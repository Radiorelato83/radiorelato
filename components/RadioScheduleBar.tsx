
"use client";

import { useEffect, useState } from "react";
import { defaultProgram } from "@/data/programs";

import {
  getCurrentProgram,
  getDayName,
  getNextProgram,
  type DisplayProgram,
} from "@/data/program-schedule";

export default function RadioScheduleBar() {
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
    <section className="border-y border-blue-100 bg-white shadow-sm">
      <div className="mx-auto max-w-[1600px] px-4 py-4 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3 font-bold text-blue-950">
            <span className="h-3 w-3 rounded-full bg-red-600" />

            <span className="text-sm uppercase tracking-wider">
              Programação
            </span>
          </div>

          <div className="text-sm">
            <span className="font-semibold text-blue-500">
              Agora no ar:
            </span>

            <strong className="ml-2 text-blue-950">
              {currentProgram.name}
            </strong>

            {nextProgram && (
              <span className="mt-2 block text-blue-500 lg:ml-6 lg:mt-0 lg:inline">
                Próximo:

                <strong className="ml-2 text-blue-950">
                  {nextProgram.name} ·{" "}
                  {getDayName(nextProgram.day)} ·{" "}
                  {nextProgram.start}
                </strong>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
