import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootStore } from './redux/rootStore';
import { createRoot } from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <CookiesProvider>
    <App store={rootStore} />
  </CookiesProvider>
);

reportWebVitals();
