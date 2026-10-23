"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";

const STREAM_URL = "https://stream.zeno.fm/3na5wqsajqeuv";

type RadioContextType = {
  isPlaying: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (value: number) => void;
};

const RadioContext = createContext<RadioContextType | null>(null);

export function RadioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);

  function createAudio() {
    if (audioRef.current) {
      return audioRef.current;
    }

    const audio = new Audio(STREAM_URL);

    audio.preload = "none";
    audio.volume = volume;

    audio.onplay = () => {
      console.log("Rádio Relato no ar");
      setIsPlaying(true);
    };

    audio.onpause = () => {
      setIsPlaying(false);
    };

    audio.onerror = (event) => {
      console.error("Erro no streaming:", event);
      setIsPlaying(false);
    };

    audioRef.current = audio;

    return audio;
  }

 async function toggle() {
  const audio = createAudio();

  if (!audio.paused) {
    audio.pause();
    return;
  }

  try {
    await audio.play();
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      console.warn(
        "Reprodução interrompida antes de iniciar."
      );
      return;
    }

    console.error(
      "Erro ao iniciar Rádio Relato:",
      error
    );

    setIsPlaying(false);
  }
}

  function setVolume(value: number) {
    const newVolume = Math.min(
      1,
      Math.max(0, value)
    );

    setVolumeState(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }

  return (
    <RadioContext.Provider
      value={{
        isPlaying,
        volume,
        toggle,
        setVolume,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
}

export function useRadio() {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error(
      "useRadio deve ser usado dentro de RadioProvider"
    );
  }

  return context;
}