import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { error } from './_reducers/error';
import { auth } from './_reducers/auth';

const reducers = { error, auth };

const rootReducer = combineReducers(reducers);

export const configureStore = () =>
    createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
