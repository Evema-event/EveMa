import {
  GET_UPCOMING_EVENTS,
  GET_COMPLETED_EVENTS,
  FIND_INDIV_EVENT,
  SET_SELECTED_EVENT,
} from '../types';

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
        indivEvent: action.payload.event,
        isUpcoming: action.payload.isUpcoming,
      };
    case SET_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: action.payload,
      };
    default:
      return state;
  }
};
