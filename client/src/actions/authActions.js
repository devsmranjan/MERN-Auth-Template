import axios from 'axios';

import { returnErrors } from './errorActions';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from './types';

// Check token & Load user
export const loadUser = () => async (dispatch, getState) => {
    // User loading
    dispatch({
        type: USER_LOADING,
    });

    try {
        const response = await axios.get('/api/user', tokenConfig(getState));

        if (response) {
            dispatch({
                type: USER_LOADED,
                payload: response.data.data.user,
            });
        }
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message,
                error.response.data.error
            )
        );
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Setup config/headers & token
export const tokenConfig = (getState) => {
    // Get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // if token then add to header
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};
