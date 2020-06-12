import React, { Suspense } from 'react';
import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import routeConfig, { IRoute } from './routes';
import { validateRoute } from './helper';

import Authorized from '@/components/Authorized';

// 注意路由权限应当有传染性，二级路由被设置权限后，三级路由应该自动继承其权限
/**
 * @todo 面包屑实现
 * @todo 多级路由不用写完整的url
 */

/**
 *
 * @param {IRoute[]} routes
 * @param {IRoute | null} lastRoute
 */
export default function gennerateRoutes(routes, lastRoute = null) {
  if (typeof routes === 'undefined') return null;

  return (
    <Switch>
      {routes.map((route, routeIndex) => {
        validateRoute(route);
        let Component =
          route.component !== undefined ? route.component : Fragment;

        if (typeof Component === 'string') {
          Component = resolveAsyncComponent(Component, route);
        }

        if (lastRoute !== null) {
          // todo 自动拼接上级和本级路由的 path
          // route.path = lastRoute.path + route.path;

          if (lastRoute.roles != null) {
            // 实现路由权限的传递性
            if (route.roles == null) {
              route.roles = lastRoute.roles;
            } else {
              route.roles = route.roles.concat(lastRoute.roles);
            }
          }
        }

        return (
          <Route exact={!!route.exact} key={routeIndex + route.path} path={route.path}>
            <Authorized
              force={typeof route.roles === 'undefined'} // 不存在 roles 说明是无所谓权限的，强制显示
              roles={route.roles}
            >
              <Component>{gennerateRoutes(route.children, route)}</Component>
            </Authorized>
          </Route>
        );
      })}
    </Switch>
  );
}

/**
 *
 * @param {string} filepath
 * @param {IRoute} route
 */
function resolveAsyncComponent(filepath, route) {
  const LazyComponent = React.lazy(() =>
    import(
      /* webpackChunkName: "[request]" */ `../pages${
        filepath[0] === '/' ? filepath : '/' + filepath
      }`
    ),
  );
  const loadingElement = route.loading || routeConfig.defaultLoading;
  return function AsyncRouteCompoent(props) {
    return (
      <Suspense fallback={loadingElement}>
        <LazyComponent>{props.chidlren}</LazyComponent>
      </Suspense>
    );
  };
}
