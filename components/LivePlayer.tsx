"use client";

import { useRadio } from "@/components/providers/RadioProvider";

export default function LivePlayerButton() {
  const { isPlaying, toggle } = useRadio();

  function handleClick() {
    console.log("BOTÃO RÁDIO CLICADO");
    toggle();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        isPlaying
          ? "Parar Rádio Relato"
          : "Ouvir Rádio Relato"
      }
      className={`flex items-center gap-3 rounded-full px-5 py-2 font-extrabold text-white shadow-md transition-all duration-300 ${
        isPlaying
          ? "bg-gradient-to-r from-blue-700 via-blue-500 to-red-600"
          : "bg-red-600 hover:bg-red-700"
      }`}
    >
      {isPlaying && (
        <span className="flex h-5 items-end gap-1">
          <span className="h-2 w-1 animate-pulse rounded-full bg-white" />
          <span className="h-5 w-1 animate-pulse rounded-full bg-white" />
          <span className="h-3 w-1 animate-pulse rounded-full bg-white" />
          <span className="h-4 w-1 animate-pulse rounded-full bg-white" />
        </span>
      )}

      <span>
        {isPlaying
          ? "A OUVIR RÁDIO RELATO"
          : "OUVIR RÁDIO RELATO"}
      </span>
    </button>
  );
}