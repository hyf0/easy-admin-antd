import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const selectorAuthLayout = ({
  login: { roles },
  router: {
    location: { pathname },
  },
}) => ({
  roles,
  pathname,
});

export default function AuthLayout(props) {
  const { roles, pathname } = useSelector(selectorAuthLayout);
  const isLogined = roles.length !== 0;
  if (!isLogined) {
    if (pathname === '/login' || pathname === '/register') {
      return props.children;
    } else {
      return <Redirect to="/login" />;
    }
  }

  return props.children;
}

AuthLayout.defaultProps = {
  children: null,
};

AuthLayout.propTypes = {
  children: PropTypes.element,
};
