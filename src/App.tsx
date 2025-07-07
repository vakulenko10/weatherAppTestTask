import { useDispatch, useSelector } from 'react-redux';
import { increment } from './app/store';

import { Button } from '@mui/material';
function App() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Project setup is ready!</h1>
      <h1>Redux Counter Test</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+1</button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(increment())}
      >
        +1
      </Button>
    </div>
  );
}

export default App;
