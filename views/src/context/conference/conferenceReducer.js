import {
    GET_CONFERENCES,
    SET_INDIVIDUAL_CONF,
    GET_CONF_VISITORS,
    SET_INDIVIDUAL_CONF_VISITOR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_CONFERENCES:
            return {
                ...state,
                conferences: action.payload
            };
        case GET_CONF_VISITORS:
            return {
                ...state,
                visitors: action.payload
            };
        case SET_INDIVIDUAL_CONF:
            return {
                ...state,
                individualConference: action.payload
            };
        case SET_INDIVIDUAL_CONF_VISITOR:
            return {
                ...state,
                individualVisitor: action.payload,
            };
        default: return state;
    }
}