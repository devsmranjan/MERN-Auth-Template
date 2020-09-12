import {
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    USER_PROFILE_DATA_REFRESH,
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

        case UPDATE_PROFILE_FAIL:
        case USER_PROFILE_DATA_REFRESH:
            return initialState;

        default:
            return state;
    }
};
