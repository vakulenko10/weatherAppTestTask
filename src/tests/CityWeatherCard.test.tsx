import { render, screen, fireEvent } from '@testing-library/react';
import { CityWeatherCard } from '../components/CityWeatherCard';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../app/store';
import type { CityWeatherState } from '../app/WeatherSlice';
import type { WeatherData } from '../types/weather';
jest.mock('../api/getWeatherAPIkey', () => ({
  getWeatherAPIKey: () => process.env.VITE_WEATHER_API_KEY,
}));
export const mockWeatherData: WeatherData = {
  coord: { lon: -0.13, lat: 51.51 },
  weather: [
    {
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04d',
    },
  ],
  main: {
    temp: 17.3,
    humidity: 82,
  },
  name: 'London',
  sys: {
    country: 'GB',
  },
};
export const mockForecast = {
  list: [
    {
      dt_txt: '2025-07-10 12:00:00',
      main: { temp: 18.5 },
      weather: [{ description: 'light rain' }],
    },
    {
      dt_txt: '2025-07-10 15:00:00',
      main: { temp: 19.0 },
      weather: [{ description: 'scattered clouds' }],
    },
  ],
};
const mockCityWeatherState: CityWeatherState = {
  current: mockWeatherData,
  forecast: null,
  updatedAt: Date.now(),
};
describe('CityWeatherCard', () => {
test('renders city name, temperature, and description', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CityWeatherCard data={mockCityWeatherState} />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText('London')).toBeInTheDocument();
  expect(screen.getByText('17°C')).toBeInTheDocument(); 
  expect(screen.getByText(/overcast clouds/i)).toBeInTheDocument();
});

test('calls onAdd when Add button is clicked', () => {
  const handleAdd = jest.fn();

  render(
    <Provider store={store}>
      <BrowserRouter>
        <CityWeatherCard data={mockCityWeatherState} isAddable onAdd={handleAdd} />
      </BrowserRouter>
    </Provider>
  );

  fireEvent.click(screen.getByText('Add'));
  expect(handleAdd).toHaveBeenCalled();
});
test('calls onRemove when Remove button is clicked', () => {
  const handleRemove = jest.fn();

  render(
    <Provider store={store}>
      <BrowserRouter>
        <CityWeatherCard
          data={mockCityWeatherState}
          showRemove
          onRemove={handleRemove}
        />
      </BrowserRouter>
    </Provider>
  );

  fireEvent.click(screen.getByText('Remove'));
  expect(handleRemove).toHaveBeenCalled();
});
test('renders "See more details" button', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CityWeatherCard data={mockCityWeatherState} showRemove onRemove={() => {}} />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText('See more details')).toBeInTheDocument();
});

})