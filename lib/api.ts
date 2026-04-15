import { NewsResponse } from "@/types/article";
import { WeatherResponse } from "@/types/weather";

const newsApiUrl = process.env.NEWS_API_URL;
const weatherApiUrl = process.env.WEATHER_API_URL;

export const fetchNews = async () => {
  try {
    const response = await fetch(newsApiUrl!);
    if (!response.ok) {
      throw new Error(`Error fetching news: ${response.statusText}`);
    }

    const successfulResponse: NewsResponse = await response.json();
    return successfulResponse.posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchWeather = async () => {
  try {
    const response = await fetch(weatherApiUrl!);
    if (!response.ok) {
      throw new Error(`Error fetching weather: ${response.statusText}`);
    }

    const successfulResponse: WeatherResponse = await response.json();
    return successfulResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};
