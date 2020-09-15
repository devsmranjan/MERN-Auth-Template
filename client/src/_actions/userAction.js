import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    USER_PROFILE_DATA_REFRESH,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    DELETE_ACCOUNT_FAIL,
} from './types';
import { loadUser } from './authActions';
import apiEndpoints from '../utils/apiEndpoints';

export const updateProfile = ({ name }) => async (dispatch) => {
    // Request body
    const body = JSON.stringify({ name });

    try {
        const response = await axios.put(
            apiEndpoints.USER_UPDATE,
            body,
            tokenConfig()
        );

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: response.data,
        });

        dispatch({
            type: USER_PROFILE_DATA_REFRESH,
        });

        dispatch(loadUser());
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message ||
                    error.response.data.error.name ||
                    'Something went wrong',
                error.response.data.error,
                UPDATE_PROFILE_FAIL
            )
        );
        dispatch({
            type: UPDATE_PROFILE_FAIL,
        });
    }
};

// update password
export const updatePassword = ({ currentPassword, newPassword }) => async (
    dispatch
) => {
    // Request body
    const body = JSON.stringify({ currentPassword, newPassword });

    try {
        const response = await axios.put(
            apiEndpoints.USER_UPDATE_PASSWORD,
            body,
            tokenConfig()
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: response.data,
        });

        dispatch({
            type: USER_PROFILE_DATA_REFRESH,
        });

        dispatch(loadUser());
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message ||
                    error.response.data.error.newPassword ||
                    'Something went wrong',
                error.response.data.error,
                UPDATE_PASSWORD_FAIL
            )
        );
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
        });
    }
};

// update password
export const deleteAccount = () => async (dispatch) => {
    try {
        await axios.delete(apiEndpoints.USER_DELETE, tokenConfig());

        dispatch(loadUser());
    } catch (error) {
        dispatch(
            returnErrors(
                error.response.data.success,
                error.response.data.message || 'Something went wrong',
                error.response.data.error,
                DELETE_ACCOUNT_FAIL
            )
        );
        dispatch({
            type: DELETE_ACCOUNT_FAIL,
            success: error.response.data.success,
            message: error.response.data.message || 'Something went wrong',
        });
    }
};

// Setup config/headers & token
export const tokenConfig = () => {
    // Get token from local storage
    const token = localStorage.getItem('token');

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
