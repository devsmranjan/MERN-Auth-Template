import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    USER_PROFILE_DATA_REFRESH,
} from './types';
import { loadUser } from './authActions';

export const updateProfile = ({ name }) => async (dispatch) => {
    // Request body
    const body = JSON.stringify({ name });

    try {
        const response = await axios.put(
            '/api/user/update',
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
                    error.response.data.error.email ||
                    error.response.data.error.username ||
                    error.response.data.error.password ||
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
