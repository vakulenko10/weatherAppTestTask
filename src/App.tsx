import { useSelector } from 'react-redux';
import { type RootState } from './app/store';
import { WeatherList } from './components/WeatherList';
import { WeatherSearch } from './components/WeatherSearch';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from './app/hooks';
import { fetchCityWeather } from './app/WeatherThunks';

export function App() {
  const allCities = useSelector((state: RootState) => state.weather.allCities);
  const dispatch = useAppDispatch();

  const hasRestored = useRef(false);

  // 1. Restore from localStorage once
  useEffect(() => {
    const saved = localStorage.getItem('savedCities');
    if (saved) {
      const cities: string[] = JSON.parse(saved);
      cities.forEach((city) => dispatch(fetchCityWeather(city)));
    }
    hasRestored.current = true;
  }, [dispatch]);

  // 2. Only write to localStorage AFTER restoration
  useEffect(() => {
    if (hasRestored.current) {
      localStorage.setItem('savedCities', JSON.stringify(allCities));
    }
  }, [allCities]);

  return (
    <div>
      <WeatherSearch />
      <WeatherList />
    </div>
  );
}
