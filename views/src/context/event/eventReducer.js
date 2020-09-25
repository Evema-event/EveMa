import {
  GET_UPCOMING_EVENTS,
  GET_COMPLETED_EVENTS,
  FIND_INDIV_EVENT,
  SET_SELECTED_EVENT,
  UPCOMING_EVENTS_LOADING,
  COMPLETED_EVENTS_LOADING
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_UPCOMING_EVENTS:
      return {
        ...state,
        upcomingEvents: action.payload,
        upcomingEventsLoading: false,
      };
    case GET_COMPLETED_EVENTS:
      return {
        ...state,
        completedEvents: action.payload,
        completedEventsLoading: false,
      };
    case UPCOMING_EVENTS_LOADING:
      return {
        ...state,
        upcomingEventsLoading: true,
      };
    case COMPLETED_EVENTS_LOADING:
      return {
        ...state,
        completedEventsLoading: true,
      }
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
