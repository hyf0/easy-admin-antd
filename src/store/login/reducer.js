import { SET_USER, SET_ROLES } from "./actionTypes";

const defaultState = {
  roles: [],
  user: null,
};

export default function loginReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      }
    } break;
    case SET_ROLES: {
      return {
        ...state,
        roles: action.payload,
      }
    } break;
  }
  return state;
}
