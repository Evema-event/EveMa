import { GET_UPCOMING_EVENTS, GET_COMPLETED_EVENTS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_UPCOMING_EVENTS:
      return {
        ...state,
        upcomingEvents: action.payload,
      };
    case GET_COMPLETED_EVENTS:
      return {
        ...state,
        completedEvents: action.payload,
      };

    default:
      break;
  }
};
