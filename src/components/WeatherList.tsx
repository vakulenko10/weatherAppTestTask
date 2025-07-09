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
          key={city}
          data={entities[city]}
          showRemove={true}
          onRemove={() => dispatch(removeCity(city))}
          showRefresh={true}
        />
      ))}
    </Container>
  );
};
