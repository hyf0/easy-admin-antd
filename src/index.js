// import { hot } from 'react-hot-loader/root';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App.jsx';

import './index.scss';

ReactDOM.render(
  // React.createElement(__DEV__ ? hot(App) : App),
  React.createElement(App),
  document.querySelector('#app'),
);
