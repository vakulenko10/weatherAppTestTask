import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { fetchCurrentWeather, fetchForecast } from '../api';
import { useAppDispatch } from '../app/hooks';
import { fetchCityWeather } from '../app/WeatherThunks';
import { CityWeatherCard } from './CityWeatherCard';
import type { CityWeatherState } from '../app/WeatherSlice';
export const WeatherSearch = () => {
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
      setPreview({
        current,
        forecast,
        updatedAt: Date.now(),
      });
    } catch (e) {
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

  return (
    <Box sx={{ maxWidth: 500, margin: '2rem auto', padding: 2 }}>
      <TextField
        fullWidth
        label="Search city"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleSearch}
        disabled={!query.trim() || loading}
      >
        Search
      </Button>

      {loading && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography sx={{ mt: 2 }} color="error">
          {error}
        </Typography>
      )}

      {preview && preview.current && (
        <CityWeatherCard data={preview} isAddable onAdd={handleAddCity} />
      )}
    </Box>
  );
};
