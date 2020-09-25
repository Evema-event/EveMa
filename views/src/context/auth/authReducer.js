import {
  UPDATE_USER,
  AUTHENTICATE,
  LOGOUT,
  FORGET_PASSWORD,
  PROFILE_LOADING
} from '../types';

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
        profileLoading: false,
        token: action.payload.token,
      };
    case PROFILE_LOADING:
      return {
        ...state,
        profileLoading: true,
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
