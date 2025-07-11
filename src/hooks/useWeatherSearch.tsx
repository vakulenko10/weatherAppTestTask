import { useState } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../api';
import { useAppDispatch } from '../app/hooks';
import { fetchCityWeather } from '../app/WeatherThunks';
import type { CityWeatherState } from '../app/WeatherSlice';

export const useWeatherSearch = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState<CityWeatherState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setLoading(true);
    setPreview(null);
    try {
      const current = await fetchCurrentWeather(query);
      const forecast = await fetchForecast(query);
      setPreview({ current, forecast, updatedAt: Date.now() });
    } catch {
      setError('City not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCity = () => {
    if (preview?.current?.name) {
      dispatch(fetchCityWeather(preview.current.name));
      setPreview(null);
      setQuery('');
    }
  };

  return {
    query,
    setQuery,
    preview,
    loading,
    error,
    handleSearch,
    handleAddCity,
  };
};
