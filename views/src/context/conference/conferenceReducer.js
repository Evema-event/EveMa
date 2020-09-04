import { GET_CONFERENCES, SET_INDIVIDUAL_CONF } from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_CONFERENCES:
            return {
                ...state,
                conferences: action.payload
            };
        case SET_INDIVIDUAL_CONF:
            return {
                ...state,
                individualConference: action.payload
            };
        default: return state;
    }
}