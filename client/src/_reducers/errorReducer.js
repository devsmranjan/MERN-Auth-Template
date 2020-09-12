import { GET_ERRORS, CLEAR_ERRORS } from '../_actions/types';

const initialState = {
    success: false,
    message: null,
    error: null,
    id: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return {
                success: action.payload.success,
                message: action.payload.message,
                error: action.payload.error,
                id: action.payload.id,
            };
        case CLEAR_ERRORS:
            return initialState;
        default:
            return state;
    }
};
