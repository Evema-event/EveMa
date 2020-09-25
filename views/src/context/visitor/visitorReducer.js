import { GET_VISITOR, SET_INDIV_VISITOR, VISITOR_LOADING } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_VISITOR:
      return {
        ...state,
        visitorLoading: false,
        visitorlist: action.payload,
      };
    case VISITOR_LOADING:
      return {
        ...state,
        visitorLoading: true,
      }
    case SET_INDIV_VISITOR:
      return {
        ...state,
        individualVisitor: action.payload,
      };
    default:
      return state;
  }
};
