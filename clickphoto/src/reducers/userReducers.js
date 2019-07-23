import { LOGIN_USER, NEW_USER } from '../actions/types';

const initialState = {
    user: {}
}

export default function(state = initialState, action) {
    switch (action.type){
        case LOGIN_USER:
            return {
                ...state, 
                user: action.payload
            };
        case NEW_USER: 
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}