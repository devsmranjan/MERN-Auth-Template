import {
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    USER_PROFILE_DATA_REFRESH,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    DELETE_ACCOUNT_FAIL,
    DELETE_ACCOUNT_SUCCESS,
} from '../_actions/types';

const initialState = {
    success: false,
    message: '',
    id: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                id: UPDATE_PROFILE_SUCCESS,
            };

        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                id: UPDATE_PASSWORD_SUCCESS,
            };

        case DELETE_ACCOUNT_FAIL:
            return {
                ...state,
                success: action.payload.success,
                message: action.payload.message,
                id: DELETE_ACCOUNT_FAIL,
            };

        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                ...action.payload,
                id: DELETE_ACCOUNT_SUCCESS
            }

        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case USER_PROFILE_DATA_REFRESH:
            return initialState;

        default:
            return state;
    }
};
