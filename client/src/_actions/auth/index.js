import {
    LOAD_USER_FAILURE,
    LOAD_USER_IN_PROGRESS,
    LOAD_USER_SUCCESS,
    LOGIN_IN_PROGRESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_IN_PROGRESS,
    SIGNUP_SUCCESS,
} from './types';

// load user
export const loadUserInProgress = () => ({
    type: LOAD_USER_IN_PROGRESS,
});

export const loadUserSuccess = (user) => ({
    type: LOAD_USER_SUCCESS,
    payload: { user },
});

export const loadUserFailure = () => ({
    type: LOAD_USER_FAILURE,
});

// signup
export const signupInProgress = () => ({
    type: SIGNUP_IN_PROGRESS,
});

export const signupSuccess = () => ({
    type: SIGNUP_SUCCESS,
});

export const signupFailure = () => ({
    type: SIGNUP_FAILURE,
});

// login
export const loginInProgress = () => ({
    type: LOGIN_IN_PROGRESS,
});

export const loginSuccess = (data) => ({
    type: LOGIN_SUCCESS,
    payload: data,
});

export const loginFailure = () => ({
    type: LOAD_USER_FAILURE,
});

// logout
export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
});
