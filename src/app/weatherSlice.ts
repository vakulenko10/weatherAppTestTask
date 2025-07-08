import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type WeatherData } from '../types/weather';

export interface CityWeatherState {
  current: WeatherData | null;
  forecast: any;
  updatedAt: number;
}

interface WeatherState {
  entities: Record<string, CityWeatherState>;
  allCities: string[];
}

const initialState: WeatherState = {
  entities: {},
  allCities: [],
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherData: (
      state,
      action: PayloadAction<{ city: string; current: any; forecast: any }>
    ) => {
      const { city, current, forecast } = action.payload;
      state.entities[city] = {
        current,
        forecast,
        updatedAt: Date.now(),
      };
      if (!state.allCities.includes(city)) {
        state.allCities.push(city);
      }
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.entities = Object.fromEntries(
        Object.entries(state.entities).filter(([key]) => key !== action.payload)
      );
      state.allCities = state.allCities.filter((c) => c !== action.payload);
    },
  },
});

export const { setWeatherData, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
