
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";

const STREAM_URL = "https://stream.zeno.fm/3na5wqsajqeuv";

export type LiveTransmission = {
  id: string;
  title: string;
  home_team: string;
  away_team: string;
  competition: string | null;
  match_date: string | null;
};

type RadioContextType = {
  isPlaying: boolean;
  volume: number;
  liveTransmission: LiveTransmission | null;
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
  const [liveTransmission, setLiveTransmission] =
    useState<LiveTransmission | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function syncTransmission() {
      const { data, error } = await supabase
        .from("transmission_banners")
        .select(
          "id, title, home_team, away_team, competition, match_date"
        )
        .eq("is_active", true)
        .eq("is_live", true)
        .order("display_order", { ascending: true })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(
          "Erro ao consultar emissão especial:",
          error.message
        );
        return;
      }

      setLiveTransmission(data ?? null);
    }

    void syncTransmission();

    const channel = supabase
      .channel("radio-transmission-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transmission_banners",
        },
        () => {
          void syncTransmission();
        }
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

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
      console.error("Erro ao iniciar Rádio Relato:", error);
      setIsPlaying(false);
    }
  }

  function setVolume(value: number) {
    const newVolume = Math.min(1, Math.max(0, value));

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
        liveTransmission,
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
