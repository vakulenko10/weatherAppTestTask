import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Stack,
} from '@mui/material';
import type { CityWeatherState } from '../app/WeatherSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { fetchCityWeather } from '../app/WeatherThunks';

interface WeatherCardProps {
  data: CityWeatherState;
  onAdd?: () => void;
  isAddable?: boolean;
  onRemove?: () => void;
  showRemove?: boolean;
  showRefresh?:boolean
}

export const CityWeatherCard = React.memo(function CityWeatherCard({
  data,
  onAdd,
  isAddable = false,
  onRemove,
  showRemove = false,
  showRefresh = false
}: WeatherCardProps) {
  const current = data.current;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (!current) {
    return null;
  }

  const {
    name,
    main: { temp },
    weather,
  } = current;
   const handleRefresh = () => {
    dispatch(fetchCityWeather(name));
  };

  return (
    <Card
      sx={{
        mt: 2,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.06)',
      }}
    >
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1">{Math.round(temp)}°C</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {weather?.[0]?.description}
        </Typography>

        {(isAddable || showRemove) && (
          <Box mt={2}>
            <Stack direction="row" spacing={1}>
              {isAddable && onAdd && (
                <Button variant="outlined" onClick={onAdd}>
                  Add
                </Button>
              )}
              {showRemove && onRemove && (
                <Button variant="outlined" color="error" onClick={onRemove}>
                  Remove
                </Button>
              )}
              <Button
                variant="outlined"
                color="error"
                onClick={() => navigate(`/${name}`)}
              >
                See more details
              </Button>
              {showRefresh&&<Button
              variant="outlined"
              color="primary"
              onClick={handleRefresh}
            >
              Refresh
            </Button>}
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
});
