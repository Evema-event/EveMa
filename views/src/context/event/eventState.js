import React, { useReducer } from 'react';
import axios from 'axios';
import EventContext from './eventContext';
import EventReducer from './eventReducer';
import url from '../../server';
import { GET_UPCOMING_EVENTS, GET_COMPLETED_EVENTS } from '../types';

const EventState = (props) => {
  const initialState = {
    upcomingEvents: null,
    completedEvents: null,
  };

  const [state, dispatch] = useReducer(EventReducer, initialState);

  // GET UPCOMING EVENT

  const getUpcomingEvent = async () => {
    const events = await axios.get(url + 'event/upcomingEvents');
    dispatch({ payload: events.data.events, type: GET_UPCOMING_EVENTS });
  };

  // GET COMPLETED EVENT

  const getCompletedEvent = async () => {
    const events = await axios.get(url + 'event/completedEvents');
    dispatch({ payload: events.data.events, type: GET_COMPLETED_EVENTS });
  };

  return (
    <EventContext.Provider
      value={{
        upcomingEvents: state.upcomingEvents,
        completedEvents: state.completedEvents,
        indivEvent: state.indivEvent,
        getUpcomingEvent,
        getCompletedEvent,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
