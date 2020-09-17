import React, { useReducer } from 'react';
import StallContext from './stallContext';
import StallReducer from './stallReducer';

import url from '../../server';
import axios from 'axios';

import { GET_STALLS, SET_INDIVIDUAL_STALL } from '../types';

const StallState = (props) => {
    const initialState = {
        stalls: null,
        individualStall: null,
        selectedStallId: null
    };

    const [state, dispatch] = useReducer(StallReducer, initialState);

    const getStalls = async (eventId) => {
        let stallUrl = url + `stall/getStalls/${eventId}`;
        const config = {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        };
        const res = await axios.get(stallUrl, config);
        dispatch({ type: GET_STALLS, payload: res.data.stalls });
    }



    const setIndividualStall = (stall) => {
        dispatch({ type: SET_INDIVIDUAL_STALL, payload: stall });
    }

    return <StallContext.Provider
        value={{
            stalls: state.stalls,
            individualStall: state.individualStall,
            selectedStallId: state.selectedStallId,
            setIndividualStall,
            getStalls
        }}
    >
        {props.children}
    </StallContext.Provider>;
}

export default StallState;