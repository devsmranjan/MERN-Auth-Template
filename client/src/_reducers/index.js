import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const allReducers = combineReducers({
    error: errorReducer,
    auth: authReducer,
    userProfile: userReducer,
});

export default allReducers;
