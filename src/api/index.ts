import { getForecastUrl, getWeatherUrl } from './endpoints';

export async function fetchCurrentWeather(city: string) {
  const res = await fetch(getWeatherUrl(city));
  if (!res.ok) throw new Error(`Weather not found for ${city}`);
  return res.json();
}

export async function fetchForecast(city: string) {
  const res = await fetch(getForecastUrl(city));
  if (!res.ok) throw new Error(`Forecast not found for ${city}`);
  return res.json();
}
