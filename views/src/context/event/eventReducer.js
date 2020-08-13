import { GET_UPCOMING_EVENTS, GET_COMPLETED_EVENTS, FIND_INDIV_EVENT } from '../types';

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
    case FIND_INDIV_EVENT:
      return {
        ...state,
        indivEvent: action.payload
      }
    default:
      return state;
  }
};
