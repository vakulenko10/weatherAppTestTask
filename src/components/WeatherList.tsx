import { Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CityWeatherCard } from './CityWeatherCard';
import { removeCity } from '../app/WeatherSlice';

export const WeatherList = () => {
  const entities = useAppSelector((state) => state.weather.entities);
  const cities = useAppSelector((state) => state.weather.allCities);
  const dispatch = useAppDispatch();
  return (
    <Container>
      {cities.map((city) => (
        <CityWeatherCard
          data={entities[city]}
          showRemove={true}
          onRemove={() => dispatch(removeCity(city))}
        />
      ))}
    </Container>
  );
};
