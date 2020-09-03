import {GET_VISITOR, SET_INDIV_VISITOR} from '../types';


export default (state, action) =>{
    switch(action.type){
        case GET_VISITOR:
           return {
               ...state,
               visitorlist: action.payload
        };
        case SET_INDIV_VISITOR:
           return {
               ...state,
               visitorlist: action.payload
        }
        default: return state;
    }
}