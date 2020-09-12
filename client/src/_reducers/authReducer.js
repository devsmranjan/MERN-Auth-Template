import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    RESEND_EMAIL_VERIFICATION_LINK_SUCCESS,
    AUTH_DATA_REFRESH,
} from '../_actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    id: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.data.token);
            return {
                ...state,
                ...action.payload.data,
                isAuthenticated: true,
                isLoading: false,
                id: LOGIN_SUCCESS,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false,
                id: REGISTER_SUCCESS,
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false,
                id: FORGOT_PASSWORD_SUCCESS,
            };

        case RESEND_EMAIL_VERIFICATION_LINK_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: false,
                isLoading: false,
                id: RESEND_EMAIL_VERIFICATION_LINK_SUCCESS,
            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                id: null,
            };

        case AUTH_DATA_REFRESH:
            return initialState;

        default:
            return state;
    }
};
