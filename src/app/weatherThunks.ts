import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchCurrentWeather,
  fetchForecast,
} from '../api/index';
import { setWeatherData } from './WeatherSlice';

export const fetchCityWeather = createAsyncThunk(
  'weather/fetchCityWeather',
  async (city: string, { dispatch }) => {
    const current = await fetchCurrentWeather(city);
    const forecast = await fetchForecast(city);
    dispatch(setWeatherData({ city, current, forecast }));
  }
);
