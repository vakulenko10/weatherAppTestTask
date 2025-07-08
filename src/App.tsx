import { useSelector } from 'react-redux';
import { type RootState } from './app/store';
import { WeatherList } from './components/WeatherList';
import { WeatherSearch } from './components/WeatherSearch';

export function App() {
  const state = useSelector((state: RootState) => state);

  console.log('🧠 Current Redux State:', state);

  return (
    <div>
      <WeatherSearch/>
      <h1>Redux Store Test</h1>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <WeatherList/>
    </div>
  );
} 