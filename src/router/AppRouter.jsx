import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';

import gennerateRoutes from './gennerateRoutes';
import routeConfig from './routes';

const hashHistory = createHashHistory();

export const history = hashHistory;

export default function AppRouter() {
  return (
    <ConnectedRouter history={history}>
      {gennerateRoutes(routeConfig.routes)}
    </ConnectedRouter>
  );
}
