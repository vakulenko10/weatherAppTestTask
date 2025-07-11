import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { WeatherSearch } from '../components/WeatherSearch';
jest.mock('../api/getWeatherAPIkey', () => ({
  getWeatherAPIKey: () => process.env.VITE_WEATHER_API_KEY,
}));
describe('WeatherSearch', () => {
  test('renders input and button', () => {
    render(
      <Provider store={store}>
        <WeatherSearch />
      </Provider>
    );

    expect(screen.getByLabelText(/search city/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('allows typing in the input', () => {
    render(
      <Provider store={store}>
        <WeatherSearch />
      </Provider>
    );

    const input = screen.getByLabelText(/search city/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Kyiv' } });
    expect(input.value).toBe('Kyiv');
  });
});
