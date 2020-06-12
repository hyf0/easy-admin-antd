import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { actions } from '@/store';
import PagePermission from './PagePermission';

const selectorPagePermission = ({ login: { roles } }) => roles;

export default function MethodDisplay() {
  const roles = useSelector(selectorPagePermission);
  const dispatch = useDispatch();
  return (
    <div>
      <PagePermission />
      <br />
      <div>
        路由权限的几点需求：
        <h1>禁止未授权的访问</h1>
        <ul>
          <li>权限变化时，没有授权的页面会跳转到 403 或显示未授权页面</li>
          <li>权限变化时，左侧的路由也应该自动变化</li>
          <li>
            路由权限应该具有传染性，假如二级路由被设置了权限，如果子路由没有设置权限，那么这个子路由应该继承父路由的权限，如果设置了，则不继承
          </li>
          <li>
            也就是如果父路由有权限，那么没设置权限的子路由至少应该保持和父路由的权限，但如果子路由设置了权限，就不应该继承父路由的权限，因为子路由的权限可能高于父路由的
          </li>
        </ul>
      </div>
    </div>
  );
}
