import { z } from "zod";

const envSchema = z.object({
  NEWS_API_URL: z.url("NEWS_API_URL must be a valid URL"),
  WEATHER_API_URL: z.url("WEATHER_API_URL must be a valid URL"),
});

export const env = envSchema.parse(process.env);
