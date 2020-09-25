import {
    GET_STALLS,
    SET_INDIVIDUAL_STALL,
    GET_STALL_VISITORS,
    SET_INDIVIDUAL_STALL_VISITOR,
    STALL_LOADING,
    STALL_VISITOR_LOADING,
    UPDATE_INDIVIDUAL_STALL
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_STALLS:
            return {
                ...state,
                stallLoading: false,
                stalls: action.payload
            };
        case GET_STALL_VISITORS:
            return {
                ...state,
                stallVisitorLoading: false,
                visitors: action.payload
            };
        case STALL_LOADING:
            return {
                ...state,
                stallLoading: true,
            };
        case STALL_VISITOR_LOADING:
            return {
                ...state,
                stallVisitorLoading: true,
            };
        case SET_INDIVIDUAL_STALL:
            return {
                ...state,
                individualStall: action.payload,
                selectedStallId: action.payload._id
            };
        case UPDATE_INDIVIDUAL_STALL:
            let userId = state.individualStall.userId;
            return {
                ...state,
                individualStall: {
                    ...state.individualStall,
                    ...action.payload,
                    userId: userId,
                }
            }
        case SET_INDIVIDUAL_STALL_VISITOR:
            return {
                ...state,
                individualVisitor: action.payload,
            };
        default: return state;
    }
}