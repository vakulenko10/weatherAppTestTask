import { useState } from 'react';
import { Button, Typography } from '@mui/material';

export const CounterButton = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Typography variant="h6">Count: {count}</Typography>{' '}
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Increase
      </Button>
    </div>
  );
};
