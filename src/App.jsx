
import React from 'react';

import { Provider } from 'react-redux';

import store from '@/store';
import AppRouter from '@/router/AppRouter';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
