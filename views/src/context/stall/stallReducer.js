import {
    GET_STALLS,
    SET_INDIVIDUAL_STALL,
    GET_STALL_VISITORS,
    SET_INDIVIDUAL_STALL_VISITOR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_STALLS:
            return {
                ...state,
                stalls: action.payload
            };
        case GET_STALL_VISITORS:
            return {
                ...state,
                visitors: action.payload
            };
        case SET_INDIVIDUAL_STALL:
            return {
                ...state,
                individualStall: action.payload,
                selectedStallId: action.payload._id
            };
        case SET_INDIVIDUAL_STALL_VISITOR:
            return {
                ...state,
                individualVisitor: action.payload,
            };
        default: return state;
    }
}