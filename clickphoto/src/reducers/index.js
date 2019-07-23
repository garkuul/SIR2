import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from './userReducers'; 

export default combineReducers({
    posts: postReducer,
    users: userReducer
});