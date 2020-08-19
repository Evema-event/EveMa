import { ADD_EVENT, AUTHENTICATE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
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
    default:
      return state;
  }
};
