import { env } from "./env";
import type { Article } from "@/types/article";
import type { WeatherResponse } from "@/types/weather";

// --- Shared fetch helper with timeout ---
const FETCH_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

// --- Public API functions ---
export async function fetchNews(): Promise<Article[]> {
  try {
    const response = await fetchWithTimeout(env.NEWS_API_URL);
    const json = await response.json();
    return json.posts as Article[];
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export async function fetchWeather(): Promise<WeatherResponse | null> {
  try {
    const response = await fetchWithTimeout(env.WEATHER_API_URL);
    const json = await response.json();
    return json as WeatherResponse;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
}
