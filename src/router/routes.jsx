import React from 'react';

import NotFound404 from '@/components/NotFound404';
import AuthLayout from '@/layouts/AuthLayout';
import BasicLayout from '@/layouts/BasicLayout';
import Welcome from '@/components/Welcome';
import LoadingSpain from '@/components/LoadingSpain';
import { MinusSquareOutlined, SmileOutlined } from '@ant-design/icons';

// warm 注意同级路由之间的 path 不能相同

/**
 * @typedef {{
 * path: string; // 现在每个组件必须传路径
 * name?: string; // 为空的话，再需要name的时候，会将组件名当作name使用
 * component?: string | ((...args: any[]) => JSX.Element); // 字符串表示异步组件，会自动加载/pages下的组件
 * icon?: JSX.Element;
 * loading?: JSX.Element; // 异步组件loading时加载的组件
 * hide?: boolean; // 是否显示在侧边栏中
 * exact?: boolean;
 * roles?: string[];
 * children?: IRoute[];
 * }} IRoute
 */

/**
 * @type {IRoute[]}
 */
export const menuRoutes = [
  {
    path: '/',
    name: '欢迎',
    component: Welcome,
    icon: <SmileOutlined />,

    exact: true,
  },
  {
    path: '/role',
    name: '角色权限测试',
    children: [
      {
        path: '/role/page-permission',
        name: '页面权限(admin)',
        roles: ['admin'],
        component: '/permission/PagePermission',
      },
      {
        path: '/role/method-display',
        name: '权限组件',
        component: '/permission/MethodDisplay',
      },
    ],
  },
  {
    path: '/second',
    name: '二级路由',
    component: Welcome,
    icon: <SmileOutlined />,
    children: [
      {
        path: '/second/welcome',
        name: '二级欢迎',
        component: Welcome,
      },
      {
        path: '/second/third',
        name: '三级路由',
        children: [
          {
            path: '/second/third/welcome',
            name: '三级欢迎',
            component: Welcome,
          },
        ]
      }
    ],
  },
  {
    path: '/icons',
    name: '图标',
    component: '/Icons',
  },
  // {
  //   path: '/error-display',
  //   name: '错误捕获',
  //   component: '/ErrorDisplay',
  // },
  {
    path: '/errpr-page',
    name: '错误页面',
    children: [
      {
        path: '/errpr-page/403',
        name: '403',
        component: '/errorPage/NotAuthorized403',
      },
      {
        path: '/errpr-page/404',
        name: '404',
        component: '/errorPage/NotFound404',
      },
    ],
  },
];

/**
 * @type {IRoute[]}
 */
const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        component: '/account/Login',
      },
      {
        path: '/register',
        component: '/account/Register',
      },
      {
        path: '/',
        component: BasicLayout,
        children: [
          {
            path: '/403',
            name: '403',
            component: '/errorPage/NotAuthorized403',
          },
          {
            path: '/404',
            name: '404',
            component: '/errorPage/NotFound404',
          },
          ...menuRoutes,
        ],
      },
    ],
  },
  {
    path: '/*',
    component: NotFound404,
  },
];

const routeConfig = {
  routes,
  defaultLoading: <LoadingSpain />,
  defaultIcon: <MinusSquareOutlined />,
};

export default routeConfig;
