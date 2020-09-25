import {
    GET_CONFERENCES,
    SET_INDIVIDUAL_CONF,
    GET_CONF_VISITORS,
    SET_INDIVIDUAL_CONF_VISITOR,
    CONFERENCE_LOADING,
    CONF_VISITOR_LOADING,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_CONFERENCES:
            return {
                ...state,
                conferenceLoading: false,
                conferences: action.payload
            };
        case GET_CONF_VISITORS:
            return {
                ...state,
                confVisitorLoading: false,
                visitors: action.payload
            };
        case CONFERENCE_LOADING:
            return {
                ...state,
                conferenceLoading: true,
            };
        case CONF_VISITOR_LOADING:
            return {
                ...state,
                confVisitorLoading: true,
            }
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