import { SIGN_UP_0 } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SIGN_UP_0:
      return {
        ...state,
        signUpOne: action.payload,
      };

    default:
      break;
  }
};
