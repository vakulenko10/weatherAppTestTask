import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Typography, Box, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchCurrentWeather, fetchForecast } from '../api';
import { fetchCityWeather } from '../app/WeatherThunks';

export const CityDetails = () => {
  const { cityName } = useParams();
  const dispatch = useAppDispatch();
  const storedData = useAppSelector(
    (state) => state.weather.entities[cityName!]
  );

  const [loading, setLoading] = useState(false);
  const [tempData, setTempData] = useState<any | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!storedData && cityName) {
      setLoading(true);
      (async () => {
        try {
          const current = await fetchCurrentWeather(cityName);
          const forecast = await fetchForecast(cityName);
          setTempData({ current, forecast, updatedAt: Date.now() });
        } catch (err) {
          setError('City not found.');
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [cityName, storedData]);

  const handleAdd = () => {
    if (cityName) {
      dispatch(fetchCityWeather(cityName));
    }
  };

  const dataToShow = storedData || tempData;

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!dataToShow?.current) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Data not available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dataToShow.current.name}
      </Typography>
      <Typography variant="h6">
        Temperature: {Math.round(dataToShow.current.main.temp)}°C
      </Typography>
      <Typography variant="body1">
        Weather: {dataToShow.current.weather[0].description}
      </Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Forecast data available:{' '}
        {Boolean(dataToShow.forecast?.hourly?.length).toString()}
      </Typography>

      {!storedData && (
        <Button sx={{ mt: 3 }} variant="outlined" onClick={handleAdd}>
          Add to My Cities
        </Button>
      )}
    </Box>
  );
};
