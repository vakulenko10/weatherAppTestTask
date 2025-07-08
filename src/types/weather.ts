export interface WeatherData {
  coord: { lon: number; lat: number };
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; humidity: number };
  name: string;
  sys: { country: string };
}

export interface ForecastResponse {
  list: {
    dt_txt: string;
    main: { temp: number };
    weather: { description: string }[];
  }[];
}

export interface OneCallResponse {
  hourly: {
    dt: number;
    temp: number;
  }[];
}   