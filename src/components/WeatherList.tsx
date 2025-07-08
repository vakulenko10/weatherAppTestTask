import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { removeCity } from '../app/WeatherSlice';

export const WeatherList = () => {
  const cities = useAppSelector((state) => state.weather.allCities);
  const dispatch = useAppDispatch();

  return (
    
    <div>
      {cities.map((city) => (
        <div key={city}>
          {city}
          <Button onClick={() => dispatch(removeCity(city))} variant='contained'>Remove</Button>
        </div>
      ))}
    </div>
  );
};