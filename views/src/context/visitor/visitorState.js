import React, { useReducer } from 'react';
import VisitorContext from './visitorContext';
import VisitorReducer from './visitorReducer';
import {GET_VISITOR, SET_INDIV_VISITOR} from '../types'
import axios from 'axios';
import url from '../../server';

const VisitorState = (props) => {
  const initialState = {
    visitorlist: null,
    individualVisitor: null,
  };
  const [state, dispatch] = useReducer(VisitorReducer, initialState);
  const getVisitors = async (eventId) => {
      console.log("Called")
    const config = {
      headers: {
        'x-auth-token': localStorage.getItem('token'),
      },
    };
    const res = await axios.get(`${url}event/visitorList/${eventId}`, config);
    console.log(res);
    dispatch({type: GET_VISITOR ,payload: res.data.visitorlist})
  };
  const setIndividualVisitor= (visitorlist)=>{
      dispatch({type: SET_INDIV_VISITOR ,payload: visitorlist})
  }
  return <VisitorContext.Provider
  value = {{
      visitorlist: state.visitorlist,
      getVisitors,
      setIndividualVisitor

  }}
  >
  {props.children}
  </VisitorContext.Provider>;
};

export default VisitorState;
