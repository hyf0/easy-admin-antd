import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Checkbox } from 'antd';
import { actions } from '@/store';

const selectorPagePermission = ({ login: { roles } }) => roles;

export default function PagePermission() {
  const roles = useSelector(selectorPagePermission);
  const dispatch = useDispatch();
  return (
    <div>
      <div>你的权限: {JSON.stringify(roles)};</div>
      <br />
      <div>
        切换权限:
        {['user', 'admin'].map((role) => {
          const isChecked = roles.includes(role);
          const isLastOneChecked = isChecked && roles.length === 1;
          return (
            <Checkbox
              key={role}
              checked={isChecked}
              disabled={isLastOneChecked}
              onChange={() => {
                if (!isChecked) {
                  dispatch(actions.login.createSetRoles(roles.concat(role)));
                } else {
                  dispatch(
                    actions.login.createSetRoles(
                      roles.filter((r) => r !== role),
                    ),
                  );
                }
              }}
            >
              {role}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
}
