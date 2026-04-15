export function getWeatherGradient(condition: string, isDay: number): string {
  const lower = condition.toLowerCase();

  if (lower.includes("sunny") || lower.includes("clear")) {
    return isDay
      ? "from-amber-900/30 via-orange-950/20 to-transparent"
      : "from-indigo-950/40 via-slate-950/20 to-transparent";
  }
  if (lower.includes("cloud") || lower.includes("overcast")) {
    return "from-slate-800/30 via-zinc-900/20 to-transparent";
  }
  if (lower.includes("rain") || lower.includes("drizzle")) {
    return "from-blue-950/40 via-slate-950/25 to-transparent";
  }
  if (
    lower.includes("snow") ||
    lower.includes("sleet") ||
    lower.includes("ice")
  ) {
    return "from-sky-950/30 via-slate-900/20 to-transparent";
  }
  if (lower.includes("fog") || lower.includes("mist")) {
    return "from-neutral-800/40 via-stone-900/20 to-transparent";
  }
  if (lower.includes("thunder") || lower.includes("storm")) {
    return "from-violet-950/40 via-slate-950/30 to-transparent";
  }

  return "from-slate-900/30 via-zinc-950/20 to-transparent";
}

export function getWeatherEmoji(condition: string, isDay: number): string {
  const lower = condition.toLowerCase();

  if (lower.includes("sunny") || lower.includes("clear")) {
    return isDay ? "☀" : "🌙";
  }
  if (lower.includes("partly cloudy")) return isDay ? "⛅" : "☁";
  if (lower.includes("cloud") || lower.includes("overcast")) return "☁";
  if (lower.includes("thunder")) return "⛈";
  if (lower.includes("heavy rain")) return "🌧";
  if (lower.includes("rain") || lower.includes("drizzle")) return "🌦";
  if (lower.includes("snow")) return "❄";
  if (lower.includes("sleet") || lower.includes("ice")) return "🌨";
  if (lower.includes("fog") || lower.includes("mist")) return "🌫";

  return "🌤";
}

export function getWindDirection(degree: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°`;
}

export function getUVLevel(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: "Low", color: "text-green-400" };
  if (uv <= 5) return { label: "Moderate", color: "text-yellow-400" };
  if (uv <= 7) return { label: "High", color: "text-orange-400" };
  if (uv <= 10) return { label: "Very High", color: "text-red-400" };
  return { label: "Extreme", color: "text-purple-400" };
}
