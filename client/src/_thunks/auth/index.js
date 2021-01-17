import Axios from 'axios';
import {
    loadUserFailure,
    loadUserInProgress,
    loadUserSuccess,
    loginFailure,
    loginInProgress,
    loginSuccess,
    signupFailure,
    signupInProgress,
    signupSuccess,
} from '../../_actions/auth';
import apiEndpoints from '../../utils/apiEndpoints';
import { returnErrors, clearErrors } from '../../_actions/error/index';
import { LOAD_USER_FAILURE } from '../../_actions/auth/types';

// load user
export const loadUser = () => async (dispatch, getState) => {
    try {
        dispatch(loadUserInProgress());

        const response = await Axios.get(
            apiEndpoints.USER_ENDPOINT,
            tokenConfig(getState)
        );

        const user = response.data.user;

        dispatch(clearErrors());
        dispatch(loadUserSuccess(user));
    } catch (error) {
        // console.log(error.response.data);

        dispatch(loadUserFailure());

        dispatch(
            returnErrors(
                error.response.data.message || error.response.data.error,
                LOAD_USER_FAILURE
            )
        );
    }
};

// signup
export const signup = ({ name, email, username, password }) => async (
    dispatch,
    getState
) => {
    try {
        dispatch(signupInProgress());

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Request body
        const body = JSON.stringify({ name, email, username, password });

        await Axios.post(apiEndpoints.AUTH_SIGNUP, body, config);

        dispatch(signupSuccess());
        dispatch(clearErrors());

        alert(`A verification link has been sent to your email id ${email}`);

        window.location.href = '/login';
    } catch (error) {
        dispatch(signupFailure());
        dispatch(
            returnErrors(
                error.response
                    ? error.response.data.message ||
                          error.response.data.error.name ||
                          error.response.data.error.email ||
                          error.response.data.error.username ||
                          error.response.data.error.password ||
                          'Something went wrong'
                    : 'Something went wrong'
            )
        );
    }
};

// login
export const login = ({ email, password }) => async (dispatch, getState) => {
    try {
        dispatch(loginInProgress());

        // Headers
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Request body
        const body = JSON.stringify({ email, password });

        const response = await Axios.post(
            apiEndpoints.AUTH_LOGIN,
            body,
            config
        );

        dispatch(loginSuccess(response.data));
        dispatch(clearErrors());

        // window.location.href = '/user';
    } catch (error) {
        console.log(error.response);
        dispatch(loginFailure());
        dispatch(
            returnErrors(
                error.response
                    ? error.response.data.message ||
                          error.response.data.error.email ||
                          error.response.data.error.password ||
                          'Something went wrong'
                    : 'Something went wrong'
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
