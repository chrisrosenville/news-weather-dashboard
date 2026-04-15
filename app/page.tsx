import { fetchNews, fetchWeather } from "@/lib/api";
import { DashboardHeader } from "@/components/dashboard/header";
import { WeatherHero } from "@/components/dashboard/weather-hero";
import { NewsSection } from "@/components/dashboard/news-section";
import { MonoLabel } from "@/components/dashboard/mono-label";
import { CloudOff } from "lucide-react";

export default async function Home() {
  const [news, weather] = await Promise.all([fetchNews(), fetchWeather()]);

  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1 flex-col gap-8 px-6 py-8 md:px-10">
        {/* Weather section */}
        {weather ? (
          <WeatherHero weather={weather} />
        ) : (
          <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card p-12">
            <CloudOff className="h-5 w-5 text-muted-foreground" />
            <p className="font-mono text-sm text-muted-foreground">
              Weather data unavailable
            </p>
          </div>
        )}

        {/* News section */}
        <NewsSection articles={news} />
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-border px-6 py-4 md:px-10">
        <div className="flex items-center justify-between">
          <MonoLabel className="text-muted-foreground">
            Aarhus Dashboard
          </MonoLabel>
          <MonoLabel className="text-muted-foreground">
            Internal Use Only
          </MonoLabel>
        </div>
      </footer>
    </main>
  );
}
