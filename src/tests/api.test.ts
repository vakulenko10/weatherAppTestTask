import { fetchCurrentWeather, fetchForecast } from '../api/index';
import { getWeatherUrl, getForecastUrl } from '../api/endpoints';
jest.mock('../api/getWeatherAPIkey', () => ({
  getWeatherAPIKey: () => process.env.VITE_WEATHER_API_KEY,
}));
global.fetch = jest.fn();

const mockedFetch = fetch as jest.Mock;

describe('API functions', () => {
  afterEach(() => {
    mockedFetch.mockReset();
  });

  describe('fetchCurrentWeather', () => {
    it('returns data when the response is OK', async () => {
      const mockData = { name: 'London', main: { temp: 20 } };
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchCurrentWeather('London');
      expect(mockedFetch).toHaveBeenCalledWith(getWeatherUrl('London'));
      expect(result).toEqual(mockData);
    });

    it('throws an error when response is not OK', async () => {
      mockedFetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchCurrentWeather('InvalidCity')).rejects.toThrow(
        'Weather not found for InvalidCity'
      );
    });
  });

  describe('fetchForecast', () => {
    it('returns data when the response is OK', async () => {
      const mockData = { list: [{ dt_txt: '2025-07-10', main: { temp: 18 } }] };
      mockedFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchForecast('Paris');
      expect(mockedFetch).toHaveBeenCalledWith(getForecastUrl('Paris'));
      expect(result).toEqual(mockData);
    });

    it('throws an error when response is not OK', async () => {
      mockedFetch.mockResolvedValueOnce({ ok: false });

      await expect(fetchForecast('InvalidCity')).rejects.toThrow(
        'Forecast not found for InvalidCity'
      );
    });
  });
});
