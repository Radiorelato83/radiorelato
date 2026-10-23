
import { programs, defaultProgram } from "@/data/programs";

export type DisplayProgram = {
  name: string;
  description?: string;
  image?: string;
  type?: string;
  start?: string;
  end?: string;
  day?: number;
};

type LuandaClock = {
  day: number;
  minutes: number;
};

const dayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const dayNames = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function getLuandaClock(date = new Date()): LuandaClock {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Luanda",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const weekday = parts.find(
    (part) => part.type === "weekday",
  )?.value;

  const hour = Number(
    parts.find((part) => part.type === "hour")?.value,
  );

  const minute = Number(
    parts.find((part) => part.type === "minute")?.value,
  );

  return {
    day: dayMap[weekday ?? ""] ?? 0,
    minutes: hour * 60 + minute,
  };
}

function toMinutes(value: string): number {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

export function getDayName(day?: number): string {
  if (typeof day !== "number") {
    return "";
  }

  return dayNames[day] ?? "";
}

export function getCurrentProgram(
  date = new Date(),
): DisplayProgram {
  const clock = getLuandaClock(date);

  for (const program of programs) {
    const slot = program.schedule.find((item) => {
      if (item.day !== clock.day) {
        return false;
      }

      const start = toMinutes(item.start);
      const end = toMinutes(item.end);

      if (end < start) {
        return (
          clock.minutes >= start ||
          clock.minutes < end
        );
      }

      return (
        clock.minutes >= start &&
        clock.minutes < end
      );
    });

    if (slot) {
      return {
        ...program,
        start: slot.start,
        end: slot.end,
        day: slot.day,
      };
    }
  }

  return defaultProgram;
}

export function getNextProgram(
  date = new Date(),
): DisplayProgram | null {
  const clock = getLuandaClock(date);

  let nextProgram: DisplayProgram | null = null;
  let shortestDistance = Infinity;

  for (const program of programs) {
    for (const slot of program.schedule) {
      let daysAhead =
        (slot.day - clock.day + 7) % 7;

      let distance =
        daysAhead * 1440 +
        toMinutes(slot.start) -
        clock.minutes;

      if (distance <= 0) {
        daysAhead += 7;
        distance += 7 * 1440;
      }

      if (distance < shortestDistance) {
        shortestDistance = distance;

        nextProgram = {
          ...program,
          start: slot.start,
          end: slot.end,
          day: slot.day,
        };
      }
    }
  }

  return nextProgram;
}
