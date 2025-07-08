import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './styles/index.scss';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
