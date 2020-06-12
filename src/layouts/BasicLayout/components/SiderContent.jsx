import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { menuRoutes } from '@/router/routes';
import routeConfig from '@/router/routes';

/**
 *
 * @param {import('@/router/routes').IRoute[]} routes;
 * @param {string} currentPath;
 * @param {string []} currentRoles;
 */
function gennerateMenu(routes, currentPath, currentRoles) {
  /**
   * @param {import('@/router/routes').IRoute[]} routes
   * @param {import('@/router/routes').IRoute | null} lastRoute;
   */
  function makeMenuOrSubMenu(routes, lastRoute = null) {
    if (lastRoute != null)
      return (
        <Menu.SubMenu
          icon={lastRoute.icon || routeConfig.defaultIcon}
          key={lastRoute.path}
          title={
            lastRoute.name || (lastRoute.component && lastRoute.component.name)
          }
        >
          {makeMenuItems(routes)}
        </Menu.SubMenu>
      );

    return (
      <Menu
        className="sider-menu"
        defaultSelectedKeys={[currentPath]}
        selectedKeys={[currentPath]}
        mode="inline"
        theme="dark"
        key="menu"
      >
        {makeMenuItems(routes)}
      </Menu>
    );
  }
  /**
   *
   * @param {import('@/router/routes').IRoute[]} routes
   */
  function makeMenuItems(routes, lastRoute = null) {
    return routes.map((route) => {
      // 菜单项鉴权
      const routeRoles = route.roles;
      if (routeRoles != null) {
        const isAuthorized = currentRoles.some((curRole) =>
          routeRoles.includes(curRole),
        );
        if (!isAuthorized) return null;
      }

      if (route.hide) {
        // 路由是否设置了在侧边栏中隐藏自身
        return null;
      }

      if (typeof route.children !== 'undefined') {
        return makeMenuOrSubMenu(route.children, route);
      }
      return (
        <Menu.Item
          icon={route.icon || routeConfig.defaultIcon}
          key={route.path}
        >
          <Link to={route.path}>
            {route.name || (route.component && route.component.name)}
          </Link>
        </Menu.Item>
      );
    });
  }

  return makeMenuOrSubMenu(routes);
}

const selecotrSiderContent = ({
  router: {
    location: { pathname },
  },
  login: { roles },
}) => ({
  pathname,
  roles,
});
export default function SiderContent() {
  const { pathname, roles } = useSelector(selecotrSiderContent);
  return <>{gennerateMenu(menuRoutes, pathname, roles)}</>;
}
