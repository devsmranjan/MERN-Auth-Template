import { combineReducers } from "redux";
import errorReducer from './errorReducer'
import authReducer from './authReducer'

const allReducers = combineReducers({
    error: errorReducer,
    auth: authReducer
})

export default allReducers