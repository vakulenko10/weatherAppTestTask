import { getForecastUrl, getWeatherUrl, getOneCallUrl } from './endpoints';

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

export async function fetchOneCall(lat: number, lon: number) {
  const res = await fetch(getOneCallUrl(lat, lon));
  if (!res.ok) throw new Error(`Detailed forecast not found for coords`);
  return res.json();
}
