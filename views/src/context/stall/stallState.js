import React, { useReducer } from 'react';
import StallContext from './stallContext';
import StallReducer from './stallReducer';

import url from '../../server';
import axios from 'axios';

import {
    GET_STALLS,
    SET_INDIVIDUAL_STALL,
    GET_STALL_VISITORS,
    SET_INDIVIDUAL_STALL_VISITOR,
    STALL_LOADING,
    STALL_VISITOR_LOADING,
    UPDATE_INDIVIDUAL_STALL
} from '../types';

const StallState = (props) => {
    const initialState = {
        stalls: null,
        individualStall: null,
        selectedStallId: null,
        visitors: null,
        individualVisitor: null,
        stallLoading: false,
        stallVisitorLoading: false
    };

    const [state, dispatch] = useReducer(StallReducer, initialState);

    const getStalls = async (eventId) => {
        dispatch({ type: STALL_LOADING });
        let stallUrl = url + `stall/getStalls/${eventId}`;
        const config = {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        };
        const res = await axios.get(stallUrl, config);
        dispatch({ type: GET_STALLS, payload: res.data.stalls });
    }

    const getVisitors = async (stallId) => {
        dispatch({ type: STALL_VISITOR_LOADING });
        let stallUrl = url + `stall/getVisitors/${stallId}`;
        const config = {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        };
        const res = await axios.get(stallUrl, config);
        dispatch({ type: GET_STALL_VISITORS, payload: res.data.visitors });
    }

    const setIndividualStall = (stall) => {
        dispatch({ type: SET_INDIVIDUAL_STALL, payload: stall });
        getVisitors(stall._id);
    }

    const updateIndividualStall = (stallData) => {
        dispatch({ type: UPDATE_INDIVIDUAL_STALL, payload: stallData });
    }

    const setIndividualVisitor = (visitor) => {
        dispatch({ type: SET_INDIVIDUAL_STALL_VISITOR, payload: visitor });
    }

    return <StallContext.Provider
        value={{
            stalls: state.stalls,
            individualStall: state.individualStall,
            selectedStallId: state.selectedStallId,
            visitors: state.visitors,
            individualVisitor: state.individualVisitor,
            stallLoading: state.stallLoading,
            stallVisitorLoading: state.stallVisitorLoading,
            setIndividualStall,
            updateIndividualStall,
            getStalls,
            getVisitors,
            setIndividualVisitor
        }}
    >
        {props.children}
    </StallContext.Provider>;
}

export default StallState;