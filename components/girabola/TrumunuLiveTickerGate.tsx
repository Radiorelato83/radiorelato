
"use client";

import { useEffect, useState } from "react";
import { programs } from "@/data/programs";
import TrumunuLiveTicker from "@/components/girabola/TrumunuLiveTicker";

function normalizeName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function isTrumunuOnlineOnAir(): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Luanda",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const weekday = parts.find(
    (part) => part.type === "weekday",
  )?.value;

  const hour = Number(
    parts.find((part) => part.type === "hour")?.value,
  );

  const minute = Number(
    parts.find((part) => part.type === "minute")?.value,
  );

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const currentDay = dayMap[weekday ?? ""];
  const currentMinutes = hour * 60 + minute;

  const trumunu = programs.find((program) =>
    normalizeName(program.name).includes("trumunu online"),
  );

  if (!trumunu) {
    return false;
  }

  return trumunu.schedule.some((slot) => {
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

    // Também suporta transmissões que ultrapassem a meia-noite.
    if (end < start) {
      return currentMinutes >= start || currentMinutes < end;
    }

    return currentMinutes >= start && currentMinutes < end;
  });
}

export default function TrumunuLiveTickerGate() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    function updateProgramStatus() {
      setActive(isTrumunuOnlineOnAir());
    }

    updateProgramStatus();

    const interval = setInterval(
      updateProgramStatus,
      30_000,
    );

    return () => clearInterval(interval);
  }, []);

  return <TrumunuLiveTicker active={active} />;
}
