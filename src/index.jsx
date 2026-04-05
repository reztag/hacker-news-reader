import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import configureStore from 'store';
import App from 'components/App/App.jsx';
import GlobalStyles from 'styles/globals';
import loadInitialState from 'store/middleware/localStorageMiddleware/loadInitialState';

const initialState = loadInitialState();
const store = configureStore(initialState);
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </React.StrictMode>,
);
