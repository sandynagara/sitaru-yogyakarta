import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { rootStore } from './redux/rootStore';
import { render } from 'react-dom';

render(
  <React.StrictMode>
    <App store={rootStore}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
