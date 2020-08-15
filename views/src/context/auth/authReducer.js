import { UPDATE_USER, AUTHENTICATE, LOGOUT, FORGET_PASSWORD } from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    case AUTHENTICATE:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        ...action.payload,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
