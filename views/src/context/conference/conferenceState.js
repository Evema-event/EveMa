import React, { useReducer } from 'react';

import ConferenceContext from './conferenceContext';
import ConferenceReducer from './conferenceReducer';

import url from '../../server';
import axios from 'axios';

import { GET_CONFERENCES, SET_INDIVIDUAL_CONF } from '../types';

const ConferenceState = (props) => {
    const initialState = {
        conferences: null,
        individualConference: null
    };

    const [state, dispatch] = useReducer(ConferenceReducer, initialState);

    const getConferences = async (eventId) => {
        const config = {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        }
        const res = await axios.get(`${url}conference/getConferences/${eventId}`, config);
        dispatch({ type: GET_CONFERENCES, payload: res.data.conferences });
    }

    const setIndividualConference = (conference) => {
        dispatch({ type: SET_INDIVIDUAL_CONF, payload: conference });
    }

    return <ConferenceContext.Provider
        value={{
            conferences: state.conferences,
            individualConference: state.individualConference,
            getConferences,
            setIndividualConference
        }}
    >
        {props.children}
    </ConferenceContext.Provider>;
}

export default ConferenceState;
