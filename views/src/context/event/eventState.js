import React, { useReducer } from 'react';
// import axios from 'axios';
import EventContext from './eventContext';
import EventReducer from './eventReducer';
// import {
//   FIND_INDIV_EVENT,
//   GET_UPCOMING_EVENTS,
//   GET_COMPLETED_EVENTS,
//   ERROR,
// } from '../types';

const EventState = (props) => {
  const initialState = {
    upcomingEvents: [
      {
        name: 'Disney Host',
        venue: 'CA',
        time: '30/7/2020',
      },
      {
        name: 'MA Host',
        venue: 'CA',
        time: '30/7/2020',
      },
      {
        name: 'Disney Host 1 ',
        venue: 'CA',
        time: '30/7/2020',
      },
      {
        name: 'MA Host 1',
        venue: 'CA',
        time: '30/7/2020',
      },
    ],
    completedEvents: [
      {
        name: 'Disney Host 3',
        venue: 'CA',
        time: '30/7/2020',
      },
      {
        name: 'Disney Host 4',
        venue: 'CA',
        time: '30/7/2020',
      },
      {
        name: 'Disney Host',
        venue: 'CA',
        time: '30/7/2020',
      },
      {
        name: 'MA Host',
        venue: 'CA',
        time: '30/7/2020',
      },
      {
        name: 'Disney Host 1 ',
        venue: 'CA',
        time: '30/7/2020',
      },
      {
        name: 'MA Host 1',
        venue: 'CA',
        time: '30/7/2020',
      },
    ],
    indivEvent: [
      {
        name: 'Disney Host',
        venue: 'CA',
        time: '11.59 P.M',
        date: '30/7/2020',
        details: 'lorem',
        mail: 'event@gmail.com',
        phone: '+91 9987654321',
      },
    ],
  };

  const [state, dispatch] = useReducer(EventReducer, initialState);

  return (
    <EventContext.Provider
      value={{
        upcomingEvents: state.upcomingEvents,
        completedEvents: state.completedEvents,
        indivEvent: state.indivEvent,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};

export default EventState;
