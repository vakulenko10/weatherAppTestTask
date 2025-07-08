import { Button } from "@mui/material";
import { useAppDispatch } from "../app/hooks";
import { fetchCityWeather } from "../app/WeatherThunks";

export const WeatherSearch = () => {
  const dispatch = useAppDispatch();

  const handleSearch = (city: string) => {
    dispatch(fetchCityWeather(city));
  };

  return (
    <div>
      <Button onClick={() => handleSearch('Gdansk')} variant="contained">Load Gdansk</Button>
      <Button onClick={() => handleSearch('Kyiv')} variant="contained">Load Kyiv</Button>
    </div>
  );
};
