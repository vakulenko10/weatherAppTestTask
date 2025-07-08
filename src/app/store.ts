import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './WeatherSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
