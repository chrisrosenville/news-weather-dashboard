import { z } from "zod";
import { env } from "./env";
import type { Article } from "@/types/article";
import type { WeatherResponse } from "@/types/weather";

// --- Zod schemas for API responses ---
const articleSchema = z
  .object({
    author: z.string(),
    categories: z.array(z.string()).nullable(),
    crawled: z.string(),
    published: z.string(),
    sentiment: z.string().nullable(),
    text: z.string(),
    title: z.string(),
    updated: z.string(),
    url: z.string(),
    uuid: z.string(),
    thread: z
      .object({
        uuid: z.string(),
        url: z.string(),
        site_full: z.string(),
        site_section: z.string(),
        site_type: z.string(),
        country: z.string(),
      })
      .loose()
      .optional(),
  })
  .loose();

const newsResponseSchema = z.object({
  posts: z.array(articleSchema),
  totalResults: z.number(),
  moreResultsAvailable: z.number(),
  next: z.string().nullable(),
  requestsLeft: z.number(),
  warnings: z.array(z.string()).nullable(),
});

const weatherCurrentSchema = z
  .object({
    last_updated: z.string(),
    temp_c: z.number(),
    is_day: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
      code: z.number(),
    }),
    wind_kph: z.number(),
    wind_dir: z.string(),
    pressure_mb: z.number(),
    humidity: z.number(),
    feelslike_c: z.number(),
    dewpoint_c: z.number(),
    vis_km: z.number(),
    uv: z.number(),
  })
  .loose();

const weatherResponseSchema = z
  .object({
    location: z
      .object({
        name: z.string(),
        region: z.string(),
        country: z.string(),
      })
      .loose(),
    current: weatherCurrentSchema,
  })
  .loose();

// --- Shared fetch helper with timeout ---
const FETCH_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
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
    const parsed = newsResponseSchema.parse(json);
    return parsed.posts as unknown as Article[];
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export async function fetchWeather(): Promise<WeatherResponse | null> {
  try {
    const response = await fetchWithTimeout(env.WEATHER_API_URL);
    const json = await response.json();
    return weatherResponseSchema.parse(json) as unknown as WeatherResponse;
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    return null;
  }
}
