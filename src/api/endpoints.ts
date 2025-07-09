export const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherUrl = (city: string) =>
  `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

export const getForecastUrl = (city: string) =>
  `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;