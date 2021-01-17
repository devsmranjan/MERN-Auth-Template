import {
    LOAD_USER_FAILURE,
    LOAD_USER_IN_PROGRESS,
    LOAD_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_IN_PROGRESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SIGNUP_FAILURE,
    SIGNUP_IN_PROGRESS,
    SIGNUP_SUCCESS,
} from '../../_actions/auth/types';

const initialState = {
    token: localStorage.getItem('token'),
    isLoading: null,
    user: null,
    isAuthenticated: null,
};

export const auth = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER_SUCCESS:
            const { user } = payload;

            return {
                ...state,
                isLoading: false,
                user,
                isAuthenticated: true,
            };

        case LOAD_USER_FAILURE:
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
            };

        case LOAD_USER_IN_PROGRESS:
        case SIGNUP_IN_PROGRESS:
        case LOGIN_IN_PROGRESS:
            return {
                ...state,
                isLoading: true,
            };

        case SIGNUP_SUCCESS:
        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
            };

        case LOGIN_SUCCESS:
            const { token, user: currentUser } = payload;
            // console.log(payload);
            localStorage.setItem('token', token);
            // console.log(token);
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                token,
                user: currentUser,
            };

        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');

            return {
                ...state,
                token: null,
                isLoading: false,
                user: null,
                isAuthenticated: false,
            };

        default:
            return state;
    }
};
