"use client";

import { useRadio } from "@/components/providers/RadioProvider";

export default function LivePlayerButton() {
  const { isPlaying, toggle } = useRadio();

  function handleClick() {
    console.log("BOTAO CLICADO");
    toggle();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-3 px-5 py-2 rounded-full font-extrabold text-white shadow-md transition-all duration-500 ${
        isPlaying
          ? "bg-gradient-to-r from-blue-700 via-blue-500 to-red-600"
          : "bg-red-600 hover:bg-red-700"
      }`}
    >
      {isPlaying && (
        <span className="flex items-end gap-1 h-5">
          <span className="w-1 h-2 bg-white rounded-full animate-pulse" />
          <span className="w-1 h-5 bg-white rounded-full animate-pulse" />
          <span className="w-1 h-3 bg-white rounded-full animate-pulse" />
        </span>
      )}

      <span>
        {isPlaying ? "A OUVIR RADIO RELATO" : "AGORA NO AR"}
      </span>
    </button>
  );
}
