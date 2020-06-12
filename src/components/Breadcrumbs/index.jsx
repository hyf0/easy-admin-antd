import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { menuRoutes } from '@/router/routes';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const gnneratePathToRouteMap = function () {
  /**
   * @param {import('@/router/routes').IRoute | null} value
   * @param {Node | null} next
   */
  function Node(value, next) {
    this.value = value;
    this.next = next;
  }
  /**
   * @type {{
   * [path: string]: Node;
   * }}
   */
  const pathToRouteMap = {};
  /**
   * @param {import('@/router/routes').IRoute[]} routes
   * @param {Node | node} fatherNode
   */
  function process(routes, fatherNode = null) {
    if (routes == null) return;
    routes.forEach((route) => {
      const node = new Node(route, fatherNode);
      pathToRouteMap[route.path] = node;
      process(route.children, node);
    });
  }
  // console.log('menuRoutes', menuRoutes);
  process(menuRoutes);
  return pathToRouteMap;
};

const selecotorBreadcrumbs = ({
  router: {
    location: { pathname },
  },
}) => pathname;
export default function Breadcrumbs() {
  const pathToRouteMap = useMemo(gnneratePathToRouteMap, []);
  const currentPath = useSelector(selecotorBreadcrumbs);
  const routeList = useMemo(() => {
    let routeNode = pathToRouteMap[currentPath];
    if (routeNode == null) {
      // console.warn('面包屑错误，很可能是你配置菜单路由时出了问题');
    }
    const res = [];
    while (routeNode != null) {
      res.unshift(routeNode.value);
      routeNode = routeNode.next;
    }
    return res;
  }, [currentPath, pathToRouteMap]);
  return (
    <Breadcrumb>
      <Breadcrumb.Item key="index" href="">
        <Link to="/">
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>
      {routeList.map((route) => {
        return (
          <Breadcrumb.Item key={route.path}>
            {typeof route.children !== 'undefined' ? (
              route.name
            ) : (
              <Link to={route.path}>{route.name}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}

Breadcrumbs.defaultProps = {
  fullScreen: false,
};

Breadcrumbs.propTypes = {
  fullScreen: PropTypes.bool,
};
