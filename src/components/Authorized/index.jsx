import React from 'react';
import PropTypes from 'prop-types';
import useAuthorized from './useAuthorized';
import { Redirect } from 'react-router-dom';

export default function Authorized(props) {
  const { roles, children, force, elseShow } = props;

  if (force) return children;

  const isAuthorized = useAuthorized(roles);

  if (typeof children === 'function') {
    return <React.Fragment>{children(isAuthorized)}</React.Fragment>;
  }

  if (!isAuthorized) return elseShow;
  return <React.Fragment>{children}</React.Fragment>;
}

Authorized.propTypes = {
  roles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  force: PropTypes.bool,
  elseShow: PropTypes.element,
};

Authorized.defaultProps = {
  children: null,
  force: false,
  roles: [],
  elseShow: <Redirect to="/403" />,
};

export { useAuthorized };
