import { GET_STALLS, SET_INDIVIDUAL_STALL } from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_STALLS:
            return {
                ...state,
                stalls: action.payload
            };
        case SET_INDIVIDUAL_STALL:
            return {
                ...state,
                individualStall: action.payload
            };
        default: return state;
    }
}