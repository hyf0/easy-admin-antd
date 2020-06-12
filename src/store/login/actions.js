import { SET_ROLES, SET_USER } from './actionTypes';

/**
 *
 * @param {string | string[]} roles
 */
export function createSetRoles(roles) {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return {
    type: SET_ROLES,
    payload: roles,
  };
}

export function createSetUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}
