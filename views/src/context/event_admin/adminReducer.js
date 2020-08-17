import { ADD_EVENT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
