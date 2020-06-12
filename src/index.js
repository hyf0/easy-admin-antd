import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App.jsx';

// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './index.scss';

ReactDOM.render(
  React.createElement(App),
  document.querySelector('#app'),
);
