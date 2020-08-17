import React, { useReducer } from 'react';
import AdminContext from './adminContext';
import AdminReducer from './adminReducer';
import { ADD_EVENT } from '../types';

const AdminState = (props) => {
  const initialState = {
    eventName: '',
    venue: '',
    contact: '',
    email: '',
    startDate: '',
    endDate: '',
    lastDate: '',
    price: '',
    startTime: '',
    endTime: '',
    description: '',
  };

  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const addEvent = (data) => {
    dispatch({ payload: data, type: ADD_EVENT });
  };

  return (
    <AdminContext.Provider
      value={{
        eventName: state.eventName,
        venue: state.venue,
        contact: state.contact,
        email: state.email,
        startDate: state.startDate,
        endDate: state.endDate,
        lastDate: state.lastDate,
        price: state.price,
        startTime: state.startTime,
        endTime: state.endTime,
        description: state.description,
        addEvent,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};
export default AdminState;
