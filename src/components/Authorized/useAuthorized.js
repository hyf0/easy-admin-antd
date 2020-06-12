import { useSelector } from 'react-redux';

const selectorRoles = ({login: {
  roles,
}}) => roles;

/**
 *
 * @param {string | string[]} roles
 */
export default function useAuthorized(roles) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  const currentRoles = useSelector(selectorRoles);
  return roles.some(role => currentRoles.indexOf(role) >= 0);
}
