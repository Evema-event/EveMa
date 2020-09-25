// Importing core packages
import React, { useReducer } from 'react';

// Importing context and reducer
import VisitorContext from './visitorContext';
import VisitorReducer from './visitorReducer';

// Importing required types
import {
  GET_VISITOR,
  SET_INDIV_VISITOR,
  VISITOR_LOADING
} from '../types';

// Importing files and packages to fetch data
import axios from 'axios';
import url from '../../server';

// VisitorState to manage state
const VisitorState = (props) => {
  // InitialState setup
  const initialState = {
    visitorlist: null,
    individualVisitor: null,
    visitorLoading: false,
  };

  // Apply reducer to state
  const [state, dispatch] = useReducer(VisitorReducer, initialState);

  // Function fetch data from server
  const getVisitors = async (eventId) => {
    dispatch({ type: VISITOR_LOADING });
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const res = await axios.get(`${url}event/visitorList/${eventId}`, config);
    dispatch({ type: GET_VISITOR, payload: res.data.visitorlist });
  };

  // Set Individual Visitor data 
  const setIndividualVisitor = (visitor) => {
    dispatch({ type: SET_INDIV_VISITOR, payload: visitor });
  };

  // Return data to be used in UI
  return (
    <VisitorContext.Provider
      value={{
        visitorlist: state.visitorlist,
        individualVisitor: state.individualVisitor,
        visitorLoading: state.visitorLoading,
        getVisitors,
        setIndividualVisitor,
      }}
    >
      {props.children}
    </VisitorContext.Provider>
  );
};

//Exporting State
export default VisitorState;
