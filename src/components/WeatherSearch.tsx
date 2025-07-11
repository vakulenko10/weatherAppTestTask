import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';
import { CityWeatherCard } from './CityWeatherCard';
import { useWeatherSearch } from '../hooks/useWeatherSearch';

export const WeatherSearch = () => {
  const {
    query,
    setQuery,
    preview,
    loading,
    error,
    handleSearch,
    handleAddCity,
  } = useWeatherSearch();

  return (
    <Box sx={{ maxWidth: 500, margin: '2rem auto', padding: 2 }}>
      <TextField
        fullWidth
        label="Search city"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={handleSearch}
        disabled={!query.trim() || loading}
      >
        Search
      </Button>

      {loading && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography sx={{ mt: 2 }} color="error">
          {error}
        </Typography>
      )}

      {preview && preview.current && (
        <CityWeatherCard data={preview} isAddable onAdd={handleAddCity} />
      )}
    </Box>
  );
};
