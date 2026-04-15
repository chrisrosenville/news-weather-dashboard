import { WeatherResponse } from "@/types/weather";
import {
  formatTemperature,
  getWeatherEmoji,
  getUVLevel,
} from "@/lib/weather-utils";
import { Wind, Droplets, Eye, Gauge, Thermometer, Sun } from "lucide-react";
import { MonoLabel } from "./mono-label";

interface WeatherHeroProps {
  weather: WeatherResponse;
}

function WeatherStat({
  icon: Icon,
  label,
  value,
  unit,
  unitClassName,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  unit?: string;
  unitClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <MonoLabel>{label}</MonoLabel>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-xl font-semibold text-foreground">
          {value}
        </span>
        {unit && (
          <span
            className={`font-mono text-[10px] ${unitClassName ?? "text-muted-foreground"}`}
          >
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export function WeatherHero({ weather }: WeatherHeroProps) {
  const { current } = weather;
  const emoji = getWeatherEmoji(current.condition.text, current.is_day);
  const uvInfo = getUVLevel(current.uv);

  return (
    <section className="rounded-xl border border-border bg-card">
      <div className="p-6 md:p-8">
        {/* Top row: condition label */}
        <div className="mb-5 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-amber" />
          <MonoLabel className="text-amber">Current Conditions</MonoLabel>
        </div>

        {/* Main temperature display */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex items-start gap-4">
            <span
              className="text-5xl"
              role="img"
              aria-label={current.condition.text}
            >
              {emoji}
            </span>

            <div className="flex flex-col">
              <span className="font-display text-6xl font-bold leading-none tracking-tight text-foreground">
                {formatTemperature(current.temp_c)}
              </span>
              <p className="mt-1 text-base font-medium text-foreground/80">
                {current.condition.text}
              </p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                Feels like{" "}
                <span className="text-foreground/70">
                  {formatTemperature(current.feelslike_c)}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start gap-0.5 md:items-end">
            <MonoLabel className="text-muted-foreground/50">
              Last updated
            </MonoLabel>
            <span className="font-mono text-xs text-muted-foreground">
              {new Date(current.last_updated).toLocaleTimeString("en-DK", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="editorial-rule my-5" />

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <WeatherStat
            icon={Wind}
            label="Wind"
            value={Math.round(current.wind_kph)}
            unit={`km/h ${current.wind_dir}`}
          />
          <WeatherStat
            icon={Droplets}
            label="Humidity"
            value={current.humidity}
            unit="%"
          />
          <WeatherStat
            icon={Eye}
            label="Visibility"
            value={current.vis_km}
            unit="km"
          />
          <WeatherStat
            icon={Gauge}
            label="Pressure"
            value={current.pressure_mb}
            unit="mb"
          />
          <WeatherStat
            icon={Thermometer}
            label="Dew Point"
            value={formatTemperature(current.dewpoint_c)}
          />
          <WeatherStat
            icon={Sun}
            label="UV Index"
            value={current.uv}
            unit={uvInfo.label}
            unitClassName={uvInfo.color}
          />
        </div>
      </div>
    </section>
  );
}
