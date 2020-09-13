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
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    RESEND_EMAIL_VERIFICATION_LINK_FAIL,
    RESEND_EMAIL_VERIFICATION_LINK_SUCCESS,
    AUTH_DATA_REFRESH,
} from './types';
import apiEndpoints from '../utils/apiEndpoints';

// Check token & Load user
export const loadUser = () => async (dispatch, getState) => {
    // User loading
    dispatch({
        type: USER_LOADING,
    });

    try {
        const response = await axios.get(
            apiEndpoints.USER_ENDPOINT,
            tokenConfig(getState)
        );

        dispatch({
            type: USER_LOADED,
            payload: response.data.data.user,
        });
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

// Signup New Account
export const signUp = ({ name, email, username, password }) => async (
    dispatch
) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request body
    const body = JSON.stringify({ name, email, username, password });

    try {
        const response = await axios.post(
            apiEndpoints.AUTH_SIGNUP,
            body,
            config
        );

        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message ||
                    error.response.data.error.name ||
                    error.response.data.error.email ||
                    error.response.data.error.username ||
                    error.response.data.error.password ||
                    'Something went wrong',
                error.response.data.error,
                REGISTER_FAIL
            )
        );
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

// Signup Login
export const logIn = ({ email, password }) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request body
    const body = JSON.stringify({ email, password });

    try {
        const response = await axios.post(
            apiEndpoints.AUTH_LOGIN,
            body,
            config
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message ||
                    error.response.data.error.email ||
                    error.response.data.error.password ||
                    'Something went wrong',
                error.response.data.error,
                LOGIN_FAIL
            )
        );
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

// logout
export const logOut = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
};

// forgot password
export const forgotPassword = ({ email }) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request body
    const body = JSON.stringify({ email });

    try {
        const response = await axios.post(
            apiEndpoints.AUTH_RECOVER,
            body,
            config
        );
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: response.data,
        });

        dispatch({
            type: AUTH_DATA_REFRESH,
        });
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message ||
                    error.response.data.error.email ||
                    'Something went wrong',
                error.response.data.error,
                FORGOT_PASSWORD_FAIL
            )
        );
    }
};

// forgot password
export const resendEmailVerificationLink = ({ email }) => async (dispatch) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Request body
    const body = JSON.stringify({ email });

    try {
        const response = await axios.post(
            apiEndpoints.AUTH_VERIFY_EMAIL_RESEND,
            body,
            config
        );
        dispatch({
            type: RESEND_EMAIL_VERIFICATION_LINK_SUCCESS,
            payload: response.data,
        });
        dispatch({
            type: AUTH_DATA_REFRESH,
        });
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message ||
                    error.response.data.error.email ||
                    'Something went wrong',
                error.response.data.error,
                RESEND_EMAIL_VERIFICATION_LINK_FAIL
            )
        );
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
