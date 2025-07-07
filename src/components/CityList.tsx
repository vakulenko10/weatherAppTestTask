import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { addCity, removeCity } from '../app/store';

export const CityList = () => {
  const cities = useAppSelector((state) => state.weather.cities);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Cities</h2>
      <ul>
        {cities.map((city) => (
          <li key={city} className="flex justify-between items-center">
            {city}
            <button
              className="ml-2 text-red-500"
              onClick={() => dispatch(removeCity(city))}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => dispatch(addCity('Paris'))}
        className="mt-4 bg-blue-500 text-white px-4 py-1 rounded"
      >
        Add Paris
      </button>
    </div>
  );
};
