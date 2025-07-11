import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: {
        VITE_WEATHER_API_KEY: 'test-api-key',
      },
    },
  },
});
Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
});