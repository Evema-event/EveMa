import { GET_UPCOMING_EVENTS, GET_COMPLETED_EVENTS } from '../types';

export default (state, action) => {
  switch (action) {
    case GET_UPCOMING_EVENTS:
      return {
        ...state,
        eventName: action.payload,
      };
    case GET_COMPLETED_EVENTS:
      return {
        ...state,
        eventName: action.payload,
      };

    default:
      break;
  }
};
